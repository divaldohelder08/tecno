import { getCountries, getSubAccounts } from "@/http/helpers"
import Form from "./form"

export default async function Cliente() {
  const countries = await getCountries()
  const subContas = await getSubAccounts()
  return (
    <>
      <div className="flex items-center justify-between p-4 lg:p-8 !pb-0">
        <div>
          <h1 className="text-base font-semibold md:text-2xl">Fornecedor</h1>
          <p className='text-sm text-muted-foreground'>Preencha os campos a seguir</p>
        </div>
      </div>
      <div className="mx-4 md:mx-8 pt-4">
        <Form countries={countries} subAccounts={subContas}/>
      </div>
    </>
  )
}

