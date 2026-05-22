import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/promptverse/Layout";
import { PromptCard } from "@/components/promptverse/PromptCard";
import { Button } from "@/components/ui/button";
import { Eye, Heart, Bookmark, Upload, TrendingUp, Settings, Plus } from "lucide-react";
import { prompts } from "@/data/prompts";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{ title: "Dashboard — PromptVerse" }, { name: "robots", content: "noindex" }],
  }),
  component: Dashboard,
});

const stats = [
  { icon: Eye, label: "Total views", value: "248,392", trend: "+12.4%" },
  { icon: Heart, label: "Likes", value: "18,420", trend: "+8.2%" },
  { icon: Bookmark, label: "Saves", value: "5,108", trend: "+18.6%" },
  { icon: TrendingUp, label: "Trending posts", value: "3", trend: "active" },
];

function Dashboard() {
  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">Welcome back, Aether</h1>
            <p className="mt-1 text-muted-foreground">Here's how your prompts are performing this week.</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="glass"><Link to="/profile/$handle" params={{ handle: "aether" }}><Settings className="h-4 w-4" /> Settings</Link></Button>
            <Button asChild variant="hero"><Link to="/upload"><Plus className="h-4 w-4" /> New prompt</Link></Button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-card p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <s.icon className="h-4 w-4" />
                </div>
                <span className="text-xs text-primary">{s.trend}</span>
              </div>
              <div className="mt-4 text-2xl font-semibold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Your uploads</h2>
            <Button asChild variant="glass" size="sm"><Link to="/upload"><Upload className="h-4 w-4" /> Upload</Link></Button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {prompts.slice(0, 4).map((p) => <PromptCard key={p.id} p={p} />)}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight">Saved prompts</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {prompts.slice(4, 8).map((p) => <PromptCard key={p.id} p={p} />)}
          </div>
        </div>
      </div>
    </Layout>
  );
}