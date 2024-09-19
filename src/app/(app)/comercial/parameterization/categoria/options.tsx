"use client"
import { Button } from "@/components/ui/button";
import { deleteCategoria } from "@/http/categorias";
import { Trash } from "lucide-react";

import DeleteAlert from "@/components/delete-alert";
import { DialogEditForm } from "./form";
interface Props {
  id: number;
  name: string;
}

export default function Option({ id, name }: Props) {
  return (
    <>
      <DialogEditForm id={id} name={name} />
      <DeleteAlert
        id={id}
        title={name}
        deleteFunction={deleteCategoria}
        successMessage="Categoria deletada com sucesso"
      >
        <Button
          size="icon"
          variant="ghost"
          className="!text-red-600 hover:border-red-600 hover:bg-red-600/10"
        >
          <Trash className="h-4 w-4" />
          <span className="sr-only">Apagar</span>
        </Button>
      </DeleteAlert>
    </>
  );
}

