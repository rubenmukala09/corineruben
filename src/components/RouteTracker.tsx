import { forwardRef } from "react";
import { useRouteChangeTracker } from "@/hooks/useRouteChangeTracker";

export const RouteTracker = forwardRef<HTMLDivElement>((_props, _ref) => {
  useRouteChangeTracker();
  return null;
});

RouteTracker.displayName = "RouteTracker";
