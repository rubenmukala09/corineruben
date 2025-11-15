import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Phone, Mail, MessageCircle, MapPin, Clock, CheckCircle, Shield, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import heroContact from "@/assets/hero-contact-new.jpg";

const contactMethods = [
  {
    icon: Phone,
    title: "Phone Support",
    detail: "(614) 555-0100",
    hours: "Mon-Fri: 9am-6pm EST",
    action: "tel:+16145550100",
    actionText: "Call Now",
    badge: "Avg. 2min wait",
    badgeVariant: "default" as const
  },
  {
    icon: Mail,
    title: "General Inquiries",
    detail: "info@invisionnetwork.org",
    hours: "Response within 4 hours",
    action: "mailto:info@invisionnetwork.org",
    actionText: "Send Email",
    badge: "95% same-day",
    badgeVariant: "default" as const
  },
  {
    icon: Mail,
    title: "Support Team",
    detail: "support@invisionnetwork.org",
    hours: "Response within 2 hours",
    action: "mailto:support@invisionnetwork.org",
    actionText: "Send Email",
    badge: "Priority Support",
    badgeVariant: "premium" as const
  },
  {
    icon: Mail,
    title: "Business Inquiries",
    detail: "business@invisionnetwork.org",
    hours: "Response within 4 hours",
    action: "mailto:business@invisionnetwork.org",
    actionText: "Send Email",
    badge: "B2B Services",
    badgeVariant: "default" as const
  }
];

function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    hearAbout: "",
    contactMethod: "email"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: { 
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          interest: formData.subject,
          message: formData.message,
          hearAbout: formData.hearAbout,
          contactMethod: formData.contactMethod
        }
      });

      if (error) throw error;

      // Track conversion
      const { trackFormSubmit, trackConversion } = await import("@/utils/analyticsTracker");
      trackFormSubmit("contact_form", { subject: formData.subject });
      trackConversion("contact_inquiry");

      setIsSubmitted(true);
      toast.success("Message sent! We'll respond within 4 hours.");
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          hearAbout: "",
          contactMethod: "email"
        });
      }, 3000);
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Failed to send message. Please try again or email us directly at info@invisionnetwork.org");
    } finally {
      setIsSubmitting(false);
    }
  };

  const messageLength = formData.message.length;
  const maxLength = 500;

  return (
    <>
      <SEO 
        title="Contact Us - Get Support & Answers" 
        description="Contact InVision Network for scam protection support. Phone, email, live chat available. Average 2-minute wait time. 95% same-day response rate."
      />
      <Navigation />
      <Hero 
        backgroundImage={heroContact} 
        headline="Contact Us" 
        subheadline="We're here to help protect your family"
        showProtectionBadge
        badgeText="Response within 4 hours"
      />
      <TrustBar />
      
      <div className="section-spacing bg-gradient-to-b from-background to-muted/20">
        <div className="container-padding">
          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                    <CardDescription className="text-sm">
                      <div className="font-semibold text-foreground mb-1">{method.detail}</div>
                      <div className="flex items-center gap-1 text-xs">
                        <Clock className="w-3 h-3" />
                        {method.hours}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant={method.badgeVariant} className="mb-3 text-xs">
                      {method.badge}
                    </Badge>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      size="sm"
                      onClick={() => method.action.startsWith('#') ? null : window.location.href = method.action}
                    >
                      {method.actionText}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Main Contact Form Section */}
          <div className="grid lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {/* Contact Form - 60% */}
            <div className="lg:col-span-3">
              <Card className="shadow-2xl">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                    <Badge variant="outline" className="gap-1">
                      <Shield className="w-3 h-3" />
                      Secure
                    </Badge>
                  </div>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 4 hours during business hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-success" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Message Sent Successfully!</h3>
                      <p className="text-muted-foreground">We'll respond within 4 hours</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Full Name */}
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          placeholder="John Doe"
                        />
                      </div>

                      {/* Email & Phone */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone (optional)</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            placeholder="(555) 123-4567"
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Select required value={formData.subject} onValueChange={(value) => setFormData({...formData, subject: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="business">Business Services</SelectItem>
                            <SelectItem value="careers">Careers</SelectItem>
                            <SelectItem value="billing">Billing Question</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Message */}
                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          placeholder="How can we help you?"
                          rows={5}
                          maxLength={maxLength}
                        />
                        <p className={`text-xs mt-1 ${messageLength > maxLength * 0.9 ? 'text-warning' : 'text-muted-foreground'}`}>
                          {messageLength}/{maxLength} characters
                        </p>
                      </div>

                      {/* How did you hear about us */}
                      <div>
                        <Label htmlFor="hearAbout">How did you hear about us?</Label>
                        <Select value={formData.hearAbout} onValueChange={(value) => setFormData({...formData, hearAbout: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="search">Search Engine</SelectItem>
                            <SelectItem value="social">Social Media</SelectItem>
                            <SelectItem value="referral">Friend/Family Referral</SelectItem>
                            <SelectItem value="news">News Article</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Preferred Contact Method */}
                      <div>
                        <Label>Preferred Contact Method *</Label>
                        <RadioGroup value={formData.contactMethod} onValueChange={(value) => setFormData({...formData, contactMethod: value})} className="flex gap-4 mt-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="email" id="contact-email" />
                            <Label htmlFor="contact-email" className="cursor-pointer">Email</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="phone" id="contact-phone" />
                            <Label htmlFor="contact-phone" className="cursor-pointer">Phone</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>Send Message</>
                        )}
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        Your message is encrypted and secure. We never share your information.
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Info Sidebar - 40% */}
            <div className="lg:col-span-2 space-y-6">
              {/* Response Promise */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    Our Response Promise
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                    <p><strong>4-hour response</strong> during business hours</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                    <p><strong>24-hour response</strong> on weekends</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                    <p><strong>Emergency support</strong> for urgent issues</p>
                  </div>
                </CardContent>
              </Card>

              {/* Office Location */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Visit Our Office
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">
                    <strong>InVision Network HQ</strong><br />
                    123 Tech Boulevard<br />
                    Columbus, OH 43215
                  </p>
                  <div className="bg-muted rounded-lg h-48 flex items-center justify-center text-muted-foreground text-sm mb-3">
                    Map placeholder
                  </div>
                  <Button variant="outline" className="w-full" size="sm">
                    Get Directions
                  </Button>
                </CardContent>
              </Card>

              {/* Support Team */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Meet Your Support Team</CardTitle>
                  <CardDescription>Real people ready to help</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      JD
                    </div>
                    <div>
                      <p className="text-sm font-semibold">John Doe</p>
                      <p className="text-xs text-muted-foreground">Support Lead</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-semibold">
                      SM
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Sarah Miller</p>
                      <p className="text-xs text-muted-foreground">Technical Support</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Contact;
