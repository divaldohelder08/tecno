"use client"
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form as Fr } from "@/components/ui/form-components";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createService } from "@/http/article";
import { categories } from "@/http/helpers";
import { useEdgeStore } from "@/lib/edgestore";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDashed } from 'lucide-react';
import { ReactNode, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Nome do artigo é obrigatório"),
  imagem: z.string().nullable().optional(),
  categoriaId: z.number().optional(),
  subCategoriaId: z.number().optional(),
});

export type formData = z.infer<typeof formSchema>;

interface props {
  categories: categories[];
  children: ReactNode;
  fornecedores: {
    id: number;
    entidade: {
      id: number;
      name: string;
    };
  }[];
}

export function Form({ categories, children }: props) {
  const [file, setFile] = useState<File | undefined>();
  const [currentCategory, setCurrentCategory] = useState<number | undefined | null>(undefined);
  const [opn, setOpn] = useState<boolean>(false);
  const { edgestore } = useEdgeStore();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<formData>({
    resolver: zodResolver(formSchema),
  });

  async function send(data: formData) {
    if (file && typeof file !== "string") {
      try {
        const res = await edgestore.artigoAvatar.upload({
          file,
          input: { type: "avatar" },
          onProgressChange: (progress) => {
            console.log(progress);
          },
        });
        if (res?.thumbnailUrl) {
          data.imagem = res.thumbnailUrl;
        } else {
          throw new Error("Falha ao fazer upload da imagem.");
        }
      } catch (error) {
        toast.error("Erro ao fazer upload da imagem.");
        return;
      }
    }

    const result = await createService(data);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Serviço cadastrado com sucesso");
    }
    reset();
    setFile(undefined);
    setOpn(false);
  }
  //sm:max-w-md
  return (
    <Dialog open={opn} onOpenChange={setOpn}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[max-content]">
        <DialogHeader>
          <DialogTitle>Criar serviço</DialogTitle>
          <DialogDescription>
            Preencha os campos a seguir.
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
            <div className="space-y-3">
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
                        {categories.map((e) => (
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
                        {categories.map((e) => {
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
              <Button type="submit" className="w-full !mt-4 gap-1" disabled={isSubmitting}>
                {
                  isSubmitting
                    ? <>
                      <CircleDashed className="motion-reduce:hidden animate-spin" size="20" />
                      Salvando
                    </>
                    : 'Salvar Serviço'
                }

              </Button>
            </div>
          </CardContent>
        </form>
      </DialogContent>
    </Dialog>
  );
}
// min-h-[150px] min-w-[200px]
