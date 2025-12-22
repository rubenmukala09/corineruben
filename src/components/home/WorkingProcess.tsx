import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Provide Your Details",
    description: "Share your contact info with any specific security concerns or questions you have.",
  },
  {
    step: "02",
    title: "Pick A Suitable Plan",
    description: "Our experts recommend the best protection package based on your unique needs.",
  },
  {
    step: "03",
    title: "We Assess Channels",
    description: "We analyze your digital footprint and identify potential vulnerabilities.",
  },
  {
    step: "04",
    title: "You Enjoy & Relax",
    description: "Rest easy knowing your family is protected with 24/7 monitoring and support.",
  },
];

export const WorkingProcess = () => {
  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 100px,
            currentColor 100px,
            currentColor 101px
          )`
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Get Protected in{" "}
            <span className="font-serif italic text-primary">Four</span>{" "}
            <span className="text-primary">Steps</span>
          </h2>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative text-center group"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/30 to-primary/10" />
              )}

              {/* Step number */}
              <motion.div
                className="relative inline-block mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mx-auto shadow-lg">
                  {step.step}
                </div>
              </motion.div>

              <h3 className="text-lg font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkingProcess;
