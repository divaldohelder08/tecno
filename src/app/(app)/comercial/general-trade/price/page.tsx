"use server"

import NoContent from "@/components/no-content"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { getArmazens } from "@/http/armazem"
import { getFamiliaArea } from "@/http/article"
import { getIsencoes, getTaxas } from "@/http/helpers"
import { getLoja } from "@/http/loja"
import { Search } from "lucide-react"
import { TablePriced, TableUnPriced } from "./components/tables"

export default async function Component() {
  const unpriced = await getFamiliaArea({ area: "COMERCIO_GERAL", familia: "PRODUCT", hasPrice: false })
  const priced = await getFamiliaArea({ area: "COMERCIO_GERAL", familia: "PRODUCT", hasPrice: true })
  const armazens = await getArmazens().then((e) => {
    return e.map((ar) => (
      {
        value: Number(ar.id),
        label: ar.name,
      }
    ))
  })
  const lojas = await getLoja().then((e) => {
    return e.map((loja) => (
      {
        value: Number(loja.id),
        label: loja.name,
      }
    ))
  })

  const insen = await getIsencoes().then((e) => {
    return e.map((isen) => (
      {
        value: isen.id,
        label: isen.mencaoConstarDoc,
      }
    ))
  })
  const taxas = await getTaxas().then((e) => {
    return e.map((taxa) => (
      {
        id: taxa.id,
        value: taxa.value,
        label: `${taxa.name} (${taxa.value}%)`
      }
    ))
  })

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:p-4">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="flex-1">
            <h1 className="font-semibold text-lg">Gerenciamento de Preços de Produtos</h1>
          </div>
          <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Pesquisar produtos..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                />
              </div>
            </form>
          </div>
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0">
          <Tabs defaultValue="unpriced" className="space-y-4">
            <TabsList>
              <TabsTrigger value="unpriced">Produtos sem Preço</TabsTrigger>
              <TabsTrigger value="priced">Produtos com Preço</TabsTrigger>
            </TabsList>
            <TabsContent value="unpriced">
              <Card>
                <CardHeader>
                  <CardTitle>Produtos Sem Preço</CardTitle>
                  <CardDescription>Adicione preços a estes produtos para torná-los disponíveis para venda.</CardDescription>
                </CardHeader>
                <CardContent>
                  {
                    unpriced[0]
                      ? <TableUnPriced products={unpriced} armazens={armazens} lojas={lojas} insencao={insen} taxas={taxas} />
                      : <NoContent title="Não encontramos nenhum produto" description="Comece por criar novos produtos" />
                  }
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="priced">
              <Card>
                <CardHeader>
                  <CardTitle>Produtos Com Preço</CardTitle>
                  <CardDescription>Gerencie os produtos que já têm preços definidos.</CardDescription>
                </CardHeader>
                <CardContent>
                  {
                    priced[0]
                      ? <TablePriced products={priced} />
                      : <NoContent title="Não encontramos nenhum produto" description="Comece por criar novos preços aos produtos" />
                  }
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
