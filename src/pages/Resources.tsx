import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import FlowingWaves from "@/components/FlowingWaves";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PurchaseModal } from "@/components/PurchaseModal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Download, Shield, Wifi, KeyRound, Heart, FileText, ShoppingCart } from "lucide-react";

const Resources = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    type: 'guide' | 'product';
    name: string;
    price?: number;
  } | null>(null);

  const guides = [
    { icon: Shield, title: "Scam-Proof Playbook", desc: "Complete emergency scripts & protocols" },
    { icon: Heart, title: "Caregivers' Security Guide", desc: "Protect vulnerable loved ones from scams" },
    { icon: Wifi, title: "Home Wi-Fi Safety", desc: "Secure your network in 15 minutes" },
    { icon: KeyRound, title: "Password Creation Notebook Template", desc: "Offline password storage system" },
    { icon: FileText, title: "Grandparent-Text 101", desc: "Spot fake 'emergency' family texts" },
    { icon: Shield, title: "60-Second Pause Protocol Poster", desc: "Print and post on your fridge" },
  ];

  const products = [
    { name: "USB Data Blocker (2-pack)", price: "$12.99" },
    { name: "Webcam Privacy Covers (3-pack)", price: "$8.99" },
    { name: "RFID-Blocking Card Sleeves (5-pack)", price: "$14.99" },
    { name: "Password Notebook (Hardcover)", price: "$16.99" },
    { name: "Complete Security Kit (Bundle)", price: "$44.99" },
  ];

  const blogArticles = [
    {
      title: "How to Spot a Deepfake Voice Call in 5 Seconds",
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&h=400&fit=crop",
    },
    {
      title: "The New QR Code Scam Targeting Seniors",
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=400&fit=crop",
    },
    {
      title: "What to Do If You Think You've Been Scammed",
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=400&fit=crop",
    },
  ];

  const faqs = [
    {
      q: "Is this only for seniors?",
      a: "Not at all! While we specialize in adults 40+, anyone who wants AI scam protection is welcome. We've trained ages 35-85.",
    },
    {
      q: "Do you ask for my passwords?",
      a: "NEVER. We teach verification techniques without ever requesting sensitive data. If anyone claiming to be InVision asks for passwords, it's a scam.",
    },
    {
      q: "What if I'm not tech-savvy?",
      a: "Perfect! Our training assumes zero technical knowledge. If you can use email, you're ready.",
    },
    {
      q: "Can family members join my training?",
      a: "Yes! Our Family Small Group plan includes your spouse. Priority Private sessions can include up to 3 people.",
    },
    {
      q: "Do you record Zoom sessions?",
      a: "No. We do NOT record classes to protect your privacy. No login required to attend.",
    },
    {
      q: "What are your rescheduling terms?",
      a: "Single Small Group: Not available. Family Small Group: One reschedule (14 days notice). Priority Private: Easy reschedule (24hr notice).",
    },
    {
      q: "Do you provide certificates?",
      a: "Yes! Every training includes a digital certificate of completion you can print or share.",
    },
    {
      q: "Do you travel for in-person training?",
      a: "Yes! We serve Cleveland metro locally and offer nationwide in-person training. InVision covers all trainer travel costs.",
    },
    {
      q: "How do military/veteran discounts work?",
      a: "Veterans and active military receive 10% off all training and services. Contact us with verification.",
    },
    {
      q: "What's your refund policy?",
      a: "We offer a 7-day satisfaction guarantee. If you're not satisfied with your training, contact us within 7 days for a full refund.",
    },
    {
      q: "How long does Scam Shield analysis take?",
      a: "Standard Plan: ≤ 48 hours. Premium Plan: ≤ 24 hours. Unlimited Plan: ≤ 12 hours.",
    },
    {
      q: "Can I submit items in Spanish or French?",
      a: "Yes! We analyze items in English, Spanish, and French. Other languages may take longer.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <Hero
        useTransitioningBackground={true}
        headline="Resources & Tools"
        subheadline="Guides, security products, and answers to your questions."
        showScrollIndicator={true}
      />

      <TrustBar />

      {/* Guides */}
      <section className="py-16 bg-background relative">
        <FlowingWaves variant="full" opacity={0.12} />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-center mb-3">Professional Security Guides & Books</h2>
          <p className="text-center text-muted-foreground mb-10">
            Expert-written resources to protect yourself and your loved ones
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, index) => (
              <Card key={index} className="p-6 hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center">
                    <guide.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">{guide.title}</h3>
                <p className="text-muted-foreground text-center mb-4">{guide.desc}</p>
                <Button 
                  onClick={() => {
                    setSelectedItem({
                      type: 'guide',
                      name: guide.title
                    });
                    setModalOpen(true);
                  }}
                  className="w-full" 
                  variant="outline"
                >
                  <Download className="w-4 h-4 mr-2" />
                  PURCHASE
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Veterans Discount Banner */}
      <section className="py-8 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-2xl">
                  🇺🇸
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">Veterans & First Responders</h3>
                <p className="text-muted-foreground text-sm">Active duty, veterans, reservists, and first responders receive 10% OFF all resources and products</p>
              </div>
              <Button variant="default" asChild>
                <Link to="/contact">Claim Discount</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Security Tools Shop */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-3">Security Tools Shop</h2>
          <p className="text-center text-muted-foreground mb-10">
            Profits support training for seniors in need.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {products.map((product, index) => (
              <Card key={index} className="p-6 hover:shadow-medium transition-all hover:-translate-y-1 flex flex-col rounded-2xl">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="font-bold mb-2 text-center flex-grow">{product.name}</h3>
                <p className="text-2xl font-bold gradient-text-primary text-center mb-4">{product.price}</p>
                <Button 
                  onClick={() => {
                    setSelectedItem({
                      type: 'product',
                      name: product.name,
                      price: parseFloat(product.price.replace('$', ''))
                    });
                    setModalOpen(true);
                  }}
                  variant="default" 
                  className="w-full"
                >
                  BUY NOW
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-10">Recent Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogArticles.map((article, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl">
                <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">{article.title}</h3>
                  <Link to="/articles" className="text-primary hover:text-primary/80 font-semibold">
                    READ MORE →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link to="/articles">VIEW ALL ARTICLES</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted" id="faq">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-10">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-card rounded-2xl px-6 border border-border hover:border-primary/50 transition-all shadow-soft hover:shadow-medium">
                  <AccordionTrigger className="text-lg font-bold hover:text-primary">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-accent-foreground mb-6">Questions?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="gold" size="xl">
              <Link to="/contact">CONTACT US</Link>
            </Button>
            <Button asChild variant="outlineLight" size="xl">
              <Link to="/training">BOOK TRAINING</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      
      {selectedItem && (
        <PurchaseModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          itemType={selectedItem.type}
          itemName={selectedItem.name}
          suggestedPrice={selectedItem.type === 'guide' ? 15 : selectedItem.price}
          isPWYW={selectedItem.type === 'guide'}
          veteranDiscountPercent={selectedItem.type === 'product' ? 3 : 10}
        />
      )}
    </div>
  );
};

export default Resources;
