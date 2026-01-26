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
    <section className="py-16 relative overflow-hidden">
      {/* Grid pattern */}
      <GridPattern />
      
      {/* Geometric corner accents */}
      <GeometricCorner position="top-right" variant="lines" />
      <GeometricCorner position="bottom-left" variant="dots" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Header & Support Card */}
          <div className="lg:sticky lg:top-24 space-y-8">
            <div>
              <div 
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-base font-bold uppercase tracking-wider mb-6"
                style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
              >
                FAQ
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Got{" "}
                <span className="text-primary">Questions?</span>
                <br />
                We've Got Answers
              </h2>
              <p className="text-foreground/80 text-xl md:text-2xl leading-relaxed font-medium">
                Protecting your family from scams is a serious decision. Here's what you need to know.
              </p>
            </div>

            {/* Support Agent Card - Soft Modern */}
            <div className="bg-white rounded-3xl p-8 border border-white/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-400 ease-out hover:translate-y-[-8px] hover:scale-[1.02] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-primary/30 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]">
                    <img
                      src={supportAgent}
                      alt="Support specialist"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-900 rounded-full border-2 border-background flex items-center justify-center">
                    <span className="text-[11px] text-white font-bold">ON</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-foreground">Talk to a Human</h3>
                  <p className="text-base text-foreground/70">Real experts, not bots • Available now</p>
                </div>
              </div>

              <p className="text-foreground/70 text-lg mb-6 leading-relaxed">
                Our Ohio-based team is ready to answer your questions and help you find the right protection.
              </p>

              <div className="flex flex-col gap-3">
                <Button asChild size="lg" className="w-full h-14 text-lg font-bold rounded-2xl">
                  <Link to="/contact">
                    <MessageCircle className="mr-2 w-5 h-5" />
                    Chat With Expert
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full h-14 text-lg font-bold rounded-2xl border-2">
                  <a href="tel:+19373018749">
                    <Phone className="mr-2 w-5 h-5" />
                    Call Now
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Right - FAQ Accordion */}
          <div>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="group border border-white/50 rounded-2xl px-6 bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-400 ease-out hover:translate-y-[-4px] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] data-[state=open]:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)]"
                >
                  <AccordionTrigger className="text-left font-bold hover:no-underline py-6 text-lg text-foreground group-data-[state=open]:text-primary transition-colors">
                    <div className="flex items-center gap-4 pr-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-data-[state=open]:bg-primary/20 transition-colors">
                        <span className="text-primary font-bold text-base">{index + 1}</span>
                      </div>
                      {faq.question}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/70 pb-6 pl-14 text-lg leading-relaxed font-medium">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-8 text-center">
              <Button asChild variant="ghost" size="lg" className="rounded-2xl">
                <Link to="/resources#faq">
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
              Join thousands of families who trust us with their digital safety. 
              Start your protection journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button asChild size="lg" className="h-16 px-10 text-xl font-bold rounded-full">
                <Link to="/training#pricing">
                  Start Protection Now
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-16 px-10 text-xl font-bold rounded-full bg-white/10 border-2 border-white/40 text-white hover:bg-white/20">
                <Link to="/contact">
                  Talk to an Expert
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
