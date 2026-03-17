import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail, Loader2 } from "lucide-react";
import { useConfetti } from "@/hooks/useConfetti";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { newsletterSchema } from "@/utils/formValidation";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { fireCelebration } = useConfetti();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = newsletterSchema.safeParse({ email: email.trim() });
    if (!validation.success) {
      toast.error(
        validation.error.errors[0]?.message ||
          "Please enter a valid email address",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke(
        "newsletter-signup",
        {
          body: { email: validation.data.email },
        },
      );

      if (error) throw error;

      if (data?.alreadySubscribed) {
        toast.info("You're already subscribed!");
      } else {
        fireCelebration();
        toast.success("✓ Successfully subscribed! Check your email.");
      }

      setEmail("");
    } catch (error: any) {
      console.error("Newsletter signup error:", error);
      toast.error("Subscription failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-4 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm px-6 py-5 shadow-sm">
            <div className="flex items-center gap-3 shrink-0">
              <Mail className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-foreground whitespace-nowrap">Stay updated</span>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-1 w-full gap-3"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
                className="h-10 flex-1 rounded-xl text-sm bg-background/60 border-border/50"
              />
              <Button
                type="submit"
                size="sm"
                disabled={isSubmitting}
                className="h-10 px-5 rounded-xl text-sm font-semibold shrink-0"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="ml-1.5 w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;
