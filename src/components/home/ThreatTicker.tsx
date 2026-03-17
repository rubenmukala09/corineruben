import { ShieldCheck, Users, AlertTriangle } from "lucide-react";

const tickerItems = [
  { icon: AlertTriangle, text: "2,847 scams blocked this month", color: "text-destructive" },
  { icon: ShieldCheck, text: "$1.2M saved for families", color: "text-primary" },
  { icon: Users, text: "140,000+ people trained", color: "text-accent" },
  { icon: AlertTriangle, text: "AI voice cloning attacks up 300%", color: "text-destructive" },
  { icon: ShieldCheck, text: "99% threat detection rate", color: "text-primary" },
  { icon: Users, text: "5,000+ Ohio families protected", color: "text-accent" },
];

export const ThreatTicker = () => {
  const items = [...tickerItems, ...tickerItems];

  return (
    <div className="relative overflow-hidden py-4 border-y border-border/50 bg-card/75 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/6 via-background/80 to-accent/6" />
      
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="flex gap-10 whitespace-nowrap relative animate-marquee">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2.5 text-sm font-semibold">
            <item.icon className={`w-4 h-4 ${item.color}`} />
            <span className="text-foreground">{item.text}</span>
            <span className="text-muted-foreground mx-2">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};
