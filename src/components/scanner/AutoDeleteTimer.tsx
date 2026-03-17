import { useEffect, useMemo, useState } from "react";
import { Clock } from "lucide-react";

interface AutoDeleteTimerProps {
  expiresAt: Date | string;
  onExpire?: () => void;
}

const formatRemaining = (seconds: number) => {
  const mins = Math.max(0, Math.floor(seconds / 60));
  const secs = Math.max(0, seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const AutoDeleteTimer = ({
  expiresAt,
  onExpire,
}: AutoDeleteTimerProps) => {
  const targetTime = useMemo(() => new Date(expiresAt).getTime(), [expiresAt]);
  const [remaining, setRemaining] = useState(() =>
    Math.max(0, Math.floor((targetTime - Date.now()) / 1000)),
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      const next = Math.max(0, Math.floor((targetTime - Date.now()) / 1000));
      setRemaining(next);
      if (next <= 0) {
        window.clearInterval(interval);
        onExpire?.();
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, [onExpire, targetTime]);

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Clock className="w-4 h-4 text-primary" />
      Results delete in {formatRemaining(remaining)}
    </div>
  );
};

export default AutoDeleteTimer;
