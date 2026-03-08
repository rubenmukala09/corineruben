import { lazy, Suspense } from "react";
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
// Heavy components - lazy loaded to reduce initial JS
const UnifiedCheckoutDialog = lazy(() => import("./components/payment/UnifiedCheckoutDialog"));
const LauraAIAssistant = lazy(() => import("./components/chat/LauraAIAssistant"));
const CartFeedbackNotifications = lazy(() => import("./components/CartFeedbackNotifications").then(m => ({ default: m.CartFeedbackNotifications })));
import { ErrorBoundary } from "./components/ErrorBoundary";
import { RouteTracker } from "./components/RouteTracker";
const DraggablePerformanceMonitor = lazy(() => import("./components/DraggablePerformanceMonitor").then(m => ({ default: m.DraggablePerformanceMonitor })));
import { PageTransition } from "./components/PageTransition";
import { ScrollToTop } from "./components/ScrollToTop";
import { useSmoothAnchorScroll } from "./hooks/useSmoothAnchorScroll";
const CookieConsent = lazy(() => import("./components/CookieConsent").then(m => ({ default: m.CookieConsent })));
import { SkipToContent } from "./components/SkipToContent";
const BackToTop = lazy(() => import("./components/BackToTop"));
const MobileCallButton = lazy(() => import("./components/MobileCallButton"));
const AnalyticsTracker = lazy(() => import("./components/AnalyticsTracker").then(m => ({ default: m.AnalyticsTracker })));
const MagnificentDonateButton = lazy(() => import("./components/MagnificentDonateButton").then(m => ({ default: m.MagnificentDonateButton })));
import { PrerenderProvider } from "./contexts/PrerenderContext";
import { NavigationProgress } from "./components/NavigationProgress";

// Admin Shell
const AdminShell = lazy(() => import("./components/admin/AdminShell").then(m => ({ default: m.AdminShell })));

// Pages - lazy loaded to reduce main bundle size
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Auth = lazy(() => import("./pages/Auth"));

// Non-critical public pages - lazy loaded
const Training = lazy(() => import("./pages/Training"));
const TrainingAiAnalysis = lazy(() => import("./pages/TrainingAiAnalysis"));
const Business = lazy(() => import("./pages/Business"));
const AIReceptionist = lazy(() => import("./pages/business/AIReceptionist"));
const AIAutomation = lazy(() => import("./pages/business/AIAutomation"));
const WebsiteDesign = lazy(() => import("./pages/business/WebsiteDesign"));
const WebsiteInsurance = lazy(() => import("./pages/business/WebsiteInsurance"));
const AutonomousDefenseHub = lazy(() => import("./pages/business/AutonomousDefenseHub"));
const CognitiveSentinel = lazy(() => import("./pages/services/CognitiveSentinel"));
const ScamInsurance = lazy(() => import("./pages/services/ScamInsurance"));
const AISafeCertification = lazy(() => import("./pages/services/AISafeCertification"));
const FamilyEmergencyNetwork = lazy(() => import("./pages/services/FamilyEmergencyNetwork"));
const DigitalEstate = lazy(() => import("./pages/services/DigitalEstate"));
const About = lazy(() => import("./pages/About"));
const Resources = lazy(() => import("./pages/Resources"));
const Articles = lazy(() => import("./pages/Articles"));
const ArticleDetail = lazy(() => import("./pages/ArticleDetail"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const Careers = lazy(() => import("./pages/Careers"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ApplicationPending = lazy(() => import("./pages/ApplicationPending"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const PortfolioDetail = lazy(() => import("./pages/PortfolioDetail"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PaymentCanceled = lazy(() => import("./pages/PaymentCanceled"));
const GlassmorphismTrustHeroDemo = lazy(() => import("./pages/GlassmorphismTrustHeroDemo"));
const StyleShowcase = lazy(() => import("./pages/StyleShowcase"));
const FAQ = lazy(() => import("./pages/FAQ"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));
const Maintenance = lazy(() => import("./pages/Maintenance"));

// Legal pages - lazy loaded
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const AcceptableUse = lazy(() => import("./pages/AcceptableUse"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));

// Portal pages - lazy loaded
const Portal = lazy(() => import("./pages/Portal"));
const MyCourses = lazy(() => import("./pages/portal/MyCourses"));
const MyBookings = lazy(() => import("./pages/portal/MyBookings"));
const MyTickets = lazy(() => import("./pages/portal/MyTickets"));
const ReferralDashboard = lazy(() => import("./pages/portal/ReferralDashboard"));
const UserAnalytics = lazy(() => import("./pages/portal/UserAnalytics"));
const CourseDetail = lazy(() => import("./pages/portal/CourseDetail"));
const ScamCheckResult = lazy(() => import("./pages/portal/ScamCheckResult"));
const SecretaryDashboard = lazy(() => import("./pages/portal/SecretaryDashboard"));
const CoordinatorDashboard = lazy(() => import("./pages/portal/CoordinatorDashboard"));
const StaffDashboard = lazy(() => import("./pages/portal/StaffDashboard"));
const InternalMessages = lazy(() => import("./pages/portal/InternalMessages"));

// Admin pages - lazy loaded
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
const GraphicDesignAdmin = lazy(() => import("./pages/admin/GraphicDesignAdmin"));
const PortfolioAdmin = lazy(() => import("./pages/admin/PortfolioAdmin"));
const SupportTicketsAdmin = lazy(() => import("./pages/admin/SupportTickets"));
const KnowledgeBaseAdmin = lazy(() => import("./pages/admin/KnowledgeBaseAdmin"));
const ReviewsAdmin = lazy(() => import("./pages/admin/ReviewsAdmin"));

// Cyber dashboard pages - lazy loaded
const ThreatMonitor = lazy(() => import("./pages/admin/cyber/ThreatMonitor"));
const FamilyDevices = lazy(() => import("./pages/admin/cyber/FamilyDevices"));
const CyberUserManagement = lazy(() => import("./pages/admin/cyber/UserManagement"));
const ActivityLog = lazy(() => import("./pages/admin/cyber/ActivityLog"));
const DatabaseView = lazy(() => import("./pages/admin/cyber/DatabaseView"));
const CyberNotifications = lazy(() => import("./pages/admin/cyber/Notifications"));
const SecuritySettings = lazy(() => import("./pages/admin/cyber/SecuritySettings"));
const CyberAnalytics = lazy(() => import("./pages/admin/cyber/CyberAnalytics"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,       // 1 min — skip refetch if data is fresh
      gcTime: 5 * 60_000,      // 5 min — keep unused data in cache
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function PublicRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<PageTransition variant="auto"><Index /></PageTransition>} />
        <Route path="/training" element={<PageTransition variant="auto"><Training /></PageTransition>} />
        <Route path="/training/ai-analysis" element={<PageTransition variant="auto"><TrainingAiAnalysis /></PageTransition>} />
        <Route path="/business" element={<PageTransition variant="auto"><Business /></PageTransition>} />
        <Route path="/business/ai-receptionist" element={<PageTransition variant="auto"><AIReceptionist /></PageTransition>} />
        <Route path="/business/ai-automation" element={<PageTransition variant="auto"><AIAutomation /></PageTransition>} />
        <Route path="/business/website-design" element={<PageTransition variant="auto"><WebsiteDesign /></PageTransition>} />
        <Route path="/business/website-insurance" element={<PageTransition variant="auto"><WebsiteInsurance /></PageTransition>} />
        <Route path="/business/autonomous-defense-hub" element={<PageTransition variant="auto"><AutonomousDefenseHub /></PageTransition>} />
        <Route path="/invision-2026" element={<Navigate to="/business" replace />} />
        <Route path="/services/cognitive-sentinel" element={<PageTransition variant="auto"><CognitiveSentinel /></PageTransition>} />
        <Route path="/services/scam-insurance" element={<PageTransition variant="auto"><ScamInsurance /></PageTransition>} />
        <Route path="/services/ai-safe-certification" element={<PageTransition variant="auto"><AISafeCertification /></PageTransition>} />
        <Route path="/services/family-emergency-network" element={<PageTransition variant="auto"><FamilyEmergencyNetwork /></PageTransition>} />
        <Route path="/services/digital-estate" element={<PageTransition variant="auto"><DigitalEstate /></PageTransition>} />
        <Route path="/about" element={<PageTransition variant="auto"><About /></PageTransition>} />
        <Route path="/services" element={<PageTransition variant="auto"><Services /></PageTransition>} />
        <Route path="/resources" element={<PageTransition variant="auto"><Resources /></PageTransition>} />
        <Route path="/payment-success" element={<PageTransition variant="fade"><PaymentSuccess /></PageTransition>} />
        <Route path="/payment-canceled" element={<PageTransition variant="fade"><PaymentCanceled /></PageTransition>} />
        <Route path="/demo/glassmorphism-hero" element={<PageTransition variant="auto"><GlassmorphismTrustHeroDemo /></PageTransition>} />
        <Route path="/style-showcase" element={<PageTransition variant="auto"><StyleShowcase /></PageTransition>} />
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

        {/* Portal Routes — 4 internal dashboards */}
        <Route path="/portal" element={<PageTransition><ProtectedRoute><Portal /></ProtectedRoute></PageTransition>} />
        <Route path="/portal/admin" element={<Navigate to="/admin" replace />} />
        <Route path="/portal/secretary" element={<PageTransition><ProtectedRoute><SecretaryDashboard /></ProtectedRoute></PageTransition>} />
        <Route path="/portal/coordinator" element={<PageTransition><ProtectedRoute><CoordinatorDashboard /></ProtectedRoute></PageTransition>} />
        <Route path="/portal/staff" element={<PageTransition><ProtectedRoute><StaffDashboard /></ProtectedRoute></PageTransition>} />
        {/* Redirects for removed dashboards */}
        <Route path="/portal/analyst" element={<Navigate to="/portal/staff" replace />} />
        <Route path="/portal/trainer" element={<Navigate to="/portal/coordinator" replace />} />
        <Route path="/portal/developer" element={<Navigate to="/portal/staff" replace />} />
        <Route path="/portal/senior" element={<Navigate to="/portal/staff" replace />} />
        <Route path="/portal/business" element={<Navigate to="/portal/staff" replace />} />
        <Route path="/portal/caregiver" element={<Navigate to="/portal/staff" replace />} />
        <Route path="/portal/healthcare" element={<Navigate to="/portal/staff" replace />} />
        {/* Shared portal utilities */}
        <Route path="/portal/messages" element={<PageTransition><ProtectedRoute><InternalMessages /></ProtectedRoute></PageTransition>} />
        <Route path="/portal/my-courses" element={<PageTransition><ProtectedRoute><MyCourses /></ProtectedRoute></PageTransition>} />
        <Route path="/portal/my-bookings" element={<PageTransition><ProtectedRoute><MyBookings /></ProtectedRoute></PageTransition>} />
        <Route path="/portal/my-tickets" element={<PageTransition><ProtectedRoute><MyTickets /></ProtectedRoute></PageTransition>} />
        <Route path="/portal/referrals" element={<PageTransition><ProtectedRoute><ReferralDashboard /></ProtectedRoute></PageTransition>} />
        <Route path="/portal/analytics" element={<PageTransition><ProtectedRoute><UserAnalytics /></ProtectedRoute></PageTransition>} />
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
        <Route path="/help" element={<PageTransition variant="auto"><HelpCenter /></PageTransition>} />

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
          <Route path="support/tickets" element={<SupportTicketsAdmin />} />
          <Route path="content/knowledge-base" element={<KnowledgeBaseAdmin />} />
          <Route path="content/reviews" element={<ReviewsAdmin />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  useSmoothAnchorScroll();

  useEffect(() => {
    // Defer scroll-behavior to avoid forced reflow during initial paint
    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = "smooth";
    });
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
          <Toaster />
          <Sonner />
          <SubscriptionProvider>
            <CartProvider>
              <CheckoutProvider>
                <CartFeedbackProvider>
                  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                    <PrerenderProvider>
                      <NavigationProgress />
                      <SkipToContent />
                      <ScrollToTop />
                      <Suspense fallback={null}>
                        <BackToTop />
                        <MobileCallButton />
                        <AnalyticsTracker />
                      </Suspense>
                      <ErrorBoundary>
                        <div id="main-content" tabIndex={-1} role="main">
                          <PublicRoutes />
                        </div>
                      </ErrorBoundary>
                      <RouteTracker />
                      <Suspense fallback={null}>
                        <CookieConsent />
                      </Suspense>
                      <Suspense fallback={null}>
                        <MagnificentDonateButton />
                        <LauraAIAssistant />
                        <CartFeedbackNotifications />
                        <UnifiedCheckoutDialog />
                        <DraggablePerformanceMonitor />
                      </Suspense>
                    </PrerenderProvider>
                  </BrowserRouter>
                </CartFeedbackProvider>
              </CheckoutProvider>
            </CartProvider>
          </SubscriptionProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
