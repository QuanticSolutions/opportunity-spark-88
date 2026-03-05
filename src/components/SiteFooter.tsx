import { useNavigate } from "react-router-dom";

const footerLinks = {
  Opportunities: [
    { label: "Scholarships", href: "/opportunities?type=scholarship" },
    { label: "Jobs", href: "/opportunities?type=job" },
    { label: "Internships", href: "/opportunities?type=internship" },
    { label: "Grants", href: "/opportunities?type=grant" },
    { label: "Fellowships", href: "/opportunities?type=fellowship" },
  ],
  Resources: [
    { label: "Articles", href: "/articles" },
    { label: "Application Tips", href: "/articles" },
    { label: "Career Advice", href: "/articles" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Submit Content", href: "/submit" },
  ],
};

export default function SiteFooter() {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-border bg-card py-14">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <a href="/" className="text-xl font-extrabold tracking-tight text-primary">
              Som<span className="text-gradient">opportunity</span>
            </a>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Connecting Somali youth and communities with global scholarships, jobs, and career opportunities.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-bold text-foreground mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => navigate(link.href)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-border pt-8 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Somopportunity. All rights reserved.
          </p>
          <div className="flex gap-6">
            <button className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy Policy</button>
            <button className="text-xs text-muted-foreground hover:text-primary transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
