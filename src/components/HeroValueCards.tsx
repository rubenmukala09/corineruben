import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, GraduationCap, Building2, ArrowRight, Star, Users, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HeroValueCards = () => {
  const paths = [
    {
      icon: Shield,
      title: "ScamShield Protection",
      description: "24/7 AI-powered monitoring to detect and block scams before they reach you",
      priceRange: "From $39/mo",
      href: "/training#pricing",
      color: "from-primary to-primary/70",
      badge: "POPULAR",
      features: ["Real-time alerts", "Family coverage", "Monthly reports"]
    },
    {
      icon: GraduationCap,
      title: "Learn & Train",
      description: "Expert-led workshops to recognize and prevent all types of scams",
      priceRange: "From $79",
      href: "/training#training",
      color: "from-accent to-accent/70",
      badge: "10% VETERAN DISCOUNT",
      features: ["Certified trainers", "Hands-on practice", "Certificate included"]
    },
    {
      icon: Building2,
      title: "AI for Business",
      description: "Custom AI solutions, automation, and security audits for your business",
      priceRange: "From $1,500",
      href: "/business",
      color: "from-primary to-accent",
      badge: "ENTERPRISE",
      features: ["Custom solutions", "Dedicated support", "ROI tracking"]
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-muted/50 to-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1.5">
            <Zap className="w-3.5 h-3.5 mr-1.5" />
            3 Ways to Get Protected
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Choose Your <span className="text-primary">Protection Level</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whether you need personal protection, family training, or business security — we've got you covered
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {paths.map((path, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <Card className="relative h-full min-h-[420px] p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-card/80 backdrop-blur-sm group overflow-hidden flex flex-col">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Badge */}
                <Badge 
                  className={`absolute top-4 right-4 text-[10px] ${
                    path.badge === "POPULAR" ? "bg-primary" : 
                    path.badge.includes("VETERAN") ? "bg-green-600" : "bg-accent"
                  }`}
                >
                  {path.badge}
                </Badge>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${path.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    <path.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {path.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {path.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-5 flex-1">
                    {path.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Star className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="mb-4 flex-shrink-0">
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {path.priceRange}
                    </span>
                  </div>

                  {/* CTA */}
                  <Button asChild className="w-full group/btn flex-shrink-0">
                    <Link to={path.href} className="inline-flex items-center justify-center gap-2">
                      Get Started
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className="text-muted-foreground mb-4">
            Not sure which option is right for you?
          </p>
          <Button asChild variant="outline" size="lg">
            <Link to="/contact?service=consultation" className="inline-flex items-center gap-2">
              <Users className="w-4 h-4" />
              Schedule a Free Consultation
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroValueCards;
