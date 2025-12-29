import { useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Shield, 
  CheckCircle, 
  Lock, 
  Server, 
  Clock, 
  Zap,
  HeadphonesIcon,
  Database,
  Globe,
  TrendingUp,
  AlertTriangle,
  Users,
  CreditCard,
  QrCode,
  FileText,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { trackButtonClick, trackConversion } from "@/utils/analyticsTracker";

interface WebsiteInsuranceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface InsuranceFeature {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
  category: 'security' | 'support' | 'performance' | 'backup';
  popular?: boolean;
}

const insuranceFeatures: InsuranceFeature[] = [
  // Security Features
  {
    id: 'ssl',
    name: 'SSL Certificate Management',
    description: 'Auto-renewal and monitoring',
    price: 0,
    icon: <Lock className="w-4 h-4" />,
    category: 'security',
  },
  {
    id: 'security-monitoring',
    name: '24/7 Security Monitoring',
    description: 'Threat detection and alerts',
    price: 15,
    icon: <Shield className="w-4 h-4" />,
    category: 'security',
    popular: true,
  },
  {
    id: 'malware-removal',
    name: 'Malware Removal',
    description: 'Immediate breach response',
    price: 25,
    icon: <AlertTriangle className="w-4 h-4" />,
    category: 'security',
  },
  {
    id: 'ddos-protection',
    name: 'DDoS Protection',
    description: 'Enterprise attack mitigation',
    price: 40,
    icon: <Server className="w-4 h-4" />,
    category: 'security',
  },
  {
    id: 'firewall',
    name: 'Web Application Firewall',
    description: 'Advanced threat blocking',
    price: 35,
    icon: <Shield className="w-4 h-4" />,
    category: 'security',
  },
  // Backup Features
  {
    id: 'weekly-backup',
    name: 'Weekly Backups',
    description: 'Automated weekly backups',
    price: 0,
    icon: <Database className="w-4 h-4" />,
    category: 'backup',
  },
  {
    id: 'daily-backup',
    name: 'Daily Backups',
    description: '30-day retention',
    price: 15,
    icon: <Database className="w-4 h-4" />,
    category: 'backup',
    popular: true,
  },
  {
    id: 'realtime-backup',
    name: 'Real-Time Backups',
    description: 'Continuous with instant restore',
    price: 35,
    icon: <Zap className="w-4 h-4" />,
    category: 'backup',
  },
  {
    id: 'offsite-backup',
    name: 'Offsite Backup Storage',
    description: 'Geo-redundant storage',
    price: 25,
    icon: <Globe className="w-4 h-4" />,
    category: 'backup',
  },
  // Support Features
  {
    id: 'email-support',
    name: 'Email Support',
    description: '48-hour response',
    price: 0,
    icon: <HeadphonesIcon className="w-4 h-4" />,
    category: 'support',
  },
  {
    id: 'priority-support',
    name: 'Priority Support',
    description: '4-hour response + phone',
    price: 20,
    icon: <HeadphonesIcon className="w-4 h-4" />,
    category: 'support',
    popular: true,
  },
  {
    id: '24-7-support',
    name: '24/7 Dedicated Support',
    description: 'Round-the-clock + manager',
    price: 50,
    icon: <Users className="w-4 h-4" />,
    category: 'support',
  },
  {
    id: 'emergency-response',
    name: 'Emergency Response Team',
    description: '15-min critical response',
    price: 75,
    icon: <Zap className="w-4 h-4" />,
    category: 'support',
  },
  // Performance Features
  {
    id: 'uptime-monitoring',
    name: 'Uptime Monitoring',
    description: '5-min interval checks',
    price: 10,
    icon: <Clock className="w-4 h-4" />,
    category: 'performance',
  },
  {
    id: 'performance-optimization',
    name: 'Performance Optimization',
    description: 'Monthly audits & tuning',
    price: 30,
    icon: <TrendingUp className="w-4 h-4" />,
    category: 'performance',
  },
  {
    id: 'cdn-integration',
    name: 'Global CDN',
    description: 'Worldwide delivery network',
    price: 25,
    icon: <Globe className="w-4 h-4" />,
    category: 'performance',
  },
  {
    id: 'speed-boost',
    name: 'Speed Boost Package',
    description: 'Caching & optimization',
    price: 40,
    icon: <Zap className="w-4 h-4" />,
    category: 'performance',
  },
];

const BASE_PRICE = 29;
const MAX_PRICE = 500;

// Preset packages
const packages = [
  {
    name: 'Essential',
    price: 29,
    priceId: 'price_1Sjp3RJ8osfwYbX7TZXQBNHK',
    features: ['ssl', 'weekly-backup', 'email-support'],
    badge: 'STARTER',
    badgeColor: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'Professional',
    price: 49,
    priceId: 'price_1Sjp3TJ8osfwYbX7IgL3rhHZ',
    features: ['ssl', 'security-monitoring', 'daily-backup', 'priority-support', 'uptime-monitoring'],
    badge: 'POPULAR',
    badgeColor: 'from-primary to-accent',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 99,
    priceId: 'price_1Sjp3VJ8osfwYbX7Cyuetu6U',
    features: ['ssl', 'security-monitoring', 'malware-removal', 'ddos-protection', 'realtime-backup', '24-7-support', 'uptime-monitoring', 'performance-optimization', 'cdn-integration'],
    badge: 'ENTERPRISE',
    badgeColor: 'from-amber-500 to-orange-500',
  },
];

export const WebsiteInsuranceDialog = ({
  open,
  onOpenChange,
}: WebsiteInsuranceDialogProps) => {
  const { toast } = useToast();
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['ssl', 'weekly-backup', 'email-support']);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<typeof packages[0] | null>(null);
  const [isCustom, setIsCustom] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'qr'>('card');

  const totalPrice = useMemo(() => {
    if (selectedPackage && !isCustom) {
      return selectedPackage.price;
    }
    const featuresTotal = selectedFeatures.reduce((total, featureId) => {
      const feature = insuranceFeatures.find(f => f.id === featureId);
      return total + (feature?.price || 0);
    }, 0);
    return Math.min(BASE_PRICE + featuresTotal, MAX_PRICE);
  }, [selectedFeatures, selectedPackage, isCustom]);

  const pricePercentage = useMemo(() => {
    return Math.min(((totalPrice - BASE_PRICE) / (MAX_PRICE - BASE_PRICE)) * 100, 100);
  }, [totalPrice]);

  const toggleFeature = (featureId: string) => {
    const feature = insuranceFeatures.find(f => f.id === featureId);
    if (feature?.price === 0) return;

    setSelectedFeatures(prev => {
      if (prev.includes(featureId)) {
        return prev.filter(id => id !== featureId);
      }
      return [...prev, featureId];
    });
    setIsCustom(true);
    setSelectedPackage(null);
  };

  const selectPackage = (pkg: typeof packages[0]) => {
    setSelectedPackage(pkg);
    setSelectedFeatures(pkg.features);
    setIsCustom(false);
  };

  const handleSubscribe = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    if (!termsAccepted) {
      toast({
        title: "Terms Required",
        description: "Please accept the Terms & Conditions to continue.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const matchingPackage = !isCustom && selectedPackage;
      const finalPriceId = matchingPackage?.priceId || 'price_1Sjp3WJ8osfwYbX7cbaYjIqU';
      
      const { data, error } = await supabase.functions.invoke('create-subscription-checkout', {
        body: {
          priceId: finalPriceId,
          serviceName: 'Website Insurance',
          planTier: matchingPackage?.name || 'Custom',
          customerEmail: email,
          customerName: name || undefined,
        },
      });

      if (error) throw error;

      if (data?.url) {
        trackConversion('website_insurance', totalPrice);
        window.open(data.url, '_blank');
        onOpenChange(false);
      }
    } catch (error: any) {
      console.error('Subscription error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to start subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const groupedFeatures = useMemo(() => {
    return {
      security: insuranceFeatures.filter(f => f.category === 'security'),
      backup: insuranceFeatures.filter(f => f.category === 'backup'),
      support: insuranceFeatures.filter(f => f.category === 'support'),
      performance: insuranceFeatures.filter(f => f.category === 'performance'),
    };
  }, []);

  const resetDialog = () => {
    setSelectedPackage(null);
    setIsCustom(false);
    setSelectedFeatures(['ssl', 'weekly-backup', 'email-support']);
    setEmail('');
    setName('');
    setTermsAccepted(false);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      onOpenChange(isOpen);
      if (!isOpen) resetDialog();
    }}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <Shield className="w-3 h-3 mr-1" />
              Website Insurance
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Lock className="w-3 h-3 mr-1" />
              Secure Payment
            </Badge>
          </div>
          <DialogTitle className="text-2xl">Website Insurance Subscription</DialogTitle>
          <DialogDescription>
            Select a plan or build your custom coverage. Pay securely with card or QR code.
          </DialogDescription>
        </DialogHeader>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center gap-3 py-2 border-y border-border/50">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CheckCircle className="w-3.5 h-3.5 text-success" />
            <span>Cancel Anytime</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Shield className="w-3.5 h-3.5 text-success" />
            <span>30-Day Guarantee</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="w-3.5 h-3.5 text-success" />
            <span>256-bit Encryption</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Plan Selection */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Select Plan</h3>
            
            {/* Preset Packages */}
            <div className="space-y-3">
              {packages.map((pkg) => (
                <Card 
                  key={pkg.name} 
                  className={`p-4 cursor-pointer transition-all ${
                    selectedPackage?.name === pkg.name && !isCustom
                      ? 'border-2 border-primary bg-primary/5' 
                      : 'border hover:border-primary/50'
                  }`}
                  onClick={() => selectPackage(pkg)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        selectedPackage?.name === pkg.name && !isCustom 
                          ? 'bg-primary' 
                          : 'bg-border'
                      }`} />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{pkg.name}</span>
                          <Badge className={`bg-gradient-to-r ${pkg.badgeColor} text-white text-[10px] px-2`}>
                            {pkg.badge}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{pkg.features.length} features included</p>
                      </div>
                    </div>
                    <span className="text-xl font-bold text-primary">${pkg.price}<span className="text-xs text-muted-foreground font-normal">/mo</span></span>
                  </div>
                </Card>
              ))}
            </div>

            <Separator />

            {/* Custom Build Section */}
            <div>
              <button
                className={`w-full p-4 rounded-lg border-2 border-dashed transition-all text-left ${
                  isCustom 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => {
                  setIsCustom(true);
                  setSelectedPackage(null);
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${isCustom ? 'bg-primary' : 'bg-border'}`} />
                    <div>
                      <span className="font-semibold">Build Custom Plan</span>
                      <p className="text-xs text-muted-foreground">$29 - $500/mo</p>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-primary to-accent text-white text-[10px]">CUSTOM</Badge>
                </div>
              </button>
            </div>

            {/* Custom Features (when custom is selected) */}
            {isCustom && (
              <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
                {Object.entries(groupedFeatures).map(([category, features]) => (
                  <div key={category}>
                    <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2 flex items-center gap-2">
                      {category === 'security' && <Shield className="w-3 h-3" />}
                      {category === 'backup' && <Database className="w-3 h-3" />}
                      {category === 'support' && <HeadphonesIcon className="w-3 h-3" />}
                      {category === 'performance' && <TrendingUp className="w-3 h-3" />}
                      {category}
                    </h4>
                    <div className="space-y-1.5">
                      {features.map((feature) => (
                        <div
                          key={feature.id}
                          className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-all text-sm ${
                            selectedFeatures.includes(feature.id)
                              ? 'bg-primary/10 border border-primary/30'
                              : 'bg-muted/50 hover:bg-muted'
                          } ${feature.price === 0 ? 'opacity-70 cursor-default' : ''}`}
                          onClick={() => toggleFeature(feature.id)}
                        >
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={selectedFeatures.includes(feature.id)}
                              disabled={feature.price === 0}
                              className="h-3.5 w-3.5"
                            />
                            <span className="text-xs">{feature.name}</span>
                            {feature.popular && (
                              <Badge variant="secondary" className="text-[8px] px-1 py-0 h-4">Popular</Badge>
                            )}
                          </div>
                          <span className={`text-xs font-medium ${feature.price === 0 ? 'text-success' : ''}`}>
                            {feature.price === 0 ? 'Included' : `+$${feature.price}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Payment */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Payment Details</h3>

            {/* Price Summary */}
            <Card className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Monthly Subscription</span>
                <span className="text-3xl font-bold text-primary">${totalPrice}<span className="text-sm text-muted-foreground font-normal">/mo</span></span>
              </div>
              {isCustom && (
                <>
                  <Progress value={pricePercentage} className="h-1.5 mb-1" />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>$29 Base</span>
                    <span>$500 Max</span>
                  </div>
                </>
              )}
              <div className="text-xs text-muted-foreground mt-2">
                {selectedFeatures.length} features • Billed monthly
              </div>
            </Card>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-9"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-9"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <Label className="text-xs">Payment Method</Label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                    paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <CreditCard className={`w-4 h-4 ${paymentMethod === 'card' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <div className="text-left">
                    <p className="text-xs font-medium">Card</p>
                    <p className="text-[10px] text-muted-foreground">Visa, MC, AMEX</p>
                  </div>
                </button>
                <button
                  className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                    paymentMethod === 'qr' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setPaymentMethod('qr')}
                >
                  <QrCode className={`w-4 h-4 ${paymentMethod === 'qr' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <div className="text-left">
                    <p className="text-xs font-medium">QR Code</p>
                    <p className="text-[10px] text-muted-foreground">Scan to pay</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                  className="mt-0.5"
                />
                <label htmlFor="terms" className="text-xs text-muted-foreground cursor-pointer">
                  I agree to the{' '}
                  <button 
                    className="text-primary hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowTerms(!showTerms);
                    }}
                  >
                    Terms & Conditions
                  </button>
                  {' '}and{' '}
                  <a href="/privacy-policy" className="text-primary hover:underline" target="_blank">
                    Privacy Policy
                  </a>
                </label>
              </div>
              
              {/* Expandable Terms */}
              <button
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                onClick={() => setShowTerms(!showTerms)}
              >
                <FileText className="w-3 h-3" />
                {showTerms ? 'Hide' : 'View'} Terms & Conditions
                {showTerms ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
              
              {showTerms && (
                <div className="bg-muted/50 rounded-lg p-3 text-[10px] text-muted-foreground max-h-32 overflow-y-auto space-y-2">
                  <p><strong>Subscription Terms:</strong> Your subscription will automatically renew monthly until cancelled. You can cancel anytime from your account dashboard.</p>
                  <p><strong>30-Day Guarantee:</strong> If you're not satisfied within the first 30 days, contact us for a full refund.</p>
                  <p><strong>Service Level:</strong> We guarantee 99.9% uptime for monitoring services. Support response times are based on your plan tier.</p>
                  <p><strong>Data Protection:</strong> Your data is encrypted and stored securely. We never share your information with third parties.</p>
                  <p><strong>Cancellation:</strong> Cancel anytime with no penalties. Service continues until the end of your billing period.</p>
                </div>
              )}
            </div>

            <Separator />

            {/* Subscribe Button */}
            <Button 
              className="w-full h-11 text-sm font-semibold"
              onClick={handleSubscribe}
              disabled={loading || !email || !termsAccepted}
            >
              {loading ? (
                'Processing...'
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Subscribe Now - ${totalPrice}/mo
                </>
              )}
            </Button>

            <p className="text-[10px] text-center text-muted-foreground">
              Secure payment powered by Stripe. Cancel anytime.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
