import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Compass, Upload, Star, Flame, Zap, TrendingUp } from "lucide-react";
import { Layout } from "@/components/promptverse/Layout";
import { PromptCard } from "@/components/promptverse/PromptCard";
import { Button } from "@/components/ui/button";
import { prompts, featuredCreators, categories } from "@/data/prompts";
import heroOrb from "@/assets/hero-orb.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PromptVerse AI — Discover Viral AI Prompts & Cinematic Workflows" },
      { name: "description", content: "Discover, save, and remix viral AI image prompts, cinematic video workflows, and trending creator tools — all in one place." },
      { property: "og:title", content: "PromptVerse AI" },
      { property: "og:description", content: "Viral AI prompts and cinematic workflows from the world's best creators." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const trending = prompts.filter((p) => p.trending);
  const showcase = prompts.slice(0, 8);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-hero" />
        <div className="pointer-events-none absolute left-1/2 top-32 -z-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/30 blur-[140px] animate-glow-pulse" />

        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 sm:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground backdrop-blur-md">
              <Sparkles className="h-3 w-3 text-primary" />
              The home for the next generation of AI creators
            </div>
            <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              Discover viral <span className="text-gradient-primary">AI prompts</span>
              <br className="hidden sm:block" /> & cinematic <span className="text-gradient">workflows</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
              The visual library powering creators in 2026. Remix prompts, copy workflows, and ship trend-ready content in minutes — not days.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/explore"><Compass className="h-5 w-5" /> Explore prompts <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <Link to="/upload"><Upload className="h-5 w-5" /> Upload prompt</Link>
              </Button>
            </div>

            <div className="mt-10 flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-primary" /> 4.9 from 12k creators</div>
              <div className="hidden h-3 w-px bg-white/10 sm:block" />
              <div className="hidden sm:flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-accent" /> Sora 2 + Flux 1.1 ready</div>
            </div>
          </div>

          {/* Floating preview */}
          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="relative rounded-3xl border border-white/10 bg-card p-2 shadow-card glass">
              <img src={heroOrb} alt="PromptVerse hero visual" width={1280} height={1280} className="w-full rounded-2xl" />
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
            </div>
            <div className="pointer-events-none absolute -inset-x-10 -bottom-8 h-40 bg-gradient-to-t from-background to-transparent" />
          </div>
        </div>
      </section>

      {/* CATEGORIES MARQUEE */}
      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Trending categories</h2>
            <Link to="/explore" className="text-sm text-muted-foreground hover:text-foreground">View all →</Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.slice(1).map((c, i) => (
              <Link
                key={c}
                to="/explore"
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition hover:border-primary/40"
              >
                <div
                  className="absolute inset-0 -z-0 opacity-0 transition group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle at ${i * 13}% 50%, oklch(0.7 0.25 ${260 + i * 8} / 0.25), transparent 60%)` }}
                />
                <span className="relative text-sm font-medium">{c}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
                <Flame className="h-3.5 w-3.5" /> Trending now
              </span>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">What creators are remixing this week</h2>
            </div>
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link to="/explore">See everything <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {showcase.map((p) => (
              <PromptCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] sm:grid-cols-4">
            {[
              { v: "240K+", l: "Prompts shared" },
              { v: "18M", l: "Remixes generated" },
              { v: "92K", l: "Active creators" },
              { v: "4.9★", l: "Creator rating" },
            ].map((s) => (
              <div key={s.l} className="bg-background/40 p-8">
                <div className="text-4xl font-semibold text-gradient-primary">{s.v}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Built for the way creators actually work</h2>
            <p className="mt-3 text-muted-foreground">From spark of an idea to viral post — without the friction.</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              { icon: Compass, title: "Discover instantly", body: "Pinterest-style discovery tuned for prompts. Filter by model, vibe, or trend." },
              { icon: Zap, title: "Copy. Remix. Ship.", body: "One tap copies the full prompt, settings, and workflow into your tool of choice." },
              { icon: TrendingUp, title: "Trend-aware", body: "Surface the prompts going viral on TikTok, Reels, and X — before everyone else." },
            ].map((f, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card p-6 hover-lift">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
                  <f.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CREATORS */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Featured creators</h2>
            <Link to="/explore" className="text-sm text-muted-foreground hover:text-foreground">Browse all →</Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {featuredCreators.map((c) => (
              <Link
                key={c.handle}
                to="/profile/$handle"
                params={{ handle: c.handle.replace("@", "") }}
                className="group rounded-2xl border border-white/10 bg-card p-5 text-center hover-lift"
              >
                <img src={c.avatar} alt={c.name} className="mx-auto h-16 w-16 rounded-full border border-white/15" />
                <h3 className="mt-3 truncate text-sm font-semibold">{c.name}</h3>
                <p className="text-xs text-muted-foreground">{c.specialty}</p>
                <p className="mt-2 text-xs text-primary">{c.followers} followers</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { q: "PromptVerse replaced 6 of my bookmarks. Everything I need lives here now.", n: "Lina M.", r: "Director, Cinematic AI" },
              { q: "I shipped a viral fashion campaign in a single afternoon. Unreal.", n: "Mira O.", r: "Creator, 76K" },
              { q: "The workflow library alone is worth it. Pure signal, zero noise.", n: "Atlas K.", r: "Studio Lead" },
            ].map((t, i) => (
              <figure key={i} className="rounded-2xl border border-white/10 bg-card p-6">
                <blockquote className="text-base leading-relaxed">"{t.q}"</blockquote>
                <figcaption className="mt-4 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{t.n}</span> · {t.r}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 py-24">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-card p-12 text-center">
          <div className="pointer-events-none absolute inset-0 bg-gradient-hero opacity-80" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-[120px]" />
          <div className="relative">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">Your next viral post is one prompt away</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Join 92,000+ creators using PromptVerse to ship trend-ready AI content every day.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild variant="hero" size="xl"><Link to="/signup">Get started free</Link></Button>
              <Button asChild variant="glass" size="xl"><Link to="/explore">Browse prompts</Link></Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
