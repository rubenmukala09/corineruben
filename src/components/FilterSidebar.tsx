import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterSidebarProps {
  categories: FilterOption[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  priceRange?: [number, number];
  onPriceChange?: (range: [number, number]) => void;
  maxPrice?: number;
  onClearFilters: () => void;
  showPriceFilter?: boolean;
}

export function FilterSidebar({
  categories,
  selectedCategories,
  onCategoryChange,
  priceRange = [0, 100],
  onPriceChange,
  maxPrice = 100,
  onClearFilters,
  showPriceFilter = true,
}: FilterSidebarProps) {
  const hasActiveFilters =
    selectedCategories.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < maxPrice;

  return (
    <Card className="p-6 sticky top-24 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Categories */}
        <div>
          <h4 className="text-sm font-semibold mb-3 text-foreground">
            Categories
          </h4>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => onCategoryChange(category.id)}
                />
                <Label
                  htmlFor={category.id}
                  className="text-sm cursor-pointer flex-1 text-foreground hover:text-primary transition-colors"
                >
                  {category.label}
                  {category.count !== undefined && (
                    <span className="text-muted-foreground ml-1">
                      ({category.count})
                    </span>
                  )}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        {showPriceFilter && onPriceChange && (
          <div>
            <h4 className="text-sm font-semibold mb-3 text-foreground">
              Price Range
            </h4>
            <div className="space-y-4">
              <Slider
                min={0}
                max={maxPrice}
                step={5}
                value={priceRange}
                onValueChange={(value) =>
                  onPriceChange(value as [number, number])
                }
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
