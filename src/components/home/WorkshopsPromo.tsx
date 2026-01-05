import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, Calendar, CheckCircle, ArrowRight, Star, Play, Award } from "lucide-react";
import workshopInstructor from "@/assets/workshop-instructor.jpg";

const benefits = [
  "Hands-on scam detection training",
  "Family-friendly group sessions",
  "Expert instructors with real experience",
  "Take-home materials & resources",
];

const formats = [
  { icon: Users, title: "In-Person", desc: "Community workshops" },
  { icon: Calendar, title: "Zoom Classes", desc: "Learn from home" },
  { icon: GraduationCap, title: "Private Sessions", desc: "Personalized training" },
];

export const WorkshopsPromo = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] opacity-60" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[80px] opacity-50" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
        backgroundSize: '48px 48px'
      }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side - Enhanced with overlays */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative">
              {/* Main image container - Physical Photo Effect */}
              <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-white/80 group">
                <img
                  src={workshopInstructor}
                  alt="Professional workshop instructor teaching scam prevention"
                  className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Top badge */}
                <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2.5 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-foreground">Top-Rated Training</span>
                </div>
                
                {/* Play button overlay */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl cursor-pointer">
                    <Play className="w-8 h-8 text-primary fill-primary ml-1" />
                  </div>
                </motion.div>
              </div>
              
              {/* Floating stats card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-8 -right-8 bg-white rounded-3xl p-6 shadow-[0_15px_50px_-12px_rgba(0,0,0,0.15)] border border-border/30 hidden md:block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl text-foreground">200+</p>
                    <p className="text-muted-foreground">Families Trained</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 rounded-2xl border border-primary/20">
              <GraduationCap className="w-5 h-5 text-primary" />
              <span className="font-bold text-primary">Learn & Train Workshops</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Learn to Protect Your Family from{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">AI Scams</span>
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Our expert-led workshops teach seniors, families, and community groups how to identify and avoid sophisticated AI-powered scams. 
              <span className="font-semibold text-foreground"> No technical experience needed</span>—just bring your curiosity!
            </p>

            {/* Benefits with enhanced styling */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg text-foreground font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* Format options - Enhanced cards */}
            <div className="flex flex-wrap gap-4 pt-4">
              {formats.map((format, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl border border-border/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <format.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{format.title}</p>
                    <p className="text-sm text-muted-foreground">{format.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-6">
              <Button asChild size="xl" className="rounded-2xl px-10 shadow-lg shadow-primary/25">
                <Link to="/training">
                  Explore Workshops
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="rounded-2xl">
                <Link to="/training#pricing">View Pricing</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
