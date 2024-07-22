"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBanco } from "@/http/banks";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDashed, Sparkles, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PlusIcon } from "@radix-ui/react-icons"
import { createUser  } from "@/http/members"

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  isSuperAdmin: z.boolean(),
  password: z.string(),
  ConfirmPassword: z.string(),
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
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<createUserData>({
    resolver: zodResolver(formSchema),
  });

  async function send({ name, email, isSuperAdmin, password }: createUserData) {
   
    const result = await createUser({ name, email, isSuperAdmin, password })
      if (result?.error) {
      toast.error(result.error);
    }
  }

  return (
    <Dialog open={opn} onOpenChange={setOpn}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1">
          <PlusIcon className="h-3.5 w-3.5" />
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
            <div className="grid grid-cols-2 gap-2 items-center">
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
            <div className="ml-auto flex gap-2">
              <Label htmlFor="isSuperAdmin">isSuperAdmin</Label>
              <Switch
                onCheckedChange={(checked: boolean) => {
                  setValue("isSuperAdmin", checked)
                }}
                disabled={isSubmitting}
                {...register("isSuperAdmin")}
              />
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
                onClick={() => console.log(errors)}
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




