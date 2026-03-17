import { forwardRef } from "react";
import { useAnalyticsTracking } from "@/hooks/useAnalyticsTracking";

export const AnalyticsTracker = forwardRef<HTMLDivElement>((_props, _ref) => {
  useAnalyticsTracking();
  return null;
});

AnalyticsTracker.displayName = "AnalyticsTracker";
