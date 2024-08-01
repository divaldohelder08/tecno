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
      <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter a new password"
            required
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$"
            title="Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your new password"
            required
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$"
            title="Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
          />
        </div>
      <Button type="submit" className="w-full" disabled={isPending} >
        {isPending ? (
          <CircleDashed className="motion-reduce:hidden animate-spin" size="20" />
        ) :
          'Entrar'
        }
      </Button>
    </form>
  )
}