import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AuroraBackground from "@/components/AuroraBackground";
import MusicFloatingButton, { MusicProvider } from "@/components/MusicPlayer";
import Index from "./pages/Index";
import Story from "./pages/Story";
import Details from "./pages/Details";
import RSVP from "./pages/RSVP";
import Gallery from "./pages/Gallery";
import Registry from "./pages/Registry";
import NotFound from "./pages/NotFound";

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

              <div className="relative z-10">
                <Navigation />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/story" element={<Story />} />
                  <Route path="/details" element={<Details />} />
                  <Route path="/rsvp" element={<RSVP />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/registry" element={<Registry />} />
                  <Route path="*" element={<NotFound />} />
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
