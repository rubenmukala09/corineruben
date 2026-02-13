import {
  Shield,
  Eye,
  Bell,
  Lock,
  Users,
  TrendingUp,
  Award,
  Heart,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import {
  ProfessionalCard,
  CardGrid,
  SectionContainer,
  SectionHeader,
} from "@/components/ui/professional-card";
import {
  ProfessionalTestimonial,
  TestimonialsGrid,
} from "@/components/ui/professional-testimonial";
import { ProfessionalAccordion } from "@/components/ui/professional-accordion";
import grandmotherGrandchildren from "@/assets/grandmother-grandchildren-sofa.jpg";
import seniorsTablet from "@/assets/seniors-tablet-kitchen.jpg";
import familyLivingRoom from "@/assets/family-living-room-natural.jpg";

/**
 * Professional Showcase Section - InnovaAI-inspired
 *
 * Features:
 * - Clean white background with subtle accents
 * - Sharp, integrated card system (not floating)
 * - Professional scroll animations
 * - High contrast for senior readability
 * - Modern typography hierarchy (Montserrat, Be Vietnam Pro, Poppins)
 */

const securityFeatures = [
  {
    icon: Shield,
    title: "End-to-End Protection",
    description:
      "Comprehensive security monitoring across all your digital activities, keeping you safe 24/7.",
    iconGradient: "linear-gradient(135deg, #F8926A 0%, #FF6B4A 100%)",
  },
  {
    icon: Eye,
    title: "Real-Time Monitoring",
    description:
      "Advanced AI detection systems analyze threats in real-time, alerting you instantly to suspicious activity.",
    iconGradient: "linear-gradient(135deg, #BB81B5 0%, #9B5FA5 100%)",
  },
  {
    icon: Bell,
    title: "Instant Alerts",
    description:
      "Get immediate notifications when potential scams are detected, with clear action steps to protect yourself.",
    iconGradient: "linear-gradient(135deg, #18305A 0%, #0F2040 100%)",
  },
  {
    icon: Lock,
    title: "Identity Protection",
    description:
      "Safeguard your personal information with military-grade encryption and identity theft prevention.",
    iconGradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
  },
];

const trustStats = [
  {
    icon: Users,
    value: "500+",
    label: "Families Protected",
    color: "#F8926A",
  },
  {
    icon: TrendingUp,
    value: "99.8%",
    label: "Success Rate",
    color: "#BB81B5",
  },
  {
    icon: Award,
    value: "15+",
    label: "Years Experience",
    color: "#18305A",
  },
];

const testimonials = [
  {
    quote:
      "Clear guidance and calm, respectful support throughout the process. I feel much safer online now.",
    name: "Margaret Thompson",
    role: "Retired Teacher",
    company: "Dayton, OH",
    avatar: grandmotherGrandchildren,
    rating: 5,
  },
  {
    quote:
      "The training was easy to follow and the team was incredibly patient. Highly recommend for all seniors.",
    name: "Robert Williams",
    role: "US Army Veteran",
    company: "Columbus, OH",
    avatar: seniorsTablet,
    rating: 5,
  },
];

const faqs = [
  {
    question: "How does the AI protection system work?",
    answer:
      "Our advanced AI continuously monitors your digital activities, analyzing patterns and detecting potential threats in real-time. When suspicious activity is detected, you receive instant alerts with clear, simple instructions on how to stay safe.",
  },
  {
    question: "Is this service suitable for seniors?",
    answer:
      "Absolutely! Our service is specifically designed for seniors and families. We use simple, clear language and provide patient, respectful support. No technical knowledge is required—we guide you through everything step by step.",
  },
  {
    question: "What types of scams can you detect?",
    answer:
      "We detect a wide range of scams including phishing emails, phone scams, romance scams, investment fraud, tech support scams, and deepfake voice/video attempts. Our AI is constantly updated with the latest scam techniques.",
  },
  {
    question: "How quickly will I see results?",
    answer:
      "Protection begins immediately after setup. Most clients report feeling more confident and secure within the first week, and our monitoring system starts working the moment it's activated.",
  },
];

export const ProfessionalShowcase = () => {
  return (
    <>
      {/* Security Features Section */}
      <SectionContainer background="white" padding="lg">
        <SectionHeader
          badge="🛡️ Trusted Protection"
          title="Professional Security for Ohio Families"
          description="Comprehensive protection designed specifically for seniors and their loved ones. No technical expertise required."
          align="center"
        />

        <CardGrid columns={4} gap="lg">
          {securityFeatures.map((feature, index) => (
            <ProfessionalCard
              key={feature.title}
              icon={feature.icon}
              iconGradient={feature.iconGradient}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
              variant="feature"
            />
          ))}
        </CardGrid>
      </SectionContainer>

      {/* Trust Stats Section */}
      <SectionContainer background="gray" padding="md">
        <CardGrid columns={3} gap="md">
          {trustStats.map((stat, index) => (
            <ProfessionalCard
              key={stat.label}
              icon={stat.icon}
              iconColor={stat.color}
              title={stat.value}
              description={stat.label}
              delay={index * 0.08}
              variant="default"
              className="text-center"
            />
          ))}
        </CardGrid>
      </SectionContainer>

      {/* Benefits Grid */}
      <SectionContainer background="white" padding="lg">
        <SectionHeader
          title="Why Ohio Families Trust Us"
          description="Professional protection with personal care—because your safety matters."
          align="center"
        />

        <CardGrid columns={3} gap="lg">
          <ProfessionalCard
            icon={CheckCircle}
            iconColor="#10B981"
            title="Easy Setup"
            description="Get protected in minutes with our simple, guided setup process. No complicated installations or technical knowledge required."
            delay={0}
            variant="feature"
            action={{
              label: "Learn More",
              onClick: () => {},
            }}
          />
          <ProfessionalCard
            icon={Heart}
            iconColor="#F8926A"
            title="Family Support"
            description="Protect your entire family with group monitoring and shared alerts. Keep everyone safe with one comprehensive solution."
            delay={0.1}
            variant="feature"
            badge="POPULAR"
            action={{
              label: "Learn More",
              onClick: () => {},
            }}
          />
          <ProfessionalCard
            icon={Sparkles}
            iconColor="#BB81B5"
            title="Expert Training"
            description="Access professional training sessions designed for seniors. Learn at your own pace with patient, respectful instructors."
            delay={0.2}
            variant="feature"
            action={{
              label: "Learn More",
              onClick: () => {},
            }}
          />
        </CardGrid>
      </SectionContainer>

      {/* Testimonials Section */}
      <SectionContainer background="gradient" padding="lg">
        <SectionHeader
          badge="⭐ Real Stories"
          title="What Ohio Families Are Saying"
          description="Trusted by hundreds of families across Ohio"
          align="center"
        />

        <TestimonialsGrid columns={2}>
          {testimonials.map((testimonial, index) => (
            <ProfessionalTestimonial
              key={testimonial.name}
              {...testimonial}
              delay={index * 0.15}
              variant="card"
            />
          ))}
        </TestimonialsGrid>
      </SectionContainer>

      {/* FAQ Section */}
      <SectionContainer background="white" padding="lg">
        <SectionHeader
          title="Frequently Asked Questions"
          description="Everything you need to know about our protection services"
          align="center"
        />

        <div className="max-w-3xl mx-auto">
          <ProfessionalAccordion
            items={faqs}
            defaultOpen={0}
            allowMultiple={false}
          />
        </div>
      </SectionContainer>

      {/* Final CTA Section */}
      <SectionContainer background="gray" padding="md">
        <div className="max-w-4xl mx-auto">
          <ProfessionalCard
            title="Ready to Protect Your Family?"
            description="Join hundreds of Ohio families who trust us with their digital safety. Free consultation, 30-day money-back guarantee, and expert support included."
            variant="pricing"
            className="text-center"
            action={{
              label: "Get Started Today →",
              onClick: () => {},
            }}
          />
        </div>
      </SectionContainer>
    </>
  );
};

export default ProfessionalShowcase;
