import { Component, lazy, Suspense, type ErrorInfo, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

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
import ProtectedRoute from "@/components/ProtectedRoute";

// Lazy-load decorative/ambient components — not needed for FCP
const MusicFloatingButton = lazy(() => import("@/components/MusicPlayer"));
const FloatingHearts = lazy(() => import("@/components/FloatingHearts"));
const ScrollProgress = lazy(() => import("@/components/ScrollProgress"));

// Lazy-load non-critical shell components to reduce unused JS on initial load
const GiftFAB = lazy(() => import("@/components/GiftFAB"));
const Toaster = lazy(() => import("@/components/ui/toaster").then(m => ({ default: m.Toaster })));
const Sonner = lazy(() => import("@/components/ui/sonner").then(m => ({ default: m.Toaster })));
const TooltipProvider = lazy(() => import("@/components/ui/tooltip").then(m => ({ default: m.TooltipProvider })));

// Route-level code splitting — every page lazy-loaded to minimize initial bundle
const Index        = lazy(() => import("./pages/Index"));
const Story      = lazy(() => import("./pages/Story"));
const RSVP       = lazy(() => import("./pages/RSVP"));
const Dashboard  = lazy(() => import("./pages/Dashboard"));
const Login      = lazy(() => import("./pages/Login"));
const NotFound   = lazy(() => import("./pages/NotFound"));
const Staff      = lazy(() => import("./pages/Staff"));
const Enquiries  = lazy(() => import("./pages/Enquiries"));
const Registry   = lazy(() => import("./pages/Registry"));
const FAQ        = lazy(() => import("./pages/FAQ"));
const Guestbook  = lazy(() => import("./pages/Guestbook"));
const Gallery    = lazy(() => import("./pages/Gallery"));
const Venue      = lazy(() => import("./pages/Venue"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

const queryClient = new QueryClient();

const AppShell = () => {
  const { pathname } = useLocation();
  const disableAmbientEffects = pathname.startsWith("/dashboard") || pathname.startsWith("/staff");

  return (
    <AuthProvider>
      <Suspense fallback={null}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </Suspense>

      {disableAmbientEffects ? (
        <div className="fixed inset-0 z-0 bg-background" />
      ) : (
        <div className="fixed inset-0 z-0">
          <AuroraBackground variant="hero" />
        </div>
      )}
      <Suspense fallback={null}>
        {!disableAmbientEffects && <FloatingHearts />}
      </Suspense>

      <div className="relative z-10">
        <Suspense fallback={null}><ScrollProgress /></Suspense>
        <ScrollToTop />
        <Navigation />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/story" element={<Story />} />
            <Route path="/rsvp" element={<RSVP />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
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

      <Suspense fallback={null}><MusicFloatingButton /></Suspense>
      <Suspense fallback={null}><GiftFAB /></Suspense>
    </AuthProvider>
  );
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <MusicProvider>
            <BrowserRouter>
              <AppShell />
            </BrowserRouter>
          </MusicProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
