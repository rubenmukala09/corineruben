import { Shield, Users, GraduationCap, Building2, ArrowRight, CheckCircle2, Sparkles, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SITE } from "@/config/site";
import {
  AIMonitoringImage,
  WorkshopTrainingImage,
  CustomerSupportImage,
  HappyFamilyImage,
} from "@/components/home/ImagePlaceholders";

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
        {/* Warm Welcome Header */}
        <AnimatedSection animation="fade-up">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-widget mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground tracking-wider uppercase">
                Welcome to {SITE.name}
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-8">
              Protecting What Matters Most:{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Your Family's Safety
              </span>
            </h2>

            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              We're your local cybersecurity experts right here in {SITE.location.areaLabel}.
              Think of us as your family's digital bodyguard—we protect you from AI scams,
              teach you how to stay safe online, and give you peace of mind.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>No Tech Jargon</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Simple & Clear</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Veteran-Founded</span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* How It Works - Simple 3-Step Process */}
        <AnimatedSection animation="fade-up">
          <div className="max-w-5xl mx-auto mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                How We Keep You Safe (It's Simple!)
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                No complicated tech talk. Here's exactly what we do for you in three easy steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="glass-card rounded-3xl card-padding-xl text-center group hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  1
                </div>
                <AIMonitoringImage className="mb-6" />
                <h4 className="text-xl font-bold text-foreground mb-4">We Watch for Threats</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Our AI-powered system scans for scams 24/7—deepfakes, voice clones,
                  phishing emails, and fake websites that target seniors and families.
                </p>
              </div>

              {/* Step 2 */}
              <div className="glass-card rounded-3xl card-padding-xl text-center group hover:scale-105 transition-all duration-300 animate-delay-100">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  2
                </div>
                <WorkshopTrainingImage className="mb-6" />
                <h4 className="text-xl font-bold text-foreground mb-4">We Teach You</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Friendly, hands-on workshops (in-person or online) show you exactly
                  what to watch for and how to stay safe—no confusing computer terms.
                </p>
              </div>

              {/* Step 3 */}
              <div className="glass-card rounded-3xl card-padding-xl text-center group hover:scale-105 transition-all duration-300 animate-delay-200">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  3
                </div>
                <CustomerSupportImage className="mb-6" />
                <h4 className="text-xl font-bold text-foreground mb-4">We're Here to Help</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Got a suspicious email? Not sure if something's a scam? Call or text us anytime.
                  We're real people who actually answer the phone.
                </p>
              </div>
            </div>

            <div className="text-center mt-10">
              <p className="text-lg text-muted-foreground mb-6">
                <strong className="text-foreground">Bottom line:</strong> We handle the complicated tech stuff
                so you can enjoy using your phone and computer without worry.
              </p>
              <Button
                asChild
                size="lg"
                className="h-14 px-10 text-base font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90"
              >
                <Link to="/training">
                  See How It Works <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>

        {/* What We Offer - Pillars Grid */}
        <AnimatedSection animation="fade-up">
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Everything You Need to Stay Safe
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose what fits your needs—whether you're protecting your family or securing your business.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((pillar, index) => (
                <AnimatedSection
                  key={pillar.title}
                  animation="fade-up"
                  delay={index * 100}
                >
                  <Link
                    to={pillar.link}
                    className="group block h-full glass-card rounded-2xl card-padding-lg transition-all duration-300 hover:scale-105"
                  >
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}
                    >
                      <pillar.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {pillar.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Visual Impact Section - Happy Families */}
        <AnimatedSection animation="fade-up">
          <div className="max-w-6xl mx-auto mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="order-2 lg:order-1">
                <HappyFamilyImage className="w-full" />
              </div>

              {/* Content */}
              <div className="order-1 lg:order-2">
                <div className="glass-widget inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6">
                  <Heart className="w-4 h-4 text-accent" />
                  <span className="text-sm font-semibold">Real Families, Real Protection</span>
                </div>

                <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  Thousands of Ohio Families Feel Safer Every Day
                </h3>

                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  From young parents learning to protect their kids online, to seniors who
                  want to video call grandchildren safely, to veterans securing their
                  benefits—we help real people stay safe from real threats.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-foreground mb-1">Protected Over 5,000 Families</div>
                      <div className="text-sm text-muted-foreground">
                        Across {SITE.location.areaLabel} and beyond
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-foreground mb-1">Stopped 10,000+ Scam Attempts</div>
                      <div className="text-sm text-muted-foreground">
                        And counting—our AI never sleeps
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-foreground mb-1">4.9/5 Star Reviews</div>
                      <div className="text-sm text-muted-foreground">
                        Our families love the peace of mind
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Why We're Different - Personal Message */}
        <AnimatedSection animation="scale-up">
          <div className="relative glass-heavy rounded-3xl card-padding-xl text-center overflow-hidden specular-highlight">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl -translate-y-1/2 translate-x-1/2 loop-breathe" />
            <div className="relative z-10 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 mb-6">
                <Heart className="w-6 h-6 text-accent fill-accent" />
                <span className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  Our Promise to You
                </span>
              </div>

              <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                You're Not Just a Customer—You're Family
              </h3>

              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                We started {SITE.name} because we saw our own parents and grandparents
                falling victim to scams. We got tired of big companies using confusing
                tech jargon and charging ridiculous prices. So we built something different:
                <strong className="text-foreground"> real protection from real people who actually care</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <div className="glass-widget rounded-2xl p-6">
                  <div className="text-3xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">No-Nonsense Guarantee</div>
                </div>
                <div className="glass-widget rounded-2xl p-6">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">Real People Available</div>
                </div>
                <div className="glass-widget rounded-2xl p-6">
                  <div className="text-3xl font-bold text-primary mb-2">{SITE.location.areaLabel}</div>
                  <div className="text-sm text-muted-foreground">Proudly Local</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="h-14 px-10 text-base font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 shadow-lg"
                >
                  <Link to="/about">
                    Meet Our Team <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-14 px-10 text-base font-bold rounded-full border-2"
                >
                  <Link to="/contact">Schedule a Free Call</Link>
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mt-6">
                No pressure, no sales pitch—just honest answers to your questions.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
