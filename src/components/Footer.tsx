import { Link } from "react-router-dom";
import { Facebook, Linkedin, Youtube, Instagram, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TrustedTechLogos from "./TrustedTechLogos";
import invisionLogo from "@/assets/shield-logo.png";

const Footer = () => {
  return (
    <footer className="relative">
      {/* CTA Section - "Want to Join Our Mission?" */}
      <section className="relative bg-gradient-to-r from-[hsl(260,80%,30%)] via-[hsl(240,70%,45%)] to-[hsl(190,80%,50%)] text-white py-6 md:py-8 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-10 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Want to Join Our Mission?
            </h2>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              <Button 
                asChild 
                size="lg"
                className="bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 px-6 py-4 text-base uppercase tracking-wide"
              >
                <Link to="/training">Book Training</Link>
              </Button>
              <Button 
                asChild 
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 px-6 py-4 text-base uppercase tracking-wide"
              >
                <Link to="/business">Partner With Us</Link>
              </Button>
              <Button 
                asChild 
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 px-6 py-4 text-base uppercase tracking-wide"
              >
                <Link to="/contact">Donate a Training Seat</Link>
              </Button>
            </div>

            {/* Phone Number */}
            <div className="flex items-center justify-center gap-2 text-sm md:text-base mt-4">
              <span>Questions? Call</span>
              <a 
                href="tel:9375550199" 
                className="font-bold underline hover:text-cyan-300 transition-colors"
              >
                (937) 555-0199
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Tech Logos - Scrolling Section */}
      <TrustedTechLogos />

      {/* Main Footer */}
      <div className="bg-gradient-to-br from-[hsl(260,75%,20%)] via-[hsl(280,70%,25%)] to-[hsl(260,60%,30%)] text-primary-foreground relative overflow-hidden">
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

        <div className="container mx-auto px-4 py-5 md:py-6 relative z-10">
          {/* Footer Navigation Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-6">
            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-2 text-cyan-300">Quick Links</h3>
              <ul className="space-y-1.5">
                <li>
                  <Link to="/" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/training" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Learn & Train
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    ScamShield Protection
                  </Link>
                </li>
                <li>
                  <Link to="/business" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    AI for Business
                  </Link>
                </li>
                <li>
                  <Link to="/resources" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Training */}
            <div>
              <h3 className="font-bold text-lg mb-2 text-cyan-300">Training</h3>
              <ul className="space-y-1.5">
                <li>
                  <Link to="/training#zoom" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Zoom Classes
                  </Link>
                </li>
                <li>
                  <Link to="/training#in-person" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    In-Person Training
                  </Link>
                </li>
                <li>
                  <Link to="/training#bulk" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Bulk/Group Bookings
                  </Link>
                </li>
                <li>
                  <Link to="/training#gift" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Gift Certificates
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-bold text-lg mb-2 text-cyan-300">Support</h3>
              <ul className="space-y-1.5">
                <li>
                  <Link to="/faq" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Emergency Scripts
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Submit Suspicious Item
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-bold text-lg mb-2 text-cyan-300">Legal</h3>
              <ul className="space-y-1.5">
                <li>
                  <Link to="/privacy-policy" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-service" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h3 className="font-bold text-lg mb-2 text-cyan-300">Community</h3>
              <ul className="space-y-1.5">
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
          </div>

          {/* Newsletter Signup Section */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <h3 className="text-lg md:text-xl font-bold mb-1.5 text-center text-cyan-300">
                Monthly AI Safety Tips
              </h3>
              <p className="text-sm text-primary-foreground/80 mb-3 text-center">
                Stay informed about the latest scams and protection strategies.
              </p>
              <form className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30"
                />
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-white font-bold uppercase tracking-wide"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <a
              href="https://facebook.com/invisionnetwork"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              aria-label="Visit our Facebook page"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/40 to-blue-600/40 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-2.5 rounded-xl bg-white/15 hover:bg-gradient-to-br hover:from-blue-500/30 hover:to-blue-700/30 backdrop-blur-sm transition-all duration-500 border border-white/30 hover:border-blue-400/50 hover:scale-110">
                <Facebook className="w-5 h-5" />
              </div>
            </a>
            <a
              href="https://linkedin.com/company/invision-network"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              aria-label="Visit our LinkedIn page"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-blue-700/40 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-2.5 rounded-xl bg-white/15 hover:bg-gradient-to-br hover:from-blue-600/30 hover:to-blue-800/30 backdrop-blur-sm transition-all duration-500 border border-white/30 hover:border-blue-500/50 hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </div>
            </a>
            <a
              href="https://youtube.com/invisionnetwork"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              aria-label="Visit our YouTube channel"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-400/40 to-red-600/40 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-2.5 rounded-xl bg-white/15 hover:bg-gradient-to-br hover:from-red-500/30 hover:to-red-700/30 backdrop-blur-sm transition-all duration-500 border border-white/30 hover:border-red-400/50 hover:scale-110">
                <Youtube className="w-5 h-5" />
              </div>
            </a>
            <a
              href="https://instagram.com/invisionnetwork"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              aria-label="Visit our Instagram page"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400/40 via-purple-500/40 to-orange-500/40 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-2.5 rounded-xl bg-white/15 hover:bg-gradient-to-br hover:from-pink-500/30 hover:via-purple-600/30 hover:to-orange-600/30 backdrop-blur-sm transition-all duration-500 border border-white/30 hover:border-pink-400/50 hover:scale-110">
                <Instagram className="w-5 h-5" />
              </div>
            </a>
          </div>

          {/* Bottom Bar - Copyright & Badges */}
          <div className="border-t border-primary-foreground/20 pt-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
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
              <div className="flex items-center gap-6">
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
            <p className="text-primary-foreground/60 text-xs text-center leading-relaxed max-w-5xl mx-auto">
              InVision Network provides educational services only. We are not legal, financial, tax, or licensed cybersecurity professionals. In case of active fraud, identity theft, or criminal activity, contact local law enforcement (911), your bank's fraud department immediately using official phone numbers, and report to FTC at IdentityTheft.gov. We never request passwords, 2FA codes, bank account information, or Social Security numbers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
