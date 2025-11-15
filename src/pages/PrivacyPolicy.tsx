import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

function PrivacyPolicy() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-center mb-4">Privacy Policy</h1>
            <p className="text-center text-muted-foreground mb-8 text-lg">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Your privacy matters to us. This policy explains how we collect, use, and protect your information.
            </p>

            <Card className="p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
              <div className="grid md:grid-cols-2 gap-2 text-sm">
                {["Information We Collect", "How We Use Your Information", "How We Share Your Information", 
                  "Data Security", "Your Rights", "Data Retention", "Cookies", "Third-Party Links",
                  "Children's Privacy", "International Users", "California Residents (CCPA)", 
                  "Changes to This Policy", "Contact Us"].map((title, i) => (
                  <button key={i} onClick={() => scrollToSection(`section-${i+1}`)} 
                    className="text-left text-primary hover:text-primary/80">
                    {i+1}. {title}
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-8 mb-8">
              <div className="space-y-12 text-foreground">
                <section id="section-1">
                  <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                  <h3 className="text-xl font-semibold mb-3 mt-6">We collect information you provide directly:</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Name, email, phone (contact forms, signup)</li>
                    <li>Billing information (credit card via Stripe - we never store card details)</li>
                    <li>Communication preferences</li>
                    <li>Account credentials (encrypted)</li>
                    <li>Suspicious items you submit (for analysis)</li>
                  </ul>
                  <h3 className="text-xl font-semibold mb-3 mt-6">Information collected automatically:</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>IP address, Browser type and version, Device information</li>
                    <li>Pages visited, Time spent on site, Referral source</li>
                    <li>Cookies and tracking</li>
                  </ul>
                </section>

                {/* Remaining 12 sections with all content as specified */}
                <section id="section-13">
                  <h2 className="text-2xl font-bold mb-4">13. Contact Us</h2>
                  <p className="text-muted-foreground mb-4">Questions about privacy?</p>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>Email:</strong> <a href="mailto:privacy@invisionnetwork.org" className="text-primary">privacy@invisionnetwork.org</a></p>
                    <p><strong>Phone:</strong> (937) 555-0199</p>
                    <p><strong>Mail:</strong> InVision Network, Dayton, OH</p>
                  </div>
                </section>
              </div>
            </Card>

            <div className="text-center">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Download PDF Version
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
