import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Lightbulb, Award, Shield, GraduationCap } from "lucide-react";
import communityTraining from "@/assets/community-training.jpg";
import workshopInstructor from "@/assets/workshop-instructor.jpg";
import { HexagonIcon, GeometricCorner, DottedPattern, FloatingShapes, GridPattern } from "@/components/ui/GeometricDecorations";
const features = [{
  icon: Lightbulb,
  title: "Expert Workshops",
  description: "Learn to identify and prevent AI-powered scams with our hands-on workshops."
}, {
  icon: Award,
  title: "Certified Protection",
  description: "Industry-recognized security solutions backed by certified cybersecurity professionals."
}, {
  icon: Shield,
  title: "24/7 Monitoring",
  description: "Round-the-clock threat detection and immediate response to protect your family."
}, {
  icon: GraduationCap,
  title: "Family Education",
  description: "Empowering every family member with the knowledge to stay safe online."
}];
export const FeatureBar = () => {
  return <section className="py-24 bg-background relative overflow-hidden">
      {/* Grid pattern background */}
      <GridPattern />
      
      {/* Floating geometric shapes */}
      <FloatingShapes />
      
      {/* Geometric corner accents */}
      <GeometricCorner position="top-right" variant="dots" />
      <GeometricCorner position="bottom-left" variant="lines" />
      
      {/* Diagonal stripe decorations */}
      <div className="absolute -top-10 -right-10 w-40 h-40 pointer-events-none">
        <div className="absolute inset-0 bg-primary/5 transform skew-x-12 rotate-12" />
        <div className="absolute inset-2 bg-primary/5 transform skew-x-12 rotate-12 opacity-50" />
      </div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 pointer-events-none">
        <div className="absolute inset-0 bg-accent/5 transform -skew-x-12 -rotate-12" />
        <div className="absolute inset-2 bg-accent/5 transform -skew-x-12 -rotate-12 opacity-50" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with Images */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            {/* Angular badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wider mb-4" style={{
            clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)"
          }}>
              Why Choose Us
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Why Will You Choose{" "}
              <span className="text-primary">Our Services?</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Experience the difference of professional, veteran-supporting cybersecurity services.
            </p>
            
            {/* Dotted line decoration */}
            <DottedPattern direction="horizontal" length={6} className="mt-6" />
          </motion.div>
          
          {/* Image Grid with geometric accents */}
          <motion.div initial={{
          opacity: 0,
          x: 30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} className="flex gap-4 relative">
            {/* Connecting dotted line */}
            <DottedPattern direction="diagonal" length={5} className="absolute -top-8 left-1/2 -translate-x-1/2" />
            
            <div className="relative flex-1">
              <img 
                src={communityTraining} 
                alt="Community Training" 
                className="h-48 shadow-xl border-2 border-primary/10 rounded-2xl w-full object-cover"
                width={300}
                height={192}
                loading="lazy"
                decoding="async"
              />
              {/* Hexagon accent */}
              <div className="absolute -bottom-4 -right-4">
                <HexagonIcon size="sm" gradient>
                  <Award className="w-6 h-6 text-white" />
                </HexagonIcon>
              </div>
            </div>
            <div className="relative flex-1 mt-8">
              <img 
                src={workshopInstructor} 
                alt="Workshop Instructor" 
                className="h-48 shadow-xl border-2 border-accent/10 rounded-2xl w-full object-cover"
                width={300}
                height={192}
                loading="lazy"
                decoding="async"
              />
              {/* Corner triangle accent */}
              <div className="absolute -top-2 -left-2 w-0 h-0" style={{
              borderTop: "24px solid hsl(var(--primary))",
              borderRight: "24px solid transparent"
            }} />
            </div>
          </motion.div>
        </div>

        {/* Feature Cards with hexagon icons */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: index * 0.1
        }} className="group text-center relative">
              {/* Hexagon icon container */}
              <div className="relative inline-block mb-6">
                <HexagonIcon size="lg" animated className="mx-auto group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                </HexagonIcon>
                {/* Small decorative dots */}
                <motion.div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-accent" animate={{
              scale: [1, 1.3, 1]
            }} transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.2
            }} />
                <motion.div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-primary/50" animate={{
              scale: [1, 1.2, 1]
            }} transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: index * 0.3
            }} />
              </div>
              
              <h3 className="font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
              
              {/* Animated arrow on hover */}
              <motion.div className="mt-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity" animate={{
            x: [0, 4, 0]
          }} transition={{
            duration: 1.5,
            repeat: Infinity
          }}>
                <div className="flex items-center gap-0.5">
                  <div className="w-1.5 h-1.5 border-t-2 border-r-2 border-primary/40 rotate-45" />
                  <div className="w-1.5 h-1.5 border-t-2 border-r-2 border-primary/60 rotate-45" />
                  <div className="w-1.5 h-1.5 border-t-2 border-r-2 border-primary rotate-45" />
                </div>
              </motion.div>
            </motion.div>)}
        </div>

        {/* Stats Row with geometric styling */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="relative">
          {/* Angular shape on corners */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-accent" style={{
          clipPath: "polygon(0 0, 100% 0, 0 100%)"
        }} />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-primary/80" style={{
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)"
        }} />
          
          
        </motion.div>
      </div>
    </section>;
};
export default FeatureBar;