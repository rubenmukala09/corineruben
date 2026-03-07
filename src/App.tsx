import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AuroraBackground from "@/components/AuroraBackground";
import Index from "./pages/Index";
import FloatingHearts from "@/components/FloatingHearts";
import MusicFloatingButton, { MusicProvider } from "@/components/MusicPlayer";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const Story = lazy(() => import("./pages/Story"));
const RSVP = lazy(() => import("./pages/RSVP"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
              {/* Single unified aurora background behind everything */}
              <div className="fixed inset-0 z-0">
                <AuroraBackground variant="hero" />
              </div>
              <FloatingHearts />

              <div className="relative z-10">
                <Navigation />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/story" element={<Suspense fallback={null}><Story /></Suspense>} />
                  <Route path="/rsvp" element={<Suspense fallback={null}><RSVP /></Suspense>} />
                  <Route path="/dashboard" element={<Suspense fallback={null}><Dashboard /></Suspense>} />
                  <Route path="*" element={<Suspense fallback={null}><NotFound /></Suspense>} />
                </Routes>
                <Footer />
              </div>

              <MusicFloatingButton />
            </BrowserRouter>
          </TooltipProvider>
        </MusicProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
