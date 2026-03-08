import { ArrowRight, Phone, Calendar, MessageCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/AnimatedSection';
import { SITE } from '@/config/site';

interface CompellingCTAProps {
  variant?: 'primary' | 'secondary' | 'urgent';
  className?: string;
}

export const CompellingCTA = ({ variant = 'primary', className = '' }: CompellingCTAProps) => {
  if (variant === 'urgent') {
    return (
      <section className={`section-padding-lg bg-gradient-to-br from-primary via-accent to-primary ${className}`}>
        <div className="center-container-narrow">
          <AnimatedSection animation="scale-up">
            <div className="text-center text-white">
              <div className="inline-flex items-center gap-2 px-4 md:px-5 py-1.5 md:py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6 md:mb-8">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 animate-pulse" />
                <span className="text-xs md:text-sm font-bold uppercase tracking-wider">
                  Limited Time Offer
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">
                Get Your First Month Free
              </h2>

              <p className="text-base md:text-xl text-white/90 mb-8 md:mb-10 leading-relaxed">
                Sign up today and get complete AI scam protection free for 30 days.
                No credit card required. No strings attached.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-6 md:mb-8">
                <Button
                  asChild
                  size="lg"
                  className="h-12 md:h-14 px-6 md:px-10 text-sm md:text-base font-bold rounded-full bg-white text-primary hover:bg-white/90 shadow-xl"
                >
                  <Link to="/training#pricing">
                    Claim Free Month <ArrowRight className="ml-1 md:ml-2 w-4 h-4 md:w-5 md:h-5" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 md:h-14 px-6 md:px-10 text-sm md:text-base font-bold rounded-full border-2 border-white text-white hover:bg-white/10"
                >
                  <Link to="/contact">
                    <Phone className="mr-1 md:mr-2 w-4 h-4 md:w-5 md:h-5" />
                    Call: {SITE.phone.display}
                  </Link>
                </Button>
              </div>

              <p className="text-xs md:text-sm text-white/70">
                Join 5,000+ Ohio families already protected. Cancel anytime.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    );
  }

  if (variant === 'secondary') {
    return (
      <section className={`section-padding-lg bg-muted/30 ${className}`}>
        <div className="center-container">
          <AnimatedSection animation="fade-up">
            <div className="glass-card rounded-2xl md:rounded-3xl p-6 md:card-padding-xl max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
                {/* Left Content */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-primary/10 mb-4 md:mb-6">
                    <MessageCircle className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                    <span className="text-xs md:text-sm font-semibold text-primary uppercase tracking-wider">
                      Not Sure Where to Start?
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">
                    Let's Talk (It's Free!)
                  </h3>

                  <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6">
                    Schedule a free 15-minute consultation. We'll answer your questions
                    and help you find the right protection for your family.
                  </p>

                  <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                    <li className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-muted-foreground">
                      <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <ArrowRight className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary" />
                      </div>
                      No sales pitch—just honest advice
                    </li>
                    <li className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-muted-foreground">
                      <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <ArrowRight className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary" />
                      </div>
                      Learn exactly how we protect families
                    </li>
                    <li className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-muted-foreground">
                      <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <ArrowRight className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary" />
                      </div>
                      Get a custom security plan for your needs
                    </li>
                  </ul>

                  <Button
                    asChild
                    size="lg"
                    className="h-12 md:h-14 px-6 md:px-10 text-sm md:text-base font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white"
                  >
                    <Link to="/contact">
                      <Calendar className="mr-1 md:mr-2 w-4 h-4 md:w-5 md:h-5" />
                      Schedule Free Call
                    </Link>
                  </Button>
                </div>

                {/* Right Stats */}
                <div className="space-y-3 md:space-y-4">
                  {[
                    { number: '15', unit: 'min', label: 'Average call time' },
                    { number: '100%', unit: '', label: 'No pressure, ever' },
                    { number: '24/7', unit: '', label: 'Available when you need us' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="glass-widget rounded-xl md:rounded-2xl p-4 md:p-6 flex items-center gap-3 md:gap-4"
                    >
                      <div className="text-3xl md:text-4xl font-black text-primary">
                        {stat.number}
                        {stat.unit && <span className="text-xl md:text-2xl text-muted-foreground">{stat.unit}</span>}
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    );
  }

  // Primary variant (default)
  return (
    <section className={`section-padding-xl bg-gradient-to-b from-background to-muted/50 ${className}`}>
      <div className="center-container-narrow">
        <AnimatedSection animation="scale-up">
          <div className="glass-heavy rounded-2xl md:rounded-3xl p-6 md:card-padding-xl text-center specular-highlight">
            <div className="inline-flex items-center gap-2 px-4 md:px-5 py-1.5 md:py-2 rounded-full glass-widget mb-6 md:mb-8">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary" />
              <span className="text-xs md:text-sm font-semibold text-foreground tracking-wider uppercase">
                Ready to Get Started?
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4 md:mb-6">
              Join Ohio's Most Trusted{' '}
              <span className="gradient-text-primary">Cybersecurity Family</span>
            </h2>

            <p className="text-base md:text-xl text-muted-foreground mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto">
              Stop worrying about scams and start enjoying your devices.
              Get protected in less than 5 minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-6 md:mb-8">
              <Button
                asChild
                size="lg"
                className="h-12 md:h-16 px-6 md:px-12 text-base md:text-lg font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                <Link to="/training#pricing">
                  Get Protected Now <ArrowRight className="ml-1 md:ml-2 w-4 h-4 md:w-6 md:h-6" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 md:h-16 px-6 md:px-12 text-base md:text-lg font-bold rounded-full border-2"
              >
                <Link to="/contact">
                  Talk to Our Team
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5 md:gap-2">
                <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <ArrowRight className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary" />
                </div>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <ArrowRight className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary" />
                </div>
                <span>{SITE.moneyBackGuaranteeDays}-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <ArrowRight className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary" />
                </div>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
