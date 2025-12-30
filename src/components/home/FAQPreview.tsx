import { motion } from "framer-motion";
import { HelpCircle, ArrowRight, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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
    answer: "ScamShield uses advanced AI to analyze incoming calls, texts, and emails in real-time. When it detects suspicious patterns—like known scam phone numbers, phishing language, or AI-cloned voices—it immediately alerts you and blocks the threat.",
  },
  {
    question: "Is my personal data safe with InVision Network?",
    answer: "Absolutely. We use military-grade encryption and never sell your data. As a veteran-owned company, we take security personally. Your information is stored securely and only used to protect you from scams.",
  },
  {
    question: "What makes you different from other companies?",
    answer: "We're local (Ohio-based), veteran-owned, and focused specifically on protecting families and seniors from AI-powered scams. We don't just provide software—we provide education, support, and a personal relationship with our clients.",
  },
  {
    question: "Can I protect my elderly parents who aren't tech-savvy?",
    answer: "Yes! That's exactly who we designed ScamShield for. Our Family plan covers up to 5 members, and we provide simple setup assistance. Many of our clients are seniors or their family members who want to protect loved ones.",
  },
];

export const FAQPreview = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-primary/5" />
      <div className="absolute bottom-20 left-20 w-24 h-24 rounded-full bg-accent/10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Header & Support Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-24 space-y-8"
          >
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
                FAQ
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                Got{" "}
                <span className="text-primary">Questions?</span>
                <br />
                We've Got Answers
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Protecting your family from scams is a serious decision. Here's what you need to know.
              </p>
            </div>

            {/* Support Agent Card */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-4 mb-6">
                {/* Circular image with decorations */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20">
                    <img
                      src={supportAgent}
                      alt="Support specialist"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background" />
                  <div className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-foreground">Talk to a Human</h4>
                  <p className="text-sm text-muted-foreground">Real experts, not bots</p>
                </div>
              </div>

              <p className="text-muted-foreground text-sm mb-6">
                Our Ohio-based team is ready to answer your questions and help you find the right protection.
              </p>

              <div className="flex flex-col gap-3">
                <Button asChild className="w-full rounded-full">
                  <Link to="/contact">
                    <MessageCircle className="mr-2 w-5 h-5" />
                    Chat With Expert
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full rounded-full">
                  <a href="tel:+1234567890">
                    <Phone className="mr-2 w-5 h-5" />
                    Call Now
                  </a>
                </Button>
              </div>
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
                  transition={{ delay: index * 0.1 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="group border border-border rounded-xl px-6 bg-card hover:border-primary/30 transition-all duration-300 data-[state=open]:border-primary/40 data-[state=open]:shadow-lg"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline py-5 text-foreground group-data-[state=open]:text-primary transition-colors">
                      <div className="flex items-center gap-4 pr-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-data-[state=open]:bg-primary/20 transition-colors">
                          <span className="text-primary font-bold text-sm">{index + 1}</span>
                        </div>
                        {faq.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 pl-12 text-base leading-relaxed">
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
              <Button asChild variant="ghost" size="lg" className="rounded-full">
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
