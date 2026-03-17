import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { usePrefetchRoute } from "@/hooks/usePrefetchRoute";

interface PrefetchLinkProps extends LinkProps {
  to: string;
}

export const PrefetchLink = React.forwardRef<HTMLAnchorElement, PrefetchLinkProps>(
  ({ to, children, ...props }, ref) => {
    const { prefetch, cancelPrefetch } = usePrefetchRoute(to);

    return (
      <Link
        ref={ref}
        to={to}
        onMouseEnter={prefetch}
        onMouseLeave={cancelPrefetch}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

PrefetchLink.displayName = "PrefetchLink";
