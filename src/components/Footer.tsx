import { Link } from "react-router-dom";
import { Facebook, Linkedin, Youtube, Instagram, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TrustedTechLogos from "./TrustedTechLogos";
import invisionLogo from "@/assets/invision-logo.png";

const Footer = () => {
  return (
    <>
      <TrustedTechLogos />
      <footer className="bg-gradient-to-br from-[hsl(260,70%,25%)] to-[hsl(260,65%,35%)] text-primary-foreground relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
      </div>
      
      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 mb-8">
          {/* Column 1: Quick Links */}
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

          {/* Column 2: Training */}
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

          {/* Column 3: Support */}
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

          {/* Column 4: Legal */}
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

          {/* Column 5: Community */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-bold text-lg mb-4">Community</h3>
            <ul className="space-y-2">
              <li className="text-primary-foreground/80">20% Military Discount</li>
              <li className="text-primary-foreground/80">25% Cancer Patient Discount</li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Church Partnerships
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Donate Training
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-primary-foreground/10 rounded-lg p-4 md:p-6 mb-6 md:mb-8">
          <h3 className="font-bold text-lg md:text-xl mb-2">Monthly AI Safety Tips</h3>
          <p className="text-primary-foreground/80 mb-4 text-sm md:text-base">Stay informed about the latest scams and protection strategies.</p>
          <form className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 h-11 md:h-10"
            />
            <Button variant="default" className="bg-accent hover:bg-accent/90 h-11 md:h-10 whitespace-nowrap" type="submit">
              SUBSCRIBE
            </Button>
          </form>
        </div>

        {/* Social Media */}
        <div className="flex justify-center gap-4 md:gap-6 mb-6 md:mb-8">
          <a 
            href="https://facebook.com/invisionnetwork" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary-foreground/80 hover:text-accent transition-all md:transform md:hover:scale-125 md:hover:rotate-6 duration-300 p-2 hover:bg-accent/10 rounded-full active:scale-95" 
            aria-label="Follow us on Facebook"
          >
            <Facebook className="w-6 h-6 md:w-6 md:h-6" />
          </a>
          <a 
            href="https://linkedin.com/company/invisionnetwork" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary-foreground/80 hover:text-accent transition-all md:transform md:hover:scale-125 md:hover:rotate-6 duration-300 p-2 hover:bg-accent/10 rounded-full active:scale-95" 
            aria-label="Connect with us on LinkedIn"
          >
            <Linkedin className="w-6 h-6 md:w-6 md:h-6" />
          </a>
          <a 
            href="https://youtube.com/@invisionnetwork" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary-foreground/80 hover:text-accent transition-all md:transform md:hover:scale-125 md:hover:rotate-6 duration-300 p-2 hover:bg-accent/10 rounded-full active:scale-95" 
            aria-label="Subscribe to our YouTube channel"
          >
            <Youtube className="w-6 h-6 md:w-6 md:h-6" />
          </a>
          <a 
            href="https://instagram.com/invisionnetwork" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary-foreground/80 hover:text-accent transition-all md:transform md:hover:scale-125 md:hover:rotate-6 duration-300 p-2 hover:bg-accent/10 rounded-full active:scale-95" 
            aria-label="Follow us on Instagram"
          >
            <Instagram className="w-6 h-6 md:w-6 md:h-6" />
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-6 md:pt-8 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
            <div className="flex items-center gap-3 text-center md:text-left">
              <img 
                src={invisionLogo} 
                alt="InVision Network Logo" 
                className="h-6 w-6"
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
    </>
  );
};

export default Footer;
