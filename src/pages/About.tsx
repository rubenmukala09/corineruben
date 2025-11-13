import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import FlowingWaves from "@/components/FlowingWaves";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Lock, BookOpen, Users2, Shield, DollarSign, Award, MapPin } from "lucide-react";
import teamMember1 from "@/assets/team-member-1.jpg";
import teamMember2 from "@/assets/team-member-2.jpg";
import teamMember3 from "@/assets/team-member-3.jpg";
import teamMember4 from "@/assets/team-member-4.jpg";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <Hero
        useTransitioningBackground={true}
        headline="Your Partner in AI Safety and Security"
        subheadline="Locally owned in Ohio, protecting families and businesses nationwide"
        showScrollIndicator={true}
      />

      <TrustBar />

      {/* Our Story */}
      <section className="py-24 bg-background relative">
        <FlowingWaves variant="full" opacity={0.12} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12">Founded on a Personal Mission</h2>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                InVision Network was born from a personal experience when <strong>Ruben Nkulu</strong>, engineer in cybersecurity who's the founder and CEO of the company, witnessed his own grandmother nearly fall victim to a sophisticated AI voice-cloning scam. The caller sounded exactly like her grandson, claiming he was in jail and desperately needed money. It was only by asking a specific question that she realized something was wrong.
              </p>
              <p>
                That moment changed everything. Ruben realized that traditional fraud prevention methods weren't enough to combat these new AI-powered threats. So he created InVision Network - a comprehensive solution that combines expert training, real-time threat analysis, and innovative AI business solutions, all built on a foundation of security and trust.
              </p>
              <p>
                <strong>Giving Back to Our Community:</strong> At InVision Network, we believe in supporting those who've served and protected us. We proudly offer special support programs for veterans, active duty military, first responders, and individuals battling cancer. Through discounted services, free training sessions, and scholarship programs, we're committed to protecting and empowering those who've given so much to our communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/10 shadow-medium">
            <blockquote className="text-2xl md:text-3xl font-bold text-center leading-relaxed text-foreground">
              "Empowering families and businesses to safely navigate the AI age through education, protection, and innovation."
            </blockquote>
          </Card>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-16">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Respect Over Fear</h3>
                  <p className="text-muted-foreground">
                    We don't patronize. We don't use scare tactics. We educate with clarity and dignity.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Privacy is Sacred</h3>
                  <p className="text-muted-foreground">
                    We will NEVER ask for passwords, bank info, or Social Security numbers. Period.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Plain English, Always</h3>
                  <p className="text-muted-foreground">
                    No jargon. No tech-speak. Just clear, actionable guidance anyone can follow.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users2 className="w-8 h-8 text-primary" />
                </div>
                <div>
  <h3 className="text-2xl font-bold mb-3">INTEGRITY</h3>
                  <p className="text-muted-foreground">
                    Transparent, honest, ethical
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-16">Our Community Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-8 text-center hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-4xl font-bold gradient-text-primary mb-2">500+</p>
              <p className="text-muted-foreground">Families Trained</p>
            </Card>

            <Card className="p-8 text-center hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-4xl font-bold gradient-text-primary mb-2">$2M+</p>
              <p className="text-muted-foreground">in Fraud Prevented</p>
            </Card>

            <Card className="p-8 text-center hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-4xl font-bold gradient-text-primary mb-2">50+</p>
              <p className="text-muted-foreground">Sessions for Veterans</p>
            </Card>

            <Card className="p-8 text-center hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-4xl font-bold gradient-text-primary mb-2">30+</p>
              <p className="text-muted-foreground">Cancer Patient Scholarships</p>
            </Card>
          </div>

        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-4">Meet Our Team</h2>
          <p className="text-center text-xl text-muted-foreground mb-16 max-w-3xl mx-auto">
            Dedicated professionals committed to protecting families and empowering businesses
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah Chen",
                role: "Lead Threat Analyst",
                image: teamMember1,
                description: "Former FBI cybercrime specialist with 10+ years protecting families from digital threats"
              },
              {
                name: "Marcus Williams",
                role: "Senior Training Instructor",
                image: teamMember2,
                description: "Certified educator specializing in making complex security concepts accessible to all ages"
              },
              {
                name: "Priya Patel",
                role: "AI Solutions Developer",
                image: teamMember3,
                description: "Expert in building secure, ethical AI systems that serve businesses and protect privacy"
              },
              {
                name: "Jordan Taylor",
                role: "Client Success Manager",
                image: teamMember4,
                description: "Dedicated to ensuring every client feels supported and protected throughout their journey"
              }
            ].map((member, index) => (
              <Card key={index} className="p-6 hover:shadow-strong transition-all hover:-translate-y-2 rounded-2xl border-border/50 text-center group">
                <div className="mb-4 overflow-hidden rounded-xl">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary font-semibold mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Partnerships */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-16">Our Certifications & Partnerships</h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <Card className="p-6 hover:shadow-medium transition-shadow">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-accent" />
                <span className="font-bold">BBB Accredited</span>
              </div>
            </Card>
            <Card className="p-6 hover:shadow-medium transition-shadow">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-accent" />
                <span className="font-bold">Veteran Support Certified</span>
              </div>
            </Card>
            <Card className="p-6 hover:shadow-medium transition-shadow">
              <div className="flex items-center gap-3">
                <Users2 className="w-8 h-8 text-accent" />
                <span className="font-bold">Ohio Small Business Association</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-16">Service Areas</h2>
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-8 h-8 text-accent" />
                    <h3 className="text-2xl font-bold">Headquarters</h3>
                  </div>
                  <p className="text-xl mb-4">850 Euclid Ave Ste 819 #4685</p>
                  <p className="text-xl mb-4">Cleveland, OH 44114</p>
                  <p className="text-muted-foreground mb-4">Service Areas:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Cleveland Metro</li>
                    <li>• Akron</li>
                    <li>• Canton</li>
                    <li>• Youngstown</li>
                    <li>• Columbus</li>
                    <li>• Nationwide Service Available</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-8 h-8 text-accent" />
                    <h3 className="text-2xl font-bold">Nationwide Service</h3>
                  </div>
                  <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>Live Zoom training available to all 50 states</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>In-person training available nationwide (travel covered by InVision)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>Family Scam Shield available anywhere</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white mb-8">Want to Join Our Mission?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild variant="gold" size="xl">
              <Link to="/training">BOOK TRAINING</Link>
            </Button>
            <Button asChild variant="outlineLight" size="xl">
              <Link to="/contact">PARTNER WITH US</Link>
            </Button>
            <Button asChild variant="outlineLight" size="xl">
              <Link to="/donate">DONATE A TRAINING SEAT</Link>
            </Button>
          </div>
            <p className="mt-6 text-white/90 text-lg">
            Questions? Call <a href="tel:9375550199" className="underline hover:text-white font-semibold">(937) 555-0199</a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
