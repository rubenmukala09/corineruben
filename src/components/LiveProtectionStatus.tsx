import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, CheckCircle2, AlertTriangle, Activity, Users, X, ChevronUp } from "lucide-react";

interface ProtectionEvent {
  id: number;
  type: "blocked" | "verified" | "alert" | "protected";
  message: string;
  timestamp: Date;
}

const eventTypes = {
  blocked: { icon: Shield, color: "text-red-500", bg: "bg-red-500/10" },
  verified: { icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10" },
  alert: { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-500/10" },
  protected: { icon: Users, color: "text-primary", bg: "bg-primary/10" },
};

const sampleEvents: Omit<ProtectionEvent, "id" | "timestamp">[] = [
  { type: "blocked", message: "Phishing attempt blocked in Columbus" },
  { type: "verified", message: "Senior verified safe transaction" },
  { type: "protected", message: "New family joined protection network" },
  { type: "alert", message: "AI scam pattern detected & neutralized" },
  { type: "blocked", message: "Suspicious caller ID flagged in Cleveland" },
  { type: "verified", message: "Business account security verified" },
  { type: "protected", message: "Veteran family enrolled in Shield tier" },
  { type: "blocked", message: "Romance scam attempt intercepted" },
  { type: "alert", message: "New threat signature added to database" },
  { type: "verified", message: "Monthly security scan completed" },
];

export const LiveProtectionStatus = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [events, setEvents] = useState<ProtectionEvent[]>([]);
  const [stats, setStats] = useState({
    threatsBlocked: 12847,
    familiesProtected: 523,
    activeMonitoring: 98.7,
  });

  // Simulate live events
  useEffect(() => {
    const addEvent = () => {
      const randomEvent = sampleEvents[Math.floor(Math.random() * sampleEvents.length)];
      const newEvent: ProtectionEvent = {
        ...randomEvent,
        id: Date.now(),
        timestamp: new Date(),
      };

      setEvents(prev => [newEvent, ...prev].slice(0, 5));

      // Update stats occasionally
      if (Math.random() > 0.5) {
        setStats(prev => ({
          ...prev,
          threatsBlocked: prev.threatsBlocked + Math.floor(Math.random() * 3) + 1,
        }));
      }
    };

    // Initial events
    for (let i = 0; i < 3; i++) {
      setTimeout(() => addEvent(), i * 500);
    }

    // Continuous events
    const interval = setInterval(addEvent, 8000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 2 }}
      className="fixed bottom-24 right-6 z-50"
    >
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="w-80 glass-heavy rounded-2xl shadow-3d-lg overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-primary/10 to-accent/10 border-b border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-green-500"
                  />
                  <span className="text-sm font-semibold text-foreground">Sample Protection</span>
                  <span className="rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-semibold text-foreground/70">
                    Demo
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-2 p-3 border-b border-white/10">
              <div className="text-center">
                <motion.div
                  key={stats.threatsBlocked}
                  initial={{ scale: 1.2, color: "hsl(var(--primary))" }}
                  animate={{ scale: 1, color: "hsl(var(--foreground))" }}
                  className="text-lg font-bold"
                >
                  {stats.threatsBlocked.toLocaleString()}
                </motion.div>
                <div className="text-[10px] text-muted-foreground">Threats Blocked</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">{stats.familiesProtected}</div>
                <div className="text-[10px] text-muted-foreground">Families Safe</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-500">{stats.activeMonitoring}%</div>
                <div className="text-[10px] text-muted-foreground">Uptime</div>
              </div>
            </div>

            {/* Events Feed */}
            <div className="p-3 max-h-48 overflow-y-auto">
              <div className="space-y-2">
                <AnimatePresence mode="popLayout">
                  {events.map((event) => {
                    const EventIcon = eventTypes[event.type].icon;
                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: "auto" }}
                        exit={{ opacity: 0, x: 20, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex items-start gap-2 p-2 rounded-lg ${eventTypes[event.type].bg}`}
                      >
                        <EventIcon className={`w-4 h-4 mt-0.5 ${eventTypes[event.type].color}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-foreground/90 leading-tight">{event.message}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">
                            {event.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-gradient-to-r from-primary/5 to-accent/5 border-t border-white/10">
              <p className="text-[10px] text-center text-muted-foreground">
                Sample activity for demo purposes
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(true)}
            className="relative flex items-center gap-3 px-4 py-3 glass-heavy rounded-full shadow-3d hover:shadow-3d-lg transition-all"
          >
            {/* Pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute left-4 w-3 h-3 rounded-full bg-green-500"
            />

            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-3 h-3 rounded-full bg-green-500"
              />
              <Activity className="w-4 h-4 text-primary" />
            </div>

            <div className="text-left">
              <div className="text-xs font-semibold text-foreground">Sample Activity</div>
              <motion.div
                key={stats.threatsBlocked}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                className="text-[10px] text-muted-foreground"
              >
                {stats.threatsBlocked.toLocaleString()} sample updates
              </motion.div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LiveProtectionStatus;
