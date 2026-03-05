import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { SEO } from "@/components/SEO";
import { PageTransition } from "@/components/PageTransition";
import { FloatingShapes } from "@/components/FloatingShapes";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  CheckCircle,
  Shield,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { contactFormSchema, formatPhoneNumber } from "@/utils/formValidation";
import { z } from "zod";
import { useConfetti } from "@/hooks/useConfetti";
import { PROFESSIONAL_HERO_IMAGES } from "@/config/professionalHeroImages";
import supportAgentPhoto from "@/assets/support-agent.jpg";
import heroContactBranded from "@/assets/hero-contact-branded.jpg";
import { SITE } from "@/config/site";

type ContactFormData = z.infer<typeof contactFormSchema>;

const contactMethods = [
  {
    icon: Phone,
    title: "Phone Support",
    detail: SITE.phone.display,
    hours: "Mon-Fri: 9am-6pm EST",
    action: SITE.phone.tel,
    actionText: "Call Now",
    badge: "Avg. 2min wait",
    badgeVariant: "default" as const,
  },
  {
    icon: Mail,
    title: "General Inquiries",
    detail: SITE.emails.info,
    hours: "Response within 4 hours",
    action: `mailto:${SITE.emails.info}`,
    actionText: "Send Email",
    badge: "95% same-day",
    badgeVariant: "default" as const,
  },
  {
    icon: Mail,
    title: "Support Team",
    detail: SITE.emails.support,
    hours: "Response within 2 hours",
    action: `mailto:${SITE.emails.support}`,
    actionText: "Send Email",
    badge: "Priority Support",
    badgeVariant: "premium" as const,
  },
  {
    icon: Mail,
    title: "Business Inquiries",
    detail: SITE.emails.business,
    hours: "Response within 4 hours",
    action: `mailto:${SITE.emails.business}`,
    actionText: "Send Email",
    badge: "B2B Services",
    badgeVariant: "default" as const,
  },
];

function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { fireCelebration } = useConfetti();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      hearAbout: "",
      contactMethod: "email",
    },
  });

  const isSubmitting = form.formState.isSubmitting;
  const messageValue = form.watch("message") || "";
  const messageLength = messageValue.length;
  const maxLength = 500;

  const handleSubmit = async (data: ContactFormData) => {
    try {
      const { error } = await supabase.functions.invoke(
        "send-contact-email",
        {
          body: {
            name: data.fullName,
            email: data.email,
            phone: data.phone || "",
            interest: data.subject,
            message: data.message,
            hearAbout: data.hearAbout || "",
            contactMethod: data.contactMethod,
          },
        },
      );

      if (error) throw error;

      // Track conversion
      const { trackFormSubmit, trackConversion } =
        await import("@/utils/analyticsTracker");
      trackFormSubmit("contact_form", { subject: data.subject });
      trackConversion("contact_inquiry");

      setIsSubmitted(true);
      fireCelebration();
      toast.success("Message sent! We'll respond within 4 hours.");

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        form.reset();
      }, 3000);
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error(
        `Failed to send message. Please try again or email us directly at ${SITE.emails.info}`,
      );
    }
  };

  const contactHeroImages = PROFESSIONAL_HERO_IMAGES.contact;

  return (
    <PageTransition variant="fade">
      <SEO
        title="Contact Us - Get Support & Answers"
        description="Contact InVision Network for scam protection support. Phone, email, live chat available. Average 2-minute wait time. 95% same-day response rate."
      />
      <Navigation />
      {/* Hero */}
      <div className="relative">
        <Hero
          backgroundImage={heroContactBranded}
          headline=""
          subheadline=""
        >
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              We're here to help protect your family. Get in touch today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" asChild>
              <a href={SITE.phone.tel}>
                <Phone className="w-5 h-5 mr-2" />
                {SITE.phone.display}
              </a>
            </Button>
            <Button size="xl" variant="heroOutline" asChild>
              <a href={`mailto:${SITE.emails.info}`}>
                <Mail className="w-5 h-5 mr-2" />
                Email Us
              </a>
            </Button>
          </div>
        </Hero>
      </div>

      {/* Spacer */}
      <div className="h-8" />

      <div className="py-16 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
        {/* Premium Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Contact Methods Grid — matches Business card style */}
          <div className="text-center mb-10">
            <span className="inline-block text-[11px] uppercase tracking-[0.15em] font-bold text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4">
              Get in Touch
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
              How Can We <span className="text-primary">Help?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Choose the best way to reach us. We respond to every inquiry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div key={index} className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <IconComponent className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{method.title}</h3>
                  <p className="font-semibold text-foreground mb-1 text-sm">
                    {method.detail}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                    <Clock className="w-3.5 h-3.5" />
                    {method.hours}
                  </div>
                  <Badge
                    variant={method.badgeVariant}
                    className="mb-4 text-xs"
                  >
                    {method.badge}
                  </Badge>
                  <Button
                    variant="outline"
                    className="w-full"
                    size="sm"
                    asChild
                  >
                    <a href={method.action}>{method.actionText}</a>
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Main Contact Form Section */}
          <div className="grid lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {/* Premium Contact Form - 60% */}
            <div className="lg:col-span-3">
              <div className="relative bg-card border border-border/60 rounded-2xl shadow-sm overflow-hidden">
                {/* Top gradient accent */}
                <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />

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
                    <Badge
                      variant="outline"
                      className="gap-1.5 px-3 py-1.5 bg-success/10 border-success/30 text-success"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      Secure
                    </Badge>
                  </div>

                  {isSubmitted ? (
                    <div className="text-center py-16">
                      <div className="w-20 h-20 bg-gradient-to-br from-success/20 to-success/5 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                        <CheckCircle className="w-10 h-10 text-success" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-muted-foreground">
                        We'll respond within 4 hours
                      </p>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        {/* Full Name */}
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold">
                                Full Name <span className="text-primary">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter your full name"
                                  className="h-12 bg-background/50 border-border/50 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 pl-4"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Email & Phone in grid */}
                        <div className="grid md:grid-cols-2 gap-5">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-semibold">
                                  Email <span className="text-primary">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="email"
                                    placeholder="your@email.com"
                                    className="h-12 bg-background/50 border-border/50 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                                  />
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
                                <FormLabel className="text-sm font-semibold">
                                  Phone{" "}
                                  <span className="text-muted-foreground text-xs">
                                    (optional)
                                  </span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="tel"
                                    placeholder="(937) 000-0000"
                                    className="h-12 bg-background/50 border-border/50 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Subject dropdown */}
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold">
                                Subject <span className="text-primary">*</span>
                              </FormLabel>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger className="h-12 bg-background/50 border-border/50 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300">
                                    <SelectValue placeholder="What can we help you with?" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="rounded-xl border-border/50 backdrop-blur-md">
                                  <SelectItem value="general">
                                    General Inquiry
                                  </SelectItem>
                                  <SelectItem value="support">
                                    Technical Support
                                  </SelectItem>
                                  <SelectItem value="business">
                                    Business Services
                                  </SelectItem>
                                  <SelectItem value="careers">Careers</SelectItem>
                                  <SelectItem value="billing">
                                    Billing Question
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Message textarea with character counter */}
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold">
                                Message <span className="text-primary">*</span>
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="Tell us how we can help you..."
                                  rows={5}
                                  maxLength={maxLength}
                                  className="bg-background/50 border-border/50 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                                />
                              </FormControl>
                              <div className="flex justify-between items-center mt-2">
                                <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden mr-4">
                                  <div
                                    className={`h-full rounded-full transition-all duration-300 ${
                                      messageLength > maxLength * 0.9
                                        ? "bg-destructive"
                                        : messageLength > maxLength * 0.7
                                          ? "bg-yellow-500"
                                          : "bg-primary"
                                    }`}
                                    style={{
                                      width: `${(messageLength / maxLength) * 100}%`,
                                    }}
                                  />
                                </div>
                                <span
                                  className={`text-xs font-medium ${messageLength > maxLength * 0.9 ? "text-destructive" : "text-muted-foreground"}`}
                                >
                                  {messageLength}/{maxLength}
                                </span>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* How did you hear about us */}
                        <FormField
                          control={form.control}
                          name="hearAbout"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold">
                                How did you hear about us?
                              </FormLabel>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger className="h-12 bg-background/50 border-border/50 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300">
                                    <SelectValue placeholder="Select an option" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="rounded-xl border-border/50 backdrop-blur-md">
                                  <SelectItem value="search">
                                    Search Engine
                                  </SelectItem>
                                  <SelectItem value="social">Social Media</SelectItem>
                                  <SelectItem value="referral">
                                    Friend/Family Referral
                                  </SelectItem>
                                  <SelectItem value="news">News Article</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Preferred Contact Method */}
                        <FormField
                          control={form.control}
                          name="contactMethod"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold">
                                Preferred Contact Method{" "}
                                <span className="text-primary">*</span>
                              </FormLabel>
                              <FormControl>
                                <RadioGroup
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  className="flex gap-4"
                                >
                                  <div
                                    className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                      field.value === "email"
                                        ? "border-primary bg-primary/5"
                                        : "border-border/50 hover:border-primary/50"
                                    }`}
                                  >
                                    <RadioGroupItem value="email" id="contact-email" />
                                    <Label
                                      htmlFor="contact-email"
                                      className="cursor-pointer flex items-center gap-2"
                                    >
                                      <Mail className="w-4 h-4" />
                                      Email
                                    </Label>
                                  </div>
                                  <div
                                    className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                      field.value === "phone"
                                        ? "border-primary bg-primary/5"
                                        : "border-border/50 hover:border-primary/50"
                                    }`}
                                  >
                                    <RadioGroupItem value="phone" id="contact-phone" />
                                    <Label
                                      htmlFor="contact-phone"
                                      className="cursor-pointer flex items-center gap-2"
                                    >
                                      <Phone className="w-4 h-4" />
                                      Phone
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          className="w-full h-14 text-lg"
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
                          Your message is encrypted and secure. We never share
                          your information.
                        </div>
                      </form>
                    </Form>
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
                      { text: "Emergency support", sub: "for urgent issues" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/30 hover:border-primary/30 transition-all duration-300"
                      >
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
                    <p className="text-sm font-semibold text-foreground mb-1">
                      InVision Network HQ
                    </p>
                    <p className="text-sm text-muted-foreground">
                      123 Tech Boulevard
                      <br />
                      Dayton, OH 45402
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-muted/50 to-muted/20 rounded-xl h-40 flex items-center justify-center text-muted-foreground text-sm mb-4 border border-border/30">
                    <div className="text-center">
                      <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      Map Preview
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    size="sm"
                    asChild
                  >
                    <a href="https://maps.google.com/?q=123+Tech+Boulevard+Dayton+OH+45402" target="_blank" rel="noopener noreferrer">
                      Get Directions
                    </a>
                  </Button>
                </div>
              </div>

              {/* Support Team with Photo */}
              <div className="relative bg-card/90 backdrop-blur-md rounded-2xl border border-border/30 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-accent" />
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-1">
                    Meet Your Support Team
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Real people ready to help
                  </p>

                  {/* Team Photo */}
                  <div className="relative rounded-xl overflow-hidden mb-4 group">
                    <img
                      src={supportAgentPhoto}
                      alt="Our friendly support team member"
                      className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-3 text-white">
                      <span className="text-xs bg-success/80 px-2 py-0.5 rounded-full">
                        ● Online Now
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        initials: "RN",
                        name: "Ruben N.",
                        role: "Support Lead",
                        color: "primary",
                      },
                      {
                        initials: "CM",
                        name: "Corine M.",
                        role: "Customer Care",
                        color: "accent",
                      },
                    ].map((member, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/30 hover:border-primary/30 hover:bg-muted/50 transition-all duration-300 cursor-pointer group"
                      >
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${member.color}/20 to-${member.color}/5 flex items-center justify-center text-${member.color} font-bold group-hover:scale-110 transition-transform duration-300`}
                        >
                          {member.initials}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{member.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {member.role}
                          </p>
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
