"use client"
import { Eye, Loader2, MoreVertical, Trash, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import * as Drop from "@/components/ui/dropdown-menu";
import { DropdownMenu as Container } from "@/components/ui/dropdown-menu";
import { deleteRole } from "@/http/roles";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

interface props {
  id: number,
  name: string,
}

interface props1 extends props {
  isOpn: boolean,
  set: Dispatch<SetStateAction<boolean>>
}

const formSchema = z.object({
  id: z.number()
})
type formData = z.infer<typeof formSchema>
export default function DropdownMenu({ id, name }: props) {
  const [opn, setOpn] = useState<boolean>(false)
  return (
    <>
      <Container>
        <Drop.DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </Drop.DropdownMenuTrigger>
        <Drop.DropdownMenuContent align="end">
          <Drop.DropdownMenuLabel>Opções</Drop.DropdownMenuLabel>
          <Drop.DropdownMenuSeparator />
          <Drop.DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(id.toString())}
          >
              <Copy className="mr-2 h-4 w-4" />
            Copiar ID
          </Drop.DropdownMenuItem>
          <Drop.DropdownMenuItem>
            <Link href={`department/${id}`} className="flex items-center">
              <Eye className="mr-2 h-4 w-4" />
              Pesquizar departamento
            </Link>
          </Drop.DropdownMenuItem>
        </Drop.DropdownMenuContent>
      </Container>
    </>
  );
}


