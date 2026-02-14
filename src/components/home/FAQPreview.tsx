import { HelpCircle, ArrowRight, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SITE } from "@/config/site";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import supportAgent from "@/assets/support-agent.jpg";
import natureCTABg from "@/assets/nature-cta-bg.jpg";
import {
  GeometricCorner,
  GridPattern,
} from "@/components/ui/GeometricDecorations";


const faqs = [
  {
    question: "How does ScamShield AI actually protect me?",
    answer:
      "ScamShield uses advanced AI to analyze incoming calls, texts, and emails in real-time. When it detects suspicious patterns (like known scam phone numbers, phishing language, or AI-cloned voices), it immediately alerts you and blocks the threat.",
  },
  {
    question: "Is my personal data safe with InVision Network?",
    answer:
      "Absolutely. We use military-grade encryption and never sell your data. As a company that supports veterans, we take security personally. Your information is stored securely and only used to protect you from scams.",
  },
  {
    question: "What makes you different from other companies?",
    answer:
      "We're local (Ohio-based), veteran-supporting, and focused specifically on protecting families and seniors from AI-powered scams. We don't just provide software. We provide education, support, and a personal relationship with our clients.",
  },
  {
    question: "Can I protect my elderly parents who aren't tech-savvy?",
    answer:
      "Yes! That's exactly who we designed ScamShield for. Our Family plan covers up to 5 members, and we provide simple setup assistance. Many of our clients are seniors or their family members who want to protect loved ones.",
  },
];

export const FAQPreview = () => {
  return (
    <section className="py-14 lg:py-20 relative overflow-hidden bg-gradient-to-br from-background via-white to-muted/20 dynamic-gradient-overlay">
      {/* Grid pattern */}
      <GridPattern />

      {/* Geometric corner accents */}
      <GeometricCorner position="top-right" variant="lines" />
      <GeometricCorner position="bottom-left" variant="dots" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left - Header & Support Card */}
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 glass-light rounded-full text-sm font-bold uppercase tracking-wider mb-5 micro-bounce skeuo-badge">
                <HelpCircle className="w-4 h-4 text-primary" />
                <span className="text-foreground">FAQ</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
                Got <span className="text-primary">Questions?</span>
                <br />
                We've Got Answers
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                Protecting your family from scams is a serious decision. Here's
                what you need to know.
              </p>
            </div>

            {/* Support Agent Card - Compact */}
            <div className="widget-premium hover-depth overflow-hidden micro-tilt-3d subtle-3d-surface">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/30 shadow-sm">
                    <img
                      src={supportAgent}
                      alt="Support specialist"
                      className="w-full h-full object-cover"
                      width={56}
                      height={56}
                    />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-green-600 rounded-full border-2 border-background flex items-center justify-center">
                    <span className="text-[8px] text-white font-bold">ON</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">
                    Talk to a Human
                  </h3>
                  <p className="text-sm text-foreground/70">
                    Real experts, not bots • Available now
                  </p>
                </div>
              </div>

              <p className="text-foreground/70 text-sm mb-4 leading-relaxed">
                Our Ohio-based team is ready to answer your questions and help
                you find the right protection.
              </p>

              <div className="flex flex-col gap-2">
                <Button
                  asChild
                  size="default"
                  className="w-full rounded-xl tactile-button"
                >
                  <Link to="/contact">
                    <MessageCircle className="mr-2 w-4 h-4" />
                    Chat With Expert
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="default"
                  className="w-full rounded-xl border-2 tactile-button"
                >
                  <a href={SITE.phone.tel}>
                    <Phone className="mr-2 w-4 h-4" />
                    Call Now
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Right - FAQ Accordion with Glassmorphism */}
          <div className="flex flex-col justify-between h-full">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="group glass-light rounded-2xl px-6 shadow-3d micro-scale data-[state=open]:shadow-3d-lg micro-tilt-3d subtle-3d-surface"
                >
                  <AccordionTrigger className="text-left font-bold hover:no-underline py-6 text-lg text-foreground group-data-[state=open]:text-primary transition-colors">
                    <div className="flex items-center gap-4 pr-4">
                      <div className="w-10 h-10 rounded-full bg-white/60 dark:bg-card/60 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-data-[state=open]:bg-primary/20 transition-colors border border-white/50">
                        <span className="text-primary font-bold text-base">
                          {index + 1}
                        </span>
                      </div>
                      {faq.question}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 pl-14 text-lg leading-relaxed font-medium">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-8 text-center">
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="rounded-2xl tactile-button"
              >
                <Link to="/faq">
                  View All FAQs
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Ready to Get Protected */}
        <div className="mt-20 relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={natureCTABg}
              alt="Beautiful nature landscape"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>

          <div className="relative z-10 p-12 md:p-20 text-center">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Ready to Get Protected?
            </h3>
            <p className="text-white/90 text-xl md:text-2xl max-w-3xl mx-auto mb-10 drop-shadow-md font-medium leading-relaxed">
              Join Ohio families who trust us with their digital safety. Start
              your protection journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button
                asChild
                size="lg"
                className="h-16 px-10 text-xl font-bold rounded-full"
              >
                <Link to="/training#pricing">
                  Start Protection Now
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-16 px-10 text-xl font-bold rounded-full bg-white/10 border-2 border-white/40 text-white hover:bg-white/20"
              >
                <Link to="/contact">Talk to an Expert</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
