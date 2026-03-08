import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, ArrowLeft, ChevronLeft, ChevronRight, Lock, LogOut } from "lucide-react";
import { SEO } from "@/components/SEO";

// Import all book covers for display
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

interface BookData {
  id: string;
  name: string;
  image: string;
  chapters: { title: string; content: string }[];
}

const BOOK_CATALOG: Record<string, Omit<BookData, "chapters"> & { chapters: { title: string; content: string }[] }> = {
  "book-ai-fundamentals": { id: "book-ai-fundamentals", name: "AI Fundamentals", image: bookAiFundamentals, chapters: [
    { title: "Chapter 1: What Is Artificial Intelligence?", content: "Artificial Intelligence (AI) refers to the simulation of human intelligence in machines programmed to think, learn, and adapt. This chapter explores the foundational concepts of AI, from machine learning algorithms to neural networks, and how these technologies are reshaping every aspect of our digital lives.\n\nAI systems can be categorized into narrow AI (designed for specific tasks) and general AI (theoretical systems with human-like reasoning). Understanding these distinctions is crucial for recognizing both the benefits and risks that AI presents to everyday users.\n\nKey areas covered include natural language processing, computer vision, and predictive analytics — all of which play a role in modern scam detection and prevention systems." },
    { title: "Chapter 2: AI in Cybersecurity", content: "AI has become an essential tool in the cybersecurity arsenal. From detecting unusual network patterns to identifying phishing attempts in real-time, AI-powered security systems can process millions of data points faster than any human analyst.\n\nThis chapter examines how organizations deploy AI for threat detection, anomaly identification, and automated response. You'll learn about the dual-edged nature of AI in security — how the same technology that protects can also be weaponized by malicious actors.\n\nTopics include behavioral analysis, deep learning for malware detection, and how AI assists in maintaining digital privacy across an increasingly connected world." },
    { title: "Chapter 3: Protecting Yourself in the AI Age", content: "As AI becomes more sophisticated, so do the threats it enables. Deepfakes, AI-generated phishing emails, and automated social engineering attacks represent a new frontier of digital danger.\n\nThis chapter provides practical strategies for protecting yourself: verifying AI-generated content, using AI-powered security tools, maintaining strong authentication practices, and staying informed about emerging threats.\n\nYou'll also learn about the importance of digital literacy in the AI age and how to teach these skills to family members of all ages." },
  ]},
  "book-scam-prevention": { id: "book-scam-prevention", name: "Scam Prevention Guide", image: bookScamPrevention, chapters: [
    { title: "Chapter 1: The Anatomy of a Scam", content: "Every scam follows a predictable pattern: identification of a target, establishment of trust, exploitation of emotions, and extraction of value. Understanding this cycle is the first step in protecting yourself.\n\nScammers invest significant effort in appearing legitimate. They research their targets, craft believable stories, and create a sense of urgency that overrides rational thinking. This chapter deconstructs the psychological techniques used by fraudsters and teaches you to recognize manipulation when it occurs.\n\nFrom the initial contact to the final ask, every scam leaves tell-tale signs that an informed consumer can identify and avoid." },
    { title: "Chapter 2: Common Scam Types", content: "The digital landscape hosts an ever-evolving array of scam types. Phone scams remain prevalent, with robocalls and impersonation schemes targeting millions daily. Online scams range from fake shopping sites to romance fraud, while emerging threats include cryptocurrency scams and AI-powered impersonation.\n\nThis chapter catalogs the most common scam types currently active, provides real-world examples, and offers specific advice for each category. Special attention is given to scams targeting seniors, veterans, and small business owners — populations that experience disproportionate targeting." },
    { title: "Chapter 3: Building Your Defense", content: "Prevention is far more effective than recovery. This chapter outlines a comprehensive personal security framework that includes technological safeguards, behavioral habits, and community awareness.\n\nKey defenses include: verifying unsolicited contacts through official channels, never sharing personal information under pressure, using strong and unique passwords, enabling two-factor authentication, and maintaining updated security software.\n\nThe chapter also covers what to do if you suspect you've been targeted: documentation steps, reporting procedures, and resources for victims of fraud." },
  ]},
  "book-family-safety": { id: "book-family-safety", name: "Family Safety Toolkit", image: bookFamilySafety, chapters: [
    { title: "Chapter 1: Creating a Family Safety Plan", content: "A comprehensive family safety plan addresses digital threats at every age level. From young children discovering the internet to elderly parents navigating online banking, each family member faces unique risks that require tailored protections.\n\nThis chapter guides you through creating a family-wide security strategy that includes device management, age-appropriate internet usage guidelines, shared password management, and regular family discussions about online safety.\n\nYou'll learn how to establish boundaries without creating fear, and how to foster an environment where family members feel comfortable reporting suspicious activities." },
    { title: "Chapter 2: Children and Online Safety", content: "Children are particularly vulnerable online. They may share personal information unknowingly, fall prey to cyberbullying, or encounter inappropriate content. This chapter provides age-specific guidance for protecting children from kindergarten through high school.\n\nTopics include: parental controls and monitoring tools, teaching digital citizenship, recognizing signs of cyberbullying, understanding social media risks, and establishing healthy screen time habits. The goal is empowering children to be safe digital citizens while maintaining trust and open communication." },
    { title: "Chapter 3: Protecting Elderly Family Members", content: "Seniors are disproportionately targeted by scammers. Tech support scams, Medicare fraud, grandparent scams, and romance fraud cause billions in losses annually among the elderly population.\n\nThis chapter offers practical strategies for protecting older family members: setting up fraud alerts, configuring simplified and secure devices, teaching recognition of common scam patterns, and establishing communication protocols for financial decisions.\n\nThe emphasis is on preserving dignity and independence while adding layers of protection that reduce vulnerability to exploitation." },
  ]},
};

// Generate simple chapter content for books not explicitly defined
function getBookData(bookId: string): BookData | null {
  if (BOOK_CATALOG[bookId]) return BOOK_CATALOG[bookId];

  // Generic content for other books
  const bookMap: Record<string, { name: string; image: string }> = {
    "book-senior-tech": { name: "Senior Tech Handbook", image: bookSeniorTechSafety },
    "book-digital-privacy": { name: "Digital Privacy Mastery", image: bookDigitalPrivacy },
    "book-deepfake": { name: "Deepfake Detection", image: bookDeepfakeDetection },
    "book-password": { name: "Password Security", image: bookPasswordSecurity },
    "book-social-media": { name: "Social Media Safety", image: bookSocialMediaSafety },
    "book-online-shopping": { name: "Online Shopping Guide", image: bookOnlineShopping },
    "book-identity-theft": { name: "Identity Theft Prevention", image: bookIdentityTheft },
    "book-business-cyber": { name: "Business Cybersecurity", image: bookBusinessCyber },
    "book-ai-management": { name: "AI Management Guide", image: bookAiManagement },
    "book-being-real-ai": { name: "Being Real in AI World", image: bookBeingRealAi },
    "book-auth-personalities": { name: "Auth of Personalities", image: bookAuthPersonalities },
    "book-auth-friendship-v2": { name: "Auth of Friendship V2", image: bookAuthFriendshipV2 },
    "book-cyber-kids": { name: "Cyber Awareness for Kids", image: bookCyberKids },
    "book-smart-home": { name: "Smart Home Security", image: bookSmartHome },
    "book-phishing-defense": { name: "Email Phishing Defense", image: bookPhishingDefense },
    "book-banking-safety": { name: "Banking & Financial Safety", image: bookBankingSafety },
    "book-mobile-security": { name: "Mobile Phone Security", image: bookMobileSecurity },
    "book-crypto-defense": { name: "Crypto Scam Defense", image: bookCryptoDefense },
    "book-romance-scam": { name: "Romance Scam Awareness", image: bookRomanceScam },
    "book-voice-clone": { name: "Voice Clone Detection", image: bookVoiceClone },
    "book-medicare-fraud": { name: "Medicare Fraud Protection", image: bookMedicareFraud },
    "book-email-safety": { name: "Email Safety Essentials", image: bookEmailSafety },
    "book-tax-scam": { name: "Tax Scam Prevention", image: bookTaxScam },
    "book-tech-support": { name: "Tech Support Fraud Defense", image: bookTechSupport },
    "book-grandparent-scam": { name: "Grandparent Scam Defense", image: bookGrandparentScam },
    "book-investment-fraud": { name: "Investment Fraud Guide", image: bookInvestmentFraud },
    "book-charity-scam": { name: "Charity Scam Awareness", image: bookCharityScam },
  };

  const info = bookMap[bookId];
  if (!info) return null;

  return {
    id: bookId,
    name: info.name,
    image: info.image,
    chapters: [
      { title: `Chapter 1: Introduction to ${info.name}`, content: `Welcome to "${info.name}" by InVision Network's Department of Literature. This comprehensive guide is designed to equip you with the knowledge and tools necessary to navigate the increasingly complex digital landscape safely.\n\nIn this opening chapter, we lay the groundwork by exploring the current threat environment and why understanding these risks is essential for every individual, family, and organization. The digital world offers unprecedented opportunities, but it also presents challenges that require informed, proactive defenses.\n\nThroughout this book, you will find practical advice, real-world case studies, and actionable strategies that you can implement immediately to enhance your security posture.` },
      { title: `Chapter 2: Understanding the Threats`, content: `The threat landscape is constantly evolving. What was considered a sophisticated attack five years ago may now be automated and deployed at scale. This chapter examines the most prevalent threats in the context of ${info.name.toLowerCase()}, providing detailed analysis of how these attacks work and who they target.\n\nYou'll learn to identify warning signs, understand the motivations behind different types of attacks, and develop a framework for assessing your personal risk level. Knowledge is your first line of defense, and this chapter ensures you have the information needed to make informed decisions about your digital safety.` },
      { title: `Chapter 3: Practical Defense Strategies`, content: `Theory without practice offers incomplete protection. This chapter translates the knowledge from previous chapters into concrete, actionable steps you can take today.\n\nFrom configuring your devices for maximum security to establishing routines that minimize your exposure to threats, every recommendation in this chapter has been tested and validated by cybersecurity professionals. Special attention is given to solutions that don't require technical expertise — because security should be accessible to everyone.\n\nBy the end of this chapter, you'll have a personalized security checklist and the confidence to implement it effectively.` },
    ],
  };
}

export default function BookReader() {
  const navigate = useNavigate();
  const [session, setSession] = useState<{ bookIds: string[]; customerName: string; email: string } | null>(null);
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);
  const [currentChapter, setCurrentChapter] = useState(0);

  useEffect(() => {
    const raw = sessionStorage.getItem("bookReaderSession");
    if (!raw) {
      navigate("/resources");
      return;
    }
    try {
      setSession(JSON.parse(raw));
    } catch {
      navigate("/resources");
    }
  }, [navigate]);

  // Disable right-click on reader
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("bookReaderSession");
    navigate("/resources");
  };

  if (!session) return null;

  const availableBooks = session.bookIds
    .map((id) => getBookData(id))
    .filter((b): b is BookData => b !== null);

  // Book selection view
  if (!selectedBook) {
    return (
      <>
        <SEO title="Book Reader — InVision Network" description="Read your purchased books securely online." />
        <Navigation />
        <div className="min-h-screen bg-background pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Your Library</h1>
                <p className="text-muted-foreground mt-1">
                  Welcome back, {session.customerName}! You have {availableBooks.length} book{availableBooks.length !== 1 ? "s" : ""}.
                </p>
              </div>
              <Button variant="outline" onClick={handleLogout} size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>

            {availableBooks.length === 0 ? (
              <Card className="p-12 text-center">
                <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No books found for this purchase.</p>
                <p className="text-muted-foreground mt-2">Please contact support if you believe this is an error.</p>
              </Card>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {availableBooks.map((book) => (
                  <Card
                    key={book.id}
                    className="group cursor-pointer overflow-hidden hover:shadow-lg transition-shadow duration-200"
                    onClick={() => { setSelectedBook(book); setCurrentChapter(0); }}
                  >
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={book.image}
                        alt={book.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        draggable={false}
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-sm line-clamp-2">{book.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{book.chapters.length} chapters</p>
                      <Button size="sm" className="w-full mt-2" variant="outline">
                        <BookOpen className="h-3 w-3 mr-1" />
                        Read
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Reader view — secure, no-print, no-copy
  const chapter = selectedBook.chapters[currentChapter];

  return (
    <>
      <SEO title={`${selectedBook.name} — InVision Network Reader`} description="Secure book reader." />
      {/* Print blocker */}
      <style>{`
        @media print {
          body * { display: none !important; visibility: hidden !important; }
          body::after { content: "Printing is not allowed for this content."; display: block; font-size: 24px; text-align: center; padding: 100px; }
        }
        .secure-reader {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -webkit-touch-callout: none;
        }
      `}</style>
      <Navigation />
      <div
        className="secure-reader min-h-screen bg-background pt-24 pb-16"
        onContextMenu={handleContextMenu}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Reader Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedBook(null)}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Library
            </Button>
            <div className="flex-1 text-center">
              <h2 className="font-semibold text-foreground text-sm md:text-base truncate">
                {selectedBook.name}
              </h2>
              <p className="text-xs text-muted-foreground">
                Chapter {currentChapter + 1} of {selectedBook.chapters.length}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>

          {/* Chapter Navigation Tabs */}
          <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
            {selectedBook.chapters.map((ch, i) => (
              <Button
                key={i}
                variant={i === currentChapter ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentChapter(i)}
                className="whitespace-nowrap text-xs"
              >
                Ch. {i + 1}
              </Button>
            ))}
          </div>

          {/* Reader Content */}
          <Card className="p-6 md:p-10 min-h-[60vh]">
            <div className="flex items-center gap-2 mb-2 opacity-50">
              <Lock className="h-3 w-3" />
              <span className="text-[10px] uppercase tracking-wider font-medium">Protected Content — InVision Network</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-6">{chapter.title}</h3>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {chapter.content.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-foreground/90 leading-relaxed mb-4 text-base">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-border/50 text-center">
              <p className="text-xs text-muted-foreground">
                © InVision Network • Department of Literature • All Rights Reserved
              </p>
            </div>
          </Card>

          {/* Chapter Navigation */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              disabled={currentChapter === 0}
              onClick={() => setCurrentChapter((c) => c - 1)}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous Chapter
            </Button>
            <Button
              variant="outline"
              disabled={currentChapter === selectedBook.chapters.length - 1}
              onClick={() => setCurrentChapter((c) => c + 1)}
            >
              Next Chapter
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
