import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getBanks } from "@/http/banks"
import Image from "next/image"
import { ComboboxDropdownMenu } from "./combobox-dropdown-menu"
import Form, { DrawerForm } from "./form"

interface props {
  key: number,
  id: number,
  name: string,
  code: string,
  sigla: string
}

export default async function Component() {
  const banks = await getBanks()
  return (
    <div className="p-4 md:p-8 grid w-full gap-2 lg:gap-4 xl:grid-cols-[1fr_280px]">
      <div>
        <div className="container mx-auto flex px-4 flex-col sm:flex-row justify-between">
          <h2 className="text-xl font-bold mb-1 md:mb-0 leading-none tracking-tight">Bancos</h2>
          <div className="flex items-center gap-2">
            <Input type="text" placeholder="Buscar por nome ou identificação" className="w-64" />
            <DrawerForm />
          </div>
        </div>
        {banks[0] && <section className="grid gap-4 p-4 grid-cols-1 sm:grid-cols-2 lg:sm:grid-cols-3">
          {
            banks.map(bank => {
              return <BankCard id={bank.id} name={bank.nome_banco} code={bank.codigo} sigla={bank.sigla} key={bank.id} />
            })
          }
        </section>
        }
        {
          !banks[0] && <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm  p-4 md:p-6 m-4 md:m-6"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                Não encontramos nenhum banco
              </h3>
              <p className="text-sm text-muted-foreground">
                Comece por criar novos bancos
              </p>

            </div>
          </div>

        }
      </div>
      <Form />
    </div>
  )
}


function BankCard({ id, name, code, sigla }: props) {
  return (
    <Card className="relative overflow-hidden rounded-lg group">
      <div id="actions" className="absolute z-10 right-0 top-1 flex gap-2">
        <ComboboxDropdownMenu id={id} name={name} code={code} sigla={sigla} />
      </div>
      <Image src="/placeholder.png" alt="Store 1" width={200} height={150} className="object-cover w-full h-32" />
      <div className="p-4 ">
        <h3 className="text-base font-semibold">{sigla}</h3>
        <p className="text-sm text-muted-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">Código: {code}</p>
      </div>
    </Card>
  )
}
