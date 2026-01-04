import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

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
    this.setState({
      error,
      errorInfo,
    });
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
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background flex items-center justify-center p-4 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-destructive/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          </div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground) / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />

          <div className="max-w-4xl w-full relative z-10">
            <Card className="p-10 md:p-16 shadow-2xl border-destructive/10">
              <div className="flex flex-col items-center text-center space-y-8">
                {/* Large icon with glow */}
                <div className="relative">
                  <div className="absolute inset-0 bg-destructive/20 rounded-full blur-2xl scale-150" />
                  <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-destructive/20 to-destructive/10 flex items-center justify-center border border-destructive/20">
                    <AlertTriangle className="w-14 h-14 md:w-18 md:h-18 text-destructive" />
                  </div>
                </div>

                <div className="space-y-4 max-w-2xl">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                    Oops! Something went wrong
                  </h1>
                  <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                    We encountered an unexpected error while loading this page. Our team has been notified.
                  </p>
                </div>

                {this.state.error && (
                  <div className="w-full max-w-2xl bg-muted/50 rounded-xl p-6 text-left border border-border">
                    <p className="text-sm font-mono text-destructive break-all">
                      {this.state.error.toString()}
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    onClick={this.handleReset}
                    size="lg"
                    className="h-14 px-8 text-base font-semibold"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Reload Page
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-14 px-8 text-base font-semibold"
                  >
                    <Link to="/">
                      <Home className="w-5 h-5 mr-2" />
                      Go Home
                    </Link>
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground pt-4">
                  If this problem persists, please <a href="mailto:support@invisionnetwork.org" className="text-primary hover:underline">contact support</a>.
                </p>
              </div>
            </Card>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
