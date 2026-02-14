import { Shield, Users, GraduationCap, Building2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SITE } from "@/config/site";

const pillars = [
  {
    icon: Shield,
    title: "AI Scam Protection",
    description:
      "We identify and neutralize deepfakes, voice cloning, and phishing threats targeting your family.",
    link: "/training",
    color: "from-primary to-accent",
  },
  {
    icon: GraduationCap,
    title: "Hands-On Training",
    description:
      "Live workshops teach you to recognize and respond to digital threats with confidence.",
    link: "/training",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Building2,
    title: "Business Solutions",
    description:
      "Custom cybersecurity audits, employee training, and compliance consulting for organizations.",
    link: "/business",
    color: "from-violet-500 to-indigo-500",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      `Proudly serving the ${SITE.location.areaLabel} with veteran-supporting, family-focused security.`,
    link: "/about",
    color: "from-amber-500 to-orange-500",
  },
];

export const IntroductionSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <AnimatedSection animation="fade-up">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] bg-primary/10 text-primary mb-6">
              Welcome to {SITE.name}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight mb-6">
              Your Trusted Partner in{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Digital Safety
              </span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {SITE.name} is an Ohio-based cybersecurity firm dedicated to
              protecting families and businesses from the rising wave of
              AI-powered scams. We combine expert-led training, real-time
              threat monitoring, and personalized support to keep your
              digital life secure.
            </p>
          </div>
        </AnimatedSection>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar, index) => (
            <AnimatedSection
              key={pillar.title}
              animation="fade-up"
              delay={index * 100}
            >
              <Link
                to={pillar.link}
                className="group block h-full rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}
                >
                  <pillar.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {pillar.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* Mission Statement */}
        <AnimatedSection animation="scale-up">
          <div className="relative rounded-2xl border border-border/60 bg-gradient-to-br from-card via-card to-primary/5 p-8 lg:p-12 text-center overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <p className="text-xl lg:text-2xl font-medium text-foreground leading-relaxed max-w-3xl mx-auto mb-6">
                "We started {SITE.name} because every family deserves
                access to the same level of digital protection that
                corporations enjoy. Our mission is to make cybersecurity
                simple, accessible, and affordable for everyone."
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="h-12 px-8 text-sm font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90"
                >
                  <Link to="/about">
                    About Our Story <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-sm font-bold rounded-full"
                >
                  <Link to="/contact">Talk to Our Team</Link>
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
