"use client"
import { Eye, Loader2, MoreVertical, Trash, Copy, CircleDashed, TrashIcon, FilePenIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import * as Drop from "@/components/ui/dropdown-menu";
import { DropdownMenu as Container } from "@/components/ui/dropdown-menu";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { deleteDepartamento } from "@/http/departamento";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils"
import Link from "next/link";

interface Props {
  id: number;
  name: string;
}

interface DeleteContainerProps {
  id: number;
  name: string;
}

interface DrawerEditFormProps extends Props {
  opn: boolean;
  setOpn: Dispatch<SetStateAction<boolean>>;
}
//      <DrawerEditForm id={id} name={name} regime={regime}/>

export default function Option({ id, name }: Props) {
  return (
    <>
      <Link href={`department/${id}`} className={cn(buttonVariants({ size: "icon", variant: "ghost" }))}>
        <Eye className="h-4 w-4" />

        <span className="sr-only"> Pesquizar departamento</span>

      </Link>
      <DeleteContainer id={id} name={name} />
    </>
  );
}

function DeleteContainer({ id, name, }: DeleteContainerProps) {
  const [load, setLoad] = useState<boolean>(false);
  const [opn, setOpn] = useState<boolean>(false);

  async function send() {
    const result = await deleteDepartamento(id);
    setLoad(false);
    setOpn(false);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Departamento apagada com sucesso');
    }
  }

  return (
    <AlertDialog open={opn} onOpenChange={setOpn}>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setOpn(true)}
          className="!text-red-600 hover:border-red-600 hover:bg-red-600/10"
        >
          <TrashIcon className="h-4 w-4" />
          <span className="sr-only">Excluir</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja realmente apagar a departamento: {name}</AlertDialogTitle>
          <AlertDialogDescription>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi magni delectus accusantium, commodi
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancelar</Button>
          </AlertDialogCancel>
          <Button size="sm" onClick={() => { setLoad(true); send(); }} disabled={load}>
            {load ? <Loader2 className="animate-spin" size="20" /> : 'Apagar'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const formSchema = z.object({
  id: z.number(),
  nome_carreira: z.string(),
  regime: z.enum(['geral', 'especial'])
});
//'O Regime somente deve ser geral ou especial!'
type FormData = z.infer<typeof formSchema>;
/*
export function DrawerEditForm({ id, name, regime }: DrawerEditFormProps) {
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
*/