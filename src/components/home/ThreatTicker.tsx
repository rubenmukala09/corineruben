import { AlertTriangle, TrendingUp } from "lucide-react";

const threats = [
  "FBI reports 300% increase in AI voice cloning scams targeting seniors",
  "Deepfake video calls now used in 1 in 5 financial fraud cases",
  "Ohio ranks #7 nationally for elderly fraud victims",
  "AI-generated phishing emails bypass 94% of traditional spam filters",
  "Average loss per AI scam victim: $14,000",
];

export const ThreatTicker = () => {
  return (
    <section className="py-4 border-y border-border/40 bg-card/50 overflow-hidden">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 flex items-center gap-2 px-6">
          <AlertTriangle className="w-4 h-4 text-destructive" />
          <span className="text-xs font-bold uppercase tracking-wider text-destructive">
            Live Threats
          </span>
        </div>
        <div className="overflow-hidden flex-1">
          <div className="flex gap-12 animate-ticker whitespace-nowrap">
            {[...threats, ...threats].map((threat, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground"
              >
                <TrendingUp className="w-3.5 h-3.5 text-destructive/60 flex-shrink-0" />
                {threat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreatTicker;
