import heroHomepage from "@/assets/hero-homepage.jpg";
import heroAbout from "@/assets/hero-about-company.jpg";
import heroScamShield from "@/assets/hero-scamshield-new.jpg";
import heroBusiness from "@/assets/hero-business-ai.jpg";
import heroTraining from "@/assets/hero-training.jpg";
import heroResources from "@/assets/hero-resources-new.jpg";
import heroContact from "@/assets/hero-contact-new.jpg";
import heroTeam from "@/assets/hero-team.jpg";
import heroCareers from "@/assets/hero-careers.jpg";
import eldersHero1 from "@/assets/elders-hero-1.jpg";
import eldersHero2 from "@/assets/elders-hero-2.jpg";
import eldersHero3 from "@/assets/elders-hero-3.jpg";
import eldersHero4 from "@/assets/elders-hero-4.jpg";
import eldersHero5 from "@/assets/elders-hero-5.jpg";
import eldersHero6 from "@/assets/elders-hero-6.jpg";
import eldersHero7 from "@/assets/elders-hero-7.jpg";
import eldersHero8 from "@/assets/elders-hero-8.jpg";
import eldersHero9 from "@/assets/elders-hero-9.jpg";
import eldersHero10 from "@/assets/elders-hero-10.jpg";
import eldersHero11 from "@/assets/elders-hero-11.jpg";
import eldersHero12 from "@/assets/elders-hero-12.jpg";
import eldersHero13 from "@/assets/elders-hero-13.jpg";
import eldersHero14 from "@/assets/elders-hero-14.jpg";
import eldersHero15 from "@/assets/elders-hero-15.jpg";

export interface HeroImageConfig {
  type: string;
  images: string[];
  interval?: number;
}

export const heroImages: Record<string, HeroImageConfig> = {
  '/': {
    type: 'default',
    images: [
      eldersHero1,
      eldersHero2,
      eldersHero3,
      eldersHero4,
      eldersHero5,
      eldersHero6,
      eldersHero7,
      eldersHero8,
      eldersHero9,
      eldersHero10,
      eldersHero11,
      eldersHero12,
      eldersHero13,
      eldersHero14,
      eldersHero15,
    ],
    interval: 8000,
  },
  '/about': {
    type: 'about',
    images: [heroAbout],
    interval: 5000,
  },
  '/scamshield': {
    type: 'scamshield',
    images: [heroScamShield],
    interval: 5000,
  },
  '/business': {
    type: 'business',
    images: [heroBusiness],
    interval: 5000,
  },
  '/training': {
    type: 'training',
    images: [heroTraining],
    interval: 5000,
  },
  '/resources': {
    type: 'resources',
    images: [heroResources],
    interval: 5000,
  },
  '/contact': {
    type: 'contact',
    images: [heroContact],
    interval: 5000,
  },
  '/team': {
    type: 'team',
    images: [heroTeam],
    interval: 5000,
  },
  '/careers': {
    type: 'careers',
    images: [heroCareers],
    interval: 5000,
  },
};

export const getHeroConfig = (pathname: string): HeroImageConfig => {
  return heroImages[pathname] || heroImages['/'];
};
