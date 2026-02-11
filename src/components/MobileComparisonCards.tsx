import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonRow {
  feature: string;
  scamshield: boolean;
  business: boolean;
  training: boolean;
}

interface MobileComparisonCardsProps {
  comparisons: ComparisonRow[];
}

const serviceConfigs = [
  { key: 'scamshield', label: 'ScamShield', gradient: 'from-primary to-primary/80' },
  { key: 'business', label: 'AI Business', gradient: 'from-accent to-accent/80' },
  { key: 'training', label: 'Training', gradient: 'from-success to-success/80' },
] as const;

export function MobileComparisonCards({ comparisons }: MobileComparisonCardsProps) {
  return (
    <div className="md:hidden space-y-4">
      {serviceConfigs.map((service) => (
        <Card key={service.key} className="overflow-hidden">
          <div className={cn(
            "px-4 py-3 bg-gradient-to-r text-white font-semibold",
            service.gradient
          )}>
            {service.label}
          </div>
          <div className="p-4 space-y-3">
            {comparisons.map((row, index) => {
              const hasFeature = row[service.key as keyof ComparisonRow];
              return (
                <div 
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <span className="text-sm text-foreground">{row.feature}</span>
                  {hasFeature ? (
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  ) : (
                    <span className="text-muted-foreground text-sm">-</span>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      ))}
    </div>
  );
}

export default MobileComparisonCards;
