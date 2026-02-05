import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Eye, AlertTriangle, Target, CheckCircle, Sparkles, Play } from "lucide-react";
import seniorLearning from "@/assets/senior-learning.jpg";
 
 const services = [
   { icon: AlertTriangle, title: "Scam Prevention", desc: "Identify AI-powered scams before they strike" },
   { icon: Shield, title: "4-Step Protection", desc: "Proven methodology for digital safety" },
   { icon: Target, title: "Protection Tiers", desc: "Customized security for your needs" },
   { icon: Eye, title: "Threat Analysis", desc: "Real-time monitoring and alerts" },
 ];
 
 export const WorkshopsPromo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setVideoLoaded(true);
      video.play().catch(() => {
        // Autoplay blocked, show play button
        setVideoError(true);
      });
    };

    const handleError = () => {
      setVideoError(true);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    // Try to play immediately
    video.load();

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, []);

  const handlePlayClick = () => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(console.error);
      setVideoError(false);
    }
  };

   return (
    <section className="relative py-12 lg:py-16 bg-gradient-to-br from-background via-white to-lavender-50/20 overflow-hidden" aria-labelledby="workshops-heading">
 
       <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
           {/* Left - Image/Video Area */}
           <div className="relative">
             {/* Main Visual Container */}
             <div className="relative">
                <div className="absolute -inset-4 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-xl" aria-hidden="true" />
               
                {/* Primary Photo - Workshop Training */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-2 border-white bg-gradient-to-br from-navy-800 to-navy-900">
                  {/* Fallback image while video loads */}
                  {!videoLoaded && (
                    <img 
                      src={seniorLearning}
                      alt="Protection Training Workshop"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  
                  <video 
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                   preload="auto"
                   controls={false}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <source src="https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4" type="video/mp4" />
                  </video>
                  
                  {/* Play button overlay if autoplay fails */}
                  {videoError && (
                    <button
                      onClick={handlePlayClick}
                      className="absolute inset-0 flex items-center justify-center bg-black/30"
                      aria-label="Play video"
                    >
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <Play className="w-6 h-6 text-coral-500 ml-1" fill="currentColor" />
                      </div>
                    </button>
                  )}
               </div>

                {/* Glassmorphism Stats Badge */}
                <div className="absolute -bottom-3 -right-3 bg-white/80 dark:bg-card/80 backdrop-blur-2xl rounded-xl shadow-xl p-3 border border-white/60 dark:border-border/60">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm bg-gradient-to-br from-primary to-accent" aria-hidden="true">
                      <span className="text-white font-bold text-sm">99%</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">Success Rate</div>
                      <div className="text-xs text-muted-foreground">Satisfaction</div>
                    </div>
                  </div>
                </div>
             </div>
           </div>
 
           {/* Right - Content */}
           <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-card/70 backdrop-blur-2xl border border-white/60 dark:border-border/60 shadow-lg">
                <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
                <span className="text-sm font-semibold text-foreground uppercase tracking-wide">Learn & Train</span>
              </div>
             
             {/* Headline */}
             <h2 id="workshops-heading" className="text-3xl md:text-4xl font-black text-[#18305A] leading-tight"
               style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
               Reason For Choosing Our{" "}
               <span className="bg-gradient-to-r from-coral-500 to-lavender-500 bg-clip-text text-transparent">
                 Protection Training
               </span>
             </h2>
             
             <p className="text-base text-foreground/60 leading-relaxed">
                Scammers now use deepfakes and voice cloning. Our expert-led workshops teach you to recognize and stop these sophisticated threats.
             </p>
 
             {/* Stats Row */}
             <div className="flex items-center gap-6 py-2">
               <div className="text-center">
                  <div className="text-3xl font-black text-[#18305A]" style={{ fontFamily: "'Clash Display', sans-serif" }}>100+</div>
                 <div className="text-sm text-foreground/50">Families Protected</div>
               </div>
               <div className="h-10 w-px bg-gray-200" aria-hidden="true" />
               <div className="text-center">
                 <div className="text-3xl font-black text-coral-500" style={{ fontFamily: "'Clash Display', sans-serif" }}>100%</div>
                 <div className="text-sm text-foreground/50">Satisfaction Rate</div>
               </div>
             </div>
             
             {/* Services Grid */}
             <div className="grid grid-cols-2 gap-3" role="list" aria-label="Services">
               {services.map((service, i) => (
                 <div 
                   key={service.title}
                   role="listitem"
                   className="flex items-start gap-2"
                 >
                   <CheckCircle className="w-4 h-4 text-coral-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                   <span className="text-sm font-medium text-foreground/70">{service.title}</span>
                 </div>
               ))}
             </div>
 
             {/* CTA */}
             <div className="pt-2">
               <Button asChild size="lg"
                 className="h-12 px-6 text-sm font-bold rounded-full shadow-md"
                 style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }}>
                 <Link to="/training" className="text-white">
                   Discover More
                   <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                 </Link>
               </Button>
             </div>
           </div>
         </div>
       </div>
     </section>
   );
 };