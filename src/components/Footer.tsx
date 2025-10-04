import { Link } from "react-router-dom";
import { Facebook, Linkedin, Youtube, Instagram, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[hsl(260,70%,25%)] to-[hsl(260,65%,35%)] text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
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
                <Link to="/training" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Learn & Train
                </Link>
              </li>
              <li>
                <Link to="/scam-shield" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Family Scam Shield
                </Link>
              </li>
              <li>
                <Link to="/business" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  AI for Business
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
                <Link to="/resources#faq" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/resources#scripts" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Emergency Scripts (Free)
                </Link>
              </li>
              <li>
                <Link to="/scam-shield#submit" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Submit Suspicious Item
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Community */}
          <div>
            <h3 className="font-bold text-lg mb-4">Community</h3>
            <ul className="space-y-2">
              <li className="text-primary-foreground/80">20% Military Discount</li>
              <li className="text-primary-foreground/80">25% Cancer Patient Discount</li>
              <li>
                <Link to="/partnerships" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Church Partnerships
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Donate Training
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-primary-foreground/10 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-xl mb-2">Monthly AI Safety Tips</h3>
          <p className="text-primary-foreground/80 mb-4 text-base">Stay informed about the latest scams and protection strategies.</p>
          <form className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50"
            />
            <Button variant="default" className="bg-accent hover:bg-accent/90" type="submit">
              SUBSCRIBE
            </Button>
          </form>
        </div>

        {/* Social Media */}
        <div className="flex justify-center space-x-6 mb-8">
          <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors" aria-label="Facebook">
            <Facebook className="w-6 h-6" />
          </a>
          <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors" aria-label="LinkedIn">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors" aria-label="YouTube">
            <Youtube className="w-6 h-6" />
          </a>
          <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors" aria-label="Instagram">
            <Instagram className="w-6 h-6" />
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/80 text-sm text-center md:text-left">
              © 2025 InVision Network | Veteran-Owned | Based in Dayton, OH | Serving Families Nationwide
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs">
                <Shield className="w-4 h-4 text-accent" />
                <span className="text-primary-foreground/80">BBB Accredited</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Shield className="w-4 h-4 text-accent" />
                <span className="text-primary-foreground/80">Veteran-Owned</span>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <p className="text-primary-foreground/60 text-xs mt-6 max-w-4xl mx-auto text-center leading-relaxed">
            InVision Network provides educational services only. We are not legal, financial, tax, or licensed cybersecurity professionals. In case of active fraud, identity theft, or criminal activity, contact local law enforcement (911), your bank's fraud department immediately using official phone numbers, and report to FTC at IdentityTheft.gov. We never request passwords, 2FA codes, bank account information, or Social Security numbers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
