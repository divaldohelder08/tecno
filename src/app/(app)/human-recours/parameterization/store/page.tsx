'use server'
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import Form from "./form";
import { getProvincias } from "@/http/helpers"
import { getLoja  } from "@/http/loja"
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function Component() {
const provinces=await getProvincias()
const lojas= await getLoja()
  return (
           <div className="p-4 lg:p-8">
  { lojas[0] ? <DataTable columns={columns} data={lojas} prov={provinces} />
            : <div
              className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm  p-4 md:p-6 m-4 md:m-6"
            >
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                  Não encontramos nenhuma loja
                </h3>
                <p className="text-sm text-muted-foreground">
                  Começe por criar novas lojas 
                </p>
              
              </div>
            </div>
        }
        
    </div>
  )
}