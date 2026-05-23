import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Compass, Upload, Star, Zap, TrendingUp, Layers, MousePointer2, ShieldCheck, PlayCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Layout } from "@/components/promptverse/Layout";
import { PromptCard } from "@/components/promptverse/PromptCard";
import { Button } from "@/components/ui/button";
import { prompts, featuredCreators, categories } from "@/data/prompts";
import heroOrb from "@/assets/hero-orb.jpg";
import { useRef, useState, useEffect } from "react";
import { FadeIn } from "@/components/promptverse/FadeIn";
import { motion } from "framer-motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PromptVerse AI — The Future of Generative Art & Workflows" },
      { name: "description", content: "Discover, remix, and share viral AI image prompts and cinematic video workflows. The visual library for the next generation of creators." },
    ],
  }),
  component: Index,
});

function CarouselSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trending = prompts.filter(p => p.trending);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const move = clientWidth * 0.8;
      scrollRef.current.scrollTo({ left: dir === "left" ? scrollLeft - move : scrollLeft + move, behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between mb-12">
          <FadeIn>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
              <TrendingUp className="h-3.5 w-3.5" /> Trending now
            </span>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Viral this week</h2>
          </FadeIn>
          <FadeIn delay={0.2} direction="none" className="flex gap-2">
            <button onClick={() => scroll("left")} className="h-12 w-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => scroll("right")} className="h-12 w-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </FadeIn>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8"
        >
          {trending.map((p, i) => (
            <motion.div 
              key={p.id} 
              className="min-w-[300px] sm:min-w-[380px] snap-start"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <PromptCard p={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkflowPreview() {
  return (
    <section className="relative py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,oklch(0.68_0.24_295/0.1),transparent_50%)]" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn direction="left" distance={40}>
            <h2 className="text-4xl font-bold tracking-tight sm:text-6xl leading-[1.1]">
              From concept to <span className="text-gradient-primary">masterpiece</span> in seconds.
            </h2>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
              Our cinematic workflows aren't just prompts. They are full technical pipelines used by top studios. One tap to copy every setting, seed, and upscale step.
            </p>
            
            <div className="mt-12 space-y-8">
              {[
                { icon: Layers, title: "Layered Workflows", desc: "Multi-step generation paths for consistent characters and styles." },
                { icon: MousePointer2, title: "One-Click Remix", desc: "Instantly load any prompt's full configuration into your tools." },
                { icon: ShieldCheck, title: "Studio Grade", desc: "Verified prompts optimized for Sora 2, Midjourney v7, and Flux." }
              ].map((item, i) => (
                <FadeIn key={i} delay={0.1 * i} direction="left" distance={20} className="flex gap-5 group">
                  <div className="h-12 w-12 shrink-0 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:border-primary/50 transition-colors">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-muted-foreground text-sm mt-1">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>

          <FadeIn direction="right" distance={40} className="relative group">
            <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-3xl group-hover:opacity-30 transition-opacity" />
            <div className="relative rounded-[2.5rem] border border-white/10 bg-card/40 p-3 glass-strong shadow-card overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10" />
              <img src={heroOrb} alt="Workflow" className="w-full rounded-[2rem] grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="h-20 w-20 flex items-center justify-center rounded-full bg-primary text-white shadow-glow hover:scale-110 transition-transform">
                  <PlayCircle className="h-10 w-10 fill-current" />
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Index() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout>
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[1000px] w-[1000px] bg-primary/10 blur-[160px] animate-pulse-slow" />
          <div className="absolute -top-40 -right-40 h-[600px] w-[600px] bg-accent/10 blur-[120px] animate-glow-pulse" />
          <div className="absolute top-[20%] left-0 h-[400px] w-[400px] bg-primary/5 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-7xl px-6 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary/80 backdrop-blur-md mb-8">
              <Sparkles className="h-3.5 w-3.5 animate-spin-slow" />
              The Visual Engine for 2026
            </div>
            
            <h1 className="text-balance text-6xl font-black leading-[0.95] tracking-tight sm:text-8xl lg:text-[10rem]">
              DESIGN THE <br />
              <span className="text-gradient-primary">UNTHINKABLE.</span>
            </h1>
            
            <p className="mx-auto mt-10 max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl leading-relaxed">
              The premium library for viral AI prompts and cinematic workflows. <br className="hidden sm:block" /> 
              Used by 92,000+ top-tier creators to ship masterpieces daily.
            </p>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Button asChild variant="hero" size="xl" className="h-16 px-10 text-lg rounded-2xl shadow-glow">
                <Link to="/explore">Start Creating <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild variant="glass" size="xl" className="h-16 px-10 text-lg rounded-2xl border-white/10 hover:bg-white/10">
                <Link to="/upload">Upload Prompt</Link>
              </Button>
            </div>

            <div className="mt-16 flex items-center justify-center gap-8 text-sm font-medium text-muted-foreground/60">
              <div className="flex items-center gap-2"><Star className="h-4 w-4 text-primary" /> 4.9 Rating</div>
              <div className="h-1 w-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-accent" /> Sora 2 + Flux Ready</div>
              <div className="h-1 w-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-2"><Layers className="h-4 w-4 text-primary" /> 240K+ Prompts</div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TRENDING CAROUSEL */}
      <CarouselSection />

      {/* WORKFLOW PREVIEW */}
      <WorkflowPreview />

      {/* CREATORS MARQUEE (REFINED) */}
      <section className="relative py-24 overflow-hidden border-y border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 mb-12">
          <FadeIn className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Joined by the world's best</h2>
          </FadeIn>
        </div>
        
        <div className="flex gap-6 animate-marquee whitespace-nowrap px-6">
          {[...featuredCreators, ...featuredCreators].map((c, i) => (
            <Link
              key={`${c.handle}-${i}`}
              to="/profile/$handle"
              params={{ handle: c.handle.replace("@", "") }}
              className="inline-flex items-center gap-4 rounded-[2rem] border border-white/10 bg-card/40 p-4 pr-8 hover:border-primary/50 transition-all hover:shadow-neon glass group"
            >
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white/20 group-hover:scale-110 transition-transform">
                <img src={c.avatar} alt={c.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="font-bold text-white">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.specialty}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA SECTION (REFINED) */}
      <section className="relative px-6 py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_100%,oklch(0.68_0.24_295/0.2),transparent_70%)]" />
        <FadeIn className="relative mx-auto max-w-5xl overflow-hidden rounded-[3rem] border border-white/10 bg-card p-16 sm:p-24 text-center glass-strong">
          <div className="absolute inset-0 bg-gradient-hero opacity-30" />
          <div className="relative">
            <h2 className="text-5xl font-black tracking-tight sm:text-7xl">READY TO <span className="text-gradient-primary">LEVEL UP?</span></h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              Stop guessing. Start shipping. Join the most advanced creative community on the planet.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Button asChild variant="hero" size="xl" className="h-16 px-12 text-lg rounded-2xl shadow-glow">
                <Link to="/signup">Join PromptVerse Free</Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </section>
    </Layout>
  );
}
