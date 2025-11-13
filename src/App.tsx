import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AIChat } from "./components/AIChat";
import { AIChatProvider } from "./contexts/AIChatContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { PerformanceDashboard } from "./components/PerformanceDashboard";
import { RouteTracker } from "./components/RouteTracker";
import { Skeleton } from "@/components/ui/skeleton";
import { performanceMonitor } from "./utils/performanceMonitor";

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

const Signup = lazy(() => {
  performanceMonitor.startTracking('Signup');
  return import("./pages/Signup").then(module => {
    performanceMonitor.endTracking('Signup');
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

const NotFound = lazy(() => {
  performanceMonitor.startTracking('NotFound');
  return import("./pages/NotFound").then(module => {
    performanceMonitor.endTracking('NotFound');
    return module;
  });
});

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-background">
    <Skeleton className="h-20 w-full" />
    <div className="container mx-auto px-4 py-8 space-y-4">
      <Skeleton className="h-96 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  </div>
);

const queryClient = new QueryClient();

function App() {
  // Add smooth scroll behavior for anchor links
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
      <AIChatProvider>
        <BrowserRouter>
          <RouteTracker />
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
                  <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/training" element={<Training />} />
                <Route path="/business" element={<Business />} />
                <Route path="/about" element={<About />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/safety-vault" element={<SafetyVault />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/application-pending" element={<ApplicationPending />} />
                <Route path="/portal" element={<ProtectedRoute><Portal /></ProtectedRoute>} />
                <Route path="/portal/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/portal/analyst" element={<ProtectedRoute><AnalystDashboard /></ProtectedRoute>} />
                <Route path="/portal/trainer" element={<ProtectedRoute><TrainerDashboard /></ProtectedRoute>} />
                <Route path="/portal/developer" element={<ProtectedRoute><DeveloperDashboard /></ProtectedRoute>} />
                <Route path="/portal/staff" element={<ProtectedRoute><StaffDashboard /></ProtectedRoute>} />
                <Route path="/portal/senior" element={<ProtectedRoute><SeniorDashboard /></ProtectedRoute>} />
                <Route path="/portal/caregiver" element={<ProtectedRoute><CaregiverDashboard /></ProtectedRoute>} />
                <Route path="/portal/healthcare" element={<ProtectedRoute><HealthcareDashboard /></ProtectedRoute>} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            </ErrorBoundary>
            <AIChat />
            <PerformanceDashboard />
          </BrowserRouter>
        </AIChatProvider>
    </QueryClientProvider>
  );
}

export default App;
