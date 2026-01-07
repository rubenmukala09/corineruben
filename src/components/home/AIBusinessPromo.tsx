import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, Bot, Globe, ArrowRight, Sparkles, Shield, Clock, TrendingUp, Star, Zap, Users, Award, CheckCircle, Palette, Headphones, Lock, Lightbulb, Rocket, DollarSign, Target, BarChart3 } from "lucide-react";
import businessTechBg from "@/assets/business-tech-bg.jpg";
import businessProfessionalsOffice from "@/assets/business-professionals-office.jpg";
import aiReceptionistTech from "@/assets/ai-receptionist-tech.jpg";
import aiAutomationTech from "@/assets/ai-automation-tech.jpg";
import { TestimonialBubble } from "./TestimonialBubble";

const services = [
  {
    icon: Phone,
    title: "AI Receptionist",
    description: "24/7 calls, booking, FAQs",
    price: "$9,500",
    highlight: "Never miss a lead",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Auto-book & reminders",
    price: "Custom",
    highlight: "Zero back-and-forth",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Bot,
    title: "AI Automation",
    description: "Custom agents & bots",
    price: "$25K+",
    highlight: "Full customization",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: Globe,
    title: "Website Design",
    description: "Landing to e-commerce",
    price: "$1,500+",
    highlight: "Pro websites",
    color: "from-orange-500 to-amber-500",
  },
];

const premiumAddons = [
  { icon: Palette, name: "Custom Integrations" },
  { icon: Shield, name: "Website Insurance" },
  { icon: Headphones, name: "Expert Consulting" },
];

const roiFacts = [
  { stat: "62%", desc: "calls missed", icon: Phone, color: "text-rose-500" },
  { stat: "$500", desc: "lost/missed call", icon: DollarSign, color: "text-amber-500" },
  { stat: "80%", desc: "fewer no-shows", icon: CheckCircle, color: "text-emerald-500" },
];


export const AIBusinessPromo = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-muted/30 via-background to-muted/20 relative overflow-hidden">
      {/* Background Image with blur overlay */}
      <div className="absolute inset-0">
        <img 
          src={businessTechBg} 
          alt="" 
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-40 left-20 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-40 right-20 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl border-2 border-primary/30"
            >
              <Bot className="w-5 h-5 text-primary" />
              <span className="font-bold text-primary text-lg">AI & Business Solutions</span>
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Stop Missing Calls.{" "}
              <span className="text-foreground/80">Let AI Run Your Front Desk.</span>
            </h2>
            
            <p className="text-base text-muted-foreground leading-relaxed">
              Transform your business with AI-powered automation. We build solutions that work 24/7 so you never miss an opportunity.
            </p>

            {/* Combined ROI + Premium Section - Side by Side */}
            <div className="grid grid-cols-2 gap-3">
              {/* ROI Card with Animation */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-4 text-white relative overflow-hidden"
              >
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -right-4 w-20 h-20 border-2 border-white/10 rounded-full"
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-sm font-medium opacity-90">Average ROI</span>
                  </div>
                  <div className="text-4xl font-black mb-1">340%</div>
                  <div className="flex items-center gap-1 text-xs opacity-80">
                    <Rocket className="w-3 h-3" />
                    <span>Within 6 months</span>
                  </div>
                </div>
              </motion.div>

              {/* Premium Services Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-4 text-white"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5" />
                  <span className="text-sm font-bold">Premium</span>
                </div>
                <div className="space-y-1.5">
                  {premiumAddons.map((addon, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-center gap-2 text-xs bg-white/10 rounded-lg px-2 py-1"
                    >
                      <addon.icon className="w-3 h-3" />
                      <span>{addon.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* AI Service Insurance */}
            <motion.div 
              className="bg-gradient-to-r from-amber-500/15 via-amber-400/15 to-yellow-500/15 border-2 border-amber-500/40 rounded-2xl p-4 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.01 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-2 right-2">
                <Star className="w-5 h-5 text-amber-500" />
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/30">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-bold text-foreground">AI Service Insurance</h3>
                    <span className="px-2 py-0.5 bg-amber-500 text-amber-950 text-[10px] font-bold rounded-full">INDUSTRY FIRST</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    First-ever AI insurance—protecting your investment with ongoing support & updates.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ROI Facts - Compact Animated */}
            <div className="flex gap-2">
              {roiFacts.map((fact, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -3 }}
                  className="flex-1 bg-white rounded-xl p-3 border border-border/50 shadow-sm text-center"
                >
                  <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-muted flex items-center justify-center">
                    <fact.icon className={`w-4 h-4 ${fact.color}`} />
                  </div>
                  <div className={`text-lg font-black ${fact.color}`}>{fact.stat}</div>
                  <div className="text-[10px] text-muted-foreground">{fact.desc}</div>
                </motion.div>
              ))}
            </div>

            {/* Services Grid - Colorful */}
            <div className="grid grid-cols-2 gap-2">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="bg-white rounded-xl p-3 border border-border/50 shadow-sm group cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <service.icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-foreground text-sm">{service.title}</h3>
                  <p className="text-[10px] text-muted-foreground mb-1">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{service.price}</span>
                    <span className="text-[8px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">{service.highlight}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-xl shadow-lg shadow-primary/25 group">
                <Link to="/business">
                  <Rocket className="mr-2 w-4 h-4 group-hover:animate-bounce" />
                  Explore Solutions
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl group">
                <Link to="/contact?service=ai-automation">
                  <DollarSign className="mr-1 w-4 h-4" />
                  Get Quote
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Image Side with Decorative Elements */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative space-y-4"
          >
            {/* Inspirational Quote */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-4 border border-accent/20"
            >
              <div className="flex items-start gap-3">
                <Lightbulb className="w-8 h-8 text-accent/60 flex-shrink-0" />
                <div>
                  <p className="text-sm italic text-foreground leading-relaxed">
                    "Every missed call is a missed opportunity. Let AI handle the front desk while you focus on growth."
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">— Business Automation Insight</p>
                </div>
              </div>
            </motion.div>

            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]">
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
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Floating stats */}
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-bold text-foreground">AI Active 24/7</span>
                </div>
              </div>

            </div>

            {/* Feature Highlights Bar */}
            <div className="grid grid-cols-3 gap-2">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-3 text-white text-center"
              >
                <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-white/20 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold">24/7</div>
                <div className="text-[9px] opacity-80">Always On</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-3 text-white text-center"
              >
                <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-white/20 flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold">HIPAA</div>
                <div className="text-[9px] opacity-80">Compliant</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-3 text-white text-center"
              >
                <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-white/20 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold">Veteran</div>
                <div className="text-[9px] opacity-80">10% Off</div>
              </motion.div>
            </div>

            {/* Additional Service Photos - Tech-focused, no people */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="relative rounded-2xl overflow-hidden shadow-lg group"
              >
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
                <motion.div 
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative rounded-2xl overflow-hidden shadow-lg group"
              >
                <img 
                  src={aiAutomationTech}
                  alt="AI automation technology concept"
                  className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="text-white text-sm font-bold">Custom Automation</span>
                  <p className="text-white/70 text-xs">Intelligent Workflows</p>
                </div>
                {/* Animated glow */}
                <motion.div 
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="absolute top-2 right-2 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"
                />
              </motion.div>
            </div>

            {/* Ohio Pride Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-3 border border-border/50 shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">📍</span>
                <div>
                  <div className="text-xs text-muted-foreground">Proudly Based In</div>
                  <div className="font-bold text-foreground">Dayton, Ohio</div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                <CheckCircle className="w-3 h-3" />
                Veteran-Owned
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};