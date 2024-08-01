"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDashed } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createCategoria } from "@/http/categorias"
import { toast } from "sonner";
import { Form as Fr } from "@/components/ui/form";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { useState } from "react";


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
    }else{
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
      <DialogTrigger>
        <Button size="sm" className="inline-flex xl:hidden">Nova carreira</Button>
      </DialogTrigger>
      <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova carreira</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <form className="grid w-full items-start gap-6" onSubmit={handleSubmit(send)}>
              <div className="grid gap-3">
                <Label htmlFor="name">Nome</Label>
                <Input placeholder="Informe o nome da categoria" required {...register('name')} />
                <Fr.error error={errors.name?.message} />
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
