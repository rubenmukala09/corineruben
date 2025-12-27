import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SEO } from "@/components/SEO";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, CheckCircle, Lock, ArrowRight, Zap, 
  AlertTriangle, RefreshCw, Headphones, CreditCard, Building
} from "lucide-react";

const INSURANCE_TIERS = [
  {
    id: "basic",
    name: "Basic Coverage",
    monthlyPrice: 49,
    yearlyPrice: 470, // ~20% off
    features: [
      "AI error monitoring",
      "Basic incident response",
      "Email support (48hr)",
      "Monthly reports"
    ],
    color: "from-slate-500 to-slate-600"
  },
  {
    id: "plus",
    name: "Plus Coverage",
    monthlyPrice: 99,
    yearlyPrice: 950,
    features: [
      "Everything in Basic",
      "Priority incident response",
      "Phone support (24hr)",
      "Weekly reports",
      "Performance optimization",
      "Compliance assistance"
    ],
    popular: true,
    color: "from-primary to-accent"
  },
  {
    id: "premium",
    name: "Premium Coverage",
    monthlyPrice: 199,
    yearlyPrice: 1910,
    features: [
      "Everything in Plus",
      "24/7 emergency support",
      "Dedicated account manager",
      "Real-time monitoring",
      "Custom SLA",
      "Legal consultation (2hrs/mo)",
      "Full compliance audit"
    ],
    color: "from-amber-500 to-orange-600"
  }
];

function BuyAIInsurance() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isYearly, setIsYearly] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: ""
  });

  const handlePurchase = async () => {
    if (!selectedTier) {
      toast({
        title: "Please select a plan",
        description: "Choose a coverage tier to continue.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.email || !formData.fullName) {
      toast({
        title: "Missing information",
        description: "Please fill in your name and email.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      const tier = INSURANCE_TIERS.find(t => t.id === selectedTier);
      if (!tier) throw new Error("Invalid tier");

      const amount = isYearly ? tier.yearlyPrice : tier.monthlyPrice;
      
      // Create insurance purchase record
      const { data: user } = await supabase.auth.getUser();
      
      const { data: purchase, error } = await supabase.from("ai_insurance_purchases").insert({
        user_id: user?.user?.id || null,
        email: formData.email,
        full_name: formData.fullName,
        coverage_tier: selectedTier,
        billing_cycle: isYearly ? "yearly" : "monthly",
        amount: amount,
        payment_status: "pending"
      }).select().single();

      if (error) throw error;

      // Create Stripe checkout session
      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke("create-product-payment", {
        body: {
          productName: `AI Service Insurance - ${tier.name}`,
          amount: amount * 100, // Convert to cents
          customerEmail: formData.email,
          metadata: {
            type: "ai-insurance",
            tier: selectedTier,
            billingCycle: isYearly ? "yearly" : "monthly",
            purchaseId: purchase.id
          }
        }
      });

      if (checkoutError) throw checkoutError;

      if (checkoutData?.url) {
        window.open(checkoutData.url, "_blank");
      }

      toast({
        title: "Checkout Started",
        description: "Complete your payment in the new window."
      });
    } catch (error: any) {
      console.error("Error processing purchase:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to process. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <SEO 
        title="AI Service Insurance | InVision Network"
        description="Protect your AI investments with comprehensive coverage. AI error monitoring, incident response, and compliance support."
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
            <Shield className="w-4 h-4" />
            <span>AI Service Insurance</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Protect Your AI Investment
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Comprehensive coverage for AI errors, incidents, and compliance. Sleep easy knowing your AI systems are protected.
          </p>
          
          {/* What's Covered */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { icon: AlertTriangle, text: "AI Error Monitoring" },
              { icon: RefreshCw, text: "Incident Response" },
              { icon: Headphones, text: "Priority Support" },
              { icon: Shield, text: "Compliance Assistance" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border text-sm">
                <item.icon className="w-4 h-4 text-primary" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Billing Toggle */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4">
            <span className={`font-medium ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span className={`font-medium ${isYearly ? "text-foreground" : "text-muted-foreground"}`}>
              Yearly
              <span className="ml-2 text-xs text-success font-bold">Save 20%</span>
            </span>
          </div>
        </div>
      </section>
      
      {/* Pricing Tiers */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {INSURANCE_TIERS.map((tier) => (
              <Card 
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                  selectedTier === tier.id 
                    ? "border-2 border-primary shadow-strong ring-2 ring-primary/20" 
                    : "border-2 border-transparent hover:border-primary/30"
                } ${tier.popular ? "relative" : ""}`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-accent text-white text-xs font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}
                
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4`}>
                  <Shield className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                
                <div className="mb-4">
                  <span className="text-3xl font-bold">
                    ${isYearly ? tier.yearlyPrice : tier.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground">/{isYearly ? "year" : "month"}</span>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={selectedTier === tier.id ? "default" : "outline"} 
                  className="w-full"
                >
                  {selectedTier === tier.id ? "Selected" : "Select Plan"}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Checkout Form */}
      {selectedTier && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Card className="max-w-xl mx-auto p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Purchase</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input 
                    id="fullName"
                    placeholder="John Smith"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="companyName">Company Name (Optional)</Label>
                  <Input 
                    id="companyName"
                    placeholder="Acme Inc."
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                  />
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold mb-2">Order Summary</h3>
                <div className="flex justify-between text-sm mb-1">
                  <span>{INSURANCE_TIERS.find(t => t.id === selectedTier)?.name}</span>
                  <span className="font-medium">
                    ${isYearly 
                      ? INSURANCE_TIERS.find(t => t.id === selectedTier)?.yearlyPrice 
                      : INSURANCE_TIERS.find(t => t.id === selectedTier)?.monthlyPrice
                    }/{isYearly ? "year" : "month"}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Billed {isYearly ? "annually" : "monthly"}
                </div>
              </div>
              
              {/* Payment Methods */}
              <div className="flex items-center justify-center gap-4 mb-6 text-muted-foreground text-sm">
                <div className="flex items-center gap-1">
                  <CreditCard className="w-4 h-4" />
                  <span>Card</span>
                </div>
                <div className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  <span>Bank (ACH)</span>
                </div>
              </div>
              
              <Button 
                onClick={handlePurchase} 
                size="lg" 
                className="w-full h-14 text-lg"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Proceed to Payment"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  <span>30-Day Guarantee</span>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}
      
      <Footer />
    </div>
  );
}

export default BuyAIInsurance;