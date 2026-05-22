import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  Heart, Bookmark, Share2, Copy, Check, Sparkles, Wand2, Settings2, Tag, ArrowLeft, MessageCircle,
} from "lucide-react";
import { Layout } from "@/components/promptverse/Layout";
import { PromptCard } from "@/components/promptverse/PromptCard";
import { Button } from "@/components/ui/button";
import { getPromptBySlug, getRelatedPrompts } from "@/data/prompts";

export const Route = createFileRoute("/prompt/$slug")({
  loader: ({ params }) => {
    const p = getPromptBySlug(params.slug);
    if (!p) throw notFound();
    return { prompt: p, related: getRelatedPrompts(params.slug) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.prompt.title} — PromptVerse AI` },
          { name: "description", content: loaderData.prompt.description },
          { property: "og:title", content: loaderData.prompt.title },
          { property: "og:description", content: loaderData.prompt.description },
          { property: "og:image", content: loaderData.prompt.image },
          { property: "og:type", content: "article" },
        ]
      : [],
    links: loaderData ? [{ rel: "canonical", href: `/prompt/${loaderData.prompt.slug}` }] : [],
  }),
  notFoundComponent: () => (
    <Layout>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="text-4xl font-semibold">Prompt not found</h1>
        <p className="mt-2 text-muted-foreground">It may have been removed or the link is wrong.</p>
        <Button asChild variant="hero" className="mt-6"><Link to="/explore">Back to explore</Link></Button>
      </div>
    </Layout>
  ),
  errorComponent: ({ reset }) => (
    <Layout>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="text-3xl font-semibold">Something went wrong</h1>
        <Button onClick={reset} className="mt-6">Try again</Button>
      </div>
    </Layout>
  ),
  component: PromptPage,
});

function CopyButton({ text, label = "Copy prompt" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <Button
      variant="glass"
      onClick={() => {
        navigator.clipboard?.writeText(text);
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }}
    >
      {done ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
      {done ? "Copied" : label}
    </Button>
  );
}

function PromptPage() {
  const { prompt: p, related } = Route.useLoaderData();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-6 py-8">
        <Link to="/explore" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to explore
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          {/* MEDIA */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-card shadow-card">
              <img src={p.image} alt={p.title} className="w-full" loading="eager" />
              <div className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-md">
                <Sparkles className="h-3 w-3 text-primary" /> {p.model}
              </div>
            </div>

            {/* Engagement */}
            <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-card p-3">
              <button onClick={() => setLiked((v) => !v)} className={`inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 px-4 text-sm transition hover:bg-white/5 ${liked ? "text-primary" : ""}`}>
                <Heart className={`h-4 w-4 ${liked ? "fill-primary" : ""}`} /> {(p.likes + (liked ? 1 : 0)).toLocaleString()}
              </button>
              <button onClick={() => setSaved((v) => !v)} className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 px-4 text-sm transition hover:bg-white/5">
                <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} /> {saved ? "Saved" : "Save"}
              </button>
              <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 px-4 text-sm transition hover:bg-white/5">
                <Share2 className="h-4 w-4" /> Share
              </button>
              <span className="ml-auto text-xs text-muted-foreground">{p.saves.toLocaleString()} saves</span>
            </div>
          </div>

          {/* INFO */}
          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs text-primary">{p.category}</span>
                {p.trending && <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs">🔥 Trending</span>}
              </div>
              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">{p.title}</h1>
              <p className="mt-3 text-muted-foreground">{p.description}</p>
            </div>

            {/* Creator */}
            <Link to="/profile/$handle" params={{ handle: p.creator.handle.replace("@", "") }} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-card p-4 hover:bg-white/5">
              <img src={p.creator.avatar} alt={p.creator.name} className="h-12 w-12 rounded-full border border-white/15" />
              <div>
                <div className="text-sm font-semibold">{p.creator.name}</div>
                <div className="text-xs text-muted-foreground">{p.creator.handle}</div>
              </div>
              <Button variant="hero" size="sm" className="ml-auto">Follow</Button>
            </Link>

            {/* Prompt text */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  <Wand2 className="h-3.5 w-3.5" /> Prompt
                </h2>
                <CopyButton text={p.prompt} />
              </div>
              <pre className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/30 p-5 font-mono text-sm leading-relaxed text-foreground/90">
{p.prompt}
              </pre>
            </section>

            {p.negativePrompt && (
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Negative prompt</h2>
                  <CopyButton text={p.negativePrompt} label="Copy" />
                </div>
                <pre className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/30 p-5 font-mono text-sm text-foreground/80">
{p.negativePrompt}
                </pre>
              </section>
            )}

            {/* Settings */}
            {p.settings && (
              <section>
                <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  <Settings2 className="h-3.5 w-3.5" /> Settings
                </h2>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(p.settings).map(([k, v]) => (
                    <div key={k} className="rounded-xl border border-white/10 bg-card p-3">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div>
                      <div className="mt-1 font-mono text-sm">{v}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Workflow */}
            {p.workflow && (
              <section>
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Workflow</h2>
                <ol className="space-y-2">
                  {p.workflow.map((s, i) => (
                    <li key={i} className="flex gap-3 rounded-xl border border-white/10 bg-card p-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-xs font-semibold">
                        {i + 1}
                      </span>
                      <div>
                        <div className="text-sm font-medium">{s.step}</div>
                        <div className="text-xs text-muted-foreground">{s.detail}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Tags */}
            <section>
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                <Tag className="h-3.5 w-3.5" /> Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">#{t}</span>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Comments stub */}
        <section className="mt-16">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <MessageCircle className="h-5 w-5" /> Comments <span className="text-muted-foreground">· 24</span>
          </h2>
          <div className="rounded-2xl border border-white/10 bg-card p-4">
            <textarea
              placeholder="Share how you remixed this prompt..."
              className="min-h-[80px] w-full resize-none rounded-xl bg-transparent p-2 text-sm focus:outline-none"
            />
            <div className="mt-2 flex justify-end">
              <Button variant="hero" size="sm">Post comment</Button>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">More like this</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((rp) => (
              <PromptCard key={rp.id} p={rp} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}