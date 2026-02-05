import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, Bot, Globe, ArrowRight, Shield, Clock, TrendingUp, Star, Zap, Award, CheckCircle, Palette, Headphones, Lightbulb, Rocket, DollarSign } from "lucide-react";
import businessProfessionalsOffice from "@/assets/business-professionals-office.jpg";
import aiReceptionistTech from "@/assets/ai-receptionist-tech.jpg";
import aiAutomationTech from "@/assets/ai-automation-tech.jpg";

const services = [
  { icon: Phone, title: "AI Receptionist", description: "24/7 calls, booking, FAQs", price: "$9,500", highlight: "Never miss a lead" },
  { icon: Calendar, title: "Smart Scheduling", description: "Auto-book & reminders", price: "Custom", highlight: "Zero back-and-forth" },
  { icon: Bot, title: "AI Automation", description: "Custom agents & bots", price: "$25K+", highlight: "Full customization" },
  { icon: Globe, title: "Website Design", description: "Landing to e-commerce", price: "$1,500+", highlight: "Pro websites" },
];

const premiumAddons = [
  { icon: Palette, name: "Custom Integrations" },
  { icon: Shield, name: "Website Insurance" },
  { icon: Headphones, name: "Expert Consulting" },
];

const roiFacts = [
  { stat: "62%", desc: "calls missed", icon: Phone },
  { stat: "$500", desc: "lost/missed call", icon: DollarSign },
  { stat: "80%", desc: "fewer no-shows", icon: CheckCircle },
];

export const AIBusinessPromo = () => {
  return (
    <section className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(var(--background)) 0%, #f8f6fa 50%, hsl(var(--background)) 100%)' }}>
      {/* Subtle gradient orbs */}
      <div className="absolute top-20 left-0 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 60%)', filter: 'blur(80px)' }} />
      <div className="absolute bottom-20 right-0 w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(24,48,90,0.15) 0%, transparent 60%)', filter: 'blur(80px)' }} />

      {/* Premium grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Content Side */}
          <div className="space-y-6">
            {/* Section Badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(187,129,181,0.1) 100%)',
                border: '1px solid rgba(139,92,246,0.2)'
              }}>
              <Bot className="w-5 h-5 text-violet-600" />
              <span className="font-semibold text-violet-700">AI & Business Solutions</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[0.95]">
              Stop Missing Calls.{" "}
              <span className="bg-gradient-to-r from-violet-600 via-lavender-500 to-coral-500 bg-clip-text text-transparent">Let AI Run Your Front Desk.</span>
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Transform your business with AI-powered automation. We build solutions that work 24/7 so you never miss an opportunity.
            </p>

            {/* ROI + Premium Cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* ROI Card */}
              <div className="p-5 rounded-3xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                  boxShadow: '0 20px 50px -15px rgba(20,184,166,0.4)'
                }}>
                <div className="absolute -top-8 -right-8 w-24 h-24 border border-white/10 rounded-full" />
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white/90 font-medium">Average ROI</span>
                </div>
                <div className="text-5xl font-black text-white mb-1">340%</div>
                <div className="flex items-center gap-1.5 text-sm text-white/80">
                  <Rocket className="w-4 h-4" /><span>Within 6 months</span>
                </div>
              </div>

              {/* Premium Card */}
              <div className="p-5 rounded-3xl"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
                  boxShadow: '0 20px 50px -15px rgba(139,92,246,0.4)'
                }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-bold">Premium</span>
                </div>
                <div className="space-y-2">
                  {premiumAddons.map((addon, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm px-3 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.15)' }}>
                      <addon.icon className="w-4 h-4 text-white" />
                      <span className="text-white font-medium">{addon.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Insurance Card */}
            <div className="p-5 rounded-3xl relative"
              style={{
                background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(248,146,106,0.08) 100%)',
                border: '1px solid rgba(245,158,11,0.25)'
              }}>
              <Star className="absolute top-4 right-4 w-5 h-5 text-amber-500" />
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)', boxShadow: '0 10px 25px -8px rgba(245,158,11,0.5)' }}>
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-bold text-foreground">AI Service Insurance</h3>
                    <span className="px-2.5 py-0.5 text-[10px] font-bold text-white rounded-full"
                      style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)' }}>INDUSTRY FIRST</span>
                  </div>
                  <p className="text-sm text-muted-foreground">First-ever AI insurance—protecting your investment with ongoing support.</p>
                </div>
              </div>
            </div>

            {/* ROI Facts */}
            <div className="flex gap-3">
              {roiFacts.map((fact, index) => (
                <div key={index} className="flex-1 text-center p-4 rounded-2xl cursor-default hover:-translate-y-1 transition-all"
                  style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 30px -15px rgba(0,0,0,0.1)' }}>
                  <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(24,48,90,0.08) 100%)' }}>
                    <fact.icon className="w-5 h-5 text-violet-600" />
                  </div>
                  <div className="text-xl font-black text-foreground">{fact.stat}</div>
                  <div className="text-sm text-muted-foreground">{fact.desc}</div>
                </div>
              ))}
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-2 gap-3">
              {services.map((service, index) => (
                <div key={index} className="p-4 rounded-2xl group cursor-default hover:scale-[1.02] transition-all"
                  style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(139,92,246,0.08)', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.06)' }}>
                  <div className="w-11 h-11 mb-3 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(187,129,181,0.1) 100%)' }}>
                    <service.icon className="w-5 h-5 text-violet-600" />
                  </div>
                  <h3 className="font-bold text-foreground text-base">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-foreground">{service.price}</span>
                    <span className="text-xs font-semibold px-2 py-1 rounded-lg" style={{ background: 'rgba(20,184,166,0.1)', color: '#0d9488' }}>{service.highlight}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg" className="group h-14 px-8 text-base font-semibold rounded-2xl border-0"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--navy-500)) 100%)',
                  boxShadow: '0 15px 40px -10px rgba(24,48,90,0.4)',
                  color: 'white'
                }}>
                <Link to="/business">
                  <Rocket className="mr-2 w-5 h-5" />
                  Explore Solutions
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group h-14 px-8 text-base font-semibold rounded-2xl border-2 border-violet-300 text-violet-700 hover:border-violet-400 hover:bg-violet-50">
                <Link to="/contact?service=ai-automation">
                  <DollarSign className="mr-2 w-5 h-5" />
                  Get Quote
                </Link>
              </Button>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative space-y-6">
            {/* Quote Card */}
            <div className="p-5 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(139,92,246,0.05) 100%)',
                border: '1px solid rgba(139,92,246,0.12)',
                boxShadow: '0 20px 60px -20px rgba(139,92,246,0.12)'
              }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)', boxShadow: '0 8px 20px -8px rgba(139,92,246,0.5)' }}>
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-base italic text-foreground/80 leading-relaxed">"Every missed call is a missed opportunity. Let AI handle the front desk while you focus on growth."</p>
                  <p className="text-sm text-violet-600 mt-2 font-semibold">— Business Automation Insight</p>
                </div>
              </div>
            </div>

            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: '0 30px 80px -20px rgba(24,48,90,0.2)' }}>
              <img src={businessProfessionalsOffice} alt="Business professionals" width={700} height={394} loading="lazy" decoding="async"
                className="w-full h-auto object-cover aspect-[16/10]" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
              <div className="absolute top-4 right-4 px-4 py-2 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.95)', boxShadow: '0 10px 25px -10px rgba(0,0,0,0.2)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#22c55e', boxShadow: '0 0 10px rgba(34,197,94,0.5)' }} />
                  <span className="text-sm font-bold text-foreground">AI Active 24/7</span>
                </div>
              </div>
            </div>

            {/* Feature Badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Clock, label: "24/7", desc: "Always On", bg: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--navy-500)) 100%)' },
                { icon: Shield, label: "HIPAA", desc: "Compliant", bg: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)' },
                { icon: Award, label: "Veteran", desc: "10% Off", bg: 'linear-gradient(135deg, #F8926A 0%, #F6D7DD 100%)' },
              ].map((item, i) => (
                <div key={i} className="text-center p-4 rounded-2xl text-white hover:scale-105 transition-all cursor-default"
                  style={{ background: item.bg, boxShadow: '0 15px 30px -10px rgba(0,0,0,0.2)' }}>
                  <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="text-base font-bold">{item.label}</div>
                  <div className="text-xs opacity-80">{item.desc}</div>
                </div>
              ))}
            </div>

            {/* Service Photos */}
            <div className="grid grid-cols-2 gap-4">
              {[{ img: aiReceptionistTech, label: "AI Receptionist", desc: "24/7 Intelligent Calls" }, { img: aiAutomationTech, label: "AI Automation", desc: "Custom Workflows" }].map((item, i) => (
                <div key={i} className="relative rounded-2xl overflow-hidden group" style={{ boxShadow: '0 15px 40px -15px rgba(0,0,0,0.15)' }}>
                  <img src={item.img} alt={item.label} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white text-sm font-bold">{item.label}</span>
                    <p className="text-white/70 text-xs">{item.desc}</p>
                  </div>
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full animate-pulse" style={{ background: i === 0 ? '#3b82f6' : '#a78bfa', boxShadow: `0 0 10px ${i === 0 ? 'rgba(59,130,246,0.5)' : 'rgba(167,139,250,0.5)'}` }} />
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { icon: Shield, label: "Enterprise Ready" },
                { icon: Star, label: "Top Rated" },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-full hover:scale-105 transition-transform"
                  style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <badge.icon className="w-4 h-4 text-foreground/70" />
                  <span className="text-sm font-semibold text-foreground/80">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};