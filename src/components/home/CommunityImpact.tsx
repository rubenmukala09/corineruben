import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Users, Ribbon, ArrowRight, Award, MapPin, GraduationCap } from "lucide-react";
import ohioNatureImpact from "@/assets/ohio-nature-impact.jpg";

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
    <section className="py-24 bg-background relative overflow-hidden">
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
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-500/10 rounded-2xl border border-rose-500/20 mb-6">
            <Heart className="w-5 h-5 text-rose-500" />
            <span className="font-bold text-rose-600">Giving Back</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            More Than a Business—{" "}
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">A Mission</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We believe in building a safer community for everyone. Here's how we're making a difference in Ohio and beyond.
          </p>
          
          {/* Quick stats badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {quickStats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-full border border-border/50 shadow-sm">
                <stat.icon className="w-4 h-4 text-primary" />
                <span className="font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Image with overlay */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden mb-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]"
        >
          <img
            src={ohioNatureImpact}
            alt="Ohio community and nature"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-10 text-center text-white">
            <h3 className="text-3xl font-bold mb-3">Proudly Serving Ohio Communities</h3>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              From Dayton to Columbus to Cincinnati—protecting families across the Buckeye State
            </p>
          </div>
        </motion.div>

        {/* Impact Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {impacts.map((impact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-7 border border-border/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${impact.color} flex items-center justify-center mb-5 shadow-lg`}>
                <impact.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl text-foreground mb-3">{impact.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{impact.description}</p>
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
