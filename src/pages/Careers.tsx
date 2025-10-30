import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ApplicationForm } from "@/components/ApplicationForm";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Users,
  GraduationCap,
  Code,
  Palette,
  Headphones,
  TrendingUp,
  Heart,
  Clock,
  DollarSign,
  Home,
  Award,
  ArrowRight,
} from "lucide-react";

const Careers = () => {
  const positions = [
    {
      title: "Threat Analyst",
      department: "ScamShield Protection",
      type: "Full-Time",
      location: "Dayton, OH / Remote",
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
      location: "Dayton, OH / Remote",
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
      location: "Dayton, OH / Hybrid",
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
      location: "Dayton, OH / Remote",
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
      location: "Dayton, OH / Hybrid",
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
    { icon: DollarSign, title: "Competitive Pay", description: "Performance bonuses" },
    { icon: Clock, title: "Flexible Schedule", description: "Work-life balance" },
    { icon: Home, title: "Remote Options", description: "Hybrid work available" },
    { icon: GraduationCap, title: "Development", description: "Training & growth" },
    { icon: Heart, title: "Health Benefits", description: "Full coverage" },
  ];

  return (
    <Layout>
      <Hero
        headline="Join Our Team"
        subheadline="Help protect Ohio families and empower local businesses with technology"
        showScrollIndicator
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <a href="#positions">View Open Positions</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#apply">Apply Now</a>
          </Button>
        </div>
      </Hero>

      {/* Mission & Culture Combined */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              We protect vulnerable populations from AI-powered scams while helping local businesses 
              harness the power of artificial intelligence for good.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Meaningful Work</h3>
              <p className="text-sm text-muted-foreground">Protect people and empower businesses daily</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Collaborative Team</h3>
              <p className="text-sm text-muted-foreground">Talented professionals who support growth</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Growth Opportunities</h3>
              <p className="text-sm text-muted-foreground">Training, mentorship, and advancement</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section - Compact */}
      <section className="py-8 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-center mb-6 text-xl font-semibold">Benefits & Perks</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <benefit.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-medium text-sm">{benefit.title}</p>
                  <p className="text-xs text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions - Compact Layout */}
      <section id="positions" className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="mb-2">Open Positions</h2>
            <p className="text-muted-foreground">Join our growing team and make a real difference</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {positions.map((position, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <position.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-1">{position.title}</h3>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-2">
                      <Badge variant="secondary">{position.type}</Badge>
                      <Badge variant="outline">{position.location}</Badge>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">{position.description}</p>
                
                <Button asChild className="w-full" size="sm">
                  <a href="#apply">
                    Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form - Streamlined */}
      <section id="apply" className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="mb-2">Apply Now</h2>
              <p className="text-muted-foreground">Join our team in 3 simple steps</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 font-bold">1</div>
                <p className="text-sm font-medium">Submit Application</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 font-bold">2</div>
                <p className="text-sm font-medium">Interview</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 font-bold">3</div>
                <p className="text-sm font-medium">Join Team</p>
              </div>
            </div>

            <ApplicationForm positions={positions.map(p => p.title)} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        headline="Ready to Make a Difference?"
        description="Join our mission to protect families and empower businesses."
        variant="gold"
      >
        <Button size="lg" variant="secondary" asChild>
          <a href="#positions">View Positions</a>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link to="/contact">Contact Us</Link>
        </Button>
      </CTASection>

      <Footer />
    </Layout>
  );
};

export default Careers;
