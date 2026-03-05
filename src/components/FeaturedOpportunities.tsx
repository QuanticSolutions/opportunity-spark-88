import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const featured = [
  {
    id: "1",
    title: "IsDB-ISFD Scholarship Program 2026",
    organization: "Islamic Development Bank",
    category: "scholarship",
    deadline: "2026-01-31",
    location: "International",
    description: "The IsDB-ISFD Scholarship Program for Bachelor and Technical Diploma for Least Developed Member Countries provides fully funded education opportunities.",
  },
  {
    id: "2",
    title: "Climate Skills Global Collaboration Grant",
    organization: "British Council",
    category: "grant",
    deadline: "2026-03-17",
    location: "Global",
    description: "The British Council's Climate Skills Global Collaboration Grants represent a major international initiative to address climate change through education.",
  },
  {
    id: "3",
    title: "African Youth Leadership Summit 2026",
    organization: "African Union",
    category: "conference",
    deadline: "2026-04-15",
    location: "Nairobi, Kenya",
    description: "Join young leaders from across Africa for a transformative summit focused on innovation, governance, and sustainable development.",
  },
];

export default function FeaturedOpportunities() {
  const navigate = useNavigate();

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Featured <span className="text-gradient">Opportunities</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Don't miss these exceptional opportunities with upcoming deadlines
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((opp) => (
            <div
              key={opp.id}
              className="group glow-border flex flex-col rounded-xl border border-border bg-card shadow-[var(--card-shadow)] transition-all duration-300 hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-1 overflow-hidden"
            >
              {/* Top accent bar */}
              <div className="h-1.5 btn-gradient w-full" />

              <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs font-semibold capitalize">
                    {opp.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs gap-1">
                    <CalendarDays size={10} /> {new Date(opp.deadline).toLocaleDateString()}
                  </Badge>
                </div>

                <h3 className="text-lg font-bold text-foreground leading-snug mb-1">
                  {opp.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-1">By {opp.organization}</p>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                  {opp.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin size={12} /> {opp.location}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-primary font-semibold gap-1 hover:bg-accent"
                    onClick={() => navigate(`/opportunity/${opp.id}`)}
                  >
                    View Details <ArrowRight size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
