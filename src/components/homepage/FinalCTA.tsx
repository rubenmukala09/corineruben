import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScamShieldSubmission } from "@/components/ScamShieldSubmission";

export const FinalCTA = () => {
  const [scamShieldOpen, setScamShieldOpen] = useState(false);

  return (
    <>
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary via-primary/95 to-primary/90 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-foreground/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/10 mb-8">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Don't Wait Until It's Too Late
            </h2>

            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 leading-relaxed">
              Every 14 seconds, another senior falls victim to a scam. 
              Get the protection your family deserves today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setScamShieldOpen(true)}
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-xl h-14 px-8 text-lg font-semibold shadow-strong"
              >
                Check a Suspicious Message
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl h-14 px-8 text-lg font-semibold"
              >
                <Link to="/training">View Membership Plans</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <ScamShieldSubmission open={scamShieldOpen} onOpenChange={setScamShieldOpen} />
    </>
  );
};
