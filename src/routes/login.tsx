import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell, authInputCls } from "@/components/promptverse/AuthShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — PromptVerse" }] }),
  component: () => (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue your prompt journey."
      footer={<>Don't have an account? <Link to="/signup" className="text-primary hover:underline">Sign up</Link></>}
    >
      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        <input className={authInputCls} type="email" placeholder="you@studio.ai" />
        <input className={authInputCls} type="password" placeholder="Password" />
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs text-muted-foreground hover:text-foreground">Forgot password?</Link>
        </div>
        <Button variant="hero" className="h-11 w-full">Sign in</Button>
      </form>
    </AuthShell>
  ),
});