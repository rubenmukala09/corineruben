import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>

          {/* Text Content - Animates with image */}
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="max-w-3xl"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
                  {slides[currentIndex].title}
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed">
                  {slides[currentIndex].subtitle}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

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
    </div>
  );
};
