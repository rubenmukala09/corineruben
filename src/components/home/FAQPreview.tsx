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
    <section className="py-16 lg:py-24 relative overflow-hidden" aria-labelledby="faq-heading">
      {/* Background orbs */}
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/5 to-accent/3 blur-[120px] pointer-events-none" />
      <div className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-gradient-to-br from-accent/5 to-primary/3 blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-5xl relative z-10">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Left sidebar - glass support card */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 backdrop-blur-sm border border-primary/15 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">FAQ</span>
              <h2 id="faq-heading" className="text-3xl md:text-4xl font-black text-foreground leading-[1.1] mb-3">
                Got <span className="text-primary">Questions?</span>
              </h2>
              <p className="text-muted-foreground text-base">
                Protecting your family from scams is a big decision. Here is what you need to know.
              </p>
            </div>

            {/* Glass support card */}
            <div className="relative rounded-2xl overflow-hidden">
              <div className="backdrop-blur-xl bg-card/70 border border-border/30 rounded-2xl p-5" style={{ boxShadow: 'var(--skeuo-shadow-ombre)' }}>
                <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
                  background: 'radial-gradient(circle at 80% 20%, hsl(var(--primary) / 0.06) 0%, transparent 50%)'
                }} />
                <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 shadow-[0_0_15px_hsl(var(--primary)/0.15)]">
                        <img src={supportAgent} alt="Support specialist" className="w-full h-full object-cover" width={80} height={80} loading="lazy" decoding="async" />
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-card shadow-[0_0_8px_hsl(152_48%_45%/0.5)]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-sm">Talk to a Human</h3>
                      <p className="text-xs text-muted-foreground">Real experts, not bots</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button asChild size="sm" className="w-full rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 shadow-[0_4px_15px_hsl(var(--primary)/0.3)]">
                      <Link to="/contact">Chat With Expert</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="w-full rounded-full backdrop-blur-sm">
                      <a href={`tel:${SITE.phone.e164}`}>
                        <Phone className="w-4 h-4 mr-2" /> Call Now
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Glass FAQ accordion */}
          <div className="lg:col-span-3 space-y-3">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="relative rounded-2xl overflow-hidden">
                  <div className="backdrop-blur-xl bg-card/70 border border-border/30 rounded-2xl px-5 data-[state=open]:border-primary/25 transition-all" style={{ boxShadow: 'var(--skeuo-shadow-ombre)' }}>
                    <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                    <AccordionTrigger className="text-left font-bold text-foreground hover:no-underline py-5 relative z-10">
                      <span className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/15 to-accent/10 backdrop-blur-sm border border-primary/10 flex items-center justify-center flex-shrink-0 text-sm font-black text-primary">{index + 1}</span>
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground pb-5 pl-11 relative z-10">
                      {faq.answer}
                    </AccordionContent>
                  </div>
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
