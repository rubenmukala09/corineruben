import { Link } from "react-router-dom";
import {
  Shield,
  Users,
  GraduationCap,
  Building2,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";

const stats = [
  { value: "5,000+", label: "Families Protected" },
  { value: "99.2%", label: "Threat Detection Rate" },
  { value: "24/7", label: "Expert Support" },
  { value: "10%", label: "Veteran Discount" },
];

const benefits = [
  { icon: Shield, text: "AI-powered scam detection that stops threats before they reach you" },
  { icon: Users, text: "Family plans that cover every member of your household" },
  { icon: GraduationCap, text: "Hands-on training so you never fall for a scam again" },
  { icon: Building2, text: "Enterprise security audits and AI automation for your business" },
];

export const HomeIntroSection = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-5 sm:px-6 lg:px-12">

        {/* Urgency Banner */}
        <div className="mb-8 sm:mb-10 md:mb-14 rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-500/10 via-orange-500/8 to-red-500/10 border border-red-500/20 p-3.5 sm:p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <AlertTriangle className="w-4 sm:w-5 h-4 sm:h-5 text-red-500" />
            <span className="text-xs sm:text-sm font-bold text-red-600 uppercase tracking-wide">Active Threat</span>
          </div>
          <p className="text-xs sm:text-sm text-foreground/80 flex-1">
            AI-powered scams increased 300% in Ohio this year. Protect your family before it is too late.
          </p>
          <Button asChild size="sm" className="rounded-full bg-red-500 hover:bg-red-600 text-white flex-shrink-0 w-full sm:w-auto text-xs sm:text-sm h-9 sm:h-10">
            <Link to="/training#pricing">Get Protected Now</Link>
          </Button>
        </div>

        {/* Main Marketing Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-14 items-center mb-8 sm:mb-12 md:mb-16">
          {/* Left — Copy */}
          <div>
            <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] bg-primary/10 text-primary mb-3 sm:mb-4">
              Ohio's Trusted Cybersecurity Partner
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-foreground leading-[1.1] mb-4 sm:mb-5">
              Your Family Deserves{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Real Protection
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-5 sm:mb-6 leading-relaxed max-w-lg">
              Scammers are using AI to clone voices, create deepfakes, and target seniors. 
              We give you the tools, training, and support to fight back.
            </p>

            <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
              {benefits.map((b) => (
                <li key={b.text} className="flex items-start gap-2.5 sm:gap-3">
                  <div className="mt-0.5 flex-shrink-0 w-7 sm:w-8 h-7 sm:h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <b.icon className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-primary" />
                  </div>
                  <span className="text-xs sm:text-sm text-foreground/80 leading-relaxed">{b.text}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <Button asChild size="lg" className="h-11 sm:h-12 px-6 sm:px-8 text-xs sm:text-sm font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 shadow-lg w-full sm:w-auto">
                <Link to="/training#pricing">
                  Start Your Free Assessment <ArrowRight className="ml-2 w-3.5 sm:w-4 h-3.5 sm:h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-11 sm:h-12 px-6 sm:px-8 text-xs sm:text-sm font-bold rounded-full w-full sm:w-auto">
                <a href={`tel:${SITE.phone.e164}`}>
                  <Phone className="w-3.5 sm:w-4 h-3.5 sm:h-4 mr-2" /> Call {SITE.phone.display}
                </a>
              </Button>
            </div>
          </div>

          {/* Right — Stats Grid */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl sm:rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-4 sm:p-5 md:p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent mb-0.5 sm:mb-1">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof Strip */}
        <div className="rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary/5 via-transparent to-accent/5 border border-primary/15 p-3.5 sm:p-4 md:p-5 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 border-2 border-background" />
              ))}
            </div>
            <div className="text-xs sm:text-sm">
              <span className="font-bold text-foreground">100+ families</span>{" "}
              <span className="text-muted-foreground">joined this month</span>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-emerald-500" /> No credit card required</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-emerald-500" /> {SITE.moneyBackGuaranteeDays}-day guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};
