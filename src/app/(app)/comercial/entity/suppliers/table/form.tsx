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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { transformToCliente } from "@/http/fornecedores";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
export type formData = z.infer<typeof schema>
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
            <Fr.error error={errors.tipoDesconto?.message} />
          </div>

          <div className="grid gap-2 items-baseline">
            <Label htmlFor="valorDesconto">Valor do Desconto</Label>
            <Input id="valorDesconto" type="number" {...register('valorDesconto')} placeholder="Digite o valor do desconto" />
            <Fr.error error={errors.valorDesconto?.message} />
          </div>

          <div className="grid gap-2 items-baseline">
            <Label htmlFor="percentagemDesconto">Percentagem de Desconto</Label>
            <Input id="percentagemDesconto" type="number" {...register('percentagemDesconto')} placeholder="Digite a percentagem de desconto" />
            <Fr.error error={errors.percentagemDesconto?.message} />
          </div>

          <div className="grid gap-2 items-baseline">
            <Label htmlFor="saldo">Saldo</Label>
            <Input id="saldo" type="number" {...register('saldo')} placeholder="Digite o saldo" />
            <Fr.error error={errors.saldo?.message} />
          </div>

          <div className="grid gap-2 items-baseline">
            <Label htmlFor="limiteSaldo">Limite de Saldo</Label>
            <Input id="limiteSaldo" type="number" {...register('limiteSaldo')} placeholder="Digite o limite de saldo" />
            <Fr.error error={errors.limiteSaldo?.message} />
          </div>

          <div className="grid gap-2 items-baseline">
            <Label htmlFor="limiteCredito">Limite de Crédito</Label>
            <Input id="limiteCredito" type="number" {...register('limiteCredito')} placeholder="Digite o limite de crédito" />
            <Fr.error error={errors.limiteCredito?.message} />
          </div>

          <div className="grid gap-2 items-baseline">
            <Label htmlFor="efectuaRetencao">Efetua Retenção</Label>
            <Switch id="efectuaRetencao" {...register('efectuaRetencao')} defaultChecked={true} />
            <Fr.error error={errors.efectuaRetencao?.message} />
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
