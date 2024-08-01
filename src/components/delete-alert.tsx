"use client";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/utils/get-error-message";
import { ReactNode, useState, type Dispatch, type SetStateAction } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "./ui/alert-dialog";

interface DeleteAlertProps {
  id: number;
  title: string; // Nome do conteúdo a ser apagado
  successMessage: string;
  deleteFunction: (id: number) => Promise<void>;
  children: ReactNode
}

export default function DeleteAlert({
  id,
  title,
  children,
  successMessage,
  deleteFunction,
}: DeleteAlertProps) {
  const [open, setOpen] = useState<boolean>()
  const handleDelete = async (id: number) => {
    toast.promise(deleteFunction(id), {
      loading: "Deletando...",
      error(error) {
        return getErrorMessage(error);
      },
      success: successMessage,
    });
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tens a certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa acção não pode ser desfeita. Isso ira apagar permanentemente: <b>{title}</b>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(id)}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
