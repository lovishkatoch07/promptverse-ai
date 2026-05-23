import p1 from "@/assets/prompt-1.jpg";
import p2 from "@/assets/prompt-2.jpg";
import p3 from "@/assets/prompt-3.jpg";
import p4 from "@/assets/prompt-4.jpg";
import p5 from "@/assets/prompt-5.jpg";
import p6 from "@/assets/prompt-6.jpg";
import p7 from "@/assets/prompt-7.jpg";
import p8 from "@/assets/prompt-8.jpg";
import p9 from "@/assets/prompt-9.jpg";

export type Prompt = {
  id: string;
  slug: string;
  title: string;
  description: string;
  prompt: string;
  negativePrompt?: string;
  image: string;
  height: number;
  category: string;
  model: string;
  tags: string[];
  likes: number;
  saves: number;
  creator: { name: string; handle: string; avatar: string };
  workflow?: { step: string; detail: string }[];
  settings?: Record<string, string>;
  trending?: boolean;
};

const av = (seed: string) =>
  `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(seed)}`;

export const categories = [
  "All",
  "Cinematic",
  "Anime",
  "Fashion",
  "Influencer",
  "Product",
  "TikTok Viral",
  "3D",
  "Architecture",
] as const;

export const prompts: Prompt[] = [
  {
    id: "1",
    slug: "neon-oracle",
    title: "Neon Oracle Portrait",
    description: "Holographic synthetic being glowing in violet mist.",
    prompt:
      "ultra detailed cinematic portrait of a holographic AI oracle, glowing violet and cyan circuitry across translucent skin, volumetric mist, rim lighting, shot on Arri Alexa 65, 85mm lens, shallow depth of field, 8k",
    negativePrompt: "blurry, watermark, text, deformed, low contrast",
    image: p1,
    height: 1024,
    category: "Cinematic",
    model: "Midjourney v7",
    tags: ["portrait", "neon", "cyberpunk", "cinematic"],
    likes: 12420,
    saves: 3120,
    creator: { name: "Aether Lin", handle: "@aether", avatar: av("aether") },
    trending: true,
    settings: { aspect: "3:4", stylize: "750", chaos: "20" },
    workflow: [
      { step: "Generate base", detail: "Midjourney v7 with --stylize 750" },
      { step: "Upscale", detail: "Magnific 2x creative" },
      { step: "Color grade", detail: "Photoshop Camera Raw, push violet shadows" },
    ],
  },
  {
    id: "2",
    slug: "tokyo-rain",
    title: "Tokyo Rain Anime",
    description: "Cinematic anime backstreet at 3AM.",
    prompt:
      "anime illustration of a rainy neon Tokyo backstreet at 3am, glowing pink and purple kanji signs, wet asphalt reflections, lone car taillights, Makoto Shinkai style, ultra detailed",
    image: p2,
    height: 960,
    category: "Anime",
    model: "Flux 1.1 Pro",
    tags: ["anime", "tokyo", "rain", "neon"],
    likes: 9810,
    saves: 2400,
    creator: { name: "Kaede", handle: "@kaede", avatar: av("kaede") },
    trending: true,
  },
  {
    id: "3",
    slug: "chrome-couture",
    title: "Chrome Couture Editorial",
    description: "High fashion liquid metal editorial.",
    prompt:
      "editorial fashion photograph of a model in liquid chrome couture gown, single hard light from camera right, seamless warm grey backdrop, Vogue cover style, medium format film grain",
    image: p3,
    height: 1024,
    category: "Fashion",
    model: "Flux 1.1 Pro",
    tags: ["fashion", "editorial", "metallic"],
    likes: 7320,
    saves: 1980,
    creator: { name: "Mira Ode", handle: "@miraode", avatar: av("mira") },
  },
  {
    id: "4",
    slug: "noir-elixir",
    title: "Noir Elixir Ad",
    description: "Luxury perfume splash, cinematic ad.",
    prompt:
      "cinematic luxury perfume bottle splashing into dark water, volumetric fog, single key light, ultra glossy reflection, hasselblad H6D, ad campaign aesthetic",
    image: p4,
    height: 896,
    category: "Product",
    model: "Sora",
    tags: ["product", "luxury", "ad"],
    likes: 5410,
    saves: 1620,
    creator: { name: "Studio Vox", handle: "@studiovox", avatar: av("vox") },
  },
  {
    id: "5",
    slug: "pastel-muse",
    title: "Pastel AI Muse",
    description: "Dreamy AI influencer portrait.",
    prompt:
      "soft pastel AI influencer portrait, blonde hair, magenta gel light from right, beauty dish key, hyperreal skin, 50mm",
    image: p5,
    height: 1024,
    category: "Influencer",
    model: "Midjourney v7",
    tags: ["influencer", "pastel", "beauty"],
    likes: 4860,
    saves: 1410,
    creator: { name: "Lumi", handle: "@lumi", avatar: av("lumi") },
  },
  {
    id: "6",
    slug: "hangar-zero",
    title: "Hangar Zero",
    description: "Sci-fi spaceship hangar in volumetric light.",
    prompt:
      "cinematic sci-fi hangar interior, volumetric haze, cyan emergency strips, blade runner color palette, ultra wide 21:9, hero composition",
    image: p6,
    height: 768,
    category: "Cinematic",
    model: "Sora",
    tags: ["scifi", "hangar", "cinematic"],
    likes: 8120,
    saves: 2210,
    creator: { name: "Rune", handle: "@rune", avatar: av("rune") },
    trending: true,
  },
  {
    id: "7",
    slug: "nebula-walker",
    title: "Nebula Walker",
    description: "Astronaut floating through cosmic dye.",
    prompt:
      "astronaut drifting in vibrant nebula, magenta and teal cosmic clouds, dust particles, hyper detailed",
    image: p7,
    height: 960,
    category: "TikTok Viral",
    model: "Flux 1.1 Pro",
    tags: ["space", "viral", "tiktok"],
    likes: 22300,
    saves: 5800,
    creator: { name: "Cosmo", handle: "@cosmo", avatar: av("cosmo") },
    trending: true,
  },
  {
    id: "8",
    slug: "monolith",
    title: "Monolith Golden Hour",
    description: "Brutalist architecture caught at dusk.",
    prompt:
      "brutalist concrete monolith at golden hour, long shadows, anamorphic flare, architectural digest style",
    image: p8,
    height: 896,
    category: "Architecture",
    model: "Midjourney v7",
    tags: ["architecture", "brutalist", "golden hour"],
    likes: 3110,
    saves: 940,
    creator: { name: "Atlas", handle: "@atlas", avatar: av("atlas") },
  },
  {
    id: "9",
    slug: "liquid-iridium",
    title: "Liquid Iridium 3D",
    description: "Iridescent chrome blob, abstract 3D.",
    prompt:
      "abstract liquid iridium blob, iridescent purple to coral, dark velvet backdrop, octane render, 8k product hero",
    image: p9,
    height: 1024,
    category: "3D",
    model: "Octane",
    tags: ["3d", "abstract", "chrome"],
    likes: 6720,
    saves: 1880,
    creator: { name: "Nova", handle: "@nova", avatar: av("nova") },
  },
];

export const featuredCreators = [
  { name: "Aether Lin", handle: "@aether", avatar: av("aether"), followers: "184K", specialty: "Cinematic AI" },
  { name: "Kaede", handle: "@kaede", avatar: av("kaede"), followers: "92K", specialty: "Anime worlds" },
  { name: "Mira Ode", handle: "@miraode", avatar: av("mira"), followers: "76K", specialty: "Fashion AI" },
  { name: "Cosmo", handle: "@cosmo", avatar: av("cosmo"), followers: "210K", specialty: "Viral TikTok" },
  { name: "Studio Vox", handle: "@studiovox", avatar: av("vox"), followers: "58K", specialty: "Product ads" },
  { name: "Nova", handle: "@nova", avatar: av("nova"), followers: "44K", specialty: "3D abstract" },
];

export function getPromptBySlug(slug: string) {
  return prompts.find((p) => p.slug === slug);
}

export function getRelatedPrompts(slug: string, n = 4) {
  const me = getPromptBySlug(slug);
  if (!me) return prompts.slice(0, n);
  return prompts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => (b.category === me.category ? 1 : 0) - (a.category === me.category ? 1 : 0))
    .slice(0, n);
}