"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, Upload, ScanBarcode, CheckIcon } from 'lucide-react';
import * as z from "zod"
import { useState } from "react";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form as Fr } from "@/components/ui/form";
import { categories } from "@/http/helpers";
import { createProduct } from "@/http/article";


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
import { CaretSortIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { useEdgeStore } from "@/lib/edgestore";
import { toast } from "sonner";
const formSchema = z.object({
  name: z.string().min(1, "Nome do artigo é obrigatório"),
  imagem: z.string().nullable().optional(),
  categoryId: z.number().optional(),
  subCategoriaId: z.number().optional(),
  unidadeId: z.number().nullable().optional(),
  stock_min: z.coerce.number().nonnegative("Valor deve ser positivo"),
  stock_max: z.coerce.number().nonnegative("Valor deve ser positivo"),
  comercio_geral: z.boolean(),
  restaurante: z.boolean(),
  hotelaria: z.boolean(),
  oficina: z.boolean(),
})

export type formData = z.infer<typeof formSchema>
interface props {
  categories: categories[],
  fornecedores: {
    id: number
    entidade: {
      id: number;
      name: string
    }
  }[]
}
export function Form({ categories }: props) {
  const [file, setFile] = useState<File>()
  const [currentCategory, setCurrentCategory] = useState<number | undefined>(undefined)
  const { edgestore } = useEdgeStore();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stock_min: 0,
      stock_max: 0,
      comercio_geral: false,
      restaurante: false,
      hotelaria: false,
      oficina: false,
    }
  })



  async function send(data: formData) {
    if (file && typeof file !== 'string') {
      try {
        // Faz o upload da imagem e obtém a URL
        const res = await edgestore.artigoAvatar.upload({
          file,
          input: { type: "avatar" },
          onProgressChange: (progress) => {
            console.log(progress);
          },
        });
        if (res?.thumbnailUrl) {
          // Atualiza o campo 'avatar' com a URL da imagem
          data.imagem = res.thumbnailUrl;
        } else {
          throw new Error('Falha ao fazer upload da imagem.');
        }
      } catch (error) {
        toast.error('Erro ao fazer upload da imagem.');
        return;
      }
    }

    const result = await createProduct(data);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Produto cadastrado com sucesso');
    }
    reset()
  }
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 bg-muted/40">
      <form className="grid flex-1 items-start gap-4 py-4 md:gap-8  px-8 sm:px-4 md:px-4" onSubmit={handleSubmit(send)}>
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Voltar</span>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Produto
            </h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm" type="reset">
                Descartar
              </Button>
              <Button type="submit" onClick={() => console.log(errors)}>Salvar artigo</Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Informações do produto</CardTitle>
                  <CardDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-3">
                    <Fr.label error={errors.name?.message} htmlFor="name" label="Nome" />
                    <Input
                      required
                      id="name"
                      type="text"
                      className="w-full" {...register("name")}
                      placeholder="Informe o nome do producto"
                    />
                    <Fr.error error={errors.name?.message} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Fr.label
                        htmlFor="min-stock"
                        label="Estoque Mínimo"
                        error={errors.stock_min?.message}
                      />
                      <Input
                        required
                        type="number"
                        id="min-stock"
                        {...register("stock_min")}
                      />
                      <Fr.error error={errors.stock_min?.message} />
                    </div>
                    <div className="space-y-2">
                      <Fr.label
                        htmlFor="max-stock"
                        label="Estoque Máximo"
                        error={errors.stock_max?.message}
                      />
                      <Input required id="max-stock" type="number" {...register("stock_max")} />
                      <Fr.error error={errors.stock_max?.message} />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Detalhes do Artigo</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="grid gap-3">
                      <Fr.label
                        htmlFor="category"
                        label="Categoria"
                        error={errors.categoryId?.message}
                        isReq={true}
                      />
                      <Select
                        onValueChange={(e) => {
                          const categoriaId = e ? undefined : Number(e);
                          setCurrentCategory(categoriaId);
                          setValue("categoryId", categoriaId);
                        }}
                        name="category"
                      >
                        <SelectTrigger
                          id="category"
                          aria-label="Seleciona a categoria"
                        >
                          <SelectValue placeholder="Seleciona a categoria" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value={undefined} >Nenhuma</SelectItem>
                          {
                            categories.map((e) => <SelectItem value={String(e.id)} key={e.id}>{e.name}</SelectItem>)
                          }
                        </SelectContent>
                      </Select>
                      <Fr.error error={errors.categoryId?.message} />
                    </div>
                    <div className="grid gap-3">
                      <Fr.label
                        htmlFor="subcategory"
                        label="Subcategoria"
                        error={errors.subCategoriaId?.message}
                        isReq={true}
                      />
                      <Select
                        onValueChange={(e) => {
                          const subId = e ? undefined : Number(e);
                          setValue("subCategoriaId", subId)
                        }
                        }

                      >
                        <SelectTrigger id="subcategory" aria-label="Selecione a subcategoria">
                          <SelectValue placeholder="Selecione a subcategoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={undefined} >Nenhuma</SelectItem>
                          {
                            categories.map((e) => {
                              if (e.id === currentCategory) {
                                return e.SubCategory.map((b) => <SelectItem value={String(b.id)} key={b.id}>{b.name}</SelectItem>)
                              }
                            })
                          }
                        </SelectContent>
                      </Select>
                      <Fr.error error={errors.subCategoriaId?.message} />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="space-x-2 flex">
                      <Label htmlFor="general-trade" className="sr-only">
                        Comércio Geral
                      </Label>
                      <Checkbox
                        id="general-trade"
                        disabled={isSubmitting}
                        onCheckedChange={(checked: boolean) => setValue('comercio_geral', checked)}
                        {...register('comercio_geral')}
                      />
                      <span className="text-sm">Comércio Geral</span>
                    </div>
                    <div className="space-x-2 flex">
                      <Label htmlFor="restaurant" className="sr-only">
                        Restaurante
                      </Label>
                      <Checkbox
                        id="restaurant"
                        disabled={isSubmitting}
                        onCheckedChange={(checked: boolean) => setValue('restaurante', checked)}
                        {...register('restaurante')}
                      />
                      <span className="text-sm">Restaurante</span>
                    </div>
                    <div className="space-x-2 flex">
                      <Label htmlFor="hospitality" className="sr-only">
                        Hotelaria
                      </Label>
                      <Checkbox id="hospitality"
                        disabled={isSubmitting}
                        onCheckedChange={(checked: boolean) => setValue('hotelaria', checked)}
                        {...register('hotelaria')}
                      />
                      <span className="text-sm">Hotelaria</span>
                    </div>
                    <div className="space-x-2 flex">
                      <Label htmlFor="workshop" className="sr-only">
                        Oficina
                      </Label>
                      <Checkbox id="workshop"
                        disabled={isSubmitting}
                        onCheckedChange={(checked: boolean) => setValue('oficina', checked)}
                        {...register('oficina')}
                      />
                      <span className="text-sm">Oficina</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Status do Produto</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="unit" isReq={false}>Unidade</Label>
                      <Select
                      >
                        <SelectTrigger id="unit" aria-label="Selecione a unidade">
                          <SelectValue placeholder="Selecione a unidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unit1">Unidade 1</SelectItem>
                          <SelectItem value="unit2">Unidade 2</SelectItem>
                          <SelectItem value="unit3">Unidade 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>Imagens do Produto</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-1 gap-2">
                      <SingleImageDropzone
                        className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
                        value={file}
                        onChange={(file) => {
                          setFile(file);
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="block w-full space-y-4 md:hidden">
            <Button variant="outline" type="reset" className="w-full">
              Descartar
            </Button>
            <Button className="w-full" type="submit" onClick={() => console.log(errors)}>
              Salvar artigo
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
