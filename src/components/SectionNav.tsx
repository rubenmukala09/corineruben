import { motion } from "framer-motion";
import { useSectionNavigation } from "@/hooks/useSectionNavigation";

const sections = [
  { id: "hero", label: "Home" },
  { id: "features", label: "Features" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "process", label: "Process" },
  { id: "testimonials", label: "Testimonials" },
  { id: "blog", label: "Blog" },
];

export const SectionNav = () => {
  const { activeSection, scrollToSection } = useSectionNavigation(sections);

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3"
    >
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="group relative flex items-center justify-end gap-3"
          aria-label={`Scroll to ${section.label}`}
        >
          {/* Label tooltip */}
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm font-medium text-foreground bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border/50 shadow-lg whitespace-nowrap">
            {section.label}
          </span>
          
          {/* Dot indicator */}
          <motion.div
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === section.id
                ? "bg-primary scale-125 shadow-lg shadow-primary/50"
                : "bg-muted-foreground/30 hover:bg-primary/50"
            }`}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          />
        </button>
      ))}
    </motion.nav>
  );
};

export default SectionNav;
