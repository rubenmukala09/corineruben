import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Shield,
  Phone,
  BookOpen,
  MessageSquare,
  Building2,
  Activity,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { SITE } from "@/config/site";

const HIDDEN_PATH_PREFIXES = ["/admin", "/portal"];

const sampleEvents = [
  { type: "blocked" as const, message: "Phishing attempt blocked in Columbus" },
  { type: "verified" as const, message: "Senior verified safe transaction" },
  { type: "protected" as const, message: "New family joined protection network" },
  { type: "alert" as const, message: "AI scam pattern detected & neutralized" },
  { type: "blocked" as const, message: "Suspicious caller ID flagged in Cleveland" },
  { type: "verified" as const, message: "Business account security verified" },
];

export const GlassQuickMenu = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(0);
  const [showActivity, setShowActivity] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEvent((prev) => (prev + 1) % sampleEvents.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (HIDDEN_PATH_PREFIXES.some((prefix) => location.pathname.startsWith(prefix))) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-32 right-6 z-50 hidden md:flex items-center gap-2 glass-heavy rounded-full px-4 py-3 shadow-3d hover:shadow-3d-lg transition-all duration-300 border border-white/30 micro-tilt-3d tactile-button"
        aria-label="Open quick menu"
      >
        <Sparkles className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold text-foreground">Quick Menu</span>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl glass-heavy border border-white/30">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Sparkles className="w-5 h-5 text-primary" />
              Quick Actions
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            <Button asChild className="h-12 justify-start gap-3 rounded-xl">
              <Link to="/training#pricing">
                <BookOpen className="w-4 h-4" />
                Book Training
              </Link>
            </Button>
            <Button asChild variant="secondary" className="h-12 justify-start gap-3 rounded-xl">
              <Link to="/training#scamshield">
                <Shield className="w-4 h-4" />
                Analyze a Message
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 justify-start gap-3 rounded-xl">
              <Link to="/business">
                <Building2 className="w-4 h-4" />
                Business Solutions
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 justify-start gap-3 rounded-xl">
              <Link to="/resources">
                <Sparkles className="w-4 h-4" />
                Resources & Guides
              </Link>
            </Button>
            <Button asChild variant="ghost" className="h-12 justify-start gap-3 rounded-xl">
              <Link to="/contact">
                <MessageSquare className="w-4 h-4" />
                Contact Support
              </Link>
            </Button>
            <Button asChild variant="ghost" className="h-12 justify-start gap-3 rounded-xl">
              <a href={SITE.phone.tel}>
                <Phone className="w-4 h-4" />
                Call {SITE.phone.display}
              </a>
            </Button>
          </div>

          {/* Sample Activity Feed */}
          <div className="mt-3 border-t border-border/40 pt-3">
            <button
              onClick={() => setShowActivity(!showActivity)}
              className="flex items-center justify-between w-full text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                Sample Activity
                <span className="text-[10px] bg-muted rounded-full px-2 py-0.5 font-medium">Demo</span>
              </span>
              {showActivity ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <div
              className={`overflow-hidden transition-all duration-250 ${showActivity ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}
            >
              <div className="space-y-2">
                {sampleEvents.map((evt, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2 rounded-lg bg-muted/40"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        evt.type === "blocked"
                          ? "bg-red-500"
                          : evt.type === "verified"
                            ? "bg-green-500"
                            : evt.type === "alert"
                              ? "bg-amber-500"
                              : "bg-primary"
                      }`}
                    />
                    <p className="text-xs text-foreground/80">{evt.message}</p>
                  </div>
                ))}
                <p className="text-[10px] text-center text-muted-foreground pt-1">
                  Sample activity for demo purposes
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GlassQuickMenu;
