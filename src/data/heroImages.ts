import heroHomepage from "@/assets/hero-homepage.jpg";
import heroAbout from "@/assets/hero-about-company.jpg";
import heroScamShield from "@/assets/hero-scamshield-new.jpg";
import heroBusiness from "@/assets/hero-business-ai.jpg";
import heroTraining from "@/assets/hero-training.jpg";
import heroResources from "@/assets/hero-resources-new.jpg";
import heroContact from "@/assets/hero-contact-new.jpg";
import heroTeam from "@/assets/hero-team.jpg";
import heroCareers from "@/assets/hero-careers.jpg";
import heroBusiness1 from "@/assets/hero-business-1.jpg";
import heroBusiness2 from "@/assets/hero-business-2.jpg";
import heroBusiness3 from "@/assets/hero-business-3.jpg";
import heroBusiness4 from "@/assets/hero-business-4.jpg";
import heroBusiness5 from "@/assets/hero-business-5.jpg";
import heroBusiness6 from "@/assets/hero-business-6.jpg";
import heroBusiness7 from "@/assets/hero-business-7.jpg";

export interface HeroImage {
  type: string;
  url: string;
  headline: string;
  subheadline: string;
}

const heroImages: HeroImage[] = [
  {
    type: 'default',
    url: heroBusiness1,
    headline: "Protect Your Family from AI-Powered Scams",
    subheadline: "Simple, respectful training for adults 40+ and families. Learn to spot deepfakes, phishing, and AI fraud—no tech degree required.",
  },
  {
    type: 'default',
    url: heroBusiness2,
    headline: "Live Training That Actually Empowers You",
    subheadline: "Interactive Zoom sessions with real-world practice. Master deepfake detection, voice clone recognition, and emergency protocols with expert instructors.",
  },
  {
    type: 'default',
    url: heroBusiness3,
    headline: "AI That Works for Your Business, Not Against It",
    subheadline: "Custom AI receptionists, smart automation, and secure systems designed for small businesses. Professional implementation starting at $5,000.",
  },
  {
    type: 'default',
    url: heroBusiness4,
    headline: "Monthly Protection with Scam Shield",
    subheadline: "Forward suspicious emails, texts, and calls to our experts. Get professional analysis within 24 hours. Your personal fraud prevention team.",
  },
  {
    type: 'default',
    url: heroBusiness5,
    headline: "Expert Resources at Your Fingertips",
    subheadline: "Free downloadable guides, security checklists, and step-by-step tutorials. Everything you need to stay safe in the digital age.",
  },
  {
    type: 'default',
    url: heroBusiness6,
    headline: "Talk to a Real Human Who Cares",
    subheadline: "No sales pressure, no jargon. Just honest answers about protecting your family from digital fraud. Schedule a free 15-minute consultation.",
  },
  {
    type: 'default',
    url: heroBusiness7,
    headline: "Trusted by 500+ Families Across Ohio",
    subheadline: "Join our community of empowered families who stopped scams before losing a dollar. Real training, real results, real peace of mind.",
  },
  {
    type: 'about',
    url: heroAbout,
    headline: "About InVision Network",
    subheadline: "Your trusted partner in digital safety and AI empowerment",
  },
  {
    type: 'scamshield',
    url: heroScamShield,
    headline: "Scam Shield Protection",
    subheadline: "Monthly protection with expert analysis of suspicious communications",
  },
  {
    type: 'business',
    url: heroBusiness,
    headline: "AI Solutions for Business",
    subheadline: "Transform your business with custom AI implementation",
  },
  {
    type: 'training',
    url: heroTraining,
    headline: "Professional Training Programs",
    subheadline: "Live, interactive sessions to protect yourself from digital threats",
  },
  {
    type: 'resources',
    url: heroResources,
    headline: "Expert Resources",
    subheadline: "Free guides and tools to enhance your digital safety",
  },
  {
    type: 'contact',
    url: heroContact,
    headline: "Get in Touch",
    subheadline: "Talk to a real human who cares about your safety",
  },
  {
    type: 'team',
    url: heroTeam,
    headline: "Meet Our Team",
    subheadline: "Dedicated professionals committed to your digital safety",
  },
  {
    type: 'careers',
    url: heroCareers,
    headline: "Join Our Team",
    subheadline: "Help us make a difference in digital safety education",
  },
];

export const getHeroImages = (pathname: string): HeroImage[] => {
  const typeMap: Record<string, string> = {
    '/': 'default',
    '/about': 'about',
    '/scamshield': 'scamshield',
    '/business': 'business',
    '/training': 'training',
    '/resources': 'resources',
    '/contact': 'contact',
    '/team': 'team',
    '/careers': 'careers',
  };
  
  const type = typeMap[pathname] || 'default';
  return heroImages.filter(img => img.type === type);
};

export default heroImages;
