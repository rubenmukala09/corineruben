import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import TestimonialCard from "@/components/TestimonialCard";
import CTASection from "@/components/CTASection";
import ThreePathsForward from "@/components/ThreePathsForward";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, FileText, MessageSquare, Users, StopCircle, Search, Phone, DollarSign, FileCheck, Shield, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-homepage.jpg";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";
import testimonial5 from "@/assets/testimonial-5.jpg";
import testimonial6 from "@/assets/testimonial-6.jpg";
import testimonial7 from "@/assets/testimonial-7.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <Hero
        useTransitioningBackground={true}
        headline="Protect Your Family from AI-Powered Scams"
        subheadline="Simple, respectful training for adults 40+ and families. Learn to spot deepfakes, phishing, and AI fraud—no tech degree required."
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild variant="default" size="xl">
            <Link to="/training">BOOK TRAINING</Link>
          </Button>
          <Button asChild variant="outlineLight" size="xl">
            <Link to="/scam-shield">START SCAM SHIELD</Link>
          </Button>
          <Button asChild variant="outlineLight" size="xl">
            <Link to="/contact">TALK TO AN EXPERT</Link>
          </Button>
        </div>
      </Hero>

      <TrustBar />

      {/* Why Families Trust InVision Network */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-center mb-12 animate-fade-in-up">Why Families Trust InVision Network</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm" style={{ animationDelay: '0ms' }}>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <Heart className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <h3 className="text-xl mb-3 text-center group-hover:text-primary transition-colors duration-300">Privacy-First Protocols</h3>
              <p className="text-muted-foreground text-center">
                We NEVER ask for passwords, bank info, or Social Security numbers. Your data stays 100% private. No recording, no data selling.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm" style={{ animationDelay: '100ms' }}>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <MessageSquare className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <h3 className="text-xl mb-3 text-center group-hover:text-primary transition-colors duration-300">Plain-English Teaching</h3>
              <p className="text-muted-foreground text-center">
                No jargon, no condescension. Real-world examples, step-by-step guidance. If you can use email, you can master our training.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm" style={{ animationDelay: '200ms' }}>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <FileText className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <h3 className="text-xl mb-3 text-center group-hover:text-primary transition-colors duration-300">Emergency-Ready Scripts</h3>
              <p className="text-muted-foreground text-center">
                Walk away with word-for-word scripts for bank fraud, IRS scams, and family emergency cons. The 60-Second Pause Protocol™ that works.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm" style={{ animationDelay: '300ms' }}>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <Users className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <h3 className="text-xl mb-3 text-center group-hover:text-primary transition-colors duration-300">Senior-Friendly Design</h3>
              <p className="text-muted-foreground text-center">
                Large text, clear buttons, patient instructors. Designed WITH seniors, not just FOR them. Ages 40-90 welcome.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Three Paths Forward */}
      <ThreePathsForward />

      {/* The 60-Second Pause Protocol */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 right-20 w-64 h-64 bg-accent/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="mb-4">The 60-Second Pause Protocol™</h2>
            <p className="text-xl text-muted-foreground">Stop Scams Before They Start</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              { icon: StopCircle, title: "STOP & BREATHE", desc: "Don't act immediately. Scammers create urgency to bypass your judgment." },
              { icon: Search, title: "VERIFY IDENTITY", desc: "Ask specific questions only the real person would know. Demand full name, department, callback number." },
              { icon: Phone, title: "CALL BACK OFFICIAL NUMBER", desc: "Use the number on your bank card, official website, or phone book—NEVER the number they give you." },
              { icon: Users, title: "USE FAMILY SAFE-WORD", desc: "Establish a secret word/phrase with family. No safe-word? No action." },
              { icon: DollarSign, title: "DOUBLE-CHECK MONEY REQUESTS", desc: "If anyone asks for money, gift cards, wire transfers—verify through a SECOND channel (text, in-person, trusted number)." },
              { icon: FileCheck, title: "DOCUMENT & REPORT", desc: "Write down details: time, caller info, what they said. Report to FTC, your bank, and local police if needed." },
              { icon: Shield, title: "FORWARD TO INVISION (MEMBERS)", desc: "Scam Shield members: Send us the suspicious item for professional analysis." },
            ].map((step, index) => (
              <Card key={index} className="p-6 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <step.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      Step {index + 1}: {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-1/3 left-10 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s' }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-center mb-12 animate-fade-in-up">What Makes Us Different from Free Resources</h2>
          <div className="max-w-5xl mx-auto overflow-x-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <table className="w-full bg-card rounded-2xl shadow-strong border border-border/50 hover:shadow-2xl transition-shadow duration-500">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 text-left font-bold">What You Need</th>
                  <th className="p-4 text-left font-bold">Free Resources</th>
                  <th className="p-4 text-left font-bold bg-gradient-to-br from-primary/5 to-accent/5">InVision Network</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { need: "Personalized Training", free: "Generic articles", invision: "Live Zoom classes tailored to YOUR situation" },
                  { need: "Hands-On Practice", free: "Read and hope", invision: "Practice spotting deepfakes & phishing in real-time" },
                  { need: "Ongoing Support", free: "One-time info", invision: "Monthly helpline to verify suspicious items" },
                  { need: "Emergency Scripts", free: "Vague advice", invision: "Word-for-word scripts you can read during a scam call" },
                  { need: "AI-Specific Training", free: "Limited", invision: "Deepfake voice detection, AI image recognition, QR safety" },
                  { need: "Family Plans", free: "Generic", invision: "Spouse included FREE in some plans" },
                  { need: "Certificate", free: "None", invision: "Digital certificate proving you're trained" },
                ].map((row, index) => (
                <tr key={index} className="border-b border-border last:border-0 hover:bg-muted/30 transition-all duration-300 hover:scale-[1.01] group">
                  <td className="p-4 font-medium group-hover:text-primary transition-colors duration-300">{row.need}</td>
                  <td className="p-4 text-muted-foreground">{row.free}</td>
                  <td className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-300">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                      <span className="group-hover:text-foreground transition-colors duration-300">{row.invision}</span>
                    </div>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="default" size="lg">
              <Link to="/training">COMPARE OUR TRAINING PROGRAMS</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-accent/25 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-primary/25 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-center mb-12 animate-fade-in-up">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="animate-fade-in-up" style={{ animationDelay: '0ms' }}>
              <TestimonialCard
                name="Mary Thompson"
                age="68"
                location="Columbus, OH"
                quote="I almost fell for a deepfake 'grandson in jail' call. Thanks to InVision's 60-Second Pause Protocol, I stopped, verified, and realized it was a scam. This training saved me $8,000!"
                image={testimonial1}
              />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              <TestimonialCard
                name="Robert & Linda K."
                age="72 & 70"
                location="Dayton, OH"
                quote="My husband and I took the Flexible Zoom class. The instructor was patient, clear, and funny. We feel 100% safer online now. Worth every penny."
                image={testimonial2}
              />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <TestimonialCard
                name="James Patterson"
                location="Cincinnati"
                quote="As a small business owner, InVision's pre-purchase consulting saved me from a $7,000 mistake on an AI chatbot. They recommended a better solution at half the cost."
                image={testimonial3}
              />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '450ms' }}>
              <TestimonialCard
                name="Susan Martinez"
                age="65"
                location="Toledo, OH"
                quote="The Scam Shield service caught a phishing email that looked exactly like my bank. I would have clicked it without thinking. Now I forward anything suspicious before taking action."
                image={testimonial5}
              />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <TestimonialCard
                name="William Chen"
                age="78"
                location="Akron, OH"
                quote="I'm not tech-savvy, but the in-person training made everything click. They taught me how to spot AI voice clones and fake videos. My daughter finally stopped worrying about me!"
                image={testimonial6}
              />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '750ms' }}>
              <TestimonialCard
                name="Jennifer Wallace"
                age="58"
                location="Cleveland, OH"
                quote="After my mother nearly lost $15,000 to a scammer, I signed our whole family up for training. It's been a lifesaver. Everyone knows the 60-Second Pause Protocol now."
                image={testimonial7}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="py-20 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute bottom-1/4 right-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s' }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-center mb-12 animate-fade-in-up">Common Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "Is this only for seniors?",
                a: "Not at all! While we specialize in adults 40+, anyone who wants AI scam protection is welcome. We've trained ages 35-85.",
              },
              {
                q: "Do you ask for my passwords?",
                a: "NEVER. We teach verification techniques without ever requesting sensitive data. If anyone claiming to be InVision asks for passwords, it's a scam.",
              },
              {
                q: "What if I'm not tech-savvy?",
                a: "Perfect! Our training assumes zero technical knowledge. If you can use email, you're ready.",
              },
            ].map((faq, index) => (
              <Card key={index} className="p-6 rounded-2xl hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50" style={{ animationDelay: `${index * 100}ms` }}>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <Link to="/resources#faq" className="text-primary hover:text-primary/80 font-semibold text-lg inline-flex items-center gap-2 hover:gap-4 transition-all duration-300 hover:scale-105">
              VIEW ALL FAQ →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection headline="Ready to Protect Your Family?" variant="gold">
        <Button asChild variant="gold" size="xl">
          <Link to="/training">BOOK TRAINING</Link>
        </Button>
        <Button asChild variant="outlineLight" size="xl">
          <Link to="/scam-shield">START SCAM SHIELD</Link>
        </Button>
        <Button asChild variant="outlineLight" size="xl">
          <Link to="/resources">GET FREE SECURITY CHECKLIST</Link>
        </Button>
      </CTASection>

      <Footer />
    </div>
  );
};

export default Index;
