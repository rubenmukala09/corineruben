import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { CartFeedbackProvider } from "./contexts/CartFeedbackContext";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";
import { CheckoutProvider } from "./contexts/CheckoutContext";
import UnifiedCheckoutDialog from "./components/payment/UnifiedCheckoutDialog";
import LauraAIAssistant from "./components/chat/LauraAIAssistant";
import { CartFeedbackNotifications } from "./components/CartFeedbackNotifications";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { RouteTracker } from "./components/RouteTracker";
import { DraggablePerformanceMonitor } from "./components/DraggablePerformanceMonitor";
import { PageTransition } from "./components/PageTransition";
import { MotionConfig } from "framer-motion";
import { ScrollToTop } from "./components/ScrollToTop";
import { useSmoothAnchorScroll } from "./hooks/useSmoothAnchorScroll";
import { CookieConsent } from "./components/CookieConsent";
import { SkipToContent } from "./components/SkipToContent";
import BackToTop from "./components/BackToTop";
import MobileCallButton from "./components/MobileCallButton";
import { AnalyticsTracker } from "./components/AnalyticsTracker";
import { MagnificentDonateButton } from "./components/MagnificentDonateButton";
import { PrerenderProvider } from "./contexts/PrerenderContext";

// Admin Shell
import { AdminShell } from "./components/admin/AdminShell";

// Pages - direct imports
import Index from "./pages/Index";
import Training from "./pages/Training";
import TrainingAiAnalysis from "./pages/TrainingAiAnalysis";
import Business from "./pages/Business";
import AIReceptionist from "./pages/business/AIReceptionist";
import AIAutomation from "./pages/business/AIAutomation";
import WebsiteDesign from "./pages/business/WebsiteDesign";
import WebsiteInsurance from "./pages/business/WebsiteInsurance";
import About from "./pages/About";
import Resources from "./pages/Resources";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import MyCourses from "./pages/portal/MyCourses";
import MyBookings from "./pages/portal/MyBookings";
import CourseDetail from "./pages/portal/CourseDetail";
import ScamCheckResult from "./pages/portal/ScamCheckResult";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import ApplicationPending from "./pages/ApplicationPending";
import Portfolio from "./pages/Portfolio";
import PortfolioDetail from "./pages/PortfolioDetail";

// Admin pages
import AdminDashboardContent from "./pages/admin/AdminDashboardContent";
import Pending from "./pages/admin/Pending";
import PagesManagement from "./pages/admin/PagesManagement";
import ClientMessages from "./pages/admin/ClientMessages";
import CommunicationsInbox from "./pages/admin/CommunicationsInbox";
import NewsletterManagement from "./pages/admin/NewsletterManagement";
import BillingSettings from "./pages/admin/settings/BillingSettings";
import TestimonialsAdmin from "./pages/admin/TestimonialsAdmin";
import ArticlesAdmin from "./pages/admin/ArticlesAdmin";
import ArticleEditor from "./pages/admin/ArticleEditor";
import ArticlePreview from "./pages/admin/ArticlePreview";
import TeamAdmin from "./pages/admin/TeamAdmin";
import EmailCampaigns from "./pages/admin/EmailCampaigns";
import Analytics from "./pages/admin/Analytics";
import BusinessClients from "./pages/admin/BusinessClients";
import BusinessClientDetail from "./pages/admin/BusinessClientDetail";
import IndividualClientDetail from "./pages/admin/IndividualClientDetail";
import IndividualClients from "./pages/admin/IndividualClients";
import ProductsList from "./pages/admin/ProductsList";
import ProductEditor from "./pages/admin/ProductEditor";
import OrdersList from "./pages/admin/OrdersList";
import OrderDetail from "./pages/admin/OrderDetail";
import InventoryManagement from "./pages/admin/InventoryManagement";
import JobApplicationsList from "./pages/admin/JobApplicationsList";
import Settings from "./pages/admin/Settings";
import Subscriptions from "./pages/admin/SubscriptionsRoute";
import SystemHealthDashboard from "./pages/admin/SystemHealthDashboard";
import TestingChecklist from "./pages/admin/TestingChecklist";
import DonationsList from "./pages/admin/DonationsList";
import ServiceInquiriesList from "./pages/admin/ServiceInquiriesList";
import BookingsList from "./pages/admin/BookingsList";
import GraphicDesignAdmin from "./pages/admin/GraphicDesignAdmin";
import PortfolioAdmin from "./pages/admin/PortfolioAdmin";

// Cyber dashboard pages
import ThreatMonitor from "./pages/admin/cyber/ThreatMonitor";
import FamilyDevices from "./pages/admin/cyber/FamilyDevices";
import CyberUserManagement from "./pages/admin/cyber/UserManagement";
import ActivityLog from "./pages/admin/cyber/ActivityLog";
import DatabaseView from "./pages/admin/cyber/DatabaseView";
import CyberNotifications from "./pages/admin/cyber/Notifications";
import SecuritySettings from "./pages/admin/cyber/SecuritySettings";
import CyberAnalytics from "./pages/admin/cyber/CyberAnalytics";

// Portal pages
import Portal from "./pages/Portal";
import AnalystDashboard from "./pages/portal/AnalystDashboard";
import TrainerDashboard from "./pages/portal/TrainerDashboard";
import DeveloperDashboard from "./pages/portal/DeveloperDashboard";
import StaffDashboard from "./pages/portal/StaffDashboard";
import SeniorDashboard from "./pages/portal/SeniorDashboard";
import BusinessDashboard from "./pages/portal/BusinessDashboard";
import CaregiverDashboard from "./pages/portal/CaregiverDashboard";
import HealthcareDashboard from "./pages/portal/HealthcareDashboard";

// Other pages
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RefundPolicy from "./pages/RefundPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import AcceptableUse from "./pages/AcceptableUse";
import Disclaimer from "./pages/Disclaimer";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import Maintenance from "./pages/Maintenance";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCanceled from "./pages/PaymentCanceled";
import GlassmorphismTrustHeroDemo from "./pages/GlassmorphismTrustHeroDemo";

const queryClient = new QueryClient();

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PageTransition variant="auto"><Index /></PageTransition>} />
      <Route path="/training" element={<PageTransition variant="auto"><Training /></PageTransition>} />
      <Route path="/training/ai-analysis" element={<PageTransition variant="auto"><TrainingAiAnalysis /></PageTransition>} />
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
      <Route path="/demo/glassmorphism-hero" element={<PageTransition variant="auto"><GlassmorphismTrustHeroDemo /></PageTransition>} />
      <Route path="/articles" element={<PageTransition variant="auto"><Articles /></PageTransition>} />
      <Route path="/articles/:slug" element={<PageTransition variant="auto"><ArticleDetail /></PageTransition>} />
      <Route path="/contact" element={<PageTransition variant="auto"><Contact /></PageTransition>} />
      <Route path="/portfolio" element={<PageTransition variant="auto"><Portfolio /></PageTransition>} />
      <Route path="/portfolio/:slug" element={<PageTransition variant="auto"><PortfolioDetail /></PageTransition>} />
      <Route path="/careers" element={<PageTransition variant="auto"><Careers /></PageTransition>} />
      <Route path="/auth" element={<PageTransition variant="auto"><Auth /></PageTransition>} />
      <Route path="/login" element={<Navigate to="/auth" replace />} />
      <Route path="/signup" element={<Navigate to="/auth?mode=signup" replace />} />
      <Route path="/staff-signup" element={<Navigate to="/auth?mode=signup" replace />} />
      <Route path="/setup" element={<Navigate to="/auth" replace />} />
      <Route path="/application-pending" element={<PageTransition><ApplicationPending /></PageTransition>} />
      <Route path="/maintenance" element={<PageTransition><Maintenance /></PageTransition>} />
      <Route path="/reset-password" element={<PageTransition><ResetPassword /></PageTransition>} />
      <Route path="/guest-scanner" element={<Navigate to="/training/ai-analysis" replace />} />

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

      {/* Admin Routes */}
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
        <Route path="content/portfolio" element={<GraphicDesignAdmin />} />
        <Route path="content/portfolio-cms" element={<PortfolioAdmin />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  useSmoothAnchorScroll();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MotionConfig reducedMotion="user">
          <Toaster />
          <Sonner />
          <SubscriptionProvider>
            <CartProvider>
              <CheckoutProvider>
                <CartFeedbackProvider>
                  <BrowserRouter>
                    <PrerenderProvider>
                      <SkipToContent />
                      <ScrollToTop />
                      <BackToTop />
                      <MagnificentDonateButton />
                      <MobileCallButton />
                      <RouteTracker />
                      <AnalyticsTracker />
                      <ErrorBoundary>
                        <div id="main-content" tabIndex={-1} role="main">
                          <PublicRoutes />
                        </div>
                      </ErrorBoundary>
                      <LauraAIAssistant />
                      <CookieConsent />
                      <CartFeedbackNotifications />
                      <UnifiedCheckoutDialog />
                      <DraggablePerformanceMonitor />
                    </PrerenderProvider>
                  </BrowserRouter>
                </CartFeedbackProvider>
              </CheckoutProvider>
            </CartProvider>
          </SubscriptionProvider>
        </MotionConfig>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
