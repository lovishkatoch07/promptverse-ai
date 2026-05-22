import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, TrendingUp, Sparkles, Bookmark } from "lucide-react";
import { Layout } from "@/components/promptverse/Layout";
import { PromptCard } from "@/components/promptverse/PromptCard";
import { CategoryPill } from "@/components/promptverse/CategoryPill";
import { prompts, categories } from "@/data/prompts";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore prompts — PromptVerse AI" },
      { name: "description", content: "Browse a masonry-style library of trending AI image, video, and workflow prompts." },
      { property: "og:title", content: "Explore — PromptVerse AI" },
      { property: "og:description", content: "The world's best AI prompts in one infinite feed." },
    ],
    links: [{ rel: "canonical", href: "/explore" }],
  }),
  component: ExplorePage,
});

const sorts = ["Trending", "Newest", "Most saved"] as const;

function ExplorePage() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Trending");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    let arr = prompts.slice();
    if (cat !== "All") arr = arr.filter((p) => p.category === cat);
    if (q.trim()) {
      const s = q.toLowerCase();
      arr = arr.filter(
        (p) =>
          p.title.toLowerCase().includes(s) ||
          p.tags.some((t) => t.includes(s)) ||
          p.creator.name.toLowerCase().includes(s),
      );
    }
    if (sort === "Trending") arr.sort((a, b) => Number(!!b.trending) - Number(!!a.trending) || b.likes - a.likes);
    if (sort === "Newest") arr.reverse();
    if (sort === "Most saved") arr.sort((a, b) => b.saves - a.saves);
    return arr;
  }, [cat, q, sort]);

  return (
    <Layout>
      <section className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-hero" />
        <div className="relative mx-auto max-w-7xl px-6 pt-12 pb-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
                  <Sparkles className="h-3.5 w-3.5" /> Explore
                </span>
                <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">The prompt universe</h1>
                <p className="mt-2 max-w-xl text-muted-foreground">A live feed of viral AI prompts, cinematic workflows, and tools.</p>
              </div>
            </div>

            <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search prompts, creators, models..."
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
                  {sorts.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSort(s)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${sort === s ? "bg-primary/20 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      {s === "Trending" && <TrendingUp className="mr-1 inline h-3 w-3" />}
                      {s === "Most saved" && <Bookmark className="mr-1 inline h-3 w-3" />}
                      {s}
                    </button>
                  ))}
                </div>
                <button className="hidden h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 text-xs text-muted-foreground hover:text-foreground sm:inline-flex">
                  <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
                </button>
              </div>
            </div>

            <div className="-mx-6 overflow-x-auto px-6">
              <div className="flex gap-2 pb-1">
                {categories.map((c) => (
                  <CategoryPill key={c} active={cat === c} onClick={() => setCat(c)}>
                    {c}
                  </CategoryPill>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {list.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-card p-16 text-center text-muted-foreground">
              No prompts match your filters.
            </div>
          ) : (
            <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
              {list.map((p) => (
                <PromptCard key={p.id} p={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}