import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageZoomProps {
  children: ReactNode;
  className?: string;
  scale?: number;
}

const ImageZoom = ({
  children,
  className = "",
  scale = 1.05,
}: ImageZoomProps) => {
  return (
    <motion.div
      className={cn("overflow-hidden rounded-2xl", className)}
      whileHover={{ scale }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default ImageZoom;
