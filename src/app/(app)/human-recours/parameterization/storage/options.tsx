"use client"
import { Button } from "@/components/ui/button";
import { deleteUser, updateUserStatus } from "@/http/members";
import { Trash, FilePen } from "lucide-react";
import Link from "next/link";
import DeleteAlert from "@/components/delete-alert";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/get-error-message";
import { cn } from "@/lib/utils";
import { deleteArmazem  } from "@/http/armazem"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  id: number;
  name: string;
}


export default function Option({ id, name }: Props) {
  return (
    <>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="!text-green-600 hover:border-green-600 hover:bg-green-600/10"
              >
                  <FilePen className="h-4 w-4" />
                  <span className="sr-only">Editar armazem</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Editar Armazem</p>
            </TooltipContent>
          </Tooltip>
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
