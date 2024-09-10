'use server'
import { getFuncionario } from "@/http/funcionarios"
import { getProvincias } from "@/http/helpers"
import { getLoja } from "@/http/loja"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export default async function Component() {
  const provinces = await getProvincias()
  const lojas = await getLoja()
  const func = await getFuncionario()

  return (
    <div className="p-4 lg:p-8">
      <DataTable columns={columns} data={lojas} prov={provinces} func={func} />
    </div>
  )
}