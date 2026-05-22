import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2 ${className}`}>
      <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
        <span className="absolute inset-0 rounded-lg bg-gradient-primary opacity-60 blur-md transition group-hover:opacity-100" />
        <svg viewBox="0 0 24 24" className="relative h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M4 4l8 16 8-16M8 4l4 8 4-8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-lg font-semibold tracking-tight">
        Prompt<span className="text-gradient-primary">Verse</span>
      </span>
    </Link>
  );
}