import heroImage from '@/assets/hero-winter.jpg';
import { Button } from '@/components/ui/button';
import { ChevronDown, Snowflake } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 gradient-hero" />
      </div>

      {/* Snowflake Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <Snowflake
            key={i}
            className="snowflake text-card/20"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${8 + Math.random() * 12}s`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${12 + Math.random() * 20}px`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
          <div className="space-y-4">
            <p className="text-card/80 text-sm font-medium uppercase tracking-[0.3em] font-body">
              Winter Collection 2025
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-card leading-tight text-balance">
              Embrace the
              <span className="block text-warm">Winter Elegance</span>
            </h1>
          </div>

          <p className="text-lg text-card/80 max-w-xl mx-auto font-body leading-relaxed">
            Discover our curated collection of premium winter essentials.
            Crafted for warmth, designed for style.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button variant="hero" size="xl" asChild>
              <a href="#products">Shop Collection</a>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <a href="#about">Learn More</a>
            </Button>
          </div>
        </div>


      </div>
    </section>
  );
}
