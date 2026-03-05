import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, User, LayoutDashboard, Settings, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import LoginModal from "@/components/LoginModal";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "Articles", href: "/articles" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { user, profile, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const initials = profile?.full_name
    ? profile.full_name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  const dashboardPath = profile?.role === "provider" ? "/dashboard/provider" : "/dashboard/seeker";

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between">
          <a href="/" className="text-xl font-extrabold tracking-tight text-primary">
            Som<span className="text-gradient">opportunity</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((l) => (
              <button
                key={l.label}
                onClick={() => navigate(l.href)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {!loading && !user && (
              <>
                <Button variant="ghost" size="sm" className="text-foreground font-medium" onClick={() => setLoginOpen(true)}>
                  Sign In
                </Button>
                <Button size="sm" className="btn-gradient font-semibold px-5 rounded-lg" onClick={() => navigate("/signup")}>
                  Get Started
                </Button>
              </>
            )}

            {!loading && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative rounded-full ring-2 ring-primary/20 hover:ring-primary/50 transition-all duration-200 focus:outline-none">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={profile?.avatar_url || ""} />
                      <AvatarFallback className="bg-accent text-accent-foreground text-xs font-bold">{initials}</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52 glass-card border-border/50 shadow-[var(--card-shadow-hover)] animate-fade-in">
                  <div className="px-3 py-2">
                    <p className="text-sm font-semibold text-foreground truncate">{profile?.full_name || "User"}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate(`${dashboardPath}/profile`)} className="cursor-pointer gap-2 hover:bg-accent">
                    <User size={14} /> My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate(dashboardPath)} className="cursor-pointer gap-2 hover:bg-accent">
                    <LayoutDashboard size={14} /> Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate(`${dashboardPath}/security`)} className="cursor-pointer gap-2 hover:bg-accent">
                    <Settings size={14} /> Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer gap-2 text-destructive hover:bg-destructive/10">
                    <LogOut size={14} /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            {!loading && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-full ring-2 ring-primary/20 focus:outline-none">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile?.avatar_url || ""} />
                      <AvatarFallback className="bg-accent text-accent-foreground text-xs font-bold">{initials}</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52 glass-card border-border/50 shadow-[var(--card-shadow-hover)]">
                  <div className="px-3 py-2">
                    <p className="text-sm font-semibold text-foreground truncate">{profile?.full_name || "User"}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate(`${dashboardPath}/profile`)} className="cursor-pointer gap-2">
                    <User size={14} /> My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate(dashboardPath)} className="cursor-pointer gap-2">
                    <LayoutDashboard size={14} /> Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer gap-2 text-destructive">
                    <LogOut size={14} /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <button onClick={() => setOpen(!open)} className="text-primary" aria-label="Menu">
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {open && (
          <nav className="flex flex-col gap-4 border-t border-border bg-card p-6 lg:hidden animate-fade-in">
            {navLinks.map((l) => (
              <button
                key={l.label}
                onClick={() => { setOpen(false); navigate(l.href); }}
                className="text-base font-medium text-foreground text-left"
              >
                {l.label}
              </button>
            ))}
            {!loading && !user && (
              <>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 font-semibold w-full" onClick={() => { setOpen(false); setLoginOpen(true); }}>
                  Sign In
                </Button>
                <Button className="btn-gradient font-semibold w-full rounded-lg" onClick={() => { setOpen(false); navigate("/signup"); }}>
                  Get Started
                </Button>
              </>
            )}
          </nav>
        )}
      </header>

      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
