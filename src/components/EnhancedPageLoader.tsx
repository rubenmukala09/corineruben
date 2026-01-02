import { motion } from "framer-motion";

interface EnhancedPageLoaderProps {
  message?: string;
}

export const EnhancedPageLoader = ({ message = "Loading..." }: EnhancedPageLoaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-muted-foreground">{message}</span>
      </div>
    </motion.div>
  );
};
