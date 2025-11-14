import { Link, useSearchParams } from "react-router-dom";
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
import { Phone, Mail, MapPin, Clock, MessageSquare, Loader2, Shield, CheckCircle, Users, Zap, CalendarIcon, Check, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { z } from "zod";
import { useAIChat } from "@/contexts/AIChatContext";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import confetti from "canvas-confetti";
import customerSupport from "@/assets/customer-support.jpg";
import heroContact from "@/assets/hero-contact-new.jpg";

const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .refine((val) => val.split(' ').filter(word => word.length > 0).length >= 2, {
      message: "Please enter your full name (first and last name)"
    }),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().max(20, "Phone number must be less than 20 characters").optional(),
  interest: z.string().min(1, "Please select your interest"),
  language: z.string().optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
});

function Contact() {
  const { openChat } = useAIChat();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    language: "english",
    message: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [shakeForm, setShakeForm] = useState(false);

  // Pre-select service based on query parameter
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam === "family-shield") {
      setFormData(prev => ({ ...prev, interest: "scam-shield" }));
    }
  }, [searchParams]);

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const phoneNumber = value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phone: formatted });
    if (touched.phone) {
      validateField("phone", formatted);
    }
  };

  // Validation functions
  const validateField = (field: string, value: string) => {
    let error = "";
    
    switch (field) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (value.split(' ').filter(word => word.length > 0).length < 2) {
          error = "Please enter your full name (first and last name)";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "phone":
        // Phone is optional, only validate if entered
        if (value && value.length > 0 && value.replace(/\D/g, '').length < 10) {
          error = "Please enter a valid phone number";
        }
        break;
      case "message":
        if (!value.trim()) {
          error = "Message is required";
        } else if (value.trim().length < 10) {
          error = "Message must be at least 10 characters";
        }
        break;
    }
    
    setErrors(prev => ({ ...prev, [field]: error }));
    return error === "";
  };

  const isFieldValid = (field: keyof typeof formData) => {
    if (!touched[field as keyof typeof touched]) return null;
    
    const value = formData[field];
    
    switch (field) {
      case "name":
        return value.trim() && value.split(' ').filter(word => word.length > 0).length >= 2;
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case "phone":
        // Phone is optional
        return !value || value.replace(/\D/g, '').length >= 10;
      case "message":
        return value.trim().length >= 10;
      default:
        return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setErrorMessage("");

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

      // Show success state
      setSubmitSuccess(true);
      setShowForm(false);
      
      // Trigger confetti
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#8b5cf6', '#7c3aed', '#6d28d9']
      });

      toast.success("Thank you! We'll get back to you within 24 hours.");
    } catch (error: any) {
      // Show error banner
      setErrorMessage("Something went wrong. Please try again.");
      setShakeForm(true);
      
      // Remove shake animation after it completes
      setTimeout(() => setShakeForm(false), 500);
      
      // Auto-dismiss error after 5 seconds
      setTimeout(() => setErrorMessage(""), 5000);

      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      interest: "",
      language: "english",
      message: "",
    });
    setSelectedDate(undefined);
    setTouched({
      name: false,
      email: false,
      phone: false,
      message: false,
    });
    setSubmitSuccess(false);
    setShowForm(true);
    setErrorMessage("");
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.name.split(' ').filter(word => word.length > 0).length >= 2 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.interest &&
      formData.message.trim().length >= 10 &&
      (!formData.phone || formData.phone.replace(/\D/g, '').length >= 10)
    );
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <Hero
        backgroundImage={heroContact}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6">
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
              <Card key={index} className="p-4 md:p-6 text-center md:hover:shadow-strong transition-all md:hover:-translate-y-2 active:scale-98">
                <div className="flex justify-center mb-3 md:mb-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                    <item.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold mb-2 text-base md:text-lg">{item.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{item.desc}</p>
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
              
              {/* Error Banner */}
              {errorMessage && (
                <div className="mb-6 bg-red-500 text-white p-4 rounded-xl flex items-start gap-3 animate-fade-in shadow-lg">
                  <span className="text-2xl">⚠️</span>
                  <div className="flex-1">
                    <p className="font-semibold">{errorMessage}</p>
                  </div>
                  <button
                    onClick={() => setErrorMessage("")}
                    className="text-white hover:text-white/80 transition-colors"
                    aria-label="Close error message"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

              {showForm ? (
                <Card className={cn(
                  "p-10 shadow-2xl border-2 border-border/50 bg-gradient-to-b from-card to-card/80 backdrop-blur-xl rounded-3xl transition-all",
                  shakeForm && "animate-[shake_0.5s_ease-in-out]"
                )}>
                  <form onSubmit={handleSubmit} className="space-y-7">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-bold text-foreground">
                      Full Name *
                    </label>
                    <div className="relative">
                      <Input
                        id="name"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (touched.name) {
                            validateField("name", e.target.value);
                          }
                        }}
                        onBlur={() => {
                          setTouched(prev => ({ ...prev, name: true }));
                          validateField("name", formData.name);
                        }}
                        disabled={isSubmitting}
                        className={cn(
                          "h-14 text-base border-2 rounded-xl pr-12 transition-colors",
                          isFieldValid("name") === true && "border-green-500 focus:border-green-500",
                          isFieldValid("name") === false && "border-red-500 focus:border-red-500"
                        )}
                      />
                      {isFieldValid("name") !== null && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          {isFieldValid("name") ? (
                            <Check className="w-5 h-5 text-green-500" />
                          ) : (
                            <X className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                    {touched.name && errors.name && (
                      <p className="text-red-500 text-[13px] animate-fade-in">{errors.name}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-bold text-foreground">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          required
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (touched.email) {
                              validateField("email", e.target.value);
                            }
                          }}
                          onBlur={() => {
                            setTouched(prev => ({ ...prev, email: true }));
                            validateField("email", formData.email);
                          }}
                          disabled={isSubmitting}
                          className={cn(
                            "h-14 text-base border-2 rounded-xl pr-12 transition-colors",
                            isFieldValid("email") === true && "border-green-500 focus:border-green-500",
                            isFieldValid("email") === false && "border-red-500 focus:border-red-500"
                          )}
                        />
                        {isFieldValid("email") !== null && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            {isFieldValid("email") ? (
                              <Check className="w-5 h-5 text-green-500" />
                            ) : (
                              <X className="w-5 h-5 text-red-500" />
                            )}
                          </div>
                        )}
                      </div>
                      {touched.email && errors.email && (
                        <p className="text-red-500 text-[13px] animate-fade-in">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-bold text-foreground">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(937) 555-1234"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          onBlur={() => {
                            setTouched(prev => ({ ...prev, phone: true }));
                            validateField("phone", formData.phone);
                          }}
                          disabled={isSubmitting}
                          maxLength={14}
                          className={cn(
                            "h-14 text-base border-2 rounded-xl pr-12 transition-colors",
                            isFieldValid("phone") === true && formData.phone && "border-green-500 focus:border-green-500",
                            isFieldValid("phone") === false && "border-red-500 focus:border-red-500"
                          )}
                        />
                        {formData.phone && isFieldValid("phone") !== null && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            {isFieldValid("phone") ? (
                              <Check className="w-5 h-5 text-green-500" />
                            ) : (
                              <X className="w-5 h-5 text-red-500" />
                            )}
                          </div>
                        )}
                      </div>
                      {touched.phone && errors.phone && (
                        <p className="text-red-500 text-[13px] animate-fade-in">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="interest" className="block text-sm font-bold text-foreground">
                      I'm Interested In *
                    </label>
                    <Select
                      required
                      value={formData.interest}
                      onValueChange={(value) => setFormData({ ...formData, interest: value })}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className="h-14 text-base border-2 rounded-xl">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="training" disabled>Select an option</SelectItem>
                        <SelectItem value="scam-protection-training">Scam Protection Training</SelectItem>
                        <SelectItem value="family-training">Family Training Session</SelectItem>
                        <SelectItem value="business-ai">Business AI Solutions</SelectItem>
                        <SelectItem value="ai-receptionist">AI Receptionist</SelectItem>
                        <SelectItem value="website-design">Website Design</SelectItem>
                        <SelectItem value="ai-insurance">AI Insurance</SelectItem>
                        <SelectItem value="security-products">Physical Security Products</SelectItem>
                        <SelectItem value="general">General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="language" className="block text-sm font-bold text-foreground">
                      Preferred Language
                    </label>
                    <Select
                      value={formData.language}
                      onValueChange={(value) => setFormData({ ...formData, language: value })}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger id="language" className="h-14 text-base border-2 focus:border-primary/50 rounded-xl">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">🇺🇸 English</SelectItem>
                        <SelectItem value="french">🇫🇷 Français</SelectItem>
                        <SelectItem value="spanish">🇪🇸 Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="preferredDate" className="block text-sm font-bold text-foreground">
                      Preferred Call/Meeting Date
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="preferredDate"
                          variant="outline"
                          disabled={isSubmitting}
                          className={cn(
                            "h-14 w-full justify-start text-left font-normal text-base border-2 hover:border-primary/50 rounded-xl",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            const maxDate = new Date();
                            maxDate.setDate(maxDate.getDate() + 60);
                            return date < today || date > maxDate;
                          }}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-bold text-foreground">
                      Your Message *
                    </label>
                    <div className="relative">
                      <Textarea
                        id="message"
                        required
                        placeholder="Tell us how we can help you..."
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (touched.message) {
                            validateField("message", e.target.value);
                          }
                        }}
                        onBlur={() => {
                          setTouched(prev => ({ ...prev, message: true }));
                          validateField("message", formData.message);
                        }}
                        disabled={isSubmitting}
                        rows={5}
                        maxLength={1000}
                        className={cn(
                          "text-base border-2 rounded-xl resize-none pr-12 transition-colors",
                          isFieldValid("message") === true && "border-green-500 focus:border-green-500",
                          isFieldValid("message") === false && "border-red-500 focus:border-red-500"
                        )}
                      />
                      {isFieldValid("message") !== null && (
                        <div className="absolute right-4 top-4">
                          {isFieldValid("message") ? (
                            <Check className="w-5 h-5 text-green-500" />
                          ) : (
                            <X className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                    {touched.message && errors.message && (
                      <p className="text-red-500 text-[13px] animate-fade-in">{errors.message}</p>
                    )}
                    <p className="text-sm text-muted-foreground text-right">
                      {formData.message.length}/1000 characters
                    </p>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl border border-border/50">
                    <Checkbox id="disclaimer" required disabled={isSubmitting} className="mt-0.5" />
                    <label htmlFor="disclaimer" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                      I understand InVision provides educational services only and does not offer legal/financial/tax advice. In emergencies, I will contact authorities and my bank directly.
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !isFormValid() || submitSuccess}
                    className={cn(
                      "w-full md:w-auto md:px-8 h-16 text-base font-semibold rounded-lg transition-all duration-300",
                      submitSuccess 
                        ? "bg-green-500 hover:bg-green-500" 
                        : !isFormValid() || isSubmitting
                        ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
                        : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 hover:scale-[1.02] hover:shadow-2xl"
                    )}
                  >
                    {submitSuccess ? (
                      <>
                        <Check className="mr-2 h-5 w-5" />
                        Sent! ✓
                      </>
                    ) : isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </Card>
              ) : (
                <Card className="p-10 shadow-2xl border-2 border-border/50 bg-gradient-to-b from-card to-card/80 backdrop-blur-xl rounded-3xl text-center animate-fade-in">
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="w-20 h-20 text-green-500" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold mb-2">Thank You!</h3>
                      <p className="text-muted-foreground text-lg">
                        We'll contact you within 24 hours.
                      </p>
                    </div>
                    <Button
                      onClick={resetForm}
                      className="mt-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 hover:scale-[1.02] transition-all"
                    >
                      Send Another Message
                    </Button>
                  </div>
                </Card>
              )}
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
                <Card className="p-6 hover:shadow-strong transition-all hover:-translate-y-1 rounded-2xl border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <MessageSquare className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Live Chat</h3>
                      <p className="text-muted-foreground mb-3">Instant responses during business hours</p>
                      <Button 
                        onClick={openChat}
                        className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 animate-[pulse_2s_ease-in-out_infinite]"
                      >
                        <span className="mr-2">💬</span>
                        Start Chat Now
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        Chat available Monday-Friday 9am-6pm ET
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50 bg-card/80 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Phone</h3>
                      <a 
                        href="tel:9375550199" 
                        className="group block mb-3"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-2xl group-hover:rotate-[5deg] transition-transform duration-300">📞</span>
                          <span className="text-foreground group-hover:text-teal-500 text-xl font-semibold transition-colors duration-300">
                            (937) 555-0199
                          </span>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-teal-500 font-semibold mt-1">
                          Call Now
                        </div>
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
                          <a 
                            href="mailto:hello@invisionnetwork.org?subject=Inquiry%20from%20Website" 
                            className="text-foreground hover:text-teal-500 transition-all duration-300 hover:underline flex items-center gap-1 group"
                          >
                            <span className="group-hover:animate-bounce">✉️</span>
                            hello@invisionnetwork.org
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold w-20">Training:</span>
                          <a 
                            href="mailto:training@invisionnetwork.org?subject=Training%20Inquiry" 
                            className="text-foreground hover:text-teal-500 transition-all duration-300 hover:underline flex items-center gap-1 group"
                          >
                            <span className="group-hover:animate-bounce">✉️</span>
                            training@invisionnetwork.org
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold w-20">Business:</span>
                          <a 
                            href="mailto:consulting@invisionnetwork.org?subject=Business%20Consulting%20Inquiry" 
                            className="text-foreground hover:text-teal-500 transition-all duration-300 hover:underline flex items-center gap-1 group"
                          >
                            <span className="group-hover:animate-bounce">✉️</span>
                            consulting@invisionnetwork.org
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold w-20">Members:</span>
                          <a 
                            href="mailto:support@invisionnetwork.org?subject=Member%20Support%20Request" 
                            className="text-foreground hover:text-teal-500 transition-all duration-300 hover:underline flex items-center gap-1 group"
                          >
                            <span className="group-hover:animate-bounce">✉️</span>
                            support@invisionnetwork.org
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-strong transition-all hover:-translate-y-1 rounded-2xl border-2 border-border/50 bg-card/80 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3">Office Location</h3>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <span className="text-xl mt-0.5">📍</span>
                          <div className="text-base text-[#6B7280] leading-relaxed">
                            <p className="font-semibold text-foreground">Serving Dayton, Kettering & Greater Miami Valley</p>
                            <p className="mt-1">Nationwide Training Available</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground italic ml-7">
                          In-person meetings by appointment
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Response Time Guarantee */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4">Our Response Time Guarantee</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 text-center bg-card/50 backdrop-blur-sm border-2 border-border/50 rounded-xl hover:shadow-strong transition-all hover:-translate-y-2">
              <div className="text-5xl mb-4">💬</div>
              <div className="text-4xl font-bold text-primary mb-2">5 min</div>
              <p className="text-muted-foreground">Average Live Chat Response</p>
            </Card>

            <Card className="p-8 text-center bg-card/50 backdrop-blur-sm border-2 border-border/50 rounded-xl hover:shadow-strong transition-all hover:-translate-y-2">
              <div className="text-5xl mb-4">✉️</div>
              <div className="text-4xl font-bold text-primary mb-2">24 hrs</div>
              <p className="text-muted-foreground">Email & Form Responses</p>
            </Card>

            <Card className="p-8 text-center bg-card/50 backdrop-blur-sm border-2 border-border/50 rounded-xl hover:shadow-strong transition-all hover:-translate-y-2">
              <div className="text-5xl mb-4">📞</div>
              <div className="text-4xl font-bold text-primary mb-2">Same Day</div>
              <p className="text-muted-foreground">Phone Call Returns</p>
            </Card>
          </div>

          <p className="text-center text-muted-foreground mt-12 max-w-3xl mx-auto text-lg">
            Your safety is our priority. We're committed to responding quickly and providing the guidance you need.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
