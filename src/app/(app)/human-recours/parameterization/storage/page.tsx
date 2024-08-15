'use server'
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import Form from "./form";
import { getArmazens } from "@/http/armazem"
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getLoja } from "@/http/loja"

export default async function Component() {
  const data = await getArmazens()
  const lojas = await getLoja()
  return (
    <div className="p-4 lg:p-8">
      <DataTable columns={columns} lojas={lojas} data={data} />
    </div>
  )
}