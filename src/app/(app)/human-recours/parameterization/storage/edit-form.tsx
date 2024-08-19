"use client";

import { Check, ChevronsUpDown } from "lucide-react";
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
import { PlusIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm, useWatch } from "react-hook-form"; // Importar useWatch
import { toast } from "sonner";
import { z } from "zod";
import { createArmazem } from "@/http/armazem";
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

const formSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  lojaId: z.number().nullable(),
  description: z.string().nullable().optional(),
  localidade: z.string().nullable().optional(),
  bloqueioEntrada: z.boolean(),
  bloqueioSaida: z.boolean(),
});

export type createLojaData = z.infer<typeof formSchema>;
interface lojas{
    value: number;
    label: string;
  }
interface Props {
  id:number,
  children: ReactNode
}


export default function EditForm({
  id,
  children,
}: Props) {
  const [opn, setOpn] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [selectedLoja, setSelectedLoja] = useState<{ id: number | null; name: string } | null>(null);
  const [lojas, setLojas]= useState<lojas | null>(null);

  useEffect(()=>{
      async function res () {
        const res=await getLoja()
        console.log(res,"res")
        setLojas(res.map((loja) => ({
         value: loja.id,
         label: loja.name,
        })))
      }
  },[])
console.log(lojas)
  const {
    watch, 
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<createLojaData>({
    resolver: zodResolver(formSchema),
    defaultValues:{
        bloqueioEntrada: false,
  bloqueioSaida: false,
    }
  });

  const bloqueioEntrada = watch("bloqueioEntrada"); // Obter valor atual do campo
  const bloqueioSaida = watch("bloqueioSaida"); // Obter valor atual do campo

  async function send(data: createLojaData) {
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
        {children}
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
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
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
                      {/*lojas.map((loja) => (
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
                      ))*/}
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
            {errors.lojaId && (
              <p className="text-red-500">{errors.lojaId.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description" isReq>Descrição</Label>
            <Textarea
              placeholder="Digite a identificação da loja"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="localidade" isReq>Localidade</Label>
            <Textarea
              placeholder="Digite o endereço da loja"
              className="min-h-[100px]"
              {...register("localidade")}
            />
            {errors.localidade && (
              <p className="text-red-500">{errors.localidade.message}</p>
            )}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2 items-center">
              <Label htmlFor="bloqueioEntrada">Bloqueio Entrada</Label>
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
              <Label htmlFor="bloqueioSaida">Bloqueio Saída</Label>
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
