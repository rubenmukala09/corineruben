import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ImageZoomProps {
  children: ReactNode;
  className?: string;
  scale?: number;
}

const ImageZoom = ({
  children,
  className = "",
}: ImageZoomProps) => {
  return (
    <div
      className={cn("overflow-hidden rounded-2xl hover:scale-105 transition-transform duration-400", className)}
    >
      {children}
    </div>
  );
};

export default ImageZoom;
