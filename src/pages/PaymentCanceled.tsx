import { Link } from "react-router-dom";
import { XCircle, Home, ShoppingCart, HelpCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";

export default function PaymentCanceled() {
  return (
    <>
      <SEO 
        title="Payment Canceled"
        description="Your payment was canceled. Your cart items have been saved."
      />
      <Navigation />
      
      <div className="min-h-screen bg-gradient-to-b from-background via-secondary/10 to-background relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-destructive/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        </div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground) / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Cancel Icon */}
            <div className="text-center mb-12">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-destructive/20 rounded-full blur-2xl scale-150" />
                <div className="relative inline-flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-destructive/20 to-destructive/10 mb-8 animate-in zoom-in duration-500 border border-destructive/20">
                  <XCircle className="w-16 h-16 md:w-20 md:h-20 text-destructive" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-in slide-in-from-bottom duration-500">
                Payment Canceled
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground animate-in slide-in-from-bottom duration-500 delay-100 max-w-2xl mx-auto">
                Your payment was canceled. Don't worry - your cart items have been saved.
              </p>
            </div>

            {/* Information Card */}
            <Card className="p-10 md:p-12 mb-10 animate-in slide-in-from-bottom duration-500 delay-200 shadow-xl">
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold text-xl mb-4 flex items-center gap-3">
                    <HelpCircle className="w-6 h-6 text-primary" />
                    What happened?
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    You chose to cancel the payment process. No charges were made to your card,
                    and your shopping cart items are still saved.
                  </p>
                </div>

                <div className="border-t pt-8">
                  <h3 className="font-semibold text-xl mb-4">Need help?</h3>
                  <div className="space-y-3 text-base text-muted-foreground">
                    <p>If you encountered any issues during checkout, we're here to help:</p>
                    <ul className="space-y-3 ml-4">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span>Email us at <a href="mailto:hello@invisionnetwork.org" className="text-primary hover:underline font-medium">hello@invisionnetwork.org</a></span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span>Call us at <a href="tel:+19373018749" className="text-primary hover:underline font-medium">(937) 301-8749</a></span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span>Visit our <Link to="/faq" className="text-primary hover:underline font-medium">FAQ page</Link></span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="border-t pt-8 bg-muted/30 -m-10 md:-m-12 mt-8 p-8 rounded-b-xl">
                  <p className="text-base text-center text-muted-foreground">
                    Your items are safe in your cart. Ready to try again?
                  </p>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in slide-in-from-bottom duration-500 delay-300 max-w-2xl mx-auto">
              <Button asChild size="lg" className="w-full h-14 text-base font-semibold">
                <Link to="/resources">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  View Cart & Checkout
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full h-14 text-base font-semibold">
                <Link to="/">
                  <Home className="w-5 h-5 mr-2" />
                  Return Home
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
