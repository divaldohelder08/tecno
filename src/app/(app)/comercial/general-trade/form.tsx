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
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useEdgeStore } from "@/lib/edgestore";
import { toast } from "sonner";
const formSchema = z.object({
  name: z.string().min(1, "Nome do artigo é obrigatório"),
  imagem: z.string().nullable().optional(),
  categoryId: z.number().optional(),
  subCategoriaId: z.number().optional(),
  unidadeId: z.number().nullable().optional(),
})
/*
stock_min: z.coerce.number().nonnegative("Valor deve ser positivo"),
  stock_max: z.coerce.number().nonnegative("Valor deve ser positivo"),
*/

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
  const [currentCategory, setCurrentCategory] = useState<number | undefined>(undefined)
  const [opn, setOpn] = useState<boolean>(false);
  const { edgestore } = useEdgeStore();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
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
    setFile(null)
    setOpn(false)
  }
  return (
    <Dialog open={opn} onOpenChange={setOpn}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-[max-content]">
        <div className="flex flex-col sm:gap-4 sm:py-4">
          <form className="grid flex-1 items-start gap-4 py-4 md:gap-8  px-8 sm:px-4 md:px-4" onSubmit={handleSubmit(send)}>
            <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
              <div className="flex items-center gap-4">
                <DialogHeader>
                  <DialogTitle>Criar serviço</DialogTitle>
                  <DialogDescription>
                    Preencha os campos a seguir.
                  </DialogDescription>
                </DialogHeader>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Button variant="outline" size="sm" type="reset">
                    Descartar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={() => console.log(errors)}
                  >
                    {
                      isSubmitting
                        ? <CircleDashed className="motion-reduce:hidden animate-spin" size="20" />
                        : 'Salvar Produto'
                    }
                  </Button>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                  <CardContent className="grid gap-4 p-0">
                    <div className="grid gap-3">
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
                    <div className="grid gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="unit" isReq={true}>Unidade</Label>
                        <Select onValueChange={(value) => setValue("unidadeId", value === "none" ? null : Number(value))}>
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
                      </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="grid gap-3">
                        <Fr.label
                          htmlFor="category"
                          label="Categoria"
                          error={errors.categoryId?.message}
                          isReq={true}
                        />
                        <Select
                          onValueChange={(value) => {
                            const categoriaId = value === "none" ? undefined : Number(value);
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
                            <SelectItem value="none">Nenhuma</SelectItem>
                            {
                              categories.map((e) => <SelectItem value={String(e.id)} key={e.id}>{e.name}</SelectItem>)
                            }
                          </SelectContent>
                        </Select>
                        <Fr.error error={errors.categoryId?.message} />
                      </div>
                      <div className="grid gap-3">
                        <Fr.label
                          htmlFor="Sub-c[category"
                          label="Subcategoria"
                          error={errors.subCategoriaId?.message}
                          isReq={true}
                        />
                        <Select
                          onValueChange={(value) => {
                            const subId = value === "none" ? undefined : Number(value);
                            setValue("subCategoriaId", subId);
                          }}
                        >
                          <SelectTrigger id="subcategory" aria-label="Selecione a sub-categoria">
                            <SelectValue placeholder="Selecione a subcategoria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Nenhuma</SelectItem>
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
                  </CardContent>
                </div>
                <div className="grid auto-rows-max items-start gap-2 lg:gap-8">
                  <Label isReq="false">Imagens</Label>
                  <div className="grid grid-cols-1 gap-2">
                    <SingleImageDropzone
                      className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed h-[250px]"
                      value={file}
                      onChange={(file) => {
                        setFile(file);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="block w-full space-y-4 md:hidden">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                  onClick={() => console.log(errors)}
                >
                  {
                    isSubmitting
                      ? <CircleDashed className="motion-reduce:hidden animate-spin" size="20" />
                      : 'Salvar Produto'
                  }
                </Button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
