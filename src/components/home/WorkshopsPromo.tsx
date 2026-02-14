import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Eye, AlertTriangle, Target, CheckCircle, Play } from "lucide-react";
import seniorLearning from "@/assets/protection-training-workshop.jpg";
import trainingVideo from "@/assets/training-workshop-video.mp4";

const services = [
  { icon: AlertTriangle, title: "Scam Prevention", desc: "Identify AI-powered scams before they strike" },
  { icon: Shield, title: "4-Step Protection", desc: "Proven methodology for digital safety" },
  { icon: Target, title: "Protection Tiers", desc: "Customized security for your needs" },
  { icon: Eye, title: "Threat Analysis", desc: "Real-time monitoring and alerts" },
];

export const WorkshopsPromo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const target = mediaRef.current;
    if (!target) { setShouldLoad(true); return; }
    if (!("IntersectionObserver" in window)) { setShouldLoad(true); return; }
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0]?.isIntersecting) { setShouldLoad(true); observer.disconnect(); } },
      { rootMargin: "150px" }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    setVideoError(false);
    const video = videoRef.current;
    if (!video) return;
    const handleCanPlay = () => {
      setVideoLoaded(true);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVideoError(true); return; }
      video.play().catch(() => setVideoError(true));
    };
    const handleError = () => setVideoError(true);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);
    video.load();
    return () => { video.removeEventListener("canplay", handleCanPlay); video.removeEventListener("error", handleError); };
  }, [shouldLoad]);

  return (
    <section className="py-16 lg:py-20" aria-labelledby="workshops-heading">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Label */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-5">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary">Learn & Train</span>
          </div>
          <h2 id="workshops-heading" className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground leading-tight mb-3">
            Reason For Choosing Our{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Protection Training</span>
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            Scammers now use deepfakes and voice cloning. Our expert-led workshops teach you to recognize and stop these sophisticated threats.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
          {/* Left - Media */}
          <div className="relative" ref={mediaRef}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/60 shadow-lg">
              {(!shouldLoad || !videoLoaded) && (
                <img src={seniorLearning} alt="Protection Training Workshop" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
              )}
              {shouldLoad && (
                <video ref={videoRef} autoPlay muted loop playsInline preload="metadata" controls={false} poster={seniorLearning}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${videoLoaded ? "opacity-100" : "opacity-0"}`}>
                  <source src={trainingVideo} type="video/mp4" />
                </video>
              )}
              {videoError && (
                <button onClick={() => { videoRef.current?.play().catch(console.error); setVideoError(false); }}
                  className="absolute inset-0 flex items-center justify-center bg-foreground/20" aria-label="Play video">
                  <div className="w-16 h-16 rounded-full bg-card flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-primary ml-1" fill="currentColor" />
                  </div>
                </button>
              )}
            </div>
            {/* Stats badge */}
            <div className="absolute -bottom-4 -right-4 bg-card rounded-xl border border-border/60 shadow-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-white font-black text-sm">99%</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">Success Rate</div>
                  <div className="text-xs text-muted-foreground">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            {/* Stats Row */}
            <div className="flex items-center gap-8">
              <div>
                <div className="text-4xl font-black text-foreground">100+</div>
                <div className="text-sm text-muted-foreground">Families Protected</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-4xl font-black text-accent">100%</div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-2 gap-4" role="list" aria-label="Services">
              {services.map((service) => (
                <div key={service.title} role="listitem" className="flex items-start gap-3 p-3 rounded-xl bg-card border border-border/40 hover:border-primary/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">{service.title}</div>
                    <div className="text-xs text-muted-foreground">{service.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Button asChild size="lg" className="h-12 px-8 text-sm font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 transition-opacity">
              <Link to="/training">
                Learn More <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
