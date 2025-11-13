import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AIChat } from "./components/AIChat";
import { AIChatProvider } from "./contexts/AIChatContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load all pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const Training = lazy(() => import("./pages/Training"));
const Business = lazy(() => import("./pages/Business"));
const About = lazy(() => import("./pages/About"));
const Resources = lazy(() => import("./pages/Resources"));
const SafetyVault = lazy(() => import("./pages/SafetyVault"));
const Articles = lazy(() => import("./pages/Articles"));
const Contact = lazy(() => import("./pages/Contact"));
const Careers = lazy(() => import("./pages/Careers"));
const Auth = lazy(() => import("./pages/Auth"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ApplicationPending = lazy(() => import("./pages/ApplicationPending"));
const Portal = lazy(() => import("./pages/Portal"));
const AdminDashboard = lazy(() => import("./pages/portal/AdminDashboard"));
const AnalystDashboard = lazy(() => import("./pages/portal/AnalystDashboard"));
const TrainerDashboard = lazy(() => import("./pages/portal/TrainerDashboard"));
const DeveloperDashboard = lazy(() => import("./pages/portal/DeveloperDashboard"));
const StaffDashboard = lazy(() => import("./pages/portal/StaffDashboard"));
const SeniorDashboard = lazy(() => import("./pages/portal/SeniorDashboard"));
const CaregiverDashboard = lazy(() => import("./pages/portal/CaregiverDashboard"));
const HealthcareDashboard = lazy(() => import("./pages/portal/HealthcareDashboard"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AIChatProvider>
          <BrowserRouter>
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
          </BrowserRouter>
        </AIChatProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
