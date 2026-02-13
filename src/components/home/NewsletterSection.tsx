import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail, Bell, Loader2 } from "lucide-react";
import { MagneticWrapper } from "@/components/ui/magnetic-button";
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
    <section className="py-32 bg-gradient-to-b from-primary via-primary to-primary/95 relative overflow-hidden">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/10 border border-primary-foreground/20 mb-8">
            <Bell className="w-8 h-8 text-primary-foreground" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 tracking-tight">
            Join Our Newsletter
            <br />
            <span className="text-accent">Stay Updated</span>
          </h2>

          <p className="text-primary-foreground/80 text-xl mb-10 max-w-xl mx-auto">
            Get the latest security tips, scam alerts, and protection updates
            delivered to your inbox.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/50" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
                className="h-14 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 rounded-xl text-base pl-12 focus:border-accent focus:ring-accent"
              />
            </div>
            <MagneticWrapper strength={0.25}>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="h-14 px-8 rounded-xl text-base font-semibold bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </MagneticWrapper>
          </form>

          <p className="text-primary-foreground/60 text-sm mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
