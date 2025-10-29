import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FlowingWaves from "@/components/FlowingWaves";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, MessageSquare, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { z } from "zod";
import { useAIChat } from "@/contexts/AIChatContext";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().max(20, "Phone number must be less than 20 characters").optional(),
  interest: z.string().min(1, "Please select your interest"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

const Contact = () => {
  const { openChat } = useAIChat();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    language: "english",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = contactSchema.parse(formData);

      // Submit to Supabase
      const { error } = await supabase.from("website_inquiries").insert({
        inquiry_type: validatedData.interest,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        message: validatedData.message,
        metadata: { language: formData.language },
      });

      if (error) throw error;

      toast.success("Thank you! We'll get back to you within 24 hours.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        interest: "",
        language: "english",
        message: "",
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <Hero
        headline="Let's Talk. We're Here to Help."
        subheadline="Whether you have questions, need training, or want to protect your family—we're ready to assist you."
      />

      <section className="relative py-20">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-accent/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "6s" }} />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "5s" }} />
        </div>
        <FlowingWaves variant="full" opacity={0.12} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0ms" }}>
            <h2 className="mb-8">Send Us a Message</h2>
            <Card className="p-8 shadow-xl border-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    required
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                    Phone Number (Optional)
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(937) 555-1234"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="interest" className="block text-sm font-semibold mb-2">
                    I'm Interested In: *
                  </label>
                  <Select
                    required
                    value={formData.interest}
                    onValueChange={(value) => setFormData({ ...formData, interest: value })}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="training">ScamShield Protection</SelectItem>
                      <SelectItem value="scam-shield">Training Program</SelectItem>
                      <SelectItem value="business">AI Agent Development</SelectItem>
                      <SelectItem value="website">Website Design</SelectItem>
                      <SelectItem value="insurance">AI Insurance</SelectItem>
                      <SelectItem value="general">General Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="language" className="block text-sm font-semibold mb-2">
                    Preferred Language:
                  </label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) => setFormData({ ...formData, language: value })}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="french">Français</SelectItem>
                      <SelectItem value="spanish">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    required
                    rows={6}
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox id="disclaimer" required disabled={isSubmitting} />
                  <label htmlFor="disclaimer" className="text-sm text-muted-foreground leading-relaxed">
                    I understand InVision provides educational services only and does not offer legal/financial/tax advice. In
                    emergencies, I will contact authorities and my bank directly.
                  </label>
                </div>

                <Button type="submit" variant="default" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "SEND MESSAGE"
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="mb-8">Other Ways to Reach Us</h2>

              <div className="space-y-6">
                <Card className="p-6 hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Phone</h3>
                      <a href="tel:9375550199" className="text-accent hover:text-accent/80 text-lg font-semibold block mb-2">
                        (937) 555-0199
                      </a>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <div>
                          <p>Monday-Friday: 9am-6pm ET</p>
                          <p>Saturday: 10am-3pm ET</p>
                          <p>Sunday: Closed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Email</h3>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="font-semibold">General:</span>{" "}
                          <a href="mailto:hello@invisionnetwork.org" className="text-accent hover:text-accent/80">
                            hello@invisionnetwork.org
                          </a>
                        </p>
                        <p>
                          <span className="font-semibold">Training:</span>{" "}
                          <a href="mailto:training@invisionnetwork.org" className="text-accent hover:text-accent/80">
                            training@invisionnetwork.org
                          </a>
                        </p>
                        <p>
                          <span className="font-semibold">Business:</span>{" "}
                          <a href="mailto:consulting@invisionnetwork.org" className="text-accent hover:text-accent/80">
                            consulting@invisionnetwork.org
                          </a>
                        </p>
                        <p>
                          <span className="font-semibold">Members:</span>{" "}
                          <a href="mailto:support@invisionnetwork.org" className="text-accent hover:text-accent/80">
                            support@invisionnetwork.org
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Office</h3>
                      <p className="text-muted-foreground">
                        Dayton, Ohio 45402
                        <br />
                        Serving Ohio & Nationwide
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-primary/30">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Live Chat</h3>
                      <p className="text-muted-foreground mb-3">We typically respond within 5 minutes during business hours.</p>
                      <Button variant="default" onClick={openChat}>OPEN CHAT</Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
