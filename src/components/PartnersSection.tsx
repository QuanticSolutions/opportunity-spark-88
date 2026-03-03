const partners = ["Google", "Microsoft", "UNESCO", "Mastercard", "UNICEF", "Meta"];

export default function PartnersSection() {
  return (
    <section className="border-t border-border bg-muted/30 py-16 md:py-20">
      <div className="container text-center">
        <p className="mb-10 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Trusted by leading organizations
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {partners.map((name) => (
            <div
              key={name}
              className="flex h-10 items-center rounded-md px-4 text-lg font-bold text-muted-foreground/50 transition-colors hover:text-foreground"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
