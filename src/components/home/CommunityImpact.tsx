import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Users, ArrowRight, Sparkles } from "lucide-react";
import teamRubenCeo from "@/assets/team-ruben-ceo.jpg";
import teamCorineCoo from "@/assets/team-corine-coo.jpg";
import teamSecuritySpecialist from "@/assets/team-security-specialist.jpg";
import businessTeamMeeting from "@/assets/business-team-meeting-natural.jpg";

const values = [
  { icon: Shield, title: "Treating you with respect and courtesy" },
  { icon: Heart, title: "Explaining the concepts and options" },
  { icon: Users, title: "Helping you solve problems" },
];

const teamMembers = [
  { name: "Ruben", role: "Co-Founder & CEO", image: teamRubenCeo },
  { name: "Corine", role: "Co-Founder & COO", image: teamCorineCoo },
  {
    name: "Marcus",
    role: "Security Specialist",
    image: teamSecuritySpecialist,
  },
];

export const CommunityImpact = () => {
  return (
    <section
      className="relative py-10 lg:py-14 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #ffffff 0%, #faf9f7 50%, #fff5f0 100%)",
      }}
      aria-labelledby="team-heading"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Team Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg mb-4">
            <Sparkles className="w-4 h-4 text-coral-500" aria-hidden="true" />
            <span className="text-sm font-semibold text-[#18305A] uppercase tracking-wide">
              Our Team
            </span>
          </div>
          <h2
            id="team-heading"
            className="text-3xl md:text-4xl font-black text-[#18305A] leading-tight mb-3"
            style={{ fontFamily: "'Lora', 'Rubik', serif" }}
          >
            Dedicated Consulting{" "}
            <span className="bg-gradient-to-r from-coral-500 to-lavender-500 bg-clip-text text-transparent">
              Team
            </span>
          </h2>
        </div>

        {/* Team Cards */}
        <div
          className="grid md:grid-cols-3 gap-4 mb-10"
          role="list"
          aria-label="Team members"
        >
          {teamMembers.map((member, i) => (
            <div key={member.name} role="listitem" className="group">
              {/* Real Photo */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 shadow-lg border-2 border-white">
                <img
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={375}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#18305A]/50 via-transparent to-transparent"
                  aria-hidden="true"
                />

                {/* Glassmorphism name card */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/30 backdrop-blur-xl rounded-xl p-3 border border-white/40">
                  <div className="text-white font-bold">{member.name}</div>
                  <div className="text-white/80 text-sm">{member.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-2 border-white">
              <img
                src={businessTeamMeeting}
                alt="Team collaboration"
                width={600}
                height={450}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#18305A]/30 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>

            {/* Glassmorphism Floating Badge */}
            <div className="absolute -bottom-3 -right-3 bg-white/70 backdrop-blur-xl rounded-xl shadow-lg px-5 py-3 border border-white/50">
              <div className="text-xs font-medium text-foreground/60">
                Veteran-Owned
              </div>
              <div className="text-xl font-black text-[#18305A]">
                Ohio Based
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg">
              <Sparkles className="w-4 h-4 text-coral-500" aria-hidden="true" />
              <span className="text-sm font-semibold text-[#18305A] uppercase tracking-wide">
                Our Commitment
              </span>
            </div>

            <h3
              className="text-2xl md:text-3xl font-black text-[#18305A] leading-tight"
              style={{ fontFamily: "'Lora', 'Rubik', serif" }}
            >
              Committed to Giving you{" "}
              <span className="bg-gradient-to-r from-coral-500 to-lavender-500 bg-clip-text text-transparent">
                True Value.
              </span>
            </h3>

            <p className="text-foreground/60 leading-relaxed text-sm">
              We craft unique digital experiences with more than 4 years of
              expertise in design and digital transformation, providing our
              customers with exceptional service.
            </p>

            {/* Values List */}
            <div className="space-y-3 pt-2" role="list" aria-label="Our values">
              {values.map((value, i) => (
                <div
                  key={value.title}
                  role="listitem"
                  className="flex items-center gap-3"
                >
                  <div
                    className="w-10 h-10 rounded-full bg-white/60 backdrop-blur-xl border border-white/40 shadow-md flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <value.icon className="w-4 h-4 text-coral-500" />
                  </div>
                  <span className="font-medium text-[#18305A] text-sm">
                    {value.title}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="h-12 px-6 text-sm font-bold rounded-full shadow-md"
                style={{
                  background:
                    "linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)",
                }}
              >
                <Link to="/about" className="text-white">
                  Learn Our Story
                  <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
