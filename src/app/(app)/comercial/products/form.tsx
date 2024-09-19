"use client";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Form as Fr } from "@/components/ui/form-components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createProduct } from "@/http/article";
import { categories } from "@/http/helpers";
import { unity } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDashed } from 'lucide-react';
import { ReactNode, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { useEdgeStore } from "@/lib/edgestore";
import { toast } from "sonner";
const formSchema = z.object({
  name: z.string().min(1, "Nome do artigo é obrigatório"),
  imagem: z.string().nullable().optional(),
  categoriaId: z.number().nullable().optional(),
  subCategoriaId: z.number().nullable().optional(),
  unidadeId: z.number().nullable().optional(),
})

export type formData = z.infer<typeof formSchema>
interface props {
  categories: categories[],
  children: ReactNode
  unidades: unity[];
  fornecedores: {
    id: number
    entidade: {
      id: number;
      name: string
    }
  }[]
}
export function Form({ categories, children, unidades }: props) {
  const [file, setFile] = useState<File>()
  const [currentCategory, setCurrentCategory] = useState<number | null | undefined>(undefined)
  const [opn, setOpn] = useState<boolean>(false);
  const { edgestore } = useEdgeStore();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors, isSubmitting }
  } = useForm<formData>({
    resolver: zodResolver(formSchema),
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
    setFile(undefined)
    setOpn(false)
  }
  return (
    <Dialog open={opn} onOpenChange={setOpn}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[max-content]">
        <DialogHeader>
          <DialogTitle>Criar Produto</DialogTitle>
          <DialogDescription>
            Preencha os campos a seguir.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(send)}>
          <CardContent className="space-y-4 p-0">
            <div className="space-y-2">
              <Fr.label error={errors.name?.message} htmlFor="name" label="Nome" />
              <Input
                required
                id="name"
                type="text"
                className="w-full" {...register("name")}
                placeholder="Informe o nome do produto"
              />
              <Fr.error error={errors.name?.message} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-0">
              <div className="space-y-2">
                <Label isReq={false}>Imagem</Label>
                <div className="grid grid-cols-1 gap-2 w-full">
                  <SingleImageDropzone
                    className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed h-[250px]"
                    value={file}
                    onChange={(file) => {
                      setFile(file);
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="space-y-2">
                  <Fr.label
                    htmlFor="categoriaId"
                    label="categoria"
                    error={errors.categoriaId?.message}
                    isReq={false}
                  />
                  <Controller
                    name="categoriaId"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value ? String(field.value) : undefined}
                        onValueChange={(value) => {
                          const categoriaId = value === "none" ? null : Number(value)
                          setCurrentCategory(categoriaId);
                          field.onChange(categoriaId)
                        }
                        }

                        name="categoriaId"
                      >
                        <SelectTrigger
                          id="categoriaId"
                          aria-label="Seleciona a categoria"
                        >
                          <SelectValue placeholder="Seleciona a categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Nenhuma</SelectItem>
                          {
                            categories.map((e) => <SelectItem value={String(e.id)} key={e.id}>{e.name}</SelectItem>)
                          }
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <Fr.error error={errors.categoriaId?.message} />
                </div>
                <div className="space-y-2">
                  <Fr.label
                    htmlFor="Sub-category"
                    label="Sub-categoria"
                    error={errors.subCategoriaId?.message}
                    isReq={false}
                  />
                  <Controller
                    name="subCategoriaId"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value ? String(field.value) : undefined}
                        onValueChange={(value) => field.onChange(value === "none" ? null : Number(value))}
                      >
                        <SelectTrigger id="subCategoriaId" aria-label="Selecione a sub-categoria">
                          <SelectValue placeholder="Selecione a subcategoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Nenhuma</SelectItem>
                          {
                            categories.map((e) => {
                              if (e.id === currentCategory) {
                                return e.subCategoria.map((b) => <SelectItem value={String(b.id)} key={b.id}>{b.name}</SelectItem>)
                              }
                            })
                          }
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <Fr.error error={errors.subCategoriaId?.message} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit" isReq={false}>Unidade</Label>
                  <Controller
                    name="unidadeId"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value ? String(field.value) : undefined}
                        onValueChange={(value) => field.onChange(value === "none" ? null : Number(value))}
                      >
                        <SelectTrigger id="unit" aria-label="Selecione a unidade">
                          <SelectValue placeholder="Selecione a unidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Nenhuma</SelectItem>
                          {unidades.map((e) => (
                            <SelectItem value={String(e.id)} key={e.id}>
                              {e.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <Fr.error error={errors.unidadeId?.message} />
                </div>
                <Button
                  type="submit"
                  className="w-full !mt-4"
                  disabled={isSubmitting}
                >
                  {
                    isSubmitting
                      ? <CircleDashed className="motion-reduce:hidden animate-spin" size="20" />
                      : 'Salvar Produto'
                  }
                </Button>
              </div>
            </div>
          </CardContent>
        </form>
      </DialogContent>
    </Dialog>
  );
}
