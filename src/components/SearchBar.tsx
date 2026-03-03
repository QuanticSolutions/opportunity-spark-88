import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [remote, setRemote] = useState(false);

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Find Your <span className="text-gradient">Opportunity</span>
          </h2>
          <p className="mt-3 text-muted-foreground">Search thousands of scholarships, jobs and more</p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-border bg-card p-4 shadow-[var(--search-shadow)] md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1">
              <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Keyword</label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="e.g. Data Science, Marketing"
                  className="pl-9"
                />
              </div>
            </div>

            <div className="flex-1">
              <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Location</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City or country"
                  className="pl-9"
                  disabled={remote}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 md:pb-0.5">
              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-foreground">
                <input
                  type="checkbox"
                  checked={remote}
                  onChange={() => setRemote(!remote)}
                  className="h-4 w-4 rounded border-border accent-secondary"
                />
                Remote
              </label>
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold px-6">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
