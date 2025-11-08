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
import { Loader2, Upload, X, Shield } from "lucide-react";

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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] backdrop-blur-sm">
        <DialogHeader className="border-b border-border/50 pb-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg">
              <Loader2 className="w-7 h-7 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                {isPWYW ? "Name Your Price" : "Secure Checkout"}
              </DialogTitle>
              <DialogDescription className="text-base">
                {isPWYW 
                  ? "Choose what you'd like to pay. All proceeds support scam prevention education."
                  : `Complete your purchase for ${itemName}`
                }
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-7 pt-4">
          {/* Pricing Section */}
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-6 rounded-2xl border border-primary/20 shadow-inner space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Order Summary</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            </div>
            {isPWYW ? (
              <div>
                <Label htmlFor="customerPrice" className="text-base font-semibold">Your Price (minimum $1) *</Label>
                <div className="relative mt-2">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg font-bold">$</span>
                  <Input
                    id="customerPrice"
                    type="number"
                    min="1"
                    step="0.01"
                    required
                    value={formData.customerPrice}
                    onChange={(e) => setFormData({ ...formData, customerPrice: e.target.value })}
                    className="pl-10 h-14 text-2xl font-bold rounded-xl border-2"
                    placeholder="10.00"
                  />
                </div>
                {suggestedPrice > 0 && (
                  <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/50" />
                    Suggested: ${suggestedPrice.toFixed(2)}
                  </p>
                )}
              </div>
            ) : (
              <div className="flex justify-between items-center text-base bg-card/50 p-4 rounded-xl">
                <span className="text-muted-foreground">Price per item:</span>
                <span className="font-bold text-xl">${customerPrice.toFixed(2)}</span>
              </div>
            )}

            {itemType === 'product' && (
              <div className="bg-card/50 p-4 rounded-xl">
                <Label htmlFor="quantity" className="text-base font-semibold">Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max="10"
                  required
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="mt-2 h-12 text-lg rounded-xl border-2"
                />
              </div>
            )}

            {quantity > 1 && (
              <div className="flex justify-between items-center text-base bg-card/30 p-3 rounded-xl">
                <span className="text-muted-foreground">Subtotal ({quantity} items):</span>
                <span className="font-bold text-lg">${subtotal.toFixed(2)}</span>
              </div>
            )}

            {isVeteran && (
              <div className="flex justify-between items-center bg-success/10 text-success p-3 rounded-xl">
                <span className="font-semibold">🇺🇸 Veteran Discount ({veteranDiscountPercent}%):</span>
                <span className="font-bold text-lg">-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between items-center bg-gradient-to-r from-primary/10 to-accent/10 p-5 rounded-xl border-2 border-primary/30 shadow-lg mt-4">
              <span className="text-xl font-bold">Total Amount:</span>
              <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">${finalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-card/50 p-6 rounded-2xl border border-border/50 space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Contact Details</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            </div>
            <div>
              <Label htmlFor="fullName" className="text-base font-semibold">Full Name *</Label>
              <Input
                id="fullName"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="John Doe"
                className="mt-2 h-12 rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-base font-semibold">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                className="mt-2 h-12 rounded-xl"
              />
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/50" />
                Payment instructions will be sent here
              </p>
            </div>

            <div>
              <Label htmlFor="phone" className="text-base font-semibold">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(555) 123-4567"
                className="mt-2 h-12 rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="message" className="text-base font-semibold">Message (Optional)</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Any special instructions or questions..."
                rows={3}
                className="mt-2 rounded-xl"
              />
            </div>
          </div>

          {/* Veteran Status */}
          <div className="border-2 border-primary/30 rounded-2xl p-6 space-y-5 bg-gradient-to-br from-primary/10 to-accent/10 shadow-inner">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="veteran-toggle" className="text-lg font-bold flex items-center gap-2">
                  <span className="text-2xl">🇺🇸</span>
                  Veteran or First Responder?
                </Label>
                <p className="text-sm text-muted-foreground mt-2 ml-8">
                  Receive <span className="font-bold text-success">{veteranDiscountPercent}%</span> discount on your purchase
                </p>
              </div>
              <Switch
                id="veteran-toggle"
                checked={isVeteran}
                onCheckedChange={setIsVeteran}
              />
            </div>

            {isVeteran && (
              <div className="space-y-5 pt-4 bg-card/50 p-5 rounded-xl border border-border/50">
                <div>
                  <Label htmlFor="veteranType" className="text-base font-semibold">Service Type *</Label>
                  <Select value={veteranType} onValueChange={setVeteranType} required={isVeteran}>
                    <SelectTrigger className="mt-2 h-12 rounded-xl">
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
                  <Label htmlFor="veteranId" className="text-base font-semibold">Last 4 Digits of ID/Badge Number *</Label>
                  <Input
                    id="veteranId"
                    maxLength={4}
                    required={isVeteran}
                    value={veteranIdLast4}
                    onChange={(e) => setVeteranIdLast4(e.target.value.replace(/\D/g, ''))}
                    placeholder="1234"
                    className="mt-2 h-12 rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="veteranDoc" className="text-base font-semibold">Upload Verification (Optional)</Label>
                  <div className="mt-2">
                    {veteranDocFile ? (
                      <div className="flex items-center gap-3 p-4 bg-success/10 border border-success/30 rounded-xl">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-success mb-1">File uploaded</p>
                          <p className="text-xs text-muted-foreground truncate">{veteranDocFile.name}</p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setVeteranDocFile(null)}
                          className="hover:bg-destructive/20"
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-primary/30 rounded-xl cursor-pointer hover:bg-primary/5 hover:border-primary/50 transition-all">
                        <div className="p-3 rounded-full bg-primary/10">
                          <Upload className="w-7 h-7 text-primary" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-semibold text-foreground mb-1">
                            Click to upload verification
                          </p>
                          <p className="text-xs text-muted-foreground">
                            DD-214, ID card, or badge (PDF, JPG, PNG - Max 5MB)
                          </p>
                        </div>
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
                  <p className="text-xs text-muted-foreground mt-3 flex items-start gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/50 mt-1.5" />
                    <span>Uploading verification speeds up processing. We may request documentation if not provided.</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4 border-t border-border/50">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-14 text-base rounded-xl border-2"
              disabled={isSubmitting || isUploadingDoc}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 h-14 text-base font-bold rounded-xl bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all" 
              disabled={isSubmitting || isUploadingDoc}
            >
              {isSubmitting || isUploadingDoc ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {isUploadingDoc ? "Uploading..." : "Processing..."}
                </>
              ) : (
                "Complete Purchase"
              )}
            </Button>
          </div>

          <div className="bg-primary/5 p-4 rounded-xl border border-primary/20">
            <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>After submission, you'll receive payment instructions via email. No payment is processed until you approve.</span>
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
