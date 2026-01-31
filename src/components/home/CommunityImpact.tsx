import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Users, Ribbon, ArrowRight, Award, MapPin, GraduationCap, DollarSign } from "lucide-react";
import ohioNatureImpact from "@/assets/ohio-nature-impact.jpg";
import veteranSupport from "@/assets/veteran-support.jpg";
import communityGivingAbstract from "@/assets/community-giving-abstract.jpg";
import paidWorkshopTraining from "@/assets/paid-workshop-training.jpg";

const impacts = [
  {
    icon: Shield,
    title: "Veteran Support",
    description: "We honor those who served with exclusive 17% discounts and priority support for veterans and first responders.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Ribbon,
    title: "Children with Cancer",
    description: "A portion of every purchase supports families with children battling cancer through our partner organizations.",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Senior Protection",
    description: "Free educational resources and discounted services for seniors on fixed incomes to stay safe online.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Heart,
    title: "Community Education",
    description: "Affordable workshops at libraries, churches, and community centers across Ohio to spread digital safety awareness.",
    color: "from-emerald-500 to-teal-500",
  },
];

const quickStats = [
  { label: "Ohio-Based", icon: MapPin },
  { label: "Veteran-Supporting", icon: Shield },
  { label: "Mission-Driven", icon: Heart },
];

export const CommunityImpact = () => {
  return (
    <section className="py-16 bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-500/10 rounded-2xl border border-rose-500/20 mb-5">
            <Heart className="w-5 h-5 text-rose-500" />
            <span className="font-bold text-rose-600">Giving Back</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            More Than a Business—{" "}
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">A Mission</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We believe in building a safer community for everyone. Here's how we're making a difference.
          </p>
          
          {/* Quick stats badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {quickStats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-border/50 shadow-sm">
                <stat.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Image with overlay */}
        <div className="relative rounded-3xl overflow-hidden mb-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] animate-fade-in">
          <img
            src={ohioNatureImpact}
            alt="InVision Network proudly serving Ohio communities"
            width={1310}
            height={320}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            loading="lazy"
            decoding="async"
            className="w-full h-[320px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
            <h3 className="text-2xl font-bold mb-2 text-white drop-shadow-lg">Proudly Serving Ohio Communities</h3>
            <p className="text-white/90 max-w-2xl mx-auto drop-shadow-md">
              From Dayton to Columbus to Cincinnati—protecting families across the Buckeye State
            </p>
          </div>
        </div>

        {/* What We Do Photo Grid */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="relative rounded-2xl overflow-hidden shadow-lg group animate-fade-in">
            <img
              src={veteranSupport}
              alt="InVision Network supporting veterans"
              width={400}
              height={192}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/40 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white drop-shadow-md">Veteran Support</span>
              </div>
              <p className="text-white/90 text-xs mt-1 drop-shadow-sm">17% discount for those who served</p>
            </div>
          </div>
          
          <div
            className="relative rounded-2xl overflow-hidden shadow-lg group animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <img
              src={communityGivingAbstract}
              alt="InVision Network community giving and support"
              width={400}
              height={192}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/40 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white drop-shadow-md">Giving Back</span>
              </div>
              <p className="text-white/90 text-xs mt-1 drop-shadow-sm">Supporting families in need</p>
            </div>
          </div>
          
          <div
            className="relative rounded-2xl overflow-hidden shadow-lg group animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            <img
              src={paidWorkshopTraining}
              alt="InVision Network professional training workshops"
              width={400}
              height={192}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/40 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white drop-shadow-md">Professional Workshops</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <DollarSign className="w-3 h-3 text-emerald-400" />
                <p className="text-white/90 text-xs drop-shadow-sm">Affordable expert-led training</p>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {impacts.map((impact, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 border border-border/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${impact.color} flex items-center justify-center mb-4 shadow-md`}>
                <impact.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">{impact.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{impact.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-in">
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Want to support our mission? Every purchase helps us protect more families and give back to those in need.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="xl" className="rounded-2xl px-10 shadow-lg shadow-primary/25">
              <Link to="/resources">
                Explore Resources
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="rounded-2xl">
              <Link to="/about">Learn Our Story</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};