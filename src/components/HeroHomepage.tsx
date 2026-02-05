 import { Link } from "react-router-dom";
 import { Button } from "@/components/ui/button";
 import { Shield, CheckCircle, ArrowRight } from "lucide-react";
 import heroImage from "@/assets/hero-community-protected.jpg";
 
 export const HeroHomepage = () => {
   return (
     <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-primary">
       {/* Background Image */}
       <div className="absolute inset-0">
         <img
           src={heroImage}
           alt="Protected family"
           className="w-full h-full object-cover opacity-40"
           loading="eager"
           decoding="async"
         />
         <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
       </div>
 
       {/* Content */}
       <div className="container mx-auto px-4 lg:px-8 relative z-10 py-16 lg:py-24">
         <div className="max-w-3xl">
           {/* Badge */}
           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
             <Shield className="w-4 h-4 text-accent" />
             <span className="text-sm font-medium text-white">Ohio's #1 AI Scam Protection</span>
           </div>
 
           {/* Headline */}
           <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
             Protect What{" "}
             <span className="text-accent">Matters Most</span>
             <br />
             From AI Scams
           </h1>
 
           {/* Subheadline */}
           <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
             Enterprise-grade digital protection for families and businesses. 
             Stay safe from deepfakes, phishing, and AI-powered fraud.
           </p>
 
           {/* Trust Points */}
           <div className="flex flex-wrap gap-4 mb-8">
             {["10% Veteran Discount", "HIPAA Compliant", "30-Day Guarantee"].map((point) => (
               <div key={point} className="flex items-center gap-2 text-white/80 text-sm">
                 <CheckCircle className="w-4 h-4 text-accent" />
                 <span>{point}</span>
               </div>
             ))}
           </div>
 
           {/* CTA Buttons */}
           <div className="flex flex-col sm:flex-row gap-4">
             <Button
               asChild
               size="lg"
               className="h-12 px-6 text-white font-semibold"
               style={{ background: "linear-gradient(135deg, hsl(18 92% 62%) 0%, hsl(308 28% 61%) 100%)" }}
             >
               <Link to="/training#pricing" className="flex items-center gap-2">
                 Get Protected Today
                 <ArrowRight className="w-4 h-4" />
               </Link>
             </Button>
             <Button
               asChild
               variant="outline"
               size="lg"
               className="h-12 px-6 border-white/30 text-white hover:bg-white/10"
             >
               <Link to="/business">Business Solutions</Link>
             </Button>
           </div>
         </div>
       </div>
     </section>
   );
 };