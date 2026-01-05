import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot, Zap, Clock, Phone, Globe, ArrowRight, TrendingUp, Sparkles, CheckCircle, Mail, Shield, Users } from "lucide-react";
import businessTeamOffice from "@/assets/business-team-office.jpg";

const services = [
  { icon: Phone, title: "AI Receptionist", desc: "Answer calls 24/7, route to right person, book appointments, answer FAQs", highlight: "Save $37K+/year", price: "$9,500" },
  { icon: Clock, title: "Smart Scheduling", desc: "Automated booking with calendar sync, reminders & smart intake forms", highlight: "Zero no-shows", price: "Custom" },
  { icon: Globe, title: "Professional Websites", desc: "Custom SEO-optimized websites with lead generation & e-commerce", highlight: "Lead generation", price: "From $2,500" },
  { icon: Mail, title: "AI Follow-Up", desc: "Automated email sequences, SMS reminders & re-engagement campaigns", highlight: "35% higher close rates", price: "$12,500" },
];

const highlights = [
  { icon: Users, text: "Ohio-based support team" },
  { icon: Shield, text: "Veteran-supporting business" },
  { icon: CheckCircle, text: "60-day money-back guarantee" },
];

export const AIBusinessPromo = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[700px] h-[700px] bg-primary/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8 text-white"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
              <Zap className="w-5 h-5 text-amber-400" />
              <span className="font-bold text-white">AI for Business</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Automate Your Business with{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Intelligent AI</span>
            </h2>
            
            <p className="text-xl text-white/70 leading-relaxed">
              Stop losing customers to missed calls and slow responses. Our AI solutions handle customer interactions 24/7, 
              so you can focus on growing your business.
            </p>

            {/* Quick highlights */}
            <div className="flex flex-wrap gap-3">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                  <item.icon className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-white/80">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Services Grid - Enhanced */}
            <div className="grid grid-cols-2 gap-5 pt-4">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 group hover:-translate-y-2"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-white text-lg mb-1">{service.title}</h3>
                  <p className="text-white/60 text-xs mb-2 line-clamp-2">{service.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400">
                      <Sparkles className="w-3 h-3" />
                      {service.highlight}
                    </span>
                    <span className="text-xs text-white/50">{service.price}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 pt-6">
              <Button asChild size="xl" className="rounded-2xl px-10 bg-white text-slate-900 hover:bg-white/90 shadow-lg">
                <Link to="/business">
                  Explore AI Solutions
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="rounded-2xl border-white/30 text-white hover:bg-white/10">
                <Link to="/business/ai-receptionist">See Demo</Link>
              </Button>
            </div>
          </motion.div>

          {/* Image Side - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 group">
              <img
                src={businessTeamOffice}
                alt="Professional business team collaborating on AI solutions"
                className="w-full h-[550px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
              
              {/* Stats overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm text-white/70">Efficiency Boost</span>
                    </div>
                    <p className="text-3xl font-bold text-white">+300%</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-amber-400" />
                      <span className="text-sm text-white/70">Response Time</span>
                    </div>
                    <p className="text-3xl font-bold text-white">&lt; 1sec</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
