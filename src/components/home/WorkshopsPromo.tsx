import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Clock, Award, Shield, CheckCircle, ArrowRight, Sparkles, Play, BookOpen, Star, DollarSign, Brain, Eye, AlertTriangle, Target, Briefcase, Quote, GraduationCap, Heart } from "lucide-react";
import workshopSeniorsLearning from "@/assets/workshop-seniors-learning.jpg";
import learningBg from "@/assets/learning-bg.jpg";
import { TestimonialBubble } from "./TestimonialBubble";

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

const testimonials = [
  { quote: "The 60-Second Protocol saved me from a $5,000 scam!", author: "Margaret T.", location: "Columbus, OH" },
  { quote: "Finally, training my parents understood and enjoyed.", author: "David R.", location: "Dayton, OH" },
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
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative space-y-4"
          >
            {/* Decorative Quote */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-muted/50 rounded-2xl p-4 border border-border"
            >
              <div className="flex items-start gap-3">
                <Quote className="w-8 h-8 text-muted-foreground/40 flex-shrink-0" />
                <div>
                  <p className="text-sm italic text-foreground leading-relaxed">
                    "In the age of AI, the pause you take could be the protection you need."
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">— InVision Network Team</p>
                </div>
              </div>
            </motion.div>

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
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center cursor-pointer shadow-xl"
                >
                  <Play className="w-6 h-6 text-primary ml-1" fill="currentColor" />
                </motion.div>
              </div>

              {/* Stats overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 flex-1">
                  <div className="text-xl font-bold text-primary">500+</div>
                  <div className="text-[10px] text-muted-foreground">Families Trained</div>
                </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 flex-1">
                  <div className="text-xl font-bold text-primary">98%</div>
                  <div className="text-[10px] text-muted-foreground">Satisfaction Rate</div>
                </div>
              </div>
            </div>

            {/* Testimonial Bubbles */}
            <div className="grid grid-cols-2 gap-3">
              {testimonials.map((t, i) => (
                <TestimonialBubble key={i} {...t} />
              ))}
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
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-muted rounded-2xl border border-border"
            >
              <GraduationCap className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium text-muted-foreground">Learn & Train Workshops</span>
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Protect Your Family from{" "}
              <span className="text-foreground/80">AI Scams</span>
            </h2>
            
            <p className="text-base text-muted-foreground leading-relaxed">
              Expert-led workshops teaching the 60-Second Pause Protocol and real-world scam recognition.
            </p>

            {/* How It Works - Animated */}
            <div className="grid grid-cols-3 gap-2">
              {howItWorks.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className={`bg-gradient-to-br ${item.color} rounded-xl p-3 text-center text-white`}
                >
                  <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-white/20 flex items-center justify-center">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div className="text-sm font-bold">{item.title}</div>
                  <div className="text-[10px] opacity-80">{item.desc}</div>
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
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl p-3 border border-border/50 shadow-sm group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <service.icon className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                  <div className="text-sm font-bold text-foreground">{service.title}</div>
                  <div className="text-[10px] text-muted-foreground">{service.desc}</div>
                </motion.div>
              ))}
            </div>

            {/* Target Audiences - Icon Pills */}
            <div className="flex flex-wrap gap-2">
              {audiences.map((audience, index) => (
                <motion.span 
                  key={index} 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1.5 bg-gradient-to-r from-muted to-muted/50 rounded-full text-sm font-medium text-foreground flex items-center gap-1.5"
                >
                  <audience.icon className="w-3.5 h-3.5 text-primary" />
                  <span>{audience.text}</span>
                </motion.span>
              ))}
            </div>

            {/* Pricing Preview - Colorful */}
            <div className="grid grid-cols-4 gap-2">
              {formats.map((format, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="relative bg-white rounded-xl p-3 border border-border/50 shadow-sm text-center cursor-pointer"
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
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-xl shadow-lg shadow-primary/25 group">
                <Link to="/training">
                  <GraduationCap className="mr-2 w-4 h-4 group-hover:animate-bounce" />
                  View Workshops
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl group">
                <Link to="/training#pricing">
                  <Heart className="mr-1 w-4 h-4 text-rose-500" />
                  See Pricing
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
