import { ShieldCheck, Users, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const tickerItems = [
  { icon: AlertTriangle, text: "2,847 scams blocked this month", color: "text-destructive" },
  { icon: ShieldCheck, text: "$1.2M saved for families", color: "text-primary" },
  { icon: Users, text: "140,000+ people trained", color: "text-accent" },
  { icon: AlertTriangle, text: "AI voice cloning attacks up 300%", color: "text-destructive" },
  { icon: ShieldCheck, text: "99% threat detection rate", color: "text-primary" },
  { icon: Users, text: "5,000+ Ohio families protected", color: "text-accent" },
];

export const ThreatTicker = () => {
  // Double the items for seamless loop
  const items = [...tickerItems, ...tickerItems];

  return (
    <div className="bg-foreground overflow-hidden py-3 relative">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-foreground to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-foreground to-transparent z-10" />

      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-sm font-semibold">
            <item.icon className={`w-4 h-4 ${item.color}`} />
            <span className="text-background/90">{item.text}</span>
            <span className="text-background/20 mx-2">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
