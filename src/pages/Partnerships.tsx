import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Church, Users, Heart, Shield, CheckCircle } from "lucide-react";

const Partnerships = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <Hero
        useTransitioningBackground={true}
        headline="Community Partnerships"
        subheadline="Join us in protecting families and seniors from AI scams"
      />

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-xl text-muted-foreground text-center mb-8">
              InVision Network partners with churches, senior centers, community organizations, and nonprofits to bring AI safety education to those who need it most.
            </p>
          </div>

          {/* Partnership Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            <Card className="p-8 hover:shadow-medium transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Church className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Church Partnerships</h2>
              <p className="text-muted-foreground mb-6">
                We offer free or discounted group training for church congregations, with special programs designed for senior members and families.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Free training for groups of 15+</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Flexible scheduling for church events</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Customized content for your community</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 hover:shadow-medium transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Senior Centers</h2>
              <p className="text-muted-foreground mb-6">
                Partner with us to provide ongoing AI safety education and Scam Shield services to your members at discounted rates.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Monthly educational workshops</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>On-site training availability</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Bulk Scam Shield discounts</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 hover:shadow-medium transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Nonprofit Organizations</h2>
              <p className="text-muted-foreground mb-6">
                We support nonprofits serving vulnerable populations with free training seats and resources.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Free training for underserved communities</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Educational materials at no cost</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Volunteer trainer opportunities</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 hover:shadow-medium transition-all border-2 border-primary">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Veteran Organizations</h2>
              <p className="text-muted-foreground mb-6">
                As a veteran-owned company, we offer special programs for veteran service organizations and military families.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>20% discount for all veterans</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Free training for VSO events</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Military spouse support programs</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Partnership Benefits */}
          <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-primary/5 to-accent/5 mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Why Partner With Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-3">For Your Organization</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Provide valuable protection to your members</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Free or heavily discounted training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>No cost educational materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Flexible scheduling around your events</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">For Your Members</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Expert-led, easy-to-understand training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Actionable scripts and protocols</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Ongoing support and resources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Certificate of completion</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Partner?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's work together to protect your community from AI-powered scams
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/contact">Request Partnership Info</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/training">View Training Programs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Partnerships;
