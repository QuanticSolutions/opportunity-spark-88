import { ArrowRight, Share2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 md:py-28 overflow-hidden hero-gradient">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-secondary/15 blur-[100px]" />
      </div>

      <div className="container relative z-10 text-center">
        <h2 className="text-3xl font-extrabold text-primary-foreground md:text-4xl lg:text-5xl">
          Ready to Unlock Your Future?
        </h2>
        <p className="mt-4 mx-auto max-w-xl text-lg text-primary-foreground/70">
          Join thousands of students and professionals discovering life-changing opportunities every day.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="btn-gradient font-bold text-base px-8 gap-2 rounded-xl"
            onClick={() => navigate("/signup")}
          >
            Join Now <ArrowRight size={18} />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 text-primary hover:text-secondary-foreground hover:bg-primary-foreground/10 font-semibold px-8 rounded-xl backdrop-blur-sm gap-2"
            onClick={() => navigate("/opportunities")}
          >
            <Search size={16} /> Discover Opportunities
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 text-primary hover:text-secondary-foreground hover:bg-primary-foreground/10 font-semibold px-8 rounded-xl backdrop-blur-sm gap-2"
          >
            <Share2 size={16} /> Share Opportunities
          </Button>
        </div>
      </div>
    </section>
  );
}
