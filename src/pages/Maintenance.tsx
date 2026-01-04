import { useEffect, useState } from "react";
import { Wrench, Mail, Phone, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface MaintenanceData {
  expectedCompletion: Date;
  startTime: Date;
  reason: string;
  updates: { time: string; message: string }[];
}

function Maintenance() {
  const [email, setEmail] = useState("");
  const [timeRemaining, setTimeRemaining] = useState("");
  
  // This would come from your database/config in production
  const maintenanceData: MaintenanceData = {
    expectedCompletion: new Date("2025-01-15T15:00:00"),
    startTime: new Date("2025-01-15T12:00:00"),
    reason: "System upgrades and performance improvements",
    updates: [
      { time: "2:30 PM", message: "Database migration in progress" },
      { time: "1:00 PM", message: "Beginning scheduled maintenance" }
    ]
  };

  useEffect(() => {
    // Auto-refresh every 5 minutes
    const refreshInterval = setInterval(() => {
      window.location.reload();
    }, 5 * 60 * 1000);

    // Update countdown timer
    const timerInterval = setInterval(() => {
      const now = new Date();
      const diff = maintenanceData.expectedCompletion.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeRemaining("Finalizing...");
        return;
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeRemaining(`${hours} hours ${minutes} minutes`);
    }, 1000);

    return () => {
      clearInterval(refreshInterval);
      clearInterval(timerInterval);
    };
  }, []);

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // In production, save to database
    console.log("Notify email:", email);
    toast.success("You'll be notified when we're back online!");
    setEmail("");
  };

  const progressPercentage = () => {
    const now = new Date();
    const total = maintenanceData.expectedCompletion.getTime() - maintenanceData.startTime.getTime();
    const elapsed = now.getTime() - maintenanceData.startTime.getTime();
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground) / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="max-w-4xl w-full relative z-10">
        <Card className="p-10 md:p-16 text-center space-y-10 shadow-2xl">
          {/* Logo */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-primary">InVision Network</h1>
          </div>

          {/* Icon & Headline */}
          <div className="space-y-6">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl scale-150" />
              <div className="relative inline-flex items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/20">
                <Wrench className="w-14 h-14 md:w-18 md:h-18 text-accent animate-pulse" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">We'll Be Right Back!</h2>
          </div>

          {/* Explanation */}
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            We're performing scheduled maintenance to bring you new features and improved performance. Thank you for your patience!
          </p>

          {/* Expected Completion */}
          <Card className="p-8 bg-primary/5 border-primary/20 max-w-xl mx-auto">
            <div className="space-y-3">
              <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Expected Completion:</div>
              <div className="text-3xl md:text-4xl font-bold text-primary">
                {maintenanceData.expectedCompletion.toLocaleString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  hour: 'numeric', 
                  minute: '2-digit',
                  timeZoneName: 'short'
                })}
              </div>
            </div>
          </Card>

          {/* Time Remaining */}
          <div className="flex items-center justify-center gap-4 text-muted-foreground">
            <Clock className="h-6 w-6" />
            <span className="text-xl">Time Remaining: <strong className="text-foreground text-2xl">{timeRemaining}</strong></span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-3 max-w-xl mx-auto">
            <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${progressPercentage()}%` }}
              />
            </div>
            <div className="text-base text-muted-foreground">{Math.round(progressPercentage())}% Complete</div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
            {/* What's Happening */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-foreground">What's Happening:</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  System upgrades
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  Performance improvements
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  Security updates
                </li>
              </ul>
            </div>

            {/* Status Updates */}
            {maintenanceData.updates.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-foreground">Status Updates:</h3>
                <div className="space-y-3">
                  {maintenanceData.updates.map((update, index) => (
                    <div key={index} className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{update.time}</span> - {update.message}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <Card className="p-8 bg-muted/50 space-y-4 max-w-xl mx-auto">
            <h3 className="font-semibold text-lg text-foreground">Need Immediate Help?</h3>
            <div className="flex flex-col gap-3 text-base text-muted-foreground">
              <a href="mailto:support@invisionnetwork.org" className="flex items-center justify-center gap-3 hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
                support@invisionnetwork.org
              </a>
              <a href="tel:+19373018749" className="flex items-center justify-center gap-3 hover:text-primary transition-colors">
                <Phone className="h-5 w-5" />
                (937) 301-8749
              </a>
            </div>
            <p className="text-sm text-muted-foreground">For urgent issues only</p>
          </Card>

          {/* Email Notification */}
          <div className="space-y-4 max-w-md mx-auto">
            <h3 className="font-semibold text-lg text-foreground flex items-center justify-center gap-3">
              <Mail className="h-6 w-6" />
              Get Notified
            </h3>
            <form onSubmit={handleNotifyMe} className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-12"
              />
              <Button type="submit" size="lg" className="h-12 px-6">Notify Me</Button>
            </form>
          </div>

          {/* Auto-refresh notice */}
          <p className="text-sm text-muted-foreground">
            This page automatically refreshes every 5 minutes
          </p>
        </Card>
      </div>
    </div>
  );
}

export default Maintenance;
