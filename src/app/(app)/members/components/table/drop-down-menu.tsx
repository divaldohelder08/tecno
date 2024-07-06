"use client"
import { Eye, Loader2, MoreVertical, Trash } from "lucide-react";

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
      <DeleteContainer id={id} name={name} isOpn={opn} set={setOpn} />
      <Container>
        <Drop.DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </Drop.DropdownMenuTrigger>
        <Drop.DropdownMenuContent align="end">
          <Drop.DropdownMenuLabel>Actions</Drop.DropdownMenuLabel>
          <Drop.DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(id.toString())}
          >
            Copy payment ID
          </Drop.DropdownMenuItem>
          <Drop.DropdownMenuSeparator />
          <Drop.DropdownMenuItem>
            <Link href={`members/${id}`} className="flex items-center">
              <Eye className="mr-2 h-4 w-4" />
              View customer
            </Link>
          </Drop.DropdownMenuItem>
        </Drop.DropdownMenuContent>
      </Container>
    </>
  );
}



function DeleteContainer({ id, name, set, isOpn }: props1) {
  const [load, setLoad] = useState<boolean>()
  async function send() {
    const result = await deleteRole(id)
    setLoad(false)
    set(false)
    if (result?.error) {
      toast.error(result.error);
      return
    }
      toast.success('Role apagada com sucesso');
  }
  return (
    <AlertDialog open={isOpn} onOpenChange={set} >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Deseja realmente apagar essa role:{name}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Nisi magni delectus accusantium, commodi
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => set(false)}>
                Cancelar
           </Button>
           <Button
              size="sm"
              onClick={() => {
                setLoad(true)
                send()
              }} disabled={load}>
           {load ? (
              <Loader2 className="motion-reduce:hidden animate-spin" size="20" />
            ) :
              'Apagar'


              
            }
        </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}