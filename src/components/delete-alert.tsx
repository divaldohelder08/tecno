"use client";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "./ui/alert-dialog";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/get-error-message";
import { type Dispatch, type SetStateAction } from "react";

interface DeleteAlertProps {
  id: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string; // Nome do conteúdo a ser apagado
  successMessage: string;
  deleteFunction: (id: string) => Promise<void>;
}

export default function DeleteAlert({
  id,
  open,
  setOpen,
  title,
  successMessage,
  deleteFunction
}: DeleteAlertProps) {
  const handleDelete = async (id: string) => {
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
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the {title}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(id)}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
