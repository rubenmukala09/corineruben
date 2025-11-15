import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('newsletter-signup', {
        body: { email }
      });

      if (error) throw error;

      if (data?.alreadySubscribed) {
        toast.info("You're already subscribed!");
      } else {
        toast.success("✓ Subscribed! Check your email.");
      }
      
      setEmail(""); // Clear input on success
    } catch (error: any) {
      console.error("Newsletter signup error:", error);
      toast.error("Error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-primary-foreground/10 rounded-lg p-2 md:p-3 mb-3 md:mb-4">
      <h3 className="font-semibold text-sm md:text-base mb-1">Monthly AI Safety Tips</h3>
      <p className="text-primary-foreground/80 mb-2 text-[11px] md:text-xs leading-tight">
        Stay informed about the latest scams and protection strategies.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          required
          className="bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 h-8 md:h-8 text-xs"
        />
        <Button 
          variant="default" 
          className="bg-accent hover:bg-accent/90 h-8 md:h-8 whitespace-nowrap text-xs font-semibold px-4" 
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
