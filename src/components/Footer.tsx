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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TrustedTechLogos from "./TrustedTechLogos";
import { SITE } from "@/config/site";
import invisionLogo from "@/assets/shield-logo-nav.webp";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useConfetti } from "@/hooks/useConfetti";
import { z } from "zod";

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
      <div
        className="text-white relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #2a2345 0%, #221d3a 40%, #1c1830 100%)" }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

        <div className="container mx-auto px-5 sm:px-6 lg:px-12 pt-10 sm:pt-14 pb-8 sm:pb-10 relative z-10">
          {/* Top Section - Brand & Newsletter */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-10 sm:mb-14">
            {/* Brand */}
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white/8 border border-white/10">
                  <img
                    src={invisionLogo}
                    alt="InVision Network"
                    className="h-7 w-7 sm:h-8 sm:w-8 object-contain brightness-0 invert premium-4k-image"
                  />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white">InVision Network</h2>
                  <p className="text-[10px] sm:text-xs text-white/40">
                    AI Security & Protection
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-white/50 max-w-md leading-relaxed">
                Protecting families and businesses from AI-powered scams with
                cutting-edge technology and expert training.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-5">
                <span className="flex items-center gap-2 text-xs sm:text-sm text-white/40">
                  <MapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  {SITE.location.city}, {SITE.location.region}
                </span>
                <span className="flex items-center gap-2 text-xs sm:text-sm text-white/40">
                  <Mail className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  {SITE.emails.hello}
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="lg:pl-8 lg:flex lg:flex-col lg:justify-center">
              <h3 className="text-base sm:text-lg font-bold mb-1.5 sm:mb-2 text-white">
                Stay Protected
              </h3>
              <p className="text-xs sm:text-sm text-white/50 mb-3 sm:mb-4">
                Get monthly AI safety tips and scam alerts delivered to your
                inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2 sm:gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="flex-1 h-10 sm:h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:bg-white/8 focus:border-purple-500/40 rounded-lg sm:rounded-xl disabled:opacity-50 text-sm"
                  aria-label="Email address for newsletter"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-purple-600 hover:bg-purple-500 border-0 p-0 flex-shrink-0 disabled:opacity-50"
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

          {/* Divider */}
          <div className="h-px bg-white/8 mb-8 sm:mb-12" />

          {/* Navigation Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 mb-10 sm:mb-14">
            <div>
              <h4 className="font-bold text-xs sm:text-sm mb-3 sm:mb-5 text-white">
                Navigation
              </h4>
              <ul className="space-y-2 sm:space-y-3">
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
                      className="text-xs sm:text-sm text-white/40 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs sm:text-sm mb-3 sm:mb-5 text-white">
                Services
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  "ScamShield Protection",
                  "Safety Audit",
                  "Web Design",
                  "AI Automation",
                ].map((label, i) => (
                  <li key={i}>
                    <Link
                      to="/services"
                      className="text-xs sm:text-sm text-white/40 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs sm:text-sm mb-3 sm:mb-5 text-white">
                Training
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  "Zoom Classes",
                  "In-Person",
                  "Group Bookings",
                  "Gift Certificates",
                ].map((label, i) => (
                  <li key={i}>
                    <Link
                      to="/training"
                      className="text-xs sm:text-sm text-white/40 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs sm:text-sm mb-3 sm:mb-5 text-white">
                Support
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link
                    to="/faq"
                    className="text-xs sm:text-sm text-white/40 hover:text-white transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-xs sm:text-sm text-white/40 hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-xs sm:text-sm text-white/40 hover:text-white transition-colors"
                  >
                    Emergency Help
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs sm:text-sm mb-3 sm:mb-5 text-white">Legal</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-xs sm:text-sm text-white/40 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-of-service"
                    className="text-xs sm:text-sm text-white/40 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/refund-policy"
                    className="text-xs sm:text-sm text-white/40 hover:text-white transition-colors"
                  >
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="h-px bg-white/8 mb-4 sm:mb-6" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <p className="text-xs sm:text-sm text-white/35">
                © {new Date().getFullYear()} InVision Network. All rights
                reserved.
              </p>
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="flex items-center gap-1.5 text-[10px] sm:text-xs text-white/45">
                  <Shield className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-emerald-500/60" />
                  BBB Accredited
                </span>
                <span className="flex items-center gap-1.5 text-[10px] sm:text-xs text-white/45">
                  <Shield className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-500/60" />
                  Veteran-Supporting
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
                  className="w-9 sm:w-10 h-9 sm:h-10 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 border border-white/8 transition-colors flex items-center justify-center"
                  aria-label={social.label}
                >
                  <social.icon className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-white/50" />
                </a>
              ))}
            </div>
          </div>

          {/* Legal Disclaimer */}
          <p className="text-white/25 text-[10px] sm:text-xs text-center leading-relaxed max-w-4xl mx-auto">
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
    </footer>
  );
};

export default Footer;
