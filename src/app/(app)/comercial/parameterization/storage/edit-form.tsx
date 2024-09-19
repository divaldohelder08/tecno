"use client";

import SkeletContainer from "@/components/skelet-container";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Form as Fr } from "@/components/ui/form-components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { getArmazem, updateArmazem } from "@/http/armazem";
import { getLoja } from "@/http/loja";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronsUpDown, Loader2 } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  lojaId: z.number().nullable(),
  description: z.string().nullable().optional(),
  localidade: z.string().nullable().optional(),
  bloqueioEntrada: z.boolean(),
  bloqueioSaida: z.boolean(),
});

export type updateArmazem = z.infer<typeof formSchema>;
interface lojas {
  value: number;
  label: string;
}
interface props {
  id: number
  name: string
  opn: boolean
  setOpn: Dispatch<SetStateAction<boolean>>
}
export default function EditForm({
  id,
  name,
  opn,
  setOpn
}: props) {
  const [open, setOpen] = useState(false);
  const [selectedLoja, setSelectedLoja] = useState<{ id: number | null; name: string } | null>(null);

  const { data: lojas, isFetching: isLoadingLoja } = useQuery<lojas[]>({
    queryKey: ['lojas'],
    queryFn: async () => {
      const data = await getLoja()
      const vals = data.map((loja) => ({
        value: loja.id,
        label: loja.name,
      }))
      return vals
    }
  });

  const {
    watch,
    reset,
    register,
    setValue,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<updateArmazem>({
    resolver: zodResolver(formSchema),
  });

  //return
  const { mutateAsync: getData, isPending } = useMutation({
    mutationFn: async () => await getArmazem(id),
    onSuccess: ({ name, lojaId, description, localidade, bloqueioEntrada, bloqueioSaida }) => {
      setValue("name", name)
      setValue("description", description)
      setValue("localidade", localidade)
      setValue("bloqueioEntrada", bloqueioEntrada)
      setValue("bloqueioSaida", bloqueioSaida)
      setValue("lojaId", lojaId)
      const b = lojaId !== null
        ? lojas && lojas.find((loja) => loja.value === lojaId)
        : null


      if (b === null) {
        setValue("lojaId", b)
        setSelectedLoja(b)
      } else if (b !== undefined) {
        setValue("lojaId", b.value)
        setSelectedLoja({ id: b.value, name: b.label })
      }

    },
    onError: (error: string) => toast.error(error)
  })


  const bloqueioEntrada = watch("bloqueioEntrada");
  const bloqueioSaida = watch("bloqueioSaida");

  useEffect(() => {
    opn && getData()
  }, [getData, opn])


  async function send(data: updateArmazem) {
    const result = await updateArmazem(data, id);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Armazem atualizado com sucesso!");
      setSelectedLoja(null);
      setOpn(false);
    }
  }


  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 space-x-4">Editar Armazem:
          {
            isPending
              ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              : name
          }</DialogTitle>
        <DialogDescription>
          Preencha os campos abaixo para atualizar o armazem.
        </DialogDescription>
      </DialogHeader>
      <form className="grid gap-4" onSubmit={handleSubmit(send)}>
        <div className="grid gap-2">
          <Label htmlFor="name">Nome</Label>
          <SkeletContainer isLoading={isPending}>
            <Input
              id="name"
              placeholder="Digite o nome do armazem"
              {...register("name")}
              disabled={isPending}
            />
            <Fr.error error={errors.name?.message} />
          </SkeletContainer>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lojaId">Loja</Label>
          <SkeletContainer isLoading={isLoadingLoja}>
            <Popover modal={true} open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  aria-expanded={open}
                  disabled={isPending}
                >
                  {selectedLoja ? selectedLoja.name : "Selecione a Loja"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput placeholder="Procurar loja..." />
                  <CommandList>
                    <CommandEmpty>Nenhuma loja encontrada.</CommandEmpty>
                    <CommandGroup>
                      {!isLoadingLoja && lojas &&
                        lojas.map((loja) => (
                          <CommandItem
                            key={loja.value}
                            onSelect={() => {
                              if (selectedLoja?.id === loja.value) {
                                setValue("lojaId", null);
                                setSelectedLoja(null);
                              } else {
                                setValue("lojaId", loja.value);
                                setSelectedLoja({ id: loja.value, name: loja.label });
                              }
                              setOpen(false);
                            }}
                          >
                            {loja.label}
                            {selectedLoja?.id === loja.value && (
                              <CheckIcon className="ml-auto h-4 w-4" />
                            )}
                          </CommandItem>
                        ))}
                      <CommandItem
                        onSelect={() => {
                          if (selectedLoja?.id === null) {
                            setValue("lojaId", null);
                            setSelectedLoja(null);
                          } else {
                            setValue("lojaId", null);
                            setSelectedLoja({ id: null, name: "Sede" });
                          }
                          setOpen(false);
                        }}
                      >
                        Sede
                        {selectedLoja?.id === null && (
                          <CheckIcon className="ml-auto h-4 w-4" />
                        )}
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </SkeletContainer>
          <Fr.error error={errors.lojaId?.message} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description" isReq={false}>Descrição</Label>
          <SkeletContainer isLoading={isPending}>
            <Textarea
              placeholder="Digite a identificação da loja"
              {...register("description")}
              disabled={isPending}
            />
            <Fr.error error={errors.description?.message} />
          </SkeletContainer>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="localidade" isReq={false}>Localidade</Label>
          <SkeletContainer isLoading={isPending}>
            <Textarea
              placeholder="Digite o endereço do armazem"
              className="min-h-[100px]"
              disabled={isPending}
              {...register("localidade")}
            />
            <Fr.error error={errors.localidade?.message} />
          </SkeletContainer>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2 items-center">
            <Label htmlFor="bloqueioEntrada" isReq={false}>Bloqueio Entrada</Label>
            <Switch
              className="flex"
              disabled={isPending || isSubmitting}
              checked={bloqueioEntrada} // Atualizar para usar o valor do watch
              onCheckedChange={(checked: boolean) => {
                setValue("bloqueioEntrada", checked);
              }}
            />
          </div>
          <div className="space-y-2 items-center">
            <Label htmlFor="bloqueioSaida" isReq={false}>Bloqueio Saída</Label>
            <Switch
              className="flex"
              disabled={isPending || isSubmitting}
              checked={bloqueioSaida} // Atualizar para usar o valor do watch
              onCheckedChange={(checked: boolean) => {
                setValue("bloqueioSaida", checked);
              }}
            />
          </div>
        </div>
        <DialogFooter className="justify-between">
          <DialogClose asChild>
            <Button variant="outline" type="reset" className="mr-auto">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isSubmitting} onClick={() => console.log(errors)}>
            {isSubmitting ? "Salvando..." : "Salvar"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
