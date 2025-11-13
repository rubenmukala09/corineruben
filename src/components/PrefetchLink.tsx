import { Link, LinkProps } from "react-router-dom";
import { usePrefetchRoute } from "@/hooks/usePrefetchRoute";

interface PrefetchLinkProps extends LinkProps {
  to: string;
}

export const PrefetchLink = ({ to, children, ...props }: PrefetchLinkProps) => {
  const { prefetch, cancelPrefetch } = usePrefetchRoute(to);

  return (
    <Link
      to={to}
      onMouseEnter={prefetch}
      onMouseLeave={cancelPrefetch}
      {...props}
    >
      {children}
    </Link>
  );
};
