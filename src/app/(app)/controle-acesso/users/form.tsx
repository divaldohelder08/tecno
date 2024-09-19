"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUser } from "@/http/members";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDashed, Eye, EyeOff, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  ConfirmPassword: z.string(),
}).refine((data) => data.password === data.ConfirmPassword, {
  message: "As senhas não coincidem",
  path: ["ConfirmPassword"],
});

export type createUserData = z.infer<typeof formSchema>;

export default function Form() {
  const [opn, setOpn] = useState<boolean>(false);
  const [security, setSecurity] = useState<boolean>(true)
  const [security2, setSecurity2] = useState<boolean>(true)
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<createUserData>({
    resolver: zodResolver(formSchema),
  });

  async function send({ name, email, password }: createUserData) {

    const result = await createUser({ name, email, password })
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Usuario cadastrado com sucesso");
    }
    setOpn(false)
    reset()
  }

  return (
    <Dialog open={opn} onOpenChange={setOpn}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Novo Utilizador
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="min-w-[400px] mx-auto">
          <DialogHeader>
            <DialogTitle>Criar utilizador</DialogTitle>
          </DialogHeader>
          <form className="grid w-full items-start gap-6 pt-6" onSubmit={handleSubmit(send)}>
            <div className="grid gap-3">
              <Label htmlFor="name">Nome</Label>
              <Input placeholder="Informe o nome completo" required {...register('name')} />
              {errors.name && (
                <p className="text-sm font-medium text-red-500 dark:text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input placeholder="Informe o email" required {...register('email')} />
              {errors.email && (
                <p className="text-sm font-medium text-red-500 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 items-baseline">
              <div className="grid gap-2 relative">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    required
                    type={security ? 'password' : 'text'}
                    placeholder="Informe a senha"
                    {...register('password')}
                    className="pr-8"
                  />
                  {
                    security
                      ? <Eye
                        onClick={() => setSecurity(false)}
                        className='cursor-pointer absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground'
                      />
                      : <EyeOff
                        onClick={() => setSecurity(true)}
                        className='cursor-pointer absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground'
                      />
                  }
                </div>
                {errors.password && (
                  <p className="text-sm font-medium text-red-500 dark:text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="senha">confirmar senha</Label>
                <div className="relative">
                  <Input
                    required
                    className="pr-8"
                    placeholder="Confirme a senha"
                    {...register('ConfirmPassword')}
                    type={security2 ? 'password' : 'text'} />
                  {
                    security2
                      ? <Eye
                        onClick={() => setSecurity2(false)}
                        className='cursor-pointer absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground'
                      />
                      : <EyeOff
                        onClick={() => setSecurity2(true)}
                        className='cursor-pointer absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground'
                      />
                  }
                </div>

                {errors.ConfirmPassword && (
                  <p className="text-sm font-medium text-red-500 dark:text-red-400">
                    {errors.ConfirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter className="w-full gap-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="destructive"
                  className="w-full gap-1.5 flex"
                >
                  Fechar
                </Button>

              </DialogClose>
              <Button
                size="sm"
                type="submit"
                className="w-full gap-1.5 flex"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircleDashed className="motion-reduce:hidden animate-spin" size="20" />
                ) : 'Salvar'}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}




