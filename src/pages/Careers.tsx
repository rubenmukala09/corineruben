import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Users, Zap, Target, MapPin, Clock, DollarSign, Briefcase, Star, TrendingUp, Shield, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const jobPositions = [
  {
    id: 1,
    title: "Senior AI Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$120k - $160k",
    description: "Build AI systems that protect families from scams. Work with cutting-edge ML models and help develop our core protection algorithms.",
    requirements: ["5+ years Python/ML", "Experience with LLMs", "Security mindset", "Passion for social impact"],
    benefits: ["Equity", "Health", "Remote", "Learning budget"],
    featured: true
  },
  {
    id: 2,
    title: "Customer Success Manager",
    department: "Support",
    location: "Columbus, OH / Hybrid",
    type: "Full-time",
    salary: "$60k - $80k",
    description: "Help families feel safe and supported. Guide seniors through our platform and build lasting relationships with our most vulnerable users.",
    requirements: ["3+ years customer success", "Empathy & patience", "Tech-savvy", "Excellent communication"],
    benefits: ["Health", "401k", "Flexible hours", "Purpose-driven"],
    featured: false
  },
  {
    id: 3,
    title: "Content Writer (Scam Education)",
    department: "Marketing",
    location: "Remote",
    type: "Full-time / Contract",
    salary: "$50k - $70k",
    description: "Create educational content about scam prevention. Write clear, accessible guides that help non-technical users stay safe online.",
    requirements: ["Strong writing skills", "Research ability", "SEO knowledge", "Cybersecurity interest"],
    benefits: ["Remote", "Flexible", "Creative freedom", "Social impact"],
    featured: false
  },
  {
    id: 4,
    title: "Business Development Rep",
    department: "Sales",
    location: "Columbus, OH",
    type: "Full-time",
    salary: "$50k + Commission",
    description: "Help businesses discover our AI solutions. Build relationships with decision-makers and grow our enterprise customer base.",
    requirements: ["2+ years B2B sales", "Tech sales experience", "Self-starter", "Consultative approach"],
    benefits: ["Commission", "Bonuses", "Car allowance", "Health"],
    featured: false
  },
  {
    id: 5,
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    salary: "$80k - $110k",
    description: "Design interfaces that seniors love. Create accessible, intuitive experiences for users who may not be tech-savvy.",
    requirements: ["4+ years UI/UX", "Accessibility focus", "Figma expert", "User research experience"],
    benefits: ["Remote", "Health", "Conference budget", "Creative freedom"],
    featured: true
  },
  {
    id: 6,
    title: "Scam Analyst",
    department: "Operations",
    location: "Remote",
    type: "Full-time",
    salary: "$55k - $75k",
    description: "Analyze emerging scam patterns and help families avoid fraud. Research new threats and update our protection algorithms.",
    requirements: ["Research skills", "Detail-oriented", "Cybersecurity interest", "Analytical mindset"],
    benefits: ["Training", "Certification", "Remote", "Learning budget"],
    featured: false
  },
  {
    id: 7,
    title: "Part-Time Trainer (Seniors)",
    department: "Training",
    location: "Columbus, OH",
    type: "Part-time",
    salary: "$25-$35/hour",
    description: "Teach seniors how to stay safe online. Conduct in-person and virtual training sessions with patience and empathy.",
    requirements: ["Patient & empathetic", "Teaching experience", "Tech knowledge", "Excellent communication"],
    benefits: ["Flexible hours", "Meaningful work", "Training provided", "Community impact"],
    featured: false
  }
];

const companyValues = [
  {
    icon: Heart,
    title: "Mission-Driven",
    description: "Every feature we build protects families. Our work has real-world impact every day."
  },
  {
    icon: Users,
    title: "Empathy First",
    description: "We build for seniors and vulnerable users. Compassion guides every decision."
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Cutting-edge AI meets practical solutions. We're solving problems that matter."
  },
  {
    icon: Target,
    title: "Inclusivity",
    description: "Diverse teams build better products. We welcome all backgrounds and perspectives."
  }
];

const benefits = [
  { category: "Health", items: ["Medical, Dental, Vision", "Mental health support", "Wellness stipend"] },
  { category: "Financial", items: ["401(k) match", "Stock options", "Performance bonuses"] },
  { category: "Work-Life", items: ["Unlimited PTO", "Remote-first", "Flexible hours"] },
  { category: "Growth", items: ["Learning budget", "Conference attendance", "Mentorship"] },
  { category: "Family", items: ["Parental leave", "Family scam protection", "Childcare stipend"] },
  { category: "Perks", items: ["Home office setup", "Team retreats", "Free snacks"] }
];

const applicationSteps = [
  { step: "1", title: "Apply", description: "Submit your application (10 min)", duration: "10 min" },
  { step: "2", title: "Screen", description: "Brief phone call with our team", duration: "20 min" },
  { step: "3", title: "Interview", description: "Meet the team and discuss the role", duration: "1 hour" },
  { step: "4", title: "Offer", description: "Receive your offer within 3 days", duration: "3 days" }
];

function Careers() {
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const departments = ["all", ...Array.from(new Set(jobPositions.map(job => job.department)))];

  const filteredJobs = selectedDepartment === "all" 
    ? jobPositions 
    : jobPositions.filter(job => job.department === selectedDepartment);

  return (
    <>
      <SEO 
        title="Careers - Join Our Mission" 
        description="Join InVision Network and help protect families from AI-powered scams. Remote-first culture, competitive benefits, meaningful work. Open positions in engineering, support, design, and more."
      />
      <Navigation />
      <Hero 
        headline="Join Our Mission" 
        subheadline="Help us protect families from AI-powered scams"
        showProtectionBadge
        badgeText="We're Hiring"
        className="bg-gradient-to-br from-accent via-primary to-primary-dark"
      />
      <TrustBar />
      
      {/* Why InVision */}
      <section className="py-10 bg-gradient-to-b from-background to-muted/20">
        <div className="container-padding">
          <div className="text-center mb-8">
            <Badge className="mb-3">Why InVision?</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Work That Matters</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join a team that's using AI to protect vulnerable families. Every line of code, every support call, every design decision makes the world safer.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {companyValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section-spacing">
        <div className="container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
            <p className="text-lg text-muted-foreground">
              Find your role in protecting families
            </p>
          </div>

          {/* Department Tabs */}
          <Tabs value={selectedDepartment} onValueChange={setSelectedDepartment} className="mb-8">
            <TabsList className="flex flex-wrap justify-center gap-2 h-auto bg-transparent">
              {departments.map(dept => (
                <TabsTrigger key={dept} value={dept} className="capitalize">
                  {dept === "all" ? "All Departments" : dept}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Job Cards */}
          <div className="grid md:grid-cols-2 gap-4 max-w-6xl mx-auto">
            {filteredJobs.map(job => (
              <Card key={job.id} className={`hover:shadow-xl transition-all ${job.featured ? 'border-primary' : ''}`}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">
                          <Briefcase className="w-3 h-3 mr-1" />
                          {job.department}
                        </Badge>
                        <Badge variant="outline">
                          <MapPin className="w-3 h-3 mr-1" />
                          {job.location}
                        </Badge>
                        <Badge variant="outline">
                          <Clock className="w-3 h-3 mr-1" />
                          {job.type}
                        </Badge>
                      </div>
                    </div>
                    {job.featured && (
                      <Badge variant="default" className="gap-1">
                        <Star className="w-3 h-3" />
                        Featured
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">{job.description}</p>
                      <div className="flex items-center gap-1 text-primary font-semibold">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-sm">{job.salary}</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold mb-2">Requirements:</p>
                      <div className="flex flex-wrap gap-1">
                        {job.requirements.map((req, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold mb-2">Benefits:</p>
                      <div className="flex flex-wrap gap-1">
                        {job.benefits.map((benefit, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full" asChild>
                      <Link to="/portal">Apply Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Don't see your role CTA */}
          <Card className="mt-12 max-w-3xl mx-auto bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Don't See Your Role?</CardTitle>
              <CardDescription className="text-base">
                We're always looking for talented people who care about our mission
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button size="lg" asChild>
                <Link to="/contact">Send Us Your Resume</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="section-spacing bg-muted/30">
        <div className="container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Benefits</h2>
            <p className="text-lg text-muted-foreground">
              We take care of our team so you can focus on the mission
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="section-spacing">
        <div className="container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Application Process</h2>
            <p className="text-lg text-muted-foreground">
              From application to offer in as little as one week
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {applicationSteps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="text-center hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                      {step.step}
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                    <Badge variant="outline" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {step.duration}
                    </Badge>
                  </CardContent>
                </Card>
                {index < applicationSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-muted-foreground">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="section-spacing bg-gradient-to-b from-muted/20 to-background">
        <div className="container-padding">
          <div className="text-center mb-12">
            <Badge className="mb-4">Our Culture</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Life at InVision</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A remote-first culture built on trust, transparency, and making a difference
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Remote-First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Work from anywhere. We have team members across 12 states and growing.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Growth-Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  $2k/year learning budget. Conference attendance. 1-on-1 mentorship.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-success" />
                </div>
                <CardTitle>Mission-Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Every team member gets free family protection. Your loved ones stay safe too.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Careers;
