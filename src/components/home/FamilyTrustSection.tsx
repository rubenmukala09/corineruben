import { motion } from "framer-motion";
import { Shield, Users, Award, CheckCircle } from "lucide-react";

const stats = [
  { icon: Users, value: "5,000+", label: "Ohio Families Protected" },
  { icon: Shield, value: "99.2%", label: "Threat Detection Rate" },
  { icon: Award, value: "4.9/5", label: "Customer Rating" },
];

const trustPoints = [
  "24/7 Real-time monitoring & alerts",
  "Dedicated Ohio-based support team",
  "10% Veteran discount on all services",
  "30-day money-back guarantee",
];

export const FamilyTrustSection = () => {
  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-white via-lavender-50/30 to-coral-50/20">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#18305A] leading-tight mb-3"
            style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
            Why Families{" "}
            <span className="bg-gradient-to-r from-coral-500 to-lavender-500 bg-clip-text text-transparent">
              Trust Us
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Real Protection, Real Results — Join thousands of Ohio families who trust us with their digital safety every day.
          </p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-coral-100 to-lavender-100 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-coral-500" />
              </div>
              <div className="text-3xl font-black text-[#18305A] mb-1" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                {stat.value}
              </div>
              <div className="text-sm text-foreground/60">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Trust Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#18305A] to-[#2a4a7a] rounded-2xl p-6 lg:p-8"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trustPoints.map((point, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-coral-400 flex-shrink-0" />
                <span className="text-white/90 text-sm font-medium">{point}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};