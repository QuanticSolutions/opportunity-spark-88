import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoginModal from "@/components/LoginModal";

const navLinks = [
  { label: "Scholarships", href: "#categories" },
  { label: "Jobs", href: "#categories" },
  { label: "Grants", href: "#categories" },
  { label: "About", href: "#counters" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between">
          <a href="/" className="text-xl font-extrabold tracking-tight text-primary">
            Som<span className="text-gradient">opportunity</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                {l.label}
              </a>
            ))}
            <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/5 font-semibold px-5" onClick={() => setLoginOpen(true)}>
              Login
            </Button>
            <Button size="sm" className="btn-gradient font-semibold px-5 rounded-lg">
              Sign Up
            </Button>
          </nav>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-primary" aria-label="Menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile nav */}
        {open && (
          <nav className="flex flex-col gap-4 border-t border-border bg-card p-6 md:hidden animate-fade-in">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="text-base font-medium text-foreground">
                {l.label}
              </a>
            ))}
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 font-semibold w-full" onClick={() => { setOpen(false); setLoginOpen(true); }}>
              Login
            </Button>
            <Button className="btn-gradient font-semibold w-full rounded-lg">
              Sign Up
            </Button>
          </nav>
        )}
      </header>

      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
