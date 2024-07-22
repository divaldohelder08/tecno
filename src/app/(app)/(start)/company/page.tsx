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
  const response = await getEmpresa()
  const countries = await getCountries()
  return (
    <>
      <Card className="border-none">
        <CardHeader>
          <CardTitle className="text-xl">Empresa</CardTitle>
          <CardDescription>
            Used to identify your store in the marketplace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form data={response.data} error={response.error} countries={countries} />
        </CardContent>
        <CardFooter className="px-6 py-4">
          <Button size="lg">Salvar informações</Button>
        </CardFooter>
      </Card>
    </>
  )
}

//                  <div className="space-y-2 col-span-2">
