import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Package, Home, ShoppingBag, Download, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import confetti from "canvas-confetti";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get("order");
  const productType = searchParams.get("type") || "mixed"; // digital, physical, or mixed

  useEffect(() => {
    // Trigger confetti animation
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <SEO 
        title="Order Confirmed - Thank You!"
        description="Your order has been successfully placed. We'll send you a confirmation email shortly."
      />
      <Navigation />
      
      <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto">
            {/* Success Icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-success/10 mb-6 animate-in zoom-in duration-500">
                <CheckCircle className="w-12 h-12 text-success" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-in slide-in-from-bottom duration-500">
                Order Confirmed!
              </h1>
              <p className="text-lg text-muted-foreground animate-in slide-in-from-bottom duration-500 delay-100">
                Thank you for your purchase. Your order has been successfully placed.
              </p>
            </div>

            {/* Order Details Card */}
            <Card className="p-8 mb-8 animate-in slide-in-from-bottom duration-500 delay-200">
              <div className="space-y-6">
                {orderNumber && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Order Number</h3>
                    <p className="text-2xl font-bold text-primary">{orderNumber}</p>
                  </div>
                )}

                <div className="border-t pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {productType === 'digital' ? (
                        <Download className="w-6 h-6 text-primary" />
                      ) : (
                        <Package className="w-6 h-6 text-primary" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">What happens next?</h3>
                      
                      {productType === 'digital' ? (
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-primary" />
                            <span className="font-semibold text-primary">Check your email for download links</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <span>Download links will arrive within 2-5 minutes</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <span>Links expire in 24 hours for security</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <span>Make sure to check your spam folder</span>
                          </li>
                        </ul>
                      ) : productType === 'physical' ? (
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <span>You'll receive an order confirmation email shortly</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <span>Your order will be processed within 1-2 business days</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <span>Shipping typically takes 2-3 business days</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <span>You'll receive a tracking number once shipped</span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <Download className="w-4 h-4 text-primary" />
                            <span className="font-semibold text-primary">Digital products: Check your email (2-5 minutes)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-primary" />
                            <span className="font-semibold text-primary">Physical products: Ships in 2-3 business days</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <span>Download links expire in 24 hours</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <span>You'll receive tracking for physical items</span>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <p className="text-sm text-muted-foreground">
                    Questions about your order? Contact us at{" "}
                    <a href="mailto:hello@invisionnetwork.org" className="text-primary hover:underline">
                      hello@invisionnetwork.org
                    </a>
                  </p>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in slide-in-from-bottom duration-500 delay-300">
              <Button asChild size="lg" className="w-full">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Return Home
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full">
                <Link to="/resources">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
