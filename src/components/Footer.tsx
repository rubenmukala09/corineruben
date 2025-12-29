import { Link } from "react-router-dom";
import { Facebook, Linkedin, Youtube, Instagram, Shield, Mail, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TrustedTechLogos from "./TrustedTechLogos";
import invisionLogo from "@/assets/shield-logo.png";

const Footer = () => {
  return (
    <footer className="relative">
      {/* Trusted Tech Logos - Stats & Partners */}
      <TrustedTechLogos />

      {/* Main Footer - Brighter with gradient */}
      <div className="bg-gradient-to-br from-slate-800 via-indigo-900/90 to-purple-900/80 text-white relative overflow-hidden">
        {/* Vibrant Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Dot pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} />
          {/* Colorful gradient orbs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/30 to-accent/20 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 py-14 relative z-10">
          {/* Top Section - Brand & Newsletter */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14 pb-12 border-b border-white/15">
            {/* Brand */}
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 border border-white/20 shadow-lg shadow-primary/20">
                  <img 
                    src={invisionLogo} 
                    alt="InVision Network" 
                    className="h-10 w-10 brightness-0 invert"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-white/80 bg-clip-text">InVision Network</h2>
                  <p className="text-sm text-cyan-300/80 font-medium">AI Security & Protection</p>
                </div>
              </div>
              <p className="text-sm text-white/70 max-w-md leading-relaxed">
                Protecting families and businesses from AI-powered scams with cutting-edge technology and expert training. Your safety is our mission.
              </p>
              {/* Contact Info */}
              <div className="flex flex-wrap gap-5 pt-2">
                <div className="flex items-center gap-2 text-sm text-white/60 hover:text-white/90 transition-colors">
                  <div className="p-1.5 rounded-lg bg-white/10">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span>Kettering, Ohio</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60 hover:text-white/90 transition-colors">
                  <div className="p-1.5 rounded-lg bg-white/10">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span>hello@invisionnetwork.org</span>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="lg:pl-10">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-xl font-bold">Stay Protected</h3>
              </div>
              <p className="text-sm text-white/70 mb-5">
                Get monthly AI safety tips and scam alerts delivered to your inbox.
              </p>
              <form className="flex gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-primary/60 rounded-xl h-12"
                />
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold px-6 rounded-xl h-12 shadow-lg shadow-primary/30"
                >
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-14">
            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-sm mb-5 text-cyan-300">Navigation</h4>
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
                      className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-sm mb-5 text-cyan-300">Services</h4>
              <ul className="space-y-3">
                {[
                  { to: "/services", label: "ScamShield Protection" },
                  { to: "/services", label: "Safety Audit" },
                  { to: "/business#website-design", label: "Web Design" },
                  { to: "/business#automation-pricing", label: "AI Automation" },
                ].map((link, i) => (
                  <li key={i}>
                    <Link 
                      to={link.to} 
                      className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Training */}
            <div>
              <h4 className="font-bold text-sm mb-5 text-cyan-300">Training</h4>
              <ul className="space-y-3">
                {[
                  { to: "/training#zoom", label: "Zoom Classes" },
                  { to: "/training#in-person", label: "In-Person" },
                  { to: "/training#bulk", label: "Group Bookings" },
                  { to: "/training#gift", label: "Gift Certificates" },
                ].map((link, i) => (
                  <li key={i}>
                    <Link 
                      to={link.to} 
                      className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold text-sm mb-5 text-cyan-300">Support</h4>
              <ul className="space-y-3">
                {[
                  { to: "/faq", label: "FAQ" },
                  { to: "/contact", label: "Contact" },
                  { to: "/contact", label: "Emergency Help" },
                ].map((link, i) => (
                  <li key={i}>
                    <Link 
                      to={link.to} 
                      className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold text-sm mb-5 text-cyan-300">Legal</h4>
              <ul className="space-y-3">
                {[
                  { to: "/privacy-policy", label: "Privacy Policy" },
                  { to: "/terms-of-service", label: "Terms of Service" },
                  { to: "/contact", label: "Refund Policy" },
                ].map((link, i) => (
                  <li key={i}>
                    <Link 
                      to={link.to} 
                      className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/15">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Copyright & Badges */}
              <div className="flex flex-col md:flex-row items-center gap-5">
                <p className="text-sm text-white/50">
                  © {new Date().getFullYear()} InVision Network. All rights reserved.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs text-white/70">BBB Accredited</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <Shield className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs text-white/70">Veteran Owned</span>
                  </div>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                {[
                  { href: "https://facebook.com/invisionnetwork", icon: Facebook, label: "Facebook", color: "hover:bg-blue-500/20 hover:border-blue-400/40" },
                  { href: "https://linkedin.com/company/invision-network", icon: Linkedin, label: "LinkedIn", color: "hover:bg-sky-500/20 hover:border-sky-400/40" },
                  { href: "https://youtube.com/invisionnetwork", icon: Youtube, label: "YouTube", color: "hover:bg-red-500/20 hover:border-red-400/40" },
                  { href: "https://instagram.com/invisionnetwork", icon: Instagram, label: "Instagram", color: "hover:bg-pink-500/20 hover:border-pink-400/40" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2.5 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:scale-110 ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 text-white/70" />
                  </a>
                ))}
              </div>
            </div>

            {/* Legal Disclaimer */}
            <p className="text-white/40 text-xs text-center leading-relaxed max-w-4xl mx-auto mt-8">
              InVision Network provides educational services only. We are not legal, financial, tax, or licensed cybersecurity professionals. In case of active fraud, contact local law enforcement (911), your bank's fraud department, and report to FTC at IdentityTheft.gov.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
