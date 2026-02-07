import { useSectionNavigation } from "@/hooks/useSectionNavigation";

const sections = [
  { id: "hero", label: "Home" },
  { id: "get-protected", label: "Get Protected" },
  { id: "stats", label: "Stats" },
  { id: "workshops", label: "Workshops" },
  { id: "business", label: "Business" },
  { id: "alerts", label: "Alerts" },
  { id: "widgets", label: "Insights" },
  { id: "resources", label: "Resources" },
  { id: "trust", label: "Trust" },
  { id: "process", label: "Process" },
  { id: "faq", label: "FAQ" },
  { id: "quick-links", label: "Quick Links" },
];

export const SectionNav = () => {
  const { activeSection, scrollToSection } = useSectionNavigation(sections);

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3 animate-fade-in">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="group relative flex items-center justify-end gap-3"
          aria-label={`Scroll to ${section.label}`}
          aria-current={activeSection === section.id ? "true" : undefined}
        >
          {/* Label tooltip */}
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm font-medium text-foreground bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border/50 shadow-lg whitespace-nowrap">
            {section.label}
          </span>
          
          {/* Dot indicator */}
          <div
            className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-130 active:scale-90 ${
              activeSection === section.id
                ? "bg-primary scale-125 shadow-lg shadow-primary/50"
                : "bg-muted-foreground/30 hover:bg-primary/50"
            }`}
          />
        </button>
      ))}
    </nav>
  );
};

export default SectionNav;
