import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Palette,
  Printer,
  Monitor,
  Megaphone,
  Type,
  PenTool,
  Play,
  Layout,
  ChevronRight,
} from "lucide-react";

const CATEGORIES = [
  {
    title: "Branding & Identity",
    icon: Palette,
    color: "from-primary/20 to-accent/10",
    items: [
      "Brand Identity",
      "Logo Design",
      "Visual Identity",
      "Brand Guidelines",
      "Rebranding",
      "Personal Branding",
      "Corporate Branding",
    ],
  },
  {
    title: "Print Design",
    icon: Printer,
    color: "from-accent/20 to-primary/10",
    items: [
      "Poster Design",
      "Flyer Design",
      "Brochure Design",
      "Business Card Design",
      "Magazine Layout",
      "Book Cover Design",
      "Packaging Design",
    ],
  },
  {
    title: "Digital Design",
    icon: Monitor,
    color: "from-primary/15 to-accent/15",
    items: [
      "Social Media Graphics",
      "Web Graphics",
      "Email Design",
      "Digital Ads",
      "Banner Design",
      "Thumbnail Design",
      "UI Graphics",
    ],
  },
  {
    title: "Marketing & Advertising",
    icon: Megaphone,
    color: "from-accent/15 to-primary/20",
    items: [
      "Advertising Design",
      "Campaign Design",
      "Promotional Design",
      "Billboard Design",
      "Presentation Design",
      "Sales Collateral",
      "Marketing Assets",
    ],
  },
  {
    title: "Typography",
    icon: Type,
    color: "from-primary/20 to-accent/5",
    items: [
      "Typography Design",
      "Font Pairing",
      "Lettering Design",
      "Custom Type",
      "Calligraphy",
      "Kinetic Typography",
    ],
  },
  {
    title: "Illustration & Visual Art",
    icon: PenTool,
    color: "from-accent/20 to-primary/5",
    items: [
      "Illustration Design",
      "Vector Illustration",
      "Character Design",
      "Icon Design",
      "Infographic Design",
      "Pattern Design",
    ],
  },
  {
    title: "Motion & Hybrid Design",
    icon: Play,
    color: "from-primary/10 to-accent/20",
    items: [
      "Motion Graphics",
      "Animated Posters",
      "Social Media Animation",
      "Title Design",
      "Visual Effects (Design-led)",
    ],
  },
  {
    title: "UI / UX Graphic Assets",
    icon: Layout,
    color: "from-accent/10 to-primary/15",
    items: [
      "UI Kit Design",
      "Icon Sets",
      "Design Systems",
      "Wireframe Graphics",
      "UX Visual Assets",
    ],
  },
];

export function GraphicDesignSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-3">
            Creative Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            🎨 Graphic Design
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From brand identity to motion design — full-spectrum creative
            services for every platform.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            const isActive = activeIndex === i;

            return (
              <motion.button
                key={cat.title}
                onClick={() => setActiveIndex(isActive ? null : i)}
                className={cn(
                  "group relative rounded-xl border text-left transition-all duration-200 overflow-hidden",
                  isActive
                    ? "border-primary/40 shadow-lg"
                    : "border-border hover:border-primary/20 hover:shadow-md"
                )}
                whileHover={{ y: -2 }}
                layout
              >
                {/* Placeholder thumbnail area */}
                <div
                  className={cn(
                    "h-36 bg-gradient-to-br flex items-center justify-center",
                    cat.color
                  )}
                >
                  <Icon className="w-10 h-10 text-primary/60" strokeWidth={1.5} />
                </div>

                {/* Title bar */}
                <div className="p-4 flex items-center justify-between bg-card">
                  <h3 className="font-semibold text-sm text-card-foreground">
                    {cat.title}
                  </h3>
                  <ChevronRight
                    className={cn(
                      "w-4 h-4 text-muted-foreground transition-transform",
                      isActive && "rotate-90"
                    )}
                  />
                </div>

                {/* Expanded subcategory list */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden bg-card border-t border-border"
                    >
                      <ul className="p-4 space-y-2">
                        {cat.items.map((item) => (
                          <li
                            key={item}
                            className="text-sm text-muted-foreground flex items-center gap-2"
                          >
                            <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        {/* Summary */}
        <p className="text-center text-sm text-muted-foreground mt-10">
          {CATEGORIES.reduce((sum, c) => sum + c.items.length, 0)}+ design
          services across {CATEGORIES.length} disciplines
        </p>
      </div>
    </section>
  );
}
