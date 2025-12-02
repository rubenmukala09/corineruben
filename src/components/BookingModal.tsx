import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [loading, setLoading] = useState(false);
  const [veteranDocFile, setVeteranDocFile] = useState<File | null>(null);
  const [isUploadingDoc, setIsUploadingDoc] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  
  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      preferredDates: '',
      message: '',
      isVeteran: false,
      veteranType: '',
      veteranIdLast4: '',
    },
  });

  const { isSubmitting } = form.formState;
  const isVeteran = form.watch('isVeteran');
  const veteranType = form.watch('veteranType');

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

  const handleSubmit = async (data: BookingFormData) => {
    setLoading(true);

    try {
      const formattedPhone = data.phone ? formatPhoneNumber(data.phone) : null;
      const { data: { user } } = await supabase.auth.getUser();
      let docPath = null;

      if (data.isVeteran && veteranDocFile && user) {
        docPath = await uploadVeteranDoc(user.id);
      }

      const requestNumber = `REQ-${Date.now().toString().slice(-8)}`;

      const { error } = await supabase.from('booking_requests').insert([
        {
          full_name: data.fullName,
          email: data.email,
          phone: formattedPhone,
          service_type: serviceType,
          service_name: serviceName,
          service_tier: serviceTier || null,
          preferred_dates: data.preferredDates,
          message: data.message,
          is_veteran: data.isVeteran,
          veteran_type: data.isVeteran ? data.veteranType : null,
          veteran_id_last4: data.isVeteran ? data.veteranIdLast4 : null,
          request_number: requestNumber,
          status: 'pending',
          base_price: basePrice,
          discount_amount: discountAmount,
          final_price: finalPrice,
          user_id: user?.id,
        },
      ]);

      if (error) throw error;

      // Track analytics
      const { trackFormSubmit, trackConversion } = await import("@/utils/analyticsTracker");
      trackFormSubmit("booking_form", { 
        serviceType, 
        serviceName, 
        isVeteran: data.isVeteran 
      });
      trackConversion("booking_submission", finalPrice);

      toast({
        title: "Booking Request Submitted!",
        description: `Your request #${requestNumber} has been received. We'll contact you soon.`,
      });

      onOpenChange(false);
      form.reset();
      setVeteranDocFile(null);
      setSelectedDate(undefined);
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message || "Please check your information and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Request Service</DialogTitle>
          <DialogDescription>
            Fill out the form below to request {serviceName}
            {serviceTier && ` - ${serviceTier}`}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="John Doe" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="john@example.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="(555) 123-4567" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredDates"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Date/Time</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          field.onChange(date ? format(date, "PPP") : '');
                        }}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Tell us more about your needs..."
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <FormField
                control={form.control}
                name="isVeteran"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>I am a veteran or military family member</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {isVeteran && (
                <>
                  <FormField
                    control={form.control}
                    name="veteranType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Veteran Type *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="veteran">Veteran</SelectItem>
                            <SelectItem value="active_duty">Active Duty</SelectItem>
                            <SelectItem value="family">Family Member</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="veteranIdLast4"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last 4 of Veteran ID *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            maxLength={4}
                            placeholder="1234"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <FormLabel>Upload Verification Document (Optional)</FormLabel>
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        disabled={isUploadingDoc}
                      />
                      {veteranDocFile && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setVeteranDocFile(null)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    {veteranDocFile && (
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {veteranDocFile.name}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>

            {basePrice > 0 && (
              <div className="p-4 bg-primary/5 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Base Price:</span>
                  <span>${basePrice.toFixed(2)}</span>
                </div>
                {isVeteran && discountAmount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Veteran Discount ({veteranDiscountPercent}%):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total:</span>
                  <span>${finalPrice.toFixed(2)}</span>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading || isSubmitting}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading || isSubmitting || isUploadingDoc}
                className="flex-1"
              >
                {loading || isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Request"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};