import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Home, ShieldAlert, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

const MotionDiv = motion.div;

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4">
          {/* Subtle ambient shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[10%] right-[15%] w-72 h-72 rounded-full bg-primary/5 blur-[100px]" />
            <div className="absolute bottom-[15%] left-[10%] w-60 h-60 rounded-full bg-accent/5 blur-[80px]" />
          </div>

          <div className="relative max-w-lg w-full text-center">
            {/* Icon */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/8 border border-primary/15 mb-8 shadow-[0_8px_32px_-8px_hsl(var(--primary)/0.15)]"
            >
              <ShieldAlert className="w-10 h-10 text-primary" />
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
                Something went wrong
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
                We Hit a Snag
              </h1>
              <p className="text-muted-foreground text-base max-w-sm mx-auto leading-relaxed mb-8">
                An unexpected error occurred. Don't worry — your data is safe. Try reloading or head back home.
              </p>
            </MotionDiv>

            {this.state.error && (
              <MotionDiv
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="mb-8 p-4 rounded-2xl bg-card border border-border text-left shadow-sm"
              >
                <p className="text-[11px] font-mono text-muted-foreground break-all leading-relaxed">
                  {this.state.error.toString()}
                </p>
              </MotionDiv>
            )}

            <MotionDiv
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Button onClick={this.handleReset} size="lg">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reload Page
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Link>
              </Button>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="mt-8"
            >
              <p className="text-sm text-muted-foreground">
                If this keeps happening, please{" "}
                <Link to="/contact" className="text-primary font-medium hover:underline">
                  contact our support team
                </Link>
                .
              </p>
            </MotionDiv>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
