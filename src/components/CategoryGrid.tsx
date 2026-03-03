import { GraduationCap, Briefcase, HandCoins, BookOpen, Globe, Award, Building2, Heart } from "lucide-react";

const categories = [
  { icon: GraduationCap, label: "Scholarships", count: "2,400+" },
  { icon: Briefcase, label: "Jobs", count: "5,100+" },
  { icon: HandCoins, label: "Grants", count: "870+" },
  { icon: BookOpen, label: "Courses", count: "1,200+" },
  { icon: Globe, label: "Internships", count: "3,300+" },
  { icon: Award, label: "Fellowships", count: "640+" },
  { icon: Building2, label: "Competitions", count: "420+" },
  { icon: Heart, label: "Volunteering", count: "980+" },
];

export default function CategoryGrid() {
  return (
    <section id="categories" className="py-20 md:py-28">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Explore <span className="text-gradient">Categories</span>
          </h2>
          <p className="mt-3 text-muted-foreground">Browse opportunities by category</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
          {categories.map((cat) => (
            <button
              key={cat.label}
              className="group glow-border flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-primary transition-all duration-300 group-hover:btn-gradient group-hover:text-primary-foreground">
                <cat.icon size={28} strokeWidth={1.8} />
              </div>
              <span className="text-sm font-semibold text-foreground">{cat.label}</span>
              <span className="text-xs font-medium text-muted-foreground">{cat.count}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
