"use client"
import { Eye, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteCareer, updateCareer } from "@/http/career";
import DeleteAlert from "@/components/delete-alert";
import Link from "next/link";

interface Props {
  id: number;
  name: string;
}


export default function Option({ id, name }: Props) {
  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        className="!text-amber-600 hover:border-amber-600 hover:bg-amber-600/10"
      >
        <Link href={`employee/${id}`} className="flex items-center">
          <Eye className="h-4 w-4" />
          <span className="sr-only">Ver perfil</span>
        </Link>
      </Button >
      <DeleteAlert
        id={id}
        title={name}
        deleteFunction={deleteCareer}
        successMessage="FUncionario deletado com sucesso"
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

