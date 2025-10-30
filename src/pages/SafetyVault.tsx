import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lock, FileText, Users, Shield, Bell, Clock, CheckCircle } from "lucide-react";

const SafetyVault = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <Hero
        useTransitioningBackground={true}
        headline="Family Safety Vault"
        subheadline="Secure storage for critical family information accessible during emergencies"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
          <Button asChild variant="default" size="xl">
            <Link to="/training#pricing">Get Started</Link>
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
              A secure, encrypted digital vault where you can store critical family information that needs to be accessible during emergencies—but protected from scammers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-medium transition-all hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Bank-Level Security</h3>
              <p className="text-muted-foreground text-center">
                256-bit encryption and multi-factor authentication protect your sensitive information.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medium transition-all hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Family Sharing</h3>
              <p className="text-muted-foreground text-center">
                Grant access to trusted family members with customizable permission levels.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medium transition-all hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Bell className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Emergency Alerts</h3>
              <p className="text-muted-foreground text-center">
                Instant notifications when information is accessed during an emergency.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* What You Can Store */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">What You Can Store</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Medical Information</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Medications and dosages</li>
                    <li>• Allergies and conditions</li>
                    <li>• Doctor contact information</li>
                    <li>• Insurance policy numbers</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Financial Details</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Bank account information</li>
                    <li>• Investment accounts</li>
                    <li>• Safe deposit box locations</li>
                    <li>• Financial advisor contacts</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Family Safe Words</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Emergency verification phrases</li>
                    <li>• Family code words</li>
                    <li>• Security questions answers</li>
                    <li>• Identity verification protocols</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Lock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Legal Documents</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Power of attorney info</li>
                    <li>• Living will details</li>
                    <li>• Estate planning contacts</li>
                    <li>• Important account numbers</li>
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
                title: "Add Information",
                desc: "Securely upload documents and enter critical details through our encrypted interface."
              },
              {
                step: "2",
                title: "Set Permissions",
                desc: "Choose who can access what information and under which circumstances."
              },
              {
                step: "3",
                title: "Verify Access",
                desc: "Family members verify their identity using multi-factor authentication."
              },
              {
                step: "4",
                title: "Access Safely",
                desc: "Authorized family members can retrieve information during emergencies."
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

      {/* Included With */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto p-8 bg-card/80 backdrop-blur-sm">
            <div className="text-center mb-6">
              <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="mb-4">Included with ScamShield Family & Premium Plans</h2>
              <p className="text-muted-foreground text-lg mb-6">
                The Family Safety Vault is automatically included with your Family or Premium ScamShield subscription at no additional cost.
              </p>
            </div>
            <div className="space-y-3 mb-8">
              {[
                "Unlimited document storage",
                "Up to 5 authorized family members",
                "Automatic encrypted backups",
                "24/7 secure access",
                "Emergency contact notifications",
                "Activity audit logs"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="default" size="lg" className="flex-1">
                <Link to="/training#pricing">View ScamShield Plans</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="flex-1">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center mb-8">Why This Matters</h2>
            <div className="space-y-6">
              <Card className="p-6 bg-destructive/5 border-destructive/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">The Problem</h3>
                    <p className="text-muted-foreground">
                      During emergencies, family members need critical information fast—but sharing it over text or email exposes it to scammers. Traditional "safe places" like notebooks or computer files can be lost, stolen, or accessed by the wrong people.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Our Solution</h3>
                    <p className="text-muted-foreground">
                      The Family Safety Vault provides secure, instant access to critical information for authorized family members only—protected by the same security banks use, but accessible when you need it most.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SafetyVault;
