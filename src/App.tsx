import { Component, type ErrorInfo, type ReactNode, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; message: string }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('App error boundary caught:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center font-serif px-8 text-center">
          <p className="text-5xl mb-4">💕</p>
          <h1 className="text-2xl mb-2 text-primary">Something went wrong</h1>
          <p className="text-muted-foreground mb-6 max-w-sm">{this.state.message || 'An unexpected error occurred. Please refresh the page.'}</p>
          <button type="button" onClick={() => window.location.reload()} className="btn-primary">
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";
import AuroraBackground from "@/components/AuroraBackground";
import { MusicProvider } from "@/components/MusicContext";
import MusicFloatingButton from "@/components/MusicPlayer";
import Index from "./pages/Index";
import Story from "./pages/Story";
import RSVP from "./pages/RSVP";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Staff from "./pages/Staff";
import Enquiries from "./pages/Enquiries";
import Registry from "./pages/Registry";
import FAQ from "./pages/FAQ";
import Guestbook from "./pages/Guestbook";
import Gallery from "./pages/Gallery";
import Venue from "./pages/Venue";
import FloatingHearts from "@/components/FloatingHearts";
import GiftFAB from "@/components/GiftFAB";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProtectedRoute from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <MusicProvider>
          <BrowserRouter>
            <AuthProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
              </TooltipProvider>

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
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/guestbook" element={<Guestbook />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/venue" element={<Venue />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
              </div>

              <MusicFloatingButton />
              <GiftFAB />
            </AuthProvider>
          </BrowserRouter>
        </MusicProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
