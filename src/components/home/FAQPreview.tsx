import { motion } from "framer-motion";
import { HelpCircle, ArrowRight, MessageCircle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does ScamShield AI actually protect me?",
    answer: "ScamShield uses advanced AI to analyze incoming calls, texts, and emails in real-time. When it detects suspicious patterns—like known scam phone numbers, phishing language, or AI-cloned voices—it immediately alerts you and blocks the threat before you can be fooled."
  },
  {
    question: "Is my personal data safe with InVision Network?",
    answer: "Absolutely. We use military-grade encryption and never sell your data. As a veteran-owned company, we take security personally. Your information is stored securely and only used to protect you from scams."
  },
  {
    question: "What makes you different from other cybersecurity companies?",
    answer: "We're local (Ohio-based), veteran-owned, and focused specifically on protecting families and seniors from AI-powered scams. We don't just provide software—we provide education, support, and a personal relationship with our clients."
  },
  {
    question: "Can I protect my elderly parents who aren't tech-savvy?",
    answer: "Yes! That's exactly who we designed ScamShield for. Our Family plan covers up to 5 members, and we provide simple setup assistance. Many of our clients are seniors or their family members who want to protect loved ones."
  },
  {
    question: "What if I've already been scammed?",
    answer: "Contact us immediately. We offer recovery assistance and can help you report the scam to authorities, secure your accounts, and prevent future attacks. Our Premium plan includes identity theft insurance for additional protection."
  }
];

export const FAQPreview = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Header & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-24"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Common Questions</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Got Questions?{" "}
              <span className="text-primary">We've Got Answers</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We understand that protecting your family from scams is a serious decision. 
              Here are the questions we hear most often.
            </p>
            
            <div className="space-y-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/contact">
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Talk to an Expert
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto ml-0 sm:ml-4">
                <Link to="/resources">
                  <BookOpen className="mr-2 w-5 h-5" />
                  Browse Resources
                </Link>
              </Button>
            </div>
            
            {/* Trust indicator */}
            <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Free consultations available.</span>
                {" "}Schedule a call with our security experts to discuss your specific situation.
              </p>
            </div>
          </motion.div>

          {/* Right - FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <AccordionItem 
                    value={`item-${index}`} 
                    className="border border-border rounded-xl px-6 bg-card/50 hover:bg-card transition-colors data-[state=open]:bg-card data-[state=open]:border-primary/30"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
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
              className="mt-6 text-center"
            >
              <Button asChild variant="ghost">
                <Link to="/resources#faq">
                  View All FAQs
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
