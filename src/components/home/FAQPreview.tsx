import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SITE } from "@/config/site";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const faqs = [
  {
    question: "How does ScamShield AI protect me?",
    answer:
      "ScamShield uses AI to analyze incoming calls, texts, and emails in real time. When it detects suspicious patterns, known scam numbers, phishing language, or cloned voices, it alerts you and blocks the threat.",
  },
  {
    question: "Is my personal data safe with InVision Network?",
    answer:
      "Yes. We use encryption and never sell your data. As a veteran-supporting company, we take security personally. Your information is stored securely and only used to protect you from scams.",
  },
  {
    question: "What makes you different from other companies?",
    answer:
      "We are Ohio-based, veteran-supporting, and focused on protecting families and seniors from AI-powered scams. We provide education, support, and a personal relationship with every client.",
  },
  {
    question:
      "I want to protect my elderly parents who are not tech-savvy. Is this for them?",
    answer:
      "Yes. That is exactly who we designed ScamShield for. Our Family plan covers up to 5 members, and we provide simple setup assistance. Many of our clients are seniors or their family members.",
  },
];

export const FAQPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-16 md:py-24" aria-labelledby="faq-heading" ref={ref}>
      <div className="container mx-auto px-4 md:px-6 lg:px-12 max-w-5xl">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Left sidebar */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                FAQ
              </p>
              <h2
                id="faq-heading"
                className="text-3xl md:text-4xl font-bold text-foreground leading-[1.1] mb-3"
              >
                Got Questions?
              </h2>
              <p className="text-muted-foreground text-base">
                Protecting your family from scams is a big decision. Here is
                what you need to know.
              </p>
            </div>

            {/* Support card — 3D lift */}
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 16px 32px -8px hsl(288 25% 20% / 0.12)" }}
              className="rounded-2xl border border-border/60 bg-card p-5 shadow-md"
            >
              <h3 className="font-bold text-foreground text-sm mb-1">
                Talk to a Human
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Real experts, not bots
              </p>
              <div className="flex flex-col gap-2">
                <Button
                  asChild
                  size="sm"
                  className="w-full rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Link to="/contact">Chat With Expert</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full rounded-lg"
                >
                  <a href={`tel:${SITE.phone.e164}`}>
                    <Phone className="w-4 h-4 mr-2" /> Call Now
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Accordion */}
          <motion.div
            className="lg:col-span-3 space-y-3"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left font-bold text-foreground hover:no-underline px-5 py-4">
                    <span className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary">
                        {index + 1}
                      </span>
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground pb-4 px-5 pl-[3.25rem]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="text-center pt-2">
              <Link
                to="/faq"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline transition-colors"
              >
                View All FAQs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
