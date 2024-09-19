"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LogIn } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";
import { useServerAction } from "zsa-react";
import { Login } from "./actions";

export const formSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Formato inválido")
    .toLowerCase(),
  password: z
    .string({
      required_error: "Por favor insira a senha.",
    })
    .max(255, "A senha deve ter no máximo 255 caracteres."),
});

type FormData = z.infer<typeof formSchema>;

export default function FormComponent() {
  const { isPending, execute, data, error } = useServerAction(Login)
  const { register, formState: { errors }, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })
  async function login(values: FormData) {

    const [data, err] = await execute(values)

    if (err) {
      console.log(err, `err`)
      toast({
        title: "Aconteceu algum erro!",
        description: "Será redirecionado dentro de momentos...",
      });
      return
    }
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(login)} method="POST">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          {...register("email")}
          type="email"
          placeholder="m@example.com"
          required
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </div>
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link href="forgot-password" className="text-sm underline">
            Esqueci a password?
          </Link>
        </div>
        <Input
          id="password"
          {...register("password")}
          type="password"
          required
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <LogIn className="mr-2 h-4 w-4" />
        )}
        Entrar
      </Button>
      <Button variant="outline" className="w-full" disabled>
        Entrar com Google
      </Button>
    </form>
  );
}
