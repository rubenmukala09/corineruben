import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { performanceMonitor } from "@/utils/performanceMonitor";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, Zap } from "lucide-react";

export function PerformanceDashboard() {
  const [summary, setSummary] = useState<any>(null);
  const [metrics, setMetrics] = useState<any[]>([]);
  const location = useLocation();

  useEffect(() => {
    // Update performance data on route change
    const timer = setTimeout(() => {
      setSummary(performanceMonitor.getSummary());
      setMetrics(performanceMonitor.getMetrics());
    }, 500);

    return () => clearTimeout(timer);
  }, [location]);

  // Only show in development mode
  if (import.meta.env.PROD) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="p-4 bg-background/95 backdrop-blur shadow-lg border-2">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-sm">Performance Monitor</h3>
        </div>

        {summary ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>Components</span>
                </div>
                <Badge variant="secondary" className="font-mono">
                  {summary.totalComponents}
                </Badge>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <TrendingUp className="w-3 h-3" />
                  <span>Avg Load</span>
                </div>
                <Badge 
                  variant={parseFloat(summary.avgDuration) < 100 ? "default" : "destructive"}
                  className="font-mono"
                >
                  {summary.avgDuration}ms
                </Badge>
              </div>
            </div>

            {metrics.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Recent Loads:</p>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {metrics.slice(-5).reverse().map((metric, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <span className="truncate flex-1">{metric.component}</span>
                      {metric.duration !== undefined && (
                        <Badge 
                          variant={metric.duration < 100 ? "default" : metric.duration < 500 ? "secondary" : "destructive"}
                          className="ml-2 font-mono text-xs"
                        >
                          {metric.duration.toFixed(0)}ms
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">No metrics yet</p>
        )}
      </Card>
    </div>
  );
}
