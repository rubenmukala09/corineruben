import { BookOpen, Shield, Briefcase } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const ThreePathsForward = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[hsl(250,60%,45%)] via-[hsl(250,50%,35%)] to-[hsl(250,70%,25%)]">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Background image effect */}
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] animate-[float-slow_20s_ease-in-out_infinite]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-white leading-tight">
            AI That Works for Your Business, Not Against It
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10">
            Custom AI receptionists, smart automation, and secure systems designed for small businesses. Professional implementation starting at $5,000.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              asChild
              variant="default"
              size="lg"
              className="min-w-[200px] text-base font-bold uppercase tracking-wide bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
            >
              <Link to="/training">
                BOOK TRAINING
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="min-w-[200px] text-base font-bold uppercase tracking-wide bg-white/10 text-white border-2 border-white/30 hover:bg-white/20 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
            >
              <Link to="/training">
                START SCAM SHIELD
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="min-w-[200px] text-base font-bold uppercase tracking-wide bg-white/10 text-white border-2 border-white/30 hover:bg-white/20 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
            >
              <Link to="/business">
                TALK TO AN EXPERT
              </Link>
            </Button>
          </div>
        </div>

        {/* Trust Bar */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-[hsl(250,70%,55%)] via-[hsl(200,70%,50%)] to-[hsl(180,70%,50%)] rounded-2xl p-6 shadow-2xl backdrop-blur-sm border border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center gap-2">
                <Shield className="w-8 h-8 text-white" />
                <span className="text-white font-bold text-sm md:text-base">500+ Families Protected</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-white font-bold text-sm md:text-base">4.9/5 Star Rating</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-white font-bold text-sm md:text-base">Cybersecurity Expert-Founded</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-white font-bold text-sm md:text-base">Privacy-First</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-12 animate-bounce">
          <div className="text-white/60 text-sm uppercase tracking-wider">
            SCROLL
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreePathsForward;
