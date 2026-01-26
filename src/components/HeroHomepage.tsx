import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Lock, Eye, Fingerprint, ShieldCheck, Zap, Globe, Camera } from "lucide-react";
import { useRef, useMemo, useState, useEffect } from "react";
import heroVideoFamily from "@/assets/hero-video-family.mp4";
import heroVideoCybersecurity from "@/assets/hero-video-cybersecurity.mp4";

// Randomly select a video on each page load
const heroVideos = [heroVideoFamily, heroVideoCybersecurity];

const securityFeatures = [{
  icon: Lock,
  label: "End-to-End Encryption"
}, {
  icon: Eye,
  label: "24/7 Monitoring"
}, {
  icon: Fingerprint,
  label: "Identity Shield"
}, {
  icon: ShieldCheck,
  label: "AI Protection"
}];
export const HeroHomepage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const selectedVideo = useMemo(() => heroVideos[Math.floor(Math.random() * heroVideos.length)], []);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  // Pre-validate video URL before mounting to prevent console errors
  useEffect(() => {
    const timer = setTimeout(() => {
      // Use HEAD request to validate video exists without downloading it
      fetch(selectedVideo, { method: 'HEAD', mode: 'cors' })
        .then(response => {
          if (response.ok) {
            setVideoReady(true);
          } else {
            setVideoFailed(true);
          }
        })
        .catch(() => {
          // Silently fail - no video will be shown, no console error
          setVideoFailed(true);
        });
    }, 2000);
    return () => clearTimeout(timer);
  }, [selectedVideo]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDisclaimer(true);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);
  
  return <section className="relative min-h-[100vh] lg:min-h-[110vh] overflow-hidden" style={{
    backgroundColor: '#1a1625',
    contain: 'layout style paint'
  }}>
      {/* Video Background - lazy preload for faster initial paint */}
      <div className="absolute inset-0">
        {videoReady && !videoFailed && (
          <video 
            ref={videoRef} 
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="none"
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setVideoFailed(true)}
          >
            <source 
              src={selectedVideo} 
              type="video/mp4" 
              onError={(e) => {
                e.stopPropagation();
                setVideoFailed(true);
              }}
            />
          </video>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
        backgroundSize: '100px 100px'
      }} />
      </div>
      
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 relative z-10 hero-instant" style={{ contain: 'strict', minHeight: 'calc(100vh - 64px)', height: 'calc(100vh - 64px)' }}>
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-8 lg:gap-20 xl:gap-28 items-center py-16 sm:py-20 lg:py-0" style={{ contain: 'strict', minHeight: 'calc(100vh - 64px)', height: 'calc(100vh - 64px)' }}>
          
          {/* Left Content - Instant render, no animation delay - LCP element */}
          <div className="lg:col-span-3 order-2 lg:order-1 w-full" style={{ contain: 'strict', minHeight: '400px', height: 'auto' }}>
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-6 sm:mb-10 shadow-sm">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gradient-to-r from-primary to-accent shadow-sm" />
              <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Veteran-Supporting • Ohio-Based</span>
            </div>
            
            {/* Headline - Renders immediately - LARGE for elderly readability */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold leading-[0.95] mb-6 sm:mb-8 tracking-tight">
              <span className="block text-foreground">InVision</span>
              <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Network</span>
              <span className="block font-medium text-muted-foreground text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-2 sm:mt-3">
                Protection • Education • Innovation
              </span>
            </h1>
            
            {/* Description - Larger for readability */}
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-foreground/80 max-w-2xl mb-8 sm:mb-12 leading-relaxed font-medium">
              Empowering families with AI scam protection. Transforming businesses with cutting-edge automation solutions.
            </p>
            
            {/* CTAs - Larger, more prominent buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 relative z-30">
              <Button asChild size="lg" className="group h-14 sm:h-16 px-8 sm:px-10 text-base sm:text-lg font-bold rounded-2xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-accent/90 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-200 border-0 w-full sm:w-auto">
                <Link to="/training">
                  <Shield className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
                  Protect My Family
                  <ArrowRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" className="group h-14 sm:h-16 px-8 sm:px-10 text-base sm:text-lg font-bold rounded-2xl bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-primary/90 shadow-xl shadow-accent/30 hover:shadow-2xl hover:shadow-accent/40 transition-all duration-200 border-0 text-accent-foreground w-full sm:w-auto">
                <Link to="/business">
                  <Zap className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
                  Automate My Business
                  <ArrowRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Right Content - Security Visual */}
          <div className="lg:col-span-2 order-1 lg:order-2 flex justify-center lg:justify-end w-full" style={{ contain: 'layout style paint' }}>
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl">
              {/* Main visual container */}
              <div className="relative">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full hidden sm:block" style={{
                background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.2) 0%, hsl(var(--accent) / 0.1) 50%, transparent 70%)'
              }} />

                {/* Central Shield Container */}
                <div className="relative mx-auto w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72">
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full hidden sm:block border border-dashed border-primary/40" />
                  
                  {/* Second ring */}
                  <div className="absolute inset-4 sm:inset-6 rounded-full border border-accent/25 hidden sm:block" />
                  
                  {/* Pulsing glow */}
                  
                  
                  {/* Inner solid circle */}
                  <div className="absolute inset-10 sm:inset-16 rounded-full bg-gradient-to-br from-primary via-primary to-accent/80 shadow-2xl shadow-primary/40" />
                  
                  {/* Shield icon center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Shield className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-primary-foreground drop-shadow-lg" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Floating feature badges - Desktop only */}
                <div className="hidden md:block">
                  {securityFeatures.map((feature, index) => {
                  const positions = [{
                    top: '-8%',
                    left: '50%',
                    transform: 'translate(-50%, 0)'
                  }, {
                    top: '50%',
                    right: '-15%',
                    transform: 'translate(0, -50%)'
                  }, {
                    bottom: '-8%',
                    left: '50%',
                    transform: 'translate(-50%, 0)'
                  }, {
                    top: '50%',
                    left: '-15%',
                    transform: 'translate(0, -50%)'
                  }];
                  const pos = positions[index];
                  return <div key={feature.label} className="absolute" style={pos}>
                        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-card/95 rounded-full border border-primary/15 shadow-lg shadow-primary/10 hover:scale-105 transition-transform duration-200">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center">
                            <feature.icon className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-sm text-foreground font-medium whitespace-nowrap">{feature.label}</span>
                        </div>
                      </div>;
                })}
                </div>
              </div>

              {/* Feature badges grid - Mobile only */}
              <div className="grid grid-cols-2 gap-2 mt-6 md:hidden">
                {securityFeatures.map(feature => <div key={feature.label} className="flex items-center gap-2 px-3 py-2 bg-card/90 rounded-lg border border-primary/10 shadow-sm">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-xs text-foreground font-medium leading-tight">{feature.label}</span>
                  </div>)}
              </div>

              {/* Stats Row */}
              <div className="mt-8 sm:mt-16 lg:mt-24 grid grid-cols-3 gap-2 sm:gap-4">
                {[{
                icon: Globe,
                label: "Ohio-Based"
              }, {
                icon: Zap,
                label: "24/7 Support"
              }, {
                icon: ShieldCheck,
                label: "Veteran-Supporting"
              }].map(stat => <div key={stat.label} className="text-center p-2 sm:p-4 bg-card/60 rounded-xl sm:rounded-2xl border border-primary/10 hover:border-primary/25 transition-colors duration-200">
                    <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent mx-auto mb-1 sm:mb-2" />
                    <div className="text-[10px] sm:text-xs text-muted-foreground font-medium">{stat.label}</div>
                  </div>)}
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      {/* AI Image Disclaimer - fades in after 7 seconds */}
      <div 
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-1000 ${
          showDisclaimer ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-card/90 backdrop-blur-sm rounded-full border border-primary/20 shadow-lg">
          <Camera className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs text-muted-foreground">
            <strong className="text-foreground">Privacy Notice:</strong> Images are AI-generated to protect member identities
          </span>
        </div>
      </div>
    </section>;
};
export default HeroHomepage;