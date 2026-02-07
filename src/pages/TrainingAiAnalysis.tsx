import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { PageTransition } from "@/components/PageTransition";
import PremiumMeshBackground from "@/components/backgrounds/PremiumMeshBackground";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PromptInputBox } from "@/components/ui/ai-prompt-box";
import { GuestScannerSection } from "@/components/training/GuestScannerSection";
import { ScrollReveal } from "@/components/ScrollReveal";
import { usePrerenderReady } from "@/contexts/PrerenderContext";
import { SITE } from "@/config/site";
import { ArrowRight, BrainCog, FileCheck, ShieldCheck, Sparkles, Upload } from "lucide-react";

const heroImage =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80";
const consoleImage =
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80";

export default function TrainingAiAnalysis() {
  usePrerenderReady(true);

  return (
    <PageTransition variant="fade">
      <PremiumMeshBackground
        variant="training"
        intensity="medium"
        showGrid
        showOrbs
        showParticles
        className="min-h-screen premium-hd-text"
      >
        <div className="min-h-screen">
          <SEO
            title="AI Analysis & Secure File Scan"
            description="Run instant AI analysis on suspicious files, messages, and screenshots. Secure guest scan workflow with automatic deletion in 10 minutes."
            keywords="AI analysis, file scan, scam detection, document scanning, secure analysis"
            structuredData={{
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "AI Analysis & Secure File Scan",
              "description": "Run instant AI analysis on suspicious files, messages, and screenshots.",
              "url": "https://invisionnetwork.org/training/ai-analysis",
              "publisher": {
                "@type": "Organization",
                "name": SITE.name,
                "telephone": SITE.phone.e164,
              },
            }}
          />

          <Navigation />

          <main className="relative">
            <section className="relative overflow-hidden pt-24 pb-16">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-25"
                style={{ backgroundImage: `url(${heroImage})` }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />

              <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl">
                  <ScrollReveal>
                    <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-white px-4 py-1.5 rounded-full">
                      <Sparkles className="w-4 h-4 mr-2" />
                      AI Analysis Console
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-black text-foreground leading-tight mb-4">
                      Scan, Analyze, and Delete
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                        In Minutes, Not Hours
                      </span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                      Replace uncertainty with instant AI guidance. Upload a file, paste a screenshot, or describe the issue—our agent
                      delivers a clear risk summary and auto-deletes your data within 10 minutes.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                      <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent text-white">
                        <a href="#analysis-console">
                          Start AI Analysis
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                      <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10">
                        <Link to="/training">Back to Learn & Train</Link>
                      </Button>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </section>

            <section id="analysis-console" className="py-16">
              <div className="container mx-auto px-4">
                <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
                  <ScrollReveal animation="slide-right">
                    <Card className="premium-3d-card premium-shadow-depth premium-shine-sweep bg-black/30 border border-white/10 p-6 backdrop-blur-xl">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-10 w-10 rounded-2xl bg-primary/20 flex items-center justify-center">
                          <BrainCog className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm uppercase tracking-wider text-muted-foreground">Live Agent Console</p>
                          <h2 className="text-2xl font-bold text-foreground">Ask the AI to Inspect Anything</h2>
                        </div>
                      </div>
                      <PromptInputBox
                        placeholder="Describe the file, paste a message, or ask for a risk summary..."
                        onSend={(message, files) => console.log("AI prompt:", message, files)}
                      />
                      <div className="mt-4 text-xs text-muted-foreground">
                        Tip: Drag & drop a screenshot or paste directly from your clipboard. Files are processed securely and erased.
                      </div>
                    </Card>
                  </ScrollReveal>

                  <div className="space-y-6">
                    <ScrollReveal animation="slide-left">
                      <Card className="premium-3d-card premium-shadow-depth bg-white/70 dark:bg-card/80 backdrop-blur-xl border border-white/30 p-6">
                        <h3 className="text-lg font-semibold text-foreground mb-4">How the AI Agent Works</h3>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                              <Upload className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">Upload or paste</p>
                              <p className="text-sm text-muted-foreground">Images, screenshots, or suspicious messages are accepted instantly.</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="h-9 w-9 rounded-xl bg-accent/10 flex items-center justify-center">
                              <FileCheck className="w-4 h-4 text-accent" />
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">AI risk summary</p>
                              <p className="text-sm text-muted-foreground">Receive a clear threat score with recommended next steps.</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                              <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">Auto deletion</p>
                              <p className="text-sm text-muted-foreground">Files are securely deleted within 10 minutes—no account required.</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </ScrollReveal>

                    <ScrollReveal animation="scale-in">
                      <Card className="premium-3d-card premium-shadow-depth overflow-hidden border border-white/20">
                        <img
                          src={consoleImage}
                          alt="Analyst reviewing AI scan"
                          width={1200}
                          height={800}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4 bg-white/80 dark:bg-card/90 backdrop-blur-xl">
                          <p className="text-sm text-muted-foreground">
                            Your scan results include a human-friendly summary, a confidence score, and guidance for next steps.
                          </p>
                        </div>
                      </Card>
                    </ScrollReveal>
                  </div>
                </div>
              </div>
            </section>

            <GuestScannerSection />

            <section className="py-16">
              <div className="container mx-auto px-4">
                <Card className="premium-3d-card premium-shadow-depth bg-gradient-to-br from-primary/5 via-background to-accent/10 border border-white/30 p-8">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                    <div>
                      <Badge className="mb-3 bg-white/70 text-foreground">Need a guided walkthrough?</Badge>
                      <h3 className="text-2xl font-bold text-foreground mb-2">Talk with a training specialist</h3>
                      <p className="text-muted-foreground max-w-2xl">
                        Our team can review your scan results, help your family respond, and set up long-term protection plans.
                      </p>
                    </div>
                    <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent text-white">
                      <Link to="/contact">
                        Schedule a Review
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </div>
            </section>
          </main>

          <Footer />
        </div>
      </PremiumMeshBackground>
    </PageTransition>
  );
}
