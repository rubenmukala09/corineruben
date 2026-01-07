import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Users, Ribbon, ArrowRight, Award, MapPin, GraduationCap } from "lucide-react";
import ohioNatureImpact from "@/assets/ohio-nature-impact.jpg";
import veteranSupport from "@/assets/veteran-support.jpg";
import communityGiving from "@/assets/community-giving.jpg";
import communityTraining from "@/assets/community-training.jpg";

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
    description: "Free workshops at libraries, churches, and community centers across Ohio to spread digital safety awareness.",
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
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
        </motion.div>

        {/* Main Image with overlay */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden mb-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]"
        >
          <img
            src={ohioNatureImpact}
            alt="Ohio community and nature"
            width={1310}
            height={320}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            loading="lazy"
            decoding="async"
            className="w-full h-[320px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-2">Proudly Serving Ohio Communities</h3>
            <p className="text-white/80 max-w-2xl mx-auto">
              From Dayton to Columbus to Cincinnati—protecting families across the Buckeye State
            </p>
          </div>
        </motion.div>

        {/* What We Do Photo Grid */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-lg group"
          >
            <img
              src={veteranSupport}
              alt="Supporting veterans"
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex items-center gap-2 text-white">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-bold">Veteran Support</span>
              </div>
              <p className="text-white/80 text-xs mt-1">17% discount for those who served</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative rounded-2xl overflow-hidden shadow-lg group"
          >
            <img
              src={communityGiving}
              alt="Community giving back"
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex items-center gap-2 text-white">
                <Heart className="w-4 h-4" />
                <span className="text-sm font-bold">Giving Back</span>
              </div>
              <p className="text-white/80 text-xs mt-1">Donations to families in need</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden shadow-lg group"
          >
            <img
              src={communityTraining}
              alt="Community training workshops"
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex items-center gap-2 text-white">
                <Users className="w-4 h-4" />
                <span className="text-sm font-bold">Free Workshops</span>
              </div>
              <p className="text-white/80 text-xs mt-1">At libraries and community centers</p>
            </div>
          </motion.div>
        </div>

        {/* Impact Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {impacts.map((impact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-5 border border-border/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${impact.color} flex items-center justify-center mb-4 shadow-md`}>
                <impact.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">{impact.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{impact.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
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
        </motion.div>
      </div>
    </section>
  );
};
