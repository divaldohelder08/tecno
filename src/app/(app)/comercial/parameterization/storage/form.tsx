"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Form as Fr } from "@/components/ui/form-components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { createArmazem } from "@/http/armazem";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon } from "@radix-ui/react-icons";
import { ChevronsUpDown, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form"; // Importar useWatch
import { toast } from "sonner";
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

const formSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  lojaId: z.number().nullable(),
  description: z.string().nullable().optional(),
  localidade: z.string().nullable().optional(),
  bloqueioEntrada: z.boolean(),
  bloqueioSaida: z.boolean(),
});

export type createArmazemData = z.infer<typeof formSchema>;

interface Props {
  lojas: {
    id: number;
    name: string;
  }[];
}

export default function Form({ lojas: before }: Props) {
  const [opn, setOpn] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [selectedLoja, setSelectedLoja] = useState<{ id: number | null; name: string } | null>(null);

  const lojas = before.map((loja) => ({
    value: loja.id,
    label: loja.name,
  }));

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    watch, // Adicionar watch
    formState: { errors, isSubmitting },
  } = useForm<createArmazemData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bloqueioEntrada: false,
      bloqueioSaida: false,
    }
  });

  const bloqueioEntrada = watch("bloqueioEntrada"); // Obter valor atual do campo
  const bloqueioSaida = watch("bloqueioSaida"); // Obter valor atual do campo

  async function send(data: createArmazemData) {
    const formattedData = {
      ...data,
      description: data.description?.trim() === "" ? null : data.description,
      localidade: data.localidade?.trim() === "" ? null : data.localidade,
    };
    console.log(formattedData)
    const result = await createArmazem(formattedData);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Armazem criada com sucesso!");
      reset();
      setSelectedLoja(null);
      setOpn(false);
    }
  }

  return (
    <Dialog open={opn} onOpenChange={setOpn}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Novo armazem
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Armazem</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para adicionar uma nova loja.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4" onSubmit={handleSubmit(send)}>
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              placeholder="Digite o nome da loja"
              {...register("name")}
            />
            <Fr.error error={errors.name?.message} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lojaId">Loja</Label>
            <Popover modal={true} open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  aria-expanded={open}
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
                      {lojas.map((loja) => (
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
            <Fr.error error={errors.lojaId?.message} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description" isReq={false}>Descrição</Label>
            <Textarea
              placeholder="Digite a identificação da loja"
              {...register("description")}
            />
            <Fr.error error={errors.description?.message} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="localidade" isReq={false}>Localidade</Label>
            <Textarea
              placeholder="Digite o endereço da loja"
              className="min-h-[100px]"
              {...register("localidade")}
            />
            <Fr.error error={errors.localidade?.message} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2 items-center">
              <Label htmlFor="bloqueioEntrada" isReq={false}>Bloqueio Entrada</Label>
              <Switch
                className="flex"
                checked={bloqueioEntrada} // Atualizar para usar o valor do watch
                onCheckedChange={(checked: boolean) => {
                  setValue("bloqueioEntrada", checked);
                }}
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2 items-center">
              <Label htmlFor="bloqueioSaida" isReq={false}>Bloqueio Saída</Label>
              <Switch
                className="flex"
                checked={bloqueioSaida} // Atualizar para usar o valor do watch
                onCheckedChange={(checked: boolean) => {
                  setValue("bloqueioSaida", checked);
                }}
                disabled={isSubmitting}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="mr-auto" onClick={() => setOpn(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting} onClick={() => console.log(errors)}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
