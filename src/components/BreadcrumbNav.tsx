import { useLocation, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

const routeNameMap: Record<string, string> = {
  "/": "Home",
  "/business": "AI & Business",
  "/training": "Learn & Train",
  "/resources": "Resources",
  "/about": "About",
  "/careers": "Careers",
  "/contact": "Contact",
  
  "/articles": "Articles",
  "/portal": "Portal",
  "/portal/admin": "Admin Dashboard",
  "/portal/analyst": "Analyst Dashboard",
  "/portal/trainer": "Trainer Dashboard",
  "/portal/developer": "Developer Dashboard",
  "/portal/staff": "Staff Dashboard",
  "/portal/senior": "Senior Dashboard",
  "/portal/caregiver": "Caregiver Dashboard",
  "/portal/healthcare": "Healthcare Dashboard",
  "/admin": "Dashboard",
  "/admin/content": "Content",
  "/admin/content/testimonials": "Testimonials",
  "/admin/content/articles": "Articles",
  "/admin/content/articles/new": "New Article",
  "/admin/content/team": "Team",
};

export const BreadcrumbNav = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Hide breadcrumbs on auth pages and public routes
  const hiddenRoutes = ["/auth", "/login", "/signup", "/reset-password", "/setup"];
  const isHiddenRoute = hiddenRoutes.some(route => location.pathname === route);
  const isPublicRoute = !location.pathname.startsWith("/admin") && 
                        !location.pathname.startsWith("/portal");
  
  if (isHiddenRoute || isPublicRoute) {
    return null;
  }

  // Build the breadcrumb path
  const breadcrumbPaths = pathnames.map((_, index) => {
    const path = `/${pathnames.slice(0, index + 1).join("/")}`;
    return {
      path,
      name: routeNameMap[path] || pathnames[index].charAt(0).toUpperCase() + pathnames[index].slice(1),
    };
  });

  return (
    <div className="container mx-auto px-4 py-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="flex items-center gap-1.5">
                <Home className="h-3.5 w-3.5" />
                <span>Home</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          
          {breadcrumbPaths.map((item, index) => (
            <div key={item.path} className="flex items-center gap-1.5">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {index === breadcrumbPaths.length - 1 ? (
                  <BreadcrumbPage>{item.name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={item.path}>{item.name}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
