import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Award, BookOpen, Users, GraduationCap, X, Star, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

// Import instructor images
import instructorMichael from "@/assets/instructor-michael.jpg";
import instructorSarah from "@/assets/instructor-sarah.jpg";
import instructorJames from "@/assets/instructor-james.jpg";
import instructorPriya from "@/assets/instructor-priya.jpg";
import instructorAlex from "@/assets/instructor-alex.jpg";

interface Instructor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  image: string;
  shortBio: string;
  fullBio: string;
  achievements: string[];
  yearsExperience: number;
  studentsHelped: string;
}

const instructors: Instructor[] = [
  {
    id: "instructor-1",
    name: "Dr. Michael Thompson",
    title: "Senior Cybersecurity Instructor",
    specialty: "AI & Deepfake Detection",
    image: instructorMichael,
    shortBio: "At 45, a dynamic FBI cyber analyst veteran with 20+ years protecting families from digital threats.",
    fullBio: "At 45, Dr. Michael Thompson brings two decades of FBI Cyber Division experience to his teaching. Specializing in fraud prevention and digital forensics, he's dedicated his career to educating families about emerging cyber threats. His approachable teaching style makes complex security concepts easy to understand for people of all ages. He's passionate about protecting seniors from scams and has developed several of our most popular workshop programs.",
    achievements: [
      "FBI Distinguished Service Medal",
      "Author of 'Digital Defense for Families'",
      "Trained 50,000+ individuals nationwide",
      "PhD in Computer Science, MIT"
    ],
    yearsExperience: 20,
    studentsHelped: "50,000+"
  },
  {
    id: "instructor-2",
    name: "Margaret Stevens",
    title: "Family Safety Specialist",
    specialty: "Senior & Family Protection",
    image: instructorSarah,
    shortBio: "Dedicated to making cybersecurity accessible for seniors and multi-generational families.",
    fullBio: "Margaret Stevens brings warmth and patience to every classroom. With a background in social work and technology education, she understands the unique challenges that seniors face in the digital world. Her programs are designed with empathy, ensuring everyone feels comfortable asking questions and learning at their own pace. Margaret has been instrumental in developing our senior-focused curriculum and family workshop series.",
    achievements: [
      "AARP Cybersecurity Educator of the Year",
      "Masters in Gerontology Technology",
      "Created 'Scam-Proof Seniors' program",
      "Featured in NBC News safety segment"
    ],
    yearsExperience: 20,
    studentsHelped: "30,000+"
  },
  {
    id: "instructor-3",
    name: "Robert Mitchell",
    title: "Corporate Security Trainer",
    specialty: "Business & Enterprise Security",
    image: instructorJames,
    shortBio: "At 45, a Fortune 500 security consultant helping businesses protect their teams and data.",
    fullBio: "At 45, Robert Mitchell has consulted for some of the world's largest corporations on cybersecurity training and awareness programs. His engaging presentation style and real-world case studies make security training memorable and actionable. He specializes in helping organizations build a culture of security awareness, from the C-suite to front-line employees. His business protection workshops are trusted by companies nationwide.",
    achievements: [
      "CISSP & CISM Certified",
      "Consulted for Fortune 500 companies",
      "Keynote speaker at DEF CON",
      "MBA, Stanford University"
    ],
    yearsExperience: 20,
    studentsHelped: "25,000+"
  },
  {
    id: "instructor-4",
    name: "Dr. Catherine Brooks",
    title: "Digital Wellness Expert",
    specialty: "Privacy & Social Media Safety",
    image: instructorPriya,
    shortBio: "Helping families navigate social media, privacy settings, and online reputation safely.",
    fullBio: "Dr. Catherine Brooks combines her psychology background with deep technical knowledge to help families understand the emotional and practical aspects of online safety. Her research on social engineering and manipulation tactics has been published in leading journals. Catherine is especially passionate about helping parents protect their children online while maintaining healthy digital relationships.",
    achievements: [
      "Published researcher in Cyber Psychology",
      "TEDx Speaker on Digital Wellness",
      "Author of 'Connected & Protected'",
      "PhD in Behavioral Science"
    ],
    yearsExperience: 15,
    studentsHelped: "20,000+"
  },
  {
    id: "instructor-5",
    name: "David Anderson",
    title: "Emerging Threats Analyst",
    specialty: "AI Scams & Modern Threats",
    image: instructorAlex,
    shortBio: "At 55, a seasoned expert on cutting-edge AI scams, voice cloning, and next-generation threats.",
    fullBio: "At 55, David Anderson represents experienced leadership in cybersecurity education. With extensive hands-on experience tracking emerging threats and a finger on the pulse of new scam tactics, David brings seasoned perspectives to our workshop programs. His deep understanding of both traditional and modern technology makes him uniquely qualified to teach about evolving threats. His workshops on AI-powered scams, voice cloning detection, and cryptocurrency fraud are among our most requested sessions.",
    achievements: [
      "Certified Ethical Hacker (CEH)",
      "Contributor to WIRED Magazine",
      "Developed AI scam detection tools",
      "BS Computer Science, Carnegie Mellon"
    ],
    yearsExperience: 25,
    studentsHelped: "35,000+"
  }
];

export const InstructorShowcase = () => {
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);

  return (
    <>
      <section className="py-16 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-10">
              <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-white text-base px-5 py-2">
                <GraduationCap className="w-5 h-5 mr-1.5" /> MEET YOUR INSTRUCTORS
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Learn From Industry Experts
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Our instructors combine decades of real-world experience with a passion for teaching. 
                Click on any instructor to learn more about their background and expertise.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
            {instructors.map((instructor, index) => (
              <ScrollReveal key={instructor.id} delay={index * 100}>
                <Card 
                  className="group p-4 text-center cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50 hover:border-primary/30 bg-card"
                  onClick={() => setSelectedInstructor(instructor)}
                >
                  {/* Photo */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
                    <img 
                      src={instructor.image} 
                      alt={instructor.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Name */}
                  <h3 className="font-bold text-sm md:text-base mb-1 group-hover:text-primary transition-colors line-clamp-1">
                    {instructor.name}
                  </h3>
                  
                  {/* Title */}
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                    {instructor.title}
                  </p>
                  
                  {/* Specialty Badge */}
                  <Badge variant="secondary" className="text-[10px] md:text-xs">
                    {instructor.specialty}
                  </Badge>
                  
                  {/* View Bio Hint */}
                  <p className="text-xs text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    View Bio →
                  </p>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* Instructor Note */}
          <ScrollReveal delay={500}>
            <div className="mt-10 text-center">
              <p className="text-sm text-muted-foreground">
                All instructors are background-checked and certified in their specialties. 
                <br className="hidden md:block" />
                <span className="text-primary font-medium">Combined experience: 80+ years • Students helped: 140,000+</span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Instructor Detail Modal */}
      <Dialog open={!!selectedInstructor} onOpenChange={() => setSelectedInstructor(null)}>
        <DialogContent className="max-w-lg p-0 overflow-hidden bg-card">
          <DialogTitle className="sr-only">{selectedInstructor?.name} - Instructor Profile</DialogTitle>
          <DialogDescription className="sr-only">
            View the biography, achievements, and experience of {selectedInstructor?.name}
          </DialogDescription>
          
          {/* Close button */}
          <button
            onClick={() => setSelectedInstructor(null)}
            className="absolute top-3 right-3 z-50 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {selectedInstructor && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header with Photo */}
              <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-5 text-center border-b">
                <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden ring-4 ring-primary/30 shadow-xl">
                  <img 
                    src={selectedInstructor.image} 
                    alt={selectedInstructor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold mb-1">{selectedInstructor.name}</h2>
                <p className="text-sm text-muted-foreground mb-2">{selectedInstructor.title}</p>
                <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                  {selectedInstructor.specialty}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">
                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                    <Briefcase className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Experience</p>
                      <p className="font-bold text-sm">{selectedInstructor.yearsExperience} Years</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                    <Users className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Students</p>
                      <p className="font-bold text-sm">{selectedInstructor.studentsHelped}</p>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    About
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedInstructor.fullBio}
                  </p>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    Achievements
                  </h3>
                  <ul className="space-y-1.5">
                    {selectedInstructor.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Star className="w-3 h-3 text-chart-4 mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Button className="w-full" onClick={() => setSelectedInstructor(null)}>
                  Book a Session with {selectedInstructor.name.split(' ')[0]}
                </Button>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
