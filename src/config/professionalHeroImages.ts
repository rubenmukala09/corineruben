// Professional Hero Images Configuration
// Clean, modern professional images for each page

import heroProBusiness from "@/assets/hero-pro-business.jpg";
import heroProTraining from "@/assets/hero-pro-training.jpg";
import heroProResources from "@/assets/hero-pro-resources.jpg";
import heroProAbout from "@/assets/hero-pro-about.jpg";
import heroProCareers from "@/assets/hero-pro-careers.jpg";
import heroProFaq from "@/assets/hero-pro-faq.jpg";
import heroProContact from "@/assets/hero-pro-contact.jpg";

export interface HeroImage {
  src: string;
  alt: string;
}

// Professional hero images for each page
export const PROFESSIONAL_HERO_IMAGES: Record<string, HeroImage[]> = {
  business: [
    { src: heroProBusiness, alt: "Professional business team collaborating in modern office" },
  ],
  training: [
    { src: heroProTraining, alt: "Professional cybersecurity training workshop with diverse professionals learning digital protection" },
  ],
  resources: [
    { src: heroProResources, alt: "Modern library with digital resources and learning materials" },
  ],
  about: [
    { src: heroProAbout, alt: "Professional diverse team in modern corporate environment" },
  ],
  careers: [
    { src: heroProCareers, alt: "Creative modern workspace with collaborative team" },
  ],
  faq: [
    { src: heroProFaq, alt: "Friendly customer support representative ready to help" },
  ],
  contact: [
    { src: heroProContact, alt: "Welcoming reception area with friendly staff" },
  ],
};

// Export individual images for use elsewhere
export {
  heroProBusiness,
  heroProTraining,
  heroProResources,
  heroProAbout,
  heroProCareers,
  heroProFaq,
  heroProContact,
};
