import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, CheckCircle2 } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";

export const IllustrativeHeroSection = () => {
  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Illustration */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src={heroIllustration}
                alt="Illustrated family protected by a digital shield while using devices"
                className="w-full h-auto object-cover"
                width={960}
                height={540}
                loading="lazy"
                decoding="async"
              />
            </div>
            {/* Floating animated badges */}
            <div className="absolute -top-3 -right-3 px-4 py-2.5 rounded-2xl bg-card/95 border border-border/40 shadow-md float-slow">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-bold text-foreground">AI-Powered</span>
              </div>
            </div>
            <div className="absolute -bottom-3 -left-3 px-4 py-2.5 rounded-2xl bg-card/95 border border-border/40 shadow-md float-delayed">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-sm font-bold text-foreground">Verified Safe</span>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2 space-y-5">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 backdrop-blur-sm text-primary text-xs font-bold uppercase tracking-[0.15em]">
              <Shield className="w-3.5 h-3.5" />
              Digital Family Protection
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-[1.1]">
              Keeping Your Family{" "}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
                Safe Online
              </span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
              Our expert-designed protection suite shields your family from AI-powered scams,
              identity theft, and digital fraud — with real-time monitoring and personalized training.
            </p>
            <ul className="space-y-2.5">
              {[
                "Real-time scam & deepfake detection",
                "Personalized training for all ages",
                "24/7 monitoring & instant alerts",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg">
                <Link to="/training#pricing">
                  Start Protection <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Free Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
