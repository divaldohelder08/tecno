"use client"
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form as Fr } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { updateEmpresaConfig } from "@/http/empresa";
import { useEmpresaAreas } from "@/store/empresa";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDashed } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const empresaSchema = z.object({
  regimeIva: z.enum(['NAO_SUJEITO', 'SIMPLIFICADO', 'GERAL']),
  indicadorFactura: z.string(),
  comercioGeral: z.boolean(),
  restaurante: z.boolean(),
  hotelaria: z.boolean(),
  oficina: z.boolean(),
  valorInicialRetencaoFonte: z.number(),
  cobrarRetencaoFonteServico: z.boolean(),
  percentagemRetencaoFonte: z.number(),
})

export type empresaDataConfig = z.infer<typeof empresaSchema>

interface Props {
  data: empresaDataConfig | null
}

export default function Form({ data }: Props) {
  const { setAreas } = useEmpresaAreas();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<empresaDataConfig>({
    resolver: zodResolver(empresaSchema),
    defaultValues: {
      regimeIva: data?.regimeIva,
      indicadorFactura: data?.indicadorFactura ?? '',
      valorInicialRetencaoFonte: data?.valorInicialRetencaoFonte ?? 0,
      cobrarRetencaoFonteServico: data?.cobrarRetencaoFonteServico ?? false,
      percentagemRetencaoFonte: data?.percentagemRetencaoFonte ?? 0,
      comercioGeral: data?.comercioGeral,
      restaurante: data?.restaurante,
      hotelaria: data?.hotelaria,
      oficina: data?.oficina,
    }
  })

  async function upsert(val: empresaDataConfig) {
    const result = await updateEmpresaConfig(val);
    if (result?.error) {
      toast.error(result.error);
    } else {
      setAreas({
        comercioGeral: val.comercioGeral,
        restaurante: val.restaurante,
        hotelaria: val.hotelaria,
        oficina: val.oficina,
      });
      toast.success('Empresa atualizada com sucesso');
    }
  }
  return (
    <form onSubmit={handleSubmit(upsert)}>
      <div className="grid  grid-cols-2  w-full gap-2">
        <div className="space-y-2">
          <Label htmlFor="regimeIva" isReq={true}>Regime IVA</Label>
          <Select
            defaultValue={data?.regimeIva}
            onValueChange={(val: 'NAO_SUJEITO' | 'SIMPLIFICADO' | 'GERAL') => setValue('regimeIva', val)}
          >
            <SelectTrigger className="" aria-label="Select a value">
              <SelectValue placeholder="Informe o regime IVA da empresa" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectItem value="NAO_SUJEITO" className="rounded-lg">Não Sujeito</SelectItem>
              <SelectItem value="SIMPLIFICADO" className="rounded-lg">SIMPLIFICADO</SelectItem>
              <SelectItem value="GERAL" className="rounded-lg">GERAL</SelectItem>
            </SelectContent>
          </Select>
          <Fr.error error={errors.regimeIva?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="indicadorFactura" isReq={true}>Indicador de fatura</Label>
          <Input {...register('indicadorFactura')} id="cae" placeholder="Digite o indicador de fatura." />
          <Fr.error error={errors.indicadorFactura?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="valorInicialRetencaoFonte" isReq={true}>valorInicialRetencaoFonte</Label>
          <Input {...register('valorInicialRetencaoFonte')} id="valorInicialRetencaoFonte" placeholder="Digite o valorInicialRetencaoFonte." />
          <Fr.error error={errors.valorInicialRetencaoFonte?.message} />
        </div>


        <div className="flex flex-col gap-4">
          <Label htmlFor="percentagemRetencaoFonte" isReq={true}>percentagemRetencaoFonte</Label>
          <Switch {...register('percentagemRetencaoFonte')} />
          <Fr.error error={errors.percentagemRetencaoFonte?.message} />

        </div>
        <div className="space-y-2">
          <Label>Áreas</Label>
          <div className="grid-cols-3 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                disabled={isSubmitting}
                onCheckedChange={(checked) => setValue("comercioGeral", Boolean(checked))}
                defaultChecked={data?.comercioGeral}
                {...register("comercioGeral")}
              />
              <Label className="sr-only">
                Comércio Geral
              </Label>
              <span className="text-sm">Comércio Geral</span>
              <Fr.error error={errors.comercioGeral?.message} />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                disabled={isSubmitting}
                onCheckedChange={(checked) => setValue("restaurante", Boolean(checked))}
                defaultChecked={data?.restaurante}
                {...register("restaurante")}
              />
              <Label className="sr-only">
                Restaurante
              </Label>
              <span className="text-sm">Restaurante</span>
              <Fr.error error={errors.restaurante?.message} />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                disabled={isSubmitting}
                onCheckedChange={(checked) => setValue("hotelaria", Boolean(checked))}
                defaultChecked={data?.hotelaria}
                {...register("hotelaria")}
              />
              <Label className="sr-only">
                Hotelaria
              </Label>
              <span className="text-sm">Hotelaria</span>
              <Fr.error error={errors.hotelaria?.message} />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                disabled={isSubmitting}
                onCheckedChange={(checked) => setValue("oficina", Boolean(checked))}
                defaultChecked={data?.oficina}
                {...register("oficina")}
              />
              <Label className="sr-only">
                Oficina
              </Label>
              <span className="text-sm">Oficina</span>
              <Fr.error error={errors.oficina?.message} />
            </div>
          </div>
        </div>

      </div>
      <CardFooter className="flex justify-end pt-4">
        <Button type="submit" disabled={isSubmitting || data === null} >
          {isSubmitting && <CircleDashed className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? "Aguarde" : "Salvar"}
        </Button>
      </CardFooter>
    </form>
  )
}