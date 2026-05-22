import { Logo } from "./Logo";
import { Link } from "@tanstack/react-router";

const cols: { title: string; links: { label: string; to: string }[] }[] = [
  { title: "Product", links: [
    { label: "Explore", to: "/explore" },
    { label: "Workflows", to: "/workflows" },
    { label: "Upload", to: "/upload" },
    { label: "Dashboard", to: "/dashboard" },
  ]},
  { title: "Creators", links: [
    { label: "Featured", to: "/explore" },
    { label: "Become a creator", to: "/signup" },
    { label: "Creator badges", to: "/profile/aether" },
  ]},
  { title: "Company", links: [
    { label: "About", to: "/" },
    { label: "Pricing", to: "/" },
    { label: "Careers", to: "/" },
  ]},
];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/5">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            The home for viral AI prompts, cinematic workflows, and the creator tools shaping the next era of media.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="text-sm font-semibold">{c.title}</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="transition hover:text-foreground">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-2 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 PromptVerse AI. All rights reserved.</span>
          <span>Crafted for creators of the next decade.</span>
        </div>
      </div>
    </footer>
  );
}