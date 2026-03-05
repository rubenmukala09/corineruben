import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Home, ShieldAlert } from "lucide-react";
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
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
          {/* Ambient glows */}
          <div className="absolute top-[15%] right-[20%] w-80 h-80 rounded-full bg-primary/[0.04] blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[20%] left-[15%] w-64 h-64 rounded-full bg-accent/[0.04] blur-[100px] pointer-events-none" />

          <div className="relative max-w-lg w-full text-center animate-fade-in">
            {/* Icon badge */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/8 border border-primary/15 mb-8 shadow-[0_8px_32px_-8px_hsl(var(--primary)/0.12)]">
              <ShieldAlert className="w-10 h-10 text-primary" />
            </div>

            {/* Badge pill */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] mb-4 border border-destructive/20 bg-destructive/5 text-destructive">
              Something went wrong
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
              We Hit a Snag
            </h1>
            <p className="text-muted-foreground text-base max-w-sm mx-auto leading-relaxed mb-8">
              An unexpected error occurred. Don't worry — your data is safe. Try reloading or head back home.
            </p>

            {this.state.error && (
              <div className="mb-8 p-4 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 text-left shadow-sm">
                <p className="text-[11px] font-mono text-muted-foreground break-all leading-relaxed">
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
            </div>

            <p className="text-sm text-muted-foreground mt-8">
              If this keeps happening, please{" "}
              <Link to="/contact" className="text-primary font-medium hover:underline">
                contact our support team
              </Link>
              .
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
