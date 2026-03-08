import { useState } from 'react';
import { Shield, Bell, GraduationCap, Users, Lock, Smartphone, CheckCircle2 } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

const features = [
  {
    id: 'monitoring',
    icon: Shield,
    title: 'AI-Powered Monitoring',
    shortDesc: '24/7 threat detection',
    fullDesc: 'Our advanced AI system monitors for deepfakes, voice cloning, phishing emails, and suspicious activity around the clock. You sleep soundly while we stand guard.',
    stats: { value: 10000, suffix: '+', label: 'Threats Blocked' },
    color: 'from-primary to-accent',
  },
  {
    id: 'alerts',
    icon: Bell,
    title: 'Instant Alerts',
    shortDesc: 'Real-time notifications',
    fullDesc: 'Get immediate alerts when we detect suspicious activity. Simple notifications you can actually understand—no confusing technical terms.',
    stats: { value: 99, suffix: '%', label: 'Detection Rate' },
    color: 'from-rose-500 to-pink-600',
  },
  {
    id: 'training',
    icon: GraduationCap,
    title: 'Hands-On Training',
    shortDesc: 'Learn to spot scams',
    fullDesc: 'Friendly workshops (in-person or online) teach you and your family to recognize and avoid digital threats. No tech jargon—just clear, practical advice.',
    stats: { value: 5000, suffix: '+', label: 'Families Trained' },
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'support',
    icon: Users,
    title: 'Real Human Support',
    shortDesc: '24/7 expert help',
    fullDesc: 'Call, text, or email us anytime. Real people answer—not bots. We\'re here to help you feel safe and confident using your devices.',
    stats: { value: 24, suffix: '/7', label: 'Always Available' },
    color: 'from-violet-500 to-purple-600',
  },
];

export const FeaturesShowcase = () => {
  const [activeFeature, setActiveFeature] = useState(features[0]?.id || '');

  const active = features.find((f) => f.id === activeFeature) || features[0];

  return (
    <section className="section-padding-xl bg-gradient-to-b from-background to-muted/30">
      <div className="center-container">
        {/* Header */}
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-widget mb-6">
              <Lock className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground tracking-wider uppercase">
                Complete Protection
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Everything You Need to{' '}
              <span className="gradient-text-primary">Stay Safe</span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tap any feature below to learn how we protect you and your family
            </p>
          </div>
        </AnimatedSection>

        {/* Interactive Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start mb-12 md:mb-16">
          {/* Feature Selector - Left Side */}
          <div className="space-y-3 md:space-y-4">
            {features.map((feature, index) => (
              <AnimatedSection
                key={feature.id}
                animation="fade-up"
                delay={index * 100}
              >
                <button
                  onClick={() => setActiveFeature(feature.id)}
                  className={`w-full text-left glass-card rounded-xl md:rounded-2xl p-4 md:p-6 transition-all duration-300 ${
                    activeFeature === feature.id
                      ? 'ring-2 ring-primary shadow-xl scale-[1.02] md:scale-105'
                      : 'hover:scale-[1.01] md:hover:scale-102'
                  }`}
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0 transition-transform ${
                        activeFeature === feature.id ? 'scale-110' : ''
                      }`}
                    >
                      <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>

                    <div className="flex-grow min-w-0">
                      <h3 className="text-base md:text-lg font-bold text-foreground mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {feature.shortDesc}
                      </p>
                    </div>

                    {activeFeature === feature.id && (
                      <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 animate-scale-in" />
                    )}
                  </div>
                </button>
              </AnimatedSection>
            ))}
          </div>

          {/* Feature Detail - Right Side */}
          <div className="lg:sticky lg:top-24">
            <AnimatedSection animation="scale-up" key={activeFeature}>
              <div className="glass-heavy rounded-2xl md:rounded-3xl p-6 md:card-padding-xl specular-highlight">
                <div
                  className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${active.color} flex items-center justify-center mb-4 md:mb-6`}
                >
                  <active.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">
                  {active.title}
                </h3>

                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 md:mb-8">
                  {active.fullDesc}
                </p>

                {/* Stat */}
                <div className="glass-widget rounded-xl md:rounded-2xl p-4 md:p-6 text-center">
                  <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                    <AnimatedCounter
                      end={active.stats.value}
                      suffix={active.stats.suffix}
                      duration={2000}
                    />
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground font-semibold uppercase tracking-wider">
                    {active.stats.label}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <AnimatedSection animation="fade-up">
          <div className="glass-card rounded-2xl md:rounded-3xl p-4 md:card-padding-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
              <div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Smartphone className="w-5 h-5 text-primary" />
                  <div className="text-3xl font-black text-primary">
                    <AnimatedCounter end={5} suffix="min" />
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">Setup Time</div>
              </div>

              <div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <div className="text-3xl font-black text-primary">
                    <AnimatedCounter end={100} suffix="%" />
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">Coverage</div>
              </div>

              <div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Users className="w-5 h-5 text-primary" />
                  <div className="text-3xl font-black text-primary">
                    <AnimatedCounter end={5000} suffix="+" />
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">Protected Families</div>
              </div>

              <div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Bell className="w-5 h-5 text-primary" />
                  <div className="text-3xl font-black text-primary">
                    <AnimatedCounter end={24} suffix="/7" />
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">Support Available</div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
