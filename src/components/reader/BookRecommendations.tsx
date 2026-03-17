import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, ShoppingCart, Percent } from "lucide-react";
import { getRecommendations, type BookItem } from "@/config/bookCatalog";

interface BookRecommendationsProps {
  ownedBookIds: string[];
  onBuy: (book: BookItem) => void;
}

export function BookRecommendations({ ownedBookIds, onBuy }: BookRecommendationsProps) {
  const recommendations = useMemo(
    () => getRecommendations(ownedBookIds, 4),
    [ownedBookIds]
  );

  if (recommendations.length === 0) return null;

  return (
    <div className="mt-10">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold text-foreground">Recommended for You</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {recommendations.map((book) => {
          const discountedPrice = (book.price * 0.95).toFixed(2);
          return (
            <Card key={book.id} className="overflow-hidden group">
              <div className="aspect-[3/4] overflow-hidden relative">
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  draggable={false}
                  loading="lazy"
                />
                <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground text-[10px]">
                  <Percent className="h-2.5 w-2.5 mr-0.5" />
                  5% OFF
                </Badge>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-xs line-clamp-2">{book.name}</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{book.description}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="text-xs line-through text-muted-foreground">${book.price}</span>
                  <span className="text-sm font-bold text-primary">${discountedPrice}</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full mt-2 text-xs h-8"
                  onClick={() => onBuy(book)}
                >
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Buy Now
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
