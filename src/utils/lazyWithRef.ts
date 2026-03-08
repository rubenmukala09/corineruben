import { lazy, forwardRef, ComponentType } from "react";

/**
 * Wrapper around React.lazy that auto-wraps the resolved component
 * with forwardRef to prevent "Function components cannot be given refs" warnings.
 */
export function lazyWithRef<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  const LazyComponent = lazy(factory);
  const Wrapped = forwardRef<any, any>((props, ref) => (
    <LazyComponent {...props} ref={ref} />
  ));
  Wrapped.displayName = "LazyWithRef";
  return Wrapped;
}
