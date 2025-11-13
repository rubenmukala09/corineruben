import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ApplicationForm } from "@/components/ApplicationForm";
import {
  Shield,
  Users,
  GraduationCap,
  Code,
  Palette,
  Headphones,
  TrendingUp,
  Heart,
  Coffee,
  Clock,
  DollarSign,
  Home,
  Award,
} from "lucide-react";
import teamCollaboration from "@/assets/team-collaboration.jpg";
import customerSupport from "@/assets/customer-support.jpg";

const Careers = () => {
  const positions = [
    {
      title: "Threat Analyst",
      department: "ScamShield Protection",
      type: "Full-Time",
      location: "Cleveland, OH / Remote",
      icon: Shield,
      description: "Analyze suspicious emails, texts, calls, and documents to protect our clients from scams and fraud.",
      responsibilities: [
        "Review and analyze submitted suspicious content",
        "Provide detailed threat assessments to clients",
        "Maintain case management records",
        "Stay current on emerging scam tactics",
        "Communicate findings clearly to non-technical users",
      ],
      qualifications: [
        "Background in cybersecurity, IT, or related field",
        "Strong analytical and problem-solving skills",
        "Excellent written communication",
        "Attention to detail",
        "Ability to work independently",
      ],
    },
    {
      title: "Trainer / Instructor",
      department: "Education & Training",
      type: "Part-Time / Contract",
      location: "Cleveland, OH / Remote",
      icon: GraduationCap,
      description: "Deliver engaging cybersecurity training sessions to individuals, families, and groups.",
      responsibilities: [
        "Conduct live Zoom training sessions",
        "Present complex topics in accessible ways",
        "Answer participant questions",
        "Generate completion certificates",
        "Provide follow-up support",
      ],
      qualifications: [
        "Experience in teaching or training",
        "Knowledge of cybersecurity and scam prevention",
        "Comfortable with virtual presentation",
        "Patient and empathetic communication style",
        "Bilingual (English/Spanish or English/French) a plus",
      ],
    },
    {
      title: "AI Developer",
      department: "Business Solutions",
      type: "Full-Time",
      location: "Cleveland, OH / Hybrid",
      icon: Code,
      description: "Build custom AI agents and automation solutions for business clients.",
      responsibilities: [
        "Develop AI receptionist and automation systems",
        "Integrate with client CRMs and business tools",
        "Test and optimize AI performance",
        "Document technical specifications",
        "Provide ongoing maintenance and support",
      ],
      qualifications: [
        "Experience with AI/ML platforms (GPT, Claude, etc.)",
        "Proficiency in Python, JavaScript, or similar",
        "API integration experience",
        "Strong problem-solving abilities",
        "Client-facing communication skills",
      ],
    },
    {
      title: "Web Designer",
      department: "Business Solutions",
      type: "Full-Time / Contract",
      location: "Remote",
      icon: Palette,
      description: "Design and develop beautiful, functional websites for small businesses.",
      responsibilities: [
        "Create custom website designs",
        "Develop responsive, mobile-friendly sites",
        "Implement SEO best practices",
        "Collaborate with clients on requirements",
        "Maintain and update existing sites",
      ],
      qualifications: [
        "Portfolio of web design work",
        "Proficiency in HTML, CSS, JavaScript",
        "Experience with design tools (Figma, Adobe XD)",
        "Understanding of UX/UI principles",
        "WordPress or similar CMS experience a plus",
      ],
    },
    {
      title: "Customer Support Specialist",
      department: "Client Services",
      type: "Full-Time",
      location: "Cleveland, OH / Remote",
      icon: Headphones,
      description: "Provide exceptional support to clients across all InVision Network services.",
      responsibilities: [
        "Respond to client inquiries via email and phone",
        "Troubleshoot technical issues",
        "Process service requests",
        "Maintain client records",
        "Escalate complex issues to appropriate teams",
      ],
      qualifications: [
        "Customer service experience required",
        "Tech-savvy with quick learning ability",
        "Empathetic and patient communication",
        "Strong organizational skills",
        "Bilingual a plus",
      ],
    },
    {
      title: "Sales Consultant",
      department: "Business Development",
      type: "Full-Time",
      location: "Cleveland, OH / Hybrid",
      icon: TrendingUp,
      description: "Connect businesses with AI solutions and help families protect themselves from scams.",
      responsibilities: [
        "Conduct client consultations",
        "Present service offerings",
        "Generate proposals and quotes",
        "Manage sales pipeline",
        "Build long-term client relationships",
      ],
      qualifications: [
        "Proven sales experience",
        "Consultative selling approach",
        "Understanding of tech products/services",
        "Excellent presentation skills",
        "Self-motivated and goal-oriented",
      ],
    },
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Competitive Pay",
      description: "Fair compensation with performance bonuses",
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Work-life balance is important to us",
    },
    {
      icon: Home,
      title: "Remote Options",
      description: "Many positions offer remote or hybrid work",
    },
    {
      icon: GraduationCap,
      title: "Professional Development",
      description: "Ongoing training and skill development",
    },
    {
      icon: Heart,
      title: "Health Benefits",
      description: "Medical, dental, and vision insurance (full-time)",
    },
    {
      icon: Coffee,
      title: "Paid Time Off",
      description: "Vacation, sick days, and holidays",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <Hero
        useTransitioningBackground={true}
        headline="Join Our Team"
        subheadline="Help protect Ohio families and empower local businesses with technology"
        showScrollIndicator={true}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <a href="#positions">View Open Positions</a>
          </Button>
        </div>
      </Hero>

      <TrustBar />


      {/* Culture Section */}
      <section id="culture" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">Why Work at InVision Network?</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
            <div className="space-y-6">
              <Card className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Meaningful Work</h3>
                <p className="text-muted-foreground">
                  Every day, you'll help protect real people from real threats and empower businesses to grow.
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Collaborative Team</h3>
                <p className="text-muted-foreground">
                  Work alongside talented, passionate professionals who support each other's growth.
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Growth Opportunities</h3>
                <p className="text-muted-foreground">
                  We invest in our team's development with training, mentorship, and advancement paths.
                </p>
              </Card>
            </div>

            <div>
              <img
                src={teamCollaboration}
                alt="Team collaboration at InVision Network"
                className="rounded-lg shadow-large w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">Benefits & Perks</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="mb-3 text-3xl">Open Positions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our growing team and make a real difference in people's lives
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-6xl mx-auto">
            {positions.map((position, index) => (
              <Card key={index} className="p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-3">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <position.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="text-lg font-bold mb-1">{position.title}</h3>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span>{position.type}</span>
                      <span>•</span>
                      <span>{position.location}</span>
                    </div>
                  </div>
                  <Button asChild size="sm">
                    <a href="#apply">Apply</a>
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{position.description}</p>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Key Responsibilities:</h4>
                    <ul className="space-y-1">
                      {position.responsibilities.slice(0, 3).map((resp, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1.5">
                          <span className="text-primary mt-0.5">•</span>
                          <span className="line-clamp-1">{resp}</span>
                        </li>
                      ))}
                      {position.responsibilities.length > 3 && (
                        <li className="text-xs text-muted-foreground italic">
                          +{position.responsibilities.length - 3} more...
                        </li>
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Qualifications:</h4>
                    <ul className="space-y-1">
                      {position.qualifications.slice(0, 3).map((qual, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1.5">
                          <span className="text-primary mt-0.5">•</span>
                          <span className="line-clamp-1">{qual}</span>
                        </li>
                      ))}
                      {position.qualifications.length > 3 && (
                        <li className="text-xs text-muted-foreground italic">
                          +{position.qualifications.length - 3} more...
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="mb-4">Apply Now</h2>
              <p className="text-xl text-muted-foreground">
                Complete the application form below to join our team
              </p>
            </div>

            <ApplicationForm 
              positions={positions.map(p => p.title)}
            />

            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-6 text-center">Application Process</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    1
                  </div>
                  <h4 className="font-semibold mb-2">Submit Application</h4>
                  <p className="text-sm text-muted-foreground">
                    Complete the form above with your information and resume
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    2
                  </div>
                  <h4 className="font-semibold mb-2">Initial Interview</h4>
                  <p className="text-sm text-muted-foreground">
                    We'll review and schedule a phone or video interview
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    3
                  </div>
                  <h4 className="font-semibold mb-2">Join the Team</h4>
                  <p className="text-sm text-muted-foreground">
                    If it's a fit, we'll extend an offer and start onboarding
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        headline="Ready to Make a Difference?"
        description="Join our mission to protect families and empower businesses with technology."
        variant="gold"
      >
        <Button size="lg" variant="secondary" asChild>
          <a href="#positions">View All Positions</a>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link to="/contact">Get in Touch</Link>
        </Button>
      </CTASection>

      <Footer />
    </div>
  );
};

export default Careers;
