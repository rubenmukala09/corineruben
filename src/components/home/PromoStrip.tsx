import { Link } from "react-router-dom";
import { ArrowRight, Shield, Clock, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";

export const PromoStrip = () => {
  return (
    <section className="py-6 sm:py-10 md:py-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-primary via-primary/90 to-accent p-5 sm:p-6 md:p-10 text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-40 sm:w-64 h-40 sm:h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-32 sm:w-48 h-32 sm:h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
          </div>

          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-center">
              {/* Left — Copy */}
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black leading-tight mb-2 sm:mb-3">
                  Limited Time: Get Your Family Protected at Our Best Price
                </h3>
                <p className="text-white/80 text-xs sm:text-sm md:text-base mb-4 sm:mb-5 max-w-md">
                  Every day without protection is a risk. Start today and lock in our lowest rate with a {SITE.moneyBackGuaranteeDays}-day money-back guarantee.
                </p>

                <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                  <Button asChild size="lg" className="h-11 sm:h-12 px-6 sm:px-8 text-xs sm:text-sm font-bold rounded-full bg-white text-primary hover:bg-white/90 shadow-lg w-full sm:w-auto">
                    <Link to="/training#pricing">
                      View Protection Plans <ArrowRight className="ml-2 w-3.5 sm:w-4 h-3.5 sm:h-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-11 sm:h-12 px-6 sm:px-8 text-xs sm:text-sm font-bold rounded-full border-2 border-white/30 text-white hover:bg-white/10 w-full sm:w-auto">
                    <Link to="/business">Business Plans</Link>
                  </Button>
                </div>
              </div>

              {/* Right — Value props */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { icon: Shield, title: "Full Coverage", desc: "All devices protected" },
                  { icon: Clock, title: "Same-Day Setup", desc: "Protected in minutes" },
                  { icon: Percent, title: `${SITE.veteranDiscountPercent}% Off`, desc: "Veterans & Seniors" },
                ].map((item) => (
                  <div key={item.title} className="rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 p-3 sm:p-4 text-center">
                    <item.icon className="w-5 sm:w-6 h-5 sm:h-6 mx-auto mb-1.5 sm:mb-2 text-white/90" />
                    <div className="text-xs sm:text-sm font-bold">{item.title}</div>
                    <div className="text-[10px] sm:text-xs text-white/70 hidden sm:block">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoStrip;
