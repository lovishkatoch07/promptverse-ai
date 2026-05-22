import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="relative grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,oklch(0.7_0.25_300/0.4),transparent_60%),radial-gradient(circle_at_70%_70%,oklch(0.7_0.22_240/0.4),transparent_60%)] animate-glow-pulse" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Logo />
          <div>
            <p className="max-w-md text-3xl font-semibold leading-tight">
              "PromptVerse turned my AI hobby into a full-time studio. The community alone is worth it."
            </p>
            <p className="mt-4 text-sm text-muted-foreground">— Aether Lin · 184K followers</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8"><Logo /></div>
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>

          <div className="mt-8 space-y-3">
            <Button variant="glass" className="w-full">Continue with Google</Button>
            <Button variant="glass" className="w-full">Continue with GitHub</Button>
            <div className="relative my-2 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex-1 border-t border-white/10" />
              <span>or</span>
              <span className="flex-1 border-t border-white/10" />
            </div>
          </div>

          {children}
          <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>

          <p className="mt-10 text-center text-xs text-muted-foreground">
            By continuing you agree to our <Link to="/" className="underline">Terms</Link> and <Link to="/" className="underline">Privacy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

export const authInputCls =
  "h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20";