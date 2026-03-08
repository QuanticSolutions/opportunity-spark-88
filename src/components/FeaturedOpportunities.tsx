import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function FeaturedOpportunities() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("opportunities")
        .select("*")
        .in("status", ["approved", "active"])
        .order("views_count", { ascending: false })
        .limit(3);
      setFeatured(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

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

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-64 rounded-xl" />)}
          </div>
        ) : featured.length === 0 ? (
          <p className="text-center text-muted-foreground">No featured opportunities yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((opp) => (
              <div
                key={opp.id}
                onClick={() => navigate(`/opportunities/${opp.id}`)}
                className="group glow-border flex flex-col rounded-xl border border-border bg-card shadow-[var(--card-shadow)] transition-all duration-300 hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-1 overflow-hidden cursor-pointer"
              >
                <div className="h-1.5 btn-gradient w-full" />
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs font-semibold capitalize">
                      {opp.type}
                    </Badge>
                    {opp.deadline && (
                      <Badge variant="outline" className="text-xs gap-1">
                        <CalendarDays size={10} /> {new Date(opp.deadline).toLocaleDateString()}
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-foreground leading-snug mb-1">
                    {opp.title}
                  </h3>
                  {opp.company && <p className="text-sm text-muted-foreground mb-1">By {opp.company}</p>}
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                    {opp.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin size={12} /> {opp.location || "Remote"}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-primary font-semibold gap-1 hover:bg-accent"
                      onClick={(e) => { e.stopPropagation(); navigate(`/opportunities/${opp.id}`); }}
                    >
                      View Details <ArrowRight size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
