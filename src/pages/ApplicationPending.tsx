import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Clock, Mail, CheckCircle2, Home } from "lucide-react";

const ApplicationPending = () => {
  const [searchParams] = useSearchParams();
  const applicationRef = searchParams.get("ref") || "N/A";

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10" />
      
      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <Card className="p-10 lg:p-12 shadow-2xl border-2 bg-card/80 backdrop-blur-2xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-glow-purple animate-pulse">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-4">Application Submitted Successfully!</h1>
          
          <p className="text-lg text-muted-foreground mb-4">
            Thank you for applying to InVision Network. Your application has been received and is pending admin approval.
          </p>
          
          <p className="text-sm text-primary font-semibold mb-8">
            All applications require admin authorization before account activation
          </p>

          {/* Application Reference */}
          <div className="mb-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-primary" />
              <h2 className="font-semibold text-lg">Application Reference Number</h2>
            </div>
            <p className="text-2xl font-mono font-bold text-primary">{applicationRef}</p>
            <p className="text-xs text-muted-foreground mt-2">Save this number for your records</p>
          </div>

          {/* What's Next */}
          <div className="mb-8 text-left">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              What Happens Next?
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Application Review</p>
                  <p>Our admin team will review your application and verify your information</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Email Notification</p>
                  <p>You will receive an email notification once your account is activated</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Account Access</p>
                  <p>After approval, you can login and access your role-appropriate dashboard</p>
                </div>
              </div>
            </div>
          </div>

          {/* Estimated Time */}
          <div className="mb-8 p-4 bg-accent/5 rounded-lg border border-accent/20">
            <p className="font-semibold">Estimated Review Time: 24-48 hours</p>
            <p className="text-sm text-muted-foreground mt-1">
              We'll do our best to review your application as quickly as possible
            </p>
          </div>

          {/* Important Note */}
          <div className="mb-8 p-4 bg-muted/30 rounded-lg text-left">
            <p className="font-semibold mb-2">Important:</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Anyone can apply for any role in our network</li>
              <li>All applications are reviewed by our admin team for security and quality</li>
              <li>You cannot login until your account is approved by an administrator</li>
              <li>Check your email regularly for approval updates</li>
              <li>If you don't hear from us within 48 hours, please contact support</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="default" size="lg" className="bg-gradient-to-r from-primary to-accent">
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Return to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">
                <Mail className="w-4 h-4 mr-2" />
                Contact Support
              </Link>
            </Button>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Need help?{" "}
            <Link to="/contact" className="text-primary hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPending;