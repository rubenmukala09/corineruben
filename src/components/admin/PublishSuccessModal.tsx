import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  ExternalLink,
  Share2,
  Copy,
  Edit,
  Plus,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useToast } from "@/hooks/use-toast";

interface PublishSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  articleUrl: string;
  articleTitle: string;
  onViewArticle: () => void;
  onEditArticle: () => void;
  onCreateAnother: () => void;
}

export function PublishSuccessModal({
  isOpen,
  onClose,
  articleUrl,
  articleTitle,
  onViewArticle,
  onEditArticle,
  onCreateAnother,
}: PublishSuccessModalProps) {
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      // Trigger confetti animation
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 9999,
      };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(articleUrl);
    toast({
      title: "Link Copied!",
      description: "Article URL copied to clipboard",
    });
  };

  const shareToTwitter = () => {
    const text = `Check out my new article: ${articleTitle}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(articleUrl)}`;
    window.open(url, "_blank", "width=550,height=420");
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`;
    window.open(url, "_blank", "width=550,height=420");
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
    window.open(url, "_blank", "width=550,height=420");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <DialogTitle className="text-3xl font-bold text-center">
            Article Published!
          </DialogTitle>
          <p className="text-muted-foreground text-center mt-2">
            Your article is now live and visible to everyone
          </p>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Main Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button onClick={onViewArticle} className="w-full">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Article
            </Button>
            <Button
              onClick={handleCopyLink}
              variant="outline"
              className="w-full"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
          </div>

          {/* Share Buttons */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-center">
              Share on social media
            </p>
            <div className="grid grid-cols-3 gap-2">
              <Button
                onClick={shareToTwitter}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <Share2 className="h-3 w-3 mr-1" />
                Twitter
              </Button>
              <Button
                onClick={shareToFacebook}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <Share2 className="h-3 w-3 mr-1" />
                Facebook
              </Button>
              <Button
                onClick={shareToLinkedIn}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <Share2 className="h-3 w-3 mr-1" />
                LinkedIn
              </Button>
            </div>
          </div>

          {/* Secondary Actions */}
          <div className="border-t pt-4 space-y-2">
            <Button
              onClick={onEditArticle}
              variant="outline"
              className="w-full"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Article
            </Button>
            <Button
              onClick={onCreateAnother}
              variant="outline"
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Another Article
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
