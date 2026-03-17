import { Check, X, Zap } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';
import { SITE } from '@/config/site';

const comparisonData = [
  {
    feature: 'Real Human Support (24/7)',
    us: true,
    others: false,
  },
  {
    feature: 'No Tech Jargon—Plain English',
    us: true,
    others: false,
  },
  {
    feature: 'Local Ohio-Based Team',
    us: true,
    others: false,
  },
  {
    feature: 'Veteran & Senior Discounts',
    us: true,
    others: 'Sometimes',
  },
  {
    feature: 'AI Scam Detection',
    us: true,
    others: 'Limited',
  },
  {
    feature: 'Hands-On Training Included',
    us: true,
    others: 'Extra Cost',
  },
  {
    feature: 'Same-Day Threat Response',
    us: true,
    others: '24-48 hours',
  },
  {
    feature: 'Money-Back Guarantee',
    us: `${SITE.moneyBackGuaranteeDays} days`,
    others: '7-14 days',
  },
];

export const ComparisonSection = () => {
  return (
    <section className="section-padding-lg bg-gradient-to-b from-muted/30 to-background">
      <div className="center-container">
        {/* Header */}
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-widget mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground tracking-wider uppercase">
                The Difference is Clear
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Why Families Choose{' '}
              <span className="gradient-text-primary">{SITE.name}</span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're not like other cybersecurity companies. Here's exactly what makes us different.
            </p>
          </div>
        </AnimatedSection>

        {/* Comparison Table */}
        <AnimatedSection animation="fade-up" delay={100}>
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-2xl md:rounded-3xl overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-3 gap-2 md:gap-4 p-3 md:p-6 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-b border-border/50">
                <div className="text-[10px] md:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Feature
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 rounded-full bg-gradient-to-r from-primary to-accent">
                    <span className="text-[10px] md:text-sm font-bold text-white uppercase tracking-wider">
                      Us
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="inline-block px-2 md:px-4 py-1 md:py-2 rounded-full bg-muted">
                    <span className="text-[10px] md:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Others
                    </span>
                  </div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-border/30">
                {comparisonData.map((item, index) => (
                  <div
                    key={item.feature}
                    className="grid grid-cols-3 gap-2 md:gap-4 p-3 md:p-6 items-center hover:bg-muted/30 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {/* Feature Name */}
                    <div className="text-xs md:text-base font-medium text-foreground">
                      {item.feature}
                    </div>

                    {/* Us */}
                    <div className="text-center">
                      {item.us === true ? (
                        <div className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10">
                          <Check className="w-4 h-4 md:w-6 md:h-6 text-primary" strokeWidth={3} />
                        </div>
                      ) : (
                        <span className="text-[10px] md:text-sm font-semibold text-primary">
                          {item.us}
                        </span>
                      )}
                    </div>

                    {/* Others */}
                    <div className="text-center">
                      {item.others === false ? (
                        <div className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-muted">
                          <X className="w-4 h-4 md:w-6 md:h-6 text-muted-foreground" strokeWidth={2} />
                        </div>
                      ) : (
                        <span className="text-[10px] md:text-sm text-muted-foreground">
                          {item.others}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Bottom Message */}
        <AnimatedSection animation="scale-up" delay={200}>
          <div className="mt-12 text-center max-w-3xl mx-auto">
            <div className="glass-widget rounded-2xl p-8">
              <p className="text-lg text-muted-foreground mb-4">
                <strong className="text-foreground">Bottom Line:</strong> You deserve protection
                that actually works, from people who actually care. That's what we deliver every day.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-primary font-semibold">
                <Zap className="w-4 h-4" />
                <span>Join 5,000+ families who made the switch</span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
