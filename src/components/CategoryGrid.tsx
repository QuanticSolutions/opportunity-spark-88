import { GraduationCap, Briefcase, HandCoins, Globe, Award, Users, CalendarDays, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  { icon: GraduationCap, label: "Scholarships", description: "Fully funded education opportunities worldwide", count: 3, type: "scholarship" },
  { icon: Globe, label: "Internships", description: "Professional development and leadership programs", count: 0, type: "internship" },
  { icon: Lightbulb, label: "Workshops", description: "Hands-on learning and skill development", count: 1, type: "workshop" },
  { icon: CalendarDays, label: "Conferences", description: "Networking and learning events across Africa", count: 1, type: "conference" },
  { icon: Briefcase, label: "Jobs", description: "Career opportunities and employment", count: 1, type: "job" },
  { icon: HandCoins, label: "Grants", description: "Funding for research and community projects", count: 0, type: "grant" },
  { icon: Award, label: "Fellowships", description: "Advanced professional fellowship programs", count: 0, type: "fellowship" },
  { icon: Users, label: "Competitions", description: "Showcase your skills and win prizes", count: 0, type: "competition" },
];

export default function CategoryGrid() {
  const navigate = useNavigate();

  return (
    <section id="categories" className="py-20 md:py-28">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Explore <span className="text-gradient">Opportunity Categories</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">
            Find the perfect opportunity for your goals. From educational scholarships to professional fellowships, we have something for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => navigate(`/opportunities?category=${cat.type}`)}
              className="group glow-border flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-6 text-left transition-all duration-300 hover:border-primary/30 hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary transition-all duration-300 group-hover:btn-gradient group-hover:text-primary-foreground">
                <cat.icon size={24} strokeWidth={1.8} />
              </div>
              <h3 className="text-base font-bold text-foreground">{cat.label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{cat.description}</p>
              <span className="mt-auto text-xs font-semibold text-primary">{cat.count} opportunities</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
