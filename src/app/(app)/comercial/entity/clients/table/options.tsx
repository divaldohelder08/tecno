"use client";

import { Button } from "@/components/ui/button";
import { Trash, FilePen, Upload } from "lucide-react";
import DeleteAlert from "@/components/delete-alert";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/get-error-message";
import { cn } from "@/lib/utils";
import Transform from "./form";
import { deleteCliente } from "@/http/cliente";


import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Props {
  id: number;
  name: string;
  entidadeId: number; 
  isFornecedor: boolean;
}
export default function Option({ id, name, entidadeId, isFornecedor }: Props) {
  return (
    <>
      {!isFornecedor && <Transform entidadeId={entidadeId} id={id}/>}
        <Button
          size="icon"
          variant="ghost"
          aria-label="Editar cliente"
          className="!text-emerald-600 hover:border-emerald-600 hover:bg-emerald-600/10"
        >
          <FilePen className="h-4 w-4" />
          <span className="sr-only">Editar cliente</span>
        </Button>
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

















