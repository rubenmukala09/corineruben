import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { SplashScreen } from "./components/SplashScreen";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AIChat } from "./components/AIChat";
import { AIChatProvider } from "./contexts/AIChatContext";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { CartFeedbackProvider, CartFeedbackNotifications } from "./components/CartFeedbackNotifications";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";
import { CheckoutProvider } from "./contexts/CheckoutContext";
const UnifiedCheckoutDialog = lazy(() => import("./components/payment/UnifiedCheckoutDialog"));
import { ErrorBoundary } from "./components/ErrorBoundary";
import { RouteTracker } from "./components/RouteTracker";
import { DraggablePerformanceMonitor } from "./components/DraggablePerformanceMonitor";
import { useAnalyticsTracking } from "./hooks/useAnalyticsTracking";
import { PageTransition } from "./components/PageTransition";

import { NavigationProgress } from "./components/NavigationProgress";
import { ScrollToTop } from "./components/ScrollToTop";
import { useSmoothAnchorScroll } from "./hooks/useSmoothAnchorScroll";
import { CookieConsent } from "./components/CookieConsent";
import { SkipToContent } from "./components/SkipToContent";
import ScrollProgressBar from "./components/ScrollProgressBar";
import BackToTop from "./components/BackToTop";
import MobileCallButton from "./components/MobileCallButton";
import { AnalyticsTracker } from "./components/AnalyticsTracker";

// Admin Shell - persistent layout wrapper
import { AdminShell } from "./components/admin/AdminShell";

// Lazy load all pages
const Index = lazy(() => import("./pages/Index"));
const Training = lazy(() => import("./pages/Training"));
const Business = lazy(() => import("./pages/Business"));
const AIReceptionist = lazy(() => import("./pages/business/AIReceptionist"));
const AIAutomation = lazy(() => import("./pages/business/AIAutomation"));
const WebsiteDesign = lazy(() => import("./pages/business/WebsiteDesign"));
const WebsiteInsurance = lazy(() => import("./pages/business/WebsiteInsurance"));
const About = lazy(() => import("./pages/About"));
const Resources = lazy(() => import("./pages/Resources"));
const Articles = lazy(() => import("./pages/Articles"));
const ArticleDetail = lazy(() => import("./pages/ArticleDetail"));
const MyCourses = lazy(() => import("./pages/portal/MyCourses"));
const MyBookings = lazy(() => import("./pages/portal/MyBookings"));
const CourseDetail = lazy(() => import("./pages/portal/CourseDetail"));
const ScamCheckResult = lazy(() => import("./pages/portal/ScamCheckResult"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const Careers = lazy(() => import("./pages/Careers"));
const Auth = lazy(() => import("./pages/Auth"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ApplicationPending = lazy(() => import("./pages/ApplicationPending"));

// Admin pages - content only (shell is handled by AdminShell)
const AdminDashboardContent = lazy(() => import("./pages/admin/AdminDashboardContent"));
const Pending = lazy(() => import("./pages/admin/Pending"));
const PagesManagement = lazy(() => import("./pages/admin/PagesManagement"));
const ClientMessages = lazy(() => import("./pages/admin/ClientMessages"));
const CommunicationsInbox = lazy(() => import("./pages/admin/CommunicationsInbox"));
const NewsletterManagement = lazy(() => import("./pages/admin/NewsletterManagement"));
const BillingSettings = lazy(() => import("./pages/admin/settings/BillingSettings"));
const TestimonialsAdmin = lazy(() => import("./pages/admin/TestimonialsAdmin"));
const ArticlesAdmin = lazy(() => import("./pages/admin/ArticlesAdmin"));
const ArticleEditor = lazy(() => import("./pages/admin/ArticleEditor"));
const ArticlePreview = lazy(() => import("./pages/admin/ArticlePreview"));
const TeamAdmin = lazy(() => import("./pages/admin/TeamAdmin"));
const EmailCampaigns = lazy(() => import("./pages/admin/EmailCampaigns"));
const Analytics = lazy(() => import("./pages/admin/Analytics"));
const BusinessClients = lazy(() => import("./pages/admin/BusinessClients"));
const BusinessClientDetail = lazy(() => import("./pages/admin/BusinessClientDetail"));
const IndividualClientDetail = lazy(() => import("./pages/admin/IndividualClientDetail"));
const IndividualClients = lazy(() => import("./pages/admin/IndividualClients"));
const ProductsList = lazy(() => import("./pages/admin/ProductsList"));
const ProductEditor = lazy(() => import("./pages/admin/ProductEditor"));
const OrdersList = lazy(() => import("./pages/admin/OrdersList"));
const OrderDetail = lazy(() => import("./pages/admin/OrderDetail"));
const InventoryManagement = lazy(() => import("./pages/admin/InventoryManagement"));
const JobApplicationsList = lazy(() => import("./pages/admin/JobApplicationsList"));
const Settings = lazy(() => import("./pages/admin/Settings"));
const Subscriptions = lazy(() => import("./pages/admin/SubscriptionsRoute"));
const SystemHealthDashboard = lazy(() => import("./pages/admin/SystemHealthDashboard"));
const TestingChecklist = lazy(() => import("./pages/admin/TestingChecklist"));
const DonationsList = lazy(() => import("./pages/admin/DonationsList"));
const ServiceInquiriesList = lazy(() => import("./pages/admin/ServiceInquiriesList"));
const BookingsList = lazy(() => import("./pages/admin/BookingsList"));

// Cyber dashboard pages
const ThreatMonitor = lazy(() => import("./pages/admin/cyber/ThreatMonitor"));
const FamilyDevices = lazy(() => import("./pages/admin/cyber/FamilyDevices"));
const CyberUserManagement = lazy(() => import("./pages/admin/cyber/UserManagement"));
const ActivityLog = lazy(() => import("./pages/admin/cyber/ActivityLog"));
const DatabaseView = lazy(() => import("./pages/admin/cyber/DatabaseView"));
const CyberNotifications = lazy(() => import("./pages/admin/cyber/Notifications"));
const SecuritySettings = lazy(() => import("./pages/admin/cyber/SecuritySettings"));
const CyberAnalytics = lazy(() => import("./pages/admin/cyber/CyberAnalytics"));

// Portal pages
const Portal = lazy(() => import("./pages/Portal"));
const AnalystDashboard = lazy(() => import("./pages/portal/AnalystDashboard"));
const TrainerDashboard = lazy(() => import("./pages/portal/TrainerDashboard"));
const DeveloperDashboard = lazy(() => import("./pages/portal/DeveloperDashboard"));
const StaffDashboard = lazy(() => import("./pages/portal/StaffDashboard"));
const SeniorDashboard = lazy(() => import("./pages/portal/SeniorDashboard"));
const BusinessDashboard = lazy(() => import("./pages/portal/BusinessDashboard"));
const CaregiverDashboard = lazy(() => import("./pages/portal/CaregiverDashboard"));
const HealthcareDashboard = lazy(() => import("./pages/portal/HealthcareDashboard"));

// Other pages
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const AcceptableUse = lazy(() => import("./pages/AcceptableUse"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const FAQ = lazy(() => import("./pages/FAQ"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Maintenance = lazy(() => import("./pages/Maintenance"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PaymentCanceled = lazy(() => import("./pages/PaymentCanceled"));

import { AIPulseLoader } from "./components/AIPulseLoader";
const PageLoader = () => <AIPulseLoader message="Loading..." fullScreen={true} />;
const queryClient = new QueryClient();

// Direct routes without AnimatePresence - instant transitions
function PublicRoutes() {
  return (
    <Routes>
        <Route path="/" element={<PageTransition variant="auto"><Index /></PageTransition>} />
        <Route path="/training" element={<PageTransition variant="auto"><Training /></PageTransition>} />
        <Route path="/business" element={<PageTransition variant="auto"><Business /></PageTransition>} />
        <Route path="/business/ai-receptionist" element={<PageTransition variant="auto"><AIReceptionist /></PageTransition>} />
        <Route path="/business/ai-automation" element={<PageTransition variant="auto"><AIAutomation /></PageTransition>} />
        <Route path="/business/website-design" element={<PageTransition variant="auto"><WebsiteDesign /></PageTransition>} />
        <Route path="/business/website-insurance" element={<PageTransition variant="auto"><WebsiteInsurance /></PageTransition>} />
        <Route path="/about" element={<PageTransition variant="auto"><About /></PageTransition>} />
        <Route path="/services" element={<PageTransition variant="auto"><Services /></PageTransition>} />
        <Route path="/resources" element={<PageTransition variant="auto"><Resources /></PageTransition>} />
        <Route path="/payment-success" element={<PageTransition variant="fade"><PaymentSuccess /></PageTransition>} />
        <Route path="/payment-canceled" element={<PageTransition variant="fade"><PaymentCanceled /></PageTransition>} />
        
        <Route path="/articles" element={<PageTransition variant="auto"><Articles /></PageTransition>} />
        <Route path="/articles/:slug" element={<PageTransition variant="auto"><ArticleDetail /></PageTransition>} />
        <Route path="/contact" element={<PageTransition variant="auto"><Contact /></PageTransition>} />
        <Route path="/careers" element={<PageTransition variant="auto"><Careers /></PageTransition>} />
        <Route path="/auth" element={<PageTransition variant="auto"><Auth /></PageTransition>} />
        <Route path="/login" element={<Navigate to="/auth" replace />} />
        <Route path="/signup" element={<Navigate to="/auth?mode=signup" replace />} />
        <Route path="/staff-signup" element={<Navigate to="/auth?mode=signup" replace />} />
        <Route path="/setup" element={<Navigate to="/auth" replace />} />
        <Route path="/application-pending" element={<PageTransition><ApplicationPending /></PageTransition>} />
        <Route path="/maintenance" element={<PageTransition><Maintenance /></PageTransition>} />
        <Route path="/reset-password" element={<PageTransition><ResetPassword /></PageTransition>} />
        
        {/* Portal Routes */}
        <Route path="/portal" element={<PageTransition><ProtectedRoute><Portal /></ProtectedRoute></PageTransition>} />
        <Route path="/portal/admin" element={<Navigate to="/admin" replace />} />
        <Route path="/portal/analyst" element={<PageTransition><ProtectedRoute><AnalystDashboard /></ProtectedRoute></PageTransition>} />
        <Route path="/portal/trainer" element={<PageTransition><ProtectedRoute><TrainerDashboard /></ProtectedRoute></PageTransition>} />
        <Route path="/portal/developer" element={<PageTransition><ProtectedRoute><DeveloperDashboard /></ProtectedRoute></PageTransition>} />
        <Route path="/portal/staff" element={<PageTransition><ProtectedRoute><StaffDashboard /></ProtectedRoute></PageTransition>} />
        <Route path="/portal/senior" element={<PageTransition><ProtectedRoute><SeniorDashboard /></ProtectedRoute></PageTransition>} />
        <Route path="/portal/business" element={<PageTransition><ProtectedRoute><BusinessDashboard /></ProtectedRoute></PageTransition>} />
        <Route path="/portal/caregiver" element={<PageTransition><ProtectedRoute><CaregiverDashboard /></ProtectedRoute></PageTransition>} />
        <Route path="/portal/healthcare" element={<PageTransition><ProtectedRoute><HealthcareDashboard /></ProtectedRoute></PageTransition>} />
        <Route path="/portal/my-courses" element={<PageTransition><ProtectedRoute><MyCourses /></ProtectedRoute></PageTransition>} />
        <Route path="/portal/my-bookings" element={<PageTransition><ProtectedRoute><MyBookings /></ProtectedRoute></PageTransition>} />
        <Route path="/portal/courses/:id" element={<PageTransition><ProtectedRoute><CourseDetail /></ProtectedRoute></PageTransition>} />
        <Route path="/portal/scam-check/:id" element={<PageTransition><ProtectedRoute><ScamCheckResult /></ProtectedRoute></PageTransition>} />
        
        {/* Legal Pages */}
        <Route path="/privacy-policy" element={<PageTransition variant="fade"><PrivacyPolicy /></PageTransition>} />
        <Route path="/terms-of-service" element={<PageTransition variant="fade"><TermsOfService /></PageTransition>} />
        <Route path="/refund-policy" element={<PageTransition variant="fade"><RefundPolicy /></PageTransition>} />
        <Route path="/cookie-policy" element={<PageTransition variant="fade"><CookiePolicy /></PageTransition>} />
        <Route path="/acceptable-use" element={<PageTransition variant="fade"><AcceptableUse /></PageTransition>} />
        <Route path="/disclaimer" element={<PageTransition variant="fade"><Disclaimer /></PageTransition>} />
        <Route path="/faq" element={<PageTransition variant="auto"><FAQ /></PageTransition>} />
        
        {/* Admin Routes - Wrapped in AdminShell */}
        <Route path="/admin/*" element={<AdminShell />}>
          <Route index element={<AdminDashboardContent />} />
          <Route path="threats" element={<ThreatMonitor />} />
          <Route path="devices" element={<FamilyDevices />} />
          <Route path="users" element={<CyberUserManagement />} />
          <Route path="activity" element={<ActivityLog />} />
          <Route path="database" element={<DatabaseView />} />
          <Route path="notifications" element={<CyberNotifications />} />
          <Route path="security" element={<SecuritySettings />} />
          <Route path="reports" element={<CyberAnalytics />} />
          <Route path="insights" element={<CyberAnalytics />} />
          <Route path="content/testimonials" element={<TestimonialsAdmin />} />
          <Route path="content/articles" element={<ArticlesAdmin />} />
          <Route path="content/articles/new" element={<ArticleEditor />} />
          <Route path="content/articles/:id" element={<ArticleEditor />} />
          <Route path="articles/preview" element={<ArticlePreview />} />
          <Route path="content/team" element={<TeamAdmin />} />
          <Route path="pending" element={<Pending />} />
          <Route path="content/pages" element={<PagesManagement />} />
          <Route path="clients/messages" element={<ClientMessages />} />
          <Route path="communications/inbox" element={<CommunicationsInbox />} />
          <Route path="communications/newsletter" element={<NewsletterManagement />} />
          <Route path="settings/billing" element={<BillingSettings />} />
          <Route path="email-campaigns" element={<EmailCampaigns />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="clients/businesses" element={<BusinessClients />} />
          <Route path="clients/businesses/:id" element={<BusinessClientDetail />} />
          <Route path="clients/individuals" element={<IndividualClients />} />
          <Route path="clients/individuals/:id" element={<IndividualClientDetail />} />
          <Route path="ecommerce/products" element={<ProductsList />} />
          <Route path="ecommerce/products/new" element={<ProductEditor />} />
          <Route path="ecommerce/products/:id" element={<ProductEditor />} />
          <Route path="ecommerce/orders" element={<OrdersList />} />
          <Route path="ecommerce/orders/:id" element={<OrderDetail />} />
          <Route path="ecommerce/inventory" element={<InventoryManagement />} />
          <Route path="testing" element={<SystemHealthDashboard />} />
          <Route path="testing/checklist" element={<TestingChecklist />} />
          <Route path="settings/*" element={<Settings />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="donations" element={<DonationsList />} />
          <Route path="service-inquiries" element={<ServiceInquiriesList />} />
          <Route path="bookings" element={<BookingsList />} />
          <Route path="job-applications" element={<JobApplicationsList />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  
  useSmoothAnchorScroll();
  
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    
    const initialSplash = document.getElementById('initial-splash');
    if (initialSplash) {
      initialSplash.classList.add('fade-out');
      setTimeout(() => {
        initialSplash.remove();
      }, 500);
    }
    
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 800);
    
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <SplashScreen isVisible={showSplash} />
      
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
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
                          <PublicRoutes />
                        </Suspense>
                      </ErrorBoundary>
                      <AIChat />
                      <CookieConsent />
                      <CartFeedbackNotifications />
                      <Suspense fallback={null}>
                        <UnifiedCheckoutDialog />
                      </Suspense>
                      <DraggablePerformanceMonitor />
                    </BrowserRouter>
                  </AIChatProvider>
                </CartFeedbackProvider>
              </CheckoutProvider>
            </CartProvider>
          </SubscriptionProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
