import { Clock, Zap, Gift, ThumbsUp } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';

const quickWins = [
  {
    icon: Zap,
    time: '5 Minutes',
    title: 'Instant Protection Starts',
    description: 'Sign up and our AI starts monitoring for threats immediately. No waiting, no complicated setup.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Gift,
    time: 'Day 1',
    title: 'First Training Session',
    description: 'Access your welcome training video that shows you exactly what to watch for. Simple, clear, and only 10 minutes long.',
    color: 'from-primary to-accent',
  },
  {
    icon: ThumbsUp,
    time: 'Week 1',
    title: 'First Threat Blocked',
    description: 'On average, we block your first scam attempt within the first week. You\'ll get an alert showing exactly what we stopped.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Clock,
    time: 'Month 1',
    title: 'Complete Peace of Mind',
    description: 'After 30 days, most families report feeling completely confident using their devices. That\'s our goal for you too.',
    color: 'from-violet-500 to-purple-600',
  },
];

export const QuickWinsSection = () => {
  return (
    <section className="section-padding-lg bg-gradient-to-b from-muted/30 to-background">
      <div className="center-container">
        {/* Header */}
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-widget mb-6">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-semibold text-foreground tracking-wider uppercase">
                See Results Fast
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              What Happens After You{' '}
              <span className="gradient-text-primary">Sign Up</span>
            </h2>

            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Protection starts immediately, and benefits stack up fast. Here's your first month:
            </p>
          </div>
        </AnimatedSection>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical Line (hidden on mobile, shown on larger screens) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary opacity-20 transform -translate-x-1/2" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {quickWins.map((win, index) => (
                <AnimatedSection
                  key={win.title}
                  animation="fade-up"
                  delay={index * 100}
                >
                  <div
                    className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                      index % 2 === 0 ? '' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Content - Left on even, Right on odd (desktop) */}
                    <div
                      className={`${
                        index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'
                      }`}
                    >
                      <div className="glass-card rounded-xl md:rounded-2xl p-4 md:card-padding-lg hover:scale-105 transition-all duration-300">
                        <div className="flex items-start gap-3 md:gap-4 md:block">
                          <div
                            className={`w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-gradient-to-br ${win.color} flex items-center justify-center flex-shrink-0 mb-0 md:mb-4 ${
                              index % 2 === 0 ? 'md:ml-auto md:mr-0' : 'md:mr-auto md:ml-0'
                            }`}
                          >
                            <win.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                          </div>

                          <div className="flex-grow">
                            <div className="inline-block px-2 md:px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2 md:mb-3">
                              {win.time}
                            </div>

                            <h3 className="text-lg md:text-2xl font-bold text-foreground mb-2 md:mb-3">
                              {win.title}
                            </h3>

                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                              {win.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Dot - Center (desktop) */}
                    <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${win.color} ring-4 ring-background shadow-lg`} />
                    </div>

                    {/* Empty space for alternating layout (desktop) */}
                    <div className={`hidden md:block ${index % 2 === 0 ? 'md:col-start-2' : ''}`} />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <AnimatedSection animation="scale-up" delay={400}>
          <div className="mt-12 md:mt-16 text-center">
            <div className="glass-heavy rounded-2xl md:rounded-3xl p-6 md:card-padding-xl max-w-3xl mx-auto specular-highlight">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">
                Ready to Start Your Protection Journey?
              </h3>
              <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6">
                Join 5,000+ families who are already sleeping better at night
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span>Setup in 5 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.3s' }} />
                  <span>No technical skills needed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.6s' }} />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
