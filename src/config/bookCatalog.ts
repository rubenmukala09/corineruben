// Shared book catalog used by Resources page and Internal Library
import bookAiFundamentals from "@/assets/book-ai-fundamentals.jpg";
import bookBeingRealAi from "@/assets/book-being-real-ai.jpg";
import bookAuthPersonalities from "@/assets/book-auth-personalities.jpg";
import bookAuthFriendshipV2 from "@/assets/book-auth-friendship-v2.jpg";
import bookScamPrevention from "@/assets/book-scam-prevention.jpg";
import bookFamilySafety from "@/assets/book-family-safety.jpg";
import bookBusinessCyber from "@/assets/book-business-cyber.jpg";
import bookAiManagement from "@/assets/book-ai-management.jpg";
import bookDigitalPrivacy from "@/assets/book-digital-privacy.jpg";
import bookSeniorTechSafety from "@/assets/book-senior-tech-safety.jpg";
import bookDeepfakeDetection from "@/assets/book-deepfake-detection.jpg";
import bookPasswordSecurity from "@/assets/book-password-security.jpg";
import bookSocialMediaSafety from "@/assets/book-social-media-safety.jpg";
import bookOnlineShopping from "@/assets/book-online-shopping.jpg";
import bookIdentityTheft from "@/assets/book-identity-theft.jpg";
import bookCyberKids from "@/assets/book-cyber-kids.jpg";
import bookSmartHome from "@/assets/book-smart-home.jpg";
import bookPhishingDefense from "@/assets/book-phishing-defense.jpg";
import bookBankingSafety from "@/assets/book-banking-safety.jpg";
import bookMobileSecurity from "@/assets/book-mobile-security.jpg";
import bookCryptoDefense from "@/assets/book-crypto-defense.jpg";
import bookRomanceScam from "@/assets/book-romance-scam.jpg";
import bookVoiceClone from "@/assets/book-voice-clone.jpg";
import bookMedicareFraud from "@/assets/book-medicare-fraud.jpg";
import bookEmailSafety from "@/assets/book-email-safety.jpg";
import bookTaxScam from "@/assets/book-tax-scam.jpg";
import bookTechSupport from "@/assets/book-tech-support.jpg";
import bookGrandparentScam from "@/assets/book-grandparent-scam.jpg";
import bookInvestmentFraud from "@/assets/book-investment-fraud.jpg";
import bookCharityScam from "@/assets/book-charity-scam.jpg";

export const BOOK_AUTHOR = "InVision Network • Department of Literature";

export type BookItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tag: string;
  stripe_price_id: string;
  author: string;
  category: string;
};

export const BOOK_CATALOG: BookItem[] = [
  { id: "book-ai-fundamentals", name: "AI Fundamentals", description: "Master AI basics and protection strategies", price: 29.99, image: bookAiFundamentals, tag: "Best Seller", stripe_price_id: "price_1SjwOGJ8osfwYbX7UnEPLRMz", author: BOOK_AUTHOR, category: "ai" },
  { id: "book-scam-prevention", name: "Scam Prevention Guide", description: "Comprehensive guide to avoiding scams", price: 39.99, image: bookScamPrevention, tag: "Featured", stripe_price_id: "price_1SjwOIJ8osfwYbX74jTfNxcW", author: BOOK_AUTHOR, category: "scam" },
  { id: "book-family-safety", name: "Family Safety Toolkit", description: "Practical family safety protocols", price: 24.99, image: bookFamilySafety, tag: "Family", stripe_price_id: "price_1SjwOKJ8osfwYbX7GcmhErnQ", author: BOOK_AUTHOR, category: "family" },
  { id: "book-senior-tech", name: "Senior Tech Handbook", description: "Tech safety for seniors", price: 27.99, image: bookSeniorTechSafety, tag: "Seniors", stripe_price_id: "price_1SjwOLJ8osfwYbX7mV3J5LtX", author: BOOK_AUTHOR, category: "seniors" },
  { id: "book-digital-privacy", name: "Digital Privacy Mastery", description: "Protect your online privacy", price: 34.99, image: bookDigitalPrivacy, tag: "Popular", stripe_price_id: "price_1SjwOMJ8osfwYbX7ExCFG5R9", author: BOOK_AUTHOR, category: "privacy" },
  { id: "book-deepfake", name: "Deepfake Detection", description: "Spot AI fakes and imposters", price: 32.99, image: bookDeepfakeDetection, tag: "New", stripe_price_id: "price_1SjwOOJ8osfwYbX7HUJrBIas", author: BOOK_AUTHOR, category: "ai" },
  { id: "book-password", name: "Password Security", description: "Secure all your accounts", price: 22.99, image: bookPasswordSecurity, tag: "Essential", stripe_price_id: "price_1SjwOPJ8osfwYbX7meUEbp3H", author: BOOK_AUTHOR, category: "privacy" },
  { id: "book-social-media", name: "Social Media Safety", description: "Stay safe on social platforms", price: 26.99, image: bookSocialMediaSafety, tag: "Trending", stripe_price_id: "price_1SjwORJ8osfwYbX7e2gUB45e", author: BOOK_AUTHOR, category: "social" },
  { id: "book-online-shopping", name: "Online Shopping Guide", description: "Shop safely anywhere", price: 24.99, image: bookOnlineShopping, tag: "Practical", stripe_price_id: "price_1SjwOTJ8osfwYbX7lPLOGwFE", author: BOOK_AUTHOR, category: "finance" },
  { id: "book-identity-theft", name: "Identity Theft Prevention", description: "Protect your identity", price: 36.99, image: bookIdentityTheft, tag: "Critical", stripe_price_id: "price_1SjwOUJ8osfwYbX7qlhBavay", author: BOOK_AUTHOR, category: "privacy" },
  { id: "book-business-cyber", name: "Business Cybersecurity", description: "Enterprise security strategies", price: 49.99, image: bookBusinessCyber, tag: "Professional", stripe_price_id: "price_1SjwOYJ8osfwYbX7yBrF06h5", author: BOOK_AUTHOR, category: "business" },
  { id: "book-ai-management", name: "AI Management Guide", description: "Manage AI tools securely", price: 34.99, image: bookAiManagement, tag: "Business", stripe_price_id: "price_1SjwOaJ8osfwYbX7hc4XzTHo", author: BOOK_AUTHOR, category: "ai" },
  { id: "book-being-real-ai", name: "Being Real in AI World", description: "Authenticity in the AI age", price: 27.99, image: bookBeingRealAi, tag: "Philosophy", stripe_price_id: "price_1SjwObJ8osfwYbX7SMFj8psB", author: BOOK_AUTHOR, category: "ai" },
  { id: "book-auth-personalities", name: "Auth of Personalities", description: "Advanced identity verification", price: 32.99, image: bookAuthPersonalities, tag: "Advanced", stripe_price_id: "price_1SjwOdJ8osfwYbX7MPe7VAm2", author: BOOK_AUTHOR, category: "privacy" },
  { id: "book-auth-friendship-v2", name: "Auth of Friendship V2", description: "Verify social connections", price: 29.99, image: bookAuthFriendshipV2, tag: "Volume 2", stripe_price_id: "price_1SjwOfJ8osfwYbX7WKUTFPZz", author: BOOK_AUTHOR, category: "social" },
  { id: "book-cyber-kids", name: "Cyber Awareness for Kids", description: "Teach children internet safety", price: 19.99, image: bookCyberKids, tag: "Kids", stripe_price_id: "price_1SjwOgJ8osfwYbX7BFT7VyBl", author: BOOK_AUTHOR, category: "family" },
  { id: "book-smart-home", name: "Smart Home Security", description: "Protect IoT devices at home", price: 28.99, image: bookSmartHome, tag: "IoT", stripe_price_id: "price_1SjwOiJ8osfwYbX7crdnnxDP", author: BOOK_AUTHOR, category: "tech" },
  { id: "book-phishing-defense", name: "Email Phishing Defense", description: "Recognize and block phishing", price: 25.99, image: bookPhishingDefense, tag: "Email", stripe_price_id: "price_1SjwOjJ8osfwYbX7QoqGc9FQ", author: BOOK_AUTHOR, category: "scam" },
  { id: "book-banking-safety", name: "Banking & Financial Safety", description: "Secure your finances online", price: 31.99, image: bookBankingSafety, tag: "Finance", stripe_price_id: "price_1SjwOlJ8osfwYbX7jMwpmurh", author: BOOK_AUTHOR, category: "finance" },
  { id: "book-mobile-security", name: "Mobile Phone Security", description: "Keep your smartphone safe", price: 23.99, image: bookMobileSecurity, tag: "Mobile", stripe_price_id: "price_1SjwOmJ8osfwYbX7mo35N9ap", author: BOOK_AUTHOR, category: "tech" },
  { id: "book-crypto-defense", name: "Crypto Scam Defense", description: "Protect your digital assets from fraud", price: 34.99, image: bookCryptoDefense, tag: "Crypto", stripe_price_id: "price_1StJmsJ8osfwYbX7ioMIlJB0", author: BOOK_AUTHOR, category: "finance" },
  { id: "book-romance-scam", name: "Romance Scam Awareness", description: "Protect your heart and wallet", price: 28.99, image: bookRomanceScam, tag: "Relationships", stripe_price_id: "price_1StJmtJ8osfwYbX7cCVawnfv", author: BOOK_AUTHOR, category: "scam" },
  { id: "book-voice-clone", name: "Voice Clone Detection", description: "Spot AI fake calls instantly", price: 31.99, image: bookVoiceClone, tag: "AI Safety", stripe_price_id: "price_1StJmuJ8osfwYbX7s4o4JB2a", author: BOOK_AUTHOR, category: "ai" },
  { id: "book-medicare-fraud", name: "Medicare Fraud Protection", description: "Complete senior healthcare safety", price: 26.99, image: bookMedicareFraud, tag: "Healthcare", stripe_price_id: "price_1StJmvJ8osfwYbX7NqgadyPs", author: BOOK_AUTHOR, category: "seniors" },
  { id: "book-email-safety", name: "Email Safety Essentials", description: "Stop inbox threats forever", price: 22.99, image: bookEmailSafety, tag: "Email", stripe_price_id: "price_1StJmxJ8osfwYbX7UPSnS1v8", author: BOOK_AUTHOR, category: "scam" },
  { id: "book-tax-scam", name: "Tax Scam Prevention", description: "Avoid IRS imposter schemes", price: 29.99, image: bookTaxScam, tag: "Finance", stripe_price_id: "price_1StJmyJ8osfwYbX7tb11WOIS", author: BOOK_AUTHOR, category: "finance" },
  { id: "book-tech-support", name: "Tech Support Fraud Defense", description: "Never get fooled by fake support", price: 25.99, image: bookTechSupport, tag: "Tech", stripe_price_id: "price_1StJmzJ8osfwYbX7SE1V5Dnn", author: BOOK_AUTHOR, category: "tech" },
  { id: "book-grandparent-scam", name: "Grandparent Scam Defense", description: "Protecting family bonds from scammers", price: 24.99, image: bookGrandparentScam, tag: "Family", stripe_price_id: "price_1StJn0J8osfwYbX7t2Ta3TxZ", author: BOOK_AUTHOR, category: "family" },
  { id: "book-investment-fraud", name: "Investment Fraud Guide", description: "Spot Ponzi schemes fast", price: 36.99, image: bookInvestmentFraud, tag: "Investing", stripe_price_id: "price_1StJn1J8osfwYbX77tR8VN6p", author: BOOK_AUTHOR, category: "finance" },
  { id: "book-charity-scam", name: "Charity Scam Awareness", description: "Give safely to real causes", price: 21.99, image: bookCharityScam, tag: "Giving", stripe_price_id: "price_1StJn2J8osfwYbX7i25vJA5t", author: BOOK_AUTHOR, category: "social" },
];

// Recommendation map: category → related categories
const CATEGORY_RELATIONS: Record<string, string[]> = {
  ai: ["privacy", "tech", "business"],
  scam: ["finance", "family", "seniors"],
  family: ["seniors", "scam", "social"],
  seniors: ["family", "scam", "finance"],
  privacy: ["ai", "tech", "business"],
  social: ["family", "scam", "privacy"],
  finance: ["scam", "business", "privacy"],
  business: ["ai", "finance", "privacy"],
  tech: ["ai", "privacy", "business"],
};

export function getRecommendations(ownedBookIds: string[], limit = 6): BookItem[] {
  const ownedBooks = BOOK_CATALOG.filter(b => ownedBookIds.includes(b.id));
  const ownedCategories = [...new Set(ownedBooks.map(b => b.category))];
  
  // Get related categories
  const relatedCategories = new Set<string>();
  ownedCategories.forEach(cat => {
    CATEGORY_RELATIONS[cat]?.forEach(r => relatedCategories.add(r));
  });
  
  // Score unowned books: higher if in a related category
  const unowned = BOOK_CATALOG.filter(b => !ownedBookIds.includes(b.id));
  const scored = unowned.map(b => ({
    book: b,
    score: relatedCategories.has(b.category) ? 2 : 1,
  }));
  
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(s => s.book);
}
