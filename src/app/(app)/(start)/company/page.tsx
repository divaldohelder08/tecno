"use server"
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { getEmpresa } from "@/http/empresa"
import { getCountries } from "@/http/helpers"
import Form from "./form"
import FormConfi from "./form-config"


import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
export default async function Organization() {
  const response = await getEmpresa();
  const countries = await getCountries();
  return (
    <>
      <CardHeader className="p-0">
        <CardTitle className="text-xl">Empresa</CardTitle>
        <CardDescription>
          Usado para identificar sua loja no mercado.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="GERAL">
          <div className="relative">
            <TabsList className="grid grid-cols-2 w-[400px] rounded-bl-none">
              <TabsTrigger value="GERAL">Geral</TabsTrigger>
              <TabsTrigger value="CONFIG">Configurações</TabsTrigger>
            </TabsList>
            {response.error && (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-md rounded-tl-none mb-6">
                  <h2 className="text-lg font-bold text-foreground">{response.error}</h2>
                  <p className="text-muted-foreground">
                    Lamentamos, mas não conseguimos encontrar a empresa que você procura. Tente cadastrar ou entre em contato conosco.
                  </p>
                </div>
              </div>
            )}
          </div>

          <TabsContent value="GERAL">
            <Form data={response.data} countries={countries} />
          </TabsContent>
          <TabsContent value="CONFIG">
            <FormConfi data={response.data} countries={countries} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </>
  );
}