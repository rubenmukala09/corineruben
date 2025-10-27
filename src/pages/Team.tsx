import { useState } from 'react';
import { Linkedin, Mail, Briefcase, Heart, Users, TrendingUp, CheckCircle, Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import AIPartnersCarousel from '@/components/AIPartnersCarousel';
import teamRuben from '@/assets/team-ruben.jpg';
import teamCorine from '@/assets/team-corine.jpg';
import teamDavid from '@/assets/team-david.jpg';
import teamSarah from '@/assets/team-sarah.jpg';
import teamMichael from '@/assets/team-michael.jpg';
import teamPriya from '@/assets/team-priya.jpg';
import teamJames from '@/assets/team-james.jpg';
import teamMaria from '@/assets/team-maria.jpg';
import teamAlex from '@/assets/team-alex.jpg';
import teamEmily from '@/assets/team-emily.jpg';
import teamJordan from '@/assets/team-jordan.jpg';

interface TeamMember {
  name: string;
  title: string;
  summary: string;
  bio: string;
  image: string;
  linkedin?: string;
  email?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Ruben Mukala",
    title: "CEO & Founder",
    summary: "Visionary leader in AI strategy and security innovation.",
    bio: "Ruben founded InVision Network with a mission to protect families and businesses from AI-powered threats. With over 15 years of experience in cybersecurity and AI strategy, he leads our team in developing cutting-edge training programs and security solutions. His expertise spans threat intelligence, risk assessment, and building resilient communities.",
    image: teamRuben,
    linkedin: "https://www.linkedin.com/",
    email: "ruben@invisionnetwork.com"
  },
  {
    name: "Corine Mitchell",
    title: "Director of Health & Community Outreach",
    summary: "Connecting families with AI safety education and support.",
    bio: "Corine specializes in bringing AI safety training to families, seniors, and community organizations. She designs accessible workshops that empower non-technical audiences to recognize and defend against scams. Her background in healthcare and community advocacy makes her uniquely positioned to bridge the gap between technology and human connection.",
    image: teamCorine,
    linkedin: "https://www.linkedin.com/"
  },
  {
    name: "David Chen",
    title: "Chief Technology Officer",
    summary: "Building secure AI infrastructure for businesses.",
    bio: "David leads our technical team in developing advanced AI security tools and automation solutions. With expertise in machine learning, cloud infrastructure, and cybersecurity, he ensures our clients receive enterprise-grade protection. He's passionate about making complex technology accessible and practical for small businesses.",
    image: teamDavid,
    linkedin: "https://www.linkedin.com/"
  },
  {
    name: "Sarah Williams",
    title: "VP of Training & Education",
    summary: "Creating transformative learning experiences.",
    bio: "Sarah designs and delivers our comprehensive training programs for individuals and organizations. Her expertise in adult education and instructional design ensures every participant gains practical skills to protect themselves and their businesses. She's committed to making AI literacy accessible to everyone.",
    image: teamSarah,
    linkedin: "https://www.linkedin.com/"
  },
  {
    name: "Michael Hassan",
    title: "Lead Security Analyst",
    summary: "Expert in threat detection and response strategies.",
    bio: "Michael monitors emerging AI-powered threats and develops defensive strategies for our clients. His background in cybersecurity and threat intelligence helps us stay ahead of evolving scam tactics. He conducts security assessments and trains teams on incident response protocols.",
    image: teamMichael,
    linkedin: "https://www.linkedin.com/"
  },
  {
    name: "Priya Patel",
    title: "Director of Business Solutions",
    summary: "Empowering SMBs with AI automation and security.",
    bio: "Priya works directly with small and medium businesses to implement AI solutions that improve efficiency while maintaining security. She specializes in workflow automation, customer service AI, and building privacy-first systems. Her goal is to make enterprise-level AI accessible to growing businesses.",
    image: teamPriya,
    linkedin: "https://www.linkedin.com/"
  },
  {
    name: "James Robinson",
    title: "Senior Training Specialist",
    summary: "Delivering hands-on AI safety workshops.",
    bio: "James brings AI security concepts to life through interactive training sessions and simulations. He specializes in teaching seniors and families how to recognize deepfakes, phishing attempts, and social engineering tactics. His engaging teaching style makes complex topics easy to understand.",
    image: teamJames,
    linkedin: "https://www.linkedin.com/"
  },
  {
    name: "Maria Rodriguez",
    title: "Customer Success Manager",
    summary: "Ensuring every client achieves their security goals.",
    bio: "Maria guides clients through their journey with InVision Network, from onboarding to ongoing support. She tracks success metrics, gathers feedback, and ensures our solutions deliver measurable results. Her dedication to client outcomes drives continuous improvement across our services.",
    image: teamMaria,
    linkedin: "https://www.linkedin.com/"
  },
  {
    name: "Alex Thompson",
    title: "Operations Manager",
    summary: "Streamlining processes for maximum efficiency.",
    bio: "Alex ensures our operations run smoothly, coordinating between teams and managing resources effectively. He optimizes workflows, implements quality controls, and maintains the high standards our clients expect. His organizational skills keep InVision Network operating at peak performance.",
    image: teamAlex,
    linkedin: "https://www.linkedin.com/"
  },
  {
    name: "Emily Zhang",
    title: "Marketing & Communications Lead",
    summary: "Spreading awareness about AI safety.",
    bio: "Emily manages our marketing campaigns and community outreach initiatives. She creates educational content, coordinates events, and builds partnerships that expand our reach. Her creative approach helps us connect with diverse audiences and grow our impact.",
    image: teamEmily,
    linkedin: "https://www.linkedin.com/"
  },
  {
    name: "Jordan Brooks",
    title: "Cybersecurity Research Analyst",
    summary: "Investigating emerging AI threats and vulnerabilities.",
    bio: "Jordan researches the latest AI-powered attack vectors and develops countermeasures. He publishes threat reports, conducts security audits, and keeps our team informed about evolving risks. His research directly informs our training curriculum and security protocols.",
    image: teamJordan,
    linkedin: "https://www.linkedin.com/"
  }
];

const jobApplicationSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().regex(/^\+?[1-9]\d{0,14}$/, "Invalid phone number format").max(20, "Phone number is invalid"),
  position: z.string().trim().min(1, "Position is required").max(100, "Position must be less than 100 characters"),
  coverLetter: z.string().trim().min(50, "Cover letter must be at least 50 characters").max(5000, "Cover letter must be less than 5000 characters")
});

const openPositions = [
  {
    title: "AI Safety Trainer",
    type: "Full-Time",
    location: "Remote / Hybrid (Ohio)",
    description: "Teach seniors and families how to protect themselves from AI-powered scams. Patient communication skills required."
  },
  {
    title: "Cybersecurity Educator",
    type: "Part-Time",
    location: "Remote",
    description: "Develop training materials and conduct workshops on digital safety, phishing detection, and fraud prevention."
  },
  {
    title: "Community Outreach Specialist",
    type: "Contract",
    location: "Cincinnati, OH",
    description: "Build partnerships with senior centers, churches, and community organizations to expand our reach."
  },
  {
    title: "Customer Success Manager",
    type: "Full-Time",
    location: "Remote",
    description: "Ensure client satisfaction, manage onboarding, and provide ongoing support to families and organizations."
  }
];

const Team = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    resume: null as File | null,
    coverLetter: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validated = jobApplicationSchema.parse({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        coverLetter: formData.coverLetter
      });

      const { error } = await supabase
        .from("job_applications")
        .insert([{
          name: validated.name,
          email: validated.email,
          phone: validated.phone,
          position: validated.position,
          cover_letter: validated.coverLetter,
          resume_url: formData.resume?.name || null
        }]);

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you soon.",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
        resume: null,
        coverLetter: ""
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        console.error("Error submitting application:", error);
        toast({
          title: "Error",
          description: "Failed to submit application. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
        <Navigation />
        
        {/* Hero Section */}
        <Hero
          useRouteBasedImages={true}
          headline="Meet the InVision Network Team & Join Our Mission"
          subheadline="Dedicated professionals protecting families from AI-powered scams. Help us make a difference."
          showScrollIndicator={true}
        />

        {/* Team Grid */}
        <section className="pb-24 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <article 
                  key={index}
                  className="group bg-card rounded-xl p-4 shadow-subtle hover:shadow-strong transition-all duration-300 hover:-translate-y-1"
                  itemScope
                  itemType="https://schema.org/Person"
                >
                  <img 
                    src={member.image} 
                    alt={`${member.name} - ${member.title}`}
                    className="w-full aspect-square object-cover rounded-xl mb-3"
                    itemProp="image"
                    loading="lazy"
                  />
                  <h2 className="text-lg font-bold mb-1" itemProp="name">{member.name}</h2>
                  <p className="text-primary font-semibold text-sm mb-2" itemProp="jobTitle">{member.title}</p>
                  <p className="text-muted-foreground text-xs mb-3 line-clamp-2">{member.summary}</p>
                  
                  <div className="flex items-center gap-3 mb-4">
                    {member.linkedin && (
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label={`${member.name}'s LinkedIn profile`}
                        itemProp="sameAs"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {member.email && (
                      <a 
                        href={`mailto:${member.email}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    )}
                  </div>

                  <Button 
                    onClick={() => setSelectedMember(member)}
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                  >
                    View Bio
                  </Button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-center mb-12 animate-fade-in-up">Why Work With InVision Network</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Meaningful Work</h3>
                <p className="text-muted-foreground">
                  Make a real difference protecting vulnerable populations from digital fraud
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Great Team</h3>
                <p className="text-muted-foreground">
                  Work with passionate professionals dedicated to digital safety education
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Growth Opportunities</h3>
                <p className="text-muted-foreground">
                  Expand your skills in AI safety, cybersecurity, and education
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Flexible Work</h3>
                <p className="text-muted-foreground">
                  Remote options and flexible schedules to fit your lifestyle
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-center mb-12">Open Positions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {openPositions.map((position, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{position.title}</h3>
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        <span>{position.type}</span>
                        <span>•</span>
                        <span>{position.location}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{position.description}</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, position: position.title }));
                      document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Apply Now
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="application-form" className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="mb-4">Apply for a Position</h2>
                <p className="text-xl text-muted-foreground">
                  Join our team and make a difference
                </p>
              </div>

              <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position">Position *</Label>
                      <Input
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., AI Safety Trainer"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resume">Resume / CV *</Label>
                    <div className="relative">
                      <Input
                        id="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        required
                        className="cursor-pointer"
                      />
                      <Upload className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Accepted formats: PDF, DOC, DOCX (Max 5MB)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coverLetter">Cover Letter *</Label>
                    <Textarea
                      id="coverLetter"
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    />
                  </div>

                  <div className="flex items-start gap-2 p-4 bg-primary/5 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      By submitting this application, you agree to our privacy policy and consent to us contacting you regarding your application.
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>

      <AIPartnersCarousel />

      <Footer />

      {/* Bio Modal */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedMember?.name}</DialogTitle>
            <DialogDescription className="text-primary font-semibold">
              {selectedMember?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <img 
              src={selectedMember?.image} 
              alt={selectedMember?.name}
              className="w-24 h-24 rounded-xl object-cover mx-auto"
            />
            <p className="text-muted-foreground leading-relaxed text-sm">{selectedMember?.bio}</p>
            
            <div className="flex items-center gap-3 pt-4 justify-center">
              {selectedMember?.linkedin && (
                <a 
                  href={selectedMember.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              )}
              {selectedMember?.email && (
                <a 
                  href={`mailto:${selectedMember.email}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Team;
