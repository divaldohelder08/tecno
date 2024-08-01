"use server"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getEmpresa } from "@/http/empresa"
import { getCountries } from "@/http/helpers"
import Form from "./form"

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
        {response.error && (
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-md mb-6">
              <h2 className="text-lg font-bold text-foreground">{response.error}</h2>
              <p className="text-muted-foreground">
                Lamentamos, mas não conseguimos encontrar a empresa que você procura. Tente cadastrar ou entre em contato conosco.
              </p>
            </div>
          </div>
        )}
          <Form data={response.data} countries={countries} />
      </CardContent>
    </>
  );
}