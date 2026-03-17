import { useState } from 'react';
import { Sparkles, Palette, Layers, Zap, Eye, Heart } from 'lucide-react';

/**
 * Interactive Style Showcase
 * A beautiful demonstration of the glassmorphism design system
 */
const StyleShowcase = () => {
  const [activeGlass, setActiveGlass] = useState<string>('glass-card');
  const [activeTexture, setActiveTexture] = useState<string>('none');

  const glassVariants = [
    { id: 'glass-card', name: 'Glass Card', desc: 'Premium frosted glass' },
    { id: 'glass-coral', name: 'Coral Tint', desc: 'Warm peachy glow' },
    { id: 'glass-lavender', name: 'Lavender Tint', desc: 'Soft purple hue' },
    { id: 'glass-navy', name: 'Navy Tint', desc: 'Deep blue shade' },
    { id: 'glass-ultra', name: 'Ultra Glass', desc: 'Maximum transparency' },
    { id: 'glass-heavy', name: 'Heavy Frost', desc: 'Strong frosted effect' },
    { id: 'glass-light', name: 'Light Glass', desc: 'Subtle background' },
    { id: 'glass-minimal', name: 'Minimal', desc: 'Very subtle effect' },
  ];

  const textures = [
    { id: 'none', name: 'None', class: '' },
    { id: 'grain', name: 'Grain', class: 'texture-grain' },
    { id: 'film', name: 'Film', class: 'texture-film' },
    { id: 'paper', name: 'Paper', class: 'texture-paper' },
  ];

  const materials = [
    { id: 'frosted', name: 'Frosted Glass', class: 'material-frosted-warm' },
    { id: 'acrylic', name: 'Warm Acrylic', class: 'material-acrylic-warm' },
    { id: 'metallic', name: 'Warm Metallic', class: 'material-metallic-warm' },
    { id: 'gold', name: 'Gold Metallic', class: 'material-metallic-gold' },
  ];

  return (
    <div className="min-h-screen bg-premium-mesh">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-coral-200/30 to-transparent rounded-full blur-3xl loop-float" />
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-gradient-to-br from-lavender-200/30 to-transparent rounded-full blur-3xl loop-sway" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-navy-200/20 to-transparent rounded-full blur-3xl loop-breathe" />
      </div>

      {/* Hero Header */}
      <section className="section-padding-xl text-center">
        <div className="center-container-narrow">
          <div className="inline-flex items-center gap-2 mb-6 glass-widget px-6 py-3 rounded-full animate-fade-in">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Design System Showcase
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Glassmorphism
            <span className="block gradient-text-primary">Gallery</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Explore our premium frosted glass design system with interactive demos
          </p>
        </div>
      </section>

      {/* Interactive Glass Variants */}
      <section className="section-padding-lg">
        <div className="center-container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Palette className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold">Glass Variants</h2>
            </div>
            <p className="text-muted-foreground">Click to preview different glassmorphism effects</p>
          </div>

          {/* Variant Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {glassVariants.map((variant, index) => (
              <button
                key={variant.id}
                onClick={() => setActiveGlass(variant.id)}
                className={`glass-card card-padding-md rounded-2xl text-left transition-all duration-300 hover:scale-105 ${
                  activeGlass === variant.id ? 'ring-2 ring-primary shadow-xl' : ''
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="font-semibold text-foreground mb-1">{variant.name}</div>
                <div className="text-sm text-muted-foreground">{variant.desc}</div>
              </button>
            ))}
          </div>

          {/* Live Preview */}
          <div className="glass-panel rounded-3xl card-padding-xl">
            <div className={`${activeGlass} rounded-3xl card-padding-xl min-h-[300px] flex flex-col items-center justify-center gap-6 transition-all duration-500 ${activeTexture}`}>
              <Eye className="w-16 h-16 text-primary loop-breathe" />
              <h3 className="text-3xl font-bold text-foreground">Live Preview</h3>
              <p className="text-center text-muted-foreground max-w-md">
                This card uses the <span className="font-mono font-semibold text-primary">{activeGlass}</span> class
                {activeTexture && <> with <span className="font-mono font-semibold text-accent">{activeTexture}</span> texture</>}
              </p>
              <div className="flex gap-3">
                <div className="glass-widget px-4 py-2 rounded-full">
                  <span className="text-sm font-semibold">Interactive</span>
                </div>
                <div className="glass-widget px-4 py-2 rounded-full">
                  <span className="text-sm font-semibold">Beautiful</span>
                </div>
                <div className="glass-widget px-4 py-2 rounded-full">
                  <span className="text-sm font-semibold">Modern</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Texture Overlays */}
      <section className="section-padding-lg bg-gradient-to-b from-transparent to-background/50">
        <div className="center-container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Layers className="w-6 h-6 text-accent" />
              <h2 className="text-3xl font-bold">Texture Overlays</h2>
            </div>
            <p className="text-muted-foreground">Add subtle texture for premium materiality</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {textures.map((texture) => (
              <button
                key={texture.id}
                onClick={() => setActiveTexture(texture.class)}
                className={`glass-card card-padding-md rounded-2xl text-center transition-all duration-300 hover:scale-105 ${
                  activeTexture === texture.class ? 'ring-2 ring-accent shadow-xl' : ''
                }`}
              >
                <div className="font-semibold text-foreground">{texture.name}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Materials */}
      <section className="section-padding-lg">
        <div className="center-container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold">Premium Materials</h2>
            </div>
            <p className="text-muted-foreground">Enhanced material finishes for luxury feel</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {materials.map((material, index) => (
              <div
                key={material.id}
                className={`${material.class} rounded-3xl card-padding-lg min-h-[200px] flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:scale-105 animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Heart className="w-12 h-12 text-primary" />
                <div className="font-bold text-lg text-foreground">{material.name}</div>
                <div className="text-sm text-center text-muted-foreground">
                  Premium {material.id} finish
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animation Showcase */}
      <section className="section-padding-xl bg-gradient-to-t from-background to-transparent">
        <div className="center-container-narrow">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Animation Library</h2>
            <p className="text-muted-foreground">Smooth, delightful micro-interactions</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-2xl card-padding-lg text-center loop-float">
              <div className="text-4xl mb-3">🎈</div>
              <div className="font-semibold text-sm">Float</div>
            </div>
            <div className="glass-card rounded-2xl card-padding-lg text-center loop-sway">
              <div className="text-4xl mb-3">🌊</div>
              <div className="font-semibold text-sm">Sway</div>
            </div>
            <div className="glass-card rounded-2xl card-padding-lg text-center loop-breathe">
              <div className="text-4xl mb-3">💨</div>
              <div className="font-semibold text-sm">Breathe</div>
            </div>
            <div className="glass-card rounded-2xl card-padding-lg text-center preload-bounce">
              <div className="text-4xl mb-3">⚡</div>
              <div className="font-semibold text-sm">Bounce</div>
            </div>
            <div className="glass-card rounded-2xl card-padding-lg text-center preload-fade">
              <div className="text-4xl mb-3">✨</div>
              <div className="font-semibold text-sm">Fade</div>
            </div>
            <div className="glass-card rounded-2xl card-padding-lg text-center">
              <div className="text-4xl mb-3 loop-wiggle">🎉</div>
              <div className="font-semibold text-sm">Wiggle</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="section-padding-xl text-center">
        <div className="center-container-narrow">
          <div className="glass-heavy rounded-3xl card-padding-xl specular-highlight">
            <Sparkles className="w-16 h-16 text-primary mx-auto mb-6 loop-breathe" />
            <h2 className="text-4xl font-bold mb-4">
              Beautiful by Design
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              This design system brings premium glassmorphism to every component
            </p>
            <div className="inline-flex items-center gap-2 glass-widget px-6 py-3 rounded-full">
              <Heart className="w-5 h-5 text-accent fill-accent" />
              <span className="font-semibold">Made with attention to detail</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StyleShowcase;
