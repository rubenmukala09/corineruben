 import { useState } from "react";
 import { Link } from "react-router-dom";
 import Navigation from "@/components/Navigation";
 import Footer from "@/components/Footer";
 import { HeroHomepage } from "@/components/HeroHomepage";
 import { WorkshopsPromo } from "@/components/home/WorkshopsPromo";
 import { AIBusinessPromo } from "@/components/home/AIBusinessPromo";
 import { ResourcesPromo } from "@/components/home/ResourcesPromo";
 import { CommunityImpact } from "@/components/home/CommunityImpact";
 import { WorkingProcess } from "@/components/home/WorkingProcess";
 import { ScamAlertsSection } from "@/components/home/ScamAlertsSection";
 import { FAQPreview } from "@/components/home/FAQPreview";
 import { QuickLinksSection } from "@/components/home/QuickLinksSection";
 import CTASection from "@/components/CTASection";
 import { ScamShieldSubmission } from "@/components/ScamShieldSubmission";
 import { PageTransition } from "@/components/PageTransition";
 import { Button } from "@/components/ui/button";
 import { SEO, PAGE_SEO } from "@/components/SEO";
 import { SectionNav } from "@/components/SectionNav";
 import seniorCoupleActive from "@/assets/senior-couple-active.jpg";
 import { PremiumGlassmorphismWidgets } from "@/components/home/PremiumGlassmorphismWidgets";
import { SkeuomorphicSection } from "@/components/backgrounds/SkeuomorphicSection";
 
 const Index = () => {
   const [scamShieldOpen, setScamShieldOpen] = useState(false);
   
   return (
     <PageTransition variant="fade">
       <div className="min-h-screen bg-background">
         <SEO {...PAGE_SEO.home} />
         <Navigation />
         <SectionNav />
         <main id="main-content">
           {/* Hero Section */}
           <section id="hero">
             <HeroHomepage />
           </section>
           
           {/* Workshops Promo - Learn & Train Introduction */}
          <SkeuomorphicSection id="workshops" className="pt-1" variant="coral">
             <WorkshopsPromo />
          </SkeuomorphicSection>
           
           {/* AI & Business Promo */}
          <SkeuomorphicSection id="business" className="pt-1" variant="lavender">
             <AIBusinessPromo />
          </SkeuomorphicSection>
           
           {/* Current Scam Alerts - Immediate Value */}
          <SkeuomorphicSection id="alerts" className="pt-1" variant="coral">
             <ScamAlertsSection />
          </SkeuomorphicSection>
           
           {/* Resources Promo */}
          <SkeuomorphicSection id="resources" className="pt-1" variant="mixed">
             <ResourcesPromo />
          </SkeuomorphicSection>
           
 
           {/* Premium Glassmorphism Widgets */}
          <SkeuomorphicSection id="trust-widgets" className="pt-1" variant="lavender">
             <PremiumGlassmorphismWidgets />
          </SkeuomorphicSection>
 
           {/* Community Impact - Veteran Support, Cancer Children, etc. */}
          <SkeuomorphicSection id="community" className="pt-1" variant="coral">
             <CommunityImpact />
          </SkeuomorphicSection>
 
           {/* Working Process - How It Works */}
          <SkeuomorphicSection id="process" className="pt-1" variant="mixed">
             <WorkingProcess />
          </SkeuomorphicSection>
 
           {/* FAQ Section */}
          <SkeuomorphicSection id="faq" className="pt-1" variant="lavender">
             <FAQPreview />
          </SkeuomorphicSection>
 
           {/* Quick Links - FAQ, Contact, Careers */}
          <SkeuomorphicSection id="quick-links" className="pt-1" variant="neutral">
             <QuickLinksSection />
          </SkeuomorphicSection>
 
           {/* Final CTA with Senior Couple Image */}
           <CTASection headline="Join Our Protected Community" variant="image" backgroundImage={seniorCoupleActive}>
             <p className="text-xl text-white/90 mb-8">Join families across Ohio who live confidently, knowing they're protected from AI scams.</p>
             <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center">
               <Button asChild size="lg" 
                 className="h-14 px-8 text-base font-bold rounded-full"
                 style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }}>
                 <Link to="/training#pricing" className="text-white">Get Protected Today</Link>
               </Button>
               <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base font-bold rounded-full border-2 border-white/30 text-white hover:bg-white/10">
                 <Link to="/business">Business Solutions</Link>
               </Button>
             </div>
             <p className="text-white/80 mt-6 text-sm">
               ✓ 10% Veteran Discount ✓ HIPAA Compliant ✓ 30-Day Money-Back Guarantee
             </p>
           </CTASection>
 
           <Footer />
           
           <ScamShieldSubmission open={scamShieldOpen} onOpenChange={setScamShieldOpen} />
         </main>
       </div>
     </PageTransition>
   );
 }
 
 export default Index;
