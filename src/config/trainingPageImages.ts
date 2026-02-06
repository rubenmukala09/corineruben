// Training Page Premium Images Configuration

// Training & Workshop Images
import trainingSession from "@/assets/training-session.jpg";
import workshopTraining from "@/assets/workshop-training-session.jpg";
import communityTraining from "@/assets/community-training.jpg";
import protectionWorkshop from "@/assets/protection-training-workshop.jpg";
import paidWorkshop from "@/assets/paid-workshop-training.jpg";
import workshopSeniorsLearning from "@/assets/workshop-seniors-learning.jpg";

// Senior & Family Images
import seniorCouple from "@/assets/senior-couple-active.jpg";
import seniorLearning from "@/assets/senior-learning.jpg";
import seniorPhoneProtection from "@/assets/senior-phone-protection.jpg";
import seniorsTablet from "@/assets/seniors-tablet-kitchen.jpg";
import familyProtection from "@/assets/family-protection.jpg";
import familyGathering from "@/assets/family-gathering.jpg";
import familyCyberProtection from "@/assets/family-cyber-protection.jpg";

// Instructor Images
import instructorAlex from "@/assets/instructor-alex.jpg";
import instructorJames from "@/assets/instructor-james.jpg";
import instructorMichael from "@/assets/instructor-michael.jpg";
import instructorPriya from "@/assets/instructor-priya.jpg";
import instructorSarah from "@/assets/instructor-sarah.jpg";
import workshopInstructor from "@/assets/workshop-instructor.jpg";

// Security & Tech Images
import securityTools from "@/assets/cybersecurity-protection-tools.jpg";
import threatAnalysis from "@/assets/threat-analysis-screen.jpg";
import digitalSecurity from "@/assets/digital-security-tools.jpg";

// Business & Professional Images
import businessTeam from "@/assets/business-team-meeting.jpg";
import expertTeam from "@/assets/expert-team-working.jpg";
import consultingTeam from "@/assets/consulting-team-discussion.jpg";

// Community Images
import communitySuccess from "@/assets/community-group-success.jpg";
import communityImpact from "@/assets/community-impact-4k.jpg";

// Hero & CTA Images
import heroVault from "@/assets/hero-vault-1.jpg";

export const TRAINING_PAGE_IMAGES = {
  // Section backgrounds
  sections: {
    trustSection: workshopSeniorsLearning,
    workshopsSection: trainingSession,
    processSection: protectionWorkshop,
    threatsSection: securityTools,
    aiProSection: expertTeam,
    familySection: familyProtection,
    examplesSection: threatAnalysis,
    ctaSection: seniorCouple,
  },

  // Trust pillars
  trustPillars: [
    { image: seniorLearning, alt: "Senior learning with tablet" },
    { image: familyGathering, alt: "Family gathering" },
    { image: communityTraining, alt: "Community training session" },
    { image: consultingTeam, alt: "Expert team consultation" },
  ],

  // How it works steps
  processSteps: [
    { image: seniorPhoneProtection, alt: "Senior on phone" },
    { image: workshopTraining, alt: "Workshop session" },
    { image: threatAnalysis, alt: "Threat analysis" },
    { image: familyCyberProtection, alt: "Family protected" },
  ],

  // Instructors
  instructors: [
    { image: instructorSarah, name: "Sarah", role: "Senior Protection Specialist" },
    { image: instructorMichael, name: "Michael", role: "Cybersecurity Expert" },
    { image: instructorJames, name: "James", role: "AI Security Analyst" },
    { image: instructorPriya, name: "Priya", role: "Digital Safety Educator" },
    { image: instructorAlex, name: "Alex", role: "Tech Support Lead" },
  ],

  // Testimonial backgrounds
  testimonials: [
    seniorCouple,
    seniorsTablet,
    familyGathering,
  ],
};

export {
  trainingSession,
  workshopTraining,
  communityTraining,
  protectionWorkshop,
  paidWorkshop,
  workshopSeniorsLearning,
  seniorCouple,
  seniorLearning,
  seniorPhoneProtection,
  seniorsTablet,
  familyProtection,
  familyGathering,
  familyCyberProtection,
  instructorAlex,
  instructorJames,
  instructorMichael,
  instructorPriya,
  instructorSarah,
  workshopInstructor,
  securityTools,
  threatAnalysis,
  digitalSecurity,
  businessTeam,
  expertTeam,
  consultingTeam,
  communitySuccess,
  communityImpact,
  heroVault,
};
