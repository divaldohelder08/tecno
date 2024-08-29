"use client";

import DeleteAlert from "@/components/delete-alert";
import { Button } from "@/components/ui/button";
import { deleteCliente } from "@/http/cliente";
import { FilePen, Trash } from "lucide-react";
import Link from "next/link";
import Transform from "./form";



interface Props {
  id: number;
  name: string;
  entidadeId: number;
  isFornecedor: boolean;
}
export default function Option({ id, name, entidadeId, isFornecedor }: Props) {
  if (id === 1) return
  else
    return (
      <>
        {!isFornecedor && <Transform entidadeId={entidadeId} id={id} />}
        <Link href={`clients/${id}/edit`}>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Editar cliente"
            className="!text-emerald-600 hover:border-emerald-600 hover:bg-emerald-600/10"
          >
            <FilePen className="h-4 w-4" />
            <span className="sr-only">Editar cliente</span>
          </Button>
        </Link>
        <DeleteAlert
          id={id}
          title={name}
          deleteFunction={deleteCliente}
          successMessage="Cliente deletado com sucesso"
        >
          <Button
            size="icon"
            variant="ghost"
            className="!text-red-600 hover:border-red-600 hover:bg-red-600/10"
          >

            <Trash className="h-4 w-4" />
            <span className="sr-only">Apagar cliente</span>
          </Button>
        </DeleteAlert>
      </>
    );
}


















