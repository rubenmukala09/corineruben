import { Shield, RefreshCw, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const TrustDisclaimer = () => {
  return (
    <section className="py-12 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold text-center mb-8 text-foreground">
            Your Trust & Security Matter
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Secure Payments */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-foreground">Secure Payments</h4>
                <p className="text-sm text-muted-foreground">
                  All transactions processed securely through Stripe with SSL encryption
                </p>
              </div>
            </div>

            {/* Money-Back Guarantee */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-green-600" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-foreground">30-Day Guarantee</h4>
                <p className="text-sm text-muted-foreground">
                  Full refund on digital products within 30 days, no questions asked
                </p>
              </div>
            </div>

            {/* Data Protection */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-foreground">Data Protected</h4>
                <p className="text-sm text-muted-foreground">
                  Your personal information is encrypted and never shared with third parties
                </p>
              </div>
            </div>

            {/* Contact Support */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-purple-600" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-foreground">24/7 Support</h4>
                <p className="text-sm text-muted-foreground">
                  Questions? Contact us at{" "}
                  <a href="mailto:hello@invisionnetwork.org" className="text-primary hover:underline">
                    hello@invisionnetwork.org
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Policy Links */}
          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              <Link to="/privacy-policy" className="text-primary hover:underline font-medium">
                Privacy Policy
              </Link>
              {" • "}
              <Link to="/terms-of-service" className="text-primary hover:underline font-medium">
                Terms of Service
              </Link>
              {" • "}
              <span className="font-medium">Full Refund Policy Available on Request</span>
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              InVision Network is committed to transparency and your peace of mind. We're here to help, not just to sell.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
