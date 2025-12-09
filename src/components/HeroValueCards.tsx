import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Shield, 
  GraduationCap, 
  Building2, 
  ArrowRight, 
  Check,
  Sparkles,
  Award,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroValueCards = () => {
  const offerings = [
    {
      id: "scamshield",
      icon: Shield,
      badge: "Most Popular",
      badgeColor: "bg-primary",
      title: "ScamShield Protection",
      subtitle: "Personal & Family Plans",
      price: "$39",
      priceLabel: "/month",
      description: "Comprehensive AI-powered monitoring and protection against scams, phishing, and digital threats.",
      features: [
        "24/7 Real-time threat detection",
        "Suspicious content analysis",
        "Family member coverage",
        "Monthly security reports",
        "Priority support access"
      ],
      href: "/training#pricing",
      ctaText: "Get Protected",
      highlight: true
    },
    {
      id: "training",
      icon: GraduationCap,
      badge: "Veteran Discount",
      badgeColor: "bg-success",
      title: "Prevention Training",
      subtitle: "Individual & Group Sessions",
      price: "$89",
      priceLabel: "one-time",
      description: "Expert-led training programs designed to help you recognize and prevent all types of scams.",
      features: [
        "Certified cybersecurity trainers",
        "Hands-on practice scenarios",
        "Take-home reference materials",
        "Certificate of completion",
        "10% veteran discount"
      ],
      href: "/training#training",
      ctaText: "Start Learning",
      highlight: false
    },
    {
      id: "business",
      icon: Building2,
      badge: "Enterprise",
      badgeColor: "bg-accent",
      title: "Business Solutions",
      subtitle: "Custom AI & Security",
      price: "$1,500",
      priceLabel: "starting",
      description: "Tailored solutions including AI automation, security audits, and professional consulting.",
      features: [
        "Custom AI automation",
        "Security vulnerability audits",
        "Employee training programs",
        "Dedicated account manager",
        "Flexible payment options"
      ],
      href: "/business",
      ctaText: "Get Quote",
      highlight: false
    }
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-muted/30">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Choose Your Protection Level</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Three Paths to Digital Safety
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Whether you need personal protection, expert training, or enterprise solutions — 
            we have a plan designed for you.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {offerings.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative ${offer.highlight ? 'lg:-mt-4 lg:mb-4' : ''}`}
            >
              {/* Card */}
              <div className={`relative h-full rounded-2xl border transition-all duration-500 hover:shadow-2xl ${
                offer.highlight 
                  ? 'bg-gradient-to-b from-primary/5 to-card border-primary/30 shadow-xl shadow-primary/10' 
                  : 'bg-card border-border/50 hover:border-primary/20'
              }`}>
                {/* Badge */}
                <div className="absolute -top-3 left-6">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white ${offer.badgeColor}`}>
                    {offer.badge === "Most Popular" && <Award className="w-3 h-3" />}
                    {offer.badge}
                  </span>
                </div>

                <div className="p-8 pt-10">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      offer.highlight 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-gradient-to-br from-primary/10 to-accent/10'
                    }`}>
                      <offer.icon className={`w-6 h-6 ${offer.highlight ? '' : 'text-primary'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{offer.title}</h3>
                      <p className="text-sm text-muted-foreground">{offer.subtitle}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{offer.price}</span>
                      <span className="text-muted-foreground">{offer.priceLabel}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-6">
                    {offer.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {offer.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button 
                    asChild 
                    className={`w-full gap-2 ${offer.highlight ? '' : 'variant-outline'}`}
                    variant={offer.highlight ? 'default' : 'outline'}
                    size="lg"
                  >
                    <Link to={offer.href}>
                      {offer.ctaText}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-card border border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium">Not sure which plan is right?</p>
                <p className="text-sm text-muted-foreground">Get a free consultation</p>
              </div>
            </div>
            <Button asChild variant="outline" className="gap-2">
              <Link to="/contact?service=consultation">
                Schedule Free Call
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroValueCards;
