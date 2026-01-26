import { useState, useEffect, useCallback, useRef } from "react";

interface Section {
  id: string;
  label: string;
}

export const useSectionNavigation = (sections: Section[]) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const observersRef = useRef<IntersectionObserver[]>([]);

  // Scroll to section with smooth behavior - uses double rAF to avoid forced reflows
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Double rAF ensures layout is complete before reading geometry
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const navHeight = 96; // Account for fixed navigation
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        });
      });
    }
  }, []);

  // Use IntersectionObserver instead of offset measurements to avoid forced reflows
  useEffect(() => {
    // Disconnect any existing observers
    observersRef.current.forEach(obs => obs.disconnect());
    observersRef.current = [];

    const observerOptions = {
      root: null,
      // rootMargin accounts for fixed nav and provides better detection
      rootMargin: "-100px 0px -50% 0px",
      threshold: 0
    };

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (!element) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(section.id);
          }
        });
      }, observerOptions);

      observer.observe(element);
      observersRef.current.push(observer);
    });

    return () => {
      observersRef.current.forEach(obs => obs.disconnect());
      observersRef.current = [];
    };
  }, [sections]);

  return { activeSection, scrollToSection };
};
