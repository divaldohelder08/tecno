"use client"
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDashed , PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { createCareer } from "@/http/career"
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

const formSchema = z.object({
  nome_carreira: z.string(),
  regime: z.enum(['geral', 'especial'])
});
//, 'O Regime somente deve ser geral ou especial!'
type FormData = z.infer<typeof formSchema>;

interface props<TData> {
  table: Table<TData>
}

export function DataTableHeader<TData>({
  table,
}: props<TData>) {

  return (
    <div className="flex items-end py-4">
      <h1 className="text-xl font-semibold md:text-2xl">Funcionarios</h1>
      <div className="flex items-center gap-2 ml-auto">
        <Input
          placeholder="Filtrar carreira pelo nome"
          value={(table.getColumn("nome_carreira")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nome_carreira")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DrawerForm />
      </div>
    </div>
  )
}



function DrawerForm() {
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
    const result = await createCareer(data);
    if (result?.error) {
      toast.error(result.error);
    }
    reset();
  }


   return (
    <Drawer open={opn} onOpenChange={setOpn}>
          <DrawerTrigger>
          <Button className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Nova carreira
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="min-w-[400px] mx-auto">
          <DrawerHeader>
            <DrawerTitle>Nova carreira</DrawerTitle>
          </DrawerHeader>
          <DrawerFooter>
            <form className="grid w-full items-start gap-6" onSubmit={handleSubmit(send)}>
                <div className="grid gap-3">
                    <Label htmlFor="nome_banco">Nome</Label>
                    <Input placeholder="Informe o nome da carreira" required {...register('nome_carreira')} />
                    {errors.nome_carreira && (
                      <p className="text-sm font-medium text-red-500 dark:text-red-400">
                        {errors.nome_carreira.message}
                      </p>
                    )}
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="regime">Regime</Label>
                    <Select onValueChange={(val: "geral" | "especial") => setValue('regime',val)}>
                      <SelectTrigger
                        className=""
                        aria-label="Select a value"
                      >
                        <SelectValue placeholder="Informe o regime" />
                      </SelectTrigger>
                      <SelectContent className="" >
                        <SelectItem value="geral" className="rounded-lg">
                          GERAL
                        </SelectItem>
                        <SelectItem value="especial" className="rounded-lg">
                          ESPECIAL
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.regime && (
                      <p className="text-sm font-medium text-red-500 dark:text-red-400">
                        {errors.regime.message}
                      </p>
                    )}
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


