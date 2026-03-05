import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const articles = [
  {
    id: "a1",
    title: "How to Write a Winning Scholarship Application",
    excerpt: "Learn the key strategies and tips for crafting compelling scholarship applications that stand out from the crowd.",
    category: "Scholarship Guide",
    date: "2026-02-15",
  },
  {
    id: "a2",
    title: "Top 10 Fellowships for African Youth in 2026",
    excerpt: "Explore the most prestigious fellowship opportunities available for young professionals from Africa this year.",
    category: "Career Advice",
    date: "2026-02-10",
  },
  {
    id: "a3",
    title: "Preparing for International Job Interviews",
    excerpt: "A comprehensive guide to acing remote and in-person interviews with global organizations and companies.",
    category: "Application Tips",
    date: "2026-01-28",
  },
];

export default function ArticlesSection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="mb-12 flex flex-col items-center text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              Articles & <span className="text-gradient">Guides</span>
            </h2>
            <p className="mt-2 text-muted-foreground">Tips and resources to help you succeed</p>
          </div>
          <Button
            variant="outline"
            className="mt-4 sm:mt-0 gap-2 border-primary text-primary hover:bg-accent font-semibold"
            onClick={() => navigate("/articles")}
          >
            All Articles <ArrowRight size={16} />
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <div
              key={article.id}
              className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden shadow-[var(--card-shadow)] transition-all duration-300 hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-1"
            >
              {/* Gradient placeholder for article image */}
              <div className="h-40 btn-gradient flex items-center justify-center">
                <BookOpen size={40} className="text-primary-foreground/50" />
              </div>

              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-primary">{article.category}</span>
                  <span className="text-xs text-muted-foreground">• {new Date(article.date).toLocaleDateString()}</span>
                </div>
                <h3 className="text-base font-bold text-foreground leading-snug mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                  {article.excerpt}
                </p>
                <Button
                  size="sm"
                  variant="ghost"
                  className="mt-3 text-primary font-semibold gap-1 hover:bg-accent w-fit"
                  onClick={() => navigate(`/articles/${article.id}`)}
                >
                  Read More <ArrowRight size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
