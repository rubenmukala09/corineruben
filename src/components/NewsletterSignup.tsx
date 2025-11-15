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
    <div className="fixed bottom-4 right-4 bg-primary-foreground/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-primary-foreground/20 w-[280px] z-40">
      <h3 className="font-semibold text-xs text-primary mb-1">Newsletter</h3>
      <form onSubmit={handleSubmit} className="flex gap-1.5">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          required
          className="bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground h-7 text-xs flex-1"
        />
        <Button 
          variant="default" 
          className="bg-accent hover:bg-accent/90 h-7 whitespace-nowrap text-[10px] font-semibold px-3" 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            "SUBSCRIBE"
          )}
        </Button>
      </form>
    </div>
  );
}
