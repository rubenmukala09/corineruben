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
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Star,
    title: "Family",
    price: "$199",
    badge: "Best",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Award,
    title: "Private",
    price: "$299",
    badge: "VIP",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: DollarSign,
    title: "Orgs",
    price: "$510+",
    badge: null,
    color: "from-emerald-500 to-teal-500",
  },
];

const audiences = [
  { text: "Seniors & Retirees", icon: Users },
  { text: "Families", icon: Heart }, 
  { text: "Business Pros", icon: Briefcase },
  { text: "Churches", icon: Star },
];

const howItWorks = [
  { step: "1", title: "Book", desc: "Pick format", icon: BookOpen, color: "from-blue-500 to-indigo-500" },
  { step: "2", title: "Learn", desc: "Interactive", icon: GraduationCap, color: "from-emerald-500 to-teal-500" },
  { step: "3", title: "Support", desc: "Ongoing", icon: Shield, color: "from-violet-500 to-purple-500" },
];

const services = [
  { icon: AlertTriangle, title: "Scam Prevention", desc: "Identify AI scams", color: "from-rose-500 to-pink-500" },
  { icon: Shield, title: "4-Step Protection", desc: "Proven method", color: "from-blue-500 to-indigo-500" },
  { icon: Target, title: "Protection Levels", desc: "Choose your tier", color: "from-amber-500 to-orange-500" },
  { icon: Eye, title: "Threat Analysis", desc: "Real-time", color: "from-violet-500 to-purple-500" },
];


export const WorkshopsPromo = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background Image with blur overlay */}
      <div className="absolute inset-0">
        <img 
          src={learningBg} 
          alt="" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Image Side with Decorative Elements */}
          <div className="relative space-y-4 animate-fade-in">
            {/* Decorative Quote */}
            <div className="bg-muted/50 rounded-2xl p-4 border border-border">
              <div className="flex items-start gap-3">
                <Quote className="w-8 h-8 text-muted-foreground/40 flex-shrink-0" />
                <div>
                  <p className="text-sm italic text-foreground leading-relaxed">
                    "In the age of AI, the pause you take could be the protection you need."
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">— InVision Network Team</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]">
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
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center cursor-pointer shadow-xl hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-primary ml-1" fill="currentColor" />
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

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 justify-center">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-border/50 shadow-sm">
                <Shield className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium">HIPAA Protected</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-border/50 shadow-sm">
                <Star className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-xs font-medium">10% Veteran Discount</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-border/50 shadow-sm">
                <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                <span className="text-xs font-medium">30-Day Guarantee</span>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl border-2 border-emerald-500/30">
              <GraduationCap className="w-5 h-5 text-emerald-600" />
              <span className="font-bold text-emerald-700 text-lg">Learn & Train Workshops</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Protect Your Family from{" "}
              <span className="text-primary">AI-Powered Scams</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-medium">
              With the rise of AI, scammers use deepfakes and voice cloning to trick families. Our expert-led workshops teach you to recognize and stop these sophisticated threats.
            </p>

            {/* How It Works */}
            <div className="grid grid-cols-3 gap-2">
              {howItWorks.map((item, index) => (
                <div 
                  key={index}
                  className={`bg-gradient-to-br ${item.color} rounded-xl p-3 text-center text-white hover:scale-105 hover:-translate-y-1 transition-transform`}
                >
                  <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-white/20 flex items-center justify-center">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div className="text-sm font-bold">{item.title}</div>
                  <div className="text-[10px] opacity-80">{item.desc}</div>
                </div>
              ))}
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-2 gap-2">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-3 border border-border/50 shadow-sm group hover:scale-[1.03] transition-transform"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <service.icon className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                  <div className="text-sm font-bold text-foreground">{service.title}</div>
                  <div className="text-[10px] text-muted-foreground">{service.desc}</div>
                </div>
              ))}
            </div>

            {/* Target Audiences */}
            <div className="flex flex-wrap gap-2">
              {audiences.map((audience, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1.5 bg-gradient-to-r from-muted to-muted/50 rounded-full text-sm font-medium text-foreground flex items-center gap-1.5 hover:scale-105 transition-transform"
                >
                  <audience.icon className="w-3.5 h-3.5 text-primary" />
                  <span>{audience.text}</span>
                </span>
              ))}
            </div>

            {/* Pricing Preview */}
            <div className="grid grid-cols-4 gap-2">
              {formats.map((format, index) => (
                <div 
                  key={index} 
                  className="relative bg-white rounded-xl p-3 border border-border/50 shadow-sm text-center cursor-pointer hover:scale-105 hover:-translate-y-1 transition-transform"
                >
                  {format.badge && (
                    <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-gradient-to-r from-primary to-accent text-white text-[8px] font-bold rounded-full whitespace-nowrap">
                      {format.badge}
                    </span>
                  )}
                  <div className={`w-8 h-8 mx-auto mb-1 rounded-full bg-gradient-to-br ${format.color} flex items-center justify-center`}>
                    <format.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-[10px] font-medium text-muted-foreground">{format.title}</div>
                  <div className="text-base font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{format.price}</div>
                </div>
              ))}
            </div>

            {/* CTAs - Larger buttons */}
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="h-14 px-8 text-lg font-bold rounded-2xl shadow-xl shadow-primary/30 group">
                <Link to="/training">
                  <GraduationCap className="mr-2 w-5 h-5 group-hover:animate-bounce" />
                  View Workshops
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg font-bold rounded-2xl border-2 group">
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