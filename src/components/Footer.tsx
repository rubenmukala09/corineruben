import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Linkedin,
  Youtube,
  Instagram,
  Shield,
  Mail,
  MapPin,
  ArrowRight,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TrustedTechLogos from "./TrustedTechLogos";
import { SITE } from "@/config/site";
import invisionLogo from "@/assets/shield-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useConfetti } from "@/hooks/useConfetti";
import { z } from "zod";
import { clearAllCachesAndReload } from "@/utils/cacheUtils";

const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email too long"),
});

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { fireSuccess } = useConfetti();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = newsletterSchema.safeParse({ email: email.trim() });
    if (!validation.success) {
      toast.error(
        validation.error.errors[0]?.message ||
          "Please enter a valid email address",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke(
        "newsletter-signup",
        {
          body: { email: validation.data.email },
        },
      );

      if (error) throw error;

      if (data?.alreadySubscribed) {
        toast.info("You're already subscribed!");
      } else {
        fireSuccess();
        toast.success("✓ Subscribed! Check your email.");
      }

      setEmail("");
    } catch (error: any) {
      console.error("Newsletter signup error:", error);
      toast.error("Subscription failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative">
      {/* Tech Partners Marquee */}
      <TrustedTechLogos />

      {/* Main Footer */}
      <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 text-white relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Top Section - Brand & Newsletter */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10 pb-8 border-b border-white/10">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/10 border border-white/15 shadow-lg">
                  <img
                    src={invisionLogo}
                    alt="InVision Network"
                    className="h-8 w-8 object-contain brightness-0 invert premium-4k-image"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold">InVision Network</h2>
                  <p className="text-xs text-white/50">
                    AI Security & Protection
                  </p>
                </div>
              </div>
              <p className="text-base text-white/60 max-w-md leading-relaxed">
                Protecting families and businesses from AI-powered scams with
                cutting-edge technology and expert training.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="flex items-center gap-2 text-sm text-white/50">
                  <MapPin className="w-4 h-4" />
                  Serving the {SITE.location.areaLabel}
                </span>
                <span className="flex items-center gap-2 text-sm text-white/50">
                  <Mail className="w-4 h-4" />
                  {SITE.emails.hello}
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="lg:pl-8">
              <h3 className="text-lg font-semibold mb-2 text-white">
                Stay Protected
              </h3>
              <p className="text-sm text-white/60 mb-4">
                Get monthly AI safety tips and scam alerts delivered to your
                inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/45 focus:bg-white/15 rounded-xl disabled:opacity-50"
                  aria-label="Email address for newsletter"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-coral-400 to-coral-500 hover:brightness-105 px-5 rounded-xl border border-coral-300/20 disabled:opacity-50"
                  aria-label="Subscribe to newsletter"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
            <div>
              <h4 className="font-bold text-base mb-4 text-white/90">
                Navigation
              </h4>
              <ul className="space-y-3">
                {[
                  { to: "/", label: "Home" },
                  { to: "/services", label: "Services" },
                  { to: "/training", label: "Training" },
                  { to: "/business", label: "AI for Business" },
                  { to: "/resources", label: "Resources" },
                  { to: "/about", label: "About" },
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-base text-white/65 hover:text-coral-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-base mb-4 text-white/90">
                Services
              </h4>
              <ul className="space-y-3">
                {[
                  "ScamShield Protection",
                  "Safety Audit",
                  "Web Design",
                  "AI Automation",
                ].map((label, i) => (
                  <li key={i}>
                    <Link
                      to="/services"
                      className="text-base text-white/65 hover:text-coral-300 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-base mb-4 text-white/90">
                Training
              </h4>
              <ul className="space-y-3">
                {[
                  "Zoom Classes",
                  "In-Person",
                  "Group Bookings",
                  "Gift Certificates",
                ].map((label, i) => (
                  <li key={i}>
                    <Link
                      to="/training"
                      className="text-base text-white/65 hover:text-coral-300 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-base mb-4 text-white/90">
                Support
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/faq"
                    className="text-base text-white/65 hover:text-coral-300 transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-base text-white/65 hover:text-coral-300 transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-base text-white/65 hover:text-coral-300 transition-colors"
                  >
                    Emergency Help
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      toast.info("Clearing cache...", { duration: 1500 });
                      setTimeout(() => clearAllCachesAndReload(), 300);
                    }}
                    className="flex items-center gap-1.5 text-base text-white/65 hover:text-coral-300 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Clear Cache & Refresh
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-base mb-4 text-white/90">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-base text-white/65 hover:text-coral-300 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-of-service"
                    className="text-base text-white/65 hover:text-coral-300 transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/refund-policy"
                    className="text-base text-white/65 hover:text-coral-300 transition-colors"
                  >
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cookie-policy"
                    className="text-base text-white/65 hover:text-coral-300 transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/acceptable-use"
                    className="text-base text-white/65 hover:text-coral-300 transition-colors"
                  >
                    Acceptable Use
                  </Link>
                </li>
                <li>
                  <Link
                    to="/disclaimer"
                    className="text-base text-white/65 hover:text-coral-300 transition-colors"
                  >
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <p className="text-base text-white/50">
                  © {new Date().getFullYear()} InVision Network. All rights
                  reserved.
                </p>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-sm text-white/60">
                    <Shield className="w-5 h-5 text-emerald-500/80" />
                    Community Trusted
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-white/60">
                    <Shield className="w-5 h-5 text-amber-500/80" />
                    Supports Veterans
                  </span>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-2">
                {[
                  {
                    href: "https://facebook.com/invisionnetwork",
                    icon: Facebook,
                    label: "Facebook",
                  },
                  {
                    href: "https://linkedin.com/company/invision-network",
                    icon: Linkedin,
                    label: "LinkedIn",
                  },
                  {
                    href: "https://youtube.com/invisionnetwork",
                    icon: Youtube,
                    label: "YouTube",
                  },
                  {
                    href: "https://instagram.com/invisionnetwork",
                    icon: Instagram,
                    label: "Instagram",
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/8 hover:bg-white/15 border border-white/15 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 text-white/60" />
                  </a>
                ))}
              </div>
            </div>

            {/* Legal Disclaimer */}
            <p className="text-white/40 text-sm text-center leading-relaxed max-w-4xl mx-auto">
              InVision Network provides educational services only. We are not
              legal, financial, tax, or licensed cybersecurity professionals. In
              case of active fraud, identity theft, or criminal activity,
              contact local law enforcement (911), your bank's fraud department
              immediately using official phone numbers, and report to FTC at
              IdentityTheft.gov. We never request passwords, 2FA codes, bank
              account information, or Social Security numbers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
