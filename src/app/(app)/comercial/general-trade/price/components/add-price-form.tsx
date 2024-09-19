"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form as Fr } from "@/components/ui/form-components"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { createPrice } from "@/http/article"
import { maper } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusCircle } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { tax } from "./tables"

interface props {
  id: number
  img: string | null
  name: string
  lojas: maper[]
  armazens: maper[]
  insencao: maper[]
  taxas: tax[]
}

const formSchema = z.object({
  id: z.number(),
  lojaId: z.number(),
  armazemId: z.number(),
  preco: z.coerce.number(),
  precoImposto: z.coerce.number(),
  controloStock: z.boolean(),
  stockMax: z.coerce.number().optional(),
  stockMin: z.coerce.number().optional(),
  taxaImpostoId: z.number().nullable(),
  isencaoId: z.number().nullable(),
}).refine((data) => {
  if (data.controloStock) {
    return data.stockMin !== undefined && data.stockMax !== undefined &&
      data.stockMin >= 0 && data.stockMax >= data.stockMin;
  }
  return true;
}, {
  message: "Stock mínimo e máximo são obrigatórios e devem ser válidos quando o controle de stock está ativado",
  path: ["stockMin", "stockMax"],
});
export type formData = z.infer<typeof formSchema>

export function AddPriceForm({ id, img, name, lojas, armazens, insencao, taxas }: props) {
  const [opn, setOpn] = useState<boolean>(false)
  const { control, register, watch, handleSubmit, reset, setValue, formState: { errors } } = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      controloStock: false,
      id,
    }
  })

  // Watching fields
  const controloStock = watch("controloStock")
  const taxa = watch("taxaImpostoId")
  const ise = watch("isencaoId")
  const preco = watch("preco")


  // Sync logic between `taxaImpostoId` and `isencaoId`
  useEffect(() => {
    if (taxa) {
      setValue("isencaoId", null)
    }
  }, [taxa, setValue, , setOpn, opn])

  useEffect(() => {
    if (ise) {
      setValue("taxaImpostoId", null)
    }
  }, [ise, setValue, setOpn, opn])

  // Reset stock values if controloStock is false
  useEffect(() => {
    if (!controloStock) {
      setValue("stockMin", undefined)
      setValue("stockMax", undefined)
    }
  }, [controloStock, setValue])



  useEffect(() => {
    const taxaValor = taxas.find((t) => t.id == taxa)?.value as number
    const iva = (Number(preco) * taxaValor) / 100
    const precoComImposto = Number(preco) + Number(iva.toFixed(2))
    setValue("precoImposto", Number(precoComImposto))

  }, [preco, taxa, setValue, taxas])

  // Form submission handler
  async function send(formData: formData) {
    const result = await createPrice(formData)
    if (result?.error) {
      toast.error(result.error)
    }

    toast.success("Preço adicionado com sucesso")
    reset()
    setOpn(false)
  }

  return (
    <Dialog open={opn} onOpenChange={setOpn}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="!text-amber-600 hover:border-amber-600 hover:bg-amber-600/10"
        >
          <PlusCircle className="h-4 w-4" />
          <span className="sr-only">Adicionar Preço</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Adicionar Preço do Produto</DialogTitle>
          <DialogDescription>
            Preencha os detalhes do produto para adicionar o preço.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <Image src={img ?? '/placeholder.svg'} alt={name} className="w-full h-auto object-cover rounded-lg shadow-md" width={100} height={100} />
          </div>
          <div className="w-full md:w-2/3">
            <form className="space-y-6" onSubmit={handleSubmit(send)}>
              <Tabs defaultValue="geral" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="geral">Informações Gerais</TabsTrigger>
                  <TabsTrigger value="estoque">Controle de Estoque</TabsTrigger>
                </TabsList>
                <TabsContent value="geral">
                  <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      <div>
                        <Label htmlFor="taxaImpostoId">Taxa Imposto</Label>
                        <Controller
                          name="taxaImpostoId"
                          control={control}
                          render={({ field }) => (
                            <Select
                              value={field.value ? String(field.value) : undefined}
                              onValueChange={(value) => field.onChange(Number(value))}
                              disabled={!!ise}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Informe a taxas" />
                              </SelectTrigger>
                              <SelectContent>
                                {taxas.map((b) => (
                                  <SelectItem key={b.id} value={String(b.id)}>{b.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        <Fr.error error={errors.taxaImpostoId?.message} />
                      </div>
                      <div>
                        <Label htmlFor="isencaoId">Isenção</Label>
                        <Controller
                          name="isencaoId"
                          control={control}
                          render={({ field }) => (
                            <Select
                              value={field.value ? String(field.value) : undefined}
                              onValueChange={(value) => field.onChange(Number(value))}
                              disabled={!!taxa}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Informe a isenção" />
                              </SelectTrigger>
                              <SelectContent>
                                {insencao.map((b) => (
                                  <SelectItem key={b.value} value={String(b.value)}>{b.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        <Fr.error error={errors.isencaoId?.message} />
                      </div>
                      <div>
                        <Label htmlFor="preco">Preço</Label>
                        <Input id="preco" type="number" step="0.01" placeholder="0,00" {...register("preco")} />
                        <Fr.error error={errors.preco?.message} />
                      </div>
                      <div>
                        <Label htmlFor="precoImposto">Preço com Imposto</Label>
                        <Input id="precoImposto" type="number" step="0.01" readOnly placeholder="0,00" disabled {...register("precoImposto")} />
                        <Fr.error error={errors.precoImposto?.message} />
                      </div>
                    </div>
                  </div>

                </TabsContent>
                <TabsContent value="estoque">
                  <div className="pt-4 space-y-4">
                    <div className="grid items-start space-y-2 mb-4">
                      <Label htmlFor="controloStock" isReq={false}>Ativar Controle de Estoque</Label>
                      <Controller
                        name="controloStock"
                        control={control}
                        render={({ field }) => (
                          <Switch
                            id="controloStock"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                    {controloStock && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="stockMix">Estoque Mínimo</Label>
                          <Input id="stockMix" type="number" placeholder="0" {...register('stockMin')} />
                          <Fr.error error={errors.stockMin?.message} />
                        </div>
                        <div>
                          <Label htmlFor="stockMax">Estoque Máximo</Label>
                          <Input id="stockMax" type="number" placeholder="0" {...register('stockMax')} />
                          <Fr.error error={errors.stockMax?.message} />
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div >
                        <Label htmlFor="lojaId">Loja</Label>
                        <Controller
                          name="lojaId"
                          control={control}
                          render={({ field }) => (
                            <Select
                              value={field.value ? String(field.value) : undefined}
                              onValueChange={(value) => field.onChange(Number(value))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Informe a loja" />
                              </SelectTrigger>
                              <SelectContent>
                                {lojas.map((b) => {
                                  return <SelectItem key={b.value} value={String(b.value)}>{b.label}</SelectItem>;
                                })
                                }
                              </SelectContent>
                            </Select>
                          )}
                        />
                        <Fr.error error={errors.lojaId?.message} />
                      </div>
                      <div>                 <Label htmlFor="armazemId">Armazem</Label>
                        <Controller
                          name="armazemId"
                          control={control}
                          render={({ field }) => (
                            <Select
                              value={field.value ? String(field.value) : undefined}
                              onValueChange={(value) => field.onChange(Number(value))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Informe o armazem" />
                              </SelectTrigger>
                              <SelectContent>
                                {armazens.map((b) => {
                                  return <SelectItem key={b.value} value={String(b.value)}>{b.label}</SelectItem>;
                                })
                                }
                              </SelectContent>
                            </Select>
                          )}
                        />
                        <Fr.error error={errors.armazemId?.message} />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button type="submit" variant="default">Guardar</Button>
              </DialogFooter>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
