import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export const FAQButton = () => {
  const [open, setOpen] = useState(false);

  const faqs = [
    {
      question: "How quickly can I start using your services?",
      answer: "Most individual protection plans activate within 24 hours. Business AI implementations typically begin within 1-2 weeks after initial consultation. Training sessions can be scheduled as soon as next week depending on availability."
    },
    {
      question: "Do you offer refunds if I'm not satisfied?",
      answer: "Yes! We offer a 30-day money-back guarantee for all ScamShield subscriptions. For business services and training programs, satisfaction is guaranteed - if you're not happy after the first session or milestone, we'll make it right or provide a full refund."
    },
    {
      question: "What makes your AI scam protection different?",
      answer: "Unlike generic security software, we specialize in AI-powered scams targeting seniors and families. Our team analyzes deepfakes, voice clones, and sophisticated phishing in real-time. We're also local (Ohio-based) with multilingual support and human experts backing every analysis."
    },
    {
      question: "Can I use your services outside of Ohio?",
      answer: "Absolutely! While we're proudly Ohio-based, our services are available nationwide and internationally. Our training, ScamShield protection, and business AI solutions work anywhere with internet access."
    },
    {
      question: "Do I need to be tech-savvy to use ScamShield?",
      answer: "Not at all! ScamShield is designed for everyone, including those who aren't comfortable with technology. Simply forward suspicious emails, texts, or voicemails to us, and we handle the technical analysis. Our training also helps you build confidence with technology."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and ACH bank transfers for monthly subscriptions. For business services over $5,000, we also offer payment plans and invoice billing."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes. We use bank-level encryption (256-bit SSL), comply with GDPR and CCPA privacy regulations, and never sell your data. All scam analysis is confidential and deleted after resolution. Your security is our top priority."
    },
    {
      question: "Can you integrate AI into my existing business systems?",
      answer: "Yes! Our AI solutions integrate with most popular platforms including Salesforce, HubSpot, Microsoft 365, Google Workspace, Shopify, WordPress, and many more. During consultation, we assess your current tech stack and design seamless integrations."
    },
    {
      question: "Do you offer group discounts for families or businesses?",
      answer: "Yes! Families (3+ members) receive 15% off ScamShield subscriptions. Businesses training 10+ employees receive volume discounts starting at 20%. Veterans and first responders always receive 10% off. Contact us for custom enterprise pricing."
    },
    {
      question: "What happens after I submit a suspicious item to ScamShield?",
      answer: "You'll receive an acknowledgment within 1 hour, and a full analysis within 24 hours (usually much faster). If it's a confirmed scam, we'll explain how it works and what to do next. If it's legitimate, we'll give you peace of mind with a detailed explanation."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, cancel anytime with no penalty. Monthly subscriptions can be cancelled before the next billing cycle. If you cancel mid-month, you'll retain access until the end of your paid period."
    },
    {
      question: "Do you provide training in languages other than English?",
      answer: "Yes! We offer training in English, Spanish (Español), and French (Français). Our multilingual trainers understand cultural nuances and can adapt examples to different communities."
    }
  ];

  return (
    <>
      {/* Floating FAQ Button */}
      <div className="fixed bottom-24 right-6 z-40">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="rounded-full shadow-lg h-14 w-14 p-0 hover:scale-110 transition-transform"
              aria-label="Open FAQ"
            >
              <HelpCircle className="w-6 h-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">Frequently Asked Questions</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
