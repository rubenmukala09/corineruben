import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  X,
  MessageCircle,
  Phone,
  Mail,
  FileQuestion,
  BookOpen,
  Shield,
  AlertTriangle,
} from "lucide-react";

interface QuickAction {
  icon: typeof HelpCircle;
  label: string;
  description: string;
  href?: string;
  action?: () => void;
  color: string;
  urgent?: boolean;
}

const quickActions: QuickAction[] = [
  {
    icon: AlertTriangle,
    label: "Report a Scam",
    description: "Encountered something suspicious?",
    href: "/resources",
    color: "from-red-500 to-orange-500",
    urgent: true,
  },
  {
    icon: Phone,
    label: "Call Us",
    description: "Speak with a security expert",
    action: () => window.open("tel:+1234567890", "_self"),
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: MessageCircle,
    label: "Live Chat",
    description: "Chat with our AI assistant",
    href: "/contact",
    color: "from-primary to-accent",
  },
  {
    icon: FileQuestion,
    label: "FAQ",
    description: "Quick answers to common questions",
    href: "/faq",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: BookOpen,
    label: "Training",
    description: "Learn to stay protected",
    href: "/training",
    color: "from-purple-500 to-violet-500",
  },
  {
    icon: Mail,
    label: "Email Support",
    description: "We respond within 24 hours",
    action: () => window.open("mailto:support@secureseniorsafeguard.com", "_self"),
    color: "from-amber-500 to-yellow-500",
  },
];

export const QuickHelpFAB = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-24 z-50">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/40 backdrop-blur-sm z-40"
            />

            {/* Actions panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 right-0 z-50 w-72"
            >
              <div className="glass-heavy rounded-2xl shadow-3d-lg overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 bg-gradient-to-r from-primary/10 to-accent/10 border-b border-white/20">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-foreground">Quick Help</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    We&apos;re here to help you stay safe
                  </p>
                </div>

                {/* Actions grid */}
                <div className="p-3 grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => {
                    const ActionIcon = action.icon;
                    const content = (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`relative p-3 rounded-xl bg-white/50 hover:bg-white/80 border border-white/30 transition-all cursor-pointer group ${
                          action.urgent ? "ring-2 ring-red-500/50" : ""
                        }`}
                        onClick={() => {
                          if (action.action) {
                            action.action();
                          }
                          setIsOpen(false);
                        }}
                      >
                        {action.urgent && (
                          <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                          />
                        )}
                        <div
                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mb-2`}
                        >
                          <ActionIcon className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-xs font-medium text-foreground">{action.label}</div>
                        <div className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                          {action.description}
                        </div>
                      </motion.div>
                    );

                    if (action.href) {
                      return (
                        <Link key={action.label} to={action.href} onClick={() => setIsOpen(false)}>
                          {content}
                        </Link>
                      );
                    }

                    return <div key={action.label}>{content}</div>;
                  })}
                </div>

                {/* Footer */}
                <div className="px-4 py-2 bg-gradient-to-r from-primary/5 to-accent/5 border-t border-white/10">
                  <p className="text-[10px] text-center text-muted-foreground">
                    24/7 Support Available
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full shadow-3d-lg flex items-center justify-center transition-all overflow-hidden group"
        style={{
          background: isOpen
            ? "hsl(var(--muted))"
            : "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)",
        }}
      >
        {/* Pulse effect when closed */}
        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-primary/30"
          />
        )}

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-foreground" />
            </motion.div>
          ) : (
            <motion.div
              key="help"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <HelpCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification badge */}
        {!isOpen && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
          >
            ?
          </motion.span>
        )}
      </motion.button>
    </div>
  );
};

export default QuickHelpFAB;
