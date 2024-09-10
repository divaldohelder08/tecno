"use client"
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea"
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
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { CircleDashed, Sparkles, Eye, EyeOff, FilePenIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PlusIcon } from "@radix-ui/react-icons"
import { createLoja  } from "@/http/loja"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const formSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  identificacao: z.string().nonempty("Identificação é obrigatória"),
  address: z.string().nonempty("Endereço é obrigatório"),
  provinciaId: z.number().min(1, "Selecione uma província"),
  telefone: z.string().nonempty("Telefone é obrigatório"),
  telefone2: z.string().optional(),
  email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
});

export type createLojaData = z.infer<typeof formSchema>;

interface Props {
    id:number
  prov: {
    id: number,
    name: string
  }[]
}

export default function EditForm({ prov, id }: Props) {
  const [opn, setOpn] = useState<boolean>(false);

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<createLojaData>({
    resolver: zodResolver(formSchema),
  });

  /*async function send(data: createLojaData) {
    const result = await editarLoja(data);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Loja atualizada com sucesso!");
      reset();
      setOpn(false);
    }
  }*/

  return (
    <>afsdf</>
  );
}

