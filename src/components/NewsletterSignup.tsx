import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { newsletterSchema } from "@/utils/formValidation";
import { useConfetti } from "@/hooks/useConfetti";

export function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { fireSuccess } = useConfetti();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email using Zod
    const validation = newsletterSchema.safeParse({ email: email.trim() });
    if (!validation.success) {
      toast.error(validation.error.errors[0]?.message || "Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('newsletter-signup', {
        body: { email: validation.data.email }
      });

      if (error) throw error;

      if (data?.alreadySubscribed) {
        toast.info("You're already subscribed!");
      } else {
        fireSuccess();
        toast.success("✓ Subscribed! Check your email.");
      }
      
      setEmail("");
    } catch (error: any) {
      console.error("Newsletter signup error:", error);
      toast.error("Subscription failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return compact ? (
    <form onSubmit={handleSubmit} className="flex gap-1">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isSubmitting}
        required
        className="bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 h-6 text-[9px]"
      />
      <Button 
        variant="default" 
        className="bg-accent hover:bg-accent/90 h-6 whitespace-nowrap text-[9px] font-semibold px-2"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loader2 className="h-3 w-3 animate-spin" /> : "Subscribe"}
      </Button>
    </form>
  ) : (
    <div className="bg-primary-foreground/10 rounded-lg p-1.5 md:p-2.5 mb-2 md:mb-3">
      <h3 className="font-semibold text-xs md:text-sm mb-0.5">Monthly AI Safety Tips</h3>
      <p className="text-primary-foreground/80 mb-1.5 text-[10px] md:text-[11px] leading-tight">
        Stay informed about the latest scams and protection strategies.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-1.5">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          required
          className="bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 h-7 md:h-7 text-[11px]"
        />
        <Button 
          variant="default" 
          className="bg-accent hover:bg-accent/90 h-7 md:h-7 whitespace-nowrap text-[11px] font-semibold px-3" 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
              Subscribing...
            </>
          ) : (
            "SUBSCRIBE"
          )}
        </Button>
      </form>
    </div>
  );
}
