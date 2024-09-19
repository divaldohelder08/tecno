"use client"
import {
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { CircleDashed } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form as Fr } from "@/components/ui/form-components";
import { toast } from "sonner"

import { z } from "zod";

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SubAccounts } from "@/http/helpers";
import { createFornecedor } from "@/http/fornecedores";
import { cn } from "@/lib/utils";
import { Country } from "@/types";
import { useState } from "react";

const fornecedorSchema = z.object({
  countryId: z.number(),
  telefone: z.string(),
  telefone2: z.string().optional().nullable(),
  whatsapp: z.string().optional().nullable(),
  endereco: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  subContaId: z.number(),
  entidade: z.object({
    name: z.string(),
    tipo: z.enum(['SINGULAR', 'COLECTIVO']),
    identificacao: z.string(),
    tipodeIdentificacao: z.enum([
      'BI',
      'NIF',
      'PASSAPORTE',
      'CARTAO_DE_RESIDENTE',
    ]),
  }),
})


export type fornecedorData = z.infer<typeof fornecedorSchema>
interface props {
  countries: Country[]
  subAccounts: SubAccounts[]
}
export default function Form({ countries: before, subAccounts: subBefore }: props) {
  const countries = before.map((country) => ({
    value: country.id,
    label: country.name,
  }))

  const subAccounts = subBefore.map((sub) => ({
    id: sub.id,
    label: `${sub.numero} - ${sub.description}`
  }))
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<number | null>(null)
  const [open1, setOpen1] = useState(false)
  const [subValue, setSubValue] = useState<number | null>(null)

  const {
    register,
    handleSubmit,
    getValues,
    setValue: set,
    formState: { errors, isSubmitting }
  } = useForm<fornecedorData>({
    resolver: zodResolver(fornecedorSchema)
  })

  async function send(data: fornecedorData) {
    const result = await createFornecedor(data);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Fornecedores cadastrado com sucesso');
    }
  }

  return (
    <form onSubmit={handleSubmit(send)}>
      <div className="grid gap-4 grid-cols-2" >
        <div className="space-y-2">
          <Label htmlFor="type">Tipo</Label>
          <Select onValueChange={(val: 'SINGULAR' | 'COLECTIVO') => set('entidade.tipo', val)} required>
            <SelectTrigger            >
              <SelectValue placeholder="Selecione o escopo do fornecedor" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectItem value="SINGULAR" className="rounded-lg">
                SINGULAR
              </SelectItem>
              <SelectItem value="COLECTIVO" className="rounded-lg">
                COLECTIVO
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 space-x-2 w-full">

          <div className="space-y-2">
            <Label htmlFor="tipodeIdentificacao">Tipo de identificação</Label>
            <Select onValueChange={(val: "BI" | "NIF" | "PASSAPORTE" | "CARTAO_DE_RESIDENTE") => set('entidade.tipodeIdentificacao', val)} >
              <SelectTrigger
                className=""
                aria-label="Select a value"
              >
                <SelectValue placeholder="Selecione o tipo de identificação" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem value="BI" className="rounded-lg">
                  BI
                </SelectItem>
                <SelectItem value="NIF" className="rounded-lg">
                  NIF
                </SelectItem>
                <SelectItem value="PASSAPORTE" className="rounded-lg">
                  PASSAPORTE
                </SelectItem>
                <SelectItem value="CARTAO_DE_RESIDENTE" className="rounded-lg">
                  CARTÃO DE RESIDENTE
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="identificacao">Identificacao</Label>
            <Input {...register('entidade.identificacao')} placeholder="Digite a identificação" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input {...register('entidade.name')} required id="name" placeholder="Digite o nome da entidade." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="Pais">Pais</Label>
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
                  : "Selecione o Pais..."}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Pesquise Pais..." className="h-9" />
                <CommandList>
                  <CommandEmpty>País encontrado.</CommandEmpty>
                  <CommandGroup>
                    {countries.map((country) => (
                      <CommandItem
                        key={country.value}
                        value={country.value.toString()}
                        onSelect={(currentValue) => {
                          if (Number(currentValue) === value) {
                            setValue(null)
                            set('countryId', 0)
                          } else {
                            setValue(Number(currentValue))
                            set('countryId', Number(currentValue))
                          }
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
          <Label htmlFor="subValue">sub-conta</Label>
          <Popover open={open1} onOpenChange={setOpen1}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="default"
                role="combobox"
                aria-expanded={open1}
                className="flex w-full justify-between"
              >

                {subValue
                  ? subAccounts.find((sub) => sub.id === subValue)?.label
                  : "Selecione a sub-conta..."}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Pesquise a sub conta..." className="h-9" />
                <CommandEmpty>sub-conta encontrada.</CommandEmpty>
                <CommandGroup className="w-full">
                  <CommandList>
                    {subAccounts.map((sub) => (
                      <CommandItem
                        key={sub.id}
                        value={sub.id.toString()}
                        onSelect={(currentValue) => {
                          if (Number(currentValue) === subValue) {
                            setSubValue(null)
                            set('subContaId', 0)
                          } else {
                            setSubValue(Number(currentValue))
                            set('subContaId', Number(currentValue))
                          }
                          setOpen1(false)
                        }}
                      >
                        {sub.label}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            subValue === sub.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <Fr.error error={errors.subContaId?.message} />
          
        </div>
                <div className="space-y-2">
          <Label htmlFor="email" isReq={false}>Email</Label>
          <Input {...register('email')} type="email" placeholder="Digite o endereço de email." />
          <Fr.error error={errors.email?.message} />
        </div>
              <div className="space-y-2">
          <Label htmlFor="endereco" isReq={false}>Endereço</Label>
          <Input {...register('endereco')} id="endereco" placeholder="Digite o endereço da loja." />
        </div>

        <div className="space-y-2">
          <Label htmlFor="telefone">Telefone (Principal)</Label>
          <Input {...register('telefone')} required id="telefone" placeholder="Digite o número de telefone principal da loja." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefone1" isReq={false}>Telefone (secundario)</Label>
          <Input {...register('telefone2')} id="telefone1" placeholder="Digite o número de telefone secundário da loja." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="whatsapp" isReq={false}>whatsapp</Label>
          <Input {...register('whatsapp')} placeholder="Digite a cidade da loja." />
        </div>
  
        
      </div>
      <CardFooter className="px-0 py-4">
        <Button type="submit"
          disabled={isSubmitting}
          onClick={() => console.log(errors)}
        >
          {isSubmitting ? (
            <CircleDashed className="motion-reduce:hidden animate-spin" size="20" />
          ) : 'Salvar informações'
          }
        </Button>
      </CardFooter>
    </form>
  )
}
