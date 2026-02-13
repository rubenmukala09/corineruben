import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import heroAbout from "@/assets/hero-about-1.jpg";
import natureSecurityBg from "@/assets/nature-security-services.jpg";
import {
  HexagonIcon,
  GeometricCorner,
  GridPattern,
} from "@/components/ui/GeometricDecorations";

const features = [
  "Specialized Scam Protection",
  "AI-Powered Threat Detection",
  "24/7 Family Monitoring",
  "Senior-Friendly Training",
];

export const AboutSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Nature-themed background with subtle overlay */}
      <div className="absolute inset-0">
        <img
          src={natureSecurityBg}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/85" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Grid pattern */}
      <GridPattern />

      {/* Geometric corner accents */}
      <GeometricCorner position="top-left" variant="dots" />
      <GeometricCorner position="bottom-right" variant="lines" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image with circular design */}
          <div className="relative">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Decorative circles */}
              <div className="absolute -top-6 -left-6 w-full h-full rounded-full border-2 border-primary/20" />
              <div className="absolute -top-3 -left-3 w-full h-full rounded-full border-2 border-accent/30" />

              {/* Main image container */}
              <div className="relative rounded-full overflow-hidden aspect-square border-4 border-background shadow-2xl shadow-primary/10">
                <img
                  src={heroAbout}
                  alt="About InVision Network - Family Protection"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Corner triangle accent */}
              <div
                className="absolute -top-4 -right-4 w-0 h-0"
                style={{
                  borderTop: "32px solid hsl(var(--primary))",
                  borderLeft: "32px solid transparent",
                }}
              />

              {/* Experience badge */}
              <div className="absolute bottom-8 right-0 lg:right-10">
                <HexagonIcon size="lg" gradient className="w-24 h-24">
                  <div className="text-center text-white">
                    <div className="text-2xl font-bold">Est.</div>
                    <div className="text-[10px] font-medium opacity-90">
                      2024
                    </div>
                  </div>
                </HexagonIcon>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 text-primary text-sm font-semibold uppercase tracking-wider mb-4 border border-primary/20"
              style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
            >
              About Our Company
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Our Company Provides The Best{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Security Services
              </span>
            </h2>

            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              InVision Network is a veteran-supporting cybersecurity company
              dedicated to protecting seniors and families from the rising
              threat of AI-powered scams. Our mission is to make digital safety
              accessible to everyone in Ohio.
            </p>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/services">
                  Learn More About Our Services
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
