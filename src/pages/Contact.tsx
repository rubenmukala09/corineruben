import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import FlowingWaves from "@/components/FlowingWaves";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Phone, Mail, MapPin, Clock, MessageSquare, Loader2, Shield, CheckCircle, Users, Zap, CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { z } from "zod";
import { useAIChat } from "@/contexts/AIChatContext";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import customerSupport from "@/assets/customer-support.jpg";

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
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    language: "english",
    message: "",
    preferredDate: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = contactSchema.parse(formData);

      const { error } = await supabase.from("website_inquiries").insert({
        inquiry_type: validatedData.interest,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        message: validatedData.message,
        metadata: { 
          language: formData.language,
          preferredDate: selectedDate ? format(selectedDate, "PPP") : null
        },
      });

      if (error) throw error;

      toast.success("Thank you! We'll get back to you within 24 hours.");
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        interest: "",
        language: "english",
        message: "",
        preferredDate: "",
      });
      setSelectedDate(undefined);
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

      <Hero
        useTransitioningBackground={true}
        headline="Let's Protect Your Family Together"
        subheadline="Expert guidance is just a message away. We respond within 24 hours."
        showScrollIndicator={true}
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
          <Button 
            onClick={openChat}
            variant="default" 
            size="xl"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Start Live Chat
          </Button>
          <Button asChild variant="outlineLight" size="xl">
            <a href="tel:9375550199">
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </a>
          </Button>
        </div>
      </Hero>

      <TrustBar />

      {/* Why Contact Us Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">How We Can Help You Today</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Scam Protection",
                desc: "Get immediate guidance on suspicious messages, calls, or emails"
              },
              {
                icon: Users,
                title: "Family Training",
                desc: "Schedule personalized training sessions for your entire family"
              },
              {
                icon: Zap,
                title: "Business Solutions",
                desc: "Explore AI automation and website design services"
              },
              {
                icon: CheckCircle,
                title: "General Inquiries",
                desc: "Questions about our services, pricing, or partnerships"
              }
            ].map((item, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-strong transition-all hover:-translate-y-2">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="relative py-20 bg-muted">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-accent/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "6s" }} />
        </div>
        <FlowingWaves variant="full" opacity={0.12} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-fade-in-up">
              <h2 className="mb-4">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>
              <Card className="p-8 shadow-xl border-2 bg-card/80 backdrop-blur-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={isSubmitting}
                      className="h-12"
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
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={isSubmitting}
                      className="h-12"
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
                      className="h-12"
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
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="scam-shield">ScamShield Protection</SelectItem>
                        <SelectItem value="training">Training Program</SelectItem>
                        <SelectItem value="business">AI Agent Development</SelectItem>
                        <SelectItem value="website">Website Design</SelectItem>
                        <SelectItem value="insurance">AI Insurance</SelectItem>
                        <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                        <SelectItem value="donation">Donation or Sponsorship</SelectItem>
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
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English 🇺🇸</SelectItem>
                        <SelectItem value="french">Français 🇫🇷</SelectItem>
                        <SelectItem value="spanish">Español 🇪🇸</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="preferredDate" className="block text-sm font-semibold mb-2">
                      Preferred Call/Meeting Date (Optional)
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-12 justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                          )}
                          disabled={isSubmitting}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <p className="text-xs text-muted-foreground mt-1">
                      Help us schedule a call or meeting at your convenience
                    </p>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2">
                      Your Message *
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
                      I understand InVision provides educational services only and does not offer legal/financial/tax advice. In emergencies, I will contact authorities and my bank directly.
                    </label>
                  </div>

                  <Button type="submit" variant="default" size="lg" className="w-full h-12" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="mb-4">Quick Contact Options</h2>
                <p className="text-muted-foreground mb-8">
                  Choose the method that works best for you. We're here to help!
                </p>
              </div>

              <div className="space-y-4">
                <Card className="p-6 hover:shadow-strong transition-all hover:-translate-y-1 rounded-2xl border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 cursor-pointer" onClick={openChat}>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <MessageSquare className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Live Chat</h3>
                      <p className="text-muted-foreground mb-3">Instant responses during business hours</p>
                      <Button variant="default" size="sm">Start Chat Now</Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50 bg-card/80 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Phone</h3>
                      <a href="tel:9375550199" className="text-accent hover:text-accent/80 text-xl font-semibold block mb-3">
                        (937) 555-0199
                      </a>
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">Monday-Friday: 9am-6pm ET</p>
                          <p>Saturday: 10am-3pm ET</p>
                          <p>Sunday: Closed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50 bg-card/80 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3">Email</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold w-20">General:</span>
                          <a href="mailto:hello@invisionnetwork.org" className="text-accent hover:text-accent/80">
                            hello@invisionnetwork.org
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold w-20">Training:</span>
                          <a href="mailto:training@invisionnetwork.org" className="text-accent hover:text-accent/80">
                            training@invisionnetwork.org
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold w-20">Business:</span>
                          <a href="mailto:consulting@invisionnetwork.org" className="text-accent hover:text-accent/80">
                            consulting@invisionnetwork.org
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold w-20">Members:</span>
                          <a href="mailto:support@invisionnetwork.org" className="text-accent hover:text-accent/80">
                            support@invisionnetwork.org
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50 bg-card/80 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Office Location</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        850 Euclid Ave Ste 819 #4685<br />
                        Cleveland, OH 44114<br />
                        <span className="font-semibold text-foreground mt-2 block">Serving Ohio & Nationwide</span>
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Response Time Guarantee */}
      <section className="py-12 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20 max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Our Response Time Guarantee</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">5 min</div>
                <p className="text-sm text-muted-foreground">Average Live Chat Response</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">24 hrs</div>
                <p className="text-sm text-muted-foreground">Email & Form Responses</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">Same Day</div>
                <p className="text-sm text-muted-foreground">Phone Call Returns</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              Your safety is our priority. We're committed to responding quickly and providing the guidance you need.
            </p>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
