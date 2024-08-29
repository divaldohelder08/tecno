"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CircleDashed } from "lucide-react";
import { CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { upsertEmpresa } from "@/http/empresa"
import { Upload, X } from "lucide-react"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"
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
import { useEdgeStore } from '@/lib/edgestore';
import { SingleImageDropzone } from "@/components/single-image-dropzone"
import { Form as Fr } from "@/components/ui/form";

const empresaSchema = z.object({
  codigo: z.string(),
  name: z.string(),
  type: z.enum(['SEDE', 'FILIAL']),
  avatar: z.string().optional().nullable(),
  countryId: z.number(),
  provinciaId: z.number(),
  endereco: z.string().optional(),
  cidade: z.string().optional(),
  telefone: z.string(),
  telefone1: z.string().optional(),
  email: z.string().optional(), //colocar aqui um transform
  nif: z.string(),
  cae: z.string().optional(),
  alvara: z.string().optional(),
})

export type empresaData = z.infer<typeof empresaSchema>

interface Props {
  countries: Country[]
  data: empresaData | null
}

export default function Form({ data, countries: before }: Props) {
  const countries = before.flatMap((country) => [
    ...country.provincias.map((provincia) => ({
      value: `${country.id}-${provincia.id}`,
      label: `${country.name} - ${provincia.name}`,
    })),
  ])

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<empresaData>({
    resolver: zodResolver(empresaSchema),
    defaultValues: {
      codigo: data?.codigo ?? '',
      name: data?.name ?? '',
      type: data?.type ?? 'SEDE',
      avatar: data?.avatar ?? null,
      countryId: data?.countryId ?? 0,
      provinciaId: data?.provinciaId ?? 0,
      endereco: data?.endereco ?? '',
      cidade: data?.cidade ?? '',
      telefone: data?.telefone ?? '',
      telefone1: data?.telefone1 ?? '',
      email: data?.email ?? null,
      nif: data?.nif ?? '',
      cae: data?.cae ?? '',
      alvara: data?.alvara ?? '',
    }
  })

  const [open, setOpen] = useState(false)
  const selectedCountryProvincia = watch(['countryId', 'provinciaId'])
  const selectedValue = `${selectedCountryProvincia[0]}-${selectedCountryProvincia[1]}`
  const [file, setFile] = useState<File>()
  const { edgestore } = useEdgeStore();

  useEffect(() => {
    if (data?.avatar) {
      fetch(data.avatar)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "avatar", { type: blob.type })
          setFile(file)
        })
    }
  }, [data?.avatar])

  async function upsert(val: empresaData) {
    if (file && typeof file !== 'string') {
      try {
        // Faz o upload da imagem e obtém a URL
        const res = await edgestore.publicAvatar.upload({
          file,
          input: { type: "avatar" },
          onProgressChange: (progress) => {
            console.log(progress);
          },
        });
        if (res?.thumbnailUrl) {
          // Atualiza o campo 'avatar' com a URL da imagem
          val.avatar = res.thumbnailUrl;
        } else {
          throw new Error('Falha ao fazer upload da imagem.');
        }
      } catch (error) {
        toast.error('Erro ao fazer upload da imagem.');
        return;
      }
    }

    // Atualiza ou insere a empresa na base de dados
    const result = await upsertEmpresa(val);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Empresa atualizada com sucesso');
    }
  }
  return (
    <form onSubmit={handleSubmit(upsert)}>
      <div className="grid grid-cols-2 space-x-2 w-full">
        <div className="space-y-2">
          <Label htmlFor="avatar" isReq={true}>Avatar</Label>
          <SingleImageDropzone
            width={200}
            height={200}
            value={file}
            onChange={(file) => {
              setFile(file);
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input {...register('name')} required id="name" placeholder="Digite o nome da empresa." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Tipo</Label>
          <Select
            defaultValue={data?.type}
            onValueChange={(val: 'SEDE' | 'FILIAL') => setValue('type', val)}
          >
            <SelectTrigger className="" aria-label="Select a value">
              <SelectValue placeholder="Informe o escopo da empresa" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectItem value="SEDE" className="rounded-lg">SEDE</SelectItem>
              <SelectItem value="FILIAL" className="rounded-lg">FILIAL</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">

          <div className="space-y-2">
            <Label htmlFor="nif">NIF</Label>
            <Input {...register('nif')} id="nif" placeholder="Digite o número de identificação fiscal da empresa." required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cae" isReq={true}>CAE</Label>
          <Input {...register('cae')} id="cae" placeholder="Digite o código de atividade econômica da empresa." />
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
                {selectedValue !== '0-0'
                  ? countries.find((country) => country.value === selectedValue)?.label
                  : "Selecione o pais e provincia..."}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className=" p-0">
              <Command>
                <CommandInput placeholder="Pesquise pais e provincia..." className="h-9" />
                <CommandList>
                  <CommandEmpty>Nenhum pais ou provincia encontrado.</CommandEmpty>
                  <CommandGroup>
                    {countries.map((country) => (
                      <CommandItem
                        key={country.value}
                        onSelect={() => {
                          setValue('countryId', Number(country.value.split("-")[0]))
                          setValue('provinciaId', Number(country.value.split("-")[1]))
                          setOpen(false)
                        }}
                      >
                        {country.label}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            selectedValue === country.value ? "opacity-100" : "opacity-0"
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
          <Label htmlFor="cidade" isReq={true}>Cidade</Label>
          <Input {...register('cidade')} id="cidade" placeholder="Digite a cidade." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefone">Telefone</Label>
          <Input {...register('telefone')} id="telefone" placeholder="Digite o telefone." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefone1" isReq={true}>Telefone 1</Label>
          <Input {...register('telefone1')} id="telefone1" placeholder="Digite o telefone 1." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" isReq={true}>Email</Label>
          <Input {...register('email')} id="email" placeholder="Digite o email." />
          <Fr.error error={errors.email?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endereco" isReq={true}>Endereço</Label>
          <Input {...register('endereco')} id="endereco" placeholder="Digite o endereço." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="alvara" isReq={true}>Alvara</Label>
          <Input {...register('alvara')} id="alvara" placeholder="Digite o alvara." />
        </div>
      </div>
      <CardFooter className="flex justify-end pt-4">
        <Button type="submit" disabled={isSubmitting} >
          {isSubmitting && <CircleDashed className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? "Aguarde" : "Salvar"}
        </Button>
      </CardFooter>
    </form>
  )
}