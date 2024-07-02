"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"
import { resetRequest } from "@/http/auth-request"
import { zodResolver } from "@hookform/resolvers/zod"
import { deleteCookie } from "cookies-next"
import { CircleDashed } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"


const restSchema = z.object({
  code: z.string().min(6, "Min 6").max(6, 'Max 6'),
  password: z.string().min(1, { message: 'Please, provide your password.' }),
})
type restData = z.infer<typeof restSchema>
export default function Form() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isPending }
  } = useForm<restData>({
    resolver: zodResolver(restSchema)
  })

  async function send(data: restData) {
    const result = await resetRequest(data)
    if (result?.error) {
      toast.error(result.error)
    } else {
      router.replace('/')
    }
  }
  return (
    <form className="grid gap-4" onSubmit={handleSubmit(send)}>
      <div className="grid gap-2">
        <Label htmlFor="email">Código de verificação</Label>
        <InputOTP maxLength={6} {...register('code')}>
          <InputOTPGroup>
            <InputOTPSlot index={0} className="w-12" />
            <InputOTPSlot index={1} className="w-12" />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} className="w-12" />
            <InputOTPSlot index={3} className="w-12" />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} className="w-12" />
            <InputOTPSlot index={5} className="w-12" />
          </InputOTPGroup>
        </InputOTP>
        {errors?.code && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.code.message}
          </p>
        )}
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Nova senha</Label>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="Insira a nova senha"
          required
          {...register('password')}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isPending} >
        {isPending ? (
          <CircleDashed className="motion-reduce:hidden animate-spin" size="20" />
        ) :
          'Entrar'
        }
      </Button>
      <div
        className="mx-auto inline-block text-sm"
      >
        <Link href="#" className="underline" onClick={() => {
          deleteCookie('reset')
          router.replace('/auth/forgot-password')
        }}>
          Tente novamente
        </Link>
      </div>
    </form>
  )
}