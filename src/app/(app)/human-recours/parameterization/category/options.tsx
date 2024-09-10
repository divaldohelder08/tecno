"use client"
import { Eye, Loader2, MoreVertical, Trash, Copy, CircleDashed, FilePenIcon, User, TrashIcon, FilePen, FileKey2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import * as Drop from "@/components/ui/dropdown-menu";
import { DropdownMenu as Container } from "@/components/ui/dropdown-menu";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { deleteCareer, updateCareer } from "@/http/career";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteCategoria } from "@/http/rh-categorias";

import DeleteAlert from "@/components/delete-alert";
interface Props {
  id: number;
  name: string;
  regime: 'geral' | 'especial'
}


export default function Option({ id, name, regime }: Props) {
  return (
    <>
      <DrawerEditForm id={id} name={name} regime={regime} />
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
  nome_carreira: z.string(),
  regime: z.enum(['geral', 'especial'], { required_error:'O Regime somente deve ser geral ou especial!'})
});
type FormData = z.infer<typeof formSchema>;

export function DrawerEditForm({ id, name, regime }: Props) {
  const [opn, setOpn] = useState<boolean>(false);

  const {
    reset,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { id, nome_carreira: name, regime }
  });

  async function send(data: FormData) {
    const result = await updateCareer(data);
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
            <DrawerTitle>Editar Carreira</DrawerTitle>
          </DrawerHeader>
          <DrawerFooter>
            <form className="grid w-full items-start gap-6" onSubmit={handleSubmit(send)}>
              <div className="grid gap-3">
                <Label htmlFor="nome_carreira">Nome</Label>
                <Input
                  id="nome_carreira"
                  placeholder="Informe o nome da carreira"
                  required
                  {...register('nome_carreira')}
                />
                {errors.nome_carreira && (
                  <p className="text-sm font-medium text-red-500 dark:text-red-400">
                    {errors.nome_carreira.message}
                  </p>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="regime">Regime</Label>
                <Select defaultValue={regime} onValueChange={(val: "geral" | "especial") => setValue('regime', val)}>
                  <SelectTrigger aria-label="Select a value">
                    <SelectValue placeholder="Informe o regime" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="geral" className="rounded-lg">GERAL</SelectItem>
                    <SelectItem value="especial" className="rounded-lg">ESPECIAL</SelectItem>
                  </SelectContent>
                </Select>
                {errors.regime && (
                  <p className="text-sm font-medium text-red-500 dark:text-red-400">
                    {errors.regime.message}
                  </p>
                )}
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
