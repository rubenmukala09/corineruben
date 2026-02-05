import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, Bot, Globe, ArrowRight, TrendingUp, Zap, CheckCircle, Award, Sparkles } from "lucide-react";
import consultingTeamStrategy from "@/assets/consulting-team-strategy.jpg";
import teamOfficeDiscussion from "@/assets/team-office-discussion.jpg";
 
 const services = [
   { icon: Phone, title: "AI Receptionist", desc: "Never miss a call", highlight: "24/7" },
   { icon: Calendar, title: "Smart Scheduling", desc: "Automated bookings", highlight: "Auto" },
   { icon: Bot, title: "AI Automation", desc: "Custom workflows", highlight: "ROI" },
 ];
 
 const features = [
   "Digital Marketing",
   "Search Engine Optimization",
   "E-Commerce Solutions",
   "AI Consultation",
 ];
 
export const AIBusinessPromo = () => {
   return (
   <section className="relative py-12 lg:py-16 bg-gradient-to-br from-background via-white to-lavender-50/20" aria-labelledby="business-heading">
       <div className="container mx-auto px-4 lg:px-8 relative z-10">
         {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-card/70 backdrop-blur-2xl border border-white/60 dark:border-border/60 shadow-lg mb-4">
             <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
              <span className="text-sm font-semibold text-foreground uppercase tracking-wide">AI & Business</span>
           </div>
         <h2 id="business-heading" className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground leading-tight mb-3"
             style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
             Choice Business <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Needs</span>
           </h2>
         <p className="text-lg text-muted-foreground max-w-xl mx-auto">
             Transform your business with AI-powered automation. Solutions that work 24/7 so you never miss an opportunity.
           </p>
        </div>
 
         {/* Services Cards Grid with Glassmorphism */}
        <div className="grid md:grid-cols-3 gap-5 mb-12" role="list" aria-label="Business services">
           {services.map((service) => (
            <div 
               key={service.title}
              role="listitem"
              className="group relative bg-white/70 dark:bg-card/70 backdrop-blur-2xl rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/60 dark:border-border/60 hover:scale-[1.02]"
             >
               {/* Highlight Badge */}
              <div className="absolute -top-2 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-xs font-bold text-white shadow-md">
                 {service.highlight}
               </div>
               
              <div className="w-12 h-12 rounded-xl bg-white/60 dark:bg-card/60 backdrop-blur-sm flex items-center justify-center mb-4 border border-white/50" aria-hidden="true">
                <service.icon className="w-6 h-6 text-primary" />
               </div>
               
              <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm mb-3">{service.desc}</p>
               
              <Link to="/business" className="inline-flex items-center text-primary font-semibold text-sm hover:text-accent transition-colors">
                 Learn More
                <ArrowRight className="w-3 h-3 ml-1" aria-hidden="true" />
               </Link>
            </div>
           ))}
         </div>
 
         {/* Bottom Two-Column Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
           {/* Left - Content */}
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-black text-[#18305A] leading-tight"
               style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
              Our Team{" "}
              <span className="bg-gradient-to-r from-lavender-500 to-coral-500 bg-clip-text text-transparent">—</span>{" "}
               Choosing Our Strike{" "}
               <span className="bg-gradient-to-r from-lavender-500 to-coral-500 bg-clip-text text-transparent">Consultancy</span>
             </h3>
            <p className="text-sm font-semibold text-coral-500">Dedicated Consulting Team</p>
             
            <p className="text-foreground/60 leading-relaxed text-sm">
               With more than 7 years of expertise in design and digital transformation, we are committed to providing our customers with exceptional service and measurable results.
             </p>
 
             {/* Experience Badge */}
            <div className="flex items-end gap-3 py-2">
              <div className="text-5xl font-black text-[#18305A] leading-none" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                 4<span className="text-coral-500">+</span>
               </div>
              <div className="pb-1">
                <div className="text-xs font-bold text-foreground/40 uppercase">Years</div>
                <div className="text-base font-bold text-[#18305A]">Experience</div>
               </div>
             </div>
             
             {/* Features List */}
            <div className="grid grid-cols-2 gap-2" role="list" aria-label="Services offered">
               {features.map((feature, i) => (
                <div 
                   key={feature}
                  role="listitem"
                  className="flex items-center gap-1.5"
                 >
                  <CheckCircle className="w-4 h-4 text-coral-500 flex-shrink-0" aria-hidden="true" />
                   <span className="text-sm font-medium text-foreground/70">{feature}</span>
                </div>
               ))}
             </div>
 
             {/* CTA and Contact */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
               <Button asChild size="lg"
                className="h-12 px-6 text-sm font-bold rounded-full shadow-lg shadow-lavender-400/30 hover:shadow-xl hover:shadow-lavender-400/40 transition-all"
                 style={{ background: 'linear-gradient(135deg, #BB81B5 0%, #F8926A 100%)' }}>
                 <Link to="/business" className="text-white">
                   Discover More
                   <ArrowRight className="ml-2 w-5 h-5" />
                 </Link>
               </Button>
               <div className="text-foreground/50 text-sm">
                 <span className="font-medium text-[#18305A]">+1 (937) 974-5682</span>
               </div>
             </div>
          </div>
 
           {/* Right - Image Grid */}
          <div className="relative">
             <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-lavender-200/40 via-coral-100/30 to-white opacity-90" aria-hidden="true" />
              
             <div className="relative grid grid-cols-2 gap-2">
                 {/* Main Image - Strategy Meeting */}
                <img 
                src={consultingTeamStrategy}
                alt="Professional consulting team strategy meeting"
                 className="col-span-2 aspect-[16/9] shadow-lg border-2 border-white rounded-xl w-full h-full object-cover"
                 width={600}
                 height={338}
                  loading="lazy"
                  decoding="async"
                />
               
                 {/* Consulting Team Discussion */}
                <img 
                src={teamOfficeDiscussion}
                  alt="Dedicated consulting team in modern office"
                 className="aspect-[4/3] shadow-md border-2 border-white rounded-lg w-full h-full object-cover"
                 width={200}
                 height={150}
                  loading="lazy"
                  decoding="async"
                />
                
                 {/* Expert Team Working */}
                <img 
                src={consultingTeamStrategy}
                  alt="Expert team strategic planning"
                 className="aspect-[4/3] shadow-md border-2 border-white rounded-lg w-full h-full object-cover"
                 width={200}
                 height={150}
                  loading="lazy"
                  decoding="async"
                />
             </div>
 
             {/* Floating ROI Card */}
            <div className="absolute -bottom-2 -left-2 bg-white/95 rounded-lg shadow-lg p-2.5 border border-lavender-200/50">
              <div className="text-xl font-black text-coral-500" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                 340%
               </div>
              <div className="text-xs text-foreground/50 font-medium">Avg. ROI</div>
            </div>
              
              {/* Premium Badge */}
             <div className="absolute top-1.5 right-1.5 bg-white/95 rounded-full shadow-md px-2 py-0.5 border border-lavender-200/50">
               <div className="flex items-center gap-1" aria-label="AI Powered">
                 <Sparkles className="w-2.5 h-2.5 text-lavender-500" aria-hidden="true" />
                  <span className="text-xs font-bold text-[#18305A]">AI Powered</span>
                </div>
             </div>
          </div>
         </div>
       </div>
     </section>
   );
 };