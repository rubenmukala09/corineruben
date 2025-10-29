import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, GraduationCap, Briefcase, CheckCircle, ArrowRight } from "lucide-react";

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <Hero
        useTransitioningBackground={true}
        headline="Comprehensive Protection and Solutions"
        subheadline="Choose the service that best protects your needs"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild variant="default" size="xl">
            <Link to="#scamshield">ScamShield Protection</Link>
          </Button>
          <Button asChild variant="secondary" size="xl">
            <Link to="#training">Training Programs</Link>
          </Button>
          <Button asChild variant="outline" size="xl">
            <Link to="#business">Business Solutions</Link>
          </Button>
        </div>
      </Hero>

      {/* Service Categories */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-16">Our Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* ScamShield Protection */}
            <Card className="p-8 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group">
              <div id="scamshield" className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <Shield className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center group-hover:text-primary transition-colors">
                ScamShield Protection
              </h3>
              <p className="text-muted-foreground text-center mb-6">
                24/7 threat analysis and scam detection services to keep you protected from AI-powered fraud
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Unlimited threat submissions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Expert analysis within 24 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Detailed risk assessments</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Monthly scam alerts</span>
                </li>
              </ul>
              <Button asChild variant="default" className="w-full group-hover:scale-105 transition-transform">
                <Link to="/training#scamshield">
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </Card>

            {/* Training Programs */}
            <Card className="p-8 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-primary border-2 group relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </span>
              </div>
              <div id="training" className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <GraduationCap className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center group-hover:text-primary transition-colors">
                Training Programs
              </h3>
              <p className="text-muted-foreground text-center mb-6">
                Interactive training sessions that teach you practical skills to recognize and stop scams
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Live interactive sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Certificate of completion</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Group and private options</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Practical, hands-on learning</span>
                </li>
              </ul>
              <Button asChild variant="default" className="w-full group-hover:scale-105 transition-transform">
                <Link to="/training#training">
                  View Programs <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </Card>

            {/* Business Solutions */}
            <Card className="p-8 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group">
              <div id="business" className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <Briefcase className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center group-hover:text-primary transition-colors">
                Business Solutions
              </h3>
              <p className="text-muted-foreground text-center mb-6">
                Custom AI automation, professional websites, and industry-leading AI Service Insurance
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">AI automation solutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Professional web design</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">AI Service Insurance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Security-first approach</span>
                </li>
              </ul>
              <Button asChild variant="default" className="w-full group-hover:scale-105 transition-transform">
                <Link to="/business">
                  Explore Solutions <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose InVision Network */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-16">Why Choose InVision Network?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center hover:shadow-medium transition-all hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">500+ Families Protected</h3>
              <p className="text-muted-foreground text-sm">
                Trusted by hundreds of Ohio families and businesses
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-medium transition-all hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Expert Team</h3>
              <p className="text-muted-foreground text-sm">
                Certified cybersecurity professionals who care
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-medium transition-all hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Locally Owned</h3>
              <p className="text-muted-foreground text-sm">
                Based in Dayton, Ohio, serving nationwide
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-medium transition-all hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Comprehensive Solutions</h3>
              <p className="text-muted-foreground text-sm">
                From protection to training to business growth
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection headline="Ready to Get Protected?" variant="gold">
        <p className="text-xl text-white/90 mb-8">
          Choose the service that's right for you and get started today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center">
          <Button asChild variant="gold" size="xl">
            <Link to="/training">Start ScamShield Trial</Link>
          </Button>
          <Button asChild variant="secondary" size="xl">
            <Link to="/training#training">Book Training Session</Link>
          </Button>
          <Button asChild variant="outlineLight" size="xl">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
        <p className="text-white/80 mt-6 text-sm">
          ✓ No credit card required ✓ 60-day money-back guarantee
        </p>
      </CTASection>

      <Footer />
    </div>
  );
};

export default Services;
