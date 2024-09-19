"use server"

import { signIn } from "@/services/auth";
import { redirect } from "next/navigation";

import { createServerAction } from "zsa";
import { formSchema } from "./form";
import z from "zod";

export const Login = createServerAction()
  .input(z.object({
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
}))
  .handler(async ({ input: { email, password } }) => {
   await signIn("credentials", {
      email,
      password,
      redirect: false
    });
    redirect('/')
  })

