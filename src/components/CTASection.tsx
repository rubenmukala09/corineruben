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
          "py-14 sm:py-20 md:py-28 lg:py-36 relative overflow-hidden",
          className,
        )}
        role="region"
        aria-label="Call to action"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/75 to-primary/65" />

        <div className="container mx-auto px-5 sm:px-6 text-center relative z-10">
          <h2
            className={cn(
              "mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold drop-shadow-lg",
              textClass,
            )}
          >
            {headline}
          </h2>
          {description && (
            <p
              className={cn(
                "text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed font-medium",
                textClass,
              )}
            >
              {description}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center items-center flex-wrap">
            {wrappedChildren}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "py-10 sm:py-16 md:py-20 lg:py-24 rounded-2xl sm:rounded-3xl mx-3 sm:mx-4 my-6 sm:my-8",
        bgClass,
        className,
      )}
      role="region"
      aria-label="Call to action"
    >
      <div className="container mx-auto px-5 sm:px-6 text-center">
        <h2
          className={cn(
            "mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold",
            textClass,
          )}
        >
          {headline}
        </h2>
        {description && (
          <p
            className={cn(
              "text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed font-medium",
              textClass,
            )}
          >
            {description}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center items-center flex-wrap">
          {wrappedChildren}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
