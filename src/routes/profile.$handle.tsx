import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/promptverse/Layout";
import { PromptCard } from "@/components/promptverse/PromptCard";
import { Button } from "@/components/ui/button";
import { Globe, Twitter, Instagram, BadgeCheck } from "lucide-react";
import { prompts, featuredCreators } from "@/data/prompts";

export const Route = createFileRoute("/profile/$handle")({
  head: ({ params }) => ({
    meta: [
      { title: `@${params.handle} — PromptVerse AI` },
      { name: "description", content: `Prompts and workflows from @${params.handle}.` },
    ],
    links: [{ rel: "canonical", href: `/profile/${params.handle}` }],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { handle } = Route.useParams();
  const creator =
    featuredCreators.find((c) => c.handle.replace("@", "") === handle) ??
    { name: handle, handle: `@${handle}`, avatar: `https://api.dicebear.com/7.x/glass/svg?seed=${handle}`, followers: "1.2K", specialty: "AI creator" };
  const uploaded = prompts.filter((p) => p.creator.handle === creator.handle);
  const saved = prompts.slice(0, 4);
  const [tab, setTab] = useState<"uploaded" | "saved">("uploaded");
  const list = tab === "uploaded" ? (uploaded.length ? uploaded : prompts.slice(0, 6)) : saved;

  return (
    <Layout>
      {/* Banner */}
      <div className="relative h-56 sm:h-72">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,oklch(0.7_0.25_300/0.4),transparent_60%)]" />
      </div>

      <div className="relative mx-auto -mt-16 max-w-7xl px-6">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
          <img src={creator.avatar} alt={creator.name} className="h-32 w-32 rounded-3xl border-4 border-background shadow-card" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-semibold tracking-tight">{creator.name}</h1>
              <BadgeCheck className="h-5 w-5 fill-primary text-primary-foreground" />
            </div>
            <p className="text-muted-foreground">{creator.handle} · {creator.specialty}</p>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">Crafting cinematic AI content one frame at a time. Available for brand collabs.</p>
            <div className="mt-3 flex gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5" /> site.io</span>
              <span className="flex items-center gap-1"><Twitter className="h-3.5 w-3.5" /> {creator.handle}</span>
              <span className="flex items-center gap-1"><Instagram className="h-3.5 w-3.5" /> {creator.handle}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="hero">Follow</Button>
            <Button variant="glass">Message</Button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
          {[
            { v: creator.followers, l: "Followers" },
            { v: "412", l: "Following" },
            { v: uploaded.length || 12, l: "Uploaded" },
          ].map((s) => (
            <div key={s.l} className="bg-background/40 p-4 text-center">
              <div className="text-xl font-semibold">{s.v}</div>
              <div className="text-xs text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 inline-flex rounded-xl border border-white/10 bg-white/5 p-1">
          {(["uploaded", "saved"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-lg px-4 py-1.5 text-sm capitalize transition ${tab === t ? "bg-primary/20 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-6 columns-2 gap-4 pb-24 sm:columns-3 lg:columns-4 [&>*]:mb-4">
          {list.map((p) => (
            <PromptCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </Layout>
  );
}