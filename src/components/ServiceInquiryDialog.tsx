import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  Building2,
  Mail,
  Phone,
  User,
  FileText,
  Sparkles
} from "lucide-react";
import { trackButtonClick, trackConversion } from "@/utils/analyticsTracker";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  requirements: z.string().min(10, "Please describe your requirements (at least 10 characters)"),
});

type FormData = z.infer<typeof formSchema>;

interface ServiceInquiryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceName: string;
  servicePrice: number;
  serviceTier: string;
  serviceDescription?: string;
}

const formatPhoneNumber = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
  }
  return phone;
};

export const ServiceInquiryDialog = ({
  open,
  onOpenChange,
  serviceName,
  servicePrice,
  serviceTier,
  serviceDescription,
}: ServiceInquiryDialogProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isVeteran, setIsVeteran] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      budget: "",
      timeline: "",
      requirements: "",
    },
  });

  // Auto-fill from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem('checkout_email');
    const savedName = localStorage.getItem('checkout_name');
    if (savedEmail) form.setValue('email', savedEmail);
    if (savedName) form.setValue('fullName', savedName);
  }, [open]);

  const discountAmount = isVeteran ? Math.round(servicePrice * 0.1) : 0;
  const finalPrice = servicePrice - discountAmount;

  const handleSubmit = async (data: FormData) => {
    if (!termsAccepted) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and privacy policy to continue.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const formattedPhone = data.phone ? formatPhoneNumber(data.phone) : null;
      const { data: { user } } = await supabase.auth.getUser();
      const inquiryNumber = `INQ-${Date.now().toString().slice(-8)}`;

      // Save for future auto-fill
      localStorage.setItem('checkout_email', data.email);
      localStorage.setItem('checkout_name', data.fullName);

      const { error } = await supabase.from('service_inquiries').insert([{
        inquiry_number: inquiryNumber,
        service_type: 'ai-automation',
        service_name: serviceName,
        service_price: servicePrice,
        full_name: data.fullName,
        email: data.email,
        phone: formattedPhone,
        company_name: data.companyName || null,
        budget: data.budget || null,
        timeline: data.timeline || null,
        requirements: data.requirements,
        is_veteran: isVeteran,
        veteran_type: isVeteran ? 'veteran' : null,
        status: 'new',
      }]);

      if (error) throw error;

      // Send confirmation email
      try {
        await supabase.functions.invoke('send-inquiry-confirmation', {
          body: {
            email: data.email,
            name: data.fullName,
            serviceName,
            inquiryNumber,
            servicePrice,
            companyName: data.companyName
          }
        });
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
      }

      trackConversion(`inquiry_${serviceTier.toLowerCase()}`, finalPrice);

      toast({
        title: "🎉 Inquiry Submitted Successfully!",
        description: `Reference #${inquiryNumber}. Check your email for confirmation details.`,
      });

      onOpenChange(false);
      form.reset();
      setStep(1);
      setTermsAccepted(false);
      setIsVeteran(false);
    } catch (error: any) {
      console.error('Inquiry submission error:', error);
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = async () => {
    if (step === 1) {
      const valid = await form.trigger(['fullName', 'email', 'phone', 'companyName']);
      if (valid) setStep(2);
    } else if (step === 2) {
      const valid = await form.trigger(['budget', 'timeline', 'requirements']);
      if (valid) setStep(3);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {serviceTier}
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Clock className="w-3 h-3 mr-1" />
              24hr Response
            </Badge>
          </div>
          <DialogTitle className="text-xl">{serviceName}</DialogTitle>
          <DialogDescription>
            {serviceDescription || "Complete the form below and our team will contact you to discuss your project."}
          </DialogDescription>
        </DialogHeader>

        {/* Progress */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Step {step} of 3</span>
            <span>{step === 1 ? 'Contact Info' : step === 2 ? 'Project Details' : 'Review & Submit'}</span>
          </div>
          <Progress value={(step / 3) * 100} className="h-2" />
        </div>

        {/* Price Display */}
        <div className="bg-muted/50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Starting Price</p>
              <p className="text-2xl font-bold text-primary">
                ${finalPrice.toLocaleString()}
                {isVeteran && (
                  <span className="text-sm text-muted-foreground line-through ml-2">
                    ${servicePrice.toLocaleString()}
                  </span>
                )}
              </p>
            </div>
            {isVeteran && (
              <Badge className="bg-success/20 text-success border-success/30">
                <Shield className="w-3 h-3 mr-1" />
                10% Veteran Discount
              </Badge>
            )}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {/* Step 1: Contact Information */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Full Name *
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
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
                      <FormLabel className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email *
                      </FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="(937) 301-8749" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        Company Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Your Company Inc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 2: Project Details */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget Range</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your budget range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="under-10k">Under $10,000</SelectItem>
                          <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                          <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                          <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                          <SelectItem value="over-100k">Over $100,000</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Timeline</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="When do you need this?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="asap">ASAP (Within 2 weeks)</SelectItem>
                          <SelectItem value="1-month">Within 1 month</SelectItem>
                          <SelectItem value="2-3-months">2-3 months</SelectItem>
                          <SelectItem value="3-6-months">3-6 months</SelectItem>
                          <SelectItem value="flexible">Flexible / No rush</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Project Requirements *
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your business needs, current challenges, and what you'd like to automate..."
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 3: Review & Submit */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                {/* Summary */}
                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Inquiry Summary
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Name</p>
                      <p className="font-medium">{form.watch('fullName')}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-medium">{form.watch('email')}</p>
                    </div>
                    {form.watch('companyName') && (
                      <div>
                        <p className="text-muted-foreground">Company</p>
                        <p className="font-medium">{form.watch('companyName')}</p>
                      </div>
                    )}
                    {form.watch('budget') && (
                      <div>
                        <p className="text-muted-foreground">Budget</p>
                        <p className="font-medium">{form.watch('budget')}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Veteran Toggle */}
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-primary" />
                    <div>
                      <Label htmlFor="veteran-discount" className="font-medium">
                        Veteran / First Responder
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Receive 10% discount (verification required)
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="veteran-discount"
                    checked={isVeteran}
                    onCheckedChange={setIsVeteran}
                  />
                </div>

                {/* Terms */}
                <div className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                  />
                  <label htmlFor="terms" className="text-sm leading-tight cursor-pointer">
                    I agree to the{" "}
                    <a href="/terms-of-service" className="text-primary underline" target="_blank" rel="noopener noreferrer">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy-policy" className="text-primary underline" target="_blank" rel="noopener noreferrer">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                {/* What Happens Next */}
                <div className="bg-success/5 border border-success/20 rounded-lg p-4">
                  <h4 className="font-semibold text-success flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4" />
                    What Happens Next?
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Our team reviews your inquiry within 24 hours</li>
                    <li>• We'll schedule a free consultation call</li>
                    <li>• Receive a custom proposal tailored to your needs</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-4">
              {step > 1 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prevStep}
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              
              {step < 3 ? (
                <Button 
                  type="button" 
                  onClick={nextStep}
                  className="flex-1"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={loading || !termsAccepted}
                >
                  {loading ? "Submitting..." : "Submit Inquiry"}
                  <CheckCircle className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
