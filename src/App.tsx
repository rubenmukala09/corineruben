import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminRoute } from "./components/AdminRoute";
import { AIChat } from "./components/AIChat";
import { AIChatProvider } from "./contexts/AIChatContext";
import { CartProvider } from "./contexts/CartContext";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { PerformanceDashboard } from "./components/PerformanceDashboard";
import { RouteTracker } from "./components/RouteTracker";
import { DraggablePerformanceMonitor } from "./components/DraggablePerformanceMonitor";

import { PageTransition } from "./components/PageTransition";
import { Skeleton } from "@/components/ui/skeleton";
import { performanceMonitor } from "./utils/performanceMonitor";
import ScrollProgressBar from "./components/ScrollProgressBar";
import { NavigationProgress } from "./components/NavigationProgress";
import { ScrollToTop } from "./components/ScrollToTop";
import { useSmoothAnchorScroll } from "./hooks/useSmoothAnchorScroll";
import { CookieConsent } from "./components/CookieConsent";
import { SkipToContent } from "./components/SkipToContent";

import { AnalyticsTracker } from "./components/AnalyticsTracker";

// Lazy load all pages for code splitting
const Index = lazy(() => {
  performanceMonitor.startTracking('Index');
  return import("./pages/Index").then(module => {
    performanceMonitor.endTracking('Index');
    return module;
  });
});

const Training = lazy(() => {
  performanceMonitor.startTracking('Training');
  return import("./pages/Training").then(module => {
    performanceMonitor.endTracking('Training');
    return module;
  });
});

const Business = lazy(() => {
  performanceMonitor.startTracking('Business');
  return import("./pages/Business").then(module => {
    performanceMonitor.endTracking('Business');
    return module;
  });
});

const About = lazy(() => {
  performanceMonitor.startTracking('About');
  return import("./pages/About").then(module => {
    performanceMonitor.endTracking('About');
    return module;
  });
});

const Resources = lazy(() => {
  performanceMonitor.startTracking('Resources');
  return import("./pages/Resources").then(module => {
    performanceMonitor.endTracking('Resources');
    return module;
  });
});

const SafetyVault = lazy(() => {
  performanceMonitor.startTracking('SafetyVault');
  return import("./pages/SafetyVault").then(module => {
    performanceMonitor.endTracking('SafetyVault');
    return module;
  });
});

const Articles = lazy(() => {
  performanceMonitor.startTracking('Articles');
  return import("./pages/Articles").then(module => {
    performanceMonitor.endTracking('Articles');
    return module;
  });
});

const Contact = lazy(() => {
  performanceMonitor.startTracking('Contact');
  return import("./pages/Contact").then(module => {
    performanceMonitor.endTracking('Contact');
    return module;
  });
});

const Careers = lazy(() => {
  performanceMonitor.startTracking('Careers');
  return import("./pages/Careers").then(module => {
    performanceMonitor.endTracking('Careers');
    return module;
  });
});

const Auth = lazy(() => {
  performanceMonitor.startTracking('Auth');
  return import("./pages/Auth").then(module => {
    performanceMonitor.endTracking('Auth');
    return module;
  });
});

const Login = lazy(() => {
  performanceMonitor.startTracking('Login');
  return import("./pages/Login").then(module => {
    performanceMonitor.endTracking('Login');
    return module;
  });
});

const ResetPassword = lazy(() => {
  performanceMonitor.startTracking('ResetPassword');
  return import("./pages/ResetPassword").then(module => {
    performanceMonitor.endTracking('ResetPassword');
    return module;
  });
});

const Signup = lazy(() => {
  performanceMonitor.startTracking('Signup');
  return import("./pages/Signup").then(module => {
    performanceMonitor.endTracking('Signup');
    return module;
  });
});

const Setup = lazy(() => {
  performanceMonitor.startTracking('Setup');
  return import("./pages/Setup").then(module => {
    performanceMonitor.endTracking('Setup');
    return module;
  });
});

const ApplicationPending = lazy(() => {
  performanceMonitor.startTracking('ApplicationPending');
  return import("./pages/ApplicationPending").then(module => {
    performanceMonitor.endTracking('ApplicationPending');
    return module;
  });
});

const Admin = lazy(() => {
  performanceMonitor.startTracking('Admin');
  return import("./pages/Admin").then(module => {
    performanceMonitor.endTracking('Admin');
    return module;
  });
});

const TestimonialsAdmin = lazy(() => {
  performanceMonitor.startTracking('TestimonialsAdmin');
  return import("./pages/admin/TestimonialsAdmin").then(module => {
    performanceMonitor.endTracking('TestimonialsAdmin');
    return module;
  });
});

const ArticlesAdmin = lazy(() => {
  performanceMonitor.startTracking('ArticlesAdmin');
  return import("./pages/admin/ArticlesAdmin").then(module => {
    performanceMonitor.endTracking('ArticlesAdmin');
    return module;
  });
});

const ArticleEditor = lazy(() => {
  performanceMonitor.startTracking('ArticleEditor');
  return import("./pages/admin/ArticleEditor").then(module => {
    performanceMonitor.endTracking('ArticleEditor');
    return module;
  });
});

const ArticlePreview = lazy(() => {
  performanceMonitor.startTracking('ArticlePreview');
  return import("./pages/admin/ArticlePreview").then(module => {
    performanceMonitor.endTracking('ArticlePreview');
    return module;
  });
});

const TeamAdmin = lazy(() => {
  performanceMonitor.startTracking('TeamAdmin');
  return import("./pages/admin/TeamAdmin").then(module => {
    performanceMonitor.endTracking('TeamAdmin');
    return module;
  });
});

const BusinessClients = lazy(() => {
  performanceMonitor.startTracking('BusinessClients');
  return import("./pages/admin/BusinessClients").then(module => {
    performanceMonitor.endTracking('BusinessClients');
    return module;
  });
});

const BusinessClientDetail = lazy(() => {
  performanceMonitor.startTracking('BusinessClientDetail');
  return import("./pages/admin/BusinessClientDetail").then(module => {
    performanceMonitor.endTracking('BusinessClientDetail');
    return module;
  });
});

const IndividualClients = lazy(() => {
  performanceMonitor.startTracking('IndividualClients');
  return import("./pages/admin/IndividualClients").then(module => {
    performanceMonitor.endTracking('IndividualClients');
    return module;
  });
});

const ProductsList = lazy(() => {
  performanceMonitor.startTracking('ProductsList');
  return import("./pages/admin/ProductsList").then(module => {
    performanceMonitor.endTracking('ProductsList');
    return module;
  });
});

const ProductEditor = lazy(() => {
  performanceMonitor.startTracking('ProductEditor');
  return import("./pages/admin/ProductEditor").then(module => {
    performanceMonitor.endTracking('ProductEditor');
    return module;
  });
});

const OrdersList = lazy(() => {
  performanceMonitor.startTracking('OrdersList');
  return import("./pages/admin/OrdersList").then(module => {
    performanceMonitor.endTracking('OrdersList');
    return module;
  });
});

const OrderDetail = lazy(() => {
  performanceMonitor.startTracking('OrderDetail');
  return import("./pages/admin/OrderDetail").then(module => {
    performanceMonitor.endTracking('OrderDetail');
    return module;
  });
});

const InventoryManagement = lazy(() => {
  performanceMonitor.startTracking('InventoryManagement');
  return import("./pages/admin/InventoryManagement").then(module => {
    performanceMonitor.endTracking('InventoryManagement');
    return module;
  });
});

const Settings = lazy(() => {
  performanceMonitor.startTracking('Settings');
  return import("./pages/admin/Settings").then(module => {
    performanceMonitor.endTracking('Settings');
    return module;
  });
});

const Portal = lazy(() => {
  performanceMonitor.startTracking('Portal');
  return import("./pages/Portal").then(module => {
    performanceMonitor.endTracking('Portal');
    return module;
  });
});

const AdminDashboard = lazy(() => {
  performanceMonitor.startTracking('AdminDashboard');
  return import("./pages/portal/AdminDashboard").then(module => {
    performanceMonitor.endTracking('AdminDashboard');
    return module;
  });
});

const AnalystDashboard = lazy(() => {
  performanceMonitor.startTracking('AnalystDashboard');
  return import("./pages/portal/AnalystDashboard").then(module => {
    performanceMonitor.endTracking('AnalystDashboard');
    return module;
  });
});

const TrainerDashboard = lazy(() => {
  performanceMonitor.startTracking('TrainerDashboard');
  return import("./pages/portal/TrainerDashboard").then(module => {
    performanceMonitor.endTracking('TrainerDashboard');
    return module;
  });
});

const DeveloperDashboard = lazy(() => {
  performanceMonitor.startTracking('DeveloperDashboard');
  return import("./pages/portal/DeveloperDashboard").then(module => {
    performanceMonitor.endTracking('DeveloperDashboard');
    return module;
  });
});

const StaffDashboard = lazy(() => {
  performanceMonitor.startTracking('StaffDashboard');
  return import("./pages/portal/StaffDashboard").then(module => {
    performanceMonitor.endTracking('StaffDashboard');
    return module;
  });
});

const SeniorDashboard = lazy(() => {
  performanceMonitor.startTracking('SeniorDashboard');
  return import("./pages/portal/SeniorDashboard").then(module => {
    performanceMonitor.endTracking('SeniorDashboard');
    return module;
  });
});

const CaregiverDashboard = lazy(() => {
  performanceMonitor.startTracking('CaregiverDashboard');
  return import("./pages/portal/CaregiverDashboard").then(module => {
    performanceMonitor.endTracking('CaregiverDashboard');
    return module;
  });
});

const HealthcareDashboard = lazy(() => {
  performanceMonitor.startTracking('HealthcareDashboard');
  return import("./pages/portal/HealthcareDashboard").then(module => {
    performanceMonitor.endTracking('HealthcareDashboard');
    return module;
  });
});

const PrivacyPolicy = lazy(() => {
  performanceMonitor.startTracking('PrivacyPolicy');
  return import("./pages/PrivacyPolicy").then(module => {
    performanceMonitor.endTracking('PrivacyPolicy');
    return module;
  });
});

const TermsOfService = lazy(() => {
  performanceMonitor.startTracking('TermsOfService');
  return import("./pages/TermsOfService").then(module => {
    performanceMonitor.endTracking('TermsOfService');
    return module;
  });
});

const FAQ = lazy(() => {
  performanceMonitor.startTracking('FAQ');
  return import("./pages/FAQ").then(module => {
    performanceMonitor.endTracking('FAQ');
    return module;
  });
});

const NotFound = lazy(() => {
  performanceMonitor.startTracking('NotFound');
  return import("./pages/NotFound").then(module => {
    performanceMonitor.endTracking('NotFound');
    return module;
  });
});

const Subscriptions = lazy(() => import("./pages/admin/SubscriptionsRoute"));

const SystemHealthDashboard = lazy(() => {
  performanceMonitor.startTracking('SystemHealthDashboard');
  return import("./pages/admin/SystemHealthDashboard").then(module => {
    performanceMonitor.endTracking('SystemHealthDashboard');
    return module;
  });
});

const TestingChecklist = lazy(() => {
  performanceMonitor.startTracking('TestingChecklist');
  return import("./pages/admin/TestingChecklist").then(module => {
    performanceMonitor.endTracking('TestingChecklist');
    return module;
  });
});

const Maintenance = lazy(() => {
  performanceMonitor.startTracking('Maintenance');
  return import("./pages/Maintenance").then(module => {
    performanceMonitor.endTracking('Maintenance');
    return module;
  });
});

// Loading fallback component with enhanced skeleton
const PageLoader = () => (
  <div className="min-h-screen bg-background">
    {/* Navigation skeleton */}
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Skeleton className="h-10 w-48" />
          <div className="hidden md:flex gap-6">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-16" />
          </div>
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
    
    {/* Hero section skeleton */}
    <div className="relative">
      <Skeleton className="h-[500px] w-full" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-4 px-4">
          <Skeleton className="h-12 w-96 mx-auto" />
          <Skeleton className="h-6 w-64 mx-auto" />
          <div className="flex gap-4 justify-center mt-8">
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-12 w-40" />
          </div>
        </div>
      </div>
    </div>
    
    {/* Content sections skeleton */}
    <div className="container mx-auto px-4 py-16 space-y-16">
      <div className="space-y-4">
        <Skeleton className="h-10 w-64 mx-auto" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full rounded-2xl" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
      </div>
      
      <div className="space-y-4">
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-32 w-full rounded-2xl" />
      </div>
    </div>
    
    {/* Footer skeleton */}
    <div className="bg-muted py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/training" element={<PageTransition><Training /></PageTransition>} />
        <Route path="/business" element={<PageTransition><Business /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/resources" element={<PageTransition><Resources /></PageTransition>} />
        <Route path="/safety-vault" element={<PageTransition><SafetyVault /></PageTransition>} />
        <Route path="/articles" element={<PageTransition><Articles /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
        <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
        <Route path="/setup" element={<PageTransition><Setup /></PageTransition>} />
        <Route path="/application-pending" element={<PageTransition><ApplicationPending /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><AdminRoute><Admin /></AdminRoute></PageTransition>} />
        <Route path="/admin/content/testimonials" element={<PageTransition><AdminRoute><TestimonialsAdmin /></AdminRoute></PageTransition>} />
        <Route path="/admin/content/articles" element={<PageTransition><AdminRoute><ArticlesAdmin /></AdminRoute></PageTransition>} />
        <Route path="/admin/content/articles/new" element={<PageTransition><AdminRoute><ArticleEditor /></AdminRoute></PageTransition>} />
        <Route path="/admin/content/articles/:id" element={<PageTransition><AdminRoute><ArticleEditor /></AdminRoute></PageTransition>} />
        <Route path="/admin/articles/preview" element={<PageTransition><AdminRoute><ArticlePreview /></AdminRoute></PageTransition>} />
        <Route path="/admin/content/team" element={<PageTransition><AdminRoute><TeamAdmin /></AdminRoute></PageTransition>} />
        <Route path="/admin/clients/businesses" element={<PageTransition><AdminRoute><BusinessClients /></AdminRoute></PageTransition>} />
        <Route path="/admin/clients/businesses/:id" element={<PageTransition><AdminRoute><BusinessClientDetail /></AdminRoute></PageTransition>} />
        <Route path="/admin/clients/individuals" element={<PageTransition><AdminRoute><IndividualClients /></AdminRoute></PageTransition>} />
        <Route path="/admin/clients/individuals/:id" element={<PageTransition><AdminRoute><BusinessClientDetail /></AdminRoute></PageTransition>} />
        <Route path="/admin/ecommerce/products" element={<PageTransition><AdminRoute><ProductsList /></AdminRoute></PageTransition>} />
        <Route path="/admin/ecommerce/products/new" element={<PageTransition><AdminRoute><ProductEditor /></AdminRoute></PageTransition>} />
        <Route path="/admin/ecommerce/products/:id" element={<PageTransition><AdminRoute><ProductEditor /></AdminRoute></PageTransition>} />
        <Route path="/admin/ecommerce/orders" element={<PageTransition><AdminRoute><OrdersList /></AdminRoute></PageTransition>} />
        <Route path="/admin/ecommerce/orders/:id" element={<PageTransition><AdminRoute><OrderDetail /></AdminRoute></PageTransition>} />
        <Route path="/admin/ecommerce/inventory" element={<PageTransition><AdminRoute><InventoryManagement /></AdminRoute></PageTransition>} />
        <Route path="/admin/testing" element={<PageTransition><AdminRoute><SystemHealthDashboard /></AdminRoute></PageTransition>} />
        <Route path="/admin/testing/checklist" element={<PageTransition><AdminRoute><TestingChecklist /></AdminRoute></PageTransition>} />
        <Route path="/admin/settings/*" element={<PageTransition><AdminRoute><Settings /></AdminRoute></PageTransition>} />
        <Route path="/admin/subscriptions" element={<PageTransition><AdminRoute><Subscriptions /></AdminRoute></PageTransition>} />
        <Route path="/maintenance" element={<PageTransition><Maintenance /></PageTransition>} />
        <Route path="/reset-password" element={<PageTransition><ResetPassword /></PageTransition>} />
        <Route path="/portal" element={<PageTransition><ProtectedRoute><Portal /></ProtectedRoute></PageTransition>} />
        <Route path="/portal/admin" element={<PageTransition><ProtectedRoute><AdminDashboard /></ProtectedRoute></PageTransition>} />
        <Route path="/portal/analyst" element={<PageTransition><ProtectedRoute><AnalystDashboard /></ProtectedRoute></PageTransition>} />
        <Route path="/portal/trainer" element={<PageTransition><ProtectedRoute><TrainerDashboard /></ProtectedRoute></PageTransition>} />
        <Route path="/portal/developer" element={<PageTransition><ProtectedRoute><DeveloperDashboard /></ProtectedRoute></PageTransition>} />
        <Route path="/portal/staff" element={<PageTransition><ProtectedRoute><StaffDashboard /></ProtectedRoute></PageTransition>} />
        <Route path="/portal/senior" element={<PageTransition><ProtectedRoute><SeniorDashboard /></ProtectedRoute></PageTransition>} />
        <Route path="/portal/caregiver" element={<PageTransition><ProtectedRoute><CaregiverDashboard /></ProtectedRoute></PageTransition>} />
        <Route path="/portal/healthcare" element={<PageTransition><ProtectedRoute><HealthcareDashboard /></ProtectedRoute></PageTransition>} />
        <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
        <Route path="/terms-of-service" element={<PageTransition><TermsOfService /></PageTransition>} />
        <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  // Add smooth scroll behavior for anchor links
  useSmoothAnchorScroll();
  
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Sonner />
      <SubscriptionProvider>
        <CartProvider>
          <AIChatProvider>
            <BrowserRouter>
              <SkipToContent />
              <NavigationProgress />
              <ScrollToTop />
              <ScrollProgressBar />
              <RouteTracker />
              <AnalyticsTracker />
              <ErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                  <AnimatedRoutes />
                </Suspense>
              </ErrorBoundary>
              <AIChat />
              <CookieConsent />
              <PerformanceDashboard />
              <DraggablePerformanceMonitor />
            </BrowserRouter>
          </AIChatProvider>
        </CartProvider>
      </SubscriptionProvider>
    </QueryClientProvider>
  );
}

export default App;
