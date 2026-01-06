import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Clock, Award, Shield, CheckCircle, ArrowRight, Sparkles, Play, BookOpen, Star, DollarSign, Brain, Eye, AlertTriangle, Lock, Target, Briefcase, Quote } from "lucide-react";
import workshopSeniorsLearning from "@/assets/workshop-seniors-learning.jpg";
import learningBg from "@/assets/learning-bg.jpg";
import { TestimonialBubble } from "./TestimonialBubble";

const benefits = [
  { icon: Shield, text: "60-Second Pause Protocol" },
  { icon: BookOpen, text: "Identity Verification Scripts" },
  { icon: Award, text: "Certificate of Completion" },
  { icon: Clock, text: "Lifetime Access" },
];

const formats = [
  {
    icon: Users,
    title: "Couples & Groups",
    price: "$79",
    badge: null,
  },
  {
    icon: Star,
    title: "Family Plan",
    price: "$199",
    badge: "Best Value",
  },
  {
    icon: Award,
    title: "Private Sessions",
    price: "$299",
    badge: "Premium",
  },
  {
    icon: DollarSign,
    title: "Organizations",
    price: "$510+",
    badge: "Custom",
  },
];

const audiences = [
  "Seniors & Retirees",
  "Families & Caregivers", 
  "Business Professionals",
  "Organizations & Churches",
];

const howItWorks = [
  { step: "1", title: "Book", desc: "Choose your format" },
  { step: "2", title: "Learn", desc: "Interactive training" },
  { step: "3", title: "Support", desc: "Ongoing access" },
];

const services = [
  { icon: AlertTriangle, title: "Scam Prevention Workshop", desc: "Learn to identify and avoid AI-powered scams" },
  { icon: Shield, title: "Simple Protection in 4 Steps", desc: "Our proven methodology for staying safe" },
  { icon: Target, title: "Choose Your Protection Level", desc: "Subscription tiers for ongoing protection" },
  { icon: Eye, title: "Threat Analysis Training", desc: "We analyze all types of threats in real-time" },
  { icon: Brain, title: "AI Professional Development", desc: "Advanced training for tech-savvy professionals" },
  { icon: Briefcase, title: "Corporate Training Programs", desc: "Customized workshops for your organization" },
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
              className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 border border-primary/20"
            >
              <div className="flex items-start gap-3">
                <Quote className="w-8 h-8 text-primary/40 flex-shrink-0" />
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
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 rounded-2xl border border-primary/20">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-bold text-primary">Learn & Train Workshops</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Learn to Protect Your Family from{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">AI Scams</span>
            </h2>
            
            <p className="text-xl text-muted-foreground font-medium">
              Know the threats. Stay ahead.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Expert-led workshops teaching the 60-Second Pause Protocol, identity verification scripts, and real-world scam recognition. 
              We train seniors, families, and business professionals to spot AI-powered threats. Subscribe to our protection plans for ongoing security.
            </p>

            {/* Services Grid */}
            <div className="grid grid-cols-2 gap-3">
              {services.slice(0, 4).map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-2 p-3 bg-white rounded-xl border border-border/50 shadow-sm"
                >
                  <service.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-foreground">{service.title}</div>
                    <div className="text-xs text-muted-foreground">{service.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Target Audiences */}
            <div className="flex flex-wrap gap-2">
              {audiences.map((audience, index) => (
                <span key={index} className="px-3 py-1.5 bg-muted rounded-full text-sm font-medium text-foreground">
                  {audience}
                </span>
              ))}
            </div>

            {/* How It Works */}
            <div className="bg-white rounded-3xl p-5 border border-border/50 shadow-sm">
              <h3 className="font-bold text-foreground mb-4 text-base">How It Works</h3>
              <div className="flex gap-4">
                {howItWorks.map((item, index) => (
                  <div key={index} className="flex-1 text-center">
                    <div className="w-10 h-10 mx-auto bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mb-2">
                      {item.step}
                    </div>
                    <div className="text-sm font-bold text-foreground">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Preview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {formats.map((format, index) => (
                <div key={index} className="relative bg-white rounded-2xl p-4 border border-border/50 shadow-sm text-center hover:-translate-y-1 transition-transform">
                  {format.badge && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-primary text-white text-[10px] font-bold rounded-full whitespace-nowrap">
                      {format.badge}
                    </span>
                  )}
                  <format.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-xs font-medium text-muted-foreground mb-1">{format.title}</div>
                  <div className="text-xl font-bold text-foreground">{format.price}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="xl" className="rounded-2xl px-10 shadow-lg shadow-primary/25">
                <Link to="/training">
                  View All Workshops
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="rounded-2xl px-8">
                <Link to="/training#pricing">
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
