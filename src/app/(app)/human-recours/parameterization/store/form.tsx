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
import { CircleDashed, Sparkles, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PlusIcon } from "@radix-ui/react-icons"
import { createLoja  } from "@/http/loja"
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
  name: z.string().nonempty("Nome é obrigatório"),
  identificacao: z.string().nonempty("Identificação é obrigatória"),
  address: z.string().nonempty("Endereço é obrigatório"),
  provinciaId: z.number().min(1, "Selecione uma província"),
  telefone: z.string().nonempty("Telefone é obrigatório"),
  telefone2: z.string().optional(),
  email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
});

export type createLojaData = z.infer<typeof formSchema>;

interface Props {
  prov: {
    id: number,
    name: string
  }[]
}

export default function Form({ prov }: Props) {
  const [opn, setOpn] = useState<boolean>(false);

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
    const result = await createLoja(data);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Loja criada com sucesso!");
      reset();
      setOpn(false);
    }
  }

  return (
    <Dialog open={opn} onOpenChange={setOpn}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1">
          <PlusIcon className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Novo Utilizador
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Nova Loja</DialogTitle>
          <DialogDescription>Preencha os campos abaixo para adicionar uma nova loja.</DialogDescription>
        </DialogHeader>
        <form className="grid gap-4" onSubmit={handleSubmit(send)}>
          <div className="grid gap-2">
            <Label htmlFor="name" isReq>Nome</Label>
            <Input id="name" placeholder="Digite o nome da loja" {...register("name")} />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="identificacao">Identificação</Label>
            <Input id="identificacao" placeholder="Digite a identificação da loja" {...register("identificacao")} />
            {errors.identificacao && <p className="text-red-500">{errors.identificacao.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Endereço</Label>
            <Textarea id="address" placeholder="Digite o endereço da loja" className="min-h-[100px]" {...register("address")} />
            {errors.address && <p className="text-red-500">{errors.address.message}</p>}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="province">Província</Label>
              <Select {...register("provinciaId")}  onValueChange={(val) => setValue('provinciaId', Number(val))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a província" />
                </SelectTrigger>
                <SelectContent>
                  {prov.map((p) => (
                    <SelectItem key={p.id} value={p.id.toString()}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.provinciaId && <p className="text-red-500">{errors.provinciaId.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" type="tel" placeholder="(00) 0000-0000" {...register("telefone")} />
              {errors.telefone && <p className="text-red-500">{errors.telefone.message}</p>}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="telefone2">Telefone 2</Label>
              <Input id="telefone2" type="tel" placeholder="(00) 0000-0000" {...register("telefone2")} />
              {errors.telefone2 && <p className="text-red-500">{errors.telefone2.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="email@example.com" {...register("email")} />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
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
        </form>
      </DialogContent>
    </Dialog>
  );
}
