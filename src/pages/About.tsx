import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FlowingWaves from "@/components/FlowingWaves";
import AIPartnersCarousel from "@/components/AIPartnersCarousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Heart, Lock, BookOpen, Users2, Shield, DollarSign, Award, MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().regex(/^\+?[1-9]\d{0,14}$/, "Invalid phone number format").max(20).optional().or(z.literal("")),
  inquiry_type: z.string().min(1, "Please select an inquiry type"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message must be less than 2000 characters"),
  language: z.string().min(1)
});

const About = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string || "",
      inquiry_type: formData.get("interest") as string,
      message: formData.get("message") as string,
      language: formData.get("language") as string
    };

    try {
      const validated = contactSchema.parse(rawData);
      
      const data = {
        name: validated.name,
        email: validated.email,
        phone: validated.phone || null,
        inquiry_type: validated.inquiry_type,
        message: validated.message,
        metadata: {
          language: validated.language
        }
      };

      const { error } = await supabase
        .from("website_inquiries")
        .insert([data]);

      if (error) throw error;

      toast.success("Thank you! We'll get back to you within 24 hours.");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        console.error("Error submitting contact form:", error);
        toast.error("Failed to submit form. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <Hero
        useRouteBasedImages={true}
        headline="Founded by Families, For Families"
        subheadline="After watching loved ones nearly lose thousands to AI-powered scams, we built InVision Network—the protection system we wish existed."
        showScrollIndicator={true}
      />

      {/* Our Story */}
      <section className="py-24 bg-background relative">
        <FlowingWaves variant="full" opacity={0.12} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12">Our Story</h2>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                InVision Network was born from a close call. When our founder's mother nearly wired $10,000 to a scammer using a
                deepfake "grandson voice," we realized seniors weren't falling for old scams—they were being targeted by artificial
                intelligence so sophisticated it could mimic family members perfectly.
              </p>
              <p>
                The resources available? Either too technical, too condescending, or just generic "be careful" warnings. No real tools.
                No step-by-step scripts. No one treating seniors like the intelligent adults they are. So we created InVision Network:
                respectful education, actionable tools, and ongoing support—without the tech jargon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/10 shadow-medium">
            <blockquote className="text-2xl md:text-3xl font-bold text-center leading-relaxed text-foreground">
              "To empower 100,000 families with the knowledge and confidence to outsmart AI scammers—and help businesses use AI safely
              and effectively."
            </blockquote>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Meet the Team Behind</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our Core Values
            </p>
          </div>
          <p className="text-center text-lg text-muted-foreground max-w-4xl mx-auto mb-16">
            At InVision Network, we believe in empowering families through education, innovation, and authentic relationships. Our team brings diverse expertise together to transform how people approach digital safety and protection against AI-powered fraud.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
            <Card className="p-8 hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                  <Heart className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Authentic Leadership</h3>
                  <p className="text-muted-foreground text-sm">
                    We lead by example, with transparency and integrity in everything we do.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Continuous Growth</h3>
                  <p className="text-muted-foreground text-sm">
                    We believe in constant learning and evolution to stay ahead of industry changes.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                  <Users2 className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Client Success</h3>
                  <p className="text-muted-foreground text-sm">
                    Your success is our success. We're committed to measurable results for our clients.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                  <Shield className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Innovation</h3>
                  <p className="text-muted-foreground text-sm">
                    We continuously explore new strategies and technologies to drive better outcomes.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <h2 className="text-center mb-16">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Respect Over Fear</h3>
                  <p className="text-muted-foreground">
                    We don't patronize. We don't use scare tactics. We educate with clarity and dignity.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Privacy is Sacred</h3>
                  <p className="text-muted-foreground">
                    We will NEVER ask for passwords, bank info, or Social Security numbers. Period.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Plain English, Always</h3>
                  <p className="text-muted-foreground">
                    No jargon. No tech-speak. Just clear, actionable guidance anyone can follow.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users2 className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Community First</h3>
                  <p className="text-muted-foreground">
                    20% of profits go to free training for veterans, cancer patients, and underserved communities.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-16">Our Community Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-8 text-center hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-4xl font-bold gradient-text-primary mb-2">500+</p>
              <p className="text-muted-foreground">Families Trained</p>
            </Card>

            <Card className="p-8 text-center hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-4xl font-bold gradient-text-primary mb-2">$2M+</p>
              <p className="text-muted-foreground">in Fraud Prevented</p>
            </Card>

            <Card className="p-8 text-center hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-4xl font-bold gradient-text-primary mb-2">50+</p>
              <p className="text-muted-foreground">Free Sessions for Veterans</p>
            </Card>

            <Card className="p-8 text-center hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-4xl font-bold gradient-text-primary mb-2">30+</p>
              <p className="text-muted-foreground">Cancer Patient Scholarships</p>
            </Card>
          </div>

          <div className="max-w-3xl mx-auto mt-12 text-center">
            <p className="text-lg text-muted-foreground">
              <strong>Our Mission:</strong> For every 10 training enrollments, we sponsor 1 FREE training seat for a senior in need
              through partnerships with local senior centers and churches.
            </p>
          </div>
        </div>
      </section>

      {/* Certifications & Partnerships */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-16">Our Certifications & Partnerships</h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <Card className="p-6 hover:shadow-medium transition-shadow">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-accent" />
                <span className="font-bold">BBB Accredited</span>
              </div>
            </Card>
            <Card className="p-6 hover:shadow-medium transition-shadow">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-accent" />
                <span className="font-bold">Veteran-Owned Certified</span>
              </div>
            </Card>
            <Card className="p-6 hover:shadow-medium transition-shadow">
              <div className="flex items-center gap-3">
                <Users2 className="w-8 h-8 text-accent" />
                <span className="font-bold">Ohio Small Business Association</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-16">Service Areas</h2>
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-8 h-8 text-accent" />
                    <h3 className="text-2xl font-bold">Headquarters</h3>
                  </div>
                  <p className="text-xl mb-4">Dayton, Ohio</p>
                  <p className="text-muted-foreground mb-4">Local Service Areas:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Dayton</li>
                    <li>• Kettering</li>
                    <li>• Centerville</li>
                    <li>• Springboro</li>
                    <li>• Beavercreek</li>
                    <li>• Huber Heights</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-8 h-8 text-accent" />
                    <h3 className="text-2xl font-bold">Nationwide Service</h3>
                  </div>
                  <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>Live Zoom training available to all 50 states</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>In-person training available nationwide (travel covered by InVision)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>Family Scam Shield available anywhere</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-24 bg-background">
        <FlowingWaves variant="full" opacity={0.12} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="mb-4">Get In Touch</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Whether you have questions, need training, or want to partner with us—we're ready to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Contact Form */}
            <Card className="p-8 shadow-medium hover:shadow-strong transition-shadow">
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">
                    Full Name *
                  </label>
                  <Input id="name" name="name" required placeholder="Your full name" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    Email Address *
                  </label>
                  <Input id="email" name="email" type="email" required placeholder="your@email.com" />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                    Phone Number (Optional)
                  </label>
                  <Input id="phone" name="phone" type="tel" placeholder="(937) 555-1234" />
                </div>

                <div>
                  <label htmlFor="interest" className="block text-sm font-semibold mb-2">
                    I'm Interested In: *
                  </label>
                  <Select name="interest" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="training">AI Security Training for My Family</SelectItem>
                      <SelectItem value="scam-shield">Family Scam Shield Membership</SelectItem>
                      <SelectItem value="business">Business AI Consulting / Agent Development</SelectItem>
                      <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                      <SelectItem value="press">Press/Media Inquiry</SelectItem>
                      <SelectItem value="general">General Question</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="language" className="block text-sm font-semibold mb-2">
                    Preferred Language:
                  </label>
                  <Select name="language" defaultValue="english">
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
                  <Textarea id="message" name="message" required rows={6} placeholder="Tell us how we can help you..." />
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox id="disclaimer" required />
                  <label htmlFor="disclaimer" className="text-sm text-muted-foreground leading-relaxed">
                    I understand InVision provides educational services only and does not offer legal/financial/tax advice.
                  </label>
                </div>

                <Button type="submit" variant="default" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="p-8 hover:shadow-medium transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Phone</h3>
                    <a href="tel:9375551234" className="text-accent hover:text-accent/80 text-xl font-semibold block mb-3">
                      (937) 555-1234
                    </a>
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p>Monday-Friday: 9am-6pm ET</p>
                        <p>Saturday: 10am-3pm ET</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8 hover:shadow-medium transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Email</h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-semibold">General:</span>{" "}
                        <a href="mailto:hello@invisionnetwork.com" className="text-accent hover:text-accent/80">
                          hello@invisionnetwork.com
                        </a>
                      </p>
                      <p>
                        <span className="font-semibold">Training:</span>{" "}
                        <a href="mailto:training@invisionnetwork.com" className="text-accent hover:text-accent/80">
                          training@invisionnetwork.com
                        </a>
                      </p>
                      <p>
                        <span className="font-semibold">Business:</span>{" "}
                        <a href="mailto:consulting@invisionnetwork.com" className="text-accent hover:text-accent/80">
                          consulting@invisionnetwork.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8 hover:shadow-medium transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Office</h3>
                    <p className="text-muted-foreground">
                      InVision Network
                      <br />
                      123 Main Street
                      <br />
                      Dayton, OH 45402
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <AIPartnersCarousel />

      <Footer />
    </div>
  );
};

export default About;
