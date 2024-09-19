"use client"
import DeleteAlert from "@/components/delete-alert";
import { Button } from "@/components/ui/button";
import { deleteLoja } from "@/http/loja";
import { FilePenIcon, Trash } from "lucide-react";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import EditForm from "./edit-form";

interface Props {
  id: number;
  name: string;
}


export default function Option({ id, name }: Props) {
  const [opn, setOpn] = useState<boolean>(false);

  return (
    <>
      <Dialog open={opn} onOpenChange={setOpn}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="!text-emerald-600 hover:border-emerald-600 hover:bg-emerald-600/10">
            <FilePenIcon className="h-4 w-4" />
            <span className="sr-only">Editar</span>
          </Button>
        </DialogTrigger>
        <EditForm opn={opn} setOpn={setOpn} id={id} name={name} />
      </Dialog>
      <DeleteAlert
        id={id}
        title={name}
        deleteFunction={deleteLoja}
        successMessage="Loja deletado com sucesso"
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
