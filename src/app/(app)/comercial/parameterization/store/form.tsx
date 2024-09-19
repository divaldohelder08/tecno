"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Form as Fr } from "@/components/ui/form-components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createLoja } from "@/http/loja";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon } from "@radix-ui/react-icons";
import { ChevronsUpDown, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string({ required_error: "Nome é obrigatório" }).min(2, "No mínimo 2 caracteres"),
  identificacao: z.string({ required_error: "Identificação é obrigatória" }),
  address: z.string().optional(),
  provinciaId: z.number({ required_error: "A província é obrigatório" }).min(1, "Selecione uma província"),
  funcionarioId: z.number({ required_error: "O supervisor é obrigatório" }).min(1, "Selecione uma funcionario"),
  telefone: z.string({ required_error: "Telefone é obrigatório" }).min(9, "O número de telefone precisa ter no mínimo 9 caracteres!"),
  telefone2: z.string().optional(),
  email: z.string().email("Email inválido")
});

export type createLojaData = z.infer<typeof formSchema>;

interface Props {
  func: {
    id: number,
    nome_completo: string
  }[],
  prov: {
    id: number,
    name: string
  }[]
}

export default function Form({ prov, func: before }: Props) {
  const [selectedF, setSelectedF] = useState<string | null>(null);
  const [opn, setOpn] = useState<boolean>(false);
  const [open, setOpen] = useState(false);


  const func = before.map((f) => ({
    value: f.id,
    label: f.nome_completo,
  }));
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
      setSelectedF(null)
      reset();
    }
    setOpn(false);
  }

  return (
    <Dialog open={opn} onOpenChange={setOpn}>
      <DialogTrigger asChild>
        <Button className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Nova Loja
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Loja</DialogTitle>
          <DialogDescription>Preencha os campos abaixo para adicionar uma nova loja.</DialogDescription>
        </DialogHeader>
        <form className="grid gap-4" onSubmit={handleSubmit(send)}>
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" required placeholder="Digite o nome da loja" {...register("name")} />
            <Fr.error error={errors.name?.message} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4 items-baseline">
            <div className="grid gap-2">
              <Label htmlFor="lojaId">Loja</Label>
              <Popover modal={true} open={open} onOpenChange={setOpen} >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between h-9"
                    aria-expanded={open}
                  >
                    {selectedF ? selectedF : "Selecione o funcionario supervisor"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Procurar funcionario..." />
                    <CommandList>
                      <CommandEmpty>Nenhuma funcionario encontrada.</CommandEmpty>
                      <CommandGroup>
                        {func.map(({ value, label }) => (
                          <CommandItem
                            key={value}
                            onSelect={() => {
                              setValue("funcionarioId", value);
                              setSelectedF(label);
                              setOpen(false);
                            }}
                          >
                            {label}
                            {selectedF === label && (
                              <CheckIcon className="ml-auto h-4 w-4" />
                            )}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Fr.error error={errors.funcionarioId?.message} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="identificacao">Identificação</Label>
              <Input id="identificacao" required placeholder="Digite a identificação da loja" {...register("identificacao")} />
              <Fr.error error={errors.identificacao?.message} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address" isReq={false}>Endereço</Label>
            <Textarea id="address" placeholder="Digite o endereço da loja" className="min-h-[100px]" {...register("address")} />
            <Fr.error error={errors.address?.message} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4 items-baseline">
            <div className="grid gap-2">
              <Label htmlFor="province">Província</Label>
              <Select  {...register("provinciaId")} onValueChange={(val) => setValue('provinciaId', Number(val))} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a província" />
                </SelectTrigger>
                <SelectContent>
                  {prov.map((p) => (
                    <SelectItem key={p.id} value={p.id.toString()}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Fr.error error={errors.provinciaId?.message} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="email@example.com" {...register("email")} />
              <Fr.error error={errors.email?.message} />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 items-baseline">
            <div className="grid gap-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" required type="tel" placeholder="(00) 0000-0000" {...register("telefone")} />
              <Fr.error error={errors.telefone?.message} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="telefone2" isReq={false}>Telefone 2</Label>
              <Input id="telefone2" type="tel" placeholder="(00) 0000-0000" {...register("telefone2")} />
              <Fr.error error={errors.telefone2?.message} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="reset" className="mr-auto">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


interface atualizarForm extends Props {
  id: number
}
export function EditForm({ prov, id }: atualizarForm) {
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

  /*async function send(data: createLojaData) {
    const result = await editarLoja(data);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Loja atualizada com sucesso!");
      reset();
      setOpn(false);
    }
  }*/

  return (
    <>afsdf</>
  );
}

