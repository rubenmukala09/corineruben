import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import { SEO } from "@/components/SEO";
import { PageTransition } from "@/components/PageTransition";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ThumbsUp,
  ThumbsDown,
  Phone,
  MessageCircle,
  Shield,
  BookOpen,
} from "lucide-react";
import { Sparkles } from "lucide-react";
import { PlatformGuide } from "@/components/PlatformGuide";
import { AIImageDisclaimer } from "@/components/AIImageDisclaimer";
import { SITE } from "@/config/site";

import { toast } from "sonner";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PROFESSIONAL_HERO_IMAGES } from "@/config/professionalHeroImages";
import HeroFloatingStats from "@/components/business/HeroFloatingStats";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  // Getting Started
  {
    id: "gs-1",
    category: "Getting Started",
    question: "How do I get started with InVision Network?",
    answer:
      "Choose your plan, complete a quick signup, and you'll receive your secure access link via email within minutes. No downloads or installations required.",
  },
  {
    id: "gs-2",
    category: "Getting Started",
    question: "Do I need technical skills to use your services?",
    answer:
      "Not at all! Our platform is designed for everyone, including those who aren't tech-savvy. We offer free onboarding sessions and 24/7 support to help you get started.",
  },
  {
    id: "gs-3",
    category: "Getting Started",
    question: "What happens after I sign up?",
    answer:
      "Within minutes, you'll receive a welcome email with your secure access link. Click it to access your personalized dashboard. We'll also send you a getting started guide and offer a free 15-minute onboarding call.",
  },
  {
    id: "gs-4",
    category: "Getting Started",
    question: "Can I try it before I buy?",
    answer:
      "Yes! We offer a 7-day free trial on all plans. No credit card required. Cancel anytime during the trial at no charge.",
  },

  // Family Shield
  {
    id: "fs-1",
    category: "Family Shield",
    question: "What is Family Shield?",
    answer:
      "Family Shield is our AI scam protection service that helps families identify and avoid sophisticated AI-powered scams like deepfake calls, fake texts, and phishing attempts.",
  },
  {
    id: "fs-2",
    category: "Family Shield",
    question: "How does the access link system work?",
    answer:
      "Instead of creating a password, you receive a unique secure link via email. Click the link anytime to access your personalized protection portal. Your link never expires as long as your subscription is active.",
  },
  {
    id: "fs-3",
    category: "Family Shield",
    question: "Can I share my access link with family members?",
    answer:
      "Your access link is for your household. While multiple people can use it, each person's activity is logged for security. For separate accounts with individual tracking, consider our Family Plan.",
  },
  {
    id: "fs-4",
    category: "Family Shield",
    question: "What happens if I lose my access link?",
    answer: `Simply email us at ${SITE.emails.support} and we'll resend your link immediately. You can also request a new link from your original confirmation email.`,
  },
  {
    id: "fs-5",
    category: "Family Shield",
    question: "How do I submit a suspicious message or call?",
    answer:
      "Log into your portal using your access link, click 'Submit Suspicious Item,' and upload the message, voicemail, or screenshot. Our AI analyzes it within minutes and sends you a detailed report.",
  },
  {
    id: "fs-6",
    category: "Family Shield",
    question: "What's the difference between plans?",
    answer:
      "• Starter ($39/mo): Basic protection, submit items, monthly alerts\n• Family ($79/mo): Everything in Starter + family vault, video training\n• Premium ($129/mo): Everything + 24/7 support, personal consultations\n• Custom ($229+/mo): Tailored to your specific needs",
  },

  // Business Services
  {
    id: "bs-1",
    category: "Business Services",
    question: "What is an AI Receptionist?",
    answer:
      "Our AI Receptionist answers calls 24/7, books appointments, transfers calls, and handles common questions - all while sounding completely natural. It never sleeps, never takes breaks, and costs less than hiring staff.",
  },
  {
    id: "bs-2",
    category: "Business Services",
    question: "How long does setup take?",
    answer:
      "Most clients are up and running within 48-72 hours. We handle everything: system configuration, voice training, script development, and testing.",
  },
  {
    id: "bs-3",
    category: "Business Services",
    question: "Can the AI Receptionist handle multiple calls at once?",
    answer:
      "Yes! Unlike human staff, our AI can handle unlimited simultaneous calls. No more busy signals or missed opportunities.",
  },
  {
    id: "bs-4",
    category: "Business Services",
    question: "What if a caller needs a real person?",
    answer:
      "The AI seamlessly transfers to your team when needed. You can set custom rules for when to transfer (complex questions, VIP callers, emergencies).",
  },
  {
    id: "bs-5",
    category: "Business Services",
    question: "How much does an AI Receptionist cost?",
    answer:
      "Setup: $9,500 one-time. Monthly: starting at $299/month. Includes unlimited calls, 24/7 operation, ongoing updates, and support.",
  },

  // AI Insurance
  {
    id: "ai-1",
    category: "AI Insurance",
    question: "What does AI Insurance cover?",
    answer:
      "We monitor, maintain, and protect your AI systems (chatbots, automation, customer service AI). We handle updates, security patches, performance monitoring, and instant issue resolution.",
  },
  {
    id: "ai-2",
    category: "AI Insurance",
    question: "I already have AI. Can you insure it?",
    answer:
      "Yes! We're vendor-agnostic. Whether you built it in-house, use ChatGPT, or bought from another provider, we can protect it.",
  },
  {
    id: "ai-3",
    category: "AI Insurance",
    question: "What's included in monitoring?",
    answer:
      "24/7 uptime monitoring, performance tracking, security scans, automatic updates, error alerts, and monthly health reports.",
  },
  {
    id: "ai-4",
    category: "AI Insurance",
    question: "How fast do you respond to issues?",
    answer:
      "Critical issues: within 15 minutes. Non-critical: within 4 hours. We proactively catch 95% of issues before they affect your users.",
  },

  // Billing & Pricing
  {
    id: "bp-1",
    category: "Billing & Pricing",
    question: "What payment methods do you accept?",
    answer:
      "Credit cards (Visa, Mastercard, Amex, Discover), ACH bank transfer, and for businesses: invoicing with net-30 terms.",
  },
  {
    id: "bp-2",
    category: "Billing & Pricing",
    question: "Can I cancel anytime?",
    answer:
      "Yes! Individual/family plans: cancel anytime, no penalties. Business services: 30-day notice required (in contract). We'll process your cancellation and provide any final reports.",
  },
  {
    id: "bp-3",
    category: "Billing & Pricing",
    question: "Do you offer refunds?",
    answer:
      "Individual plans: 30-day money-back guarantee. Business services: custom terms in contract. If you're not satisfied, we'll work to make it right.",
  },
  {
    id: "bp-4",
    category: "Billing & Pricing",
    question: "Are there setup fees?",
    answer:
      "Family Shield: No setup fees. AI Receptionist: $9,500 setup (one-time). Websites: varies by scope. AI Insurance: no setup fee.",
  },
  {
    id: "bp-5",
    category: "Billing & Pricing",
    question: "Do you offer discounts?",
    answer:
      "Yes! Veterans and first responders receive 10% off. Nonprofits and bundled services can request custom pricing.",
  },

  // Technical Support
  {
    id: "ts-1",
    category: "Technical Support",
    question: "What are your support hours?",
    answer:
      "Email support: 24/7 (respond within 4 hours). Phone support: Mon-Fri 9am-6pm EST, Sat 10am-3pm. Premium clients: 24/7 priority support.",
  },
  {
    id: "ts-2",
    category: "Technical Support",
    question: "How do I contact support?",
    answer: `Email: ${SITE.emails.support}, Phone: ${SITE.phone.display}, Live chat: on our website, or submit ticket through your portal.`,
  },
  {
    id: "ts-3",
    category: "Technical Support",
    question: "Do you offer training?",
    answer:
      "Yes! All business clients receive free onboarding training. Family Shield Premium includes video training library. Custom training sessions available.",
  },

  // Account & Access
  {
    id: "aa-1",
    category: "Account & Access",
    question: "How do I access my portal?",
    answer:
      "Business clients: Log in at invisionnetwork.org/auth with your email and password. Individual clients: Use your unique access link (sent via email).",
  },
  {
    id: "aa-2",
    category: "Account & Access",
    question: "I forgot my password. What do I do?",
    answer:
      "Click 'Forgot Password' on the login page. We'll email you a reset link. For access link users: email us to resend your link.",
  },
  {
    id: "aa-3",
    category: "Account & Access",
    question: "Can I update my payment method?",
    answer:
      "Yes! Log into your portal, go to Billing, click 'Update Payment Method,' and enter new card details. Changes take effect immediately.",
  },
  {
    id: "aa-4",
    category: "Account & Access",
    question: "How do I upgrade my plan?",
    answer:
      "Log into your portal, go to Plan & Billing, click 'Upgrade,' choose new plan. Changes take effect immediately, and we'll prorate the difference.",
  },
  {
    id: "aa-5",
    category: "Account & Access",
    question: "Can I downgrade my plan?",
    answer:
      "Yes, you can downgrade at any time. Changes take effect at the start of your next billing cycle. You'll keep full access to current features until then.",
  },
  {
    id: "aa-6",
    category: "Account & Access",
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time with no penalties or fees. Your service will continue until the end of your current billing period.",
  },

  // Privacy & Security
  {
    id: "ps-1",
    category: "Privacy & Security",
    question: "How do you protect my personal information?",
    answer:
      "We use industry-standard encryption (TLS) and never sell your data. Sensitive details are handled with privacy-by-design practices and access controls.",
  },
  {
    id: "ps-2",
    category: "Privacy & Security",
    question: "Do you share my data with third parties?",
    answer:
      "Never. We don't sell, rent, or share your information. Your privacy is non-negotiable. We only use your data to provide services you've requested.",
  },
  {
    id: "ps-3",
    category: "Privacy & Security",
    question: "Where is my data stored?",
    answer:
      "All data is stored in secure, encrypted data centers in the United States with redundant backups. We use AWS and Microsoft Azure infrastructure with strict access controls.",
  },
  {
    id: "ps-4",
    category: "Privacy & Security",
    question: "Can I delete my data?",
    answer:
      "Yes. You can request complete data deletion at any time. We aim to permanently remove personal information within 30 days.",
  },
  {
    id: "ps-5",
    category: "Privacy & Security",
    question: "How do you handle suspicious messages I submit?",
    answer:
      "Submitted messages are analyzed by our AI in a secure, isolated environment. Personal information is redacted and never shared. Messages are deleted after 90 days unless you save them.",
  },

  // Veterans & Seniors
  {
    id: "vs-1",
    category: "Veterans & Seniors",
    question: "Do you offer discounts for veterans or seniors?",
    answer:
      "Yes! We offer 10% off for veterans and first responders. Contact us with proof of service to apply your discount.",
  },
  {
    id: "vs-2",
    category: "Veterans & Seniors",
    question: "Is this service easy for seniors to use?",
    answer:
      "Absolutely. We specifically designed our platform for seniors with large text, simple navigation, and clear instructions. We also offer free one-on-one training sessions.",
  },
  {
    id: "vs-3",
    category: "Veterans & Seniors",
    question: "Do you offer in-person training for seniors?",
    answer:
      "Yes, in select areas including Columbus, OH. We offer free in-person training sessions at senior centers and community centers. Contact us to schedule.",
  },
  {
    id: "vs-4",
    category: "Veterans & Seniors",
    question: "Can my adult children manage my account?",
    answer:
      "Yes! You can add authorized family members who can access your account, view alerts, and help manage your protection. Perfect for families looking out for elderly parents.",
  },
  {
    id: "vs-5",
    category: "Veterans & Seniors",
    question: "What if I'm not comfortable with technology?",
    answer:
      "That's exactly who we built this for! We offer phone support, step-by-step guides with pictures, and patient 1-on-1 training. Many of our senior users had never used a computer before.",
  },
];

const categories = [
  "All Questions",
  "Getting Started",
  "Privacy & Security",
  "Veterans & Seniors",
  "Family Shield",
  "Business Services",
  "AI Insurance",
  "Billing & Pricing",
  "Technical Support",
  "Account & Access",
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, boolean>>({});

  const filteredFAQs = useMemo(() => {
    let filtered = faqs;

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter((faq) => faq.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [searchQuery, activeCategory]);

  // Pre-compute category counts for performance (avoids O(n²) filtering on every render)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { "All Questions": faqs.length };
    faqs.forEach((faq) => {
      counts[faq.category] = (counts[faq.category] || 0) + 1;
    });
    return counts;
  }, []); // Empty deps - faqs array is static

  const handleHelpful = (faqId: string, isHelpful: boolean) => {
    setHelpfulVotes((prev) => ({ ...prev, [faqId]: isHelpful }));
    toast.success(
      isHelpful
        ? "Thanks for your feedback!"
        : "We'll work on improving this answer.",
    );
  };

  const faqHeroImages = PROFESSIONAL_HERO_IMAGES.faq;
  const faqStructuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.slice(0, 8).map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    }),
    [],
  );

  return (
    <PageTransition variant="fade">
      <div className="min-h-screen">
        <SEO
          title="Frequently Asked Questions"
          description="Find answers to common questions about InVision Network's AI scam protection, business services, billing, and technical support."
          keywords="FAQ, questions, support, help, InVision Network"
          structuredData={faqStructuredData}
        />
        <Navigation />

        <main>
          {/* Hero wrapper for floating stats */}
          <div className="relative">
            <Hero
              backgroundImages={faqHeroImages}
              headline="Frequently Asked Questions"
              subheadline="Get instant answers to your questions about our AI scam protection services, training programs, and security solutions"
              overlay={true}
              showScrollIndicator={false}
            />

            {/* Floating Stats Bar - Outside Hero to stay static */}
            <HeroFloatingStats />
          </div>

          {/* Spacer for floating stats bar */}
          <div className="hidden lg:block h-14" />
          <div className="lg:hidden h-6" />

          <TrustBar />

          {/* Platform Guide Section */}
          <section className="py-6 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
                  <BookOpen className="w-3 h-3 mr-1" />
                  New to InVision?
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  Learn How to Use Our Platform
                </h2>
                <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
                  Get step-by-step guidance on purchasing, subscribing,
                  submitting scam reports, and more
                </p>
                <PlatformGuide />
              </div>
            </div>
          </section>

          {/* Search & Filter Section - Redesigned */}
          <section className="py-6 bg-gradient-to-b from-muted/30 to-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                {/* Search Bar - Enhanced */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-50" />
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Search for answers... (e.g., 'How to get started', 'Payment methods')"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-14 text-base rounded-xl border-2 border-border/50 focus:border-primary/50 bg-background/80 backdrop-blur-sm shadow-lg"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {/* Results Count */}
                {searchQuery && (
                  <div className="text-center mb-4">
                    <Badge variant="secondary" className="text-sm">
                      {filteredFAQs.length}{" "}
                      {filteredFAQs.length === 1 ? "result" : "results"} found
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Category Tabs */}
          <section className="py-4 border-y border-border/40 bg-muted/20">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Filter by Category
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {categories.map((category) => {
                    const count = categoryCounts[category] || 0;
                    return (
                      <Button
                        key={category}
                        variant={activeCategory === category ? "default" : "outline"}
                        size="lg"
                        onClick={() => setActiveCategory(category)}
                        className="rounded-full shadow-sm hover:shadow-md transition-shadow"
                      >
                        {category}
                        <Badge variant="secondary" className="ml-2 bg-background/50">
                          {count}
                        </Badge>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Accordion */}
          <section className="py-4 sm:py-6">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                {filteredFAQs.length > 0 ? (
                  <Accordion type="single" collapsible className="space-y-1">
                    {filteredFAQs.map((faq) => (
                      <Card key={faq.id} className="overflow-hidden">
                        <AccordionItem value={faq.id} className="border-none">
                          <AccordionTrigger className="px-4 py-2.5 text-left hover:bg-muted/50 transition-colors text-base font-semibold hover:no-underline">
                            <span className="pr-4">{faq.question}</span>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4">
                            <div className="pt-1 space-y-3">
                              <p className="text-base leading-relaxed whitespace-pre-line text-foreground/90">
                                {faq.answer}
                              </p>
                              <div className="flex items-center gap-4 pt-4 border-t border-border">
                                <span className="text-sm text-muted-foreground">Was this helpful?</span>
                                <div className="flex gap-2">
                                  <Button variant={helpfulVotes[faq.id] === true ? "default" : "outline"} size="sm" onClick={() => handleHelpful(faq.id, true)} className="gap-2">
                                    <ThumbsUp className="w-4 h-4" /> Yes
                                  </Button>
                                  <Button variant={helpfulVotes[faq.id] === false ? "default" : "outline"} size="sm" onClick={() => handleHelpful(faq.id, false)} className="gap-2">
                                    <ThumbsDown className="w-4 h-4" /> No
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Card>
                    ))}
                  </Accordion>
                ) : (
                  <Card className="p-12 text-center">
                    <div className="max-w-md mx-auto">
                      <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-semibold mb-2">No results found</h3>
                      <p className="text-muted-foreground mb-4">Try adjusting your search or browse all categories</p>
                      <Button variant="outline" onClick={() => { setSearchQuery(""); setActiveCategory("All Questions"); }}>
                        Clear Search
                      </Button>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </section>

          {/* Still Have Questions CTA */}
          <section className="py-12 sm:py-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
            <div className="absolute top-10 right-0 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />
            <div className="container mx-auto px-4 relative z-10">
              <Card className="max-w-2xl mx-auto p-8 sm:p-12 text-center border border-border/50 shadow-sm">
                <h2 className="text-3xl sm:text-4xl font-black mb-4">
                  Still Have Questions?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Didn't find what you need? Our support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild className="gap-2">
                    <Link to="/contact">
                      <MessageCircle className="w-5 h-5" /> Contact Support
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="gap-2">
                    <a href={SITE.phone.tel}>
                      <Phone className="w-5 h-5" /> Call {SITE.phone.display}
                    </a>
                  </Button>
                </div>
                <div className="mt-8 pt-8 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <strong>Support Hours:</strong><br />
                    Email: 24/7 • Phone: Mon-Fri 9am-6pm EST
                  </p>
                </div>
              </Card>
            </div>
          </section>

          {/* AI Image Disclaimer */}
          <section className="py-12 bg-muted/20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <AIImageDisclaimer />
              </div>
            </div>
          </section>

          <Footer />
        </main>
      </div>
    </PageTransition>
  );
}
