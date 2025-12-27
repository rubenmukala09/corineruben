import { Link } from "react-router-dom";
import { Facebook, Linkedin, Youtube, Instagram, Shield, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TrustedTechLogos from "./TrustedTechLogos";
import invisionLogo from "@/assets/shield-logo.png";

const Footer = () => {
  return (
    <footer className="relative">
      {/* Trusted Tech Logos - Scrolling Section */}
      <TrustedTechLogos />

      {/* Main Footer */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-white relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute inset-0 opacity-[0.02]" 
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />
          
          {/* Gradient Orbs */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/8 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
          {/* Footer Navigation Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-6 mb-12">
            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-indigo-400">Quick Links</h3>
              <ul className="space-y-2.5">
                {[
                  { to: "/", label: "Home" },
                  { to: "/services", label: "Services" },
                  { to: "/training", label: "Learn & Train" },
                  { to: "/services", label: "ScamShield Protection" },
                  { to: "/business", label: "AI for Business" },
                  { to: "/resources", label: "Resources" },
                  { to: "/about", label: "About" },
                  { to: "/contact", label: "Contact" }
                ].map((link) => (
                  <li key={link.to + link.label}>
                    <Link 
                      to={link.to} 
                      className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Training */}
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-indigo-400">Training</h3>
              <ul className="space-y-2.5">
                {[
                  { to: "/training#zoom", label: "Zoom Classes" },
                  { to: "/training#in-person", label: "In-Person Training" },
                  { to: "/training#bulk", label: "Bulk/Group Bookings" },
                  { to: "/training#gift", label: "Gift Certificates" }
                ].map((link) => (
                  <li key={link.to}>
                    <Link 
                      to={link.to} 
                      className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-indigo-400">Support</h3>
              <ul className="space-y-2.5">
                {[
                  { to: "/faq", label: "FAQ" },
                  { to: "/contact", label: "Emergency Scripts" },
                  { to: "/contact", label: "Submit Suspicious Item" }
                ].map((link, i) => (
                  <li key={i}>
                    <Link 
                      to={link.to} 
                      className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-indigo-400">Legal</h3>
              <ul className="space-y-2.5">
                {[
                  { to: "/privacy-policy", label: "Privacy Policy" },
                  { to: "/terms-of-service", label: "Terms of Service" },
                  { to: "/refunds", label: "Refund Policy" },
                  { to: "/disclaimer", label: "Disclaimer" }
                ].map((link, i) => (
                  <li key={i}>
                    <Link 
                      to={link.to} 
                      className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community */}
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-indigo-400">Community</h3>
              <ul className="space-y-2.5">
                <li className="text-sm text-white/60">20% Military Discount</li>
                <li className="text-sm text-white/60">25% Cancer Patient Discount</li>
                <li>
                  <Link 
                    to="/contact" 
                    className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                  >
                    Church Partnerships
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                  >
                    Donate Training
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Signup Section */}
          <div className="max-w-xl mx-auto mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Monthly AI Safety Tips</h3>
              </div>
              <p className="text-sm text-white/60 mb-4">
                Stay informed about the latest scams and protection strategies.
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-white/10 border-white/10 text-white placeholder:text-white/40 focus:border-indigo-400/50 focus:bg-white/15 transition-all"
                />
                <Button 
                  type="submit"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 transition-all duration-300"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center justify-center gap-3 mb-10">
            {[
              { href: "https://facebook.com/invisionnetwork", icon: Facebook, label: "Facebook" },
              { href: "https://linkedin.com/company/invision-network", icon: Linkedin, label: "LinkedIn" },
              { href: "https://youtube.com/invisionnetwork", icon: Youtube, label: "YouTube" },
              { href: "https://instagram.com/invisionnetwork", icon: Instagram, label: "Instagram" }
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label={`Visit our ${social.label} page`}
              >
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-indigo-500/20 hover:border-indigo-400/30 transition-all duration-300 hover:scale-110">
                  <social.icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                </div>
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

          {/* Bottom Bar - Copyright & Badges */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex items-center gap-3 text-center md:text-left">
              <img 
                src={invisionLogo} 
                alt="InVision Network Logo" 
                className="h-6 w-6 brightness-0 invert opacity-80"
              />
              <p className="text-white/50 text-sm">
                © {new Date().getFullYear()} InVision Network. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-xs">
                <Shield className="w-4 h-4 text-indigo-400" />
                <span className="text-white/50">BBB Accredited</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Shield className="w-4 h-4 text-indigo-400" />
                <span className="text-white/50">Veteran Support</span>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <p className="text-white/40 text-xs text-center leading-relaxed max-w-5xl mx-auto">
            InVision Network provides educational services only. We are not legal, financial, tax, or licensed cybersecurity professionals. In case of active fraud, identity theft, or criminal activity, contact local law enforcement (911), your bank's fraud department immediately using official phone numbers, and report to FTC at IdentityTheft.gov. We never request passwords, 2FA codes, bank account information, or Social Security numbers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
