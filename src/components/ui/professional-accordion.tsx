import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import * as React from "react";

/**
 * Professional Accordion Component - InnovaAI-inspired
 *
 * FAQ-style accordion with plus/minus icons
 * Clean, modern design with smooth animations
 */

interface AccordionItem {
  question: string;
  answer: string;
}

interface ProfessionalAccordionProps {
  items: AccordionItem[];
  defaultOpen?: number; // Index of initially open item
  allowMultiple?: boolean; // Allow multiple items open simultaneously
  className?: string;
}

export const ProfessionalAccordion = ({
  items,
  defaultOpen,
  allowMultiple = false,
  className,
}: ProfessionalAccordionProps) => {
  const [openItems, setOpenItems] = React.useState<Set<number>>(
    new Set(defaultOpen !== undefined ? [defaultOpen] : [])
  );

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(index);
      }

      return newSet;
    });
  };

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, index) => (
        <AccordionItemComponent
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openItems.has(index)}
          onToggle={() => toggleItem(index)}
          delay={index * 0.05}
        />
      ))}
    </div>
  );
};

/**
 * Individual Accordion Item
 */

interface AccordionItemComponentProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  delay: number;
}

const AccordionItemComponent = ({
  question,
  answer,
  isOpen,
  onToggle,
  delay,
}: AccordionItemComponentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Question Button */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className="font-display text-lg md:text-xl font-bold text-[#18305A] pr-8">
          {question}
        </span>

        {/* Toggle Icon */}
        <div
          className={cn(
            "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
            isOpen
              ? "bg-coral-500 text-white rotate-180"
              : "bg-gray-100 text-gray-600"
          )}
        >
          {isOpen ? (
            <Minus className="w-5 h-5" />
          ) : (
            <Plus className="w-5 h-5" />
          )}
        </div>
      </button>

      {/* Answer Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="px-6 pb-6 pt-0">
              <p className="font-body text-base text-gray-600 leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/**
 * Two-Column FAQ Layout (InnovaAI pattern)
 */

interface TwoColumnFAQProps {
  leftColumn: AccordionItem[];
  rightColumn: AccordionItem[];
  className?: string;
}

export const TwoColumnFAQ = ({
  leftColumn,
  rightColumn,
  className,
}: TwoColumnFAQProps) => {
  return (
    <div className={cn("grid md:grid-cols-2 gap-6 md:gap-8", className)}>
      <ProfessionalAccordion items={leftColumn} />
      <ProfessionalAccordion items={rightColumn} />
    </div>
  );
};

/**
 * Compact FAQ Item (Alternative style)
 *
 * Simpler version for dense information
 */

interface CompactFAQItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export const CompactFAQItem = ({
  question,
  answer,
  defaultOpen = false,
}: CompactFAQItemProps) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left hover:text-coral-500 transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className="font-display text-base md:text-lg font-semibold text-[#18305A] pr-4">
          {question}
        </span>

        <div
          className={cn(
            "flex-shrink-0 transition-transform duration-300",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        >
          <Plus className="w-5 h-5 text-gray-400" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p className="font-body text-sm md:text-base text-gray-600 leading-relaxed pb-5">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
