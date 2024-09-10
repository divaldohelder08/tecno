"use client";

import { ChevronsUpDown, Loader2 } from "lucide-react";
import { useState, ReactNode, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getLoja } from "@/http/loja"
import { getArmazem } from "@/http/armazem"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Form as Fr } from "@/components/ui/form-components";
import SkeletContainer from "@/components/skelet-container";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  lojaId: z.number().nullable(),
  description: z.string().nullable().optional(),
  localidade: z.string().nullable().optional(),
  bloqueioEntrada: z.boolean(),
  bloqueioSaida: z.boolean(),
});

export type createLojaData = z.infer<typeof formSchema>;
interface lojas {
  value: number;
  label: string;
}
interface Props {
  id: number,
  children: ReactNode
  name: string;
}

export default function EditForm({
  id,
  children,
  name
}: Props) {
  const [opn, setOpn] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [selectedLoja, setSelectedLoja] = useState<{ id: number | null; name: string } | null>(null);

  const { data: lojas, isFetching: isLoadingLoja, isLoading, isPending: al } = useQuery<lojas[]>({
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
  } = useForm<createLojaData>({
    resolver: zodResolver(formSchema),
  });

  //return
  const { mutateAsync: getData, data: armazem, isPending } = useMutation({
    mutationFn: async () => { return await getArmazem(id) },
    onSuccess: ({ name, lojaId, description, localidade, bloqueioEntrada, bloqueioSaida }) => {
      setValue("name", name)
      setValue("description", description)
      setValue("localidade", localidade)
      setValue("bloqueioEntrada", bloqueioEntrada)
      setValue("bloqueioEntrada", bloqueioEntrada)
      setValue("lojaId", lojaId)
       /* {lojaId !== null
            ? lojas.find((loja) => loja.value === lojaId)?.label
            : setValue("lojaId", lojaId)
        }*/
    },
    onError: (error: string) => toast.error(error)
  })


  const bloqueioEntrada = watch("bloqueioEntrada");
  const bloqueioSaida = watch("bloqueioSaida");

  async function send(data: createLojaData) {
    // const formattedData = {
    //   ...data,
    //   description: data.description?.trim() === "" ? null : data.description,
    //   localidade: data.localidade?.trim() === "" ? null : data.localidade,
    // };
    // console.log(formattedData)
    // const result = await createArmazem(formattedData);
    // if (result?.error) {
    //   toast.error(result.error);
    // } else {
    //   toast.success("Armazem criada com sucesso!");
    //   reset();
    //   setSelectedLoja(null);
    //   setOpn(false);
    // }
  }


  return (
    <Dialog open={opn} onOpenChange={(e) => {
      e && getData()
      setOpn(e)
    }}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
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
            <Label htmlFor="description" isReq>Descrição</Label>
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
            <Label htmlFor="localidade" isReq>Localidade</Label>
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
              <Label htmlFor="bloqueioEntrada">Bloqueio Entrada</Label>
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
              <Label htmlFor="bloqueioSaida">Bloqueio Saída</Label>
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

    </Dialog>
  );
}
