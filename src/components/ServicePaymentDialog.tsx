import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { AcceptedCardsDisplay } from "./AcceptedCardsDisplay";
import { QRCodePayment } from "./QRCodePayment";
import { VeteranIdUpload } from "./VeteranIdUpload";
import { RefundPolicyDisclaimer } from "./RefundPolicyDisclaimer";
import { Loader2 } from "lucide-react";
import { useStripeLoader } from '@/hooks/useStripeLoader';

interface ServicePaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceType: 'ai-automation' | 'website-design' | 'ai-consultation';
  serviceName: string;
  servicePrice: number;
  serviceDescription?: string;
}

function PaymentForm({ 
  serviceType, 
  serviceName, 
  servicePrice, 
  serviceDescription,
  onSuccess 
}: { 
  serviceType: string;
  serviceName: string;
  servicePrice: number;
  serviceDescription?: string;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'qr'>('card');
  
  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [isVeteran, setIsVeteran] = useState(false);
  const [veteranIdFile, setVeteranIdFile] = useState<File | null>(null);
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);

  const veteranDiscount = isVeteran ? 0.1 : 0;
  const discountAmount = servicePrice * veteranDiscount;
  const finalPrice = servicePrice - discountAmount;

  const handleCardPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (isVeteran && !veteranIdFile) {
      toast.error("Please upload your veteran ID for verification");
      return;
    }

    if (!acceptedPolicy) {
      toast.error("Please accept the refund policy to continue");
      return;
    }

    if (!stripe || !elements) {
      toast.error("Payment system not ready. Please try again.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      toast.error("Card element not found");
      return;
    }

    setLoading(true);

    try {
      // Upload veteran ID if provided
      let veteranIdUrl = "";
      if (isVeteran && veteranIdFile) {
        const fileExt = veteranIdFile.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('veteran-docs')
          .upload(fileName, veteranIdFile);
        
        if (uploadError) {
          toast.error("Failed to upload veteran ID");
          setLoading(false);
          return;
        }
        
        const { data: { publicUrl } } = supabase.storage
          .from('veteran-docs')
          .getPublicUrl(fileName);
        
        veteranIdUrl = publicUrl;
      }

      // Create payment method
      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: fullName,
          email: email,
          phone: phone,
        },
      });

      if (pmError) {
        toast.error(pmError.message || "Failed to create payment method");
        setLoading(false);
        return;
      }

      // First create service inquiry record
      const { data: inquiryData, error: inquiryError } = await supabase
        .from('service_inquiries')
        .insert({
          service_type: serviceType,
          service_name: serviceName,
          service_price: finalPrice,
          full_name: fullName,
          email: email,
          phone: phone,
          company_name: companyName || null,
          requirements: projectDetails || null,
          is_veteran: isVeteran,
          veteran_id_url: veteranIdUrl || null,
          status: 'paid'
        })
        .select()
        .single();

      if (inquiryError) {
        console.error('Error creating inquiry:', inquiryError);
        toast.error("Failed to create service inquiry");
        setLoading(false);
        return;
      }

      // Process payment via dedicated service payment edge function
      const { data: paymentData, error: paymentError } = await supabase.functions.invoke(
        'process-service-payment',
        {
          body: {
            paymentMethodId: paymentMethod.id,
            amount: Math.round(finalPrice * 100), // Convert to cents
            currency: 'usd',
            customerInfo: {
              name: fullName,
              email: email,
              phone: phone,
              companyName: companyName,
            },
            serviceType: serviceType,
            serviceName: serviceName,
            inquiryId: inquiryData.id,
            metadata: {
              is_veteran: isVeteran,
              veteran_discount: discountAmount,
              project_details: projectDetails,
            }
          }
        }
      );

      if (paymentError) {
        console.error('Payment error:', paymentError);
        toast.error("Payment processing failed. Please try again.");
        setLoading(false);
        return;
      }

      if (paymentData?.success) {
        toast.success("Payment successful! Check your email for confirmation.");
        
        // Redirect to success page with service info
        const successUrl = `/payment-success?type=service&service=${encodeURIComponent(serviceName)}&inquiry=${paymentData.inquiryId}`;
        setTimeout(() => {
          window.location.href = successUrl;
        }, 1500);
      } else {
        toast.error(paymentData?.error || "Payment failed");
        setLoading(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error("An error occurred during payment processing");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleCardPayment} className="space-y-6">
      {/* Service Summary */}
      <div className="bg-muted/50 p-4 rounded-lg space-y-2">
        <h3 className="font-semibold text-lg">{serviceName}</h3>
        {serviceDescription && (
          <p className="text-sm text-muted-foreground">{serviceDescription}</p>
        )}
        
        {/* Detailed Service Information */}
        {serviceType === 'website-design' && serviceName.includes('Landing Page') && (
          <div className="mt-4 pt-4 border-t space-y-2">
            <p className="font-semibold text-sm">What's Included:</p>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>✓ Single high-converting page design</li>
              <li>✓ Mobile-responsive layout</li>
              <li>✓ Lead capture form integration</li>
              <li>✓ SEO optimization basics</li>
              <li>✓ Hosting setup assistance</li>
              <li>✓ 2 rounds of revisions included</li>
              <li>✓ Professional copywriting support</li>
              <li>✓ Fast 5-7 day turnaround</li>
            </ul>
          </div>
        )}
        
        {serviceType === 'website-design' && serviceName.includes('Business Website') && (
          <div className="mt-4 pt-4 border-t space-y-2">
            <p className="font-semibold text-sm">What's Included:</p>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>✓ Up to 5 custom-designed pages</li>
              <li>✓ Mobile-responsive layout</li>
              <li>✓ Contact form integration</li>
              <li>✓ Basic SEO setup</li>
              <li>✓ Blog/News section</li>
              <li>✓ Social media integration</li>
              <li>✓ Google Analytics setup</li>
              <li>✓ 3 rounds of revisions</li>
              <li>✓ Professional design consultation</li>
              <li>✓ 2-3 week project timeline</li>
            </ul>
          </div>
        )}
        
        {serviceType === 'ai-consultation' && serviceName.includes('Thinking of Buying') && (
          <div className="mt-4 pt-4 border-t space-y-2">
            <p className="font-semibold text-sm">What you'll receive:</p>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>✓ Complete security risk assessment</li>
              <li>✓ ROI calculation with real numbers</li>
              <li>✓ Hidden costs analysis</li>
              <li>✓ Vendor reliability check</li>
              <li>✓ 3-5 alternative recommendations</li>
              <li>✓ "Buy / Don't Buy / Wait" recommendation</li>
              <li>✓ Written report delivered within 5 business days</li>
              <li>✓ 30-minute consultation call to discuss findings</li>
            </ul>
          </div>
        )}
        
        {serviceType === 'ai-consultation' && serviceName.includes('Already Using') && (
          <div className="mt-4 pt-4 border-t space-y-2">
            <p className="font-semibold text-sm">What you'll receive:</p>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>✓ Full security vulnerability scan</li>
              <li>✓ Data leak assessment</li>
              <li>✓ Prompt injection testing</li>
              <li>✓ Vendor contract review</li>
              <li>✓ Compliance gap analysis (GDPR, HIPAA, etc.)</li>
              <li>✓ Risk mitigation roadmap</li>
              <li>✓ Implementation priority list</li>
              <li>✓ 60-minute strategy call</li>
              <li>✓ 30-day follow-up support</li>
            </ul>
          </div>
        )}
        
        <div className="flex justify-between items-center pt-2 border-t">
          <span className="text-sm">Base Price:</span>
          <span className="font-semibold">${servicePrice.toLocaleString()}</span>
        </div>
        {isVeteran && (
          <div className="flex justify-between items-center text-success">
            <span className="text-sm">Veteran Discount (10%):</span>
            <span className="font-semibold">-${discountAmount.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between items-center pt-2 border-t">
          <span className="font-semibold">Total:</span>
          <span className="text-xl font-bold text-primary">${finalPrice.toLocaleString()}</span>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            placeholder="John Doe"
          />
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="john@company.com"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <Label htmlFor="companyName">Company Name (Optional)</Label>
          <Input
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Your Company LLC"
          />
        </div>

        {serviceType === 'ai-consultation' && (
          <div>
            <Label htmlFor="projectDetails">What issues are you facing? *</Label>
            <Textarea
              id="projectDetails"
              value={projectDetails}
              onChange={(e) => setProjectDetails(e.target.value)}
              placeholder="Describe your current AI challenges or concerns..."
              rows={4}
            />
          </div>
        )}

        {serviceType !== 'ai-consultation' && (
          <div>
            <Label htmlFor="projectDetails">Project Details (Optional)</Label>
            <Textarea
              id="projectDetails"
              value={projectDetails}
              onChange={(e) => setProjectDetails(e.target.value)}
              placeholder="Tell us about your project requirements..."
              rows={3}
            />
          </div>
        )}
      </div>

      {/* Veteran Discount */}
      <div className="space-y-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="veteran-toggle" className="text-base font-semibold">
              🇺🇸 Veteran or First Responder?
            </Label>
            <p className="text-sm text-muted-foreground">Save 10% with verification</p>
          </div>
          <Switch
            id="veteran-toggle"
            checked={isVeteran}
            onCheckedChange={setIsVeteran}
          />
        </div>
        
        {isVeteran && (
          <VeteranIdUpload
            isVeteran={isVeteran}
            onFileUpload={(file) => setVeteranIdFile(file)}
            uploadedFile={veteranIdFile}
          />
        )}
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-4">
        <Label>Payment Method</Label>
        <div className="flex gap-4">
          <Button
            type="button"
            variant={paymentMethod === 'card' ? 'default' : 'outline'}
            onClick={() => setPaymentMethod('card')}
            className="flex-1"
          >
            Credit/Debit Card
          </Button>
          <Button
            type="button"
            variant={paymentMethod === 'qr' ? 'default' : 'outline'}
            onClick={() => setPaymentMethod('qr')}
            className="flex-1"
          >
            QR Code
          </Button>
        </div>
      </div>

      {paymentMethod === 'card' ? (
        <>
          <div className="space-y-2">
            <Label>Card Details</Label>
            <div className="border rounded-md p-3 bg-background">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: 'hsl(var(--foreground))',
                      '::placeholder': {
                        color: 'hsl(var(--muted-foreground))',
                      },
                    },
                  },
                }}
              />
            </div>
            <AcceptedCardsDisplay />
          </div>

          {/* Refund Policy */}
          <RefundPolicyDisclaimer
            onAcknowledge={setAcceptedPolicy}
            type="service"
          />

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={loading || !stripe || !acceptedPolicy}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing Payment...
              </>
            ) : (
              `Pay $${finalPrice.toLocaleString()}`
            )}
          </Button>
        </>
      ) : (
        <div className="space-y-4">
          <RefundPolicyDisclaimer
            onAcknowledge={setAcceptedPolicy}
            type="service"
          />
          <QRCodePayment
            amount={finalPrice}
            customerEmail={email}
            items={[
              {
                name: serviceName,
                quantity: 1,
                price: finalPrice,
              },
            ]}
          />
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center">
        Your payment is secure and encrypted. We'll contact you within 24 hours to begin your project.
      </p>
    </form>
  );
}

export function ServicePaymentDialog({
  open,
  onOpenChange,
  serviceType,
  serviceName,
  servicePrice,
  serviceDescription,
}: ServicePaymentDialogProps) {
  const { stripe, loading: stripeLoading } = useStripeLoader();
  
  if (!open) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Complete Your Purchase</DialogTitle>
        </DialogHeader>
        
        {stripeLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <Elements stripe={stripe}>
            <PaymentForm
              serviceType={serviceType}
              serviceName={serviceName}
              servicePrice={servicePrice}
              serviceDescription={serviceDescription}
              onSuccess={() => {
                onOpenChange(false);
              }}
            />
          </Elements>
        )}
      </DialogContent>
    </Dialog>
  );
}
