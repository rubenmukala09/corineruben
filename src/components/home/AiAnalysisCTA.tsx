import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  ArrowRight,
  Shield,
  Clock,
  Zap,
  FileCheck,
  CreditCard,
  CheckCircle2,
} from "lucide-react";

interface AiAnalysisCTAProps {
  compact?: boolean;
}

export const AiAnalysisCTA = ({ compact = false }: AiAnalysisCTAProps) => {
  const steps = [
    {
      icon: FileCheck,
      title: "1. Upload & Analyze",
      desc: "Drop any file, image, or message — AI scans it instantly",
    },
    {
      icon: Clock,
      title: "2. Usage Counter Starts",
      desc: "Your session is tracked in real-time as you use the tool",
    },
    {
      icon: CreditCard,
      title: "3. Pay After Use",
      desc: "Accept terms for auto-charge or pay when you're done",
    },
  ];

  return (
    <section className={compact ? "py-8" : "py-14"}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="relative rounded-3xl overflow-hidden border border-border/40 bg-gradient-to-br from-card via-card/95 to-primary/5 shadow-xl">
          <div className="relative p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Left: Text & CTA */}
              <div className="space-y-5">
                <Badge className="gap-1.5 bg-primary/10 text-primary border-primary/20 text-xs font-bold uppercase tracking-widest">
                  <Brain className="w-3.5 h-3.5" />
                  Try Before You Pay
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-black text-foreground leading-[1.1]">
                  AI Analysis{" "}
                  <span className="bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
                    Scanner
                  </span>
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
                  Scan suspicious files, emails, QR codes, images, and documents
                  with our AI-powered analysis tool. <strong>No card required upfront</strong> — 
                  use it first, then pay only for what you use.
                </p>

                <div className="flex items-center gap-4 flex-wrap text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Shield className="w-4 h-4 text-primary" />
                    Auto-deleted in 10 min
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Zap className="w-4 h-4 text-primary" />
                    From $0.50/scan
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 px-8 rounded-full font-bold bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 shadow-lg"
                  >
                    <Link to="/training/ai-analysis">
                      <Brain className="w-5 h-5 mr-2" />
                      Try AI Analysis Free
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right: How it works steps */}
              <div className="space-y-4">
                {steps.map((step) => (
                  <div
                    key={step.title}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-background/60 border border-border/30"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        {step.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="flex items-center gap-2 pl-4 pt-1">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">
                    No signup required • Anonymous • Privacy-first
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
