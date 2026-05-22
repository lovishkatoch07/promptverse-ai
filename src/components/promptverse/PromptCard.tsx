import { Link } from "@tanstack/react-router";
import { Heart, Bookmark, Copy, Flame } from "lucide-react";
import type { Prompt } from "@/data/prompts";
import { useState } from "react";

export function PromptCard({ p }: { p: Prompt }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const copy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard?.writeText(p.prompt);
  };
  const toggle = (e: React.MouseEvent, fn: () => void) => {
    e.preventDefault();
    fn();
  };

  return (
    <Link
      to="/prompt/$slug"
      params={{ slug: p.slug }}
      className="group relative block break-inside-avoid overflow-hidden rounded-2xl border border-white/8 bg-card hover-lift"
    >
      <div className="relative">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          className="w-full object-cover transition duration-700 group-hover:scale-[1.03]"
          style={{ aspectRatio: `768/${p.height}` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-90" />

        {p.trending && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur-md">
            <Flame className="h-3 w-3 text-primary" /> Trending
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] font-medium text-white/90 backdrop-blur-md">
          {p.model}
        </span>

        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="flex items-center gap-2">
            <img src={p.creator.avatar} alt={p.creator.name} className="h-7 w-7 rounded-full border border-white/20" />
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-white">{p.title}</h3>
              <p className="truncate text-[11px] text-white/60">{p.creator.handle}</p>
            </div>
          </div>

          <div className="mt-3 flex translate-y-2 items-center gap-1.5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              onClick={(e) => toggle(e, () => setLiked((v) => !v))}
              className={`flex h-8 items-center gap-1 rounded-lg border border-white/15 bg-black/50 px-2.5 text-xs text-white backdrop-blur-md transition hover:bg-white/15 ${liked ? "text-primary" : ""}`}
            >
              <Heart className={`h-3.5 w-3.5 ${liked ? "fill-primary text-primary" : ""}`} />
              {(p.likes + (liked ? 1 : 0)).toLocaleString()}
            </button>
            <button
              onClick={(e) => toggle(e, () => setSaved((v) => !v))}
              className="flex h-8 items-center gap-1 rounded-lg border border-white/15 bg-black/50 px-2.5 text-xs text-white backdrop-blur-md transition hover:bg-white/15"
            >
              <Bookmark className={`h-3.5 w-3.5 ${saved ? "fill-current" : ""}`} />
              Save
            </button>
            <button
              onClick={copy}
              className="ml-auto flex h-8 items-center gap-1 rounded-lg border border-white/15 bg-black/50 px-2.5 text-xs text-white backdrop-blur-md transition hover:bg-white/15"
            >
              <Copy className="h-3.5 w-3.5" /> Copy
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}