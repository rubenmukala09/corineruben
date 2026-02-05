import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, Bot, Globe, ArrowRight, Shield, Clock, TrendingUp, Star, Zap, Award, CheckCircle, Palette, Headphones, Lightbulb, Rocket, DollarSign } from "lucide-react";
import businessTechBg from "@/assets/business-tech-bg.jpg";
import businessProfessionalsOffice from "@/assets/business-professionals-office.jpg";
import aiReceptionistTech from "@/assets/ai-receptionist-tech.jpg";
import aiAutomationTech from "@/assets/ai-automation-tech.jpg";

const services = [
  {
    icon: Phone,
    title: "AI Receptionist",
    description: "24/7 calls, booking, FAQs",
    price: "$9,500",
    highlight: "Never miss a lead",
    color: "from-navy-600 to-navy-500",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Auto-book & reminders",
    price: "Custom",
    highlight: "Zero back-and-forth",
    color: "from-teal-500 to-teal-400",
  },
  {
    icon: Bot,
    title: "AI Automation",
    description: "Custom agents & bots",
    price: "$25K+",
    highlight: "Full customization",
    color: "from-lavender-600 to-lavender-500",
  },
  {
    icon: Globe,
    title: "Website Design",
    description: "Landing to e-commerce",
    price: "$1,500+",
    highlight: "Pro websites",
    color: "from-coral-500 to-coral-400",
  },
];

const premiumAddons = [
  { icon: Palette, name: "Custom Integrations" },
  { icon: Shield, name: "Website Insurance" },
  { icon: Headphones, name: "Expert Consulting" },
];

const roiFacts = [
  { stat: "62%", desc: "calls missed", icon: Phone, color: "text-coral-600" },
  { stat: "$500", desc: "lost/missed call", icon: DollarSign, color: "text-navy-700" },
  { stat: "80%", desc: "fewer no-shows", icon: CheckCircle, color: "text-teal-600" },
];


export const AIBusinessPromo = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-navy-50/30 via-background to-lavender-50/20 relative overflow-hidden">
      {/* Premium gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-lavender-400/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-navy-400/6 rounded-full blur-[100px]" />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--navy-300)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--navy-300)) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Content Side */}
          <div className="space-y-5 animate-fade-in">
            <div className="inline-flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-navy-100 to-lavender-100 rounded-2xl border-2 border-navy-200/60 shadow-[0_4px_20px_-6px_rgba(24,48,90,0.15)]">
              <Bot className="w-6 h-6 text-navy-600" />
              <span className="font-bold text-navy-700 text-lg">AI & Business Solutions</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-navy-900 leading-[0.95]">
              Stop Missing Calls.{" "}
              <span className="bg-gradient-to-r from-lavender-600 via-lavender-500 to-coral-500 bg-clip-text text-transparent">Let AI Run Your Front Desk.</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-navy-700/80 leading-relaxed font-medium">
              Transform your business with AI-powered automation. We build solutions that work 24/7 so you never miss an opportunity.
            </p>

            {/* Combined ROI + Premium Section - Glass cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* ROI Card */}
              <div className="bg-gradient-to-br from-teal-500 to-teal-400 rounded-3xl p-5 text-white relative overflow-hidden hover:scale-[1.02] transition-all duration-300 shadow-[0_15px_40px_-10px_rgba(20,184,166,0.35)]">
                <div className="absolute -top-6 -right-6 w-24 h-24 border-2 border-white/10 rounded-full animate-spin" style={{ animationDuration: "20s" }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <span className="text-base font-semibold opacity-90">Average ROI</span>
                  </div>
                  <div className="text-5xl font-black mb-1">340%</div>
                  <div className="flex items-center gap-1.5 text-sm opacity-80">
                    <Rocket className="w-4 h-4" />
                    <span>Within 6 months</span>
                  </div>
                </div>
              </div>

              {/* Premium Services Card */}
              <div className="bg-gradient-to-br from-lavender-600 to-lavender-500 rounded-3xl p-5 text-white shadow-[0_15px_40px_-10px_rgba(187,129,181,0.35)]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="text-base font-bold">Premium</span>
                </div>
                <div className="space-y-2">
                  {premiumAddons.map((addon, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-2.5 text-sm bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2"
                    >
                      <addon.icon className="w-4 h-4" />
                      <span className="font-medium">{addon.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Service Insurance - Premium glass */}
            <div className="bg-gradient-to-r from-gold-100/60 via-coral-100/40 to-gold-100/60 border-2 border-gold-400/50 rounded-3xl p-5 relative overflow-hidden hover:scale-[1.01] transition-all duration-300 shadow-[0_8px_30px_-10px_rgba(245,158,11,0.2)] backdrop-blur-md">
              <div className="absolute top-3 right-3">
                <Star className="w-6 h-6 text-gold-500" />
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-400 flex items-center justify-center flex-shrink-0 shadow-lg shadow-gold-400/30">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <h3 className="font-bold text-navy-800 text-lg">AI Service Insurance</h3>
                    <span className="px-3 py-1 bg-gradient-to-r from-gold-500 to-gold-400 text-white text-xs font-bold rounded-full">INDUSTRY FIRST</span>
                  </div>
                  <p className="text-sm text-navy-600/80">
                    First-ever AI insurance—protecting your investment with ongoing support & updates.
                  </p>
                </div>
              </div>
            </div>

            {/* ROI Facts - Glass cards */}
            <div className="flex gap-3">
              {roiFacts.map((fact, index) => (
                <div 
                  key={index}
                  className="flex-1 bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-navy-100/50 shadow-[0_8px_30px_-10px_rgba(24,48,90,0.08)] text-center hover:-translate-y-2 hover:shadow-[0_15px_40px_-10px_rgba(24,48,90,0.12)] transition-all duration-300"
                >
                  <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-navy-50 flex items-center justify-center">
                    <fact.icon className={`w-5 h-5 ${fact.color}`} />
                  </div>
                  <div className={`text-xl font-black ${fact.color}`}>{fact.stat}</div>
                  <div className="text-sm text-navy-600/70">{fact.desc}</div>
                </div>
              ))}
            </div>

            {/* Services Grid - Glass cards */}
            <div className="grid grid-cols-2 gap-3">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-lavender-100/50 shadow-[0_8px_30px_-10px_rgba(24,48,90,0.08)] group cursor-pointer hover:scale-[1.03] hover:-translate-y-2 hover:shadow-[0_15px_40px_-10px_rgba(187,129,181,0.15)] transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}>
                      <service.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-navy-800 text-base">{service.title}</h3>
                  <p className="text-sm text-navy-600/70 mb-2">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black bg-gradient-to-r from-navy-700 to-navy-600 bg-clip-text text-transparent">{service.price}</span>
                    <span className="text-xs text-teal-700 font-semibold bg-teal-50 px-2 py-1 rounded-lg">{service.highlight}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs - Premium buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg" className="h-16 px-10 text-lg font-bold rounded-2xl bg-gradient-to-r from-navy-700 to-navy-600 text-white shadow-[0_8px_40px_-8px_rgba(24,48,90,0.4)] hover:shadow-[0_12px_50px_-8px_rgba(24,48,90,0.5)] hover:-translate-y-1 transition-all duration-300 group">
                <Link to="/business">
                  <Rocket className="mr-2 w-6 h-6 group-hover:scale-110 transition-transform" />
                  Explore Solutions
                  <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-16 px-10 text-lg font-bold rounded-2xl border-2 border-lavender-400 text-lavender-700 hover:bg-lavender-50 hover:border-lavender-500 shadow-[0_4px_20px_-6px_rgba(187,129,181,0.15)] hover:shadow-[0_8px_30px_-8px_rgba(187,129,181,0.2)] hover:-translate-y-1 transition-all duration-300 group">
                <Link to="/contact?service=ai-automation">
                  <DollarSign className="mr-2 w-6 h-6" />
                  Get Quote
                </Link>
              </Button>
            </div>
          </div>

          {/* Image Side with Premium Elements */}
          <div className="relative space-y-5 animate-fade-in" style={{ animationDelay: "100ms" }}>
            {/* Inspirational Quote - Glass card */}
            <div className="bg-gradient-to-br from-lavender-50/80 to-white/80 backdrop-blur-xl rounded-3xl p-5 border border-lavender-200/40 shadow-[0_8px_40px_-12px_rgba(187,129,181,0.15)]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-lavender-500 to-lavender-400 flex items-center justify-center flex-shrink-0 shadow-lg shadow-lavender-300/30">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-base italic text-navy-800 leading-relaxed font-medium">
                    "Every missed call is a missed opportunity. Let AI handle the front desk while you focus on growth."
                  </p>
                  <p className="text-sm text-lavender-600 mt-2 font-semibold">— Business Automation Insight</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_80px_-20px_rgba(24,48,90,0.2)] ring-1 ring-lavender-200/30">
              <img 
                src={businessProfessionalsOffice} 
                alt="Business professionals collaborating" 
                width={700}
                height={394}
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover aspect-[16/10]"
              />
              {/* Premium overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-foreground/5" />

              {/* Floating status badge with glass effect */}
              <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-lg border border-border/30">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse shadow-lg shadow-success/50" />
                  <span className="text-sm font-bold text-foreground">AI Active 24/7</span>
                </div>
              </div>
            </div>

            {/* Feature Highlights Bar - Premium gradient cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-navy-600 to-navy-500 rounded-2xl p-4 text-white text-center hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 shadow-lg">
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-base font-bold">24/7</div>
                <div className="text-xs opacity-80">Always On</div>
              </div>
              <div className="bg-gradient-to-br from-teal-500 to-teal-400 rounded-2xl p-4 text-white text-center hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 shadow-lg">
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="text-base font-bold">HIPAA</div>
                <div className="text-xs opacity-80">Compliant</div>
              </div>
              <div className="bg-gradient-to-br from-coral-500 to-coral-400 rounded-2xl p-4 text-navy-900 text-center hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 shadow-lg">
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-base font-bold">Veteran</div>
                <div className="text-xs opacity-80">10% Off</div>
              </div>
            </div>

            {/* Additional Service Photos */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="relative rounded-2xl overflow-hidden shadow-lg group hover:scale-105 transition-transform">
                <img 
                  src={aiReceptionistTech}
                  alt="AI receptionist technology concept"
                  className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="text-white text-sm font-bold">AI Receptionist</span>
                  <p className="text-white/70 text-xs">24/7 Intelligent Calls</p>
                </div>
                {/* Animated glow */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse" />
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg group hover:scale-105 transition-transform">
                <img 
                  src={aiAutomationTech}
                  alt="AI automation technology concept"
                  className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="text-white text-sm font-bold">AI Automation</span>
                  <p className="text-white/70 text-xs">Custom Workflows</p>
                </div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-violet-400 rounded-full shadow-lg shadow-violet-400/50 animate-pulse" />
              </div>
            </div>

            {/* Trust Badges - Premium glass pills */}
            <div className="flex flex-wrap gap-3 justify-center">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-full border border-navy-200/50 shadow-[0_4px_20px_-6px_rgba(24,48,90,0.1)] hover:scale-105 transition-transform">
                <Shield className="w-4 h-4 text-navy-600" />
                <span className="text-sm font-semibold">Enterprise Ready</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gold-50 to-gold-100 backdrop-blur-md rounded-full border border-gold-300/50 shadow-[0_4px_20px_-6px_rgba(245,158,11,0.15)] hover:scale-105 transition-transform">
                <Star className="w-4 h-4 text-gold-600" />
                <span className="text-sm font-semibold">Ohio Business Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};