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
import { createCategoria, updateCategoria } from "@/http/categorias";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDashed, FilePenIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";


const formSchema = z.object({
  name: z.string(),
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

  async function send({ name }: FormData) {
    const result = await createCategoria(name);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Categoria criada com sucesso');
    }
    reset();
  }


  return (
    <div className="relative flex-col items-start gap-8 hidden xl:flex">
      <form className="grid w-full items-start gap-6" onSubmit={handleSubmit(send)}>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Nova categoria
          </legend>
          <div className="grid gap-3">
            <Label htmlFor="name">Nome</Label>
            <Input placeholder="Informe o nome da categoria" required {...register('name')} />
            <Fr.error error={errors.name?.message} />
          </div>
          <Button
            type="submit"
            className="w-full gap-1.5 flex"
            disabled={isSubmitting}
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


export function DialogForm() {
  const [opn, setOpn] = useState<boolean>(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function send({ name }: FormData) {
    const result = await createCategoria(name);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Categoria criada com sucesso');
    }
    reset();
  }



  return (
    <Dialog open={opn} onOpenChange={setOpn}>
      <DialogTrigger asChild>
        <Button size="sm" className="inline-flex xl:hidden">Nova categoria</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova categoria</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <form className="grid w-full items-start gap-6" onSubmit={handleSubmit(send)}>
            <div className="grid gap-3">
              <Label htmlFor="name">Nome</Label>
              <Input placeholder="Informe o nome da categoria" required {...register('name')} />
              <Fr.error error={errors.name?.message} />
            </div>
            <Button
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


const formSchemaEdit = z.object({
  id: z.number(),
  name: z.string(),
});

type FormDataEdit = z.infer<typeof formSchemaEdit>;

export function DialogEditForm({ id, name }: FormDataEdit) {
  const [opn, setOpn] = useState<boolean>(false);

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<FormDataEdit>({
    resolver: zodResolver(formSchema),
    defaultValues: { id, name }
  });

  async function send(data: FormDataEdit) {
    const result = await updateCategoria(data);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Categoria atualizada com sucesso');
    }
    setOpn(false);
    setValue('name', data.name)
    //reset();
  }

  return (
    <Dialog open={opn} onOpenChange={setOpn}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="!text-emerald-600 hover:border-emerald-600 hover:bg-emerald-600/10">
          <FilePenIcon className="h-4 w-4" />
          <span className="sr-only">Editar</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Categoria</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <form className="grid w-full items-start gap-6" onSubmit={handleSubmit(send)}>
            <div className="grid gap-3">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Informe o nome da categoria"
                required
                {...register('name')}
              />
              <Fr.error error={errors.name?.message} />
            </div>
            <Button
              size="sm"
              type="submit"
              className="w-full gap-1.5 flex"
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircleDashed className="animate-spin" size="20" /> : 'Salvar'}
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
