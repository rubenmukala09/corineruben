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
      
      <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto">
            {/* Cancel Icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-destructive/10 mb-6 animate-in zoom-in duration-500">
                <XCircle className="w-12 h-12 text-destructive" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-in slide-in-from-bottom duration-500">
                Payment Canceled
              </h1>
              <p className="text-lg text-muted-foreground animate-in slide-in-from-bottom duration-500 delay-100">
                Your payment was canceled. Don't worry - your cart items have been saved.
              </p>
            </div>

            {/* Information Card */}
            <Card className="p-8 mb-8 animate-in slide-in-from-bottom duration-500 delay-200">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-primary" />
                    What happened?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    You chose to cancel the payment process. No charges were made to your card,
                    and your shopping cart items are still saved.
                  </p>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-3">Need help?</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>If you encountered any issues during checkout, we're here to help:</p>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>Email us at <a href="mailto:hello@invisionnetwork.org" className="text-primary hover:underline">hello@invisionnetwork.org</a></span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>Call us at <a href="tel:+19373018749" className="text-primary hover:underline">(937) 301-8749</a></span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>Visit our <Link to="/faq" className="text-primary hover:underline">FAQ page</Link></span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="border-t pt-6 bg-muted/30 -m-8 mt-6 p-6 rounded-b-lg">
                  <p className="text-sm text-center text-muted-foreground">
                    Your items are safe in your cart. Ready to try again?
                  </p>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in slide-in-from-bottom duration-500 delay-300">
              <Button asChild size="lg" className="w-full">
                <Link to="/resources">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  View Cart & Checkout
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
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
