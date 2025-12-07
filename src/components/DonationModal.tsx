import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Users, DollarSign, Building2, Loader2, CreditCard, CheckCircle } from "lucide-react";
import { donationFormSchema, formatPhoneNumber } from "@/utils/formValidation";
import { z } from "zod";

interface DonationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type?: 'sponsor' | 'monthly' | 'corporate' | 'general';
}

type DonationFormData = z.infer<typeof donationFormSchema>;

export const DonationModal = ({ open, onOpenChange, type = 'general' }: DonationModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>(type === 'monthly' ? 'monthly' : 'one-time');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(
    type === 'sponsor' ? 100 : type === 'monthly' ? 25 : null
  );
  
  const form = useForm<DonationFormData>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      donor_name: '',
      email: '',
      phone: '',
      message: '',
      amount: selectedAmount || 0,
      sponsor_info: '',
      recipient_info: '',
      company_name: '',
    },
  });

  const { isSubmitting } = form.formState;

  const handleSubmit = async (data: DonationFormData) => {
    if (!selectedAmount || selectedAmount < 5) {
      toast({
        title: "Invalid Amount",
        description: "Please select or enter a donation amount of at least $5.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const formattedPhone = data.phone ? formatPhoneNumber(data.phone) : null;
      
      // First create the donation record
      const { data: donation, error: insertError } = await supabase.from('donations').insert([
        {
          donor_name: data.donor_name,
          email: data.email,
          amount: selectedAmount,
          donation_type: donationType,
          message: `${data.message || ''}\n\nType: ${type}\n${
            type === 'sponsor' ? `Sponsor: ${data.sponsor_info}\nRecipient: ${data.recipient_info}` : ''
          }${type === 'corporate' ? `Company: ${data.company_name}` : ''}${
            formattedPhone ? `\nPhone: ${formattedPhone}` : ''
          }`,
          payment_status: 'pending',
        },
      ]).select().single();

      if (insertError) throw insertError;

      // Now process the payment via edge function
      const { data: paymentData, error: paymentError } = await supabase.functions.invoke('process-donation', {
        body: {
          donorName: data.donor_name,
          email: data.email,
          amount: selectedAmount,
          donationType: donationType,
          message: data.message,
          donationId: donation?.id,
        }
      });

      if (paymentError) throw paymentError;

      if (paymentData?.url) {
        // Redirect to Stripe checkout
        window.open(paymentData.url, '_blank');
        toast({
          title: "Redirecting to Payment",
          description: "Opening secure payment page. Complete your donation there.",
        });
        onOpenChange(false);
        form.reset();
        setSelectedAmount(null);
      } else {
        throw new Error("Failed to create payment session");
      }
    } catch (error: any) {
      console.error('Donation error:', error);
      toast({
        title: "Payment Failed",
        description: error.message || "Please check your information and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'sponsor':
        return 'Sponsor a Seat';
      case 'monthly':
        return 'Monthly Ally Program';
      case 'corporate':
        return 'Corporate Partnership';
      default:
        return 'Make a Donation';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'sponsor':
        return <Users className="w-8 h-8 text-primary" />;
      case 'monthly':
        return <DollarSign className="w-8 h-8 text-accent" />;
      case 'corporate':
        return <Building2 className="w-8 h-8 text-secondary" />;
      default:
        return <DollarSign className="w-8 h-8 text-primary" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center gap-4">
          {getIcon()}
          <DialogTitle className="text-2xl font-bold">{getTitle()}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {type !== 'monthly' && (
              <div className="space-y-3">
                <label className="text-sm font-medium">Donation Type</label>
                <RadioGroup value={donationType} onValueChange={(value) => setDonationType(value as 'one-time' | 'monthly')}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="one-time" id="one-time" />
                    <label htmlFor="one-time" className="cursor-pointer">One-time Donation</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <label htmlFor="monthly" className="cursor-pointer">Monthly Donation</label>
                  </div>
                </RadioGroup>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-sm font-medium">Select Amount</label>
              <div className="grid grid-cols-4 gap-2">
                {[25, 50, 100, 250].map((amount) => (
                  <Card
                    key={amount}
                    className={`p-3 text-center cursor-pointer transition-all ${
                      selectedAmount === amount
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'hover:border-primary'
                    }`}
                    onClick={() => setSelectedAmount(amount)}
                  >
                    ${amount}
                  </Card>
                ))}
              </div>
              <Input
                type="number"
                placeholder="Custom amount"
                value={selectedAmount || ''}
                onChange={(e) => setSelectedAmount(Number(e.target.value))}
                min={5}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="donor_name"
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

            {type === 'sponsor' && (
              <>
                <FormField
                  control={form.control}
                  name="sponsor_info"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Information</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Tell us about yourself..." rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="recipient_info"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Who would you like to sponsor?</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Tell us about the person or organization..." rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {type === 'corporate' && (
              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Company Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message (Optional)</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Share your thoughts..." rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Payment Security Notice */}
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-primary" />
                <span className="font-medium">Secure Payment via Stripe</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your donation helps us protect and empower our community. You'll be redirected to Stripe's secure checkout to complete your payment.
              </p>
            </div>

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
                disabled={loading || isSubmitting || !selectedAmount}
                className="flex-1"
              >
                {loading || isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Donate ${selectedAmount || 0}{donationType === 'monthly' ? '/month' : ''}
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
