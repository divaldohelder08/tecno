import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { signInWithEmailAndPassword } from "./actions"
import { SignInWithEmailButton } from "./sign-in-with-email-button"

export default function Form() {
  return (
    <form className="grid gap-4" action={signInWithEmailAndPassword} method="POST" >
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="m@example.com"
          defaultValue="john@acme.com"
          required
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <Link
            href="forgot-password"
            className="ml-auto inline-block text-sm underline"
          >
            Esqueci a password?
          </Link>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          defaultValue="200520"
          required
        />
      </div>
      <SignInWithEmailButton />
      <Button variant="outline" className="w-full" disabled>
        Entrar com Google
      </Button>
    </form>
  )
}