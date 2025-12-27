import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { BookingModal } from "@/components/BookingModal";
import { 
  Calendar, Clock, Video, Users, Shield, Zap, 
  Headphones, Globe, ArrowRight, CheckCircle 
} from "lucide-react";

const BOOKING_TYPES = [
  {
    id: "ai-onboarding",
    title: "AI Agents Onboarding Call",
    duration: "30 min",
    icon: Zap,
    description: "Discuss your AI agent requirements, integration options, and implementation timeline",
    color: "from-violet-500 to-purple-600",
    features: ["Requirements review", "Integration planning", "Timeline discussion", "Q&A"],
    serviceType: "ai-agents"
  },
  {
    id: "website-discovery",
    title: "Website Design Discovery Call",
    duration: "30 min",
    icon: Globe,
    description: "Explore your website goals, design preferences, and project scope",
    color: "from-blue-500 to-cyan-600",
    features: ["Design preferences", "Feature requirements", "Content strategy", "Timeline planning"],
    serviceType: "website-design"
  },
  {
    id: "ai-tools-consultation",
    title: "AI Tools Consultation",
    duration: "20 min",
    icon: Headphones,
    description: "Get personalized recommendations for AI tools that fit your business needs",
    color: "from-emerald-500 to-teal-600",
    features: ["Needs assessment", "Tool recommendations", "Cost analysis", "Implementation advice"],
    serviceType: "ai-consultation"
  },
  {
    id: "enterprise-security",
    title: "Enterprise Security Review",
    duration: "45 min",
    icon: Shield,
    description: "Comprehensive security assessment for enterprise AI implementations",
    color: "from-amber-500 to-orange-600",
    features: ["Security audit", "Compliance review", "Risk assessment", "Recommendations"],
    serviceType: "security-review"
  }
];

function Schedule() {
  const [selectedBooking, setSelectedBooking] = useState<typeof BOOKING_TYPES[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleBookingSelect = (booking: typeof BOOKING_TYPES[0]) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <SEO 
        title="Schedule a Call | InVision Network"
        description="Book a consultation with our team. Schedule AI agent onboarding, website discovery calls, or enterprise security reviews."
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
            <Calendar className="w-4 h-4" />
            <span>Schedule Your Consultation</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Let's Talk About Your Project
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Book a free consultation with our team. We'll discuss your needs and create a customized plan for your success.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              Free Consultation
            </span>
            <span className="flex items-center gap-2">
              <Video className="w-4 h-4 text-primary" />
              Video or Phone
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              Flexible Scheduling
            </span>
          </div>
        </div>
      </section>
      
      {/* Booking Options Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {BOOKING_TYPES.map((booking) => (
              <Card 
                key={booking.id}
                className="group p-6 hover:shadow-strong transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/30"
                onClick={() => handleBookingSelect(booking)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${booking.color} flex items-center justify-center`}>
                    <booking.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4" />
                    <span>{booking.duration}</span>
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {booking.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {booking.description}
                </p>
                
                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {booking.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CheckCircle className="w-3 h-3 text-success flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA */}
                <Button className="w-full group-hover:bg-primary/90 transition-colors">
                  Book Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Alternative Contact */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Prefer to Talk Now?</h2>
            <p className="text-muted-foreground mb-6">
              Our team is available during business hours for immediate assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" size="lg">
                <a href="tel:9375550199" className="flex items-center gap-2">
                  <Headphones className="w-5 h-5" />
                  (937) 555-0199
                </a>
              </Button>
              <Button asChild size="lg">
                <Link to="/contact">
                  Send a Message
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
      
      {/* Booking Modal */}
      {selectedBooking && (
        <BookingModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          serviceType="consultation"
          serviceName={selectedBooking.title}
        />
      )}
      
      <Footer />
    </div>
  );
}

export default Schedule;