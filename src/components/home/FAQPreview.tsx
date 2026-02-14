import { HelpCircle, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SITE } from "@/config/site";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import supportAgent from "@/assets/support-agent.jpg";

const faqs = [
  { question: "How does ScamShield AI protect me?", answer: "ScamShield uses AI to analyze incoming calls, texts, and emails in real time. When it detects suspicious patterns, known scam numbers, phishing language, or cloned voices, it alerts you and blocks the threat." },
  { question: "Is my personal data safe with InVision Network?", answer: "Yes. We use encryption and never sell your data. As a veteran-supporting company, we take security personally. Your information is stored securely and only used to protect you from scams." },
  { question: "What makes you different from other companies?", answer: "We are Ohio-based, veteran-supporting, and focused on protecting families and seniors from AI-powered scams. We provide education, support, and a personal relationship with every client." },
  { question: "I want to protect my elderly parents who are not tech-savvy. Is this for them?", answer: "Yes. That is exactly who we designed ScamShield for. Our Family plan covers up to 5 members, and we provide simple setup assistance. Many of our clients are seniors or their family members." },
];

export const FAQPreview = () => {
  return (
    <section className="py-16 lg:py-20" aria-labelledby="faq-heading">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-5">
                <HelpCircle className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary">FAQ</span>
              </div>
              <h2 id="faq-heading" className="text-3xl md:text-4xl font-black text-foreground leading-tight mb-3">
                Got <span className="text-primary">Questions?</span><br />
                We Have Answers
              </h2>
              <p className="text-muted-foreground text-base">
                Protecting your family from scams is a big decision. Here is what you need to know.
              </p>
            </div>

            <div className="bg-card rounded-2xl border border-border/60 p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20">
                    <img src={supportAgent} alt="Support specialist" className="w-full h-full object-cover" width={80} height={80} loading="lazy" decoding="async" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-card" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Talk to a Human</h3>
                  <p className="text-xs text-muted-foreground">Real experts, not bots. Available now</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Our Ohio-based team is ready to answer your questions and help you find the right protection.
              </p>
              <div className="flex flex-col gap-2">
                <Button asChild className="w-full rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 hover:scale-105 active:scale-95 transition-all">
                  <Link to="/contact">Chat With Expert</Link>
                </Button>
                <Button asChild variant="outline" className="w-full rounded-full hover:scale-105 active:scale-95 transition-all">
                  <a href={`tel:${SITE.phone.e164}`}>
                    <Phone className="w-4 h-4 mr-2" /> Call Now
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="bg-card rounded-2xl border border-border/60 px-5 data-[state=open]:border-primary/30 data-[state=open]:shadow-md transition-all">
                  <AccordionTrigger className="text-left font-bold text-foreground hover:no-underline py-5">
                    <span className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0 text-sm font-black text-primary">{index + 1}</span>
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground pb-5 pl-11">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="text-center pt-2">
              <Link to="/faq" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors">
                View All FAQs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};