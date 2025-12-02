import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Heart, CheckCircle } from "lucide-react";
import { AcceptedCardsDisplay } from "@/components/AcceptedCardsDisplay";
import { QRCodePayment } from "@/components/QRCodePayment";
import { formatPhoneNumber } from "@/utils/formValidation";

const donationSchema = z.object({
  donorName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  amount: z.number().min(5, "Minimum donation is $5"),
  customAmount: z.string().optional(),
  donationType: z.enum(["one-time", "monthly"]),
  message: z.string().optional(),
});

type DonationFormData = z.infer<typeof donationSchema>;

interface ChildrenDonationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ChildrenDonationModal = ({ open, onOpenChange }: ChildrenDonationModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "qr">("card");
  const [showThankYou, setShowThankYou] = useState(false);
  const [donationNumber, setDonationNumber] = useState("");

  const form = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      donorName: "",
      email: "",
      phone: "",
      amount: 50,
      donationType: "one-time",
      message: "",
    },
  });

  const donationType = form.watch("donationType");
  const customAmount = form.watch("customAmount");

  const presetAmounts = [25, 50, 100, 250];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    form.setValue("amount", amount);
    form.setValue("customAmount", "");
  };

  const handleCustomAmount = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 5) {
      setSelectedAmount(numValue);
      form.setValue("amount", numValue);
    }
  };

  const handleSubmit = async (data: DonationFormData) => {
    setLoading(true);

    try {
      const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;
      
      if (finalAmount < 5) {
        toast({
          title: "Invalid Amount",
          description: "Minimum donation is $5",
          variant: "destructive",
        });
        return;
      }

      const formattedPhone = data.phone ? formatPhoneNumber(data.phone) : null;
      const donationNum = `DON-${Date.now().toString().slice(-8)}`;

      // Insert donation record
      const { error } = await supabase.from("donations").insert([
        {
          donor_name: data.donorName,
          email: data.email,
          amount: finalAmount,
          donation_type: donationType === "monthly" ? "monthly_cancer" : "one_time_cancer",
          message: data.message || null,
          payment_status: "pending",
        },
      ]);

      if (error) throw error;

      setDonationNumber(donationNum);

      // Track analytics
      const { trackConversion } = await import("@/utils/analyticsTracker");
      trackConversion("donation", finalAmount);

      // Show thank you message
      setShowThankYou(true);

      toast({
        title: "Thank You! ❤️",
        description: `Your ${donationType} donation of $${finalAmount.toFixed(2)} has been received.`,
      });

      // Reset after 5 seconds
      setTimeout(() => {
        setShowThankYou(false);
        onOpenChange(false);
        form.reset();
        setSelectedAmount(50);
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
              <h3 className="text-2xl font-bold text-foreground">Thank You! ❤️</h3>
              <p className="text-muted-foreground">
                Your {donationType} donation of ${selectedAmount.toFixed(2)} has been received.
              </p>
              <p className="text-sm text-muted-foreground">
                Donation #{donationNumber}
              </p>
              <p className="text-sm text-muted-foreground">
                You're making a real difference in the lives of children battling cancer.
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
            <Heart className="w-6 h-6 text-red-500" />
            Support Children with Cancer
          </DialogTitle>
          <DialogDescription>
            Every donation helps provide hope, care, and support to children and families fighting cancer.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Donation Type */}
            <FormField
              control={form.control}
              name="donationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Donation Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      <label
                        className={`flex items-center space-x-2 border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          field.value === "one-time"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <RadioGroupItem value="one-time" />
                        <span className="font-medium">One-Time</span>
                      </label>
                      <label
                        className={`flex items-center space-x-2 border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          field.value === "monthly"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <RadioGroupItem value="monthly" />
                        <span className="font-medium">Monthly</span>
                      </label>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amount Selection */}
            <div className="space-y-3">
              <FormLabel className="text-base font-semibold">Select Amount</FormLabel>
              <div className="grid grid-cols-4 gap-3">
                {presetAmounts.map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    variant={selectedAmount === amount ? "default" : "outline"}
                    onClick={() => handleAmountSelect(amount)}
                    className="h-14 text-lg font-semibold"
                  >
                    ${amount}
                  </Button>
                ))}
              </div>
              <FormField
                control={form.control}
                name="customAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min="5"
                        step="0.01"
                        placeholder="Custom amount (min $5)"
                        onChange={(e) => {
                          field.onChange(e);
                          handleCustomAmount(e.target.value);
                        }}
                        className="h-14 text-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="donorName"
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
                  <FormLabel>Phone (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="(555) 123-4567" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Leave a message of hope..."
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Payment Method Selection */}
            <div className="space-y-4">
              <FormLabel className="text-base font-semibold">Payment Method</FormLabel>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant={paymentMethod === "card" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("card")}
                  className="h-12"
                >
                  Credit/Debit Card
                </Button>
                <Button
                  type="button"
                  variant={paymentMethod === "qr" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("qr")}
                  className="h-12"
                >
                  QR Code
                </Button>
              </div>
            </div>

            {paymentMethod === "card" && <AcceptedCardsDisplay />}

            {paymentMethod === "qr" && (
              <div className="border rounded-lg p-4">
                <QRCodePayment amount={selectedAmount} />
              </div>
            )}

            {/* Action Buttons */}
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
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Heart className="mr-2 h-4 w-4" />
                    Donate ${customAmount ? parseFloat(customAmount).toFixed(2) : selectedAmount.toFixed(2)}
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
