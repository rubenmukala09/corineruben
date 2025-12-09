import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Loader2, Shield, CheckCircle, Package, FileText, 
  Mail, Minus, Plus, Sparkles, Truck, Download
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { QuickVeteranToggle } from "@/components/payment/QuickVeteranToggle";
import { SmartPriceBreakdown } from "@/components/payment/SmartPriceBreakdown";
import { TrustIndicators } from "@/components/payment/TrustIndicators";
import { motion } from "framer-motion";

interface PurchaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemType: 'guide' | 'product' | 'digital' | 'physical';
  itemName: string;
  itemDescription?: string;
  itemImage?: string;
  suggestedPrice?: number;
  isPWYW?: boolean;
  veteranDiscountPercent?: number;
}

export const PurchaseModal = ({ 
  open, 
  onOpenChange, 
  itemType, 
  itemName, 
  itemDescription,
  itemImage,
  suggestedPrice = 0, 
  isPWYW = false, 
  veteranDiscountPercent = 10 
}: PurchaseModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isVeteran, setIsVeteran] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [customPrice, setCustomPrice] = useState(suggestedPrice.toString());
  const [message, setMessage] = useState('');

  const isDigital = itemType === 'digital' || itemType === 'guide';
  const unitPrice = isPWYW ? parseFloat(customPrice) || 0 : suggestedPrice;
  const subtotal = unitPrice * quantity;
  const discountAmount = isVeteran ? (subtotal * veteranDiscountPercent) / 100 : 0;
  const total = subtotal - discountAmount;

  // Auto-fill from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem('checkout_email');
    const savedName = localStorage.getItem('checkout_name');
    if (savedEmail) setEmail(savedEmail);
    if (savedName) setName(savedName);
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name) {
      toast({ title: "Required", description: "Please enter your name and email.", variant: "destructive" });
      return;
    }

    if (isPWYW && unitPrice < 1) {
      toast({ title: "Minimum $1", description: "Please enter at least $1.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      // Save for auto-fill
      localStorage.setItem('checkout_email', email);
      localStorage.setItem('checkout_name', name);

      const { data: { user } } = await supabase.auth.getUser();
      const requestNumber = `PUR-${Date.now().toString().slice(-8)}`;

      const { error } = await supabase.from('purchase_requests').insert([{
        request_number: requestNumber,
        user_id: user?.id || null,
        item_type: itemType,
        item_name: itemName,
        full_name: name,
        email: email,
        customer_price: unitPrice,
        quantity: quantity,
        subtotal: subtotal,
        discount_amount: discountAmount,
        final_price: total,
        message: message,
        is_veteran: isVeteran,
        status: 'pending'
      }]);

      if (error) throw error;

      toast({ 
        title: "🎉 Order Submitted!", 
        description: isDigital 
          ? "Check your email for download links within minutes!"
          : `Order #${requestNumber} confirmed. We'll send tracking info soon.`
      });

      onOpenChange(false);
      setQuantity(1);
      setMessage('');
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-6 border-b">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              {isDigital ? (
                <Badge variant="secondary" className="gap-1">
                  <Download className="w-3 h-3" />
                  Digital Download
                </Badge>
              ) : (
                <Badge variant="secondary" className="gap-1">
                  <Truck className="w-3 h-3" />
                  Physical Product
                </Badge>
              )}
            </div>
            <DialogTitle className="text-xl font-bold">{itemName}</DialogTitle>
            {itemDescription && (
              <p className="text-sm text-muted-foreground mt-1">{itemDescription}</p>
            )}
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Product Preview (if image) */}
          {itemImage && (
            <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
              <img src={itemImage} alt={itemName} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Quantity (for non-PWYW) */}
          {!isPWYW && (
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
              <div>
                <p className="font-medium">Quantity</p>
                <p className="text-sm text-muted-foreground">${suggestedPrice.toFixed(2)} each</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center font-semibold">{quantity}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* PWYW Price Input */}
          {isPWYW && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Name Your Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  type="number"
                  min="1"
                  step="0.01"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  className="pl-7 h-12 text-lg"
                  placeholder={`Suggested: $${suggestedPrice}`}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Suggested price: ${suggestedPrice.toFixed(2)}
              </p>
            </div>
          )}

          {/* Contact Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-primary" />
              <span className="font-medium text-sm">
                {isDigital ? "Where to send your download" : "Contact Information"}
              </span>
            </div>
            <Input
              placeholder="Your Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11"
              required
            />
            <Input
              type="email"
              placeholder="Email * (for receipt & downloads)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11"
              required
            />
          </div>

          {/* Special Instructions */}
          <Textarea
            placeholder="Special instructions (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={2}
            className="resize-none"
          />

          {/* Veteran Discount */}
          <QuickVeteranToggle
            isVeteran={isVeteran}
            onVeteranChange={setIsVeteran}
            discountPercent={veteranDiscountPercent}
          />

          {/* Price Summary */}
          <SmartPriceBreakdown
            items={[{ name: itemName, quantity, price: unitPrice }]}
            veteranDiscount={isVeteran ? discountAmount : 0}
            total={total}
          />

          {/* What Happens Next */}
          <div className="p-4 bg-muted/50 rounded-xl">
            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              What happens next
            </h4>
            {isDigital ? (
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Instant email with download links
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Links valid for 24 hours
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Access your files immediately
                </li>
              </ul>
            ) : (
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Order confirmation email
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Shipping within 2-3 business days
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Tracking number provided
                </li>
              </ul>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 text-base font-semibold"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                {isDigital ? <Download className="mr-2 h-5 w-5" /> : <Package className="mr-2 h-5 w-5" />}
                {isDigital ? `Get Instant Access - $${total.toFixed(2)}` : `Order Now - $${total.toFixed(2)}`}
              </>
            )}
          </Button>

          <TrustIndicators compact />
        </form>
      </DialogContent>
    </Dialog>
  );
};