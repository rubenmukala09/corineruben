import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Shield, 
  Users, 
  GraduationCap, 
  Building2, 
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const HomeIntroSection = () => {
  const services = [
    {
      id: "protection",
      icon: Shield,
      title: "ScamShield Protection",
      tagline: "24/7 AI Monitoring",
      description: "Real-time threat detection and analysis of suspicious communications before they reach your family.",
      href: "/training#pricing",
      stat: "500+",
      statLabel: "Families Protected"
    },
    {
      id: "training",
      icon: GraduationCap,
      title: "Prevention Training",
      tagline: "Expert-Led Programs",
      description: "Comprehensive courses designed to help you identify and avoid AI-powered scams and digital threats.",
      href: "/training#training",
      stat: "10%",
      statLabel: "Veteran Discount"
    },
    {
      id: "business",
      icon: Building2,
      title: "Business Solutions",
      tagline: "Enterprise Security",
      description: "Custom AI automation, security audits, and professional services to protect your organization.",
      href: "/business",
      stat: "$25K+",
      statLabel: "Value Delivered"
    }
  ];

  const contactInfo = [
    { icon: Phone, label: "937-555-SAFE", href: "tel:937-555-7233" },
    { icon: Mail, label: "hello@invisionnetwork.org", href: "mailto:hello@invisionnetwork.org" },
    { icon: MapPin, label: "Kettering, Ohio", href: "/contact" },
    { icon: Clock, label: "24hr Response", href: "/contact" }
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Elegant gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-background to-muted/20" />
      
      {/* Subtle geometric patterns */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary tracking-wide uppercase">
              Ohio's Premier Cybersecurity Partner
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Protecting What
            <span className="block text-primary">Matters Most</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Veteran-owned and Ohio-based, we combine advanced AI technology with 
            human expertise to shield families and businesses from digital threats.
          </p>
        </motion.div>

        {/* Services Grid - Elegant Cards */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                to={service.href}
                className="group block h-full"
              >
                <div className="relative h-full bg-card border border-border/50 rounded-2xl p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                  {/* Service Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="text-right">
                      <span className="block text-2xl font-bold text-primary">{service.stat}</span>
                      <span className="text-xs text-muted-foreground">{service.statLabel}</span>
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs font-medium text-accent uppercase tracking-wider">
                        {service.tagline}
                      </span>
                      <h3 className="text-xl font-bold mt-1 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                    </div>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 pt-6 border-t border-border/50">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Trust & Contact Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="bg-gradient-to-r from-primary/5 via-card to-accent/5 border border-border/50 rounded-2xl p-8 lg:p-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left - Trust Statement */}
              <div>
                <h3 className="text-2xl font-bold mb-4">Ready to Get Protected?</h3>
                <p className="text-muted-foreground mb-6">
                  Join over 500 Ohio families who trust InVision Network to keep them safe 
                  from AI-powered scams and digital threats.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="gap-2">
                    <Link to="/training#pricing">
                      Start Protection
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="gap-2">
                    <Link to="/contact">
                      <Phone className="w-4 h-4" />
                      Schedule Call
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right - Contact Info */}
              <div className="grid grid-cols-2 gap-4">
                {contactInfo.map((item, index) => (
                  <Link
                    key={index}
                    to={item.href}
                    className="flex items-center gap-3 p-4 rounded-xl bg-background/60 border border-border/30 hover:border-primary/30 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
