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
import { Loader2, Shield, CheckCircle, Info } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { OrderSummary } from "@/components/OrderSummary";
import TrustBadges from "@/components/TrustBadges";
import { VeteranIdUpload } from "@/components/VeteranIdUpload";
import { RefundPolicyDisclaimer } from "@/components/RefundPolicyDisclaimer";
import { AcceptedCardsDisplay } from "@/components/AcceptedCardsDisplay";

interface PurchaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemType: 'guide' | 'product';
  itemName: string;
  suggestedPrice?: number;
  isPWYW?: boolean;
  veteranDiscountPercent?: number;
}

export const PurchaseModal = ({ open, onOpenChange, itemType, itemName, suggestedPrice = 0, isPWYW = false, veteranDiscountPercent = 3 }: PurchaseModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVeteran, setIsVeteran] = useState(false);
  const [veteranType, setVeteranType] = useState<string>("");
  const [veteranIdFile, setVeteranIdFile] = useState<File | null>(null);
  const [isUploadingDoc, setIsUploadingDoc] = useState(false);
  const [refundPolicyAccepted, setRefundPolicyAccepted] = useState(false);
  
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
  const discountAmount = isVeteran && subtotal > 0 ? (subtotal * veteranDiscountPercent) / 100 : 0;
  const finalPrice = subtotal - discountAmount;

  const uploadVeteranDoc = async (userId: string): Promise<string | null> => {
    if (!veteranIdFile) return null;
    setIsUploadingDoc(true);
    try {
      const fileExt = veteranIdFile.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('veteran-docs').upload(fileName, veteranIdFile);
      if (uploadError) throw uploadError;
      return fileName;
    } catch (error) {
      console.error("Error uploading:", error);
      toast({ title: "Upload Failed", description: "Proceeding without document.", variant: "destructive" });
      return null;
    } finally {
      setIsUploadingDoc(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isPWYW && customerPrice < 1) {
      toast({ title: "Invalid Amount", description: "Please enter at least $1", variant: "destructive" });
      return;
    }
    if (!refundPolicyAccepted) {
      toast({ title: "Policy Required", description: "Please accept the refund policy", variant: "destructive" });
      return;
    }
    if (isVeteran && !veteranIdFile) {
      toast({ title: "ID Required", description: "Please upload your veteran ID", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      let veteranDocUrl = null;
      if (isVeteran && veteranIdFile && user) veteranDocUrl = await uploadVeteranDoc(user.id);
      const requestNumber = `REQ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const { error } = await supabase.from('purchase_requests').insert([{
        request_number: requestNumber, user_id: user?.id || null, item_type: itemType, item_name: itemName,
        full_name: formData.fullName, email: formData.email, phone: formData.phone,
        customer_price: customerPrice, quantity: quantity, subtotal: subtotal, discount_amount: discountAmount, final_price: finalPrice,
        message: formData.message, is_veteran: isVeteran, veteran_type: isVeteran ? veteranType : null,
        veteran_document_url: veteranDocUrl, status: 'pending'
      }]);
      if (error) throw error;
      toast({ title: "Request Submitted!", description: `Reference: ${requestNumber}. Check email within 24 hours.` });
      setFormData({ fullName: "", email: "", phone: "", customerPrice: suggestedPrice.toString(), quantity: "1", message: "" });
      setIsVeteran(false); setVeteranType(""); setVeteranIdFile(null); setRefundPolicyAccepted(false);
      onOpenChange(false);
    } catch (error) {
      console.error("Error:", error);
      toast({ title: "Submission Failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Purchase {itemName}</DialogTitle>
          <DialogDescription>Submit your request - we'll send you a secure payment link via email</DialogDescription>
        </DialogHeader>
        <Alert className="mb-4 border-primary/50 bg-primary/5">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-sm"><strong>How it works:</strong> After submitting, we'll review and send you a secure payment link within 24 hours.</AlertDescription>
        </Alert>
        <div className="grid md:grid-cols-3 gap-6">
          <form onSubmit={handleSubmit} className="space-y-6 md:col-span-2">
            <div className="space-y-4">
              {isPWYW && <Input type="number" min="1" step="0.01" placeholder={`Suggested: $${suggestedPrice}`} value={formData.customerPrice} onChange={(e) => setFormData({ ...formData, customerPrice: e.target.value })} required />}
              {!isPWYW && <div className="flex justify-between"><span>Price per item:</span><span className="font-semibold">${suggestedPrice.toFixed(2)}</span></div>}
              <Input type="number" min="1" placeholder="Quantity" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} required />
            </div>
            <div className="space-y-4">
              <Input placeholder="Full Name" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} required />
              <Input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
              <Input type="tel" placeholder="Phone (Optional)" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              <Textarea placeholder="Additional notes..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={3} />
            </div>
            <Collapsible>
              <div className="p-4 bg-primary/5 rounded-lg border space-y-4">
                <CollapsibleTrigger className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-primary" /><h3 className="font-semibold">Veteran Discount</h3></div>
                  <Switch checked={isVeteran} onCheckedChange={setIsVeteran} />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 space-y-4">
                  {isVeteran && (<>
                    <Alert><CheckCircle className="h-4 w-4" /><AlertDescription>Thank you for your service! {veteranDiscountPercent}% discount.</AlertDescription></Alert>
                    <Select value={veteranType} onValueChange={setVeteranType}>
                      <SelectTrigger><SelectValue placeholder="Service type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="military-active">Active Military</SelectItem>
                        <SelectItem value="military-veteran">Veteran</SelectItem>
                        <SelectItem value="police">Police</SelectItem>
                        <SelectItem value="firefighter">Firefighter</SelectItem>
                      </SelectContent>
                    </Select>
                    <VeteranIdUpload
                      isVeteran={isVeteran}
                      onFileUpload={setVeteranIdFile}
                      uploadedFile={veteranIdFile}
                    />
                  </>)}
                </CollapsibleContent>
              </div>
            </Collapsible>

            <RefundPolicyDisclaimer
              onAcknowledge={setRefundPolicyAccepted}
              type={itemType === 'guide' ? 'digital' : 'physical'}
            />

            <AcceptedCardsDisplay />

            <Button type="submit" className="w-full h-12" size="lg" disabled={isSubmitting || isUploadingDoc}>
              {isSubmitting || isUploadingDoc ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />{isUploadingDoc ? 'Uploading...' : 'Submitting...'}</> : <><CheckCircle className="mr-2 h-5 w-5" />Submit Request</>}
            </Button>
            <TrustBadges />
          </form>
          <div className="hidden md:block"><div className="sticky top-4 space-y-4"><OrderSummary items={[{ name: itemName, quantity, price: customerPrice }]} subtotal={subtotal} discount={discountAmount} total={finalPrice} /><div className="p-4 bg-muted/50 rounded-lg border space-y-2"><h4 className="font-semibold text-sm">What's Next?</h4><ol className="text-xs space-y-1 list-decimal list-inside"><li>We review your request</li><li>Get payment link via email</li><li>Complete payment</li><li>Receive {itemType}</li></ol><p className="text-xs pt-2">⏱️ Response: <strong>Within 24 hours</strong></p></div></div></div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
