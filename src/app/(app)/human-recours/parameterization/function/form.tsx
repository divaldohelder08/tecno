"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Form as Fr } from "@/components/ui/form-components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFcn } from "@/http/function";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDashed, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";


const formSchema = z.object({
  nome_funcao: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export default function Form() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function send(data: FormData) {
    const result = await createFcn(data);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Função criada com sucesso');
    }
    reset();
  }


  return (
    <div className="relative flex-col items-start gap-8 hidden xl:flex">
      <form className="grid w-full items-start gap-6" onSubmit={handleSubmit(send)}>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Nova função
          </legend>
          <div className="grid gap-3">
            <Label htmlFor="name">Nome</Label>
            <Input placeholder="Informe o nome da função" required {...register('nome_funcao')} />
            <Fr.error error={errors.nome_funcao?.message} />
          </div>
          <Button
            size="lg"
            type="submit"
            className="w-full gap-1.5 flex"
            disabled={isSubmitting}
            onClick={() => console.log(errors)}
          >
            {isSubmitting ? (
              <CircleDashed className="motion-reduce:hidden animate-spin" size="20" />
            ) : 'Salvar'}
          </Button>
        </fieldset>
      </form>
    </div>
  );
}


export function DrawerForm() {
  const [opn, setOpn] = useState<boolean>(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function send(data: FormData) {
    const result = await createFcn(data);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Função criada com sucesso');
    }
    reset();
  }


  return (
    <Dialog open={opn} onOpenChange={setOpn}>
      <DialogTrigger>
        <Button size="sm" className="inline-flex xl:hidden gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          Nova Função
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Nova Função</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <form className="grid w-full items-start gap-6" onSubmit={handleSubmit(send)}>
            <div className="grid gap-3">
              <Label htmlFor="name">Nome</Label>
              <Input placeholder="Informe o nome da categoria" required {...register('nome_funcao')} />
              <Fr.error error={errors.nome_funcao?.message} />
            </div>
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
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

}
