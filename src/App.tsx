import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";
import AuroraBackground from "@/components/AuroraBackground";
import Index from "./pages/Index";
import Story from "./pages/Story";
import RSVP from "./pages/RSVP";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Staff from "./pages/Staff";
import Enquiries from "./pages/Enquiries";
import Registry from "./pages/Registry";
import FloatingHearts from "@/components/FloatingHearts";
import MusicFloatingButton, { MusicProvider } from "@/components/MusicPlayer";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProtectedRoute from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <MusicProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AuthProvider>
                {/* Single unified aurora background behind everything */}
                <div className="fixed inset-0 z-0">
                  <AuroraBackground variant="hero" />
                </div>
                <FloatingHearts />

                <div className="relative z-10">
                  <ScrollToTop />
                  <Navigation />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/story" element={<Story />} />
                    <Route path="/rsvp" element={<RSVP />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/staff" element={<Staff />} />
                    <Route path="/enquiries" element={<Enquiries />} />
                    <Route path="/registry" element={<Registry />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Footer />
                </div>

                <MusicFloatingButton />
              </AuthProvider>
            </BrowserRouter>
          </TooltipProvider>
        </MusicProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
