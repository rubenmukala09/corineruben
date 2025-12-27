import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";
import { 
  CheckCircle, Target, Lightbulb, Clock, Wrench, 
  Users, MessageSquare, Shield, ArrowRight 
} from "lucide-react";

const TEAM_SIZES = ["Just me", "2-5", "6-20", "21-50", "51-200", "200+"];
const COMMUNICATION_METHODS = ["Email", "Phone", "Video Call", "In-Person", "Chat/Messaging"];
const TIMELINES = ["Immediately", "Within 1 week", "Within 1 month", "1-3 months", "Flexible"];

const formSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  mainGoal: z.string().min(10, "Please describe your main goal"),
  problemToSolve: z.string().min(10, "Please describe the problem you're solving"),
  timeline: z.string().min(1, "Please select a timeline"),
  currentTools: z.string().optional(),
  teamSize: z.string().min(1, "Please select team size"),
  preferredCommunication: z.string().min(1, "Please select communication preference"),
  securityComplianceNeeds: z.string().optional(),
  acknowledgedVerification: z.boolean().refine(val => val === true, "Please acknowledge this statement")
});

type FormData = z.infer<typeof formSchema>;

function OnboardingQuestions() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mainGoal: "",
      problemToSolve: "",
      timeline: "",
      currentTools: "",
      teamSize: "",
      preferredCommunication: "",
      securityComplianceNeeds: "",
      acknowledgedVerification: false
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { data: user } = await supabase.auth.getUser();
      
      const { error } = await supabase.from("onboarding_responses").insert({
        full_name: data.fullName,
        email: data.email,
        main_goal: data.mainGoal,
        problem_to_solve: data.problemToSolve,
        timeline: data.timeline,
        current_tools: data.currentTools || null,
        team_size: data.teamSize,
        preferred_communication: data.preferredCommunication,
        security_compliance_needs: data.securityComplianceNeeds || null,
        acknowledged_verification: data.acknowledgedVerification,
        user_id: user?.user?.id || null
      });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: "Questionnaire Submitted!",
        description: "Thank you for completing the onboarding questionnaire."
      });
    } catch (error: any) {
      console.error("Error submitting questionnaire:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit. Please try again.",
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
            <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
            <p className="text-muted-foreground mb-8">
              Your responses have been submitted. Our team will review them and reach out with next steps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/portal">Go to Dashboard</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/">Return Home</Link>
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
        title="Onboarding Questionnaire | InVision Network"
        description="Complete your onboarding questionnaire to help us understand your needs better."
      />
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
              <Lightbulb className="w-4 h-4" />
              <span>Onboarding Questionnaire</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Help Us Understand Your Needs</h1>
            <p className="text-muted-foreground">
              Complete this questionnaire so we can tailor our implementation to your specific requirements.
            </p>
          </div>
          
          <Card className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Contact Info */}
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
                </div>
                
                {/* Goals */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    <Target className="w-5 h-5 text-primary" />
                    <span>Your Goals</span>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="mainGoal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What is your main goal? *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g., Automate customer support, increase lead conversion, streamline operations..."
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="problemToSolve"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What problem are you trying to solve? *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g., Missing calls after hours, slow response times, manual data entry..."
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    <Wrench className="w-5 h-5 text-primary" />
                    <span>Setup Details</span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="timeline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>When do you need this implemented? *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select timeline" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {TIMELINES.map((t) => (
                                <SelectItem key={t} value={t}>{t}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="teamSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Team Size *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select team size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {TEAM_SIZES.map((size) => (
                                <SelectItem key={size} value={size}>{size}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="currentTools"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What tools do you currently use?</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Salesforce, HubSpot, Calendly, Slack..."
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="preferredCommunication"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Communication Channel *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select preference" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {COMMUNICATION_METHODS.map((method) => (
                              <SelectItem key={method} value={method}>{method}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="securityComplianceNeeds"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Any security or compliance requirements?</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g., HIPAA, SOC 2, GDPR, specific data handling requirements..."
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Acknowledgment */}
                <FormField
                  control={form.control}
                  name="acknowledgedVerification"
                  render={({ field }) => (
                    <FormItem className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-0.5" />
                      </FormControl>
                      <div>
                        <FormLabel className="!mt-0 cursor-pointer font-medium">
                          I understand implementation may require onboarding verification *
                        </FormLabel>
                        <p className="text-xs text-muted-foreground mt-1">
                          We may need to verify certain details before activation to ensure optimal setup.
                        </p>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" size="lg" className="w-full h-14 text-lg" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Questionnaire"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default OnboardingQuestions;