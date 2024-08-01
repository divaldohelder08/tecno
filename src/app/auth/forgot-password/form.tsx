"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CircleDashed } from "lucide-react"
// import { signInWithEmailAndPassword } from "./actions"
import { ResetPasswordVerifyingEmail } from "@/http/auth-request"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"


const verifySchema = z.object({
  email: z
    .string().min(2, "Min 2").toLowerCase().email()
    .email({ message: 'Por favor, insira um email valido.' }),
})
type verifyData = z.infer<typeof verifySchema>
export default function ForgotPasswordForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isPending } } = useForm<verifyData>({
      resolver: zodResolver(verifySchema),
    })
  async function Send({ email }: verifyData) {
    const result = await ResetPasswordVerifyingEmail(email)
    if (result?.error) {
      toast.error(result.error)
    }
    //  else {
    //   router.replace('/auth/forgot-password/reset')
    // }
  }
  return (
    <form className="grid gap-4" onSubmit={handleSubmit(Send)}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
          {...register('email')}
        />
        {
          errors.email && <span className="text-xs text-red-500 dark:text-red-400">                                    {errors.email.message}
          </span>
        }
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <CircleDashed className="motion-reduce:hidden animate-spin" size="20" />
        ) :
          'Enviar'
        }
      </Button>
      <div
        className="mx-auto inline-block text-sm"
      >
        <Link href="/auth/sign-in" className="underline" >
          Voltar
        </Link>
      </div>
    </form>
  )
}