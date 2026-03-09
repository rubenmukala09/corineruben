import { Component, type ErrorInfo, type ReactNode, lazy, Suspense } from "react";
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
const MusicFloatingButton = lazy(() => import("@/components/MusicPlayer"));
const Index = lazy(() => import("./pages/Index"));
const Story = lazy(() => import("./pages/Story"));
const RSVP = lazy(() => import("./pages/RSVP"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
import NotFound from "./pages/NotFound";
const Staff = lazy(() => import("./pages/Staff"));
const Enquiries = lazy(() => import("./pages/Enquiries"));
const Registry = lazy(() => import("./pages/Registry"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Guestbook = lazy(() => import("./pages/Guestbook"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Venue = lazy(() => import("./pages/Venue"));
const FloatingHearts = lazy(() => import("@/components/FloatingHearts"));
const Toaster = lazy(() => import("@/components/ui/toaster").then(m => ({ default: m.Toaster })));
const Sonner = lazy(() => import("@/components/ui/sonner").then(m => ({ default: m.Toaster })));
const TooltipProvider = lazy(() => import("@/components/ui/tooltip").then(m => ({ default: m.TooltipProvider })));
import ProtectedRoute from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <MusicProvider>
          <Suspense fallback={null}>
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
                  <Suspense fallback={null}>
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
                  </Suspense>
                  <Footer />
                </div>

                <Suspense fallback={null}>
                  <MusicFloatingButton />
                </Suspense>
              </AuthProvider>
            </BrowserRouter>
          </TooltipProvider>
          </Suspense>
        </MusicProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
