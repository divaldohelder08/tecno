"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
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
import { cn } from "@/lib/utils"
import { Country } from "@/types"
import { useState } from "react"

const empresaSchema = z.object({
  codigo: z.string(),
  name: z.string(),
  type: z.enum(['SEDE', 'FILIAL']),
  avatar: z.string().optional(),
  countryId: z.number(),
  provinciaId: z.number(),
  endereco: z.string().optional(),
  cidade: z.string().optional(),
  telefone: z.string(),
  telefone1: z.string().optional(),
  email: z.string().email().optional(),
  nif: z.string(),
  cae: z.string().optional(),
  alvara: z.string().optional(),
  regimeIva: z.enum(['NAO_SUJEITO', 'SIMPLIFICADO', 'GERAL']),
  indicadorFactura: z.string(),
})

export type empresaData = z.infer<typeof empresaSchema>
interface props {
  countries: Country[]
  data: empresaData | undefined
  error: string | null
}
export default function Form({ data, error, countries: before }: props) {
  const countries = before.flatMap((country) => [
    ...country.provincias.map((provincia) => ({
      value: `${country.id}-${provincia.id}`,
      label: `${country.name} - ${provincia.name}`,
    })),
  ])
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(`${data?.countryId}-${data?.provinciaId}` ?? '')
  const {
    register,
    handleSubmit,
    getValues,
    setValue: set,
    formState: { errors, isSubmitting }
  } = useForm<empresaData>({
    resolver: zodResolver(empresaSchema), defaultValues: {
      codigo: data?.codigo,
      name: data?.name,
      type: data?.type,
      avatar: data?.avatar,
      countryId: data?.countryId,
      provinciaId: data?.provinciaId,
      endereco: data?.endereco,
      cidade: data?.cidade,
      telefone: data?.telefone,
      telefone1: data?.telefone1,
      email: data?.email,
      nif: data?.nif,
      cae: data?.cae,
      alvara: data?.alvara,
      regimeIva: data?.regimeIva,
      indicadorFactura: data?.indicadorFactura,
    }
  })


  if (error) {
    toast.error(error)
  }
  async function upsert(val: empresaData) {
    console.log(val)
  }
  return (
    <form className="grid gap-4 grid-cols-2" onSubmit={handleSubmit(upsert)}>
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input {...register('name')} id="name" placeholder="Digite o nome da loja." />
      </div>
      <div className="grid grid-cols-2 space-x-2 w-full">
        <div className="space-y-2">
          <Label htmlFor="type">Tipo</Label>
          <Select defaultValue={data?.type} onValueChange={(val: 'SEDE' | 'FILIAL') => set('type', val)}>
            <SelectTrigger
              className=""
              aria-label="Select a value"
            >
              <SelectValue placeholder="Informe o escopo da empresa" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectItem value="SEDE" className="rounded-lg">
                SEDE
              </SelectItem>
              <SelectItem value="FILIAL" className="rounded-lg">
                FILIAL
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="nif">NIF</Label>
          <Input {...register('nif')} id="nif" placeholder="Digite o número de identificação fiscal da loja." />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="cae">CAE</Label>
        <Input {...register('cae')} id="cae" placeholder="Digite o código de atividade econômica da loja." />
      </div>
      <div className="space-y-2">
        <Label htmlFor="avatar">Avatar</Label>
        <Input {...register('avatar')} id="avatar" type="file" placeholder="Envie o avatar da loja." />
      </div>
      <div className="space-y-2">
        <Label htmlFor="provinciaId">Pais e provincia</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="default"
              role="combobox"
              aria-expanded={open}
              className="flex w-full justify-between"
            >
              {value
                ? countries.find((country) => country.value === value)?.label
                : "Selecione o pais e provincia..."}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Pesquise pais e provincia..." className="h-9" />
              <CommandList>
                <CommandEmpty>País nem provincia encontrada.</CommandEmpty>
                <CommandGroup>
                  {countries.map((country) => (
                    <CommandItem
                      key={country.value}
                      value={country.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setOpen(false)
                      }}
                    >
                      {country.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === country.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-2">
        <Label htmlFor="endereco">Endereço</Label>
        <Input {...register('endereco')} id="endereco" placeholder="Digite o endereço da loja." />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cidade">Cidade</Label>
        <Input {...register('cidade')} id="cidade" placeholder="Digite a cidade da loja." />
      </div>
      <div className="space-y-2">
        <Label htmlFor="telefone">Telefone</Label>
        <Input {...register('telefone')} id="telefone" placeholder="Digite o número de telefone principal da loja." />
      </div>
      <div className="space-y-2">
        <Label htmlFor="telefone1">Telefone 1</Label>
        <Input {...register('telefone1')} id="telefone1" placeholder="Digite o número de telefone secundário da loja." />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input {...register('email')} id="email" placeholder="Digite o endereço de email da loja." />
      </div>
      <div className="space-y-2">
        <Label htmlFor="alvara">Alvará</Label>
        <Input {...register('alvara')} id="alvara" placeholder="Digite o número de licença da loja." />
      </div>
      <div className="space-y-2">
        <Label htmlFor="regimeIva">Regime de IVA</Label>
        <Select
          defaultValue={data?.regimeIva}
          onValueChange={(val: 'NAO_SUJEITO' | 'SIMPLIFICADO' | 'GERAL') => set('regimeIva', val)}>
          <SelectTrigger
            aria-label="Selecione o Regime de IVA"
          >
            <SelectValue placeholder="Selecione o Regime de IVA" />
          </SelectTrigger>
          <SelectContent className="">
            <SelectItem value="NAO_SUJEITO" className="rounded-lg">
              Não Sujeito
            </SelectItem>
            <SelectItem value="SIMPLIFICADO" className="rounded-lg">
              Simplificada
            </SelectItem>
            <SelectItem value="GERAL" className="rounded-lg">
              Geral
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="indicadorFactura">Indicador de Fatura</Label>
        <Input {...register('indicadorFactura')} id="indicadorFactura" placeholder="Digite o indicador de fatura da loja." />
      </div>
    </form>
  )
}

