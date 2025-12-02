import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Handshake, CheckCircle } from "lucide-react";
import { formatPhoneNumber } from "@/utils/formValidation";

const partnershipSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  contactName: z.string().min(2, "Contact name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  partnershipArea: z.string().min(1, "Please select a partnership area"),
  message: z.string().min(10, "Please describe your partnership goals"),
});

type PartnershipFormData = z.infer<typeof partnershipSchema>;

interface PartnershipModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PartnershipModal = ({ open, onOpenChange }: PartnershipModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [inquiryNumber, setInquiryNumber] = useState("");

  const form = useForm<PartnershipFormData>({
    resolver: zodResolver(partnershipSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      partnershipArea: "",
      message: "",
    },
  });

  const handleSubmit = async (data: PartnershipFormData) => {
    setLoading(true);

    try {
      const formattedPhone = formatPhoneNumber(data.phone);
      const inquiryNum = `INQ-${Date.now().toString().slice(-8)}`;

      // Insert partnership inquiry
      const { error } = await supabase.from("service_inquiries").insert([
        {
          inquiry_number: inquiryNum,
          service_type: "partnership",
          service_name: `Partnership - ${data.partnershipArea}`,
          service_price: 0,
          full_name: data.contactName,
          email: data.email,
          phone: formattedPhone,
          company_name: data.companyName,
          requirements: data.message,
          status: "new",
        },
      ]);

      if (error) throw error;

      setInquiryNumber(inquiryNum);

      // Track analytics
      const { trackFormSubmit } = await import("@/utils/analyticsTracker");
      trackFormSubmit("partnership_inquiry", { partnershipArea: data.partnershipArea });

      // Show thank you message
      setShowThankYou(true);

      toast({
        title: "Partnership Inquiry Received!",
        description: `Your inquiry #${inquiryNum} has been submitted. We'll contact you soon.`,
      });

      // Reset after 5 seconds
      setTimeout(() => {
        setShowThankYou(false);
        onOpenChange(false);
        form.reset();
      }, 5000);
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (showThankYou) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8 space-y-6">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-foreground">Thank You!</h3>
              <p className="text-muted-foreground">
                Your partnership inquiry has been received.
              </p>
              <p className="text-sm text-muted-foreground">
                Inquiry #{inquiryNumber}
              </p>
              <p className="text-sm text-muted-foreground">
                Our team will review your submission and contact you within 2-3 business days.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Handshake className="w-6 h-6 text-primary" />
            Partner With Us
          </DialogTitle>
          <DialogDescription>
            Join us in making a difference. Tell us about your organization and partnership goals.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company/Organization Name *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your Organization" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Person *</FormLabel>
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
                  <FormLabel>Phone *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="(555) 123-4567" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="partnershipArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Partnership Area *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select area of interest" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="healthcare">Healthcare Facility</SelectItem>
                      <SelectItem value="education">School/University</SelectItem>
                      <SelectItem value="community">Community Organization</SelectItem>
                      <SelectItem value="corporate">Corporate Sponsor</SelectItem>
                      <SelectItem value="technology">Technology Partner</SelectItem>
                      <SelectItem value="nonprofit">Nonprofit Organization</SelectItem>
                      <SelectItem value="government">Government Agency</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Partnership Goals & Message *</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Tell us about your organization and what you hope to achieve through partnership..."
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
              <p>
                Have specific questions?{" "}
                <a href="/contact" className="text-primary hover:underline font-medium">
                  Contact us directly
                </a>
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Handshake className="mr-2 h-4 w-4" />
                    Submit Inquiry
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
