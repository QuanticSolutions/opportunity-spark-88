import { ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-graduation.jpg";
import { useCountUp } from "@/hooks/useCountUp";

export default function HeroSection() {
  const navigate = useNavigate();
  const activeOpps = useCountUp(100, 1800);
  const users = useCountUp(2500, 2000);
  const countries = useCountUp(50, 1600);

  return (
    <section className="relative overflow-hidden hero-gradient py-20 md:py-28 lg:py-36">
      {/* Decorative blurs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-secondary/15 blur-[120px]" />
      </div>

      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Text */}
          <div className="flex flex-col items-start">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-primary-foreground md:text-5xl lg:text-6xl animate-fade-up">
              Unlock Your Potential with Global Opportunities
            </h1>
            <p className="mt-6 max-w-lg text-lg text-primary-foreground/70 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Discover scholarships, fellowships, grants, and conferences designed for Somali youth and communities. Your journey to success starts here.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <Button
                size="lg"
                className="btn-gradient font-bold text-base px-8 gap-2 rounded-xl"
                onClick={() => navigate("/opportunities")}
              >
                Browse Opportunities <ArrowRight size={18} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary hover:text-secondary-foreground hover:bg-primary-foreground/10 font-semibold px-8 rounded-xl backdrop-blur-sm"
                onClick={() => navigate("/submit")}
              >
                <Send size={16} className="mr-2" /> Submit Content
              </Button>
            </div>
          </div>

          {/* Right: Image */}
          <div className="hidden lg:flex justify-end animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <img
              src={heroImage}
              alt="Graduation celebration with graduates in caps and gowns"
              className="w-full max-w-md rounded-2xl shadow-2xl object-cover"
              loading="eager"
            />
          </div>
        </div>

        {/* Stats row */}
        <div
          ref={activeOpps.ref}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          {[
            { value: activeOpps.count, suffix: "+", label: "Active Opportunities" },
            { value: users.count, suffix: "+", label: "Registered Users" },
            { value: countries.count, suffix: "+", label: "Countries Covered" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <span className="text-4xl font-extrabold text-primary-foreground md:text-5xl">
                {stat.value.toLocaleString()}{stat.suffix}
              </span>
              <span className="mt-1 text-sm font-medium text-primary-foreground/60">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
