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
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import heroImage from "@/assets/hero-contact-3d.jpg";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll get back to you within 24 hours.");
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <Hero
        backgroundImage={heroImage}
        headline="Let's Talk. We're Here to Help."
        subheadline="Whether you have questions, need training, or want to protect your family—we're ready to assist you."
      />

      <section className="relative py-20">
        <FlowingWaves variant="full" opacity={0.12} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="mb-8">Send Us a Message</h2>
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">
                    Full Name *
                  </label>
                  <Input id="name" required placeholder="Your full name" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    Email Address *
                  </label>
                  <Input id="email" type="email" required placeholder="your@email.com" />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                    Phone Number (Optional)
                  </label>
                  <Input id="phone" type="tel" placeholder="(937) 555-1234" />
                </div>

                <div>
                  <label htmlFor="interest" className="block text-sm font-semibold mb-2">
                    I'm Interested In: *
                  </label>
                  <Select required>
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
                  <Select defaultValue="english">
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
                  <Textarea id="message" required rows={6} placeholder="Tell us how we can help you..." />
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox id="disclaimer" required />
                  <label htmlFor="disclaimer" className="text-sm text-muted-foreground leading-relaxed">
                    I understand InVision provides educational services only and does not offer legal/financial/tax advice. In
                    emergencies, I will contact authorities and my bank directly.
                  </label>
                </div>

                <Button type="submit" variant="default" size="lg" className="w-full">
                  SEND MESSAGE
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
                        <p>
                          <span className="font-semibold">Members:</span>{" "}
                          <a href="mailto:support@invisionnetwork.com" className="text-accent hover:text-accent/80">
                            support@invisionnetwork.com
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
                      <Button variant="default">OPEN CHAT</Button>
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
