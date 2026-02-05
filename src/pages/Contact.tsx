import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import { SEO } from "@/components/SEO";
import { PageTransition } from "@/components/PageTransition";
import { FloatingShapes } from "@/components/FloatingShapes";
import { ScrollReveal } from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Phone, Mail, MessageCircle, MapPin, Clock, CheckCircle, Shield, Loader2, Users, Award, Heart } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { contactFormSchema, formatPhoneNumber } from "@/utils/formValidation";
import { z } from "zod";
import { useConfetti } from "@/hooks/useConfetti";
import { PROFESSIONAL_HERO_IMAGES } from "@/config/professionalHeroImages";
import HeroFloatingStats from "@/components/business/HeroFloatingStats";
import supportAgentPhoto from "@/assets/support-agent.jpg";
import familyGathering from "@/assets/family-gathering.jpg";

const contactMethods = [
  {
    icon: Phone,
    title: "Phone Support",
    detail: "(937) 301-8749",
    hours: "Mon-Fri: 9am-6pm EST",
    action: "tel:+19373018749",
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
  const { fireCelebration } = useConfetti();

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
      fireCelebration();
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

  const contactHeroImages = PROFESSIONAL_HERO_IMAGES.contact;

  return (
    <PageTransition variant="fade">
      <SEO 
        title="Contact Us - Get Support & Answers" 
        description="Contact InVision Network for scam protection support. Phone, email, live chat available. Average 2-minute wait time. 95% same-day response rate."
      />
      <Navigation />
      {/* Hero wrapper for floating stats */}
      <div className="relative">
        <Hero 
          backgroundImages={contactHeroImages} 
          headline="Contact Us" 
          subheadline="We're here to help protect your family"
          showProtectionBadge
          badgeText="Response within 4 hours"
        >
          <FloatingShapes />
        </Hero>
        
        {/* Floating Stats Bar - Outside Hero to stay static */}
        <HeroFloatingStats />
      </div>

      {/* Spacer for floating stats bar */}
      <div className="h-6" />
      
      <TrustBar />

      {/* Stats Section with AnimatedCounter */}
      <section className="py-6 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-y border-primary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            {[
              { icon: Users, end: 500, suffix: "+", label: "Families Helped" },
              { icon: Clock, end: 4, suffix: "hr", label: "Avg Response" },
              { icon: Award, end: 95, suffix: "%", label: "Same-Day Reply" },
              { icon: Heart, end: 98, suffix: "%", label: "Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center gap-1">
                <stat.icon className="w-5 h-5 text-primary mb-1" />
                <span className="text-2xl font-bold text-foreground">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </span>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <div className="section-spacing bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">
        {/* Premium Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="container-padding relative z-10">
          {/* Contact Methods Grid with Premium Styling */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <ScrollReveal key={index} delay={index * 100}>
                  <div 
                    className="group relative bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden h-full"
                  >
                    {/* Gradient border effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                    
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                        <IconComponent className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{method.title}</h3>
                      <p className="font-semibold text-foreground mb-1 text-sm">{method.detail}</p>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                        <Clock className="w-3.5 h-3.5" />
                        {method.hours}
                      </div>
                      <Badge variant={method.badgeVariant} className="mb-4 text-xs">
                        {method.badge}
                      </Badge>
                      <Button 
                        variant="outline" 
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300" 
                        size="sm"
                        asChild
                      >
                        <a href={method.action}>{method.actionText}</a>
                      </Button>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Main Contact Form Section */}
          <div className="grid lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {/* Premium Contact Form - 60% */}
            <div className="lg:col-span-3">
              <div className="relative bg-card/90 backdrop-blur-md rounded-3xl border border-border/30 shadow-2xl overflow-hidden">
                {/* Premium header gradient */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />
                
                {/* Decorative corner accents */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/10 to-transparent rounded-tr-full" />
                
                <div className="p-8 md:p-10">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                        Send Us a Message
                      </h2>
                      <p className="text-muted-foreground mt-2">
                        We'll respond within 4 hours during business hours
                      </p>
                    </div>
                    <Badge variant="outline" className="gap-1.5 px-3 py-1.5 bg-success/10 border-success/30 text-success">
                      <Shield className="w-3.5 h-3.5" />
                      Secure
                    </Badge>
                  </div>
                  
                  {isSubmitted ? (
                    <div className="text-center py-16">
                      <div className="w-20 h-20 bg-gradient-to-br from-success/20 to-success/5 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                        <CheckCircle className="w-10 h-10 text-success" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">Message Sent Successfully!</h3>
                      <p className="text-muted-foreground">We'll respond within 4 hours</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Full Name with premium styling */}
                      <div className="group">
                        <Label htmlFor="fullName" className="text-sm font-semibold mb-2 block">
                          Full Name <span className="text-primary">*</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="fullName"
                            required
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                            placeholder="Enter your full name"
                            className="h-12 bg-background/50 border-border/50 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 pl-4"
                          />
                        </div>
                      </div>

                      {/* Email & Phone in grid */}
                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="group">
                          <Label htmlFor="email" className="text-sm font-semibold mb-2 block">
                            Email <span className="text-primary">*</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="your@email.com"
                            className="h-12 bg-background/50 border-border/50 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                          />
                        </div>
                        <div className="group">
                          <Label htmlFor="phone" className="text-sm font-semibold mb-2 block">
                            Phone <span className="text-muted-foreground text-xs">(optional)</span>
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            placeholder="(937) 000-0000"
                            className="h-12 bg-background/50 border-border/50 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                          />
                        </div>
                      </div>

                      {/* Subject dropdown with premium styling */}
                      <div className="group">
                        <Label htmlFor="subject" className="text-sm font-semibold mb-2 block">
                          Subject <span className="text-primary">*</span>
                        </Label>
                        <Select required value={formData.subject} onValueChange={(value) => setFormData({...formData, subject: value})}>
                          <SelectTrigger className="h-12 bg-background/50 border-border/50 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300">
                            <SelectValue placeholder="What can we help you with?" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-border/50 backdrop-blur-md">
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="business">Business Services</SelectItem>
                            <SelectItem value="careers">Careers</SelectItem>
                            <SelectItem value="billing">Billing Question</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Message textarea with character counter */}
                      <div className="group">
                        <Label htmlFor="message" className="text-sm font-semibold mb-2 block">
                          Message <span className="text-primary">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          placeholder="Tell us how we can help you..."
                          rows={5}
                          maxLength={maxLength}
                          className="bg-background/50 border-border/50 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                        />
                        <div className="flex justify-between items-center mt-2">
                          <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden mr-4">
                            <div 
                              className={`h-full rounded-full transition-all duration-300 ${
                                messageLength > maxLength * 0.9 
                                  ? 'bg-destructive' 
                                  : messageLength > maxLength * 0.7 
                                    ? 'bg-yellow-500' 
                                    : 'bg-primary'
                              }`}
                              style={{ width: `${(messageLength / maxLength) * 100}%` }}
                            />
                          </div>
                          <span className={`text-xs font-medium ${messageLength > maxLength * 0.9 ? 'text-destructive' : 'text-muted-foreground'}`}>
                            {messageLength}/{maxLength}
                          </span>
                        </div>
                      </div>

                      {/* How did you hear about us */}
                      <div className="group">
                        <Label htmlFor="hearAbout" className="text-sm font-semibold mb-2 block">
                          How did you hear about us?
                        </Label>
                        <Select value={formData.hearAbout} onValueChange={(value) => setFormData({...formData, hearAbout: value})}>
                          <SelectTrigger className="h-12 bg-background/50 border-border/50 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-border/50 backdrop-blur-md">
                            <SelectItem value="search">Search Engine</SelectItem>
                            <SelectItem value="social">Social Media</SelectItem>
                            <SelectItem value="referral">Friend/Family Referral</SelectItem>
                            <SelectItem value="news">News Article</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Preferred Contact Method with premium radio buttons */}
                      <div className="group">
                        <Label className="text-sm font-semibold mb-3 block">
                          Preferred Contact Method <span className="text-primary">*</span>
                        </Label>
                        <RadioGroup 
                          value={formData.contactMethod} 
                          onValueChange={(value) => setFormData({...formData, contactMethod: value})} 
                          className="flex gap-4"
                        >
                          <div className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                            formData.contactMethod === 'email' 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border/50 hover:border-primary/50'
                          }`}>
                            <RadioGroupItem value="email" id="contact-email" />
                            <Label htmlFor="contact-email" className="cursor-pointer flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              Email
                            </Label>
                          </div>
                          <div className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                            formData.contactMethod === 'phone' 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border/50 hover:border-primary/50'
                          }`}>
                            <RadioGroupItem value="phone" id="contact-phone" />
                            <Label htmlFor="contact-phone" className="cursor-pointer flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              Phone
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Premium Submit Button */}
                      <Button 
                        type="submit" 
                        className="w-full h-14 text-lg font-bold rounded-xl bg-gradient-to-r from-primary via-purple-600 to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500" 
                        size="lg" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <MessageCircle className="mr-2 h-5 w-5" />
                            Send Message
                          </>
                        )}
                      </Button>

                      {/* Security note */}
                      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground bg-muted/30 rounded-lg p-3">
                        <Shield className="w-4 h-4 text-success" />
                        Your message is encrypted and secure. We never share your information.
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Info Sidebar - 40% with Premium Styling */}
            <div className="lg:col-span-2 space-y-6">
              {/* Response Promise with Premium Card */}
              <div className="relative bg-card/90 backdrop-blur-md rounded-2xl border border-border/30 shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-success via-accent to-success" />
                <div className="p-6">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-success/20 to-success/5 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-success" />
                    </div>
                    Our Response Promise
                  </h3>
                  <div className="space-y-4">
                    {[
                      { text: "4-hour response", sub: "during business hours" },
                      { text: "24-hour response", sub: "on weekends" },
                      { text: "Emergency support", sub: "for urgent issues" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/30 hover:border-primary/30 transition-all duration-300">
                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-primary to-accent animate-pulse" />
                        <span className="text-sm">
                          <strong>{item.text}</strong> {item.sub}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Office Location with Premium Styling */}
              <div className="relative bg-card/90 backdrop-blur-md rounded-2xl border border-border/30 shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                <div className="p-6">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    Visit Our Office
                  </h3>
                  <div className="p-4 rounded-xl bg-muted/30 border border-border/30 mb-4">
                    <p className="text-sm font-semibold text-foreground mb-1">InVision Network HQ</p>
                    <p className="text-sm text-muted-foreground">
                      123 Tech Boulevard<br />
                      Columbus, OH 43215
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-muted/50 to-muted/20 rounded-xl h-40 flex items-center justify-center text-muted-foreground text-sm mb-4 border border-border/30">
                    <div className="text-center">
                      <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      Map Preview
                    </div>
                  </div>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300" size="sm">
                    Get Directions
                  </Button>
                </div>
              </div>

              {/* Support Team with Photo */}
              <div className="relative bg-card/90 backdrop-blur-md rounded-2xl border border-border/30 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-accent" />
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-1">Meet Your Support Team</h3>
                  <p className="text-sm text-muted-foreground mb-4">Real people ready to help</p>
                  
                  {/* Team Photo */}
                  <div className="relative rounded-xl overflow-hidden mb-4 group">
                    <img 
                      src={supportAgentPhoto} 
                      alt="Our friendly support team member" 
                      className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-3 text-white">
                      <span className="text-xs bg-success/80 px-2 py-0.5 rounded-full">● Online Now</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { initials: "RN", name: "Ruben N.", role: "Support Lead", color: "primary" },
                      { initials: "CM", name: "Corine M.", role: "Customer Care", color: "accent" }
                    ].map((member, i) => (
                      <div 
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/30 hover:border-primary/30 hover:bg-muted/50 transition-all duration-300 cursor-pointer group"
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${member.color}/20 to-${member.color}/5 flex items-center justify-center text-${member.color} font-bold group-hover:scale-110 transition-transform duration-300`}>
                          {member.initials}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </PageTransition>
  );
}

export default Contact;
