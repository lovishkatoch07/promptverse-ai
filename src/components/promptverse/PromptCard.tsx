import { Link } from "@tanstack/react-router";
import { Heart, Bookmark, Copy, Flame, Sparkles } from "lucide-react";
import type { Prompt } from "@/data/prompts";
import { useState } from "react";
import { toast } from "sonner";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function PromptCard({ p }: { p: Prompt }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const copy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard?.writeText(p.prompt);
    toast.success("Prompt copied to clipboard!", {
      icon: <Sparkles className="h-4 w-4 text-primary" />,
    });
  };

  const toggle = (e: React.MouseEvent, fn: () => void, label: string, active: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    fn();
    if (!active) {
      toast.success(`${label}!`, {
        description: p.title,
      });
    }
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      layoutId={`prompt-card-${p.id}`}
    >
      <Link
        to="/prompt/$slug"
        params={{ slug: p.slug }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative block break-inside-avoid overflow-hidden rounded-[2rem] border border-white/5 bg-card/40 transition-all duration-500 hover:z-10 active:scale-[0.98]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Premium Gradient Border & Glow */}
        <motion.div 
          className="absolute inset-0 -z-10 bg-gradient-primary opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30"
          style={{ transform: "translateZ(-20px)" }}
        />
        <div className="absolute inset-0 rounded-[2rem] border border-white/10 transition-colors duration-500 group-hover:border-primary/40" />

        <div className="relative overflow-hidden" style={{ transform: "translateZ(0px)" }}>
          {/* Image with Zoom Effect */}
          <motion.img
            src={p.image}
            alt={p.title}
            loading="lazy"
            className="w-full object-cover transition-transform duration-1000 ease-out"
            whileHover={{ scale: 1.15 }}
            style={{ aspectRatio: `768/${p.height}` }}
          />

          {/* Dynamic Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
          
          {/* Top Badges */}
          <div className="absolute left-4 top-4 flex gap-2" style={{ transform: "translateZ(30px)" }}>
            {p.trending && (
              <motion.span 
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex items-center gap-1 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-xl"
              >
                <Flame className="h-3 w-3 text-primary animate-pulse" /> Trending
              </motion.span>
            )}
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-medium text-white/80 backdrop-blur-xl">
              {p.model}
            </span>
          </div>

          {/* Hover Content Container */}
          <div 
            className="absolute inset-x-0 bottom-0 flex flex-col p-6 transition-transform duration-500 group-hover:translate-y-[-8px]"
            style={{ transform: "translateZ(50px)" }}
          >
            {/* Creator & Info */}
            <div className="flex items-center gap-3">
              <motion.div 
                className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white/20"
                whileHover={{ scale: 1.2, borderColor: "var(--color-primary)" }}
              >
                <img src={p.creator.avatar} alt={p.creator.name} className="h-full w-full object-cover" />
              </motion.div>
              <div className="min-w-0">
                <h3 className="truncate text-lg font-bold tracking-tight text-white group-hover:text-primary transition-colors duration-300">{p.title}</h3>
                <p className="truncate text-xs font-medium text-white/50 group-hover:text-white/80 transition-colors duration-300">{p.creator.handle}</p>
              </div>
            </div>

            <motion.div 
              className="mt-5 flex items-center gap-2 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0"
            >
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(var(--primary), 0.2)" }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => toggle(e, () => setLiked((v) => !v), "Liked", liked)}
                className={`flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 text-xs font-bold text-white backdrop-blur-2xl transition-all ${liked ? "text-primary border-primary/40 bg-primary/10" : ""}`}
              >
                <Heart className={`h-4.5 w-4.5 ${liked ? "fill-primary text-primary" : ""}`} />
                {(p.likes + (liked ? 1 : 0)).toLocaleString()}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(var(--primary), 0.2)" }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => toggle(e, () => setSaved((v) => !v), "Saved to collection", saved)}
                className={`flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 text-xs font-bold text-white backdrop-blur-2xl transition-all ${saved ? "text-primary border-primary/40 bg-primary/10" : ""}`}
              >
                <Bookmark className={`h-4.5 w-4.5 ${saved ? "fill-current" : ""}`} />
                {saved ? "Saved" : "Save"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "var(--color-primary)" }}
                whileTap={{ scale: 0.9 }}
                onClick={copy}
                className="ml-auto flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white backdrop-blur-2xl transition-all"
                title="Copy Prompt"
              >
                <Copy className="h-4.5 w-4.5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}