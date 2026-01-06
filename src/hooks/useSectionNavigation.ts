import { useState, useEffect, useCallback, useRef } from "react";

interface Section {
  id: string;
  label: string;
}

interface SectionBounds {
  id: string;
  top: number;
  bottom: number;
}

export const useSectionNavigation = (sections: Section[]) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const sectionBoundsRef = useRef<SectionBounds[]>([]);

  // Cache section positions to avoid forced reflows during scroll
  const updateSectionBounds = useCallback(() => {
    // Batch all reads together before any writes
    const bounds: SectionBounds[] = [];
    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) {
        const top = element.offsetTop;
        const height = element.offsetHeight;
        bounds.push({ id: section.id, top, bottom: top + height });
      }
    }
    sectionBoundsRef.current = bounds;
  }, [sections]);

  // Scroll to section with smooth behavior
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 96; // Account for fixed navigation
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, []);

  // Track active section based on scroll position using cached bounds
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (ticking) return;
      
      ticking = true;
      requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + 150; // Offset for detection
        const bounds = sectionBoundsRef.current;

        for (const section of bounds) {
          if (scrollPosition >= section.top && scrollPosition < section.bottom) {
            setActiveSection(section.id);
            break;
          }
        }
        ticking = false;
      });
    };

    // Update bounds after layout is stable
    const updateAndScroll = () => {
      updateSectionBounds();
      handleScroll();
    };

    // Defer initial calculation to avoid forced reflow during paint
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(updateAndScroll);
    }, 200);

    // Update bounds on resize (throttled)
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        requestAnimationFrame(updateSectionBounds);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
      clearTimeout(resizeTimeout);
    };
  }, [sections, updateSectionBounds]);

  return { activeSection, scrollToSection };
};
