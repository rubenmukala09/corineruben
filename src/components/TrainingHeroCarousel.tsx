import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { ParticleBackground } from "./ParticleBackground";
import { FloatingShapes } from "./FloatingShapes";
import trainingHero1 from "@/assets/hero-training-1.jpg";
import trainingHero2 from "@/assets/hero-training-2.jpg";
import trainingHero3 from "@/assets/hero-training-3.jpg";
import trainingHero4 from "@/assets/hero-training-4.jpg";
import trainingHero5 from "@/assets/hero-training-5.jpg";

interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
}

const slides: HeroSlide[] = [
  {
    image: trainingHero1,
    title: "Protect Your Family with Expert Training",
    subtitle: "Learn to identify and prevent AI-powered scams targeting seniors and families"
  },
  {
    image: trainingHero2,
    title: "Comprehensive Scam Prevention Programs",
    subtitle: "Interactive workshops designed for all skill levels and age groups"
  },
  {
    image: trainingHero3,
    title: "Real-World Scenarios & Hands-On Practice",
    subtitle: "Practice detecting scams in safe, guided environments with expert trainers"
  },
  {
    image: trainingHero4,
    title: "Certification & Ongoing Support",
    subtitle: "Receive digital certificates and 30-day email support after completion"
  },
  {
    image: trainingHero5,
    title: "Group & Private Training Available",
    subtitle: "Choose from standard group sessions or customized private training for your organization"
  }
];

export const TrainingHeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-full h-[600px] md:h-[700px] lg:h-[850px] xl:h-[950px] overflow-hidden bg-background">
      {/* Preload next image to prevent blank moments */}
      <div className="hidden">
        <img src={slides[(currentIndex + 1) % slides.length].image} alt="preload" />
      </div>
      
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center brightness-115"
            style={{ 
              backgroundImage: `url(${slides[currentIndex].image})`,
              backgroundColor: '#ffffff'
            }}
          >
            {/* Purple gradient overlay matching Business page */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/35 to-black/45" />
          </div>

          {/* Text Content - Animates with image */}
          <div className="relative h-full flex items-center z-10">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 1, delay: 0.1 }}
                className="max-w-3xl"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-lg [text-shadow:0_4px_20px_rgba(139,92,246,0.4)]">
                  {slides[currentIndex].title}
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/90 leading-relaxed drop-shadow-md">
                  {slides[currentIndex].subtitle}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Particle Network Background */}
      <ParticleBackground />
      
      {/* Floating Abstract Shapes */}
      <FloatingShapes />
      
      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block" style={{ zIndex: 1 }}>
        <div className="floating-orb" style={{ width: '150px', height: '150px', top: '20%', left: '10%', animationDelay: '0s' }} />
        <div className="floating-orb" style={{ width: '100px', height: '100px', top: '60%', right: '15%', animationDelay: '4s' }} />
        <div className="floating-orb" style={{ width: '120px', height: '120px', bottom: '25%', left: '40%', animationDelay: '8s' }} />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 animate-smooth-bounce md:bottom-24">
        <button
          onClick={() => window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' })}
          className="flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors duration-300"
          aria-label="Scroll down to see more content"
        >
          <span className="text-sm font-medium tracking-wider">SCROLL</span>
          <div className="w-8 h-8 rounded-full border-2 border-white/50 hover:border-white flex items-center justify-center">
            <ChevronDown className="w-5 h-5" />
          </div>
        </button>
      </div>
    </div>
  );
};
