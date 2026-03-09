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
import { AnimatedSection } from "@/components/AnimatedSection";

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
  return (
    <section className="py-16 md:py-28 relative overflow-hidden" aria-labelledby="faq-heading">
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-12 max-w-5xl relative">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Left sidebar */}
          <AnimatedSection animation="fade-up" className="lg:col-span-2 space-y-6">
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

            {/* Support card */}
            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-3d overflow-hidden relative hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-10px_hsl(288_25%_20%/0.15)] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              <div className="relative">
                <h3 className="font-bold text-foreground text-sm mb-1">
                  Talk to a Human
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Real experts, not bots
                </p>
                <div className="flex flex-col gap-2">
                  <Button asChild size="sm" className="w-full">
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
              </div>
            </div>
          </AnimatedSection>

          {/* Accordion */}
          <AnimatedSection animation="fade-up" delay={150} className="lg:col-span-3 space-y-3">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-8px_hsl(288_25%_20%/0.1)] transition-all duration-200"
                >
                  <AccordionItem
                    value={`faq-${index}`}
                    className="rounded-2xl border border-border/50 bg-card overflow-hidden shadow-sm"
                  >
                    <AccordionTrigger className="text-left font-bold text-foreground hover:no-underline px-5 py-4">
                      <span className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary shadow-sm">
                          {index + 1}
                        </span>
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground pb-4 px-5 pl-[3.25rem]">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </div>
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
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
