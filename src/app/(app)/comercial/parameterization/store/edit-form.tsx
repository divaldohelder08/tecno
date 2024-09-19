"use client"



import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Form as Fr } from "@/components/ui/form-components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getFuncionario } from "@/http/funcionarios";
import { getProvincias } from "@/http/helpers";
import { getLojaById, updateLoja } from "@/http/loja";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CheckIcon, ChevronsUpDown, Loader2 } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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

export type updateLoja = z.infer<typeof formSchema>

interface props {
  id: number
  name: string
  opn: boolean
  setOpn: Dispatch<SetStateAction<boolean>>
}

export default function EditForm({ opn, setOpn, id, name }: props) {
  const [open, setOpen] = useState(false);
  const [selectedF, setSelectedF] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting }
  } = useForm<updateLoja>({
    resolver: zodResolver(formSchema),
  })

  // data: categories, isFetching, error
  const provinces = useQuery({
    queryKey: ['provinces'],
    queryFn: async () => await getProvincias(),
  });


  const func = useQuery({
    queryKey: ['funcionários'],
    queryFn: async () => {
      const res = await getFuncionario()
      return res.map((f) => ({
        value: f.id,
        label: f.nome_completo,
      }));
    },
  });


  async function send(data: updateLoja) {
    const result = await updateLoja(data, id);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Loja atualizado com sucesso');
    }
    setOpn(false)
  }

  const { mutateAsync: getData, isPending } = useMutation({
    mutationFn: async () => await getLojaById(id),
    onSuccess: ({ name, identificacao, provinciaId, funcionarioId, telefone, email, address, telefone2 }) => {
      setValue("name", name)
      setValue("identificacao", identificacao)
      setValue("provinciaId", provinciaId)
      setValue("funcionarioId", funcionarioId)
      setValue("telefone", telefone)
      setValue("telefone2", telefone2)
      setValue("email", email)
      setValue("address", address)
    },
    onError: (error: string) => toast.error(error)
  })



  useEffect(() => {
    opn && getData()
  }, [getData, opn])

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 space-x-4">Editar Loja:
          {
            isPending
              ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              : name
          }</DialogTitle>
        <DialogDescription>
          Preencha os campos abaixo para atualizar loja.
        </DialogDescription>
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
                      {func.data?.map(({ value, label }) => (
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
            <Controller
              name="provinciaId"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value ? String(field.value) : undefined}
                  onValueChange={(value) => field.onChange(Number(value))}
                  required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a província" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      provinces.data?.map((p) => (
                        <SelectItem key={p.id} value={p.id.toString()}>{p.name}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}
            />
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
            <Label htmlFor="telefone">Telefone (Principal)</Label>
            <Input id="telefone" required type="tel" placeholder="(+244) 000-000-000" {...register("telefone")} />
            <Fr.error error={errors.telefone?.message} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="telefone2" isReq={false}>Telefone (Secundário)</Label>
            <Input id="telefone2" type="tel" placeholder="(+244) 000-000-000"{...register("telefone2")} />
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
  );
}
