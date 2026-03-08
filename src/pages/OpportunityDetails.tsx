import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Briefcase, Globe, ExternalLink, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { supabase } from "@/integrations/supabase/client";

export default function OpportunityDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [opp, setOpp] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      const { data } = await supabase
        .from("opportunities")
        .select("*")
        .eq("id", id)
        .in("status", ["approved", "active"])
        .single();
      setOpp(data);
      setLoading(false);

      // Increment view count via RPC
      if (data) {
        supabase.rpc("increment_opportunity_views", { opp_id: id });
      }
    };
    fetch();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <SiteHeader />
        <div className="container py-12 space-y-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!opp) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <SiteHeader />
        <div className="container flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Opportunity not found</h1>
            <Button variant="outline" className="mt-4" onClick={() => navigate("/opportunities")}>
              <ArrowLeft size={16} className="mr-2" /> Browse Opportunities
            </Button>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const categoryColors: Record<string, string> = {
    job: "bg-primary/10 text-primary",
    internship: "bg-emerald-100 text-emerald-700",
    scholarship: "bg-amber-100 text-amber-700",
    fellowship: "bg-violet-100 text-violet-700",
    grant: "bg-rose-100 text-rose-700",
    event: "bg-sky-100 text-sky-700",
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <section className="hero-gradient py-12">
        <div className="container">
          <Button variant="ghost" className="mb-4 text-white/80 hover:text-white hover:bg-white/10" onClick={() => navigate("/opportunities")}>
            <ArrowLeft size={16} className="mr-1" /> Back to Opportunities
          </Button>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <Badge className={categoryColors[opp.type] || "bg-muted text-muted-foreground"}>
                {opp.type}
              </Badge>
              <Badge className="bg-white/20 text-white capitalize">{opp.work_mode}</Badge>
            </div>
            <h1 className="text-3xl font-extrabold text-white md:text-4xl">{opp.title}</h1>
            {opp.company && <p className="mt-2 text-lg text-white/80">{opp.company}</p>}
          </motion.div>
        </div>
      </section>

      <section className="container py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {opp.description && (
              <Card className="glass-card">
                <CardContent className="p-6">
                  <h2 className="mb-3 text-lg font-bold text-foreground">Description</h2>
                  <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap">{opp.description}</div>
                </CardContent>
              </Card>
            )}
            {opp.requirements && (
              <Card className="glass-card">
                <CardContent className="p-6">
                  <h2 className="mb-3 text-lg font-bold text-foreground">Requirements</h2>
                  <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap">{opp.requirements}</div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="glow-border">
              <CardContent className="p-6 space-y-4">
                {opp.external_link && (
                  <Button className="btn-gradient w-full rounded-lg font-semibold text-base py-5" onClick={() => window.open(opp.external_link, "_blank")}>
                    Apply Now <ExternalLink size={16} className="ml-2" />
                  </Button>
                )}

                <div className="space-y-3 text-sm">
                  {opp.location && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin size={16} className="text-primary shrink-0" />
                      <span>{opp.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase size={16} className="text-primary shrink-0" />
                    <span className="capitalize">{opp.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe size={16} className="text-primary shrink-0" />
                    <span className="capitalize">{opp.work_mode}</span>
                  </div>
                  {opp.deadline && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar size={16} className="text-primary shrink-0" />
                      <span>Deadline: {new Date(opp.deadline).toLocaleDateString()}</span>
                    </div>
                  )}
                  {opp.stipend_min != null && opp.stipend_max != null && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign size={16} className="text-primary shrink-0" />
                      <span>{opp.currency} {opp.stipend_min.toLocaleString()} – {opp.stipend_max.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Posted {new Date(opp.created_at).toLocaleDateString()} · {opp.views_count ?? 0} views
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
