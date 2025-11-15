import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/VideoPlayer";

interface VideoLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  thumbnail?: string;
  title?: string;
}

export function VideoLightbox({ isOpen, onClose, videoSrc, thumbnail, title }: VideoLightboxProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          size="icon"
          variant="ghost"
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:bg-white/20"
        >
          <X className="w-6 h-6" />
        </Button>
        
        {title && (
          <h3 className="text-white text-xl font-bold mb-4">{title}</h3>
        )}
        
        <VideoPlayer src={videoSrc} thumbnail={thumbnail} className="w-full aspect-video" />
      </div>
    </div>
  );
}
