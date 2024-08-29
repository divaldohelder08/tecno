"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, ReactNode } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createService } from "@/http/article";
import { useQuery } from "@tanstack/react-query";
import { getFornecedores } from "@/http/fornecedores";
import { toast } from "sonner";
import Barcode from "react-barcode";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import SkeletonWrapper from "@/components/ui/skeleton-wrapper";
import { CheckIcon, CaretSortIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  id: z.number(),
  fornecedorId: z.number().optional(),
  codigo_barra: z.string().min(1, "Código de barras é obrigatório"),
});

export type formData = z.infer<typeof formSchema>;

interface Props {
  id: number;
  name: string;
  children: ReactNode;
}

export function AddBarCodeForm({ children }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedFornecedor, setSelectedFornecedor] = useState<number | null>(null);
  const [barcodeValue, setBarcodeValue] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codigo_barra: "",
    },
  });

  const { data: fornecedoresData, isFetching, error } = useQuery({
    queryKey: ['fornecedores'],
    queryFn: async () => await getFornecedores(),
  });

  async function send(data: formData) {
    const result = await createService(data);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Código de barras adicionado com sucesso");
    }
    reset();
    setOpen(false);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Código de Barras</DialogTitle>
          <DialogDescription>
            Insira o código de barras e selecione o fornecedor associado.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(send)}>
          <div className="flex flex-col space-y-4">
            <Label htmlFor="codigo_barra">Código de Barras</Label>
            <Input
              id="codigo_barra"
              {...register("codigo_barra")}
              onChange={(e) => setBarcodeValue(e.target.value)}
              placeholder="Insira o código de barras"
              maxLength={30}
            />
            {errors.codigo_barra && (
              <p className="text-red-500">{errors.codigo_barra.message}</p>
            )}

            <Label htmlFor="fornecedor">Fornecedor</Label>
            <SkeletonWrapper isLoading={isFetching}>
           
            </SkeletonWrapper>

            <div className="flex items-center justify-center max-w-[25rem] w-full bg-emerald-50">
              <Barcode value={barcodeValue} width={3} />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adicionando..." : "Adicionar"}
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Fechar
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
