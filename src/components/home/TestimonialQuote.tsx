import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import testimonialImage from "@/assets/testimonial-1.jpg";

export const TestimonialQuote = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary/95 to-primary/90 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full" />
        <div className="absolute bottom-10 right-10 w-60 h-60 border border-white rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-20 h-20 border border-white rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={testimonialImage}
                  alt="Happy protected customer"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Play button overlay */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-0 h-0 border-l-[20px] border-l-white border-y-[12px] border-y-transparent ml-1" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Quote */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-semibold mb-6">
              Client Testimonial
            </span>

            <div className="relative mb-8">
              <Quote className="absolute -top-4 -left-4 w-12 h-12 text-white/20" />
              <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed pl-8">
                InVision Network saved my mother from losing $15,000 to a grandparent scam. Their
                training helped our whole family recognize the warning signs. We're forever
                grateful.
              </blockquote>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-2xl font-bold">MA</span>
              </div>
              <div>
                <div className="font-bold text-lg">Mary Anderson</div>
                <div className="text-white/70">Dayton, Ohio</div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-white/20">
              <div>
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-white/70">Families Protected</div>
              </div>
              <div>
                <div className="text-3xl font-bold">$2M+</div>
                <div className="text-sm text-white/70">Scams Prevented</div>
              </div>
              <div>
                <div className="text-3xl font-bold">24hr</div>
                <div className="text-sm text-white/70">Response Time</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialQuote;
