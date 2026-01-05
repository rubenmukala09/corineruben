import { HelpCircle, ArrowRight, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import supportAgent from "@/assets/support-agent.jpg";
import natureCTABg from "@/assets/nature-cta-bg.jpg";
import { GeometricCorner, GridPattern } from "@/components/ui/GeometricDecorations";

const faqs = [
  {
    question: "How does ScamShield AI actually protect me?",
    answer: "ScamShield uses advanced AI to analyze incoming calls, texts, and emails in real-time. When it detects suspicious patterns—like known scam phone numbers, phishing language, or AI-cloned voices—it immediately alerts you and blocks the threat.",
  },
  {
    question: "Is my personal data safe with InVision Network?",
    answer: "Absolutely. We use military-grade encryption and never sell your data. As a company that supports veterans, we take security personally. Your information is stored securely and only used to protect you from scams.",
  },
  {
    question: "What makes you different from other companies?",
    answer: "We're local (Ohio-based), veteran-supporting, and focused specifically on protecting families and seniors from AI-powered scams. We don't just provide software—we provide education, support, and a personal relationship with our clients.",
  },
  {
    question: "Can I protect my elderly parents who aren't tech-savvy?",
    answer: "Yes! That's exactly who we designed ScamShield for. Our Family plan covers up to 5 members, and we provide simple setup assistance. Many of our clients are seniors or their family members who want to protect loved ones.",
  },
];

export const FAQPreview = () => {
  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      {/* Grid pattern */}
      <GridPattern />
      
      {/* Geometric corner accents - hidden on mobile */}
      <div className="hidden md:block">
        <GeometricCorner position="top-right" variant="lines" />
        <GeometricCorner position="bottom-left" variant="dots" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Mobile-first stacking layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Header & Support Card */}
          <ScrollReveal animation="fade-up" className="order-1 lg:sticky lg:top-24 space-y-6 lg:space-y-8">
            <div>
              <div 
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 bg-primary text-primary-foreground text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3 sm:mb-4"
                style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
              >
                FAQ
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
                Got{" "}
                <span className="text-primary">Questions?</span>
                <br />
                We've Got Answers
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                Protecting your family from scams is a serious decision. Here's what you need to know.
              </p>
            </div>

            {/* Support Agent Card - Soft Modern */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-white/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-400 ease-out hover:translate-y-[-4px] lg:hover:translate-y-[-8px] hover:scale-[1.01] lg:hover:scale-[1.02] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)]">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="relative">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full overflow-hidden border-3 border-primary/30 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]">
                    <img
                      src={supportAgent}
                      alt="Support specialist"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-7 sm:h-7 bg-green-600 rounded-full border-2 border-background flex items-center justify-center">
                    <span className="text-[7px] sm:text-[9px] text-white font-bold">ON</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-base sm:text-lg text-foreground">Talk to a Human</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Real experts, not bots • Available now</p>
                </div>
              </div>

              <p className="text-muted-foreground text-xs sm:text-sm mb-4 sm:mb-6">
                Our Ohio-based team is ready to answer your questions and help you find the right protection.
              </p>

              <div className="flex flex-col gap-2 sm:gap-3">
                <Button asChild className="w-full rounded-xl sm:rounded-2xl text-sm sm:text-base">
                  <Link to="/contact">
                    <MessageCircle className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                    Chat With Expert
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full rounded-xl sm:rounded-2xl text-sm sm:text-base">
                  <a href="tel:+19373018749">
                    <Phone className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                    Call Now
                  </a>
                </Button>
              </div>
            </div>
          </ScrollReveal>

          {/* FAQ Accordion */}
          <ScrollReveal animation="fade-up" delay={100} className="order-2">
            <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="group border border-white/50 rounded-xl sm:rounded-2xl px-4 sm:px-6 bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-400 ease-out hover:translate-y-[-2px] sm:hover:translate-y-[-4px] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] data-[state=open]:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)]"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-4 sm:py-5 text-foreground group-data-[state=open]:text-primary transition-colors text-sm sm:text-base">
                    <div className="flex items-center gap-3 sm:gap-4 pr-2 sm:pr-4">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-data-[state=open]:bg-primary/20 transition-colors">
                        <span className="text-primary font-bold text-xs sm:text-sm">{index + 1}</span>
                      </div>
                      {faq.question}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 sm:pb-5 pl-9 sm:pl-12 text-sm sm:text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-6 sm:mt-8 text-center">
              <Button asChild variant="ghost" size="lg" className="rounded-xl sm:rounded-2xl text-sm sm:text-base">
                <Link to="/resources#faq">
                  View All FAQs
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>

        {/* Ready to Get Protected */}
        <ScrollReveal animation="scale" className="mt-12 sm:mt-16 lg:mt-20">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src={natureCTABg} 
                alt="Beautiful nature landscape" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
            </div>
            
            <div className="relative z-10 p-6 sm:p-10 md:p-16 text-center">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg">
                Ready to Get Protected?
              </h3>
              <p className="text-white/90 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 drop-shadow-md">
                Join thousands of families who trust us with their digital safety. 
                Start your protection journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button asChild size="lg" className="rounded-full px-6 sm:px-8 text-sm sm:text-base">
                  <Link to="/training#pricing">
                    Start Protection Now
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-6 sm:px-8 bg-white/10 border-white/30 text-white hover:bg-white/20 text-sm sm:text-base">
                  <Link to="/contact">
                    Talk to an Expert
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
