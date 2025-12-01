import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    { auth: { persistSession: false } }
  );

  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    const { paymentMethodId, amount, currency, customerInfo, items, isVeteran, veteranIdUrl, veteranDiscount } = await req.json();

    console.log('Processing payment:', { amount, currency, itemsCount: items.length, isVeteran });

    // Get authenticated user (optional - for guest checkout support)
    let userId = null;
    const authHeader = req.headers.get('Authorization');
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: userData } = await supabaseAdmin.auth.getUser(token);
      userId = userData?.user?.id || null;
    }

    // Get default partner (store owner)
    const { data: partners } = await supabaseAdmin
      .from('partners')
      .select('id')
      .limit(1)
      .single();

    if (!partners) {
      throw new Error('No partner found - store not configured');
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
      receipt_email: customerInfo.email,
      metadata: {
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
      },
    });

    console.log('Payment intent created:', paymentIntent.id);

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Calculate totals
    const subtotal = amount / 100;
    const taxAmount = 0;
    const shippingAmount = 0;
    const totalAmount = subtotal;

    // Create order in database
    const { data: order, error: orderError } = await supabaseAdmin
      .from('partner_orders')
      .insert({
        order_number: orderNumber,
        partner_id: partners.id,
        customer_id: userId,
        customer_email: customerInfo.email,
        customer_name: customerInfo.name,
        customer_phone: customerInfo.phone || null,
        shipping_address: {
          line1: customerInfo.address,
          city: customerInfo.city,
          state: customerInfo.state,
          postal_code: customerInfo.zip
        },
        billing_address: {
          line1: customerInfo.address,
          city: customerInfo.city,
          state: customerInfo.state,
          postal_code: customerInfo.zip
        },
        status: 'pending',
        payment_status: 'paid',
        payment_method: 'card',
        payment_transaction_id: paymentIntent.id,
        subtotal,
        tax_amount: taxAmount,
        shipping_amount: shippingAmount,
        discount_amount: veteranDiscount || 0,
        total_amount: totalAmount,
        veteran_id_url: veteranIdUrl,
        veteran_discount_applied: isVeteran || false,
        veteran_discount_amount: veteranDiscount || 0,
        metadata: {
          stripe_payment_intent: paymentIntent.id,
          items: items,
          veteran_verification: isVeteran ? 'pending' : 'n/a'
        }
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      throw new Error(`Failed to create order: ${orderError.message}`);
    }

    console.log('Order created:', order.id);

    // Create order items and update inventory
    for (const item of items) {
      // Get product details
      const { data: product } = await supabaseAdmin
        .from('products')
        .select('id, sku, stock_quantity')
        .eq('id', item.productId)
        .single();

      if (product) {
        // Create order item
        const { error: itemError } = await supabaseAdmin
          .from('order_items')
          .insert({
            order_id: order.id,
            product_id: product.id,
            product_name: item.name,
            product_sku: product.sku || `SKU-${product.id.substring(0, 8)}`,
            quantity: item.quantity,
            unit_price: item.price,
            subtotal: item.price * item.quantity,
            tax_amount: 0,
            discount_amount: 0,
            total: item.price * item.quantity
          });

        if (itemError) {
          console.error('Error creating order item:', itemError);
        } else {
          console.log(`Order item created for: ${item.name}`);
        }

        // Update product inventory (skip if digital product with 999 stock)
        if (product.stock_quantity !== null && product.stock_quantity !== 999) {
          const newQuantity = Math.max(0, product.stock_quantity - item.quantity);
          const { error: updateError } = await supabaseAdmin
            .from('products')
            .update({ stock_quantity: newQuantity })
            .eq('id', product.id);
          
          if (updateError) {
            console.error('Error updating inventory:', updateError);
          } else {
            console.log(`Updated inventory for ${item.name}: ${product.stock_quantity} -> ${newQuantity}`);
          }
        }
      } else {
        console.error(`Product not found for productId: ${item.productId}`);
      }
    }

    // Check if order contains digital products
    const hasDigitalProducts = items.some((item: any) => 
      item.tags?.includes('digital') || item.type === 'digital'
    );
    const hasPhysicalProducts = items.some((item: any) => 
      !item.tags?.includes('digital') && item.type !== 'digital'
    );

    // Send receipt email
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (resendApiKey) {
      const itemsList = items.map((item: any) => 
        `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
      ).join('\n');

      let productTypeMessage = '';
      if (hasDigitalProducts && hasPhysicalProducts) {
        productTypeMessage = `
📦 Physical Products: Your items will be processed and shipped within 2-3 business days.
📥 Digital Products: Check your email for download links (sent within 2-5 minutes).
        `.trim();
      } else if (hasDigitalProducts) {
        productTypeMessage = `
📥 Digital Products: Your download links will be sent to your email within 2-5 minutes.
⏰ Download links expire in 24 hours for security.
        `.trim();
      } else {
        productTypeMessage = `
📦 Your order will be processed and shipped within 2-3 business days.
📧 You'll receive a tracking number once shipped.
        `.trim();
      }

      const emailBody = `
Thank you for your purchase from InVision Network!

Order Number: ${orderNumber}
Order ID: ${order.id}

Order Details:
${itemsList}

${hasPhysicalProducts ? `
Shipping Address:
${customerInfo.name}
${customerInfo.address}
${customerInfo.city}, ${customerInfo.state} ${customerInfo.zip}
` : ''}

Payment Information:
Amount: $${(amount / 100).toFixed(2)}
Transaction ID: ${paymentIntent.id}
Date: ${new Date().toLocaleDateString()}

${productTypeMessage}

Questions? Contact us at hello@invisionnetwork.org

Best regards,
InVision Network Team
      `.trim();

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'InVision Network <noreply@invisionnetwork.org>',
          to: [customerInfo.email],
          subject: `Order Confirmation #${orderNumber} - InVision Network`,
          text: emailBody,
        }),
      });

      console.log('Receipt email sent to:', customerInfo.email);
    }

    // Trigger digital download email if order contains digital products
    if (hasDigitalProducts) {
      console.log('Order contains digital products, triggering download email...');
      try {
        await supabaseAdmin.functions.invoke('send-digital-download', {
          body: {
            orderId: order.id,
            orderNumber: orderNumber,
            customerEmail: customerInfo.email,
            customerName: customerInfo.name,
            items: items,
          },
        });
        console.log('Digital download email triggered successfully');
      } catch (downloadError) {
        console.error('Error triggering digital download email:', downloadError);
        // Don't fail the order if download email fails
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        paymentIntentId: paymentIntent.id,
        orderId: order.id,
        orderNumber: orderNumber
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Payment error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Payment processing failed';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
