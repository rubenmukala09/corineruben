import { motion } from "framer-motion";

export const AIFooter = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative w-full py-6 px-6 mt-auto"
    >
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Disclaimer */}
        <div className="text-center px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
          <p className="text-sm font-medium text-white/95 mb-1">
            Privacy Notice
          </p>
          <p className="text-xs text-white/80 leading-relaxed">
            We do not save your data after chat sessions. Your conversation
            will not be saved once you close this window.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          {/* Anthropic */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/20"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <span className="text-sm font-medium text-white/90">
                Powered by{" "}
                <span className="text-white font-semibold">Anthropic</span>
              </span>
            </div>
          </motion.div>

          {/* Separator */}
          <div className="hidden sm:block w-px h-6 bg-white/20" />

          {/* Malwarebytes */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/20"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <span className="text-white text-xs font-bold">M</span>
              </div>
              <span className="text-sm font-medium text-white/90">
                Secured by{" "}
                <span className="text-white font-semibold">Malwarebytes</span>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Tagline */}
        <p className="text-center text-sm font-medium text-white/80">
          Advanced AI protection for your digital safety
        </p>
      </div>
    </motion.footer>
  );
};

export default AIFooter;
