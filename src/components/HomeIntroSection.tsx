import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";
import { useEffect, useRef, useState } from "react";

/* Animated counter hook */
function useCountUp(target: number, duration = 2000, suffix = "") {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, ref, suffix };
}

const stats = [
  { target: 5000, suffix: "+", label: "Families Protected" },
  { target: 99, suffix: "%", label: "Detection Rate" },
  { target: 24, suffix: "/7", label: "Expert Support" },
  { target: 10, suffix: "%", label: "Veteran Discount" },
];

export const HomeIntroSection = () => {
  return (
    <>
      {/* Stats Counter Bar */}
      <section className="py-16 md:py-20 border-b border-border/40">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat) => (
              <StatItem key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Intro Copy */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — Copy */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                Who We Are
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] mb-6">
                Ohio's Trusted Partner in{" "}
                <span className="text-primary">Cybersecurity</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
                Scammers are using AI to clone voices, create deepfakes, and
                target seniors. We give families and businesses the tools,
                training, and support to fight back. Veteran-founded and
                community-driven.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-12 px-8 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
                >
                  <Link to="/training#pricing">
                    Get Started <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-sm font-semibold rounded-lg w-full sm:w-auto"
                >
                  <a href={`tel:${SITE.phone.e164}`}>
                    <Phone className="w-4 h-4 mr-2" /> {SITE.phone.display}
                  </a>
                </Button>
              </div>
            </div>

            {/* Right — Value highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  title: "AI-Powered Detection",
                  desc: "Real-time threat analysis stops scams before they reach you.",
                },
                {
                  title: "Family Plans",
                  desc: "Protect every member of your household under one plan.",
                },
                {
                  title: "Hands-On Training",
                  desc: "Interactive workshops so you never fall for a scam again.",
                },
                {
                  title: "Business Solutions",
                  desc: "Security audits and AI automation for your organization.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-lg border border-border/60 bg-card hover:shadow-md transition-shadow"
                >
                  <h3 className="text-base font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

function StatItem({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const { value, ref } = useCountUp(target);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2">
        {value.toLocaleString()}
        <span className="text-primary">{suffix}</span>
      </div>
      <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}
