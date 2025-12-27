import { useState, useEffect } from "react";
import { useParams, useSearchParams, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";
import { 
  ArrowLeft, CheckCircle, Shield, Lock, Phone, Mail, MapPin, 
  Building, Calendar, MessageSquare, Headphones, Users, Zap,
  Globe, ShoppingCart, FileText, Palette, Search, BarChart
} from "lucide-react";

// Plan configurations
const AI_AGENT_PLANS = {
  STARTER: { name: "AI Receptionist & Intake Agent", price: "$9,500", features: ["24/7 Availability", "Call Handling", "Appointment Booking"] },
  PRO: { name: "Follow-Up Automation System", price: "$12,500", features: ["Multi-channel Campaigns", "Lead Nurturing", "CRM Integration"] },
  ENTERPRISE: { name: "Custom Automation Suite", price: "$25,000+", features: ["Full Customization", "Multi-system Integration", "Priority Support"] }
};

const WEBSITE_PLANS = {
  BASIC: { name: "Landing Page", price: "$1,500", features: ["Single Page", "Mobile Responsive", "2-Week Delivery"] },
  BUSINESS: { name: "Business Website", price: "$4,500", features: ["5-10 Pages", "SEO Optimization", "Contact Forms"] },
  PREMIUM: { name: "E-Commerce Website", price: "$8,500+", features: ["Full Online Store", "Payment Processing", "Inventory Management"] }
};

const AGENT_TYPES = [
  { id: "customer-support", name: "Customer Support Agent", icon: Headphones, description: "Website chat, FAQ, lead capture, ticket creation" },
  { id: "sales-booking", name: "Sales / Booking Agent", icon: Calendar, description: "Qualification, scheduling, follow-ups, pipeline updates" },
  { id: "operations-admin", name: "Operations / Admin Agent", icon: Zap, description: "Internal automation, invoices, reminders, workflows" }
];

const CHANNELS = ["Website Chat", "SMS", "Email", "Phone Calls", "WhatsApp"];
const TOOLS = ["Website Platform", "CRM", "Calendly", "Stripe", "Shopify", "Google Workspace", "Other"];
const WEBSITE_TYPES = ["Business", "Portfolio", "E-commerce", "Nonprofit", "Landing Page", "Other"];
const PAGES_OPTIONS = ["Home", "About", "Services", "Contact", "Pricing", "Blog", "FAQ", "Booking", "Shop", "Team"];
const WEBSITE_ADDONS = ["Website Maintenance", "Security Hardening", "SEO Setup", "Analytics & Tracking", "Copywriting", "Booking System", "Payment Integration", "Website Insurance"];
const TIMELINES = [
  { value: "asap", label: "ASAP" },
  { value: "2-4-weeks", label: "2-4 Weeks" },
  { value: "1-2-months", label: "1-2 Months" },
  { value: "flexible", label: "Flexible" }
];

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  companyName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  location: z.string().optional(),
  agentType: z.string().optional(),
  preferredChannels: z.array(z.string()).optional(),
  currentTools: z.array(z.string()).optional(),
  websiteType: z.string().optional(),
  pagesNeeded: z.array(z.string()).optional(),
  hasBranding: z.boolean().optional(),
  brandingUploadUrl: z.string().optional(),
  addOns: z.array(z.string()).optional(),
  description: z.string().min(10, "Please provide more details about your needs"),
  timeline: z.string(),
  budgetConfirmed: z.boolean().refine(val => val === true, "Please confirm you understand the pricing"),
  agreedTos: z.boolean().refine(val => val === true, "You must agree to Terms of Service"),
  agreedPrivacy: z.boolean().refine(val => val === true, "You must agree to Privacy Policy"),
  agreedAiDisclaimer: z.boolean().refine(val => val === true, "You must acknowledge AI limitations"),
  agreedOnboarding: z.boolean().refine(val => val === true, "You must acknowledge the onboarding process")
});

type FormData = z.infer<typeof formSchema>;

function GetStarted() {
  const { serviceType } = useParams<{ serviceType: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const plan = searchParams.get("plan") || "STARTER";
  const agentTypeFromUrl = searchParams.get("agentType");
  
  const isAiAgents = serviceType === "ai-agents";
  const isWebsiteDesign = serviceType === "website-design";
  
  const currentPlan = isAiAgents 
    ? AI_AGENT_PLANS[plan as keyof typeof AI_AGENT_PLANS] || AI_AGENT_PLANS.STARTER
    : WEBSITE_PLANS[plan as keyof typeof WEBSITE_PLANS] || WEBSITE_PLANS.BASIC;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      location: "",
      agentType: agentTypeFromUrl || "",
      preferredChannels: [],
      currentTools: [],
      websiteType: "",
      pagesNeeded: [],
      hasBranding: false,
      brandingUploadUrl: "",
      addOns: [],
      description: "",
      timeline: "flexible",
      budgetConfirmed: false,
      agreedTos: false,
      agreedPrivacy: false,
      agreedAiDisclaimer: false,
      agreedOnboarding: false
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { data: user } = await supabase.auth.getUser();
      
      const { error } = await supabase.from("service_intake_requests").insert({
        full_name: data.fullName,
        company_name: data.companyName || null,
        email: data.email,
        phone: data.phone,
        location: data.location || null,
        service_type: serviceType,
        agent_type: data.agentType || null,
        plan_selected: plan,
        preferred_channels: data.preferredChannels || [],
        current_tools: data.currentTools || [],
        website_type: data.websiteType || null,
        pages_needed: data.pagesNeeded || [],
        has_branding: data.hasBranding || false,
        branding_upload_url: data.brandingUploadUrl || null,
        add_ons: data.addOns || [],
        description: data.description,
        timeline: data.timeline,
        budget_confirmed: data.budgetConfirmed,
        agreed_tos: data.agreedTos,
        agreed_privacy: data.agreedPrivacy,
        agreed_ai_disclaimer: data.agreedAiDisclaimer,
        agreed_onboarding: data.agreedOnboarding,
        user_id: user?.user?.id || null
      });

      if (error) throw error;

      // Send confirmation email
      await supabase.functions.invoke("send-contact-email", {
        body: {
          to: data.email,
          subject: `Your ${isAiAgents ? "AI Agent" : "Website Design"} Request Received`,
          name: data.fullName,
          type: "intake_confirmation",
          serviceName: currentPlan.name,
          plan: plan
        }
      });

      setSubmitted(true);
      toast({
        title: "Request Submitted Successfully!",
        description: "We'll contact you within 24 hours to schedule your onboarding call."
      });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-24">
          <Card className="max-w-2xl mx-auto p-12 text-center">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h1 className="text-3xl font-bold mb-4">We Received Your Request!</h1>
            <p className="text-muted-foreground mb-8">
              Thank you for your interest in our {currentPlan.name}. Our team will review your request and contact you within 24 hours.
            </p>
            
            {/* Next Steps Timeline */}
            <div className="bg-muted/50 rounded-xl p-6 mb-8 text-left">
              <h3 className="font-semibold mb-4">What Happens Next?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary">1</div>
                  <div>
                    <p className="font-medium">We Review Your Request</p>
                    <p className="text-sm text-muted-foreground">Our team analyzes your requirements within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary">2</div>
                  <div>
                    <p className="font-medium">Schedule Discovery Call</p>
                    <p className="text-sm text-muted-foreground">We'll reach out to schedule a 30-minute consultation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary">3</div>
                  <div>
                    <p className="font-medium">Begin Implementation</p>
                    <p className="text-sm text-muted-foreground">After approval, we start building your solution</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/schedule">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Onboarding Call
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/">Return to Home</Link>
              </Button>
            </div>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <SEO 
        title={`Get Started with ${currentPlan.name} | InVision Network`}
        description={`Request a consultation for our ${currentPlan.name} service. Fill out the intake form to begin your journey.`}
      />
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/business">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>
        </Button>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Column */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Get Started with {currentPlan.name}</h1>
                <p className="text-muted-foreground">
                  Complete this form and our team will contact you within 24 hours to schedule your discovery call.
                </p>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Section A: Contact Information */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">A</div>
                      Contact Information
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="John Smith" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Acme Inc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} />
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
                            <FormLabel>Phone *</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="(555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location (City/State)</FormLabel>
                          <FormControl>
                            <Input placeholder="Dayton, OH" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Section B: Service Selection - AI Agents */}
                  {isAiAgents && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">B</div>
                        Agent Configuration
                      </h2>
                      
                      <FormField
                        control={form.control}
                        name="agentType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Agent Type *</FormLabel>
                            <div className="grid md:grid-cols-3 gap-4 mt-2">
                              {AGENT_TYPES.map((agent) => (
                                <div
                                  key={agent.id}
                                  onClick={() => field.onChange(agent.id)}
                                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                    field.value === agent.id 
                                      ? "border-primary bg-primary/5" 
                                      : "border-border hover:border-primary/50"
                                  }`}
                                >
                                  <agent.icon className="w-8 h-8 text-primary mb-2" />
                                  <h4 className="font-semibold text-sm">{agent.name}</h4>
                                  <p className="text-xs text-muted-foreground mt-1">{agent.description}</p>
                                </div>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="preferredChannels"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Channels</FormLabel>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                              {CHANNELS.map((channel) => (
                                <div key={channel} className="flex items-center gap-2">
                                  <Checkbox
                                    checked={field.value?.includes(channel)}
                                    onCheckedChange={(checked) => {
                                      const current = field.value || [];
                                      if (checked) {
                                        field.onChange([...current, channel]);
                                      } else {
                                        field.onChange(current.filter(c => c !== channel));
                                      }
                                    }}
                                  />
                                  <Label className="text-sm cursor-pointer">{channel}</Label>
                                </div>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="currentTools"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Tools You Use</FormLabel>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                              {TOOLS.map((tool) => (
                                <div key={tool} className="flex items-center gap-2">
                                  <Checkbox
                                    checked={field.value?.includes(tool)}
                                    onCheckedChange={(checked) => {
                                      const current = field.value || [];
                                      if (checked) {
                                        field.onChange([...current, tool]);
                                      } else {
                                        field.onChange(current.filter(t => t !== tool));
                                      }
                                    }}
                                  />
                                  <Label className="text-sm cursor-pointer">{tool}</Label>
                                </div>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  
                  {/* Section B: Service Selection - Website Design */}
                  {isWebsiteDesign && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">B</div>
                        Website Details
                      </h2>
                      
                      <FormField
                        control={form.control}
                        name="websiteType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website Type *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select website type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {WEBSITE_TYPES.map((type) => (
                                  <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="pagesNeeded"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pages Needed</FormLabel>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                              {PAGES_OPTIONS.map((page) => (
                                <div key={page} className="flex items-center gap-2">
                                  <Checkbox
                                    checked={field.value?.includes(page)}
                                    onCheckedChange={(checked) => {
                                      const current = field.value || [];
                                      if (checked) {
                                        field.onChange([...current, page]);
                                      } else {
                                        field.onChange(current.filter(p => p !== page));
                                      }
                                    }}
                                  />
                                  <Label className="text-sm cursor-pointer">{page}</Label>
                                </div>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="hasBranding"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-2">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel className="!mt-0 cursor-pointer">I have existing logo/brand colors</FormLabel>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="addOns"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Add-Ons</FormLabel>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              {WEBSITE_ADDONS.map((addon) => (
                                <div key={addon} className="flex items-center gap-2">
                                  <Checkbox
                                    checked={field.value?.includes(addon)}
                                    onCheckedChange={(checked) => {
                                      const current = field.value || [];
                                      if (checked) {
                                        field.onChange([...current, addon]);
                                      } else {
                                        field.onChange(current.filter(a => a !== addon));
                                      }
                                    }}
                                  />
                                  <Label className="text-sm cursor-pointer">{addon}</Label>
                                </div>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  
                  {/* Section C: Requirements */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">C</div>
                      Requirements
                    </h2>
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Describe what you need *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder={isAiAgents 
                                ? "Tell us about your business, current challenges, and what you want the AI agent to accomplish..."
                                : "Tell us about your business, target audience, and goals for the website..."
                              }
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="timeline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Launch Timeframe *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select timeline" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {TIMELINES.map((t) => (
                                <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="budgetConfirmed"
                      render={({ field }) => (
                        <FormItem className="flex items-start gap-2 p-4 bg-muted/50 rounded-lg">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-0.5" />
                          </FormControl>
                          <div>
                            <FormLabel className="!mt-0 cursor-pointer font-medium">I understand pricing depends on scope and onboarding approval *</FormLabel>
                            <p className="text-xs text-muted-foreground mt-1">Final pricing will be confirmed after our discovery call</p>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Section D: Agreement & Consent */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">D</div>
                      Agreement & Consent
                    </h2>
                    
                    <div className="space-y-3 p-4 bg-muted/30 rounded-lg border">
                      <FormField
                        control={form.control}
                        name="agreedTos"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-2">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel className="!mt-0 cursor-pointer text-sm">
                              I agree to the <Link to="/terms-of-service" className="text-primary underline" target="_blank">Terms of Service</Link> *
                            </FormLabel>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="agreedPrivacy"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-2">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel className="!mt-0 cursor-pointer text-sm">
                              I agree to the <Link to="/privacy-policy" className="text-primary underline" target="_blank">Privacy Policy</Link> *
                            </FormLabel>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="agreedAiDisclaimer"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-2">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel className="!mt-0 cursor-pointer text-sm">
                              I understand AI outputs may require human review *
                            </FormLabel>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="agreedOnboarding"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-2">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel className="!mt-0 cursor-pointer text-sm">
                              I understand onboarding includes verification before activation *
                            </FormLabel>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full h-14 text-lg" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </Button>
                </form>
              </Form>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Plan Summary */}
            <Card className="p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-sm font-medium text-primary mb-3">
                  <Shield className="w-4 h-4" />
                  Selected Plan
                </div>
                <h3 className="text-xl font-bold">{currentPlan.name}</h3>
                <p className="text-3xl font-bold text-accent mt-2">{currentPlan.price}</p>
              </div>
              
              <div className="space-y-3 mb-6">
                {currentPlan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Lock className="w-3 h-3" />
                  <span>Secure & Encrypted</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-3 h-3" />
                  <span>30-Day Satisfaction Guarantee</span>
                </div>
              </div>
            </Card>
            
            {/* Trust Indicators */}
            <Card className="p-4 bg-gradient-to-br from-success/5 to-success/10 border-success/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="font-medium text-sm">Questions?</p>
                  <a href="tel:9375550199" className="text-success font-semibold">(937) 555-0199</a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default GetStarted;