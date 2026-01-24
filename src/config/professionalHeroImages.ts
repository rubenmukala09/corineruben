// Professional Hero Images Configuration
// Natural, photorealistic images for each page with InVision Network branding

import heroBrandedBusiness from "@/assets/hero-branded-business-new.jpg";
import heroBrandedTraining from "@/assets/hero-nature-training.jpg";
import heroBrandedResources from "@/assets/hero-branded-resources-new.jpg";
import heroBrandedAbout from "@/assets/hero-branded-about.jpg";
import heroBrandedCareers from "@/assets/hero-branded-careers-new.jpg";
import heroBrandedFaq from "@/assets/hero-branded-faq.jpg";
import heroBrandedContact from "@/assets/hero-branded-contact-new.jpg";

export interface HeroImage {
  src: string;
  alt: string;
}

// Professional branded hero images for each page - InVision Network integrated
export const PROFESSIONAL_HERO_IMAGES: Record<string, HeroImage[]> = {
  business: [
    { src: heroBrandedBusiness, alt: "Diverse business professionals reviewing AI analytics on screens in modern InVision Network tech office with golden hour lighting" },
  ],
  training: [
    { src: heroBrandedTraining, alt: "Seniors joyfully learning together in sunlit community center, empowered by hope and lifelong growth with InVision Network" },
  ],
  resources: [
    { src: heroBrandedResources, alt: "InVision Network digital knowledge center with security resources, learning materials, and modern study environment" },
  ],
  about: [
    { src: heroBrandedAbout, alt: "InVision Network diverse professional team dedicated to protecting Ohio families and businesses" },
  ],
  careers: [
    { src: heroBrandedCareers, alt: "Diverse professional team collaborating in bright InVision Network office with whiteboard and natural lighting" },
  ],
  faq: [
    { src: heroBrandedFaq, alt: "InVision Network friendly customer support team ready to answer your questions" },
  ],
  contact: [
    { src: heroBrandedContact, alt: "Welcoming InVision Network team member ready to help protect your family at branded reception" },
  ],
};

// Export individual images for use elsewhere
export {
  heroBrandedBusiness,
  heroBrandedTraining,
  heroBrandedResources,
  heroBrandedAbout,
  heroBrandedCareers,
  heroBrandedFaq,
  heroBrandedContact,
};
