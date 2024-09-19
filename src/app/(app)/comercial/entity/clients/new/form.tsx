"use client"
import {
  CardFooter
} from "@/components/ui/card";
import { Form as Fr } from "@/components/ui/form-components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { CircleDashed } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { Switch } from "@/components/ui/switch";
import { createCliente } from "@/http/cliente";
import { SubAccounts } from "@/http/helpers";
import { cn } from "@/lib/utils";
import { Country } from "@/types";
import { useState } from "react";

const clienteSchema = z.object({
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
  tipoDesconto: z.enum([
    'COMERCIAL',
    'FINANCEIRO',
    'DIVERSO',
    'NENHUM',
  ]),
  valorDesconto: z.coerce.number().optional().nullable(),
  percentagemDesconto: z.coerce.number().optional().nullable(),
  efectuaRetencao: z.boolean(),
  saldo: z.number(),
  limiteSaldo: z.number(),
  limiteCredito: z.number(),
})

export type clienteData = z.infer<typeof clienteSchema>
interface props {
  countries: Country[]
  subAccounts: SubAccounts[]
}
export default function Form({ countries: before, subAccounts: subBefore }: props) {
  const [step, setStep] = useState(1);

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

  const { control,
    register,
    handleSubmit,
    setValue: set,
    getValues, trigger, reset,
    formState: { errors, isSubmitting }
  } = useForm<clienteData>({
    resolver: zodResolver(clienteSchema),
    mode: "onChange",
    defaultValues: {
      valorDesconto: 0,
      percentagemDesconto: 0,
      saldo: 0,
      limiteSaldo: 0,
      limiteCredito: 0,
      efectuaRetencao: false
    }
  })


  async function send(data: clienteData) {
    const result = await createCliente(data);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Cliente cadastrado com sucesso');
    }
  }



  return (
    <form onSubmit={handleSubmit(send)}>
      <Tabs defaultValue="start">
        <TabsList className="grid grid-cols-2 w-[400px] rounded-bl-none">
          <TabsTrigger value="start">Informações Pessoais</TabsTrigger>
          <TabsTrigger value="fi">Informações Fiscais</TabsTrigger>
        </TabsList>
        <TabsContent value="start">
          <div className="grid gap-4 grid-cols-2 mt-2" >
            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select onValueChange={(val: 'SINGULAR' | 'COLECTIVO') => set('entidade.tipo', val)} required>
                <SelectTrigger            >
                  <SelectValue placeholder="Informe o escopo do cliente" />
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
              <Fr.error error={errors.entidade?.tipo?.message} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input {...register('entidade.name')} required id="name" placeholder="Digite o nome da entidade." />
              <Fr.error error={errors.entidade?.name?.message} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipodeIdentificacao">Tipo de identificação</Label>
              <Select onValueChange={(val: "BI" | "NIF" | "PASSAPORTE" | "CARTAO_DE_RESIDENTE") => set('entidade.tipodeIdentificacao', val)} required>
                <SelectTrigger
                  className=""
                  aria-label="Select a value"
                >
                  <SelectValue placeholder="Selecione o tipo de identificação" />
                </SelectTrigger>
                <SelectContent>
                  {['BI', "NIF", "PASSAPORTE", "CARTÃO DE RESIDENTE"]
                    .map(e => <SelectItem key={e} value={e} className="rounded-lg">{e}</SelectItem>)}
                </SelectContent>
              </Select>
              <Fr.error error={errors.entidade?.tipodeIdentificacao?.message} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="identificacao">Identificacao</Label>
              <Input {...register('entidade.identificacao')} placeholder="Digite a identificação" required />
              <Fr.error error={errors.entidade?.identificacao?.message} />
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
              <Fr.error error={errors.countryId?.message} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone (principal)</Label>
              <Input {...register('telefone')} required id="telefone" placeholder="Digite o número de telefone principal da loja." />
              <Fr.error error={errors.telefone?.message} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone1" isReq={false}>Telefone (secundário)</Label>
              <Input {...register('telefone2')} id="telefone1" placeholder="Digite o número de telefone secundário da loja." />
              <Fr.error error={errors.telefone2?.message} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp" isReq={false}>whatsapp</Label>
              <Input {...register('whatsapp')} placeholder="Digite a cidade da loja." />
              <Fr.error error={errors.whatsapp?.message} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endereco" isReq={false}>Endereço</Label>
              <Input {...register('endereco')} id="endereco" placeholder="Digite o endereço da loja." />
              <Fr.error error={errors.endereco?.message} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" isReq={false}>Email</Label>
              <Input {...register('email')} type="email" placeholder="Digite o endereço de email." />
              <Fr.error error={errors.email?.message} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="fi">
          <div className="grid gap-4 grid-cols-2 mt-4">
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
              <Label htmlFor="tipoDesconto">Tipo de desconto</Label>
              <Select onValueChange={(val: 'COMERCIAL' | 'FINANCEIRO' | 'DIVERSO' | 'NENHUM') => set('tipoDesconto', val)} required>
                <SelectTrigger            >
                  <SelectValue placeholder="Informe o tipo de desconto" />
                </SelectTrigger>
                <SelectContent className="">
                  {['COMERCIAL', "FINANCEIRO", "DIVERSO", "NENHUM"]
                    .map(e => <SelectItem key={e} value={e} className="rounded-lg">{e}</SelectItem>)}
                </SelectContent>
              </Select>
              <Fr.error error={errors.tipoDesconto?.message} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="valorDesconto" isReq={false}>Valor de desconto</Label>
              <Input {...register('valorDesconto')} type="number" placeholder="Informe o valor de desconto." />
              <Fr.error error={errors.valorDesconto?.message} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="percentagemDesconto" isReq={false}>Percentual de desconto</Label>
              <Input {...register('percentagemDesconto')} type="number" placeholder="Informe o percentual de desconto." />
              <Fr.error error={errors.percentagemDesconto?.message} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="saldo">Saldo</Label>
              <Input {...register('saldo', { valueAsNumber: true })} type="number" required placeholder="Digite o saldo." />
              <Fr.error error={errors.saldo?.message} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="limiteSaldo">limite de Saldo</Label>
              <Input {...register('limiteSaldo', { valueAsNumber: true })} type="number" required placeholder="Digite o saldo limite." />
              <Fr.error error={errors.limiteSaldo?.message} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="limiteCredito">limite de crédito</Label>
              <Input {...register('limiteCredito', { valueAsNumber: true })} type="number" required placeholder="Digite o crédito limite." />
              <Fr.error error={errors.limiteCredito?.message} />
            </div>
            <div className="space-y-2 items-center">
              <Label htmlFor="isSuperAdmin">Efectuar Retenção</Label>
              <Switch
                className="flex"
                defaultChecked={false}
                onCheckedChange={(checked: boolean) => {
                  set("efectuaRetencao", checked)
                }}
                disabled={isSubmitting}
                {...register("efectuaRetencao")}
              />
              <Fr.error error={errors.efectuaRetencao?.message} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <CardFooter className="flex py-6 px-0">
        <Button type="submit" disabled={isSubmitting}
          className="gap-1.5 flex"
        >
          {isSubmitting ? (
            <CircleDashed className="motion-reduce:hidden animate-spin" size="20" />
          ) : 'Salvar'}
        </Button>
      </CardFooter>
    </form>
  )
}
