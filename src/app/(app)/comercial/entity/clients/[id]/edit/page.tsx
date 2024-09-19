import { getCliente } from "@/http/cliente";
import { getCountries, getSubAccounts } from "@/http/helpers";
import Link from "next/link";
import Form from "./form";
interface props {
  params: {
    id: string
  }
}
export default async function Cliente({ params: { id } }: props) {

  const countries = await getCountries()
  const subContas = await getSubAccounts()
  const cliente = await getCliente(id) as any
  return (
    <>
      {id === "1" ? <></> : <div className="flex items-center justify-between p-4 lg:p-8 !pb-0">
        <div>
          <h1 className="text-base font-semibold md:text-2xl">Editar Clientes {id}</h1>
          <p className='text-sm text-muted-foreground'>Preencha os campos a seguir para atualizar o cliente</p>
        </div>
      </div>
      }
      <div className="mx-4 md:mx-8 pt-4">
        {id === "1" ?
          <div className="space-y-4 pt-2">
            <div className="bg-muted p-4 rounded-md rounded-tl-none mb-6">
              <h2 className="text-lg font-bold text-foreground">Editar Clientes {id}</h2>
              <p className="text-muted-foreground">
                Lamentamos, mas infelizmente o cliente diferenciado não pode ser editado.
              </p>
              <Link href="/comercial/entity/clients" className="underline text-sm" >Voltar</Link>
            </div>
          </div>
          : <Form countries={countries} subAccounts={subContas} cliente={cliente} id={id} />}
      </div>
    </>
  )
}

