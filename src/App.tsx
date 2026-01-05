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
import { CartFeedbackProvider, CartFeedbackNotifications } from "./components/CartFeedbackNotifications";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";
import { CheckoutProvider } from "./contexts/CheckoutContext";
import UnifiedCheckoutDialog from "./components/payment/UnifiedCheckoutDialog";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { RouteTracker } from "./components/RouteTracker";
import { DraggablePerformanceMonitor } from "./components/DraggablePerformanceMonitor";
import { useAnalyticsTracking } from "./hooks/useAnalyticsTracking";

import { PageTransition } from "./components/PageTransition";
import { EnhancedPageLoader } from "./components/EnhancedPageLoader";

import { NavigationProgress } from "./components/NavigationProgress";
import { ScrollToTop } from "./components/ScrollToTop";
import { useSmoothAnchorScroll } from "./hooks/useSmoothAnchorScroll";
import { CookieConsent } from "./components/CookieConsent";
import { SkipToContent } from "./components/SkipToContent";
import ScrollProgressBar from "./components/ScrollProgressBar";
import BackToTop from "./components/BackToTop";
import MobileCallButton from "./components/MobileCallButton";

import { AnalyticsTracker } from "./components/AnalyticsTracker";

// Lazy load all pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const Training = lazy(() => import("./pages/Training"));
const Business = lazy(() => import("./pages/Business"));

const AIReceptionist = lazy(() => import("./pages/business/AIReceptionist"));
const AIAutomation = lazy(() => import("./pages/business/AIAutomation"));
const WebsiteDesign = lazy(() => import("./pages/business/WebsiteDesign"));
const WebsiteInsurance = lazy(() => import("./pages/business/WebsiteInsurance"));

const About = lazy(() => import("./pages/About"));
const Resources = lazy(() => import("./pages/Resources"));
const SafetyVault = lazy(() => import("./pages/SafetyVault"));
const Articles = lazy(() => import("./pages/Articles"));
const Services = lazy(() => import("./pages/Services"));

const Contact = lazy(() => import("./pages/Contact"));
const Careers = lazy(() => import("./pages/Careers"));
const Auth = lazy(() => import("./pages/Auth"));
const Login = lazy(() => import("./pages/Login"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Signup = lazy(() => import("./pages/Signup"));
const StaffSignup = lazy(() => import("./pages/StaffSignup"));
const Setup = lazy(() => import("./pages/Setup"));
const ApplicationPending = lazy(() => import("./pages/ApplicationPending"));

const Pending = lazy(() => import("./pages/admin/Pending"));
const PagesManagement = lazy(() => import("./pages/admin/PagesManagement"));
const ClientMessages = lazy(() => import("./pages/admin/ClientMessages"));
const CommunicationsInbox = lazy(() => import("./pages/admin/CommunicationsInbox"));
const NewsletterManagement = lazy(() => import("./pages/admin/NewsletterManagement"));
const BillingSettings = lazy(() => import("./pages/admin/settings/BillingSettings"));
const Admin = lazy(() => import("./pages/Admin"));
const TestimonialsAdmin = lazy(() => import("./pages/admin/TestimonialsAdmin"));
const ArticlesAdmin = lazy(() => import("./pages/admin/ArticlesAdmin"));
const ArticleEditor = lazy(() => import("./pages/admin/ArticleEditor"));
const ArticlePreview = lazy(() => import("./pages/admin/ArticlePreview"));
const TeamAdmin = lazy(() => import("./pages/admin/TeamAdmin"));
const EmailCampaigns = lazy(() => import("./pages/admin/EmailCampaigns"));
const Analytics = lazy(() => import("./pages/admin/Analytics"));
const BusinessClients = lazy(() => import("./pages/admin/BusinessClients"));
const BusinessClientDetail = lazy(() => import("./pages/admin/BusinessClientDetail"));
const IndividualClients = lazy(() => import("./pages/admin/IndividualClients"));
const ProductsList = lazy(() => import("./pages/admin/ProductsList"));
const ProductEditor = lazy(() => import("./pages/admin/ProductEditor"));
const OrdersList = lazy(() => import("./pages/admin/OrdersList"));
const OrderDetail = lazy(() => import("./pages/admin/OrderDetail"));
const InventoryManagement = lazy(() => import("./pages/admin/InventoryManagement"));
const Settings = lazy(() => import("./pages/admin/Settings"));
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
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const AcceptableUse = lazy(() => import("./pages/AcceptableUse"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const FAQ = lazy(() => import("./pages/FAQ"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Subscriptions = lazy(() => import("./pages/admin/SubscriptionsRoute"));
const SystemHealthDashboard = lazy(() => import("./pages/admin/SystemHealthDashboard"));
const TestingChecklist = lazy(() => import("./pages/admin/TestingChecklist"));
const Maintenance = lazy(() => import("./pages/Maintenance"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PaymentCanceled = lazy(() => import("./pages/PaymentCanceled"));
const DonationsList = lazy(() => import("./pages/admin/DonationsList"));
const ServiceInquiriesList = lazy(() => import("./pages/admin/ServiceInquiriesList"));
const BookingsList = lazy(() => import("./pages/admin/BookingsList"));

// Premium loading fallback with beautiful bubble animation
const PageLoader = () => <EnhancedPageLoader message="Loading..." />;
const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition variant="luxury"><Index /></PageTransition>} />
        <Route path="/training" element={<PageTransition variant="luxury"><Training /></PageTransition>} />
        <Route path="/business" element={<PageTransition variant="luxury"><Business /></PageTransition>} />
        <Route path="/business/ai-receptionist" element={<PageTransition variant="luxury"><AIReceptionist /></PageTransition>} />
        <Route path="/business/ai-automation" element={<PageTransition variant="luxury"><AIAutomation /></PageTransition>} />
        <Route path="/business/website-design" element={<PageTransition variant="luxury"><WebsiteDesign /></PageTransition>} />
        <Route path="/business/website-insurance" element={<PageTransition variant="luxury"><WebsiteInsurance /></PageTransition>} />
        <Route path="/about" element={<PageTransition variant="luxury"><About /></PageTransition>} />
        <Route path="/services" element={<PageTransition variant="luxury"><Services /></PageTransition>} />
        <Route path="/resources" element={<PageTransition variant="luxury"><Resources /></PageTransition>} />
        <Route path="/payment-success" element={<PageTransition variant="fade"><PaymentSuccess /></PageTransition>} />
        <Route path="/payment-canceled" element={<PageTransition variant="fade"><PaymentCanceled /></PageTransition>} />
        <Route path="/safety-vault" element={<PageTransition variant="luxury"><SafetyVault /></PageTransition>} />
        <Route path="/articles" element={<PageTransition variant="luxury"><Articles /></PageTransition>} />
        <Route path="/contact" element={<PageTransition variant="luxury"><Contact /></PageTransition>} />
        <Route path="/careers" element={<PageTransition variant="luxury"><Careers /></PageTransition>} />
        <Route path="/auth" element={<PageTransition variant="luxury"><Auth /></PageTransition>} />
        <Route path="/login" element={<PageTransition variant="luxury"><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition variant="scale"><Signup /></PageTransition>} />
        <Route path="/staff-signup" element={<PageTransition variant="scale"><StaffSignup /></PageTransition>} />
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
        <Route path="/admin/donations" element={<PageTransition><AdminRoute><DonationsList /></AdminRoute></PageTransition>} />
        <Route path="/admin/service-inquiries" element={<PageTransition><AdminRoute><ServiceInquiriesList /></AdminRoute></PageTransition>} />
        <Route path="/admin/bookings" element={<PageTransition><AdminRoute><BookingsList /></AdminRoute></PageTransition>} />
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
        <Route path="/privacy-policy" element={<PageTransition variant="fade"><PrivacyPolicy /></PageTransition>} />
        <Route path="/terms-of-service" element={<PageTransition variant="fade"><TermsOfService /></PageTransition>} />
        <Route path="/refund-policy" element={<PageTransition variant="fade"><RefundPolicy /></PageTransition>} />
        <Route path="/cookie-policy" element={<PageTransition variant="fade"><CookiePolicy /></PageTransition>} />
        <Route path="/acceptable-use" element={<PageTransition variant="fade"><AcceptableUse /></PageTransition>} />
        <Route path="/disclaimer" element={<PageTransition variant="fade"><Disclaimer /></PageTransition>} />
        <Route path="/faq" element={<PageTransition variant="luxury"><FAQ /></PageTransition>} />
        <Route path="*" element={<PageTransition variant="fade"><NotFound /></PageTransition>} />
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
      <InitialLoader onComplete={() => setIsLoading(false)} minDuration={150} />
      
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Sonner />
        <SubscriptionProvider>
          <CartProvider>
            <CheckoutProvider>
              <CartFeedbackProvider>
                <AIChatProvider>
                  <BrowserRouter>
                    <SkipToContent />
                    <ScrollProgressBar />
                    <NavigationProgress />
                    <ScrollToTop />
                    <BackToTop />
                    <MobileCallButton />
                    
                    <RouteTracker />
                    <AnalyticsTracker />
                    <ErrorBoundary>
                      <Suspense fallback={<PageLoader />}>
                        <AnimatedRoutes />
                      </Suspense>
                    </ErrorBoundary>
                    <AIChat />
                    <CookieConsent />
                    <CartFeedbackNotifications />
                    <UnifiedCheckoutDialog />
                    <DraggablePerformanceMonitor />
                  </BrowserRouter>
                </AIChatProvider>
              </CartFeedbackProvider>
            </CheckoutProvider>
          </CartProvider>
        </SubscriptionProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
