import { Form } from "./form"
import { getFornecedores } from "@/http/fornecedores"
import { getCategories } from "@/http/helpers"

export default async function Dashboard() {
  const fornecedores = await getFornecedores()
  const categories = await getCategories()
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col sm:gap-4">
        <Form categories={categories} fornecedores={fornecedores}/>
      </div>
    </div >
  )
}
