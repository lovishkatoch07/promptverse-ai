import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/promptverse/Layout";
import { Button } from "@/components/ui/button";
import { UploadCloud, X, Plus } from "lucide-react";
import { categories } from "@/data/prompts";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [{ title: "Upload prompt — PromptVerse" }, { name: "robots", content: "noindex" }],
  }),
  component: UploadPage,
});

const models = ["Midjourney v7", "Flux 1.1 Pro", "Sora", "DALL·E 4", "Runway Gen-4", "Octane"];
const difficulties = ["Beginner", "Intermediate", "Advanced"];

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20";

function UploadPage() {
  const [tags, setTags] = useState<string[]>(["cinematic"]);
  const [tag, setTag] = useState("");
  const [drag, setDrag] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files?.[0];
    if (f) setPreview(URL.createObjectURL(f));
  };

  return (
    <Layout>
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-4xl font-semibold tracking-tight">Upload a prompt</h1>
        <p className="mt-1 text-muted-foreground">Share your work with 92K+ creators.</p>

        <form className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr]" onSubmit={(e) => e.preventDefault()}>
          {/* Media */}
          <div>
            <div
              onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={onDrop}
              className={`relative flex aspect-[3/4] flex-col items-center justify-center rounded-3xl border-2 border-dashed transition ${drag ? "border-primary bg-primary/5" : "border-white/15 bg-white/[0.03]"}`}
            >
              {preview ? (
                <>
                  <img src={preview} alt="preview" className="absolute inset-0 h-full w-full rounded-3xl object-cover" />
                  <button type="button" onClick={() => setPreview(null)} className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/80">
                    <X className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
                    <UploadCloud className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">Drop your file here</h3>
                  <p className="mt-1 text-sm text-muted-foreground">PNG, JPG, MP4 — up to 50MB</p>
                  <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
                    Browse files
                    <input type="file" accept="image/*,video/*" className="hidden" onChange={(e) => {
                      const f = e.target.files?.[0]; if (f) setPreview(URL.createObjectURL(f));
                    }} />
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-5">
            <Field label="Title">
              <input className={inputCls} placeholder="Neon Oracle Portrait" />
            </Field>
            <Field label="Description" hint="Optional, 280 chars">
              <textarea rows={3} className={inputCls} placeholder="What makes this prompt special?" />
            </Field>
            <Field label="Prompt">
              <textarea rows={5} className={`${inputCls} font-mono`} placeholder="ultra detailed cinematic portrait..." />
            </Field>
            <Field label="Negative prompt" hint="Optional">
              <textarea rows={2} className={`${inputCls} font-mono`} placeholder="blurry, watermark, text..." />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Category">
                <select className={inputCls}>
                  {categories.slice(1).map((c) => <option key={c} className="bg-background">{c}</option>)}
                </select>
              </Field>
              <Field label="AI model">
                <select className={inputCls}>
                  {models.map((m) => <option key={m} className="bg-background">{m}</option>)}
                </select>
              </Field>
              <Field label="Difficulty">
                <select className={inputCls}>
                  {difficulties.map((d) => <option key={d} className="bg-background">{d}</option>)}
                </select>
              </Field>
              <Field label="Workflow steps" hint="Optional">
                <input className={inputCls} placeholder="3" type="number" min={1} />
              </Field>
            </div>

            <Field label="Tags">
              <div className="flex flex-wrap gap-2 rounded-xl border border-white/10 bg-white/5 p-2">
                {tags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-xs text-foreground">
                    #{t}
                    <button type="button" onClick={() => setTags((arr) => arr.filter((x) => x !== t))}><X className="h-3 w-3" /></button>
                  </span>
                ))}
                <input
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && tag.trim()) {
                      e.preventDefault();
                      setTags((a) => [...a, tag.trim()]);
                      setTag("");
                    }
                  }}
                  placeholder="Add tag and press Enter"
                  className="min-w-[140px] flex-1 bg-transparent px-2 py-1 text-sm focus:outline-none"
                />
              </div>
            </Field>

            <div className="flex items-center justify-end gap-2 pt-4">
              <Button asChild variant="glass"><Link to="/dashboard">Cancel</Link></Button>
              <Button variant="hero"><Plus className="h-4 w-4" /> Publish prompt</Button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}