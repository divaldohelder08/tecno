"use client"
import { Eye, Loader2, MoreVertical, Trash, Copy, CircleDashed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
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
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  id: number;
  name: string;
  regime: "geral" | "especial";
}

interface DeleteContainerProps {
  id: number;
  name: string;
  isOpn: boolean;
  set: Dispatch<SetStateAction<boolean>>;
}

interface DrawerEditFormProps extends Props {
  opn: boolean;
  setOpn: Dispatch<SetStateAction<boolean>>;
}

export default function DropdownMenu({ id, name, regime }: Props) {
  const [opn, setOpn] = useState<boolean>(false);
  const [opn1, setOpn1] = useState<boolean>(false);

  return (
    <>
      <DeleteContainer id={id} name={name} isOpn={opn} set={setOpn} />
      <DrawerEditForm id={id} name={name} regime={regime} opn={opn1} setOpn={setOpn1} />
      <Container>
        <Drop.DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </Drop.DropdownMenuTrigger>
        <Drop.DropdownMenuContent align="end" className="w-[200px]">
          <Drop.DropdownMenuLabel>Opções</Drop.DropdownMenuLabel>
          <Drop.DropdownMenuSeparator />
          <Drop.DropdownMenuItem onClick={() => navigator.clipboard.writeText(id.toString())}>
            Cópiar ID
            <Drop.DropdownMenuShortcut>
              <Copy size={18} />
            </Drop.DropdownMenuShortcut>
          </Drop.DropdownMenuItem>
          <Drop.DropdownMenuItem onClick={() => setOpn1(true)}>
            Editar
            <Drop.DropdownMenuShortcut>
              <Eye size={18} />
            </Drop.DropdownMenuShortcut>
          </Drop.DropdownMenuItem>
          <Drop.DropdownMenuItem className="text-red-600" onClick={() => setOpn(true)}>
            Deletar
            <Drop.DropdownMenuShortcut>
              <Trash size={18} />
            </Drop.DropdownMenuShortcut>
          </Drop.DropdownMenuItem>
        </Drop.DropdownMenuContent>
      </Container>
    </>
  );
}

function DeleteContainer({ id, name, set, isOpn }: DeleteContainerProps) {
  const [load, setLoad] = useState<boolean>(false);

  async function send() {
    const result = await deleteCareer(id);
    setLoad(false);
    set(false);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Carreira apagada com sucesso');
    }
  }

  return (
    <AlertDialog open={isOpn} onOpenChange={set}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja realmente apagar a carreira: {name}</AlertDialogTitle>
          <AlertDialogDescription>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi magni delectus accusantium, commodi
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" size="sm" onClick={() => set(false)}>Cancelar</Button>
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

export function DrawerEditForm({ id, name, regime, opn, setOpn }: DrawerEditFormProps) {
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
