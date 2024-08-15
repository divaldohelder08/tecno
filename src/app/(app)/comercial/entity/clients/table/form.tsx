"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { transformToFornecedor } from "@/http/cliente";
import { useState } from "react";

interface ComponentProps {
  id: number;
  entidadeId: number;
}

export default function Transform({ entidadeId, id }: ComponentProps) {
  const [open, setOpen] = useState<boolean>()
  const [submitting, setSubmitting] = useState<boolean>(false)
  const send = async () => {
    setSubmitting(true)
    const result = await transformToFornecedor({ entidadeId, id });
    if (result?.error) {
      toast.error(result.error);
    } else
      toast.success('Cliente transformado  com sucesso');
    setOpen(false)
    setSubmitting(false)
  };


  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Upload"
        >
          <Upload className="h-4 w-4" />
          <span className="sr-only">Converter</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Transformar Cliente em fornecedor</AlertDialogTitle>
          <AlertDialogDescription>
            Preencha os campos abaixo para transformar um fornecedor em cliente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button type="button" disabled={submitting} onClick={() => send()}>
            {submitting ? 'Enviando...' : 'Continuar'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
