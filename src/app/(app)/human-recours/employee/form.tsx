"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDashed } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createCareer } from "@/http/career"
import { toast } from "sonner";

const formSchema = z.object({
  nome_carreira: z.string(),
  regime: z.enum(['geral', 'especial'], { message: 'O Regime somente deve ser geral ou especial!', required_error: "O regime é obrigatório" })
});

type FormData = z.infer<typeof formSchema>;

export default function Form() {
  const {
    reset,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues:{
        regime:'geral'
    }
  });

  async function send(data: FormData) {
    const result = await createCareer(data);
    if (result?.error) {
      toast.error(result.error);
    }else{
      toast.success('Carreira criada com sucesso');
    }
    reset();
    setValue('regime',data.regime)
  }


  return (
    <div className="relative flex-col items-start gap-8 hidden xl:flex">
      <form className="grid w-full items-start gap-6" onSubmit={handleSubmit(send)}>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Nova Carreira
          </legend>
          <div className="grid gap-3">
            <Label htmlFor="nome_banco">Nome</Label>
            <Input placeholder="Informe o nome do banco" required {...register('nome_carreira')} />
            {errors.nome_carreira && (
              <p className="text-sm font-medium text-red-500 dark:text-red-400">
                {errors.nome_carreira.message}
              </p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="regime">Regime</Label>
            <Select defaultValue='geral' onValueChange={(val: 'geral' | 'especial') => setValue('regime', val)}>
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
