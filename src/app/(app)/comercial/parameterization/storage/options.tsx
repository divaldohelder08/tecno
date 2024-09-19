"use client"
import DeleteAlert from "@/components/delete-alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { deleteArmazem } from "@/http/armazem";
import { FilePen, Trash } from "lucide-react";
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
          <Button
            size="icon"
            variant="ghost"
            className="!text-green-600 hover:border-green-600 hover:bg-green-600/10"
          >
            <FilePen className="h-4 w-4" />
            <span className="sr-only">Editar armazem</span>
          </Button>
        </DialogTrigger>
        <EditForm opn={opn} setOpn={setOpn} id={id} name={name} />
      </Dialog>
      <DeleteAlert
        id={id}
        title={name}
        deleteFunction={deleteArmazem}
        successMessage="Armazem deletado com sucesso"
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
