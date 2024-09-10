"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDashed } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createSubCategoria } from "@/http/sub-category"
import { toast } from "sonner";
import { Form as Fr } from "@/components/ui/form-components";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string(),
  categoryId: z.number().min(1),
});

type FormData = z.infer<typeof formSchema>;

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
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const categorias = before.map((cate) => ({
    value: cate.id,
    label: cate.name,
  }))

  async function send(data: FormData) {
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
            <Label htmlFor="categoryId">Categoria</Label>
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
                    <CommandEmpty>Categorianão encontrada.</CommandEmpty>
                    <CommandGroup>
                      {categorias.map((cate) => (
                        <CommandItem
                          key={cate.value}
                          value={cate.value.toString()}
                          onSelect={(currentValue) => {
                            if (Number(currentValue) === value) {
                              setValue(null)
                              set('categoryId', undefined)
                            } else {
                              setValue(Number(currentValue))
                              set('categoryId', Number(currentValue))
                            }
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
            <Fr.error error={errors.categoryId?.message} />
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


export function DrawerForm() {
  const [opn, setOpn] = useState<boolean>(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function send({ name }: FormData) {
    const result = await createUnidade(name);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Unidade criada com sucesso');
    }
    reset();
  }



  return (
    <Dialog open={opn} onOpenChange={setOpn}>
      <DialogTrigger>
        <Button size="sm" className="inline-flex xl:hidden">Nova carreira</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova unidade</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <form className="grid w-full items-start gap-6" onSubmit={handleSubmit(send)}>
            <div className="grid gap-3">
              <Label htmlFor="name">Nome</Label>
              <Input placeholder="Informe o nome da unidade" required {...register('name')} />
              <Fr.error error={errors.name?.message} />
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
