"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { toast } from "@/components/ui/use-toast";
import { toast as sonner } from "sonner";

const formSchema = z.object({
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
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function login(data: FormData) {
    const { email, password } = data;
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log("Resultado do signIn:", result);
      router.push("/");
      toast({
        title: "Autenticado com sucesso!",
        description: "Será redirecionado dentro de momentos...",
      });
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
      <Button type="submit" className="w-full" disabled={isSubmitting || isRedirecting}>
        {isSubmitting ? (
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
