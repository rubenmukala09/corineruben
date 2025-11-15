import { Link } from "react-router-dom";
import { Facebook, Linkedin, Youtube, Instagram, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import TrustedTechLogos from "./TrustedTechLogos";
import { NewsletterSignup } from "./NewsletterSignup";
import invisionLogo from "@/assets/shield-logo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[hsl(260,75%,20%)] via-[hsl(280,70%,25%)] to-[hsl(260,60%,30%)] text-primary-foreground relative overflow-hidden">
      {/* Modern Geometric Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {/* Diagonal Lines Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            rgba(255,255,255,0.03) 35px,
            rgba(255,255,255,0.03) 70px
          )`
        }} />
        
        {/* Animated Gradient Orbs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-accent/30 to-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-tr from-primary/30 to-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-gradient-to-tl from-accent/20 to-primary/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s' }} />
        
        {/* Floating Circles */}
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-white/5 rounded-full" />
        <div className="absolute bottom-40 right-32 w-48 h-48 border-2 border-white/5 rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 border-2 border-white/5 rounded-full" />
      </div>
      
      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 mb-8">
          {/* Column 1: Community */}
          <div>
            <h3 className="font-bold text-lg mb-4">Community</h3>
            <ul className="space-y-2">
              <li className="text-sm text-primary-foreground/80">20% Military Discount</li>
              <li className="text-sm text-primary-foreground/80">25% Cancer Patient Discount</li>
              <li>
                <Link to="/contact" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Church Partnerships
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Donate Training
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/training" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Learn & Train
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  ScamShield Protection
                </Link>
              </li>
              <li>
                <Link to="/business" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  AI&BUSINESS
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Training */}
          <div>
            <h3 className="font-bold text-lg mb-4">Training</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/training#zoom" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Zoom Classes
                </Link>
              </li>
              <li>
                <Link to="/training#in-person" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  In-Person Training
                </Link>
              </li>
              <li>
                <Link to="/training#bulk" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Bulk/Group Bookings
                </Link>
              </li>
              <li>
                <Link to="/training#gift" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Gift Certificates
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Legal */}
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Newsletter Signup - Compact, positioned under Community and Legal */}
        <div className="lg:max-w-[40%] mb-6 md:mb-8">
          <NewsletterSignup />
        </div>

        {/* Trusted Tech Logos - Below Newsletter */}
        <div className="mb-6 md:mb-8">
          <TrustedTechLogos />
        </div>

        {/* CTA Buttons & Social Media */}
        <div className="flex flex-col items-center gap-10 mb-8 md:mb-12">
          {/* CTA Buttons - Enhanced Design */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Button 
              asChild 
              size="lg"
              className="group relative bg-gradient-to-r from-white to-white/95 text-primary hover:from-white/95 hover:to-white font-bold rounded-2xl shadow-2xl hover:shadow-[0_20px_50px_rgba(255,255,255,0.3)] hover:scale-110 transition-all duration-500 px-8 py-6 text-base md:text-lg overflow-hidden"
            >
              <Link to="/training">
                <span className="relative z-10">Start Learning Today</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg"
              className="group relative bg-transparent border-3 border-white text-white hover:bg-white hover:text-primary font-bold rounded-2xl shadow-2xl hover:shadow-[0_20px_50px_rgba(255,255,255,0.3)] hover:scale-110 transition-all duration-500 px-8 py-6 text-base md:text-lg overflow-hidden"
            >
              <Link to="/contact">
                <span className="relative z-10">Get Protected Now</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-white to-white transition-transform duration-500" />
              </Link>
            </Button>
          </div>

          {/* Social Media Links - Premium Design */}
          <div className="flex items-center gap-8">
            <a
              href="https://facebook.com/invisionnetwork"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              aria-label="Visit our Facebook page"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/40 to-blue-600/40 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-4 rounded-2xl bg-white/15 hover:bg-gradient-to-br hover:from-blue-500/30 hover:to-blue-700/30 backdrop-blur-sm transition-all duration-500 border-2 border-white/30 hover:border-blue-400/50 hover:scale-125 hover:rotate-6">
                <Facebook className="w-7 h-7 drop-shadow-lg" />
              </div>
            </a>
            <a
              href="https://linkedin.com/company/invision-network"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              aria-label="Visit our LinkedIn page"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-blue-700/40 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-4 rounded-2xl bg-white/15 hover:bg-gradient-to-br hover:from-blue-600/30 hover:to-blue-800/30 backdrop-blur-sm transition-all duration-500 border-2 border-white/30 hover:border-blue-500/50 hover:scale-125 hover:rotate-6">
                <Linkedin className="w-7 h-7 drop-shadow-lg" />
              </div>
            </a>
            <a
              href="https://youtube.com/invisionnetwork"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              aria-label="Visit our YouTube channel"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-400/40 to-red-600/40 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-4 rounded-2xl bg-white/15 hover:bg-gradient-to-br hover:from-red-500/30 hover:to-red-700/30 backdrop-blur-sm transition-all duration-500 border-2 border-white/30 hover:border-red-400/50 hover:scale-125 hover:rotate-6">
                <Youtube className="w-7 h-7 drop-shadow-lg" />
              </div>
            </a>
            <a
              href="https://instagram.com/invisionnetwork"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              aria-label="Visit our Instagram page"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400/40 via-purple-500/40 to-orange-500/40 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-4 rounded-2xl bg-white/15 hover:bg-gradient-to-br hover:from-pink-500/30 hover:via-purple-600/30 hover:to-orange-600/30 backdrop-blur-sm transition-all duration-500 border-2 border-white/30 hover:border-pink-400/50 hover:scale-125 hover:rotate-6">
                <Instagram className="w-7 h-7 drop-shadow-lg" />
              </div>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-6 md:pt-8 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
            <div className="flex items-center gap-3 text-center md:text-left">
              <img 
                src={invisionLogo} 
                alt="InVision Network Logo" 
                className="h-6 w-6 brightness-0 invert"
              />
              <p className="text-primary-foreground/80 text-sm">
                © {new Date().getFullYear()} InVision Network. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs">
                <Shield className="w-4 h-4 text-accent" />
                <span className="text-primary-foreground/80">BBB Accredited</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Shield className="w-4 h-4 text-accent" />
                <span className="text-primary-foreground/80">Veteran Support</span>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <p className="text-primary-foreground/60 text-xs mt-6 max-w-4xl mx-auto text-center leading-relaxed">
            InVision Network provides educational services only. We are not legal, financial, tax, or licensed cybersecurity professionals. In case of active fraud, identity theft, or criminal activity, contact local law enforcement (911), your bank's fraud department immediately using official phone numbers, and report to FTC at IdentityTheft.gov. We never request passwords, 2FA codes, bank account information, or Social Security numbers.
          </p>
          <div className="text-center mt-4">
            <Link to="/privacy-policy" className="text-primary-foreground/60 text-xs hover:text-primary-foreground transition-colors mx-2">Privacy Policy</Link>
            <span className="text-primary-foreground/40">|</span>
            <Link to="/terms-of-service" className="text-primary-foreground/60 text-xs hover:text-primary-foreground transition-colors mx-2">Terms of Service</Link>
            <span className="text-primary-foreground/40">|</span>
            <Link to="/contact" className="text-primary-foreground/60 text-xs hover:text-primary-foreground transition-colors mx-2">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
