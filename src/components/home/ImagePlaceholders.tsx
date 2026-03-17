import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { Shield, Users, Laptop, Heart, Phone, GraduationCap } from 'lucide-react';

/**
 * Image Placeholders for Home Page
 *
 * These are placeholder components ready for your photos.
 * Replace the placeholder content with your actual image paths.
 */

interface ImagePlaceholderProps {
  className?: string;
}

/**
 * HERO SECTION IMAGES
 */

// Hero Background - Large hero image for main section
export const HeroBackgroundImage = ({ className = '' }: ImagePlaceholderProps) => {
  return (
    <div className={`relative ${className}`}>
      {/*
        REPLACE WITH YOUR IMAGE:
        - Senior using tablet/smartphone confidently
        - Family video call showing multiple generations
        - Happy Ohio family with technology

        Recommended size: 1920x1080px (16:9)
        Format: JPG or WebP
      */}
      <OptimizedImage
        src="/assets/hero-family-technology.jpg" // REPLACE THIS PATH
        alt="Ohio family safely using technology together"
        priority={true}
        objectFit="cover"
        className={className}
      />
    </div>
  );
};

/**
 * HOW IT WORKS SECTION IMAGES
 */

// Step 1: AI Monitoring Image
export const AIMonitoringImage = ({ className = '' }: ImagePlaceholderProps) => {
  return (
    <div className={`bg-muted/30 rounded-2xl p-8 flex items-center justify-center ${className}`}>
      {/*
        REPLACE WITH YOUR IMAGE:
        - AI monitoring dashboard (clean, modern)
        - Abstract tech protection visual
        - Security shield with digital elements

        Recommended size: 400x300px (4:3)
        Format: PNG or WebP (transparent background works well)
      */}
      <div className="text-center">
        <Shield className="w-20 h-20 mx-auto mb-3 text-primary opacity-30" />
        <p className="text-xs text-muted-foreground font-medium">
          AI Monitoring
        </p>
      </div>
    </div>
  );
};

// Step 2: Workshop Training Image
export const WorkshopTrainingImage = ({ className = '' }: ImagePlaceholderProps) => {
  return (
    <div className={`bg-muted/30 rounded-2xl p-8 flex items-center justify-center ${className}`}>
      {/*
        REPLACE WITH YOUR IMAGE:
        - Friendly instructor teaching seniors
        - Workshop classroom with engaged students
        - One-on-one training session

        Recommended size: 400x300px (4:3)
        Format: JPG or WebP
      */}
      <div className="text-center">
        <GraduationCap className="w-20 h-20 mx-auto mb-3 text-emerald-500 opacity-30" />
        <p className="text-xs text-muted-foreground font-medium">
          Training Workshop
        </p>
      </div>
    </div>
  );
};

// Step 3: Customer Support Image
export const CustomerSupportImage = ({ className = '' }: ImagePlaceholderProps) => {
  return (
    <div className={`bg-muted/30 rounded-2xl p-8 flex items-center justify-center ${className}`}>
      {/*
        REPLACE WITH YOUR IMAGE:
        - Friendly customer support representative
        - Person answering phone with smile
        - Team member helping customer

        Recommended size: 400x300px (4:3)
        Format: JPG or WebP
      */}
      <div className="text-center">
        <Phone className="w-20 h-20 mx-auto mb-3 text-violet-500 opacity-30" />
        <p className="text-xs text-muted-foreground font-medium">
          Customer Support
        </p>
      </div>
    </div>
  );
};

/**
 * SERVICE PILLARS SECTION IMAGES
 */

// AI Scam Protection Visual
export const ScamProtectionImage = ({ className = '' }: ImagePlaceholderProps) => {
  return (
    <OptimizedImage
      src="/assets/scam-protection-visual.jpg" // REPLACE THIS PATH
      alt="AI-powered scam protection technology"
      className={`rounded-xl ${className}`}
      objectFit="cover"
    />
    // PLACEHOLDER: Shield icon with digital protection elements (300x200px)
  );
};

// Training Workshop Visual
export const TrainingWorkshopImage = ({ className = '' }: ImagePlaceholderProps) => {
  return (
    <OptimizedImage
      src="/assets/training-workshop.jpg" // REPLACE THIS PATH
      alt="Hands-on cybersecurity training workshop"
      className={`rounded-xl ${className}`}
      objectFit="cover"
    />
    // PLACEHOLDER: Instructor teaching group of seniors (300x200px)
  );
};

// Business Solutions Visual
export const BusinessSolutionsImage = ({ className = '' }: ImagePlaceholderProps) => {
  return (
    <OptimizedImage
      src="/assets/business-solutions.jpg" // REPLACE THIS PATH
      alt="Business cybersecurity consulting"
      className={`rounded-xl ${className}`}
      objectFit="cover"
    />
    // PLACEHOLDER: Professional team in meeting (300x200px)
  );
};

// Community Impact Visual
export const CommunityImpactImage = ({ className = '' }: ImagePlaceholderProps) => {
  return (
    <OptimizedImage
      src="/assets/community-impact.jpg" // REPLACE THIS PATH
      alt="Ohio community cybersecurity support"
      className={`rounded-xl ${className}`}
      objectFit="cover"
    />
    // PLACEHOLDER: Community gathering or local event (300x200px)
  );
};

/**
 * TRUST & SOCIAL PROOF SECTION IMAGES
 */

// Happy Family Using Technology
export const HappyFamilyImage = ({ className = '' }: ImagePlaceholderProps) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      {/*
        REPLACE WITH YOUR IMAGE:
        - Multi-generational family using devices
        - Grandparent video calling grandchild
        - Family gathered around computer/tablet

        Recommended size: 800x600px (4:3)
        Format: JPG or WebP
      */}
      <div className="bg-muted/30 p-12 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Heart className="w-24 h-24 mx-auto mb-4 text-accent opacity-30" />
          <p className="text-sm text-muted-foreground font-medium">
            Happy Family Image
          </p>
        </div>
      </div>
    </div>
  );
};

// Veteran & Family Image
export const VeteranFamilyImage = ({ className = '' }: ImagePlaceholderProps) => {
  return (
    <OptimizedImage
      src="/assets/veteran-family.jpg" // REPLACE THIS PATH
      alt="Veteran family protected from cyber threats"
      className={`rounded-2xl ${className}`}
      objectFit="cover"
    />
    // PLACEHOLDER: Veteran with family, American flag subtle in background (600x400px)
  );
};

// Ohio Local Community Image
export const OhioLocalImage = ({ className = '' }: ImagePlaceholderProps) => {
  return (
    <OptimizedImage
      src="/assets/ohio-local-community.jpg" // REPLACE THIS PATH
      alt="Ohio local community support"
      className={`rounded-2xl ${className}`}
      objectFit="cover"
    />
    // PLACEHOLDER: Ohio landmark or local community event (600x400px)
  );
};

/**
 * BACKGROUND & ACCENT IMAGES
 */

// Abstract Tech Pattern
export const TechPatternBackground = ({ className = '' }: ImagePlaceholderProps) => {
  return (
    <div className={`absolute inset-0 opacity-5 ${className}`}>
      {/*
        REPLACE WITH YOUR IMAGE:
        - Abstract tech pattern
        - Digital grid overlay
        - Subtle circuit board design

        Recommended size: 1920x1080px
        Format: SVG or PNG (transparent)
      */}
      <div className="w-full h-full">
        <Laptop className="w-full h-full opacity-10" />
      </div>
    </div>
  );
};

// Gradient Overlay Image
export const GradientOverlay = ({ className = '' }: ImagePlaceholderProps) => {
  return (
    <div
      className={`absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 ${className}`}
    />
  );
};

/**
 * TESTIMONIAL SECTION IMAGES
 */

// Customer Avatar Placeholder
export const CustomerAvatar = ({
  name = 'Customer',
  className = '',
}: ImagePlaceholderProps & { name?: string }) => {
  return (
    <div className={`relative ${className}`}>
      {/*
        REPLACE WITH YOUR IMAGE:
        - Customer headshot/portrait
        - Professional photo with smile
        - Circular crop recommended

        Recommended size: 200x200px (1:1 square)
        Format: JPG or WebP
      */}
      <OptimizedImage
        src={`/assets/testimonials/${name.toLowerCase().replace(/\s+/g, '-')}.jpg`} // REPLACE THIS PATH
        alt={`${name} - Customer testimonial`}
        className={`rounded-full ${className}`}
        width={80}
        height={80}
        objectFit="cover"
      />
    </div>
  );
};

/**
 * TEAM SECTION IMAGES
 */

// Team Member Photo
export const TeamMemberPhoto = ({
  name = 'Team Member',
  role = '',
  className = '',
}: ImagePlaceholderProps & { name?: string; role?: string }) => {
  return (
    <div className={`relative ${className}`}>
      {/*
        REPLACE WITH YOUR IMAGE:
        - Professional team member headshot
        - Friendly, approachable photo
        - Consistent lighting/background across team

        Recommended size: 400x500px (4:5 portrait)
        Format: JPG or WebP
      */}
      <OptimizedImage
        src={`/assets/team/${name.toLowerCase().replace(/\s+/g, '-')}.jpg`} // REPLACE THIS PATH
        alt={`${name}${role ? ` - ${role}` : ''}`}
        className={`rounded-2xl ${className}`}
        objectFit="cover"
      />
    </div>
  );
};
