"use client";

import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Form as Fr } from "@/components/ui/form-components";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getArtigoById, updateProduto } from "@/http/article";
import { getCategories } from "@/http/helpers";
import { getUnidades } from "@/http/unity";
import { useEdgeStore } from "@/lib/edgestore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CircleDashed, Loader2 } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Nome do artigo é obrigatório"),
  imagem: z.string().nullable().optional(),
  categoriaId: z.number().nullable().optional(),
  subCategoriaId: z.number().nullable().optional(),
})

export type formData = z.infer<typeof formSchema>

interface props {
  id: number
  name: string
  opn: boolean
  setOpn: Dispatch<SetStateAction<boolean>>
}

export default function EditForm({ opn, setOpn, id, name }: props) {
  const [file, setFile] = useState<File>()
  const [currentCategory, setCurrentCategory] = useState<number | null | undefined>(undefined)
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

  // data: categories, isFetching, error
  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await getCategories(),
  });

  const unidades = useQuery({
    queryKey: ['unidades'],
    queryFn: async () => await getUnidades(),
  });




  async function send({ imagem, ...rest }: formData) {
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
          imagem = res.thumbnailUrl;
        } else {
          throw new Error('Falha ao fazer upload da imagem.');
        }
      } catch (error) {
        toast.error('Erro ao fazer upload da imagem.');
        return;
      }
    }
    const result = await updateProduto({ id, imagem, familia: 'SERVICE', ...rest });
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Produto atualizado com sucesso');
    }
    reset()
    setFile(undefined)
    setOpn(false)
  }

  const { mutateAsync: getData, isPending } = useMutation({
    mutationFn: async () => await getArtigoById(id),
    onSuccess: ({ categoriaId, name, imagem, subCategoriaId, unidadeId }) => {
      setValue("name", name)
      setValue("imagem", imagem)
      setValue("categoriaId", categoriaId)
      setValue("subCategoriaId", subCategoriaId)
      setCurrentCategory(categoriaId)
      if (imagem) {
        fetch(imagem)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], "avatar", { type: blob.type })
            setFile(file)
          })
      }
    },
    onError: (error: string) => toast.error(error)
  })



  useEffect(() => {
    opn && getData()
  }, [getData, opn])

  return (
    <DialogContent className="max-w-[max-content]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 space-x-4">Editar Produto:
          {
            isPending
              ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              : name
          }</DialogTitle>
        <DialogDescription>
          Preencha os campos abaixo para atualizar o artigo.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(send)}>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-0">
          <div className="space-y-2">
            <Fr.label
              htmlFor="avatar"
              label="Imagem"
              error={errors.imagem?.message}
              isReq={true}
            />
            <SingleImageDropzone
              className="flex aspect-square items-center justify-center rounded-md border border-dashed w-full h-[15rem]"
              value={file}
              onChange={(file) => setFile(file)}
            />
            <Fr.error error={errors.imagem?.message} />
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Fr.label error={errors.name?.message} htmlFor="name" label="Nome" />
              <Input
                required
                id="name"
                type="text"
                className="w-full"
                {...register("name")}
                placeholder="Informe o nome do serviço"
              />
              <Fr.error error={errors.name?.message} />
            </div>
            <div className="space-y-2">
              <Fr.label
                htmlFor="category"
                label="Categoria"
                error={errors.categoriaId?.message}
                isReq={true}
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
                    <SelectTrigger id="categoriaId" aria-label="Seleciona a categoria">
                      <SelectValue placeholder="Seleciona a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Nenhuma</SelectItem>
                      {categories.data?.map((e) => (
                        <SelectItem value={String(e.id)} key={e.id}>
                          {e.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <Fr.error error={errors.categoriaId?.message} />
            </div>
            <div className="space-y-2">
              <Fr.label
                htmlFor="subcategory"
                label="Subcategoria"
                error={errors.subCategoriaId?.message}
                isReq={true}
              />
              <Controller
                name="subCategoriaId"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ? String(field.value) : undefined}
                    onValueChange={(value) => field.onChange(value === "none" ? null : Number(value))}
                  >
                    <SelectTrigger id="subcategory" aria-label="Selecione a subcategoria">
                      <SelectValue placeholder="Selecione a subcategoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Nenhuma</SelectItem>
                      {categories.data?.map((e) => {
                        if (e.id === currentCategory) {
                          return e.subCategoria.map((b) => (
                            <SelectItem value={String(b.id)} key={b.id}>
                              {b.name}
                            </SelectItem>
                          ));
                        }
                      })}
                    </SelectContent>
                  </Select>
                )}
              />
              <Fr.error error={errors.subCategoriaId?.message} />
            </div>
            <Button type="submit" className="w-full !mt-4 gap-1" disabled={isSubmitting || !getData || isPending}>
              {
                isSubmitting
                  ? <>
                    <CircleDashed className="motion-reduce:hidden animate-spin" size="20" />
                    Salvando
                  </>
                  : 'Salvar alterações'
              }

            </Button>
          </div>
        </CardContent>
      </form>
    </DialogContent>
  );
}
