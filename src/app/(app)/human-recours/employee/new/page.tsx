import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getBanks } from "@/http/banks";
import { getFcns } from "@/http/function";
import { getCareer } from "@/http/career";
import { getCategoria } from "@/http/rh-categorias";
import type { Metadata } from "next";
import Form from "./form";


export const metadata: Metadata = {
  title: "Cadastrar funcionario",
};

export default async function Employee() {
  const bancos = await getBanks()
  const fcns = await getFcns()
  const carreiras = await getCareer()
  console.log(fcns)
  return (
    <div className="container mx-auto p-4">
      <CardHeader>
        <CardTitle className="text-2xl">Cadastro de Funcionário</CardTitle>
        <CardDescription>Preencha os dados do novo funcionário.</CardDescription>
      </CardHeader>
      <Form bancos={bancos} fcns={fcns} carreiras={carreiras} />
    </div >
  )
}