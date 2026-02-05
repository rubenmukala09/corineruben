import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Award, Shield, CheckCircle, ArrowRight, Play, BookOpen, Star, DollarSign, Eye, AlertTriangle, Target, Briefcase, Quote, GraduationCap, Heart } from "lucide-react";
import workshopSeniorsLearning from "@/assets/workshop-seniors-learning.jpg";
import seniorLearning from "@/assets/senior-learning.jpg";
import trainingSession from "@/assets/training-session.jpg";

const formats = [
  { icon: Users, title: "Groups", price: "$79", badge: null },
  { icon: Star, title: "Family", price: "$199", badge: "Best" },
  { icon: Award, title: "Private", price: "$299", badge: "VIP" },
  { icon: DollarSign, title: "Orgs", price: "$510+", badge: null },
];

const howItWorks = [
  { step: "1", title: "Book", desc: "Choose format", icon: BookOpen },
  { step: "2", title: "Learn", desc: "Interactive session", icon: GraduationCap },
  { step: "3", title: "Support", desc: "Ongoing help", icon: Shield },
];

const services = [
  { icon: AlertTriangle, title: "Scam Prevention", desc: "Identify AI scams" },
  { icon: Shield, title: "4-Step Protection", desc: "Proven method" },
  { icon: Target, title: "Protection Tiers", desc: "Choose your level" },
  { icon: Eye, title: "Threat Analysis", desc: "Real-time alerts" },
];

export const WorkshopsPromo = () => {
  return (
    <section className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(var(--background)) 0%, #faf8f6 50%, hsl(var(--background)) 100%)' }}>
      {/* Subtle warm gradient orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(248,146,106,0.15) 0%, transparent 60%)', filter: 'blur(80px)' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(187,129,181,0.12) 0%, transparent 60%)', filter: 'blur(80px)' }} />
      
      {/* Premium grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Image Side */}
          <div className="relative space-y-6">
            {/* Quote Card - Premium glass */}
            <div className="p-5 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,146,106,0.05) 100%)',
                border: '1px solid rgba(248,146,106,0.15)',
                boxShadow: '0 20px 60px -20px rgba(248,146,106,0.15)'
              }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #F8926A 0%, #F6D7DD 100%)', boxShadow: '0 8px 20px -8px rgba(248,146,106,0.5)' }}>
                  <Quote className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-base italic text-foreground/80 leading-relaxed">"In the age of AI, the pause you take could be the protection you need."</p>
                  <p className="text-sm text-coral-600 mt-2 font-semibold">— InVision Network Team</p>
                </div>
              </div>
            </div>

            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden"
              style={{ boxShadow: '0 30px 80px -20px rgba(24,48,90,0.2)' }}>
              <img src={workshopSeniorsLearning} alt="Training workshop" width={700} height={394} loading="lazy" decoding="async"
                className="w-full h-auto object-cover aspect-[16/10]" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    boxShadow: '0 15px 40px -10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)'
                  }}>
                  <Play className="w-7 h-7 text-coral-500 ml-1" fill="currentColor" />
                </div>
              </div>
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[{ img: seniorLearning, label: "One-on-One Training" }, { img: trainingSession, label: "Group Workshops" }].map((item, i) => (
                <div key={i} className="relative rounded-2xl overflow-hidden group"
                  style={{ boxShadow: '0 15px 40px -15px rgba(0,0,0,0.15)' }}>
                  <img src={item.img} alt={item.label} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3"><span className="text-white text-sm font-semibold">{item.label}</span></div>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { icon: Shield, label: "HIPAA Protected", color: "rgba(24,48,90,0.08)" },
                { icon: Star, label: "10% Veteran Discount", color: "rgba(248,146,106,0.1)" },
                { icon: CheckCircle, label: "30-Day Guarantee", color: "rgba(20,184,166,0.08)" },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-full hover:scale-105 transition-transform"
                  style={{ background: badge.color, border: '1px solid rgba(0,0,0,0.06)' }}>
                  <badge.icon className="w-4 h-4 text-foreground/70" />
                  <span className="text-sm font-semibold text-foreground/80">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-6">
            {/* Section Badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(248,146,106,0.15) 0%, rgba(246,215,221,0.2) 100%)',
                border: '1px solid rgba(248,146,106,0.25)'
              }}>
              <GraduationCap className="w-5 h-5 text-coral-600" />
              <span className="font-semibold text-coral-700">Learn & Train Workshops</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[0.95]">
              Protect Your Family from{" "}
              <span className="bg-gradient-to-r from-coral-500 via-coral-400 to-lavender-500 bg-clip-text text-transparent">AI-Powered Scams</span>
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Scammers now use deepfakes and voice cloning. Our expert-led workshops teach you to recognize and stop these sophisticated threats.
            </p>

            {/* How It Works */}
            <div className="grid grid-cols-3 gap-3">
              {howItWorks.map((item, index) => (
                <div key={index} className="text-center p-4 rounded-2xl hover:scale-105 transition-all cursor-default"
                  style={{
                    background: index === 1 ? 'linear-gradient(135deg, #F8926A 0%, #F6D7DD 100%)' : 
                                index === 0 ? 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--navy-500)) 100%)' :
                                'linear-gradient(135deg, #BB81B5 0%, #F6D7DD 100%)',
                    boxShadow: '0 15px 30px -10px rgba(0,0,0,0.15)'
                  }}>
                  <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.2)' }}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-base font-bold text-white">{item.title}</div>
                  <div className="text-xs text-white/80">{item.desc}</div>
                </div>
              ))}
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-2 gap-3">
              {services.map((service, index) => (
                <div key={index} className="p-4 rounded-2xl group cursor-default hover:scale-[1.02] transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.8)',
                    border: '1px solid rgba(248,146,106,0.1)',
                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.06)'
                  }}>
                  <div className="w-10 h-10 mb-3 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ background: 'linear-gradient(135deg, rgba(248,146,106,0.15) 0%, rgba(187,129,181,0.1) 100%)' }}>
                    <service.icon className="w-5 h-5 text-coral-500" />
                  </div>
                  <div className="text-base font-bold text-foreground">{service.title}</div>
                  <div className="text-sm text-muted-foreground">{service.desc}</div>
                </div>
              ))}
            </div>

            {/* Pricing Preview */}
            <div className="grid grid-cols-4 gap-3">
              {formats.map((format, index) => (
                <div key={index} className="relative text-center p-4 rounded-2xl cursor-pointer hover:scale-105 hover:-translate-y-1 transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.9)',
                    border: '1px solid rgba(0,0,0,0.06)',
                    boxShadow: '0 10px 30px -15px rgba(0,0,0,0.1)'
                  }}>
                  {format.badge && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 text-[10px] font-bold text-white rounded-full"
                      style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)', boxShadow: '0 4px 10px rgba(248,146,106,0.3)' }}>
                      {format.badge}
                    </span>
                  )}
                  <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, rgba(248,146,106,0.15) 0%, rgba(139,92,246,0.1) 100%)' }}>
                    <format.icon className="w-5 h-5 text-coral-500" />
                  </div>
                  <div className="text-sm font-semibold text-foreground/70">{format.title}</div>
                  <div className="text-lg font-black text-coral-500">{format.price}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg" className="group h-14 px-8 text-base font-semibold rounded-2xl border-0"
                style={{
                  background: 'linear-gradient(135deg, #F8926A 0%, #F6D7DD 50%, #BB81B5 100%)',
                  boxShadow: '0 15px 40px -10px rgba(248,146,106,0.4)',
                  color: '#1a1a2e'
                }}>
                <Link to="/training">
                  <GraduationCap className="mr-2 w-5 h-5" />
                  View Workshops
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group h-14 px-8 text-base font-semibold rounded-2xl border-2 border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5">
                <Link to="/training#pricing">
                  <Heart className="mr-2 w-5 h-5 text-rose-500" />
                  See Pricing
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};