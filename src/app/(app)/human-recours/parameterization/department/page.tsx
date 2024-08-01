"use server"
import { getDepartamento } from "@/http/departamento";
import { getFuncionario } from "@/http/funcionarios";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Form from "./form";

export default async function Roles() {
  const departamentos = await getDepartamento()
  const old=await getFuncionario()
  const funcio=old.map(e=> {
    return { id:e.id, name:e.nome_completo}
    })
  
  return (
    <div className="p-4 lg:p-8 grid w-full gap-6 lg:gap-8">
      <DataTable columns={columns} data={departamentos}  funcio={funcio}/>
    </div>
  )
}