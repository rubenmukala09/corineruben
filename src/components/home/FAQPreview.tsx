import { motion } from "framer-motion";
import { HelpCircle, ArrowRight, MessageCircle, BookOpen, ChevronDown, Phone, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import supportAgent from "@/assets/support-agent.jpg";

const faqs = [
  {
    question: "How does ScamShield AI actually protect me?",
    answer: "ScamShield uses advanced AI to analyze incoming calls, texts, and emails in real-time. When it detects suspicious patterns—like known scam phone numbers, phishing language, or AI-cloned voices—it immediately alerts you and blocks the threat before you can be fooled.",
    icon: Shield
  },
  {
    question: "Is my personal data safe with InVision Network?",
    answer: "Absolutely. We use military-grade encryption and never sell your data. As a veteran-owned company, we take security personally. Your information is stored securely and only used to protect you from scams.",
    icon: Shield
  },
  {
    question: "What makes you different from other cybersecurity companies?",
    answer: "We're local (Ohio-based), veteran-owned, and focused specifically on protecting families and seniors from AI-powered scams. We don't just provide software—we provide education, support, and a personal relationship with our clients.",
    icon: Shield
  },
  {
    question: "Can I protect my elderly parents who aren't tech-savvy?",
    answer: "Yes! That's exactly who we designed ScamShield for. Our Family plan covers up to 5 members, and we provide simple setup assistance. Many of our clients are seniors or their family members who want to protect loved ones.",
    icon: Shield
  },
  {
    question: "What if I've already been scammed?",
    answer: "Contact us immediately. We offer recovery assistance and can help you report the scam to authorities, secure your accounts, and prevent future attacks. Our Premium plan includes identity theft insurance for additional protection.",
    icon: Shield
  }
];

export const FAQPreview = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-muted/30 via-background to-background">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left - Header & Support Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 lg:sticky lg:top-24 space-y-8"
          >
            <div>
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <HelpCircle className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">FAQ</span>
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Got{" "}
                <span className="text-primary">Questions?</span>
                <br />
                We've Got Answers
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Protecting your family from scams is a serious decision. Here's what you need to know.
              </p>
            </div>

            {/* Support Agent Card */}
            <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
              
              <div className="relative p-6">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img 
                      src={supportAgent} 
                      alt="Support specialist" 
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-primary/20"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background" />
                  </motion.div>
                  <div>
                    <h4 className="font-bold text-lg">Talk to a Human</h4>
                    <p className="text-sm text-muted-foreground">Real experts, not bots</p>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-6">
                  Our Ohio-based team is ready to answer your questions and help you find the right protection for your family.
                </p>

                <div className="space-y-3">
                  <Button asChild className="w-full group">
                    <Link to="/contact">
                      <MessageCircle className="mr-2 w-5 h-5" />
                      Chat With Expert
                      <ArrowRight className="ml-auto w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="w-full group">
                    <a href="tel:+1234567890">
                      <Phone className="mr-2 w-5 h-5" />
                      Call Now
                    </a>
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Free consultations • No pressure • Real answers
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Right - FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <AccordionItem 
                    value={`item-${index}`} 
                    className="group border-2 border-border rounded-2xl px-6 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 data-[state=open]:bg-card data-[state=open]:border-primary/40 data-[state=open]:shadow-lg"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline py-6 text-lg group-data-[state=open]:text-primary transition-colors">
                      <div className="flex items-center gap-4 pr-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-data-[state=open]:bg-primary/20 transition-colors">
                          <span className="text-primary font-bold">{index + 1}</span>
                        </div>
                        {faq.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6 pl-14 text-base leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8 text-center"
            >
              <Button asChild variant="ghost" size="lg" className="group">
                <Link to="/resources#faq">
                  <BookOpen className="mr-2 w-5 h-5" />
                  View All FAQs
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
