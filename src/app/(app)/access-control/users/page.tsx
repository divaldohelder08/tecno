import { getMembers } from "@/http/members"
import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import Form from "./form"

export default async function Members() {
  const users = await getMembers()
  return (
    <div>
      <div className="flex items-center justify-between p-4 lg:p-8">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl">Utilizadores</h1>
          <p className='text-md text-muted-foreground'>Todos utilizadores que tenhem acesso ao <b>Tecno Bantu</b></p>
        </div>
        <Form />
      </div>
      <DataTable columns={columns} data={users} />
    </div>
  )
}
