import { ReactNode, Children, cloneElement, isValidElement } from "react";
import { cn } from "@/lib/utils";
import { MagneticWrapper } from "@/components/ui/magnetic-button";

interface CTASectionProps {
  headline: string;
  description?: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "gold" | "navy" | "image";
  backgroundImage?: string;
  magneticButtons?: boolean;
}

const CTASection = ({
  headline,
  description,
  children,
  className,
  variant = "gold",
  backgroundImage,
  magneticButtons = true,
}: CTASectionProps) => {
  // Wrap children with magnetic effect if enabled
  const wrappedChildren = magneticButtons
    ? Children.map(children, (child) =>
        isValidElement(child) ? (
          <MagneticWrapper strength={0.25}>{child}</MagneticWrapper>
        ) : (
          child
        ),
      )
    : children;

  const bgClass = {
    default: "bg-muted",
    gold: "bg-gradient-to-r from-primary to-accent",
    navy: "bg-gradient-hero-primary",
    image: "relative",
  }[variant];

  const textClass = {
    default: "text-foreground",
    gold: "text-accent-foreground",
    navy: "text-primary-foreground",
    image: "text-white",
  }[variant];

  if (variant === "image" && backgroundImage) {
    return (
      <section
        className={cn(
          "py-20 md:py-28 lg:py-36 relative overflow-hidden",
          className,
        )}
        role="region"
        aria-label="Call to action"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/75 to-primary/65" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2
            className={cn(
              "mb-6 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold drop-shadow-lg",
              textClass,
            )}
          >
            {headline}
          </h2>
          {description && (
            <p
              className={cn(
                "text-xl md:text-2xl lg:text-3xl mb-10 max-w-3xl mx-auto leading-relaxed font-medium",
                textClass,
              )}
            >
              {description}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center flex-wrap">
            {wrappedChildren}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "py-16 md:py-20 lg:py-24 rounded-3xl mx-4 my-8",
        bgClass,
        className,
      )}
      role="region"
      aria-label="Call to action"
    >
      <div className="container mx-auto px-4 text-center">
        <h2
          className={cn(
            "mb-6 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold",
            textClass,
          )}
        >
          {headline}
        </h2>
        {description && (
          <p
            className={cn(
              "text-xl md:text-2xl lg:text-3xl mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed font-medium",
              textClass,
            )}
          >
            {description}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center items-center flex-wrap">
          {wrappedChildren}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
