"use client";
import DeleteAlert from "@/components/delete-alert";
import { Button } from "@/components/ui/button";
import { deleteFornecedor } from "@/http/fornecedores";
import { FilePen, Trash } from "lucide-react";
import Link from "next/link";
import Transform from "./form";

interface Props {
  id: number;
  name: string;
  entidadeId: number;
  isCliente: boolean;
}
export default function Option({ id, name, entidadeId, isCliente }: Props) {
  if (id === 1) return
  else
    return (
      <>
        {!isCliente && <Transform entidadeId={entidadeId} id={id} />}
        <Link href={`suppliers/${id}/edit`}>
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
          deleteFunction={deleteFornecedor}
          successMessage="Fornecedor deletado com sucesso"
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


















