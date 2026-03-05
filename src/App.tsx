import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AuroraBackground from "@/components/AuroraBackground";
import Index from "./pages/Index";

const FloatingHearts = lazy(() => import("@/components/FloatingHearts"));
const MusicPlayerModule = lazy(() => import("@/components/MusicPlayer"));
const Toaster = lazy(() => import("@/components/ui/toaster").then(m => ({ default: m.Toaster })));
const Sonner = lazy(() => import("@/components/ui/sonner").then(m => ({ default: m.Toaster })));
const TooltipProvider = lazy(() => import("@/components/ui/tooltip").then(m => ({ default: m.TooltipProvider })));
const MusicProviderLazy = lazy(() => import("@/components/MusicPlayer").then(m => ({ default: m.MusicProvider })));

const Story = lazy(() => import("./pages/Story"));
const RSVP = lazy(() => import("./pages/RSVP"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <Suspense fallback={null}>
          <MusicProviderLazy>
            <Suspense fallback={null}>
              <TooltipProvider>
                <Suspense fallback={null}>
                  <Toaster />
                  <Sonner />
                </Suspense>
                <BrowserRouter>
                  {/* Single unified aurora background behind everything */}
                  <div className="fixed inset-0 z-0">
                    <AuroraBackground variant="hero" />
                  </div>
                  <Suspense fallback={null}>
                    <FloatingHearts />
                  </Suspense>

                  <div className="relative z-10">
                    <Navigation />
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/story" element={<Suspense fallback={null}><Story /></Suspense>} />
                      <Route path="/rsvp" element={<Suspense fallback={null}><RSVP /></Suspense>} />
                      
                      <Route path="*" element={<Suspense fallback={null}><NotFound /></Suspense>} />
                    </Routes>
                    <Footer />
                  </div>

                  <Suspense fallback={null}>
                    <MusicPlayerModule />
                  </Suspense>
                </BrowserRouter>
              </TooltipProvider>
            </Suspense>
          </MusicProviderLazy>
        </Suspense>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
