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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full">
        <Card className="p-8 md:p-12 text-center space-y-8">
          {/* Logo */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-primary">InVision Network</h1>
          </div>

          {/* Icon & Headline */}
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10">
              <Wrench className="w-10 h-10 text-accent animate-pulse" />
            </div>
            <h2 className="text-4xl font-bold text-foreground">We'll Be Right Back!</h2>
          </div>

          {/* Explanation */}
          <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mx-auto">
            We're performing scheduled maintenance to bring you new features and improved performance. Thank you for your patience!
          </p>

          {/* Expected Completion */}
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="space-y-2">
              <div className="text-sm font-semibold text-muted-foreground">Expected Completion:</div>
              <div className="text-2xl font-bold text-primary">
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
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <Clock className="h-5 w-5" />
            <span className="text-lg">Time Remaining: <strong className="text-foreground">{timeRemaining}</strong></span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${progressPercentage()}%` }}
              />
            </div>
            <div className="text-sm text-muted-foreground">{Math.round(progressPercentage())}% Complete</div>
          </div>

          {/* What's Happening */}
          <div className="text-left space-y-3">
            <h3 className="font-semibold text-foreground">What's Happening:</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                System upgrades
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                Performance improvements
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                Security updates
              </li>
            </ul>
          </div>

          {/* Status Updates */}
          {maintenanceData.updates.length > 0 && (
            <div className="text-left space-y-3">
              <h3 className="font-semibold text-foreground">Status Updates:</h3>
              <div className="space-y-2">
                {maintenanceData.updates.map((update, index) => (
                  <div key={index} className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{update.time}</span> - {update.message}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Information */}
          <Card className="p-6 bg-muted/50 space-y-3">
            <h3 className="font-semibold text-foreground">Need Immediate Help?</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="mailto:support@invisionnetwork.org" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="h-4 w-4" />
                support@invisionnetwork.org
              </a>
              <a href="tel:+19373018749" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
                (937) 301-8749
              </a>
            </div>
            <p className="text-xs text-muted-foreground">For urgent issues only</p>
          </Card>

          {/* Email Notification */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center justify-center gap-2">
              <Mail className="h-5 w-5" />
              Get Notified
            </h3>
            <form onSubmit={handleNotifyMe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit">Notify Me</Button>
            </form>
          </div>

          {/* Auto-refresh notice */}
          <p className="text-xs text-muted-foreground">
            This page automatically refreshes every 5 minutes
          </p>
        </Card>
      </div>
    </div>
  );
}

export default Maintenance;
