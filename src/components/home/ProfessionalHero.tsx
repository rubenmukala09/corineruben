import { motion } from "framer-motion";
import { ArrowRight, Shield, CheckCircle, Play } from "lucide-react";
import { Link } from "react-router-dom";
import familyLivingRoom from "@/assets/family-living-room-natural.jpg";

/**
 * Professional Hero Section - InnovaAI-inspired
 *
 * Features:
 * - Clean, sharp design with high contrast
 * - Integrated layout (not floating elements)
 * - Professional typography hierarchy
 * - Clear CTAs with visual hierarchy
 * - Optimized for senior readability
 */

export const ProfessionalHero = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Subtle decorative gradient (top accent only) */}
      <div className="absolute inset-0 bg-gradient-to-br from-coral-50/30 via-transparent to-lavender-50/30 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20 md:py-28 lg:py-32">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-coral-100 to-lavender-100 text-coral-600 px-4 py-2 rounded-full mb-6 shadow-sm"
            >
              <Shield className="w-4 h-4" />
              <span className="font-display text-sm font-bold">
                Trusted by 500+ Ohio Families
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-[#18305A] leading-[1.1] mb-6"
            >
              Protect Your Family from{" "}
              <span className="bg-gradient-to-r from-coral-500 to-lavender-500 bg-clip-text text-transparent">
                AI Scams
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-body text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-xl"
            >
              Professional cybersecurity training and AI-powered protection for
              seniors and families in Ohio. Stay safe from deepfakes, phishing,
              and online fraud.
            </motion.p>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 mb-10"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="font-body text-sm text-gray-600">
                  30-Day Guarantee
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="font-body text-sm text-gray-600">
                  Free Consultation
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="font-body text-sm text-gray-600">
                  Expert Support
                </span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {/* Primary CTA */}
              <Link
                to="/training#pricing"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-white font-bold text-base shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-300 group"
                style={{
                  background:
                    "linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)",
                }}
              >
                Get Protected Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Secondary CTA */}
              <button className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white border-2 border-gray-200 text-[#18305A] font-bold text-base shadow-sm hover:shadow-md hover:border-coral-300 transition-all duration-300 group">
                <Play className="w-5 h-5 text-coral-500" />
                Watch Demo
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={familyLivingRoom}
                alt="Family protected from online scams"
                className="w-full h-full object-cover"
                loading="eager"
              />

              {/* Image Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#18305A]/20 via-transparent to-transparent" />
            </div>

            {/* Floating Stats Card (Embedded, not separate) */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 shadow-xl"
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="font-display text-2xl md:text-3xl font-black text-[#18305A] mb-1">
                    99.8%
                  </div>
                  <div className="font-body text-xs text-gray-600 uppercase font-medium">
                    Success Rate
                  </div>
                </div>
                <div>
                  <div className="font-display text-2xl md:text-3xl font-black text-[#18305A] mb-1">
                    500+
                  </div>
                  <div className="font-body text-xs text-gray-600 uppercase font-medium">
                    Families
                  </div>
                </div>
                <div>
                  <div className="font-display text-2xl md:text-3xl font-black text-[#18305A] mb-1">
                    24/7
                  </div>
                  <div className="font-body text-xs text-gray-600 uppercase font-medium">
                    Monitoring
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm border border-gray-100 rounded-full px-4 py-2 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span className="font-display text-sm font-bold text-[#18305A]">
                  Verified Safe
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalHero;
