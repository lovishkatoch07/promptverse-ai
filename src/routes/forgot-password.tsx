import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell, authInputCls } from "@/components/promptverse/AuthShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — PromptVerse" }] }),
  component: () => (
    <AuthShell
      title="Reset password"
      subtitle="We'll email you a magic link to reset it."
      footer={<><Link to="/login" className="text-primary hover:underline">Back to sign in</Link></>}
    >
      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        <input className={authInputCls} type="email" placeholder="you@studio.ai" />
        <Button variant="hero" className="h-11 w-full">Send reset link</Button>
      </form>
    </AuthShell>
  ),
});