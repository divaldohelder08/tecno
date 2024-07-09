import Link from "next/link"
import { CircleUser, Menu, Package2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

export default function Settings() {
  return (
    <>
      <Card className="border-none">
        <CardHeader>
          <CardTitle>Store Name</CardTitle>
          <CardDescription>
            Used to identify your store in the marketplace.
          </CardDescription>
        </CardHeader>
        <CardContent>
  <form className="grid gap-4 grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="codigo">Código</Label>
                    <Input id="codigo" placeholder="Código" />
                    <CardDescription>Digite o código da loja.</CardDescription>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" placeholder="Nome" />
                    <CardDescription>Digite o nome da loja.</CardDescription>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo</Label>
                    <Input id="type" placeholder="Tipo" />
                    <CardDescription>Digite o tipo de loja.</CardDescription>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="avatar">Avatar</Label>
                    <Input id="avatar" placeholder="Avatar" />
                    <CardDescription>Envie o avatar da loja.</CardDescription>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contriId">ID do Contribuinte</Label>
                    <Input id="contriId" placeholder="ID do Contribuinte" />
                    <CardDescription>Digite o ID do contribuinte da loja.</CardDescription>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="provinciaId">ID da Província</Label>
                    <Input id="provinciaId" placeholder="ID da Província" />
                    <CardDescription>Digite o ID da província da loja.</CardDescription>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="endereco">Endereço</Label>
                    <Input id="endereco" placeholder="Endereço" />
                    <CardDescription>Digite o endereço da loja.</CardDescription>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input id="cidade" placeholder="Cidade" />
                    <CardDescription>Digite a cidade da loja.</CardDescription>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input id="telefone" placeholder="Telefone" />
                    <CardDescription>Digite o número de telefone principal da loja.</CardDescription>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone1">Telefone 1</Label>
                    <Input id="telefone1" placeholder="Telefone 1" />
                    <CardDescription>Digite o número de telefone secundário da loja.</CardDescription>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Email" />
                    <CardDescription>Digite o endereço de email da loja.</CardDescription>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nif">NIF</Label>
                    <Input id="nif" placeholder="NIF" />
                    <CardDescription>Digite o número de identificação fiscal da loja.</CardDescription>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cae">CAE</Label>
                    <Input id="cae" placeholder="CAE" />
                    <CardDescription>Digite o código de atividade econômica da loja.</CardDescription>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alvara">Alvará</Label>
                    <Input id="alvara" placeholder="Alvará" />
                    <CardDescription>Digite o número de licença da loja.</CardDescription>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="regimeIva">Regime de IVA</Label>
                    <Input id="regimeIva" placeholder="Regime de IVA" />
                    <CardDescription>Digite o regime de IVA da loja.</CardDescription>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="indicadorFactura">Indicador de Fatura</Label>
                    <Input id="indicadorFactura" placeholder="Indicador de Fatura" />
                    <CardDescription>Digite o indicador de fatura da loja.</CardDescription>
                  </div>
                </form>
        </CardContent>
        <CardFooter className="px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </Card></>
  )
}
