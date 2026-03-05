import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RefreshCw, Phone } from "lucide-react";
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
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-lg w-full text-center">
            {/* Icon */}
            <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-destructive/10 border border-destructive/20 mb-8">
              <AlertTriangle className="w-12 h-12 text-destructive" />
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-3">
              Something Went Wrong
            </h1>
            <p className="text-muted-foreground text-base mb-8 max-w-sm mx-auto leading-relaxed">
              We encountered an unexpected error. Please try reloading the page or return to the homepage.
            </p>

            {this.state.error && (
              <div className="mb-8 p-4 rounded-2xl bg-muted/50 border border-border text-left">
                <p className="text-xs font-mono text-destructive break-all leading-relaxed">
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              If this problem persists, please contact our support team.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
