"use client"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState } from "@/hooks/use-form-state"
import { AlertTriangle, CircleDashed } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword } from "./actions"

export default function Form() {
  const router = useRouter();

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    signInWithEmailAndPassword,
    () => {
      router.push('/')
    },
  )


  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Sign in failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="m@example.com"
          required
        // {...register('email')}
        />
        {/* <span className="text-xs text-red-500 mt-1">{errors.email?.message}</span> */}
        {errors?.email && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.email[0]}
          </p>
        )}
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <Link
            href="/forgot-password"
            className="ml-auto inline-block text-sm underline"
          >
            Esqueci a password?
          </Link>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          required
        // {...register('password')} 
        />
        {/* <span className="text-xs text-red-500 mt-1">{errors.password?.message}</span> */}
        {errors?.password && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.password[0]}
          </p>
        )}

      </div>
      <Button type="submit" className="w-full" disabled={isPending} onClick={() => console.log("ola")}>
        {isPending ? (
          <CircleDashed className="motion-reduce:hidden animate-spin" size="20" />
        ) :
          'Entrar'
        }
      </Button>
      <Button variant="outline" className="w-full" >
        Entrar com Google
      </Button>
    </form>
  )
}