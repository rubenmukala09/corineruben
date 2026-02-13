import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Button, ButtonProps } from "@/components/ui/button";

interface AnimatedButtonProps extends ButtonProps {
  children: ReactNode;
  withRipple?: boolean;
}

const AnimatedButton = ({
  children,
  withRipple = true,
  ...props
}: AnimatedButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button className="relative overflow-hidden" {...props}>
        {children}
        {withRipple && (
          <motion.span
            className="absolute inset-0 bg-white/20"
            initial={{ scale: 0, opacity: 1 }}
            whileTap={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </Button>
    </motion.div>
  );
};

export default AnimatedButton;
