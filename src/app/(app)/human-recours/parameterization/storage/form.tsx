"use client"
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea"
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
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { CircleDashed, Sparkles, Eye, EyeOff, FilePenIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PlusIcon } from "@radix-ui/react-icons"
import { createLoja } from "@/http/loja"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const formSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  lojaId: z.number().nullable(),
  description: z.string().nullable().optional(),
  localidade: z.string().nullable().optional(),
  bloqueioEntrada: z.boolean(),
  bloqueioSaida: z.boolean(),
});


export type createLojaData = z.infer<typeof formSchema>;

interface Props {
  lojas: {
    id: number,
    name: string
  }[]
}
export default function Form({ lojas: before }: Props) {
  const [opn, setOpn] = useState<boolean>(false);
  const lojas = before.map((loja) => ({
    value: loja.id,
    label: loja.name,
  }))

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<createLojaData>({
    resolver: zodResolver(formSchema),
  });

  async function send(data: createLojaData) {
    // const result = await createLoja(data);
    // if (result?.error) {
    //   toast.error(result.error);
    // } else {
    //   toast.success("Loja criada com sucesso!");
    //   reset();
    //   setOpn(false);
    // }
  }

  return (
    <Dialog open={opn} onOpenChange={setOpn}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1">
          <PlusIcon className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Novo armazem
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Armazem</DialogTitle>
          <DialogDescription>Preencha os campos abaixo para adicionar uma nova loja.</DialogDescription>
        </DialogHeader>
        {/* <form className="grid gap-4" onSubmit={handleSubmit(send)}>
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" placeholder="Digite o nome da loja" {...register("name")} />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lojaId">Loja</Label>
            <Select {...register("lojaId")} onValueChange={(val) => setValue('lojaId', val)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a Loja" />
              </SelectTrigger>
              <SelectContent>
                {lojas.map((p) => (
                  <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                ))}
                <SelectItem value={null}>Sede</SelectItem>
              </SelectContent>
            </Select>
            {errors.lojaId && <p className="text-red-500">{errors.lojaId.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description" isReq={true}>Description</Label>
            <Textarea placeholder="Digite a identificação da loja" {...register("description")} />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="localidade" isReq={true}>localidade</Label>
            <Textarea placeholder="Digite o endereço da loja" className="min-h-[100px]" {...register("localidade")} />
            {errors.localidade && <p className="text-red-500">{errors.localidade.message}</p>}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2 items-center">
              <Label htmlFor="bloqueioEntrada">bloqueio Entrada</Label>
              <Switch
                className="flex"
                onCheckedChange={(checked: boolean) => {
                  setValue("bloqueioEntrada", checked)
                }}
                disabled={isSubmitting}
                {...register("bloqueioEntrada")}
              />
            </div>
            <div className="space-y-2 items-center">
              <Label htmlFor="bloqueioSaida">bloqueio Saida</Label>
              <Switch
                className="flex"
                onCheckedChange={(checked: boolean) => {
                  setValue("bloqueioSaida", checked)
                }}
                disabled={isSubmitting}
                {...register("bloqueioSaida")}
              />
            </div>

          </div>
          <DialogFooter>
            <Button variant="outline" className="mr-auto" onClick={() => setOpn(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form> */}
      </DialogContent>
    </Dialog>
  );
}


// interface atualizarForm extends Props {
//   id: number
// }
// export function EditForm({ prov, id }: atualizarForm) {
//   const [opn, setOpn] = useState<boolean>(false);

//   const {
//     reset,
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors, isSubmitting }
//   } = useForm<createLojaData>({
//     resolver: zodResolver(formSchema),
//   });

//   /*async function send(data: createLojaData) {
//     const result = await editarLoja(data);
//     if (result?.error) {
//       toast.error(result.error);
//     } else {
//       toast.success("Loja atualizada com sucesso!");
//       reset();
//       setOpn(false);
//     }
//   }*/

//   return (
//     <>afsdf</>
//   );
// }

