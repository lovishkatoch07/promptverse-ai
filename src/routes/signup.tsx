import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell, authInputCls } from "@/components/promptverse/AuthShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — PromptVerse" }] }),
  component: () => (
    <AuthShell
      title="Join PromptVerse"
      subtitle="Create a free account to save, remix, and ship."
      footer={<>Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link></>}
    >
      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        <input className={authInputCls} placeholder="Display name" />
        <input className={authInputCls} type="email" placeholder="you@studio.ai" />
        <input className={authInputCls} type="password" placeholder="Password" />
        <Button variant="hero" className="h-11 w-full">Create account</Button>
      </form>
    </AuthShell>
  ),
});