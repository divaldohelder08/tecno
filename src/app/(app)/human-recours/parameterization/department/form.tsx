"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createDepartamento } from "@/http/departamento";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { CircleDashed } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";

const formSchema = z.object({
  nome_departamento: z.string(),
  Id_funcionario_chefe: z.number(),
  Id_funcionario_supervisor: z.number(),
});

type FormData = z.infer<typeof formSchema>;

interface Props {
  funcio: { id: number; name: string }[];
}

export default function Form({ funcio }: Props) {
  const [opn, setOpn] = useState<boolean>(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const Id_funcionario_chefe = watch("Id_funcionario_chefe");
  const Id_funcionario_supervisor = watch("Id_funcionario_supervisor");

  const chefeName = funcio.find((e) => e.id === Id_funcionario_chefe)?.name || "Selecione o chefe";
  const supervisorName = funcio.find((e) => e.id === Id_funcionario_supervisor)?.name || "Selecione o supervisor";

  async function send(data: FormData) {
     const result = await createDepartamento(data);
     if (result?.error) {
      toast.error(result.error);
     }else{
      toast.success("Departamento criado com sucesso");
     }
     setOpn(false)
     reset()
  }

  return (
    <Dialog open={opn} onOpenChange={setOpn}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2" />
          Novo Departamento
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Novo Departamento</DialogTitle>
          <DialogDescription>
            Preencha o formulário para criar um novo departamento.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(send)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome_departamento">Nome do Departamento</Label>
              <Input
                id="nome_departamento"
                placeholder="Digite o nome do departamento"
                {...register("nome_departamento")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Id_funcionario_chefe">Chefe do Departamento</Label>
              <Select
                onValueChange={(val) => setValue("Id_funcionario_chefe", Number(val))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder={chefeName} />
                </SelectTrigger>
                <SelectContent>
                  {funcio.map((e) => (
                    <SelectItem key={e.id} value={e.id.toString()}>
                      {e.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="Id_funcionario_supervisor">Supervisor do Departamento</Label>
              <Select
                onValueChange={(val) => setValue("Id_funcionario_supervisor", Number(val))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder={supervisorName} />
                </SelectTrigger>
                <SelectContent>
                  {funcio.map((e) => (
                    <SelectItem key={e.id} value={e.id.toString()}>
                      {e.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="pt-6">
            <Button    className="w-full gap-1.5 flex"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircleDashed className="motion-reduce:hidden animate-spin" size="20" />
                ) : 'Salvar'}
            </Button>
            <Button variant="outline">Cancelar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
