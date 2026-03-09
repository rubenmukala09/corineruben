import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ShoppingCart,
  CreditCard,
  Shield,
  Users,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  Play,
  CheckCircle,
  Home,
  Phone,
  Mail,
  MessageCircle,
  FileText,
  Lock,
  User,
  Settings,
  Bell,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SITE } from "@/config/site";

const guides = [
  {
    id: "getting-started",
    icon: Home,
    title: "Getting Started",
    description: "Learn the basics of using our platform",
    steps: [
      {
        title: "Create an account or browse as guest",
        description:
          "You can explore products and services without an account, or create one for full features.",
      },
      {
        title: "Explore our services",
        description:
          "Browse ScamShield protection, training programs, and business solutions.",
      },
      {
        title: "Choose your protection level",
        description:
          "Select from Starter, Family, or Premium plans based on your needs.",
      },
    ],
  },
  {
    id: "how-to-purchase",
    icon: ShoppingCart,
    title: "How to Purchase",
    description: "Step-by-step guide to buying products and services",
    steps: [
      {
        title: "Browse our Resources page",
        description:
          "Find digital guides, security products, and training materials.",
      },
      {
        title: "Add items to your cart",
        description: "Click 'Add to Cart' on any product you want to purchase.",
      },
      {
        title: "Review your cart",
        description: "Click the cart icon in the top menu to see your items.",
      },
      {
        title: "Proceed to checkout",
        description: "Complete your purchase with card payment or QR code.",
      },
    ],
  },
  {
    id: "payment-methods",
    icon: CreditCard,
    title: "Payment Methods",
    description: "All the ways you can pay",
    steps: [
      {
        title: "Credit/Debit Cards",
        description:
          "We accept Visa, Mastercard, American Express, and Discover.",
      },
      {
        title: "Apple Pay & Google Pay",
        description: "Quick checkout with your digital wallet.",
      },
      {
        title: "QR Code Payment",
        description:
          "Scan the QR code with your phone for easy mobile payment.",
      },
      {
        title: "Guest Checkout",
        description: "No account needed - pay as a guest with your email.",
      },
    ],
  },
  {
    id: "scamshield",
    icon: Shield,
    title: "Using ScamShield",
    description: "How to submit and analyze suspicious content",
    steps: [
      {
        title: "Click 'Report Scam' button",
        description: "Find it on our homepage or in the help menu.",
      },
      {
        title: "Describe the suspicious content",
        description: "Tell us about the email, call, or message you received.",
      },
      {
        title: "Submit for AI analysis",
        description: "Our AI instantly analyzes the content for threats.",
      },
      {
        title: "Get your risk assessment",
        description: "Receive a detailed report with recommendations.",
      },
    ],
  },
  {
    id: "subscriptions",
    icon: Users,
    title: "Subscription Plans",
    description: "Understanding our protection plans",
    steps: [
      {
        title: "Starter Plan ($39/mo)",
        description: "Basic protection with monthly alerts and scam analysis.",
      },
      {
        title: "Family Plan ($79/mo)",
        description:
          "Protection for the whole family with vault storage and training.",
      },
      {
        title: "Premium Plan ($129/mo)",
        description:
          "24/7 priority support, consultations, and advanced features.",
      },
      {
        title: "Custom Plan ($229+/mo)",
        description: "Tailored solutions for businesses and organizations.",
      },
    ],
  },
  {
    id: "account",
    icon: User,
    title: "Account & Portal",
    description: "Managing your account and dashboard",
    steps: [
      {
        title: "Access your portal",
        description: "Log in at the top right corner or use your access link.",
      },
      {
        title: "View your dashboard",
        description: "See your protection status, alerts, and activity.",
      },
      {
        title: "Manage subscriptions",
        description: "Upgrade, downgrade, or cancel anytime from your portal.",
      },
      {
        title: "Update settings",
        description: "Change notifications, payment methods, and preferences.",
      },
    ],
  },
];

interface PlatformGuideProps {
  triggerButton?: React.ReactNode;
}

export const PlatformGuide = ({ triggerButton }: PlatformGuideProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const defaultTrigger = (
    <Button
      size="lg"
      className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
    >
      <BookOpen className="w-5 h-5" />
      How to Use the Platform
      <ChevronRight className="w-4 h-4" />
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{triggerButton || defaultTrigger}</DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            Platform User Guide
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Quick Tips */}
          <Card className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="w-5 h-5 text-primary" />
              <h4 className="font-semibold">Quick Tips</h4>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>No account required for purchases</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Veterans get {SITE.veteranDiscountPercent}% off everything
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>24/7 AI support available</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  {SITE.moneyBackGuaranteeDays}-day money-back guarantee
                </span>
              </div>
            </div>
          </Card>

          {/* Guide Sections */}
          <Accordion type="single" collapsible className="space-y-2">
            {guides.map((guide) => {
              const IconComponent = guide.icon;
              return (
                <AccordionItem
                  key={guide.id}
                  value={guide.id}
                  className="border rounded-lg px-4 bg-card hover:bg-muted/30 transition-colors"
                >
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{guide.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {guide.description}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <div className="ml-13 space-y-3 pt-2">
                      {guide.steps.map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 p-3 rounded-lg bg-muted/30"
                        >
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary">
                            {index + 1}
                          </div>
                          <div>
                            <h5 className="font-medium text-sm">
                              {step.title}
                            </h5>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {step.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          {/* Contact Section */}
          <Card className="p-4 border-primary/20">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              Need More Help?
            </h4>
            <div className="grid sm:grid-cols-3 gap-3">
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <a href={SITE.phone.tel}>
                  <Phone className="w-4 h-4" />
                  Call Us
                </a>
              </Button>
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <a href={`mailto:${SITE.emails.support}`}>
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              </Button>
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <a href="/contact">
                  <FileText className="w-4 h-4" />
                  Contact Form
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
