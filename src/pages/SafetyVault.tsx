import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lock, FileText, Users, Shield, CheckCircle, FileCheck, MessageSquare, Globe } from "lucide-react";
import heroContact from "@/assets/hero-contact-new.jpg";

const SafetyVault = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <Hero
        backgroundImage={heroContact}
        headline="Family Safety Vault"
        subheadline="Document verification, authentication, and encryption services—we don't store your data, we protect it"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
          <Button asChild variant="default" size="xl">
            <Link to="/training#pricing">Choose Your Plan</Link>
          </Button>
          <Button asChild variant="outlineLight" size="xl">
            <Link to="/contact">Learn More</Link>
          </Button>
        </div>
      </Hero>

      <TrustBar />

      {/* What is Safety Vault */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="mb-4">What is the Family Safety Vault?</h2>
            <p className="text-xl text-muted-foreground">
              A specialized service for document verification, authentication, and encryption. We help you validate documents, identify red flags, and encrypt sensitive information—<strong>without storing your data</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-medium transition-all hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <FileCheck className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Document Authentication</h3>
              <p className="text-muted-foreground text-center">
                Verify property documents, contracts, letters, and other important paperwork for authenticity before making decisions.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medium transition-all hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Encryption Services</h3>
              <p className="text-muted-foreground text-center">
                Encrypt your sensitive documents and communications to ensure they remain private and secure.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medium transition-all hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">No Data Storage</h3>
              <p className="text-muted-foreground text-center">
                We analyze and verify—then delete. Your information stays with you, not in our systems.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Help With */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">How We Help You Stay Safe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Document Verification & Red Flag Analysis</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Property purchase documents and contracts</li>
                    <li>• Business agreements and legal documents</li>
                    <li>• Letters and official communications</li>
                    <li>• Medical documents and prescriptions</li>
                    <li>• We identify red flags, forgeries, and suspicious elements</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Financial & Property Verification</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Property price validation</li>
                    <li>• Financial detail authentication</li>
                    <li>• Investment opportunity verification</li>
                    <li>• Banking communication validation</li>
                    <li>• Check for scams before you commit</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <MessageSquare className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Family Communication Training</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Establish family safe-word protocols</li>
                    <li>• Phone call verification systems</li>
                    <li>• Multi-platform communication security</li>
                    <li>• Emergency verification procedures</li>
                    <li>• Protect against family emergency scams</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Globe className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Travel & International Documents</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Travel requirement verification</li>
                    <li>• International document validation</li>
                    <li>• Visa and travel paperwork review</li>
                    <li>• Legal document authentication</li>
                    <li>• We don't handle legal services, only verification</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "1",
                title: "Submit for Review",
                desc: "Upload or send us the document, communication, or information you want verified."
              },
              {
                step: "2",
                title: "Expert Analysis",
                desc: "Our team examines for authenticity, red flags, and potential scam indicators."
              },
              {
                step: "3",
                title: "Get Detailed Report",
                desc: "Receive a comprehensive report with findings, risk assessment, and recommendations."
              },
              {
                step: "4",
                title: "Secure Deletion",
                desc: "Your documents are permanently deleted from our systems after analysis."
              }
            ].map((item, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-medium transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 bg-primary/5 border-primary/20">
              <h2 className="mb-6 text-center">What We Don't Do</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">
                    <strong>No Data Storage:</strong> We don't store your personal data, medical records, or financial information.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">
                    <strong>No Legal Services:</strong> We verify documents but don't provide legal advice or handle legal proceedings.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">
                    <strong>Verification Only:</strong> We analyze authenticity and identify red flags, but you make the final decisions.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">
                    <strong>Privacy First:</strong> All analysis is confidential, and documents are securely deleted after service completion.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Included With */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto p-8 bg-card/80 backdrop-blur-sm">
            <div className="text-center mb-6">
              <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="mb-4">Included with ScamShield Family & Premium Plans</h2>
              <p className="text-muted-foreground text-lg mb-6">
                The Family Safety Vault service is automatically included with your Family or Premium ScamShield subscription at no additional cost.
              </p>
            </div>
            <div className="space-y-3 mb-8">
              {[
                "Unlimited document verification requests",
                "24-48 hour expert analysis (Premium: 12 hours)",
                "Comprehensive red flag reports",
                "Encryption services",
                "Family communication training",
                "Secure document handling with guaranteed deletion"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => {
                  window.location.href = '/training#pricing';
                }}
                variant="default" 
                size="lg" 
                className="flex-1"
              >
                View ScamShield Plans
              </Button>
              <Button asChild variant="outline" size="lg" className="flex-1">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SafetyVault;
