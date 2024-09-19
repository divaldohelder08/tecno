"use client"
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form as Fr } from "@/components/ui/form-components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getCategoria } from "@/http/categorias";
import { createSubCategoria, getSubCategoriaById, updateSubCategoria } from "@/http/sub-categoria";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CircleDashed, Loader2, PlusCircle } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  categoriaId: z.number().min(1),
});

export type createCategoriaData = z.infer<typeof formSchema>;

interface cate {
  id: number
  name: string
}
interface props {
  categorias: cate[]
}
export default function Form({ categorias: before }: props) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<number | null>(null)
  const {
    reset,
    register,
    handleSubmit,
    setValue: set,
    formState: { errors, isSubmitting }
  } = useForm<createCategoriaData>({
    resolver: zodResolver(formSchema),
  });

  const categorias = before.map((cate) => ({
    value: cate.id,
    label: cate.name,
  }))

  async function send(data: createCategoriaData) {
    const result = await createSubCategoria(data);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Sub-categoria criada com sucesso');
    }
    setValue(null)
    reset()
  }


  return (
    <div className="relative flex-col items-start gap-8 hidden xl:flex">
      <form className="grid w-full items-start gap-2" onSubmit={handleSubmit(send)}>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Nova sub-categoria
          </legend>
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input placeholder="Informe o nome da sub-categoria" required {...register('name')} />
            <Fr.error error={errors.name?.message} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="categoriaId">Categoria</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="default"
                  role="combobox"
                  aria-expanded={open}
                  className="flex w-full justify-between"
                >
                  {value
                    ? categorias.find((cate) => cate.value === value)?.label
                    : "Selecione a categoria..."}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-[240px]">
                <Command>
                  <CommandInput placeholder="Pesquise a categoria..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>Categoria não encontrada.</CommandEmpty>
                    <CommandGroup>
                      {categorias.map((cate) => (
                        <CommandItem
                          key={cate.value}
                          value={cate.value.toString()}
                          onSelect={(currentValue) => {
                            setValue(Number(currentValue))
                            set('categoriaId', Number(currentValue))
                            setOpen(false)
                          }}
                        >
                          {cate.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              value === cate.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <Fr.error error={errors.categoriaId?.message} />
          </div>
          <Button
            size="sm"
            type="submit"
            className="w-full gap-1.5 flex"
            disabled={isSubmitting}
            onClick={() => console.log(errors)}
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



interface editProps {
  id: number
  name: string
  opn: boolean
  setOpn: Dispatch<SetStateAction<boolean>>
}


export function EditForm({ id, name, opn, setOpn }: editProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number | null>(null)

  const {
    reset,
    register,
    handleSubmit,
    setValue: set,
    formState: { errors, isSubmitting }
  } = useForm<createCategoriaData>({
    resolver: zodResolver(formSchema),
  });

  const categorias = useQuery({
    queryKey: ['categorias'],
    queryFn: async () => {
      const res = await getCategoria()
      return res.map((f) => ({
        value: f.id,
        label: f.name,
      }));
    },
  });


  const { mutateAsync: getData, isPending } = useMutation({
    mutationFn: async () => await getSubCategoriaById(id),
    onSuccess: ({ id, name, categoriaId }) => {
      set("name", name)
      set("categoriaId", categoriaId)
      setValue(categoriaId)
    },
    onError: (error: string) => toast.error(error)
  })


  async function send({ categoriaId, name }: createCategoriaData) {
    const result = await updateSubCategoria({ categoriaId, name, id });
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Sub-categoria atualizada com sucesso');
    }
    setOpn(false);
    reset();
  }

  useEffect(() => {
    opn && getData()
  }, [getData, opn])

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="gap-1 flex">Editar sub-categoria: {' '}
          {
            isPending
              ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              : name
          }
        </DialogTitle>
      </DialogHeader>
      <form className="grid w-full items-start gap-6" onSubmit={handleSubmit(send)}>
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input placeholder="Informe o nome da sub-categoria" required {...register('name')} />
          <Fr.error error={errors.name?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="categoriaId">Categoria</Label>
          <Popover open={open} onOpenChange={setOpen} modal>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="default"
                role="combobox"
                aria-expanded={open}
                className="flex w-full justify-between"
              >
                {value
                  ? categorias.data?.find((cate) => cate.value === value)?.label
                  : "Selecione a categoria..."}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[240px]">
              <Command>
                <CommandInput placeholder="Pesquise a categoria..." className="h-9" />
                <CommandList>
                  <CommandEmpty>Categoria não encontrada.</CommandEmpty>
                  <CommandGroup>
                    {categorias.data?.map((cate) => (
                      <CommandItem
                        key={cate.value}
                        value={cate.value.toString()}
                        onSelect={(currentValue) => {
                          setValue(Number(currentValue))
                          set('categoriaId', Number(currentValue))
                          setOpen(false)
                        }}
                      >
                        {cate.label}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            value === cate.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Fr.error error={errors.categoriaId?.message} />
        </div>
        <DialogFooter>
          <Button
            size="sm"
            type="submit"
            className="w-full gap-1.5 flex"
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircleDashed className="animate-spin" size="20" /> : 'Salvar'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}





export function DrawerForm({ categorias: before }: props) {
  const [open, setOpen] = useState(false)
  const [opn, setOpn] = useState(false)

  const [value, setValue] = useState<number | null>(null)
  const {
    reset,
    register,
    handleSubmit,
    setValue: set,
    formState: { errors, isSubmitting }
  } = useForm<createCategoriaData>({
    resolver: zodResolver(formSchema),
  });

  const categorias = before.map((cate) => ({
    value: cate.id,
    label: cate.name,
  }))

  async function send(data: createCategoriaData) {
    const result = await createSubCategoria(data);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Sub-categoria criada com sucesso');
    }
    setValue(null)
    reset()
  }





  return (
    <Dialog open={opn} onOpenChange={setOpn}>
      <DialogTrigger>
        <Button size="sm" className="inline-flex xl:hidden gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="hidden sm:inline"> Nova sub-categoria</span></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova sub-categoria
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <form className="grid w-full items-start gap-6" onSubmit={handleSubmit(send)}>
            <div className="grid gap-3">
              <Label htmlFor="name">Nome</Label>
              <Input placeholder="Informe o nome da unidade" required {...register('name')} />
              <Fr.error error={errors.name?.message} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="categoriaId">Categoria</Label>
              <Popover open={open} onOpenChange={setOpen} modal>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="default"
                    role="combobox"
                    aria-expanded={open}
                    className="flex w-full justify-between"
                  >
                    {value
                      ? categorias.find((cate) => cate.value === value)?.label
                      : "Selecione a categoria..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[240px]">
                  <Command>
                    <CommandInput placeholder="Pesquise a categoria..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>Categoria não encontrada.</CommandEmpty>
                      <CommandGroup>
                        {categorias.map((cate) => (
                          <CommandItem
                            key={cate.value}
                            value={cate.value.toString()}
                            onSelect={(currentValue) => {
                              setValue(Number(currentValue))
                              set('categoriaId', Number(currentValue))
                              setOpen(false)
                            }}
                          >
                            {cate.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                value === cate.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Fr.error error={errors.categoriaId?.message} />
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

}