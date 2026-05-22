import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/promptverse/Layout";
import { Button } from "@/components/ui/button";
import { Clock, Gauge, Download, Play, Sparkles } from "lucide-react";
import { prompts } from "@/data/prompts";

export const Route = createFileRoute("/workflows")({
  head: () => ({
    meta: [
      { title: "AI Workflows — PromptVerse" },
      { name: "description", content: "Step-by-step AI workflow guides for cinematic, fashion, and viral content." },
    ],
    links: [{ rel: "canonical", href: "/workflows" }],
  }),
  component: WorkflowsPage,
});

const flows = [
  { slug: "neon-oracle", difficulty: "Intermediate", time: "12 min", tools: ["Midjourney v7", "Magnific", "Photoshop"] },
  { slug: "tokyo-rain", difficulty: "Beginner", time: "6 min", tools: ["Flux 1.1 Pro", "Krea"] },
  { slug: "noir-elixir", difficulty: "Advanced", time: "25 min", tools: ["Sora", "Runway", "DaVinci Resolve"] },
  { slug: "hangar-zero", difficulty: "Advanced", time: "30 min", tools: ["Sora", "Runway"] },
];

function WorkflowsPage() {
  return (
    <Layout>
      <section className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-hero" />
        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Workflows
          </span>
          <h1 className="mt-2 max-w-2xl text-balance text-5xl font-semibold tracking-tight">Recipes for cinematic AI content</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">Step-by-step guides from creators who ship every week. Tools, settings, and shortcuts included.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-5 md:grid-cols-2">
          {flows.map((f) => {
            const p = prompts.find((x) => x.slug === f.slug)!;
            return (
              <Link
                key={f.slug}
                to="/prompt/$slug"
                params={{ slug: f.slug }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-card hover-lift"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img src={p.image} alt={p.title} className="h-full w-full object-cover transition group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary shadow-glow">
                      <Play className="h-5 w-5 fill-white text-white" />
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="flex items-center gap-2 text-xs text-white/80">
                      <span className="rounded-full bg-black/40 px-2.5 py-1 backdrop-blur-md"><Gauge className="mr-1 inline h-3 w-3" />{f.difficulty}</span>
                      <span className="rounded-full bg-black/40 px-2.5 py-1 backdrop-blur-md"><Clock className="mr-1 inline h-3 w-3" />{f.time}</span>
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold text-white">{p.title}</h3>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 p-5">
                  <div className="flex flex-wrap gap-1.5">
                    {f.tools.map((t) => (
                      <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-muted-foreground">{t}</span>
                    ))}
                  </div>
                  <Button variant="glass" size="sm"><Download className="h-4 w-4" /> Workflow</Button>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}