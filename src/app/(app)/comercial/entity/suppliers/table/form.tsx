"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { transformToCliente } from "@/http/fornecedores";
import { useState } from "react";

interface ComponentProps {
  id: number;
  entidadeId: number;
}

interface FormData {
  tipoDesconto: "COMERCIAL" | "FINANCEIRO" | "DIVERSO" | "NENHUM";
  valorDesconto: number;
  percentagemDesconto: number;
  saldo: number;
  limiteSaldo: number;
  limiteCredito: number;
  efectuaRetencao: boolean;
}

// Definindo o esquema com coerce para garantir conversão de tipo
const schema = z.object({
  tipoDesconto: z.enum(["COMERCIAL", "FINANCEIRO", "DIVERSO", "NENHUM"]),
  valorDesconto: z.coerce.number().nonnegative(),
  percentagemDesconto: z.coerce.number().min(0).max(100),
  saldo: z.coerce.number().nonnegative(),
  limiteSaldo: z.coerce.number().nonnegative(),
  limiteCredito: z.coerce.number().nonnegative(),
  efectuaRetencao: z.coerce.boolean(),
});

export default function Transform({ entidadeId, id }: ComponentProps) {
  const [opn, setOpn] = useState<boolean>(false);
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      tipoDesconto: "NENHUM",
      valorDesconto: 0,
      saldo: 0,
      limiteSaldo: 0,
      limiteCredito: 0,
    },
  });

  const send: SubmitHandler<FormData> = async (data) => {
    console.log({ entidadeId, id, ...data }); // Verifique os dados antes de enviar
    const result = await transformToCliente({ entidadeId, id, ...data });
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Fornecedor transformado com sucesso');
      setOpn(false);
    }
  };

  return (
    <Dialog open={opn} onOpenChange={setOpn}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Upload"
        >
          <Upload className="h-4 w-4" />
          <span className="sr-only">Converter</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Transformar Fornecedor em Cliente</DialogTitle>
          <DialogDescription>Preencha os campos abaixo para transformar um fornecedor em cliente.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(send)} className="grid grid-cols-2 gap-4 items-baseline">
          <div className="grid gap-2 items-baseline">
            <Label htmlFor="tipoDesconto">Tipo de Desconto</Label>
            <Select
              defaultValue="NENHUM" // Define um valor padrão
              onValueChange={(val) => setValue('tipoDesconto', val as "COMERCIAL" | "FINANCEIRO" | "DIVERSO" | "NENHUM")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de desconto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="COMERCIAL">Comercial</SelectItem>
                <SelectItem value="FINANCEIRO">Financeiro</SelectItem>
                <SelectItem value="DIVERSO">Diverso</SelectItem>
                <SelectItem value="NENHUM">Nenhum</SelectItem>
              </SelectContent>
            </Select>
            {errors.tipoDesconto && <p className="text-red-600">{errors.tipoDesconto.message}</p>}
          </div>

          <div className="grid gap-2 items-baseline">
            <Label htmlFor="valorDesconto">Valor do Desconto</Label>
            <Input id="valorDesconto" type="number" {...register('valorDesconto')} placeholder="Digite o valor do desconto" />
            {errors.valorDesconto && <p className="text-red-600">{errors.valorDesconto.message}</p>}
          </div>

          <div className="grid gap-2 items-baseline">
            <Label htmlFor="percentagemDesconto">Percentagem de Desconto</Label>
            <Input id="percentagemDesconto" type="number" {...register('percentagemDesconto')} placeholder="Digite a percentagem de desconto" />
            {errors.percentagemDesconto && <p className="text-red-600">{errors.percentagemDesconto.message}</p>}
          </div>

          <div className="grid gap-2 items-baseline">
            <Label htmlFor="saldo">Saldo</Label>
            <Input id="saldo" type="number" {...register('saldo')} placeholder="Digite o saldo" />
            {errors.saldo && <p className="text-red-600">{errors.saldo.message}</p>}
          </div>

          <div className="grid gap-2 items-baseline">
            <Label htmlFor="limiteSaldo">Limite de Saldo</Label>
            <Input id="limiteSaldo" type="number" {...register('limiteSaldo')} placeholder="Digite o limite de saldo" />
            {errors.limiteSaldo && <p className="text-red-600">{errors.limiteSaldo.message}</p>}
          </div>

          <div className="grid gap-2 items-baseline">
            <Label htmlFor="limiteCredito">Limite de Crédito</Label>
            <Input id="limiteCredito" type="number" {...register('limiteCredito')} placeholder="Digite o limite de crédito" />
            {errors.limiteCredito && <p className="text-red-600">{errors.limiteCredito.message}</p>}
          </div>

          <div className="grid gap-2 items-baseline">
            <Label htmlFor="efectuaRetencao">Efetua Retenção</Label>
            <Switch id="efectuaRetencao" {...register('efectuaRetencao')} defaultChecked={true} />
            {errors.efectuaRetencao && <p className="text-red-600">{errors.efectuaRetencao.message}</p>}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
