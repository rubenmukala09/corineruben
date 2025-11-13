import React, { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  providerName: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Lightweight health check for third-party providers.
 * Catches render crashes and warns in dev mode.
 */
export class ProviderHealthCheck extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (import.meta.env.DEV) {
      console.warn(
        `[ProviderHealthCheck] Provider "${this.props.providerName}" caused a render crash:`,
        error,
        errorInfo
      );
    }
  }

  render() {
    if (this.state.hasError) {
      if (import.meta.env.DEV) {
        return (
          <div className="p-4 bg-destructive/10 border border-destructive rounded-md">
            <h3 className="text-destructive font-semibold mb-2">
              Provider Error: {this.props.providerName}
            </h3>
            <p className="text-sm text-muted-foreground">
              {this.state.error?.message || "Unknown error"}
            </p>
          </div>
        );
      }
      // In production, render children anyway (failsafe)
      return this.props.children;
    }

    return this.props.children;
  }
}
