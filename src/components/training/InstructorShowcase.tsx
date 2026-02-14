import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Award,
  BookOpen,
  Users,
  GraduationCap,
  X,
  Star,
  Briefcase,
} from "lucide-react";
import { motion } from "framer-motion";

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
    fullBio: "At 45, Dr. Michael Thompson brings two decades of FBI Cyber Division experience to his teaching. Specializing in fraud prevention and digital forensics, he's dedicated his career to educating families about emerging cyber threats. His approachable teaching style makes complex security concepts easy to understand for people of all ages.",
    achievements: ["FBI Distinguished Service Medal", "Author of 'Digital Defense for Families'", "Trained 50,000+ individuals nationwide", "PhD in Computer Science, MIT"],
    yearsExperience: 20,
    studentsHelped: "50,000+",
  },
  {
    id: "instructor-2",
    name: "Margaret Stevens",
    title: "Family Safety Specialist",
    specialty: "Senior & Family Protection",
    image: instructorSarah,
    shortBio: "Dedicated to making cybersecurity accessible for seniors and multi-generational families.",
    fullBio: "Margaret Stevens brings warmth and patience to every classroom. With a background in social work and technology education, she understands the unique challenges that seniors face in the digital world. Her programs are designed with empathy, ensuring everyone feels comfortable asking questions.",
    achievements: ["AARP Cybersecurity Educator of the Year", "Masters in Gerontology Technology", "Created 'Scam-Proof Seniors' program", "Featured in NBC News safety segment"],
    yearsExperience: 20,
    studentsHelped: "30,000+",
  },
  {
    id: "instructor-3",
    name: "Robert Mitchell",
    title: "Corporate Security Trainer",
    specialty: "Business & Enterprise Security",
    image: instructorJames,
    shortBio: "At 45, a Fortune 500 security consultant helping businesses protect their teams and data.",
    fullBio: "At 45, Robert Mitchell has consulted for some of the world's largest corporations on cybersecurity training and awareness programs. His engaging presentation style and real-world case studies make security training memorable and actionable.",
    achievements: ["CISSP & CISM Certified", "Consulted for Fortune 500 companies", "Keynote speaker at DEF CON", "MBA, Stanford University"],
    yearsExperience: 20,
    studentsHelped: "25,000+",
  },
  {
    id: "instructor-4",
    name: "Dr. Catherine Brooks",
    title: "Digital Wellness Expert",
    specialty: "Privacy & Social Media Safety",
    image: instructorPriya,
    shortBio: "Helping families navigate social media, privacy settings, and online reputation safely.",
    fullBio: "Dr. Catherine Brooks combines her psychology background with deep technical knowledge to help families understand the emotional and practical aspects of online safety. Her research on social engineering and manipulation tactics has been published in leading journals.",
    achievements: ["Published researcher in Cyber Psychology", "TEDx Speaker on Digital Wellness", "Author of 'Connected & Protected'", "PhD in Behavioral Science"],
    yearsExperience: 15,
    studentsHelped: "20,000+",
  },
  {
    id: "instructor-5",
    name: "David Anderson",
    title: "Emerging Threats Analyst",
    specialty: "AI Scams & Modern Threats",
    image: instructorAlex,
    shortBio: "At 55, a seasoned expert on cutting-edge AI scams, voice cloning, and next-generation threats.",
    fullBio: "At 55, David Anderson represents experienced leadership in cybersecurity education. With extensive hands-on experience tracking emerging threats, David brings seasoned perspectives to our workshop programs. His workshops on AI-powered scams, voice cloning detection, and cryptocurrency fraud are among our most requested sessions.",
    achievements: ["Certified Ethical Hacker (CEH)", "Contributor to WIRED Magazine", "Developed AI scam detection tools", "BS Computer Science, Carnegie Mellon"],
    yearsExperience: 25,
    studentsHelped: "35,000+",
  },
];

export const InstructorShowcase = () => {
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);

  return (
    <>
      <section className="py-10 sm:py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="text-center mb-14">
            <span className="inline-block text-[11px] uppercase tracking-[0.15em] font-bold text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4">
              Meet Your Instructors
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
              Learn From Industry <span className="text-primary">Experts</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our instructors combine decades of real-world experience with a passion for teaching.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
            {instructors.map((instructor) => (
              <div
                key={instructor.id}
                className="group p-5 text-center cursor-pointer bg-card border border-border/60 rounded-2xl shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 hover:-translate-y-1"
                onClick={() => setSelectedInstructor(instructor)}
              >
                <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 rounded-full overflow-hidden ring-2 ring-border group-hover:ring-primary/40 transition-all">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-bold text-sm md:text-base mb-1 text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {instructor.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                  {instructor.title}
                </p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                  {instructor.specialty}
                </span>
                <p className="text-xs text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                  View Bio →
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-6 sm:gap-10 bg-card border border-border/60 rounded-2xl px-6 sm:px-10 py-4 shadow-sm">
              <div className="text-center">
                <p className="text-2xl font-black text-primary">80+</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Years Combined</p>
              </div>
              <div className="w-px h-10 bg-border/60" />
              <div className="text-center">
                <p className="text-2xl font-black text-primary">140K+</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Students Helped</p>
              </div>
              <div className="w-px h-10 bg-border/60" />
              <div className="text-center">
                <p className="text-2xl font-black text-primary">5</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Specialists</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Detail Modal */}
      <Dialog open={!!selectedInstructor} onOpenChange={() => setSelectedInstructor(null)}>
        <DialogContent className="max-w-lg p-0 overflow-hidden bg-card border border-border/60">
          <DialogTitle className="sr-only">
            {selectedInstructor?.name} - Instructor Profile
          </DialogTitle>
          <DialogDescription className="sr-only">
            View the biography, achievements, and experience of {selectedInstructor?.name}
          </DialogDescription>

          <button
            onClick={() => setSelectedInstructor(null)}
            className="absolute top-3 right-3 z-50 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {selectedInstructor && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-muted/50 p-5 text-center border-b border-border/60">
                <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden ring-3 ring-primary/30">
                  <img
                    src={selectedInstructor.image}
                    alt={selectedInstructor.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-black text-foreground mb-1">{selectedInstructor.name}</h2>
                <p className="text-sm text-muted-foreground mb-2">{selectedInstructor.title}</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                  {selectedInstructor.specialty}
                </span>
              </div>

              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg border border-border/50">
                    <Briefcase className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Experience</p>
                      <p className="font-bold text-sm text-foreground">{selectedInstructor.yearsExperience} Years</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg border border-border/50">
                    <Users className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Students</p>
                      <p className="font-bold text-sm text-foreground">{selectedInstructor.studentsHelped}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-sm mb-2 flex items-center gap-2 text-foreground">
                    <BookOpen className="w-4 h-4 text-primary" />
                    About
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedInstructor.fullBio}</p>
                </div>

                <div>
                  <h3 className="font-bold text-sm mb-2 flex items-center gap-2 text-foreground">
                    <Award className="w-4 h-4 text-primary" />
                    Achievements
                  </h3>
                  <ul className="space-y-1.5">
                    {selectedInstructor.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Star className="w-3 h-3 text-primary mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full rounded-full font-bold" onClick={() => setSelectedInstructor(null)}>
                  Book a Session with {selectedInstructor.name.split(" ")[0]}
                </Button>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
