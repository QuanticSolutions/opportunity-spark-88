import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden hero-gradient py-24 md:py-32 lg:py-40">
      {/* Decorative gradient blurs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-secondary/15 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-[600px] rounded-full bg-accent/10 blur-[80px]" />
      </div>

      <div className="container relative z-10 flex flex-col items-center text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm animate-fade-up">
          <Sparkles size={14} />
          <span>Your Future Starts Here</span>
        </div>

        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-primary-foreground md:text-5xl lg:text-6xl animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Discover Scholarships, Jobs & Opportunities
        </h1>

        <p className="mt-6 max-w-xl text-lg text-primary-foreground/70 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          Somopportunity connects you with thousands of career-changing opportunities worldwide. Start your journey today.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <Button size="lg" className="btn-gradient font-bold text-base px-8 gap-2 rounded-xl">
            JOIN NOW <ArrowRight size={18} />
          </Button>
          <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base px-8 rounded-xl backdrop-blur-sm">
            Browse Opportunities
          </Button>
        </div>
      </div>
    </section>
  );
}
