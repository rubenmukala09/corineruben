import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

/**
 * Professional Card Component - InnovaAI-inspired
 *
 * Sharp, integrated design that embeds naturally in grid layouts.
 * No floating/PowerPoint-style presentation.
 *
 * Features:
 * - Icon-top layout (icon → headline → description)
 * - Subtle borders + clean shadows
 * - Scroll-triggered animations
 * - High contrast for senior readability
 */

interface ProfessionalCardProps {
  icon?: LucideIcon;
  iconColor?: string;
  iconGradient?: string;
  title: string;
  description: string;
  badge?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  delay?: number;
  className?: string;
  variant?: "default" | "feature" | "pricing" | "testimonial";
}

export const ProfessionalCard = ({
  icon: Icon,
  iconColor = "#F8926A",
  iconGradient,
  title,
  description,
  badge,
  action,
  delay = 0,
  className,
  variant = "default",
}: ProfessionalCardProps) => {
  const cardVariants = {
    default: "bg-white border border-gray-200 shadow-sm hover:shadow-lg",
    feature: "bg-white border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1",
    pricing: "bg-white border-2 border-gray-200 shadow-lg hover:shadow-2xl hover:border-coral-400",
    testimonial: "bg-white border border-gray-100 shadow-sm",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // Professional easing
      }}
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "relative rounded-2xl p-6 md:p-8 transition-all duration-300",
        cardVariants[variant],
        className
      )}
    >
      {/* Badge (Optional) */}
      {badge && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-coral-400 to-lavender-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
          {badge}
        </div>
      )}

      {/* Icon Section */}
      {Icon && (
        <div
          className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-5 shadow-md"
          style={
            iconGradient
              ? { background: iconGradient }
              : { background: `${iconColor}20` }
          }
        >
          <Icon
            className="w-7 h-7 md:w-8 md:h-8"
            style={{ color: iconGradient ? "white" : iconColor }}
          />
        </div>
      )}

      {/* Title */}
      <h3 className="font-display text-xl md:text-2xl font-bold text-[#18305A] mb-3 leading-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="font-body text-base text-gray-600 leading-relaxed mb-6">
        {description}
      </p>

      {/* Action Button (Optional) */}
      {action && (
        <button
          onClick={action.onClick}
          className="inline-flex items-center text-coral-500 font-semibold text-sm hover:text-coral-600 transition-colors group"
        >
          {action.label}
          <svg
            className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </motion.div>
  );
};

/**
 * Professional Card Grid Container
 *
 * 12-column responsive grid system matching InnovaAI layout
 * Generous padding and natural integration
 */

interface CardGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  className?: string;
}

export const CardGrid = ({
  children,
  columns = 3,
  gap = "md",
  className,
}: CardGridProps) => {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  const gridGap = {
    sm: "gap-4",
    md: "gap-6 md:gap-8",
    lg: "gap-8 md:gap-10 lg:gap-12",
  };

  return (
    <div className={cn("grid", gridCols[columns], gridGap[gap], className)}>
      {children}
    </div>
  );
};

/**
 * Professional Section Container
 *
 * Full-width section with contained content (InnovaAI pattern)
 * Generous vertical padding for breathing room
 */

interface SectionContainerProps {
  children: ReactNode;
  background?: "white" | "gray" | "gradient";
  padding?: "sm" | "md" | "lg";
  className?: string;
}

export const SectionContainer = ({
  children,
  background = "white",
  padding = "lg",
  className,
}: SectionContainerProps) => {
  const backgrounds = {
    white: "bg-white",
    gray: "bg-gray-50",
    gradient: "bg-gradient-to-b from-white via-gray-50 to-white",
  };

  const paddings = {
    sm: "py-12 md:py-16",
    md: "py-16 md:py-24",
    lg: "py-20 md:py-32",
  };

  return (
    <section
      className={cn(
        backgrounds[background],
        paddings[padding],
        "relative overflow-hidden",
        className
      )}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {children}
      </div>
    </section>
  );
};

/**
 * Professional Section Header
 *
 * Clear typography hierarchy with Montserrat headlines
 */

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeader = ({
  badge,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) => {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true }}
      className={cn(alignment, "max-w-3xl mb-12 md:mb-16", className)}
    >
      {badge && (
        <span className="inline-block bg-gradient-to-r from-coral-100 to-lavender-100 text-coral-600 text-sm font-bold px-4 py-2 rounded-full mb-4">
          {badge}
        </span>
      )}

      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-[#18305A] leading-tight mb-4">
        {title}
      </h2>

      {description && (
        <p className="font-body text-lg md:text-xl text-gray-600 leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
};
