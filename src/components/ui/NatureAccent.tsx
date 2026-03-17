import { cn } from "@/lib/utils";
import natureLandscape from "@/assets/nature-landscape-golden.jpg";
import natureLeaves from "@/assets/nature-leaves-dew.jpg";
import natureForest from "@/assets/nature-forest-path.jpg";
import natureLake from "@/assets/nature-lake-sunrise.jpg";

const images = {
  landscape: natureLandscape,
  leaves: natureLeaves,
  forest: natureForest,
  lake: natureLake,
};

interface NatureAccentProps {
  variant?: keyof typeof images;
  className?: string;
  position?: "left" | "right" | "center";
  opacity?: number;
}

/**
 * A decorative nature photo accent — shows a softly blurred nature image
 * as a background element inside a section. Use sparingly for visual depth.
 */
export const NatureAccent = ({
  variant = "landscape",
  className,
  position = "right",
  opacity = 0.12,
}: NatureAccentProps) => {
  const positionClasses = {
    left: "-left-[10%] top-1/2 -translate-y-1/2",
    right: "-right-[10%] top-1/2 -translate-y-1/2",
    center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  return (
    <div
      className={cn(
        "absolute w-[500px] h-[350px] rounded-3xl overflow-hidden pointer-events-none",
        positionClasses[position],
        className
      )}
      style={{ opacity }}
    >
      <img
        src={images[variant]}
        alt=""
        aria-hidden="true"
        className="w-full h-full object-cover blur-sm"
        loading="lazy"
        decoding="async"
        width={500}
        height={350}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
    </div>
  );
};

export default NatureAccent;
