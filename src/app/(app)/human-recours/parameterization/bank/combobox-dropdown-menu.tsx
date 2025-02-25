"use client";

import {EyeIcon, TrashIcon, Pen, CircleDashed, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react"
import { deleteBank, updateBank } from "@/http/banks";

const formSchema = z.object({
  id: z.number(),
  nome_banco: z.string(),
  sigla: z.string(),
  codigo: z.string(),
});

type FormData = z.infer<typeof formSchema>;

interface Props {
  id: number;
  name: string;
  code: string;
  sigla: string;
}

export function ComboboxDropdownMenu({ id, name, code, sigla }: Props) {
  const { reset, register, handleSubmit, setValue, getValues, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id,
      nome_banco: name,
      sigla,
      codigo: code
    }
  });

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const handleDelete = async () => {
    const result = await deleteBank(id);
    if (result?.error) {
      toast.error(result.error);
    }
  };

  const send = async (data: FormData) => {
    const result = await updateBank(data);
    if (result?.error) {
      toast.error(result.error);
    }
    setOpen1(false);
    reset();
  };

  const gerarSigla = () => {
    const nomeCompleto = getValues("nome_banco");
    const palavrasIgnoradas = ['de', 'do', 'da', 'dos', 'das'];
    const palavras = nomeCompleto.split(' ');
    const palavrasFiltradas = palavras.filter(palavra => !palavrasIgnoradas.includes(palavra.toLowerCase()));
    const sigla = palavrasFiltradas.map(palavra => palavra.charAt(0).toUpperCase()).join('');
    setValue('sigla', sigla);
  };

  return (
    <>
      <Drawer open={open1} onOpenChange={setOpen1}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon">
            <EyeIcon className="h-4 w-4" />
            <span className="sr-only">Visualizar</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="min-w-[400px] mx-auto">
            <DrawerHeader>
              <DrawerTitle>Editar Banco</DrawerTitle>
            </DrawerHeader>
            <DrawerFooter>
              <form className="grid w-full items-start gap-6" onSubmit={handleSubmit(send)}>
                <div className="grid gap-3">
                  <Label htmlFor="nome_banco">Nome</Label>
                  <Input
                    placeholder="Informe o nome do banco"
                    required
                    {...register('nome_banco')}
                  />
                  {errors.nome_banco && (
                    <p className="text-sm font-medium text-red-500 dark:text-red-400">
                      {errors.nome_banco.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 items-center">
                  <div className="grid gap-2 relative">
                    <Label htmlFor="sigla">Sigla</Label>
                    <div className="relative">
                      <Input
                        id="sigla"
                        placeholder="Informe a sigla"
                        required
                        {...register('sigla')}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-1/2 -translate-y-1/2"
                        onClick={gerarSigla}
                      >
                        <Sparkles className="h-4 w-4" />
                      </Button>
                    </div>
                    {errors.sigla && (
                      <p className="text-sm font-medium text-red-500 dark:text-red-400">
                        {errors.sigla.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="codigo">Código</Label>
                    <Input
                      placeholder="Informe o código"
                      required
                      {...register('codigo')}
                    />
                    {errors.codigo && (
                      <p className="text-sm font-medium text-red-500 dark:text-red-400">
                        {errors.codigo.message}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  size="sm"
                  type="submit"
                  className="w-full gap-1.5 flex"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <CircleDashed className="motion-reduce:hidden animate-spin" size="20" />
                  ) : 'Atualizar'}
                </Button>
              </form>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
      >
        <TrashIcon className="h-4 w-4" />
        <span className="sr-only">Excluir</span>
      </Button>
    </>
  );
}
