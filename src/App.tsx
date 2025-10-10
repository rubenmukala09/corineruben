import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Training from "./pages/Training";
import ScamShield from "./pages/ScamShield";
import Business from "./pages/Business";
import About from "./pages/About";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import Careers from "./pages/Careers";
import Auth from "./pages/Auth";
import EnhancedAuth from "./pages/EnhancedAuth";
import AdminDashboardNew from "./pages/AdminDashboardNew";
import WorkerDashboardNew from "./pages/WorkerDashboardNew";
import PasswordReset from "./pages/PasswordReset";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import WorkerDashboard from "./pages/WorkerDashboard";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Refund from "./pages/Refund";
import Disclaimer from "./pages/Disclaimer";
import Partnerships from "./pages/Partnerships";
import Donate from "./pages/Donate";
import CookieConsent from "./components/CookieConsent";
import HelpDialog from "./components/HelpDialog";
import AnalyticsConsent from "./components/AnalyticsConsent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/training" element={<Training />} />
            <Route path="/scam-shield" element={<ScamShield />} />
            <Route path="/business" element={<Business />} />
            <Route path="/about" element={<About />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/team" element={<Team />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/admin" element={<AdminDashboardNew />} />
            <Route path="/staff" element={<StaffDashboard />} />
            <Route path="/worker" element={<WorkerDashboardNew />} />
            <Route path="/enhanced-auth" element={<EnhancedAuth />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/refund" element={<Refund />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/partnerships" element={<Partnerships />} />
            <Route path="/partners" element={<Partnerships />} />
            <Route path="/donate" element={<Donate />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieConsent />
          <HelpDialog />
          <AnalyticsConsent />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
