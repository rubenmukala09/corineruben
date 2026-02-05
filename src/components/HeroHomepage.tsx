import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Lock, Eye, Fingerprint, ShieldCheck, Zap, Globe, Camera, TrendingUp, Users, Award, Sparkles, Star } from "lucide-react";
import { useRef, useMemo, useState, useEffect } from "react";
import heroVideoFamily from "@/assets/hero-video-family.mp4";
import heroVideoCybersecurity from "@/assets/hero-video-cybersecurity.mp4";

const heroVideos = [heroVideoFamily, heroVideoCybersecurity];

const securityFeatures = [
  { icon: Lock, label: "256-bit Encryption", stat: "Military Grade" },
  { icon: Eye, label: "24/7 Monitoring", stat: "Always Active" },
  { icon: Fingerprint, label: "Identity Shield", stat: "100% Protected" },
  { icon: ShieldCheck, label: "AI Defense", stat: "Real-time" },
];

const stats = [
  { value: "500+", label: "Families Protected", icon: Users, progress: 85 },
  { value: "99.8%", label: "Success Rate", icon: TrendingUp, progress: 99 },
  { value: "24/7", label: "Active Support", icon: Shield, progress: 100 },
];

export const HeroHomepage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const selectedVideo = useMemo(() => heroVideos[Math.floor(Math.random() * heroVideos.length)], []);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowDisclaimer(true), 7000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className="relative min-h-[100vh] lg:min-h-[110vh] overflow-hidden bg-[#050508]">
      {/* Cinematic Video Background */}
      <div className="absolute inset-0">
        <video 
          ref={videoRef} 
          autoPlay loop muted playsInline preload="none"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src={selectedVideo} type="video/mp4" />
        </video>
        
        {/* Multi-layer cinematic gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#050508] via-[#0a0a12]/90 to-[#12081a]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-[#050508]/50" />
        
        {/* Color Dodge Light Leaks */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full opacity-40" 
          style={{ background: 'radial-gradient(circle, rgba(248,146,106,0.4) 0%, rgba(187,129,181,0.2) 40%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(6,182,212,0.15) 50%, transparent 70%)', filter: 'blur(100px)' }} />
        <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(248,146,106,0.5) 0%, transparent 60%)', filter: 'blur(60px)' }} />
      </div>

      {/* Premium Grid Pattern with Color Dodge */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(248,146,106,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(248,146,106,0.5) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      {/* Floating 3D Glass Shapes */}
      <div className="absolute top-20 right-20 w-32 h-32 rounded-3xl rotate-12 border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl hidden lg:block" 
        style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1), 0 20px 40px rgba(0,0,0,0.3)' }} />
      <div className="absolute bottom-40 left-16 w-24 h-24 rounded-2xl -rotate-6 border border-white/[0.06] bg-white/[0.015] backdrop-blur-lg hidden lg:block"
        style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08)' }} />
      
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[100vh] py-20 lg:py-0">
          
          {/* Left Content - 7 cols */}
          <div className="lg:col-span-7 order-2 lg:order-1 w-full">
            {/* Premium Floating Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full mb-8 relative group cursor-default"
              style={{ 
                background: 'linear-gradient(135deg, rgba(248,146,106,0.15) 0%, rgba(139,92,246,0.1) 100%)',
                border: '1px solid rgba(248,146,106,0.3)',
                boxShadow: '0 0 40px rgba(248,146,106,0.15), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}>
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-coral-400 to-coral-500 animate-pulse shadow-lg shadow-coral-500/50" />
              <span className="text-sm font-semibold text-white/90 tracking-wide">Veteran-Owned • Ohio-Based • Trusted Since 2020</span>
              <Sparkles className="w-4 h-4 text-coral-400" />
            </div>
            
            {/* Cinematic Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] font-bold leading-[0.9] mb-8 tracking-tight">
              <span className="block text-white" style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}>InVision</span>
              <span className="block relative">
                <span className="bg-gradient-to-r from-coral-400 via-[#F6D7DD] to-lavender-400 bg-clip-text text-transparent"
                  style={{ filter: 'drop-shadow(0 2px 20px rgba(248,146,106,0.4))' }}>Network</span>
              </span>
            </h1>
            
            {/* Tagline with Editorial feel */}
            <p className="text-xl md:text-2xl lg:text-3xl text-white/70 max-w-2xl mb-10 leading-relaxed font-light">
              <span className="text-white font-medium">AI scam protection</span> for families. 
              <span className="text-coral-300 font-medium"> Cutting-edge automation</span> for businesses.
            </p>
            
            {/* Premium CTAs with Spatial Design */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button asChild size="lg" className="group relative h-16 px-10 text-lg font-semibold rounded-2xl overflow-hidden border-0"
                style={{
                  background: 'linear-gradient(135deg, #F8926A 0%, #F6D7DD 50%, #BB81B5 100%)',
                  boxShadow: '0 0 50px rgba(248,146,106,0.4), 0 20px 40px -20px rgba(248,146,106,0.5), inset 0 1px 0 rgba(255,255,255,0.3)'
                }}>
                <Link to="/training" className="text-[#050508]">
                  <Shield className="mr-2 w-5 h-5" />
                  Protect My Family
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" className="group h-16 px-10 text-lg font-semibold rounded-2xl text-white border-0"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 10px 30px rgba(0,0,0,0.2)'
                }}>
                <Link to="/business">
                  <Zap className="mr-2 w-5 h-5 text-violet-400" />
                  Automate Business
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Spatial Utility Stats Widgets */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div key={stat.label} className="relative group cursor-default"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(40px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '20px',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 40px -20px rgba(0,0,0,0.4)'
                  }}>
                  {/* Linear Dodge Highlight */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] rounded-t-[20px] opacity-50"
                    style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(248,146,106,0.5) 50%, transparent 100%)' }} />
                  
                  <div className="p-5 relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ 
                          background: 'linear-gradient(135deg, rgba(248,146,106,0.2) 0%, rgba(139,92,246,0.15) 100%)',
                          boxShadow: '0 0 20px rgba(248,146,106,0.2)'
                        }}>
                        <stat.icon className="w-5 h-5 text-coral-400" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1 group-hover:text-coral-300 transition-colors">{stat.value}</div>
                    <div className="text-sm text-white/50 font-medium">{stat.label}</div>
                    
                    {/* Glow Progress Bar */}
                    <div className="mt-4 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div className="h-full rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${stat.progress}%`,
                          background: 'linear-gradient(90deg, #F8926A 0%, #BB81B5 100%)',
                          boxShadow: '0 0 10px rgba(248,146,106,0.5)'
                        }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Content - Security Visual - 5 cols */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end w-full">
            <div className="relative w-full max-w-lg">
              {/* Main Glass Container */}
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Outer Glow Rings */}
                <div className="absolute inset-[-20%] rounded-full animate-spin" style={{ animationDuration: '40s' }}>
                  <div className="absolute inset-0 rounded-full border border-dashed border-coral-400/20" />
                </div>
                <div className="absolute inset-[-10%] rounded-full border border-lavender-400/15" />
                
                {/* Central Glowing Orb */}
                <div className="absolute inset-[15%] rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(248,146,106,0.3) 0%, rgba(139,92,246,0.15) 50%, transparent 70%)',
                    filter: 'blur(40px)',
                    animation: 'pulse 4s ease-in-out infinite'
                  }} />
                
                {/* Main Shield Container - Glassmorphism */}
                <div className="absolute inset-[25%] rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(248,146,106,0.9) 0%, rgba(246,215,221,0.8) 40%, rgba(187,129,181,0.9) 100%)',
                    boxShadow: '0 0 80px rgba(248,146,106,0.5), 0 0 120px rgba(187,129,181,0.3), inset 0 2px 4px rgba(255,255,255,0.4)'
                  }}>
                  <Shield className="w-16 h-16 md:w-20 md:h-20 text-[#050508] drop-shadow-lg" strokeWidth={1.5} />
                </div>

                {/* Floating Feature Cards - Spatial Design */}
                {securityFeatures.map((feature, index) => {
                  const positions = [
                    { top: '-5%', left: '50%', transform: 'translateX(-50%)' },
                    { top: '50%', right: '-15%', transform: 'translateY(-50%)' },
                    { bottom: '-5%', left: '50%', transform: 'translateX(-50%)' },
                    { top: '50%', left: '-15%', transform: 'translateY(-50%)' },
                  ];
                  return (
                    <div key={feature.label} className="absolute hidden md:flex" style={positions[index]}>
                      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl cursor-default group"
                        style={{
                          background: 'rgba(255,255,255,0.08)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 15px 30px rgba(0,0,0,0.3)'
                        }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: 'linear-gradient(135deg, rgba(248,146,106,0.3) 0%, rgba(139,92,246,0.2) 100%)' }}>
                          <feature.icon className="w-5 h-5 text-coral-300" />
                        </div>
                        <div>
                          <div className="text-sm text-white font-medium whitespace-nowrap">{feature.label}</div>
                          <div className="text-xs text-coral-300/80">{feature.stat}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile Feature Grid */}
              <div className="grid grid-cols-2 gap-3 mt-8 md:hidden">
                {securityFeatures.map(feature => (
                  <div key={feature.label} className="flex items-center gap-2 px-3 py-3 rounded-xl"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.08)'
                    }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, rgba(248,146,106,0.25) 0%, rgba(139,92,246,0.15) 100%)' }}>
                      <feature.icon className="w-4 h-4 text-coral-300" />
                    </div>
                    <span className="text-xs text-white/80 font-medium">{feature.label}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Trust Badges */}
              <div className="flex justify-center gap-3 mt-8">
                {[
                  { icon: Globe, label: "Ohio-Based" },
                  { icon: Star, label: "Top Rated" },
                  { icon: Award, label: "Veteran Owned" },
                ].map(item => (
                  <div key={item.label} className="text-center px-4 py-3 rounded-xl"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.06)'
                    }}>
                    <item.icon className="w-5 h-5 mx-auto mb-1.5 text-coral-400/80" />
                    <div className="text-[10px] text-white/60 font-medium">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />

      {/* AI Disclaimer */}
      <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 transition-all duration-1000 ${showDisclaimer ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-full"
          style={{
            background: 'rgba(5,5,8,0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(248,146,106,0.2)'
          }}>
          <Camera className="w-3.5 h-3.5 text-coral-400" />
          <span className="text-xs text-white/70">
            <strong className="text-coral-300">Privacy Notice:</strong> Images are AI-generated
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroHomepage;