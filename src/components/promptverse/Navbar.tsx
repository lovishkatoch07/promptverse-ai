import { Link } from "@tanstack/react-router";
import { Search, Upload, Sparkles } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/explore", label: "Explore" },
  { to: "/workflows", label: "Workflows" },
  { to: "/dashboard", label: "Dashboard" },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
              activeProps={{ className: "text-foreground bg-white/5" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden flex-1 max-w-md md:block">
          <Link to="/explore" className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/40 hover:bg-white/10">
            <Search className="h-4 w-4" />
            <span>Search prompts, creators, models...</span>
            <kbd className="ml-auto rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-mono">⌘K</kbd>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/login">Sign in</Link>
          </Button>
          <Button asChild variant="hero" size="sm">
            <Link to="/upload"><Upload className="h-4 w-4" /> Upload</Link>
          </Button>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </header>
  );
}

export function MobileBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
      <Sparkles className="h-3 w-3 text-primary" /> New: Sora 2 workflows
    </div>
  );
}