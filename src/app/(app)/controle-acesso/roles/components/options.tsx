"use client"
import { Eye, Loader2, MoreVertical, Trash, Copy, CircleDashed, FilePenIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import * as Drop from "@/components/ui/dropdown-menu";
import { DropdownMenu as Container } from "@/components/ui/dropdown-menu";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { deleteUser } from "@/http/members";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { User, FilePen, FileKey2, Lock } from "lucide-react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import DeleteAlert from "@/components/delete-alert";
import { deleteRole } from "@/http/roles";

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
        <Link href={`roles/${id}`} className="flex items-center">
          <Eye className="h-4 w-4" />
          <span className="sr-only">Ver perfil</span>
        </Link>
      </Button >
      <DeleteAlert
        id={id}
        title={name}
        deleteFunction={deleteRole}
        successMessage="Perfil deletado com sucesso"
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
