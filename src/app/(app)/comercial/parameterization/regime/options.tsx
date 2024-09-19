"use client"
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteCategoria, updateCategoria } from "@/http/categorias";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDashed, FilePenIcon, Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import DeleteAlert from "@/components/delete-alert";
import { Form } from "@/components/ui/form-components";
interface Props {
  id: number;
  name: string;
}

export default function Option({ id, name }: Props) {
  return (
    <>
      <DrawerEditForm id={id} name={name} />
      <DeleteAlert
        id={id}
        title={name}
        deleteFunction={deleteCategoria}
        successMessage="Categoria deletada com sucesso"
      >
        <Button
          size="icon"
          variant="ghost"
          className="!text-red-600 hover:border-red-600 hover:bg-red-600/10"
        >
          <Trash className="h-4 w-4" />
          <span className="sr-only">Apagar</span>
        </Button>
      </DeleteAlert>
    </>
  );
}

const formSchema = z.object({
  id: z.number(),
  name: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export function DrawerEditForm({ id, name }: Props) {
  const [opn, setOpn] = useState<boolean>(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { id, name }
  });

  async function send(data: FormData) {
    const result = await updateCategoria(data);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Carreira atualizada com sucesso');
    }
    setOpn(false);
    reset();
  }

  return (
    <Drawer open={opn} onOpenChange={setOpn}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="!text-emerald-600 hover:border-emerald-600 hover:bg-emerald-600/10">
          <FilePenIcon className="h-4 w-4" />
          <span className="sr-only">Editar</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="min-w-[400px] mx-auto">
          <DrawerHeader>
            <DrawerTitle>Editar Categoria</DrawerTitle>
          </DrawerHeader>
          <DrawerFooter>
            <form className="grid w-full items-start gap-6" onSubmit={handleSubmit(send)}>
              <div className="grid gap-3">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  placeholder="Informe o nome da categoria"
                  required
                  {...register('name')}
                />
                <Form.error error={errors.name?.message} />
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
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
