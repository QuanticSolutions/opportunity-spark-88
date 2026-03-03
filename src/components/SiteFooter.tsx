export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card py-10">
      <div className="container flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
        <span className="text-sm font-bold text-primary">
          Som<span className="text-gradient">opportunity</span>
        </span>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Somopportunity. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
