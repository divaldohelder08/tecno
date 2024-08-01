"use client"
import { Button } from "@/components/ui/button";
import { deleteUser, updateUserStatus } from "@/http/members";
import { Trash, FilePen, FileKey2, Lock, LockOpen, ShieldCheck, ShieldMinus } from "lucide-react";
import Link from "next/link";
import DeleteAlert from "@/components/delete-alert";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/get-error-message";
import { cn } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import EditUserModal from "./edit-user";

interface Props {
  id: number;
  name: string;
  email: string;
  status: boolean;
  isSuperAdmin: boolean;
  resetSentAt: boolean;
}


export default function Option({ id, name, email, status, isSuperAdmin, resetSentAt }: Props) {
  return (
    <>
      <EditUserModal
        id={id}
        name={name}
        email={email}
      >
        <Button
          size="icon"
          variant="ghost"
          aria-label="Editar utilizador"
          className="!text-emerald-600 hover:border-emerald-600 hover:bg-emerald-600/10"
        >
          <FilePen className="h-4 w-4" />
          <span className="sr-only">Editar utilizador</span>
        </Button>
      </EditUserModal>

      {!isSuperAdmin && (
        <>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="!text-amber-600 hover:border-amber-600 hover:bg-amber-600/10"
              >
                <Link href={`users/${id}/roles`}>
                  <FileKey2 className="h-4 w-4" />
                  <span className="sr-only">Editar perfis</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Editar Perfis</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className={cn(resetSentAt ? "!text-green-600 hover:border-green-600 hover:bg-green-600/10" : "!text-red-600 hover:border-red-600 hover:bg-red-600/10")}
              >
                <Lock className="h-4 w-4" />
                <span className="sr-only">Resetar senha</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Editar Utilizador</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className={cn(status ? "!text-green-600 hover:border-green-600 hover:bg-green-600/10" : "!text-red-600 hover:border-red-600 hover:bg-red-600/10")}
                onClick={() => handleStatuses({ id, status })}
              >
                {status ? <ShieldCheck className="h-[17px] w-4.5" /> : <ShieldMinus className="h-[17px] w-4.5" />}
                <span className="sr-only">Retrancar</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{status ? "Destrancar Conta" : "Trancar Conta"}</p>
            </TooltipContent>
          </Tooltip>
          <DeleteAlert
            id={id}
            title={name}
            deleteFunction={deleteUser}
            successMessage="Utilizador deletado com sucesso"
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
      )}
    </>
  );
}

const handleStatuses = async ({ id, status }: { id: number, status: boolean }) => {
  toast.promise(updateUserStatus({ id, value: !status }), {
    loading: "Alterando status...",
    error(error) {
      return getErrorMessage(error);
    },
    success: "Status alterado com sucesso",
  });
};
