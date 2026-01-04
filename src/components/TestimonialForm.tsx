import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Star } from "lucide-react";
import { testimonialFormSchema } from "@/utils/formValidation";
import { z } from "zod";

type TestimonialFormData = z.infer<typeof testimonialFormSchema>;

export const TestimonialForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  const { toast } = useToast();

  const form = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: {
      name: "",
      email: "",
      location: "",
      rating: 0,
      story: "",
    },
  });

  const onSubmit = async (data: TestimonialFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("testimonials")
        .insert({
          name: data.name,
          email: data.email,
          location: data.location,
          rating: data.rating,
          story: data.story,
        });

      if (error) throw error;

      // Track analytics
      const { trackFormSubmit, trackConversion } = await import("@/utils/analyticsTracker");
      trackFormSubmit("testimonial_form", { rating: data.rating });
      trackConversion("testimonial_submission");

      // Send thank-you email
      try {
        await supabase.functions.invoke('send-testimonial-thankyou', {
          body: {
            email: data.email,
            name: data.name,
            rating: data.rating
          }
        });
      } catch (emailError) {
        console.error('Failed to send thank-you email:', emailError);
      }

      toast({
        title: "Thank you for your testimonial! 💜",
        description: "Check your email for a special thank-you message. We'll notify you once it's approved.",
      });

      form.reset();
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your testimonial. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const rating = form.watch("rating");

  return (
    <Card className="p-6 max-w-2xl mx-auto bg-gradient-to-br from-card to-card/50 border-border/50">
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold mb-2">Share Your Story</h3>
        <p className="text-muted-foreground">Help others by sharing your experience with InVision Network</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
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
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@email.com" {...field} />
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
                <FormLabel>Location *</FormLabel>
                <FormControl>
                  <Input placeholder="Columbus, OH" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Rating *</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => field.onChange(star)}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= (hoveredStar || rating)
                              ? "fill-primary text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="story"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Story *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your experience with InVision Network. How did we help you?"
                    className="min-h-32 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <p className="text-xs text-muted-foreground">
                  {field.value.length}/1000 characters
                </p>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
            {isSubmitting ? "Submitting..." : "Submit Testimonial"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Your testimonial will be reviewed by our team before being published. We respect your privacy and will not share your email address.
          </p>
        </form>
      </Form>
    </Card>
  );
};
