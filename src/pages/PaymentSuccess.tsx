import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, Package, Home, ShoppingBag, Mail, Download, Truck, Loader2, LogIn, ArrowRight, Heart, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import confetti from "canvas-confetti";

interface PaymentVerification {
  verified: boolean;
  status: string;
  mode?: string;
  customer_email?: string;
  product_type?: 'digital' | 'physical' | 'mixed' | 'subscription';
  is_subscription?: boolean;
  products?: string[];
  amount_total?: number;
  currency?: string;
  message?: string;
}

interface PostPurchaseSession {
  success: boolean;
  user_id?: string;
  is_new_user?: boolean;
  magic_link?: string;
  dashboard_path?: string;
  customer_email?: string;
  customer_name?: string;
  is_subscription?: boolean;
  plan_tier?: string;
}

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");
  const orderNumber = searchParams.get("order");
  const paymentType = searchParams.get("type");
  
  const [verifying, setVerifying] = useState(true);
  const [verification, setVerification] = useState<PaymentVerification | null>(null);
  const [postPurchase, setPostPurchase] = useState<PostPurchaseSession | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [autoLoginCountdown, setAutoLoginCountdown] = useState(5);
  const [showAutoLogin, setShowAutoLogin] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setVerifying(false);
        setVerification({ verified: true, status: 'paid', product_type: 'physical' });
        return;
      }

      try {
        // First verify the payment
        const { data, error: invokeError } = await supabase.functions.invoke('verify-payment', {
          body: { session_id: sessionId }
        });

        if (invokeError) {
          console.error('Verification error:', invokeError);
          setError('Unable to verify payment. Please contact support if you need assistance.');
          setVerification({ verified: true, status: 'paid', product_type: 'physical' });
        } else {
          setVerification(data);
          
          // For subscriptions, create post-purchase session for auto-login
          if (data?.verified && (data?.is_subscription || paymentType === 'subscription')) {
            try {
              const { data: sessionData, error: sessionError } = await supabase.functions.invoke('create-post-purchase-session', {
                body: { session_id: sessionId }
              });
              
              if (!sessionError && sessionData?.success) {
                setPostPurchase(sessionData);
                setShowAutoLogin(true);
              }
            } catch (sessionErr) {
              console.error('Post-purchase session creation failed:', sessionErr);
              // Non-fatal - user can still manually login
            }
          }
        }
      } catch (err) {
        console.error('Payment verification failed:', err);
        setVerification({ verified: true, status: 'paid', product_type: 'physical' });
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [sessionId, paymentType]);

  // Auto-login countdown for subscriptions
  useEffect(() => {
    if (showAutoLogin && postPurchase?.magic_link && autoLoginCountdown > 0) {
      const timer = setTimeout(() => {
        setAutoLoginCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (showAutoLogin && postPurchase?.magic_link && autoLoginCountdown === 0) {
      // Redirect to magic link for auto-login
      window.location.href = postPurchase.magic_link;
    }
  }, [showAutoLogin, postPurchase, autoLoginCountdown]);

  useEffect(() => {
    if (!verifying && verification?.verified) {
      // Trigger confetti animation on verified payment
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
    }
  }, [verifying, verification]);

  const handleManualLogin = () => {
    if (postPurchase?.magic_link) {
      window.location.href = postPurchase.magic_link;
    } else {
      navigate('/auth');
    }
  };

  const handleSkipAutoLogin = () => {
    setShowAutoLogin(false);
  };

  const getProductTypeMessage = () => {
    if (!verification) return null;

    // Special handling for donations
    if (paymentType === 'donation') {
      return (
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
            <Heart className="w-6 h-6 text-rose-500" />
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-rose-600">Your Generosity Matters!</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-500" />
                <span>Your donation helps protect families from AI scams</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span>A receipt will be sent to <strong>{verification.customer_email || 'your email'}</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span>100% of your donation goes directly to our mission</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span>You're making a real difference in someone's life</span>
              </li>
            </ul>
          </div>
        </div>
      );
    }

    if (verification.is_subscription) {
      return (
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Subscription Activated!</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Your subscription is now active</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>You'll receive a confirmation email at <strong>{verification.customer_email}</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Access your benefits immediately through your dashboard</span>
              </li>
            </ul>
          </div>
        </div>
      );
    }

    switch (verification.product_type) {
      case 'digital':
        return (
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
              <Download className="w-6 h-6 text-success" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Digital Product Delivery</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>Check your email for download links</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Sent to: <strong>{verification.customer_email}</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Expected delivery: Within 2-5 minutes</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Download links expire in 24 hours</span>
                </li>
              </ul>
            </div>
          </div>
        );
      case 'physical':
        return (
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Physical Product Shipping</h3>
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
            </div>
          </div>
        );
      case 'mixed':
        return (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                <Download className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Digital Products</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>Check your email for download links (within 2-5 minutes)</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Physical Products</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Will be shipped within 1-2 business days</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">What happens next?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>You'll receive an order confirmation email shortly</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Your order will be processed within 1-2 business days</span>
                </li>
              </ul>
            </div>
          </div>
        );
    }
  };

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
            {verifying ? (
              <div className="text-center py-20">
                <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">Verifying your payment...</p>
              </div>
            ) : (
              <>
                {/* Success Icon */}
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 animate-in zoom-in duration-500 ${
                    paymentType === 'donation' 
                      ? 'bg-gradient-to-br from-rose-500/20 to-pink-500/20' 
                      : 'bg-success/10'
                  }`}>
                    {paymentType === 'donation' ? (
                      <Heart className="w-12 h-12 text-rose-500" />
                    ) : (
                      <CheckCircle className="w-12 h-12 text-success" />
                    )}
                  </div>
                  <h1 className={`text-4xl md:text-5xl font-bold mb-4 animate-in slide-in-from-bottom duration-500 ${
                    paymentType === 'donation'
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent'
                      : 'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'
                  }`}>
                    {paymentType === 'donation' 
                      ? 'Thank You, Hero! 💖' 
                      : verification?.is_subscription 
                        ? 'Subscription Confirmed!' 
                        : 'Order Confirmed!'}
                  </h1>
                  <p className="text-lg text-muted-foreground animate-in slide-in-from-bottom duration-500 delay-100">
                    {paymentType === 'donation' 
                      ? 'Your generous donation makes a real difference in protecting families from scams.'
                      : verification?.is_subscription 
                        ? 'Your subscription is now active.' 
                        : 'Your order has been successfully placed.'}
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

                    {verification?.products && verification.products.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Items Purchased</h3>
                        <ul className="space-y-1">
                          {verification.products.map((product, i) => (
                            <li key={i} className="text-foreground">{product}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="border-t pt-6">
                      {getProductTypeMessage()}
                    </div>

                    {error && (
                      <div className="bg-warning/10 text-warning-foreground p-4 rounded-lg text-sm">
                        {error}
                      </div>
                    )}

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

                {/* Auto-Login Banner for Subscriptions */}
                {showAutoLogin && postPurchase?.magic_link && (
                  <Card className="p-6 mb-8 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 animate-in slide-in-from-bottom duration-500 delay-250">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                          <LogIn className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {postPurchase.is_new_user ? 'Account Created!' : 'Welcome Back!'}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Redirecting to your dashboard in <strong className="text-primary">{autoLoginCountdown}s</strong>
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleManualLogin} className="gap-2">
                          <ArrowRight className="w-4 h-4" />
                          Go Now
                        </Button>
                        <Button variant="ghost" onClick={handleSkipAutoLogin}>
                          Skip
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in slide-in-from-bottom duration-500 delay-300">
                  {showAutoLogin && postPurchase ? (
                    <>
                      <Button onClick={handleManualLogin} size="lg" className="w-full">
                        <LogIn className="w-4 h-4 mr-2" />
                        Go to Dashboard
                      </Button>
                      <Button asChild size="lg" variant="outline" className="w-full">
                        <Link to="/">
                          <Home className="w-4 h-4 mr-2" />
                          Return Home
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
