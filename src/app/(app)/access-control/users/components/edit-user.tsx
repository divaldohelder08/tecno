"use client";
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
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { editUser } from "@/http/members";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDashed } from "lucide-react";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";


const formSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string()
})

export type editUserData = z.infer<typeof formSchema>;
interface DeleteAlertProps extends editUserData {
  children: ReactNode
}

export default function EditUserModal({
  id,
  children,
  name,
  email
}: DeleteAlertProps) {
  const [open, setOpen] = useState<boolean>()
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<editUserData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id,
      name,
      email
    }
  });

  async function send({ name, email }: editUserData) {
    const result = await editUser({ id, name, email })
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Usuario atualizado com sucesso");
    }
    setOpen(false)
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <div className="min-w-[400px] mx-auto">
          <DialogHeader>
            <DialogTitle>Atualizar utilizador: {name}</DialogTitle>
          </DialogHeader>
          <form className="grid w-full items-start gap-6 pt-6" onSubmit={handleSubmit(send)}>
            <div className="grid gap-3">
              <Label htmlFor="name">Nome</Label>
              <Input placeholder="Informe o nome completo" required {...register('name')} />
              <Form.error error={errors.name?.message} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input placeholder="Informe o email" required {...register('email')} />
              <Form.error error={errors.email?.message} />
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
  );
}
