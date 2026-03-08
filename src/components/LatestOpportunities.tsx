import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, MapPin, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function LatestOpportunities() {
  const navigate = useNavigate();
  const [opps, setOpps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("opportunities")
        .select("*")
        .in("status", ["approved", "active"])
        .order("created_at", { ascending: false })
        .limit(6);
      setOpps(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

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

        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-48 rounded-xl" />)}
          </div>
        ) : opps.length === 0 ? (
          <p className="text-center text-muted-foreground">No opportunities posted yet.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {opps.map((opp) => (
              <div
                key={opp.id}
                onClick={() => navigate(`/opportunities/${opp.id}`)}
                className="group flex flex-col rounded-xl border border-border bg-card p-5 shadow-[var(--card-shadow)] transition-all duration-300 hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs font-semibold capitalize">
                    {opp.type}
                  </Badge>
                </div>

                <h3 className="text-base font-bold text-foreground leading-snug mb-2 line-clamp-2">
                  {opp.title}
                </h3>

                <div className="flex flex-col gap-1.5 text-xs text-muted-foreground mb-3">
                  {opp.company && <span className="flex items-center gap-1.5"><Building2 size={12} /> {opp.company}</span>}
                  <span className="flex items-center gap-1.5"><MapPin size={12} /> {opp.location || "Remote"}</span>
                  {opp.deadline && <span className="flex items-center gap-1.5"><CalendarDays size={12} /> Deadline: {new Date(opp.deadline).toLocaleDateString()}</span>}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                  {opp.description}
                </p>

                <Button
                  size="sm"
                  variant="ghost"
                  className="mt-4 w-full text-primary font-semibold gap-1 hover:bg-accent justify-center"
                  onClick={(e) => { e.stopPropagation(); navigate(`/opportunities/${opp.id}`); }}
                >
                  View Details <ArrowRight size={14} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
