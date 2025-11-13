import { useState } from "react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, X, Calendar as CalendarIcon, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceType: 'training' | 'scamshield' | 'business' | 'website' | 'guide' | 'product';
  serviceName: string;
  serviceTier?: string;
  basePrice?: number;
  veteranDiscountPercent?: number;
}

export const BookingModal = ({
  open,
  onOpenChange,
  serviceType,
  serviceName,
  serviceTier,
  basePrice = 0,
  veteranDiscountPercent = 10,
}: BookingModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVeteran, setIsVeteran] = useState(false);
  const [veteranType, setVeteranType] = useState<string>("");
  const [veteranIdLast4, setVeteranIdLast4] = useState("");
  const [veteranDocFile, setVeteranDocFile] = useState<File | null>(null);
  const [isUploadingDoc, setIsUploadingDoc] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    preferredDates: "",
  });

  const discountAmount = isVeteran && basePrice > 0 
    ? (basePrice * veteranDiscountPercent) / 100 
    : 0;
  const finalPrice = basePrice - discountAmount;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Upload veteran doc if provided
      let veteranDocUrl = null;
      if (isVeteran && veteranDocFile && user) {
        veteranDocUrl = await uploadVeteranDoc(user.id);
      }
      
      const { error } = await supabase.from("booking_requests").insert({
        user_id: user?.id || null,
        service_type: serviceType,
        service_name: serviceName,
        service_tier: serviceTier,
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        is_veteran: isVeteran,
        veteran_type: isVeteran ? veteranType : null,
        veteran_id_last4: isVeteran ? veteranIdLast4 : null,
        veteran_document_url: veteranDocUrl,
        base_price: basePrice,
        discount_amount: discountAmount,
        final_price: finalPrice,
        message: formData.message,
        preferred_dates: selectedDate 
          ? `Primary: ${format(selectedDate, "PPP")}${formData.preferredDates ? `\nAlternatives: ${formData.preferredDates}` : ''}`
          : formData.preferredDates,
      });

      if (error) throw error;

      toast({
        title: "Request Submitted!",
        description: "We'll contact you within 24 hours to confirm your booking.",
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
        preferredDates: "",
      });
      setIsVeteran(false);
      setVeteranType("");
      setVeteranIdLast4("");
      setVeteranDocFile(null);
      setSelectedDate(undefined);
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting booking:", error);
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
          <DialogTitle className="text-2xl">Book {serviceName}</DialogTitle>
          <DialogDescription>
            {serviceTier && <span className="block mb-2 font-semibold text-primary">{serviceTier}</span>}
            Fill out the form below and we'll contact you within 24 hours to confirm your booking.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pricing Display */}
          {basePrice > 0 && (
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span>Base Price:</span>
                <span className="font-semibold">${basePrice.toFixed(2)}</span>
              </div>
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
          )}

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

            {(serviceType === 'training' || serviceType === 'scamshield' || serviceType === 'business' || serviceType === 'website') && (
              <div>
                <Label htmlFor="preferredDate">Select Preferred Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="preferredDate"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-xs text-muted-foreground mt-1">
                  We'll confirm availability and schedule accordingly
                </p>
              </div>
            )}

            {(serviceType === 'training' || serviceType === 'scamshield') && (
              <div>
                <Label htmlFor="preferredDates">Additional Preferred Dates/Times</Label>
                <Textarea
                  id="preferredDates"
                  value={formData.preferredDates}
                  onChange={(e) => setFormData({ ...formData, preferredDates: e.target.value })}
                  placeholder="Any alternative dates or specific time preferences..."
                  rows={2}
                />
              </div>
            )}

            <div>
              <Label htmlFor="message">Additional Information</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Any special requirements or questions..."
                rows={3}
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
                  Receive {veteranDiscountPercent}% discount on all services
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
                  <Label htmlFor="veteranDoc">Upload Verification (Required for Discount) *</Label>
                  <div className="mt-2">
                    {veteranDocFile ? (
                      <div className="flex items-center gap-2 p-3 bg-muted rounded-lg border border-success">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span className="text-sm flex-1 truncate">{veteranDocFile.name}</span>
                        <Button type="button" variant="ghost" size="sm" onClick={() => setVeteranDocFile(null)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-primary/50 rounded-lg cursor-pointer hover:bg-primary/5 transition-colors">
                        <Upload className="w-6 h-6 text-primary" />
                        <span className="text-sm font-semibold text-primary">Upload DD-214, Military ID, or First Responder Badge</span>
                        <span className="text-xs text-muted-foreground">PDF, JPG, PNG (Max 5MB)</span>
                        <input id="veteranDoc" type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" onChange={handleFileChange} className="hidden" required={isVeteran} />
                      </label>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 bg-primary/5 p-2 rounded">
                    <strong>Required for discount:</strong> Your verification document is required to receive the {veteranDiscountPercent}% discount. Documents are securely stored and only used for verification purposes.
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
              disabled={isSubmitting}
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
                "Submit Request"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
