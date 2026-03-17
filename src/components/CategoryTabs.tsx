import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LucideIcon } from "lucide-react";

interface Category {
  id: string;
  label: string;
  icon?: LucideIcon;
  count?: number;
}

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <Tabs
      value={activeCategory}
      onValueChange={onCategoryChange}
      className="w-full"
    >
      <TabsList className="w-full justify-start flex-wrap h-auto gap-2 bg-muted/50 p-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {Icon && <Icon className="h-4 w-4 mr-2" />}
              {category.label}
              {category.count !== undefined && (
                <span className="ml-2 text-xs opacity-70">
                  ({category.count})
                </span>
              )}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
