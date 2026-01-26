import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Zap, X, Star, Building2, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

interface BookCoverModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    tag: string;
    stripe_price_id: string;
  } | null;
  onAddToCart: (book: any) => void;
  onBuyNow: (book: any) => void;
}

const BookCoverModal = ({ isOpen, onClose, book, onAddToCart, onBuyNow }: BookCoverModalProps) => {
  if (!book) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-gradient-to-br from-card via-card to-secondary/20 border-primary/20">
        <DialogTitle className="sr-only">{book.name} - Book Details</DialogTitle>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Book Cover - Large View */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative bg-gradient-to-br from-secondary/50 to-secondary/30 p-6 md:p-8 flex items-center justify-center min-h-[400px] md:min-h-[500px]"
          >
            <div className="relative w-full max-w-[280px] md:max-w-[320px] shadow-2xl rounded-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
              <div className="aspect-[3/4]">
                <img 
                  src={book.image} 
                  alt={book.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Tag Badge on Cover */}
              <Badge className="absolute top-3 right-3 text-xs px-2 py-1 bg-gradient-to-r from-primary to-accent text-white shadow-lg">
                {book.tag}
              </Badge>
            </div>
          </motion.div>

          {/* Book Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="p-6 md:p-8 flex flex-col justify-center"
          >
            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {book.name}
            </h2>

            {/* Author */}
            <div className="flex items-center gap-2 mb-4 text-muted-foreground">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">InVision Network</span>
              <span className="text-xs">•</span>
              <span className="text-xs">Department of Literature</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-chart-4 text-chart-4" />
            ))}
              <span className="text-sm text-muted-foreground ml-1">5.0 (128 reviews)</span>
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {book.description}
            </p>

            {/* Features */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="w-4 h-4 text-primary" />
                <span>Instant PDF Download</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="w-4 h-4 text-primary" />
                <span>Print-Ready Format</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="w-4 h-4 text-primary" />
                <span>Lifetime Access</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-primary">${book.price}</span>
              <Badge variant="outline" className="text-success border-success/30 bg-success/10">
                🎖️ Veterans Save 10%
              </Badge>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  onAddToCart(book);
                  onClose();
                }}
                className="h-12"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button 
                size="lg"
                onClick={() => {
                  onBuyNow(book);
                  onClose();
                }}
                className="h-12 bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                <Zap className="w-4 h-4 mr-2" />
                Buy Now
              </Button>
            </div>

            {/* Trust Badge */}
            <p className="text-xs text-muted-foreground text-center mt-4">
              🔒 Secure checkout powered by Stripe • 30-day money-back guarantee
            </p>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookCoverModal;
