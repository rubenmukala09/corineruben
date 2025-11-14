import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't show breadcrumbs on homepage or admin routes
  if (pathnames.length === 0 || pathnames[0] === "admin" || pathnames[0] === "portal") {
    return null;
  }

  // Convert path segment to readable name
  const formatName = (segment: string) => {
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://invisionnetwork.com",
      },
      ...pathnames.map((segment, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: formatName(segment),
        item: `https://invisionnetwork.com/${pathnames.slice(0, index + 1).join("/")}`,
      })),
    ],
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbStructuredData)}
      </script>
      <nav
        aria-label="Breadcrumb"
        className="container mx-auto px-4 py-4 text-sm"
      >
        <ol className="flex items-center space-x-2 text-muted-foreground">
          <li>
            <Link
              to="/"
              className="hover:text-foreground transition-colors flex items-center gap-1"
              aria-label="Home"
            >
              <Home className="w-4 h-4" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
          {pathnames.map((segment, index) => {
            const path = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;

            return (
              <li key={path} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
                {isLast ? (
                  <span className="text-foreground font-medium" aria-current="page">
                    {formatName(segment)}
                  </span>
                ) : (
                  <Link
                    to={path}
                    className="hover:text-foreground transition-colors"
                  >
                    {formatName(segment)}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
