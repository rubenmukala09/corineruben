// Centralized Nature Hero Images Configuration
// 10 stunning seasonal nature images for hero carousels

// Spring
import natureSpring1 from "@/assets/nature-spring-1.jpg";
import natureSpring2 from "@/assets/nature-spring-2.jpg";
import natureSpring3 from "@/assets/nature-spring-3.jpg";

// Summer
import natureSummer1 from "@/assets/nature-summer-1.jpg";
import natureSummer2 from "@/assets/nature-summer-2.jpg";
import natureSummer3 from "@/assets/nature-summer-3.jpg";

// Autumn
import natureAutumn1 from "@/assets/nature-autumn-1.jpg";
import natureAutumn2 from "@/assets/nature-autumn-2.jpg";
import natureAutumn3 from "@/assets/nature-autumn-3.jpg";

// Winter
import natureWinter1 from "@/assets/nature-winter-1.jpg";
import natureWinter2 from "@/assets/nature-winter-2.jpg";
import natureWinter3 from "@/assets/nature-winter-3.jpg";

export interface HeroImage {
  src: string;
  alt: string;
}

// All 10 nature images in seasonal order
export const NATURE_HERO_IMAGES: HeroImage[] = [
  { src: natureSpring1, alt: "Cherry blossoms in spring morning with rolling hills and mountains" },
  { src: natureSummer1, alt: "Lavender fields stretching to the horizon under blue sky" },
  { src: natureAutumn1, alt: "Autumn forest path with red and gold foliage" },
  { src: natureWinter1, alt: "Serene winter forest with snow-covered pine trees" },
  { src: natureSpring2, alt: "Spring lake reflection with blooming trees and mountains" },
  { src: natureSummer2, alt: "Dramatic summer sunset over coastal cliffs" },
  { src: natureAutumn2, alt: "Golden autumn vineyard in Tuscan countryside" },
  { src: natureWinter2, alt: "Northern lights aurora over snowy winter landscape" },
  { src: natureSpring3, alt: "English countryside with yellow rapeseed fields" },
  { src: natureSummer3, alt: "Tropical paradise beach with turquoise water and palm trees" },
];

// Additional images for variety
export const NATURE_BONUS_IMAGES: HeroImage[] = [
  { src: natureAutumn3, alt: "Japanese garden with red maples and koi pond in autumn" },
  { src: natureWinter3, alt: "Cozy winter cabin in snowy mountain forest" },
];

// Combined all 12 images for extended carousels
export const ALL_NATURE_IMAGES: HeroImage[] = [
  ...NATURE_HERO_IMAGES,
  ...NATURE_BONUS_IMAGES,
];

// Unique non-repeating image sets for each page - NO DUPLICATION
// Each page gets 2 unique images that no other page uses
export const PAGE_NATURE_IMAGES: Record<string, HeroImage[]> = {
  business: [
    { src: natureSpring1, alt: "Cherry blossoms in spring morning with rolling hills and mountains" },
    { src: natureSummer1, alt: "Lavender fields stretching to the horizon under blue sky" },
  ],
  training: [
    { src: natureAutumn1, alt: "Autumn forest path with red and gold foliage" },
    { src: natureWinter1, alt: "Serene winter forest with snow-covered pine trees" },
  ],
  resources: [
    { src: natureSpring2, alt: "Spring lake reflection with blooming trees and mountains" },
    { src: natureSummer2, alt: "Dramatic summer sunset over coastal cliffs" },
  ],
  about: [
    { src: natureAutumn2, alt: "Golden autumn vineyard in Tuscan countryside" },
    { src: natureWinter2, alt: "Northern lights aurora over snowy winter landscape" },
  ],
  careers: [
    { src: natureSpring3, alt: "English countryside with yellow rapeseed fields" },
    { src: natureSummer3, alt: "Tropical paradise beach with turquoise water and palm trees" },
  ],
  faq: [
    { src: natureAutumn3, alt: "Japanese garden with red maples and koi pond in autumn" },
    { src: natureWinter3, alt: "Cozy winter cabin in snowy mountain forest" },
  ],
  contact: [
    { src: natureSpring1, alt: "Cherry blossoms in spring morning" },
    { src: natureAutumn1, alt: "Autumn forest path with red and gold foliage" },
  ],
};

// Helper to get page images as array
export const getPageNatureImages = (page: keyof typeof PAGE_NATURE_IMAGES): HeroImage[] => {
  return PAGE_NATURE_IMAGES[page] || [];
};

// Export individual images for CTA sections and other uses
export {
  natureSpring1,
  natureSpring2,
  natureSpring3,
  natureSummer1,
  natureSummer2,
  natureSummer3,
  natureAutumn1,
  natureAutumn2,
  natureAutumn3,
  natureWinter1,
  natureWinter2,
  natureWinter3,
};
