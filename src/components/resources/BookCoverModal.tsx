import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Zap, X, Star, Building2, BookOpen, Users } from "lucide-react";
import { motion } from "framer-motion";

interface BookCoverModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    tag: string;
    stripe_price_id: string;
  } | null;
  onAddToCart: (book: any) => void;
  onBuyNow: (book: any) => void;
}

// Extended book descriptions for the modal
const bookDescriptions: Record<string, string> = {
  'book-ai-fundamentals': 'Dive deep into the world of artificial intelligence with this comprehensive guide. Learn how AI works, how scammers exploit it, and practical strategies to protect yourself. Perfect for beginners and professionals alike who want to stay ahead of AI-powered threats.',
  'book-scam-prevention': 'Your ultimate defense manual against modern scams. This guide covers phone scams, email fraud, social engineering, and online deception tactics. Packed with real-world examples and step-by-step protection protocols trusted by security professionals.',
  'book-family-safety': 'Protect your entire family with this practical toolkit. From teaching children about online safety to helping elderly parents avoid scams, this guide provides age-appropriate strategies for everyone. Includes family discussion guides and emergency response plans.',
  'book-senior-tech': 'Written specifically for seniors navigating the digital world. This handbook uses clear, jargon-free language to explain technology safely. Covers smartphones, social media, online banking, and recognizing common scams targeting older adults.',
  'book-digital-privacy': 'Take control of your online presence with advanced privacy techniques. Learn how to secure your accounts, browse anonymously, protect personal data, and minimize your digital footprint. Essential reading for privacy-conscious individuals.',
  'book-deepfake': 'Master the art of detecting AI-generated fake content. This cutting-edge guide teaches you to identify deepfake videos, audio clones, and synthetic media. Includes verification techniques and tools used by professional fact-checkers.',
  'book-password': 'Never worry about password security again. Learn to create unbreakable passwords, use password managers effectively, and implement two-factor authentication. This essential guide protects all your digital accounts.',
  'book-social-media': 'Navigate social platforms safely with expert guidance. Covers privacy settings, scam recognition, safe sharing practices, and protecting your reputation online. Perfect for users of all social media platforms.',
  'book-online-shopping': 'Shop with confidence anywhere online. This guide reveals how to spot fake websites, secure payment methods, protect shipping information, and handle disputes. Never fall for an online shopping scam again.',
  'book-identity-theft': 'Your complete guide to preventing and recovering from identity theft. Learn monitoring techniques, protection strategies, and step-by-step recovery procedures. Includes credit freeze guides and reporting templates.',
  'book-business-cyber': 'Enterprise-grade security strategies for businesses of all sizes. Covers employee training, network security, incident response, and compliance requirements. Essential reading for business owners and IT managers.',
  'book-ai-management': 'Harness AI tools safely in your organization. This guide covers AI governance, security protocols, ethical considerations, and risk management. Perfect for managers integrating AI into business operations.',
  'book-being-real-ai': 'Philosophical exploration of authenticity in the AI age. Learn to maintain genuine human connections, recognize artificial interactions, and preserve your authentic self in an increasingly synthetic world.',
  'book-auth-personalities': 'Advanced techniques for verifying online identities. From dating profiles to business contacts, learn to authenticate who you\'re really communicating with. Includes verification checklists and red flag indicators.',
  'book-auth-friendship-v2': 'Updated guide to verifying social connections online. Covers catfishing prevention, social media impersonation, and building genuine digital relationships. Volume 2 includes new case studies and detection methods.',
  'book-cyber-kids': 'Make internet safety fun for children! Age-appropriate lessons about online dangers, cyberbullying, privacy, and safe browsing. Includes activities, games, and conversation starters for parents and educators.',
  'book-smart-home': 'Secure your connected home devices from hackers. Covers smart speakers, cameras, doorbells, thermostats, and other IoT devices. Learn setup security, network isolation, and monitoring techniques.',
  'book-phishing-defense': 'Become immune to phishing attacks. This expert guide teaches you to recognize suspicious emails, verify senders, and avoid clicking dangerous links. Includes real phishing examples and analysis techniques.',
  'book-banking-safety': 'Protect your finances in the digital age. Covers online banking security, investment fraud prevention, wire transfer safety, and cryptocurrency protection. Essential for anyone managing money online.',
  'book-mobile-security': 'Complete smartphone security guide for iOS and Android. Learn app permissions, secure settings, malware prevention, and data backup. Keep your mobile life protected from all threats.',
  'book-crypto-defense': 'Navigate the crypto world safely. This guide exposes common cryptocurrency scams, teaches wallet security, and provides investment fraud prevention. Essential for anyone in the digital asset space.',
  'book-romance-scam': 'Protect your heart and wallet from romance scammers. Learn the psychology behind these scams, red flag behaviors, and verification techniques. Includes recovery resources for victims.',
  'book-voice-clone': 'Detect AI-generated voice calls instantly. This cutting-edge guide teaches verification questions, audio analysis, and family code words to prevent voice cloning fraud. Essential in the age of AI impersonation.',
  'book-medicare-fraud': 'Complete protection guide for Medicare beneficiaries. Covers enrollment scams, identity theft, billing fraud, and legitimate vs. fraudulent calls. Written specifically for seniors and their caregivers.',
  'book-email-safety': 'Master email security with this comprehensive guide. Learn spam filtering, phishing detection, attachment safety, and account protection. Stop inbox threats permanently.',
  'book-tax-scam': 'Avoid IRS imposter schemes and tax fraud. This guide covers fake refund scams, threatening calls, identity theft during tax season, and legitimate IRS communication. File with confidence.',
  'book-tech-support': 'Never fall for fake tech support again. Learn to identify scam pop-ups, fraudulent calls, and remote access tricks. Includes safe troubleshooting resources and legitimate support contacts.',
  'book-grandparent-scam': 'Protect elderly family members from emergency scams. This essential guide covers family code words, verification procedures, and emotional manipulation tactics. Perfect for families to read together.',
  'book-investment-fraud': 'Spot Ponzi schemes and investment fraud before losing money. Learn due diligence techniques, red flag indicators, and recovery options. Protect your retirement savings from financial predators.',
  'book-charity-scam': 'Give confidently to legitimate charities. This guide teaches verification techniques, tax deduction requirements, and avoiding fake charity scams. Make every dollar count for real causes.',
};

const BookCoverModal = ({ isOpen, onClose, book, onAddToCart, onBuyNow }: BookCoverModalProps) => {
  const [userRating, setUserRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const [hasRated, setHasRated] = useState(false);
  const [viewCount] = useState(() => Math.floor(Math.random() * 500) + 100);
  const [ratingCount, setRatingCount] = useState(() => Math.floor(Math.random() * 100) + 50);

  if (!book) return null;

  const handleStarClick = (rating: number) => {
    setUserRating(rating);
    setHasRated(true);
    setRatingCount(prev => prev + 1);
  };

  const getExtendedDescription = () => {
    return bookDescriptions[book.id] || book.description;
  };

  const displayRating = userRating > 0 ? userRating : 5;
  const avgRating = userRating > 0 ? ((5 * ratingCount + userRating) / (ratingCount + 1)).toFixed(1) : "5.0";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-gradient-to-br from-card via-card to-secondary/20 border-primary/20">
        <DialogTitle className="sr-only">{book.name} - Book Details</DialogTitle>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Book Cover - Large View */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative bg-gradient-to-br from-secondary/50 to-secondary/30 p-4 md:p-6 flex items-center justify-center"
          >
            <div className="relative w-full max-w-[220px] md:max-w-[260px] shadow-2xl rounded-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
              <div className="aspect-[3/4]">
                <img 
                  src={book.image} 
                  alt={book.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* eBook Badge on Cover */}
              <Badge className="absolute top-2 left-2 text-xs px-2 py-0.5 bg-primary/90 text-primary-foreground shadow-lg">
                📘 eBook
              </Badge>
              
              {/* Tag Badge on Cover */}
              <Badge className="absolute top-2 right-2 text-xs px-2 py-0.5 bg-gradient-to-r from-primary to-accent text-white shadow-lg">
                {book.tag}
              </Badge>
            </div>
          </motion.div>

          {/* Book Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="p-4 md:p-6 flex flex-col justify-center"
          >
            {/* Title */}
            <h2 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight">
              {book.name}
            </h2>

            {/* Author */}
            <div className="flex items-center gap-1.5 mb-3 text-muted-foreground">
              <Building2 className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium">InVision Network • Department of Literature</span>
            </div>

            {/* Interactive Rating - Compact */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className="focus:outline-none transition-transform hover:scale-110"
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star 
                      className={`w-4 h-4 transition-colors ${
                        star <= (hoveredStar || userRating || 5) 
                          ? "fill-chart-4 text-chart-4" 
                          : "text-muted-foreground/30"
                      }`} 
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {avgRating} ({ratingCount} reviews) • {viewCount} views
              </span>
              {hasRated && <span className="text-xs text-success">✓ Rated</span>}
            </div>

            {/* Short Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-3">
              {getExtendedDescription()}
            </p>

            {/* Features - Inline */}
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary" className="text-xs">
                <BookOpen className="w-3 h-3 mr-1" />
                Instant Download
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <BookOpen className="w-3 h-3 mr-1" />
                Print-Ready
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <BookOpen className="w-3 h-3 mr-1" />
                Lifetime Access
              </Badge>
            </div>

            {/* Price & Discount */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-primary">${book.price}</span>
              <Badge variant="outline" className="text-xs text-success border-success/30 bg-success/10">
                🎖️ Veterans -10%
              </Badge>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  onAddToCart(book);
                  onClose();
                }}
                className="h-10"
              >
                <ShoppingCart className="w-4 h-4 mr-1.5" />
                Add to Cart
              </Button>
              <Button 
                onClick={() => {
                  onBuyNow(book);
                  onClose();
                }}
                className="h-10 bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                <Zap className="w-4 h-4 mr-1.5" />
                Buy Now
              </Button>
            </div>

            {/* Trust Badge */}
            <p className="text-xs text-muted-foreground text-center mt-3">
              🔒 Secure checkout • 30-day money-back guarantee
            </p>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookCoverModal;
