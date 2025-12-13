import { useState } from "react";
import { Upload, Send, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScamShieldSubmission } from "@/components/ScamShieldSubmission";

export const ScamCheckCard = () => {
  const [text, setText] = useState("");
  const [scamShieldOpen, setScamShieldOpen] = useState(false);

  const handleAnalyze = () => {
    setScamShieldOpen(true);
  };

  return (
    <>
      <Card className="relative overflow-hidden border-0 bg-card/95 backdrop-blur-xl shadow-strong rounded-2xl p-6 md:p-8">
        {/* Decorative gradient border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 -z-10" />
        <div className="absolute inset-[1px] rounded-2xl bg-card -z-10" />

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">ScamCheck™</h3>
            <p className="text-sm text-muted-foreground">AI-Powered Analysis</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            Live
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="scam-text" className="sr-only">
              Paste suspicious message
            </label>
            <textarea
              id="scam-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste a suspicious email, text, or message here..."
              className="w-full h-32 px-4 py-3 rounded-xl border border-border bg-muted/30 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleAnalyze}
              className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground rounded-xl h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <Send className="w-5 h-5 mr-2" />
              Analyze Now
            </Button>
            <Button
              variant="outline"
              onClick={handleAnalyze}
              className="flex-1 rounded-xl h-12 text-base font-medium border-2 hover:bg-muted/50"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Screenshot
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 pt-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Free analysis • Results in seconds</span>
          </div>
        </div>
      </Card>

      <ScamShieldSubmission
        open={scamShieldOpen}
        onOpenChange={setScamShieldOpen}
      />
    </>
  );
};
