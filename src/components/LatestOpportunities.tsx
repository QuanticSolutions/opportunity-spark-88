import { ArrowRight, CalendarDays, MapPin, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const latestOpportunities = [
  {
    id: "4",
    title: "Google Africa Developer Scholarship",
    organization: "Google",
    category: "scholarship",
    deadline: "2026-05-01",
    location: "Remote",
    description: "Fully funded scholarship for aspiring software developers across Africa covering mobile and web development tracks.",
  },
  {
    id: "5",
    title: "UNICEF Innovation Internship",
    organization: "UNICEF",
    category: "internship",
    deadline: "2026-04-20",
    location: "New York, USA",
    description: "Join UNICEF's Office of Innovation to work on cutting-edge solutions for children globally.",
  },
  {
    id: "6",
    title: "Mastercard Foundation Scholars Program",
    organization: "Mastercard Foundation",
    category: "scholarship",
    deadline: "2026-06-30",
    location: "Multiple Countries",
    description: "A comprehensive scholarship for young Africans to access quality education at leading universities worldwide.",
  },
  {
    id: "7",
    title: "Youth Climate Action Fellowship",
    organization: "UNDP",
    category: "fellowship",
    deadline: "2026-03-31",
    location: "Hybrid",
    description: "Empowering young climate leaders with skills, mentorship, and resources to drive change in their communities.",
  },
  {
    id: "8",
    title: "Pan-African Tech Competition 2026",
    organization: "AfriLabs",
    category: "competition",
    deadline: "2026-05-15",
    location: "Lagos, Nigeria",
    description: "Showcase your tech innovation and compete with startups from across the continent for funding and mentorship.",
  },
  {
    id: "9",
    title: "East Africa Education Conference",
    organization: "FAWE",
    category: "conference",
    deadline: "2026-04-10",
    location: "Dar es Salaam, Tanzania",
    description: "Annual conference bringing together educators, policymakers, and youth advocates to discuss education in East Africa.",
  },
];

export default function LatestOpportunities() {
  const navigate = useNavigate();

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="mb-12 flex flex-col items-center text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              Latest <span className="text-gradient">Opportunities</span>
            </h2>
            <p className="mt-2 text-muted-foreground">Browse the most recently posted opportunities</p>
          </div>
          <Button
            variant="outline"
            className="mt-4 sm:mt-0 gap-2 border-primary text-primary hover:bg-accent font-semibold"
            onClick={() => navigate("/opportunities")}
          >
            View All <ArrowRight size={16} />
          </Button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {latestOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="group flex flex-col rounded-xl border border-border bg-card p-5 shadow-[var(--card-shadow)] transition-all duration-300 hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="text-xs font-semibold capitalize">
                  {opp.category}
                </Badge>
              </div>

              <h3 className="text-base font-bold text-foreground leading-snug mb-2 line-clamp-2">
                {opp.title}
              </h3>

              <div className="flex flex-col gap-1.5 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1.5"><Building2 size={12} /> {opp.organization}</span>
                <span className="flex items-center gap-1.5"><MapPin size={12} /> {opp.location}</span>
                <span className="flex items-center gap-1.5"><CalendarDays size={12} /> Deadline: {new Date(opp.deadline).toLocaleDateString()}</span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                {opp.description}
              </p>

              <Button
                size="sm"
                variant="ghost"
                className="mt-4 w-full text-primary font-semibold gap-1 hover:bg-accent justify-center"
                onClick={() => navigate(`/opportunity/${opp.id}`)}
              >
                View Details <ArrowRight size={14} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
