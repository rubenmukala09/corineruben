const TrustedTechLogos = () => {
  const logos = [
    { name: "OpenAI", color: "text-[#10a37f]" },
    { name: "Google AI", color: "text-[#4285f4]" },
    { name: "Microsoft Azure", color: "text-[#0078d4]" },
    { name: "AWS", color: "text-[#ff9900]" },
    { name: "IBM Watson", color: "text-[#0f62fe]" },
    { name: "Anthropic", color: "text-[#d4a574]" },
    { name: "Hugging Face", color: "text-[#ffbe0b]" },
    { name: "TensorFlow", color: "text-[#ff6f00]" },
  ];

  return (
    <section className="py-8 bg-gradient-to-r from-muted/50 via-background/80 to-muted/50 border-t border-border/50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-accent/20 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-6">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Powered By Industry Leaders
          </p>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Trusted AI & Technology Partners
          </h3>
        </div>
        
        {/* Floating logo animation container */}
        <div className="relative h-24 flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="group relative hover:scale-110 transition-all duration-500"
                style={{ 
                  animation: `float ${3 + (index % 3)}s ease-in-out infinite ${index * 0.5}s`
                }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Logo text */}
                <div className={`relative px-4 py-2 font-bold text-sm md:text-base ${logo.color} group-hover:scale-110 transition-transform duration-300`}>
                  {logo.name}
                </div>
                
                {/* Animated underline */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add floating animation keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </section>
  );
};

export default TrustedTechLogos;
