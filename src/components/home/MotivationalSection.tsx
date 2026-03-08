import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Shield,
  TrendingUp,
  Users,
  CheckCircle2,
  ArrowRight,
  Star,
  Heart,
  Zap,
  Quote,
} from "lucide-react";
import motivationGraphic from "@/assets/motivation-infographic.jpg";
import communityWorkshop from "@/assets/community-workshop-real.jpg";

const IMPACT_STATS = [
  { value: "5,000+", label: "Families Protected", icon: Users },
  { value: "99.2%", label: "Threat Detection", icon: Shield },
  { value: "$2.1M+", label: "Fraud Prevented", icon: TrendingUp },
  { value: "4.9/5", label: "Client Rating", icon: Star },
];

const SUCCESS_STORIES = [
  {
    quote: "After the training, my mother spotted a deepfake scam call in seconds. That knowledge saved her retirement savings.",
    name: "David R.",
    role: "Son of 72-year-old client",
    saved: "$48,000",
  },
  {
    quote: "Our employees went from clicking 40% of phishing emails to under 2%. The ROI is immeasurable.",
    name: "Sarah M.",
    role: "HR Director, Midwest Manufacturing",
    saved: "$120,000+",
  },
  {
    quote: "They helped me recover my hacked accounts and set up real protection. I sleep better at night knowing my family is safe.",
    name: "Margaret T.",
    role: "Retired Teacher, Kettering",
    saved: "$15,000",
  },
];

const JOURNEY_STEPS = [
  { step: "01", title: "Assessment", desc: "We evaluate your digital footprint and risk level", icon: Zap },
  { step: "02", title: "Education", desc: "Personalized training on current AI scam tactics", icon: Users },
  { step: "03", title: "Protection", desc: "Active monitoring and real-time threat alerts", icon: Shield },
  { step: "04", title: "Confidence", desc: "You live digitally with peace of mind", icon: Heart },
];

export const MotivationalSection = () => {
  return (
    <div className="space-y-0">
      {/* ═══ MOTIVATIONAL HERO BANNER ═══ */}
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 backdrop-blur-sm text-primary text-xs font-bold uppercase tracking-[0.15em]">
                <Heart className="w-3.5 h-3.5" />
                Your Safety Matters
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-[1.1]">
                Every Family Deserves{" "}
                <span className="bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
                  Digital Peace of Mind
                </span>
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
                AI scams cost Americans over $10 billion last year. Your parents, your
                business, and your community deserve protection that works. We are here
                to make that happen.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="h-12 px-8 rounded-full font-bold bg-gradient-to-r from-primary to-accent text-white hover:opacity-90"
                >
                  <Link to="/training#pricing">
                    Start Your Protection <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 rounded-full font-bold"
                >
                  <Link to="/contact">Talk to an Expert</Link>
                </Button>
              </div>
            </div>

            {/* Infographic illustration */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-border/40 shadow-lg">
                <img
                  src={motivationGraphic}
                  alt="Digital safety journey infographic showing upward growth with shield protection icons"
                  className="w-full h-auto object-cover"
                  width={960}
                  height={540}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              {/* Floating stat badges */}
              <div className="absolute -bottom-4 -left-4 px-4 py-3 rounded-xl bg-card/95 backdrop-blur-md border border-border/50 shadow-md">
                <p className="text-2xl font-black text-primary">$2.1M+</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Fraud Prevented</p>
              </div>
              <div className="absolute -top-4 -right-4 px-4 py-3 rounded-xl bg-card/95 backdrop-blur-md border border-border/50 shadow-md">
                <p className="text-2xl font-black text-primary">99.2%</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Detection Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ IMPACT STATS BAR ═══ */}
      <section className="py-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {IMPACT_STATS.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-5 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/40"
              >
                <stat.icon className="w-6 h-6 mx-auto text-primary mb-2" />
                <p className="text-2xl sm:text-3xl font-black text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SUCCESS STORIES ═══ */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Community workshop photo */}
            <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-border/40 shadow-lg">
              <img src={communityWorkshop} alt="Seniors attending digital literacy workshop in community center" width={1024} height={1024} loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>

            <div className="lg:col-span-3">
              <div className="mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.15em] mb-4">
                  <Star className="w-3.5 h-3.5" />
                  Real Stories
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-foreground">
                  Protection That{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Changes Lives
                  </span>
                </h2>
              </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SUCCESS_STORIES.map((story, i) => (
              <div
                key={i}
                className="relative p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <Quote className="w-8 h-8 text-primary/20 mb-3" />
                <p className="text-sm text-foreground leading-relaxed mb-5">
                  "{story.quote}"
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-border/40">
                  <div>
                    <p className="text-sm font-bold text-foreground">{story.name}</p>
                    <p className="text-xs text-muted-foreground">{story.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Saved</p>
                    <p className="text-sm font-black text-primary">{story.saved}</p>
                  </div>
                </div>
              </div>
            ))}
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PROTECTION JOURNEY (Illustrated Infographic) ═══ */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground">
              Your Path to{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Digital Confidence
              </span>
            </h2>
            <p className="text-base text-muted-foreground mt-3 max-w-xl mx-auto">
              Four clear steps from vulnerability to complete protection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {JOURNEY_STEPS.map((step, i) => (
              <div
                key={step.step}
                className="relative p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/40 text-center group hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                {/* Connector line */}
                {i < JOURNEY_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-primary/30" />
                )}
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                  Step {step.step}
                </span>
                <h3 className="text-lg font-bold text-foreground mt-1 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INSPIRATIONAL CTA ═══ */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div
            className="relative rounded-3xl overflow-hidden p-10 sm:p-14 text-center"
            style={{
              background: "linear-gradient(135deg, hsl(288 30% 25%) 0%, hsl(260 35% 20%) 50%, hsl(310 25% 22%) 100%)",
            }}
          >
            {/* Subtle pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                Your Family's Safety Is Not Optional
              </h2>
              <p className="text-base text-white/70 leading-relaxed">
                Every day you wait is another day scammers get smarter. Take
                the first step today and give your loved ones the protection
                they deserve.
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-2">
                <Button
                  asChild
                  size="lg"
                  className="h-12 px-8 rounded-full font-bold bg-white text-foreground hover:bg-white/90"
                >
                  <Link to="/training#pricing">
                    Get Protected Now <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 rounded-full font-bold border-2 border-white/30 text-white hover:bg-white/10"
                >
                  <Link to="/contact">Schedule a Free Consultation</Link>
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                {["10% Veteran Discount", "30-Day Money-Back Guarantee", "No Contracts"].map((item) => (
                  <span key={item} className="flex items-center gap-1.5 text-xs text-white/90">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
