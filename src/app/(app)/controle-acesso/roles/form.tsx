"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createRole } from "@/http/roles";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDashed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react";
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
import { PlusIcon } from "@radix-ui/react-icons";


const formSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
});

type FormData = z.infer<typeof formSchema>;

export default function Form() {
  const [opn, setOpn] = useState<boolean>(false);
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function send(data: FormData) {
    const result = await createRole(data);
    if (result?.error) toast.error(result.error);
    else toast.success("Perfil cadastrado com sucesso");
    setOpn(false)
    reset()
  }

  return (
    <Dialog open={opn} onOpenChange={setOpn}>
      <DialogTrigger asChild>
        <Button className={"ml-auto gap-1.5 hidden md:flex"} >
          <PlusIcon className="h-3.5 w-3.5" />
          Novo Perfil
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Perfil</DialogTitle>
          <DialogDescription>Crie perfis para adicionar a novos utilizadores</DialogDescription>
        </DialogHeader>
        <div className="relative flex-col items-start gap-8">
          <form className="grid w-full items-start gap-6" onSubmit={handleSubmit(send)}>
            <div className="grid gap-3">
              <Label htmlFor="role">Role</Label>
              <Input placeholder="Informe o nome da role" required {...register('name')} />
              {errors.name && (
                <p className="text-sm font-medium text-red-500 dark:text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description" isReq={false}>Descrição</Label>
              <Textarea
                {...register("description")}
                placeholder="Descrição da role"
                className="min-h-[9.5rem]"
              />
              {errors.description && (
                <p className="text-sm font-medium text-red-500 dark:text-red-400">
                  {errors.description.message}
                </p>
              )}
            </div>
            <Button type="submit" size="sm" className="ml-auto gap-1.5 flex" disabled={isSubmitting}>
              {isSubmitting ? (
                <CircleDashed className="motion-reduce:hidden animate-spin" size="20" />
              ) :
                'Salvar'
              }
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
