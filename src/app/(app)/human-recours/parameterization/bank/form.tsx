"use client"
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBank } from "@/http/banks";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDashed, Sparkles } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  nome_banco: z.string(),
  sigla: z.string(),
  codigo: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export default function Form() {
  const {
    reset,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function send(data: FormData) {
    const result = await createBank(data);
    if (result?.error) {
      toast.error(result.error);
    }
    reset();
  }


  const gerarSigla = () => {
    const nomeCompleto = getValues("nome_banco")
    const palavrasIgnoradas = ['de', 'do', 'da', 'dos', 'das', 'a', 'e', 'i', 'o', 'u'];
    const palavras = nomeCompleto.split(' ');
    const palavrasFiltradas = palavras.filter(palavra => !palavrasIgnoradas.includes(palavra.toLowerCase()));
    const sigla = palavrasFiltradas.map(palavra => palavra.charAt(0).toUpperCase()).join('');
    setValue('sigla', sigla);
  };

  return (
    <div className="relative flex-col items-start gap-8 hidden xl:flex">
      <form className="grid w-full items-start gap-6" onSubmit={handleSubmit(send)}>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Novo Banco
          </legend>
          <div className="grid gap-3">
            <Label htmlFor="nome_banco">Nome</Label>
            <Input placeholder="Informe o nome do banco" required {...register('nome_banco')} />
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
                <Input id="sigla" placeholder="Sigla" required {...register('sigla')} />
                <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-1/2 -translate-y-1/2" onClick={gerarSigla}>
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
              <Input placeholder="Código" required {...register('codigo')} />
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
            ) : 'Salvar'}
          </Button>
        </fieldset>
      </form>
    </div>
  );
}

export function DrawerForm() {
  const [opn, setOpn] = useState<boolean>(false);
  const {
    reset,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function send(data: FormData) {
    const result = await createBank(data);
    if (result?.error) {
      toast.error(result.error);
    }
    setOpn(false);
    reset();
  }


  const gerarSigla = () => {
    const nomeCompleto = getValues("nome_banco")
    const palavrasIgnoradas = ['de', 'do', 'da', 'dos', 'das'];
    const palavras = nomeCompleto.split(' ');
    const palavrasFiltradas = palavras.filter(palavra => !palavrasIgnoradas.includes(palavra.toLowerCase()));
    const sigla = palavrasFiltradas.map(palavra => palavra.charAt(0).toUpperCase()).join('');
    setValue('sigla', sigla);
  };

  return (
    <Drawer open={opn} onOpenChange={setOpn}>
      <DrawerTrigger>
        <Button size="sm" className="inline-flex xl:hidden">Novo Banco</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="min-w-[400px] mx-auto">
          <DrawerHeader>
            <DrawerTitle>Novo Banco</DrawerTitle>
          </DrawerHeader>
          <DrawerFooter>
            <form className="grid w-full items-start gap-6" onSubmit={handleSubmit(send)}>
              <div className="grid gap-3">
                <Label htmlFor="nome_banco">Nome</Label>
                <Input placeholder="Informe o nome do banco" required {...register('nome_banco')} />
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
                    <Input id="sigla" placeholder="Informe a sigla" required {...register('sigla')} />
                    <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-1/2 -translate-y-1/2" onClick={gerarSigla}>
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
                  <Input placeholder="Informe o código" required {...register('codigo')} />
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
                ) : 'Salvar'}
              </Button>
            </form>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}




