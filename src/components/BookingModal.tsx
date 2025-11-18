import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, X, Calendar as CalendarIcon, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { bookingFormSchema, formatPhoneNumber } from "@/utils/formValidation";
import { z } from "zod";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceType: 'training' | 'scamshield' | 'business' | 'website' | 'guide' | 'product';
  serviceName: string;
  serviceTier?: string;
  basePrice?: number;
  veteranDiscountPercent?: number;
}

type BookingFormData = z.infer<typeof bookingFormSchema>;

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
  const [veteranDocFile, setVeteranDocFile] = useState<File | null>(null);
  const [isUploadingDoc, setIsUploadingDoc] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  
  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
      preferredDates: "",
      isVeteran: false,
      veteranType: "",
      veteranIdLast4: "",
    },
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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border/50 bg-gradient-to-b from-card to-card/80 shadow-2xl backdrop-blur-xl">
        <DialogHeader className="space-y-4 border-b border-border/50 pb-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center flex-shrink-0 shadow-lg">
              <CalendarIcon className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Book {serviceName}
              </DialogTitle>
              <DialogDescription className="text-base mt-2">
                {serviceTier && (
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-primary/20 to-accent/20 text-primary font-bold rounded-full text-sm mb-2">
                    {serviceTier}
                  </span>
                )}
                <span className="block text-muted-foreground">
                  Complete the form below and we'll contact you within 24 hours to confirm your booking.
                </span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8 pt-6">
          {/* Pricing Display */}
          {basePrice > 0 && (
            <div className="relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 p-6 shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl" />
              <div className="relative space-y-3">
                <div className="flex justify-between items-center text-base">
                  <span className="font-medium text-muted-foreground">Base Price</span>
                  <span className="font-bold text-foreground text-xl">${basePrice.toFixed(2)}</span>
                </div>
                {isVeteran && (
                  <div className="flex justify-between items-center text-base bg-green-500/10 -mx-6 px-6 py-2">
                    <span className="font-medium text-green-600 dark:text-green-400">Veteran Discount ({veteranDiscountPercent}%)</span>
                    <span className="font-bold text-green-600 dark:text-green-400 text-xl">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-xl font-bold border-t-2 border-primary/30 pt-3">
                  <span className="text-foreground">Total Amount</span>
                  <span className="text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    ${finalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Contact Information Section */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <h3 className="text-lg font-bold text-foreground">Contact Details</h3>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-semibold">Full Name *</Label>
                <Input
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="John Doe"
                  className="h-12 text-base border-2 focus:border-primary/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="h-12 text-base border-2 focus:border-primary/50"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="phone" className="text-sm font-semibold">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(555) 123-4567"
                  className="h-12 text-base border-2 focus:border-primary/50"
                />
              </div>
            </div>

            {(serviceType === 'training' || serviceType === 'scamshield' || serviceType === 'business' || serviceType === 'website') && (
              <div className="space-y-2">
                <Label htmlFor="preferredDate" className="text-sm font-semibold">Preferred Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="preferredDate"
                      variant="outline"
                      className={cn(
                        "w-full h-12 justify-start text-left font-normal border-2 text-base",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-5 w-5" />
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
                <p className="text-xs text-muted-foreground mt-1 bg-muted/50 p-2 rounded-lg">
                  We'll confirm availability and schedule accordingly
                </p>
              </div>
            )}

            {(serviceType === 'training' || serviceType === 'scamshield') && (
              <div className="space-y-2">
                <Label htmlFor="preferredDates" className="text-sm font-semibold">Alternative Dates/Times</Label>
                <Textarea
                  id="preferredDates"
                  value={formData.preferredDates}
                  onChange={(e) => setFormData({ ...formData, preferredDates: e.target.value })}
                  placeholder="Any alternative dates or specific time preferences..."
                  rows={2}
                  className="text-base border-2 focus:border-primary/50"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-semibold">Additional Information</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Any special requirements or questions..."
                rows={3}
                className="text-base border-2 focus:border-primary/50"
              />
            </div>
          </div>

          {/* Veteran Status Section */}
          <div className="relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 p-6 space-y-6 shadow-lg">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🇺🇸</span>
                    <Label htmlFor="veteran-toggle" className="text-lg font-bold text-foreground">
                      Veteran or First Responder?
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receive {veteranDiscountPercent}% discount on all services
                  </p>
                </div>
                <Switch
                  id="veteran-toggle"
                  checked={isVeteran}
                  onCheckedChange={setIsVeteran}
                  className="data-[state=checked]:bg-primary"
                />
              </div>

              {isVeteran && (
                <div className="space-y-5 pt-6 border-t-2 border-primary/20 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="veteranType" className="text-sm font-semibold">Service Type *</Label>
                    <Select value={veteranType} onValueChange={setVeteranType} required={isVeteran}>
                      <SelectTrigger className="h-12 text-base border-2">
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

                  <div className="space-y-2">
                    <Label htmlFor="veteranId" className="text-sm font-semibold">Last 4 Digits of ID/Badge Number *</Label>
                    <Input
                      id="veteranId"
                      maxLength={4}
                      required={isVeteran}
                      value={veteranIdLast4}
                      onChange={(e) => setVeteranIdLast4(e.target.value.replace(/\D/g, ''))}
                      placeholder="1234"
                      className="h-12 text-base border-2 focus:border-primary/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="veteranDoc" className="text-sm font-semibold">Verification Document *</Label>
                    <div className="mt-2">
                      {veteranDocFile ? (
                        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500/10 to-green-500/5 rounded-xl border-2 border-green-500/30">
                          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                          </div>
                          <span className="text-sm font-medium flex-1 truncate">{veteranDocFile.name}</span>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setVeteranDocFile(null)}
                            className="hover:bg-destructive/10"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-primary/50 rounded-xl cursor-pointer hover:bg-primary/5 hover:border-primary transition-all group">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Upload className="w-7 h-7 text-primary" />
                          </div>
                          <div className="text-center">
                            <span className="text-base font-bold text-primary block">Upload Verification</span>
                            <span className="text-sm text-muted-foreground block mt-1">DD-214, Military ID, or First Responder Badge</span>
                            <span className="text-xs text-muted-foreground block mt-1">PDF, JPG, PNG (Max 5MB)</span>
                          </div>
                          <input id="veteranDoc" type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" onChange={handleFileChange} className="hidden" required={isVeteran} />
                        </label>
                      )}
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-xl mt-2">
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        <strong className="font-bold">Discount Requirement:</strong> Upload verification to receive your {veteranDiscountPercent}% discount. All documents are securely stored and used only for verification.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-14 text-base font-semibold border-2"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 h-14 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg" 
              disabled={isSubmitting || isUploadingDoc}
            >
              {isSubmitting || isUploadingDoc ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {isUploadingDoc ? "Uploading..." : "Submitting..."}
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Submit Booking Request
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
