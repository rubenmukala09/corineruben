import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { InitialLoader } from "./components/InitialLoader";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminRoute } from "./components/AdminRoute";
import { AIChat } from "./components/AIChat";
import { AIChatProvider } from "./contexts/AIChatContext";
import { CartProvider } from "./contexts/CartContext";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { RouteTracker } from "./components/RouteTracker";
import { DraggablePerformanceMonitor } from "./components/DraggablePerformanceMonitor";
import { useAnalyticsTracking } from "./hooks/useAnalyticsTracking";

import { PageTransition } from "./components/PageTransition";
import { Skeleton } from "@/components/ui/skeleton";
import { performanceMonitor } from "./utils/performanceMonitor";
import { EnhancedPageLoader } from "./components/EnhancedPageLoader";

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

const Services = lazy(() => {
  performanceMonitor.startTracking('Services');
  return import("./pages/Services").then(module => {
    performanceMonitor.endTracking('Services');
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

const StaffSignup = lazy(() => {
  performanceMonitor.startTracking('StaffSignup');
  return import("./pages/StaffSignup").then(module => {
    performanceMonitor.endTracking('StaffSignup');
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

const Pending = lazy(() => {
  performanceMonitor.startTracking('Pending');
  return import("./pages/admin/Pending").then(module => {
    performanceMonitor.endTracking('Pending');
    return module;
  });
});

const PagesManagement = lazy(() => {
  performanceMonitor.startTracking('PagesManagement');
  return import("./pages/admin/PagesManagement").then(module => {
    performanceMonitor.endTracking('PagesManagement');
    return module;
  });
});

const ClientMessages = lazy(() => {
  performanceMonitor.startTracking('ClientMessages');
  return import("./pages/admin/ClientMessages").then(module => {
    performanceMonitor.endTracking('ClientMessages');
    return module;
  });
});

const CommunicationsInbox = lazy(() => {
  performanceMonitor.startTracking('CommunicationsInbox');
  return import("./pages/admin/CommunicationsInbox").then(module => {
    performanceMonitor.endTracking('CommunicationsInbox');
    return module;
  });
});

const NewsletterManagement = lazy(() => {
  performanceMonitor.startTracking('NewsletterManagement');
  return import("./pages/admin/NewsletterManagement").then(module => {
    performanceMonitor.endTracking('NewsletterManagement');
    return module;
  });
});

const BillingSettings = lazy(() => {
  performanceMonitor.startTracking('BillingSettings');
  return import("./pages/admin/settings/BillingSettings").then(module => {
    performanceMonitor.endTracking('BillingSettings');
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

const EmailCampaigns = lazy(() => {
  performanceMonitor.startTracking('EmailCampaigns');
  return import("./pages/admin/EmailCampaigns").then(module => {
    performanceMonitor.endTracking('EmailCampaigns');
    return module;
  });
});

const Analytics = lazy(() => {
  performanceMonitor.startTracking('Analytics');
  return import("./pages/admin/Analytics").then(module => {
    performanceMonitor.endTracking('Analytics');
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

const NotFound = lazy(() => import("./pages/NotFound"));
const GetStarted = lazy(() => import("./pages/GetStarted"));
const Schedule = lazy(() => import("./pages/Schedule"));
const OnboardingQuestions = lazy(() => import("./pages/OnboardingQuestions"));
const BuyAIInsurance = lazy(() => import("./pages/BuyAIInsurance"));
const RefundsPolicy = lazy(() => import("./pages/RefundsPolicy"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));

const NotFoundLegacy = lazy(() => {
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

const PaymentSuccess = lazy(() => {
  performanceMonitor.startTracking('PaymentSuccess');
  return import("./pages/PaymentSuccess").then(module => {
    performanceMonitor.endTracking('PaymentSuccess');
    return module;
  });
});

const PaymentCanceled = lazy(() => {
  performanceMonitor.startTracking('PaymentCanceled');
  return import("./pages/PaymentCanceled").then(module => {
    performanceMonitor.endTracking('PaymentCanceled');
    return module;
  });
});

// Premium loading fallback with beautiful bubble animation
const PageLoader = () => <EnhancedPageLoader message="Loading..." />;
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
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/resources" element={<PageTransition><Resources /></PageTransition>} />
        <Route path="/payment-success" element={<PageTransition><PaymentSuccess /></PageTransition>} />
        <Route path="/payment-canceled" element={<PageTransition><PaymentCanceled /></PageTransition>} />
        <Route path="/safety-vault" element={<PageTransition><SafetyVault /></PageTransition>} />
        <Route path="/articles" element={<PageTransition><Articles /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
        <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
        <Route path="/staff-signup" element={<PageTransition><StaffSignup /></PageTransition>} />
        <Route path="/setup" element={<PageTransition><Setup /></PageTransition>} />
        <Route path="/application-pending" element={<PageTransition><ApplicationPending /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><AdminRoute><Admin /></AdminRoute></PageTransition>} />
        <Route path="/admin/content/testimonials" element={<PageTransition><AdminRoute><TestimonialsAdmin /></AdminRoute></PageTransition>} />
        <Route path="/admin/content/articles" element={<PageTransition><AdminRoute><ArticlesAdmin /></AdminRoute></PageTransition>} />
        <Route path="/admin/content/articles/new" element={<PageTransition><AdminRoute><ArticleEditor /></AdminRoute></PageTransition>} />
        <Route path="/admin/content/articles/:id" element={<PageTransition><AdminRoute><ArticleEditor /></AdminRoute></PageTransition>} />
        <Route path="/admin/articles/preview" element={<PageTransition><AdminRoute><ArticlePreview /></AdminRoute></PageTransition>} />
        <Route path="/admin/content/team" element={<PageTransition><AdminRoute><TeamAdmin /></AdminRoute></PageTransition>} />
        <Route path="/admin/pending" element={<PageTransition><AdminRoute><Pending /></AdminRoute></PageTransition>} />
        <Route path="/admin/content/pages" element={<PageTransition><AdminRoute><PagesManagement /></AdminRoute></PageTransition>} />
        <Route path="/admin/clients/messages" element={<PageTransition><AdminRoute><ClientMessages /></AdminRoute></PageTransition>} />
        <Route path="/admin/communications/inbox" element={<PageTransition><AdminRoute><CommunicationsInbox /></AdminRoute></PageTransition>} />
        <Route path="/admin/communications/newsletter" element={<PageTransition><AdminRoute><NewsletterManagement /></AdminRoute></PageTransition>} />
        <Route path="/admin/settings/billing" element={<PageTransition><AdminRoute><BillingSettings /></AdminRoute></PageTransition>} />
        <Route path="/admin/email-campaigns" element={<PageTransition><AdminRoute><EmailCampaigns /></AdminRoute></PageTransition>} />
        <Route path="/admin/analytics" element={<PageTransition><AdminRoute><Analytics /></AdminRoute></PageTransition>} />
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
        <Route path="/refunds" element={<PageTransition><RefundsPolicy /></PageTransition>} />
        <Route path="/disclaimer" element={<PageTransition><Disclaimer /></PageTransition>} />
        <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
        <Route path="/get-started/:serviceType" element={<PageTransition><GetStarted /></PageTransition>} />
        <Route path="/schedule" element={<PageTransition><Schedule /></PageTransition>} />
        <Route path="/onboarding/questions" element={<PageTransition><OnboardingQuestions /></PageTransition>} />
        <Route path="/buy/ai-insurance" element={<PageTransition><BuyAIInsurance /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Add smooth scroll behavior for anchor links
  useSmoothAnchorScroll();
  
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <>
      {/* Initial website loading effect */}
      <InitialLoader onComplete={() => setIsLoading(false)} minDuration={1800} />
      
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
                
                <RouteTracker />
                <AnalyticsTracker />
                <ErrorBoundary>
                  <Suspense fallback={<PageLoader />}>
                    <AnimatedRoutes />
                  </Suspense>
                </ErrorBoundary>
                <AIChat />
                <CookieConsent />
                <DraggablePerformanceMonitor />
              </BrowserRouter>
            </AIChatProvider>
          </CartProvider>
        </SubscriptionProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
