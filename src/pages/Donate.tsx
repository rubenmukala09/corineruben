import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { Heart, Users, Shield, CheckCircle, DollarSign } from "lucide-react";

const donationSchema = z.object({
  donorName: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  amount: z.string().trim().min(1, "Amount is required").refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= 1 && num <= 1000000;
  }, "Amount must be between $1 and $1,000,000"),
  message: z.string().trim().max(1000, "Message must be less than 1000 characters").optional().or(z.literal("")),
  donationType: z.enum(["one-time", "monthly"])
});

const Donate = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    donorName: "",
    email: "",
    amount: "",
    message: "",
    donationType: "one-time"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate input
      const validated = donationSchema.parse(formData);
      
      const { error } = await supabase
        .from("donations")
        .insert([{
          donor_name: validated.donorName,
          email: validated.email,
          amount: parseFloat(validated.amount),
          message: validated.message || null,
          donation_type: validated.donationType,
          payment_status: "pending"
        }]);

      if (error) throw error;

      toast({
        title: "Thank You!",
        description: "Your donation request has been received. We'll contact you shortly with payment details.",
      });
      
      setFormData({
        donorName: "",
        email: "",
        amount: "",
        message: "",
        donationType: "one-time"
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        console.error("Error submitting donation:", error);
        toast({
          title: "Error",
          description: "Failed to submit donation request. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <Hero
        useTransitioningBackground={true}
        headline="Donate a Training Seat"
        subheadline="Help protect vulnerable seniors and families who can't afford training"
      />

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Impact Stats */}
          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-center mb-12">Your Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-8 text-center hover:shadow-medium transition-all">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <p className="text-4xl font-bold text-primary mb-2">50+</p>
                <p className="text-muted-foreground">Free trainings provided to veterans</p>
              </Card>

              <Card className="p-8 text-center hover:shadow-medium transition-all">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <p className="text-4xl font-bold text-primary mb-2">30+</p>
                <p className="text-muted-foreground">Cancer patient scholarships funded</p>
              </Card>

              <Card className="p-8 text-center hover:shadow-medium transition-all">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <p className="text-4xl font-bold text-primary mb-2">100+</p>
                <p className="text-muted-foreground">Families protected through donations</p>
              </Card>
            </div>
          </div>

          {/* Donation Options */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-center mb-12">Donation Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-medium transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="text-2xl font-bold">$149</h3>
                    <p className="text-sm text-muted-foreground">One Training Seat</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Sponsor one person's Zoom training session
                </p>
              </Card>

              <Card className="p-6 hover:shadow-medium transition-all border-2 border-primary">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="text-2xl font-bold">$299</h3>
                    <p className="text-sm text-muted-foreground">Family Training</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Sponsor a couple or small family group
                </p>
              </Card>

              <Card className="p-6 hover:shadow-medium transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="text-2xl font-bold">$899</h3>
                    <p className="text-sm text-muted-foreground">In-Person Visit</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Sponsor a 4-hour in-home training session
                </p>
              </Card>
            </div>
          </div>

          {/* Who We Help */}
          <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-primary/5 to-accent/5 mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Who Your Donation Helps</h2>
            <div className="space-y-4">
              {[
                "Veterans and active military families (20% discount + free seats)",
                "Cancer patients and caregivers (25% discount + scholarships)",
                "Low-income seniors through senior center partnerships",
                "Church congregations in underserved communities",
                "Immigrant families learning to navigate digital safety"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                  <p className="text-lg">{item}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Donation Form */}
          <div className="max-w-2xl mx-auto">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Make a Donation</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="donorName">Your Name *</Label>
                  <Input
                    id="donorName"
                    name="donorName"
                    value={formData.donorName}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Donation Type</Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="donationType"
                        value="one-time"
                        checked={formData.donationType === "one-time"}
                        onChange={handleChange}
                        className="w-4 h-4"
                      />
                      <span>One-Time</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="donationType"
                        value="monthly"
                        checked={formData.donationType === "monthly"}
                        onChange={handleChange}
                        className="w-4 h-4"
                      />
                      <span>Monthly</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Donation Amount *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      min="1"
                      value={formData.amount}
                      onChange={handleChange}
                      required
                      placeholder="149"
                      className="pl-10"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Any amount helps! Suggested: $149, $299, or $899
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Share why you're donating or who you'd like to honor..."
                  />
                </div>

                <div className="bg-primary/5 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    InVision Network is structured as a for-profit social enterprise. While donations are not tax-deductible, 100% of donated funds go directly to providing free training seats for those in need.
                  </p>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Proceed to Payment"}
                </Button>
              </form>
            </Card>
          </div>

          {/* Thank You Message */}
          <div className="max-w-3xl mx-auto mt-16 text-center">
            <h2 className="text-3xl font-bold mb-4">Thank You for Making a Difference</h2>
            <p className="text-xl text-muted-foreground">
              Your generosity helps protect vulnerable families from AI-powered scams. Together, we're building a safer digital future for everyone.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Donate;
