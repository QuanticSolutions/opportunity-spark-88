import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/contexts/AuthContext";
import LoginModal from "@/components/LoginModal";

const opportunityItems = [
  { label: "Scholarships", category: "scholarship" },
  { label: "Fellowships", category: "fellowship" },
  { label: "Internships", category: "internship" },
  { label: "Grants", category: "grant" },
  { label: "Workshops", category: "workshop" },
  { label: "Conferences", category: "conference" },
];

const serviceItems = [
  { label: "Hire Talent", href: "/services/hire-talent" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Jobs", href: "/opportunities?category=job" },
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

  const UserMenu = ({ align = "end" as const, compact = false }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative rounded-full ring-2 ring-primary/20 hover:ring-primary/50 transition-all duration-200 focus:outline-none">
          <Avatar className={compact ? "h-8 w-8" : "h-9 w-9"}>
            <AvatarImage src={profile?.avatar_url || ""} />
            <AvatarFallback className="bg-accent text-accent-foreground text-xs font-bold">{initials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-52 glass-card border-border/50 shadow-[var(--card-shadow-hover)] animate-fade-in">
        <div className="px-3 py-2">
          <p className="text-sm font-semibold text-foreground truncate">{profile?.full_name || "User"}</p>
          {!compact && <p className="text-xs text-muted-foreground truncate">{user?.email}</p>}
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
  );

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between">
          <a href="/" className="text-xl font-extrabold tracking-tight text-primary">
            Som<span className="text-gradient">opportunity</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <button
                key={l.label}
                onClick={() => navigate(l.href)}
                className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary rounded-md"
              >
                {l.label}
              </button>
            ))}

            {/* Opportunities dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-muted-foreground hover:text-primary bg-transparent">
                    Opportunities
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-48 gap-1 p-2">
                      {opportunityItems.map((item) => (
                        <button
                          key={item.label}
                          onClick={() => navigate(`/opportunities?category=${item.category}`)}
                          className="rounded-md px-3 py-2 text-sm text-left text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Services dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-muted-foreground hover:text-primary bg-transparent">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-48 gap-1 p-2">
                      {serviceItems.map((item) => (
                        <button
                          key={item.label}
                          onClick={() => navigate(item.href)}
                          className="rounded-md px-3 py-2 text-sm text-left text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            {!loading && !user && (
              <>
                <Button variant="ghost" size="sm" className="text-foreground font-medium" onClick={() => setLoginOpen(true)}>
                  Login
                </Button>
                <Button size="sm" className="btn-gradient font-semibold px-5 rounded-lg" onClick={() => navigate("/signup")}>
                  Join
                </Button>
              </>
            )}
            {!loading && user && <UserMenu />}
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            {!loading && user && <UserMenu compact />}
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

            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Opportunities</p>
              {opportunityItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => { setOpen(false); navigate(`/opportunities?category=${item.category}`); }}
                  className="block w-full text-left text-sm text-muted-foreground py-1.5 pl-2 hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Services</p>
              {serviceItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => { setOpen(false); navigate(item.href); }}
                  className="block w-full text-left text-sm text-muted-foreground py-1.5 pl-2 hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {!loading && !user && (
              <>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 font-semibold w-full" onClick={() => { setOpen(false); setLoginOpen(true); }}>
                  Login
                </Button>
                <Button className="btn-gradient font-semibold w-full rounded-lg" onClick={() => { setOpen(false); navigate("/signup"); }}>
                  Join
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
