import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, X } from "lucide-react";

interface PurchaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemType: 'guide' | 'product';
  itemName: string;
  suggestedPrice?: number;
  isPWYW?: boolean; // Pay What You Want
  veteranDiscountPercent?: number;
}

export const PurchaseModal = ({
  open,
  onOpenChange,
  itemType,
  itemName,
  suggestedPrice = 0,
  isPWYW = false,
  veteranDiscountPercent = 3,
}: PurchaseModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVeteran, setIsVeteran] = useState(false);
  const [veteranType, setVeteranType] = useState<string>("");
  const [veteranIdLast4, setVeteranIdLast4] = useState("");
  const [veteranDocFile, setVeteranDocFile] = useState<File | null>(null);
  const [isUploadingDoc, setIsUploadingDoc] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    customerPrice: suggestedPrice.toString(),
    quantity: "1",
    message: "",
  });

  const customerPrice = parseFloat(formData.customerPrice) || 0;
  const quantity = parseInt(formData.quantity) || 1;
  const subtotal = customerPrice * quantity;
  const discountAmount = isVeteran && subtotal > 0 
    ? (subtotal * veteranDiscountPercent) / 100 
    : 0;
  const finalPrice = subtotal - discountAmount;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      setVeteranDocFile(file);
    }
  };

  const uploadVeteranDoc = async (userId: string): Promise<string | null> => {
    if (!veteranDocFile) return null;

    setIsUploadingDoc(true);
    try {
      const fileExt = veteranDocFile.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('veteran-docs')
        .upload(fileName, veteranDocFile);

      if (uploadError) throw uploadError;

      return fileName;
    } catch (error) {
      console.error("Error uploading veteran document:", error);
      toast({
        title: "Upload Failed",
        description: "Could not upload verification document. Proceeding without it.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsUploadingDoc(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isPWYW && customerPrice < 1) {
      toast({
        title: "Invalid Amount",
        description: "Please enter an amount of at least $1",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Upload veteran doc if provided
      let veteranDocUrl = null;
      if (isVeteran && veteranDocFile && user) {
        veteranDocUrl = await uploadVeteranDoc(user.id);
      }
      
      const { error } = await supabase.from("purchase_requests").insert({
        user_id: user?.id || null,
        item_type: itemType,
        item_name: itemName,
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        is_veteran: isVeteran,
        veteran_type: isVeteran ? veteranType : null,
        veteran_id_last4: isVeteran ? veteranIdLast4 : null,
        veteran_document_url: veteranDocUrl,
        suggested_price: suggestedPrice,
        customer_price: customerPrice,
        discount_amount: discountAmount,
        final_price: finalPrice,
        quantity: quantity,
        message: formData.message,
        payment_status: 'pending',
        status: 'pending',
      });

      if (error) throw error;

      toast({
        title: "Purchase Request Submitted!",
        description: "We'll send payment instructions to your email within 24 hours.",
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        customerPrice: suggestedPrice.toString(),
        quantity: "1",
        message: "",
      });
      setIsVeteran(false);
      setVeteranType("");
      setVeteranIdLast4("");
      setVeteranDocFile(null);
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting purchase:", error);
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{isPWYW ? "Name Your Price" : "Purchase"} - {itemName}</DialogTitle>
          <DialogDescription>
            {isPWYW 
              ? "Choose what you'd like to pay. All proceeds support scam prevention education."
              : "Complete your purchase information below."
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pricing */}
          <div className="bg-muted p-4 rounded-lg space-y-3">
            {isPWYW ? (
              <div>
                <Label htmlFor="customerPrice">Your Price (minimum $1) *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="customerPrice"
                    type="number"
                    min="1"
                    step="0.01"
                    required
                    value={formData.customerPrice}
                    onChange={(e) => setFormData({ ...formData, customerPrice: e.target.value })}
                    className="pl-8"
                    placeholder="10.00"
                  />
                </div>
                {suggestedPrice > 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Suggested: ${suggestedPrice.toFixed(2)}
                  </p>
                )}
              </div>
            ) : (
              <div className="flex justify-between text-sm">
                <span>Price per item:</span>
                <span className="font-semibold">${customerPrice.toFixed(2)}</span>
              </div>
            )}

            {itemType === 'product' && (
              <div>
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max="10"
                  required
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                />
              </div>
            )}

            {quantity > 1 && (
              <div className="flex justify-between text-sm">
                <span>Subtotal ({quantity} items):</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
            )}

            {isVeteran && (
              <div className="flex justify-between text-sm text-success">
                <span>Veteran Discount ({veteranDiscountPercent}%):</span>
                <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-lg font-bold border-t border-border pt-2">
              <span>Total:</span>
              <span className="text-primary">${finalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="John Doe"
              />
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Payment instructions will be sent here
              </p>
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Any special instructions or questions..."
                rows={2}
              />
            </div>
          </div>

          {/* Veteran Status */}
          <div className="border border-primary/20 rounded-lg p-4 space-y-4 bg-primary/5">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="veteran-toggle" className="text-base font-semibold">
                  🇺🇸 Veteran or First Responder?
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Receive {veteranDiscountPercent}% discount
                </p>
              </div>
              <Switch
                id="veteran-toggle"
                checked={isVeteran}
                onCheckedChange={setIsVeteran}
              />
            </div>

            {isVeteran && (
              <div className="space-y-4 pt-2">
                <div>
                  <Label htmlFor="veteranType">Service Type *</Label>
                  <Select value={veteranType} onValueChange={setVeteranType} required={isVeteran}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your service type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active_duty">Active Duty Military</SelectItem>
                      <SelectItem value="veteran">Veteran</SelectItem>
                      <SelectItem value="reservist">Reservist/National Guard</SelectItem>
                      <SelectItem value="first_responder">First Responder</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="veteranId">Last 4 Digits of ID/Badge Number *</Label>
                  <Input
                    id="veteranId"
                    maxLength={4}
                    required={isVeteran}
                    value={veteranIdLast4}
                    onChange={(e) => setVeteranIdLast4(e.target.value.replace(/\D/g, ''))}
                    placeholder="1234"
                  />
                </div>

                <div>
                  <Label htmlFor="veteranDoc">Upload Verification (Optional)</Label>
                  <div className="mt-2">
                    {veteranDocFile ? (
                      <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                        <span className="text-sm flex-1 truncate">{veteranDocFile.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setVeteranDocFile(null)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                        <Upload className="w-6 h-6 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Click to upload DD-214, ID card, or badge (PDF, JPG, PNG - Max 5MB)
                        </span>
                        <input
                          id="veteranDoc"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png,.webp"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Uploading verification speeds up processing. We may request documentation if not provided.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={isSubmitting || isUploadingDoc}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting || isUploadingDoc}>
              {isSubmitting || isUploadingDoc ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isUploadingDoc ? "Uploading..." : "Submitting..."}
                </>
              ) : (
                "Submit Purchase"
              )}
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            After submission, you'll receive payment instructions via email. No payment is processed until you approve.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
