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
    <div className="bg-primary-foreground/10 rounded-lg p-4 md:p-6 mb-6 md:mb-8">
      <h3 className="font-bold text-lg md:text-xl mb-2">Monthly AI Safety Tips</h3>
      <p className="text-primary-foreground/80 mb-4 text-sm md:text-base">
        Stay informed about the latest scams and protection strategies.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          required
          className="bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 h-11 md:h-10"
        />
        <Button 
          variant="default" 
          className="bg-accent hover:bg-accent/90 h-11 md:h-10 whitespace-nowrap" 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
