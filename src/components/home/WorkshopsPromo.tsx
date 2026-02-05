import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Clock, Award, Shield, CheckCircle, ArrowRight, Play, BookOpen, Star, DollarSign, Eye, AlertTriangle, Target, Briefcase, Quote, GraduationCap, Heart } from "lucide-react";
import workshopSeniorsLearning from "@/assets/workshop-seniors-learning.jpg";
import learningBg from "@/assets/learning-bg.jpg";
import seniorLearning from "@/assets/senior-learning.jpg";
import trainingSession from "@/assets/training-session.jpg";

const formats = [
  {
    icon: Users,
    title: "Groups",
    price: "$79",
    badge: null,
    color: "from-navy-600 to-navy-500",
  },
  {
    icon: Star,
    title: "Family",
    price: "$199",
    badge: "Best",
    color: "from-coral-500 to-coral-400",
  },
  {
    icon: Award,
    title: "Private",
    price: "$299",
    badge: "VIP",
    color: "from-lavender-600 to-lavender-500",
  },
  {
    icon: DollarSign,
    title: "Orgs",
    price: "$510+",
    badge: null,
    color: "from-teal-500 to-teal-400",
  },
];

const audiences = [
  { text: "Seniors & Retirees", icon: Users },
  { text: "Families", icon: Heart }, 
  { text: "Business Pros", icon: Briefcase },
  { text: "Churches", icon: Star },
];

const howItWorks = [
  { step: "1", title: "Book", desc: "Pick format", icon: BookOpen, color: "from-navy-600 to-navy-500" },
  { step: "2", title: "Learn", desc: "Interactive", icon: GraduationCap, color: "from-coral-500 to-coral-400" },
  { step: "3", title: "Support", desc: "Ongoing", icon: Shield, color: "from-lavender-600 to-lavender-500" },
];

const services = [
  { icon: AlertTriangle, title: "Scam Prevention", desc: "Identify AI scams", color: "from-coral-600 to-coral-500" },
  { icon: Shield, title: "4-Step Protection", desc: "Proven method", color: "from-navy-600 to-navy-500" },
  { icon: Target, title: "Protection Levels", desc: "Choose your tier", color: "from-lavender-600 to-lavender-500" },
  { icon: Eye, title: "Threat Analysis", desc: "Real-time", color: "from-teal-600 to-teal-500" },
];


export const WorkshopsPromo = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-coral-100/20 to-background relative overflow-hidden">
      {/* Premium gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-coral-400/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-lavender-400/8 rounded-full blur-[100px]" />
      </div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--coral-400)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--coral-400)) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Image Side with Premium Cards */}
          <div className="relative space-y-5 animate-fade-in">
            {/* Decorative Quote - Glassmorphism */}
            <div className="bg-gradient-to-br from-coral-50/80 to-white/80 backdrop-blur-xl rounded-3xl p-5 border border-coral-200/40 shadow-[0_8px_40px_-12px_rgba(248,146,106,0.15)]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-coral-400 to-coral-300 flex items-center justify-center flex-shrink-0 shadow-lg shadow-coral-300/30">
                  <Quote className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-base italic text-navy-800 leading-relaxed font-medium">
                    "In the age of AI, the pause you take could be the protection you need."
                  </p>
                  <p className="text-sm text-coral-600 mt-2 font-semibold">— InVision Network Team</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_80px_-20px_rgba(24,48,90,0.2)] ring-1 ring-coral-200/30">
              <img 
                src={workshopSeniorsLearning}
                alt="Training workshop session"
                width={700}
                height={394}
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover aspect-[16/10]"
              />
              {/* Premium overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-foreground/5" />
              
              {/* Play button with glass effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-card/90 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] hover:scale-110 hover:bg-card transition-all duration-300 border border-border/30">
                  <Play className="w-7 h-7 text-primary ml-1" fill="currentColor" />
                </div>
              </div>
            </div>

            {/* Additional Photos Grid - What We Do */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={seniorLearning}
                  alt="Senior learning digital safety"
                  className="w-full h-32 object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="text-white text-xs font-semibold">One-on-One Training</span>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={trainingSession}
                  alt="Group training session"
                  className="w-full h-32 object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="text-white text-xs font-semibold">Group Workshops</span>
                </div>
              </div>
            </div>

            {/* Trust Badges - Premium glass pills */}
            <div className="flex flex-wrap gap-3 justify-center">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-full border border-navy-200/40 shadow-[0_4px_20px_-6px_rgba(24,48,90,0.1)] hover:scale-105 transition-transform">
                <Shield className="w-4 h-4 text-navy-600" />
                <span className="text-sm font-semibold">HIPAA Protected</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-coral-50 to-coral-100 backdrop-blur-md rounded-full border border-coral-300/50 shadow-[0_4px_20px_-6px_rgba(248,146,106,0.15)] hover:scale-105 transition-transform">
                <Star className="w-4 h-4 text-coral-600" />
                <span className="text-sm font-semibold">10% Veteran Discount</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-full border border-teal-300/50 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.08)] hover:scale-105 transition-transform">
                <CheckCircle className="w-4 h-4 text-teal-600" />
                <span className="text-sm font-semibold">30-Day Guarantee</span>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-5 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <div className="inline-flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-coral-100 to-blush-400 rounded-2xl border-2 border-coral-300/60 shadow-[0_4px_20px_-6px_rgba(248,146,106,0.25)]">
              <GraduationCap className="w-6 h-6 text-coral-600" />
              <span className="font-bold text-coral-700 text-lg">Learn & Train Workshops</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-navy-900 leading-[0.95]">
              Protect Your Family from{" "}
              <span className="bg-gradient-to-r from-coral-500 via-coral-400 to-lavender-500 bg-clip-text text-transparent">AI-Powered Scams</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-navy-700/80 leading-relaxed font-medium">
              With the rise of AI, scammers use deepfakes and voice cloning to trick families. Our expert-led workshops teach you to recognize and stop these sophisticated threats.
            </p>

            {/* How It Works - Premium gradient cards */}
            <div className="grid grid-cols-3 gap-3">
              {howItWorks.map((item, index) => (
                <div 
                  key={index}
                  className={`bg-gradient-to-br ${item.color} rounded-2xl p-4 text-center text-white hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg`}
                >
                  <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="text-base font-bold">{item.title}</div>
                  <div className="text-xs opacity-80">{item.desc}</div>
                </div>
              ))}
            </div>

            {/* Services Grid - Glass cards */}
            <div className="grid grid-cols-2 gap-3">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-coral-100/50 shadow-[0_8px_30px_-10px_rgba(24,48,90,0.08)] group hover:scale-[1.03] hover:-translate-y-1 hover:shadow-[0_15px_40px_-10px_rgba(248,146,106,0.15)] transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}>
                      <service.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-base font-bold text-navy-800">{service.title}</div>
                  <div className="text-sm text-navy-600/70">{service.desc}</div>
                </div>
              ))}
            </div>

            {/* Target Audiences */}
            <div className="flex flex-wrap gap-2">
              {audiences.map((audience, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1.5 bg-gradient-to-r from-navy-50 to-lavender-50 rounded-full text-sm font-medium text-navy-700 flex items-center gap-1.5 hover:scale-105 transition-transform border border-navy-100/50"
                >
                  <audience.icon className="w-3.5 h-3.5 text-coral-500" />
                  <span>{audience.text}</span>
                </span>
              ))}
            </div>

            {/* Pricing Preview - Glass cards */}
            <div className="grid grid-cols-4 gap-3">
              {formats.map((format, index) => (
                <div 
                  key={index} 
                  className="relative bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-coral-100/50 shadow-[0_8px_30px_-10px_rgba(24,48,90,0.08)] text-center cursor-pointer hover:scale-105 hover:-translate-y-2 hover:shadow-[0_15px_40px_-10px_rgba(248,146,106,0.15)] transition-all duration-300"
                >
                  {format.badge && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-gradient-to-r from-coral-500 to-coral-400 text-white text-[10px] font-bold rounded-full whitespace-nowrap shadow-lg shadow-coral-300/30">
                      {format.badge}
                    </span>
                  )}
                  <div className={`w-10 h-10 mx-auto mb-2 rounded-xl bg-gradient-to-br ${format.color} flex items-center justify-center shadow-lg`}>
                    <format.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm font-semibold text-navy-600">{format.title}</div>
                  <div className="text-lg font-black bg-gradient-to-r from-coral-600 to-coral-500 bg-clip-text text-transparent">{format.price}</div>
                </div>
              ))}
            </div>

            {/* CTAs - Premium buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg" className="h-16 px-10 text-lg font-bold rounded-2xl bg-gradient-to-r from-coral-500 to-coral-400 text-white shadow-[0_8px_40px_-8px_rgba(248,146,106,0.5)] hover:shadow-[0_12px_50px_-8px_rgba(248,146,106,0.6)] hover:-translate-y-1 transition-all duration-300 group">
                <Link to="/training">
                  <GraduationCap className="mr-2 w-6 h-6 group-hover:scale-110 transition-transform" />
                  View Workshops
                  <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-16 px-10 text-lg font-bold rounded-2xl border-2 border-navy-300 text-navy-700 hover:bg-navy-50 hover:border-navy-400 shadow-[0_4px_20px_-6px_rgba(24,48,90,0.1)] hover:shadow-[0_8px_30px_-8px_rgba(24,48,90,0.15)] hover:-translate-y-1 transition-all duration-300 group">
                <Link to="/training#pricing">
                  <Heart className="mr-2 w-6 h-6 text-rose-500" />
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