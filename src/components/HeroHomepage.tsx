import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Lock, Eye, Fingerprint, ShieldCheck, Zap, Globe, Camera, TrendingUp, Users, Award, Check } from "lucide-react";
import { useRef, useMemo, useState, useEffect } from "react";
import heroVideoFamily from "@/assets/hero-video-family.mp4";
import heroVideoCybersecurity from "@/assets/hero-video-cybersecurity.mp4";

// Randomly select a video on each page load
const heroVideos = [heroVideoFamily, heroVideoCybersecurity];

const securityFeatures = [{
  icon: Lock,
  label: "End-to-End Encryption",
  stat: "256-bit"
}, {
  icon: Eye,
  label: "24/7 Monitoring",
  stat: "Always On"
}, {
  icon: Fingerprint,
  label: "Identity Shield",
  stat: "100% Safe"
}, {
  icon: ShieldCheck,
  label: "AI Protection",
  stat: "Real-time"
}];

const stats = [
  { value: "500+", label: "Families Protected", icon: Users },
  { value: "99.8%", label: "Success Rate", icon: TrendingUp },
  { value: "24/7", label: "Support", icon: Shield },
];

export const HeroHomepage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const selectedVideo = useMemo(() => heroVideos[Math.floor(Math.random() * heroVideos.length)], []);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDisclaimer(true);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);
  
  return <section className="relative min-h-[100vh] lg:min-h-[110vh] overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-lavender-700">
      {/* Video Background - lazy preload for faster initial paint */}
      <div className="absolute inset-0">
        <video 
          ref={videoRef} 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="none"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src={selectedVideo} type="video/mp4" />
        </video>
        {/* Premium gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-800/85 to-lavender-700/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />
        {/* Decorative orbs */}
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-coral-400/20 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-lavender-500/15 rounded-full blur-[100px] animate-float" />
      </div>

      {/* Premium grid pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]">
        <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(248,146,106,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(248,146,106,0.3) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />
      </div>
      
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 relative z-10 hero-instant">
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-8 lg:gap-20 xl:gap-28 items-center min-h-[100vh] py-16 sm:py-20 lg:py-0">
          
          {/* Left Content - Instant render, no animation delay */}
          <div className="lg:col-span-3 order-2 lg:order-1 w-full">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-coral-400/20 to-lavender-500/20 border border-coral-400/30 mb-6 sm:mb-10 shadow-glow-coral backdrop-blur-sm">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-coral-400 to-coral-500 animate-pulse" />
              <span className="text-sm sm:text-base font-bold text-white">Veteran-Supporting • Ohio-Based</span>
            </div>
            
            {/* Headline - Renders immediately - LARGE for elderly readability */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold leading-[0.95] mb-6 sm:mb-8 tracking-tight">
              <span className="block text-white drop-shadow-lg">InVision</span>
              <span className="block bg-gradient-to-r from-coral-400 via-blush-400 to-lavender-400 bg-clip-text text-transparent">Network</span>
              <span className="block font-medium text-white/70 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-2 sm:mt-3">
                Protection • Education • Innovation
              </span>
            </h1>
            
            {/* Description - Larger for readability */}
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/85 max-w-2xl mb-8 sm:mb-12 leading-relaxed font-medium">
              Empowering families with AI scam protection. Transforming businesses with cutting-edge automation solutions.
            </p>
            
            {/* CTAs - Larger, more prominent buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 relative z-30">
              <Button asChild size="lg" className="group h-14 sm:h-16 px-8 sm:px-10 text-base sm:text-lg font-bold rounded-2xl bg-gradient-to-r from-coral-500 to-coral-400 hover:from-coral-400 hover:to-coral-300 text-navy-900 shadow-xl shadow-coral-500/40 hover:shadow-2xl hover:shadow-coral-400/50 transition-all duration-300 border-0 w-full sm:w-auto">
                <Link to="/training">
                  <Shield className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
                  Protect My Family
                  <ArrowRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" className="group h-14 sm:h-16 px-8 sm:px-10 text-base sm:text-lg font-bold rounded-2xl bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 shadow-xl backdrop-blur-sm transition-all duration-300 w-full sm:w-auto">
                <Link to="/business">
                  <Zap className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
                  Automate My Business
                  <ArrowRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Premium Stats Widget - like reference */}
            <div className="mt-10 sm:mt-14 grid grid-cols-3 gap-3 sm:gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="relative bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 hover:border-coral-400/30 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-coral-400/20 to-lavender-500/20 flex items-center justify-center">
                      <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-coral-400" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white group-hover:text-coral-300 transition-colors">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-white/60 font-medium">{stat.label}</div>
                  {/* Progress bar decoration */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 rounded-b-2xl overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-coral-400 to-lavender-500 transition-all duration-700"
                      style={{ width: index === 0 ? '85%' : index === 1 ? '99%' : '100%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Content - Security Visual */}
          <div className="lg:col-span-2 order-1 lg:order-2 flex justify-center lg:justify-end w-full">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl">
              {/* Main visual container */}
              <div className="relative">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full hidden sm:block" style={{
                background: 'radial-gradient(circle at center, rgba(248,146,106,0.25) 0%, rgba(187,129,181,0.15) 50%, transparent 70%)'
              }} />

                {/* Central Shield Container */}
                <div className="relative mx-auto w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72">
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full hidden sm:block border border-dashed border-coral-400/40 animate-spin" style={{ animationDuration: '30s' }} />
                  
                  {/* Second ring */}
                  <div className="absolute inset-4 sm:inset-6 rounded-full border border-lavender-400/30 hidden sm:block" />
                  
                  {/* Pulsing glow */}
                  <div className="absolute inset-8 sm:inset-12 rounded-full bg-coral-400/20 blur-xl animate-pulse" />
                  
                  {/* Inner solid circle */}
                  <div className="absolute inset-10 sm:inset-16 rounded-full bg-gradient-to-br from-coral-500 via-coral-400 to-lavender-500 shadow-2xl shadow-coral-400/50" />
                  
                  {/* Shield icon center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Shield className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-navy-900 drop-shadow-lg" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Floating feature badges - Desktop only - Premium glass cards */}
                <div className="hidden md:block">
                  {securityFeatures.map((feature, index) => {
                  const positions = [{
                    top: '-12%',
                    left: '50%',
                    transform: 'translate(-50%, 0)'
                  }, {
                    top: '50%',
                    right: '-20%',
                    transform: 'translate(0, -50%)'
                  }, {
                    bottom: '-12%',
                    left: '50%',
                    transform: 'translate(-50%, 0)'
                  }, {
                    top: '50%',
                    left: '-20%',
                    transform: 'translate(0, -50%)'
                  }];
                  const pos = positions[index];
                  return <div key={feature.label} className="absolute" style={pos}>
                        <div className="flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg hover:scale-105 hover:bg-white/15 transition-all duration-300">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-coral-400/30 to-lavender-500/30 flex items-center justify-center">
                            <feature.icon className="w-5 h-5 text-coral-300" />
                          </div>
                          <div>
                            <div className="text-sm text-white font-semibold whitespace-nowrap">{feature.label}</div>
                            <div className="text-xs text-coral-300 font-bold">{feature.stat}</div>
                          </div>
                        </div>
                      </div>;
                })}
                </div>
              </div>

              {/* Feature badges grid - Mobile only */}
              <div className="grid grid-cols-2 gap-2 mt-6 md:hidden">
                {securityFeatures.map(feature => <div key={feature.label} className="flex items-center gap-2 px-3 py-2.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/15">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-coral-400/30 to-lavender-500/30 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-3.5 h-3.5 text-coral-300" />
                    </div>
                    <span className="text-xs text-white font-medium leading-tight">{feature.label}</span>
                  </div>)}
              </div>

              {/* Quick Features Row */}
              <div className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-3 gap-2 sm:gap-3">
                {[{
                icon: Globe,
                label: "Ohio-Based",
                color: "from-blue-400 to-cyan-400"
              }, {
                icon: Zap,
                label: "24/7 Support",
                color: "from-coral-400 to-coral-300"
              }, {
                icon: ShieldCheck,
                label: "Veteran Owned",
                color: "from-lavender-400 to-lavender-300"
              }].map(stat => <div key={stat.label} className="text-center p-3 sm:p-4 bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10 hover:border-coral-400/30 hover:bg-white/10 transition-all duration-300">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-navy-900" />
                    </div>
                    <div className="text-[10px] sm:text-xs text-white/80 font-semibold">{stat.label}</div>
                  </div>)}
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />

      {/* AI Image Disclaimer - fades in after 7 seconds */}
      <div 
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 transition-all duration-1000 ${
          showDisclaimer ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex items-center gap-2 px-4 py-2.5 bg-navy-900/90 backdrop-blur-md rounded-full border border-coral-400/30 shadow-lg">
          <Camera className="w-3.5 h-3.5 text-coral-400" />
          <span className="text-xs text-white/80">
            <strong className="text-coral-300">Privacy Notice:</strong> Images are AI-generated to protect member identities
          </span>
        </div>
      </div>
    </section>;
};
export default HeroHomepage;