import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Phone, BarChart3, Users, Zap, TrendingUp } from "lucide-react";
import { trackButtonClick } from "@/utils/analyticsTracker";
import { PAGE_NATURE_IMAGES } from "@/config/natureHeroImages";
import { HeroCarousel } from "@/components/HeroCarousel";
import { cn } from "@/lib/utils";

const businessHeadlines = [
  "Grow Your Business with Secure AI Solutions",
  "Custom AI Automation for Your Business",
  "Professional Website Design & Development",
  "Industry-Leading AI Service Insurance"
];

export const BusinessHero = () => {
  const [currentHeadline, setCurrentHeadline] = useState(0);
  const businessHeroImages = PAGE_NATURE_IMAGES.business;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % businessHeadlines.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[800px] lg:min-h-screen overflow-hidden">
      {/* Background with carousel */}
      <div className="absolute inset-0">
        <HeroCarousel images={businessHeroImages} />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      {/* Curved accent line - inspired by reference */}
      <svg 
        className="absolute bottom-0 left-0 w-full h-32 z-10" 
        viewBox="0 0 1440 128" 
        preserveAspectRatio="none"
      >
        <path 
          d="M0,128 C360,40 720,120 1440,60 L1440,128 L0,128 Z" 
          className="fill-accent/30"
        />
        <path 
          d="M0,128 C480,80 960,100 1440,80 L1440,128 L0,128 Z" 
          className="fill-background"
        />
      </svg>

      {/* Content container */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[600px]">
          
          {/* Left side - Headlines and quote */}
          <div className="space-y-8">
            {/* Animated headline */}
            <div className="space-y-4">
              <Badge variant="outline" className="bg-accent/20 text-accent border-accent/40 text-sm px-4 py-1.5">
                AI-Powered Business Solutions
              </Badge>
              
              <div className="relative h-[120px] sm:h-[100px] md:h-[90px]">
                {businessHeadlines.map((headline, index) => (
                  <h1
                    key={index}
                    className={cn(
                      "absolute inset-0 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight transition-all duration-500",
                      currentHeadline === index 
                        ? "opacity-100 translate-y-0" 
                        : "opacity-0 translate-y-4 pointer-events-none"
                    )}
                    style={{ textShadow: '0 4px 30px rgba(139,92,246,0.4)' }}
                  >
                    {headline}
                  </h1>
                ))}
              </div>
            </div>

            {/* Quote section */}
            <div className="space-y-6 max-w-xl">
              <p className="text-lg text-white/80 leading-relaxed">
                "Transform your business operations with intelligent automation. 
                <span className="font-semibold text-white"> Stop missing calls, losing leads, and wasting time </span>
                on repetitive tasks. Let AI handle the heavy lifting while you focus on growing your business."
              </p>
              <p className="text-accent font-medium">— InVision Network</p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                asChild
                size="xl"
                className="bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 hover:scale-[1.02]"
              >
                <Link 
                  to="/contact?service=ai-automation"
                  onClick={() => trackButtonClick('Get Started', 'Business Hero')}
                >
                  Get Started
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="xl"
                className="border-accent text-accent hover:bg-accent/10 transition-all duration-300 hover:scale-[1.02] group"
              >
                <Link 
                  to="/about"
                  onClick={() => trackButtonClick('Watch the video', 'Business Hero')}
                >
                  Watch the video
                  <div className="ml-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center group-hover:bg-accent/80 transition-colors">
                    <Play className="w-3 h-3 text-accent-foreground fill-current" />
                  </div>
                </Link>
              </Button>
            </div>
          </div>

          {/* Right side - Floating stat cards */}
          <div className="relative hidden lg:block">
            {/* Main visual area with floating cards */}
            <div className="relative h-[500px] xl:h-[600px]">
              
              {/* Decorative orbit rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-accent/20 rounded-full" />
              
              {/* Floating stat card 1 - Top right */}
              <div className="absolute top-8 right-0 bg-background/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-border/50 min-w-[180px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Revenue Growth</p>
                    <p className="text-lg font-bold text-foreground">+47%</p>
                  </div>
                </div>
                {/* Mini chart visualization */}
                <div className="mt-3 flex items-end gap-1 h-8">
                  {[40, 55, 45, 60, 52, 70, 65, 80].map((height, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-accent/60 rounded-t"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Floating stat card 2 - Middle */}
              <div className="absolute top-1/3 right-16 bg-background/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-border/50 min-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-sm font-medium text-foreground">AI Automation</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Calls Handled</span>
                    <span className="text-foreground font-medium">2,847</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" style={{ width: '78%' }} />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Response Rate</span>
                    <span className="text-accent font-medium">99.2%</span>
                  </div>
                </div>
              </div>

              {/* Floating stat card 3 - Bottom */}
              <div className="absolute bottom-20 right-8 bg-background/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Happy Clients</p>
                    <p className="text-2xl font-bold text-foreground">200+</p>
                  </div>
                </div>
              </div>

              {/* Decorative connection dots */}
              <div className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-accent/60" />
              <div className="absolute bottom-1/3 left-1/4 w-2 h-2 rounded-full bg-primary/60" />
              <div className="absolute top-1/2 right-1/3 w-2 h-2 rounded-full bg-success/60" />

              {/* Dotted line decoration */}
              <div className="absolute bottom-16 right-1/4 flex gap-1">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-accent/80" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
