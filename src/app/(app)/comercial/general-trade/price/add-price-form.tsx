"use client"

import { PlusCircle } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
interface props {
  img: string | null
  name: string
  categoria: string
}

export function AddPriceForm({ img, name, category }: props) {
  const [controloStock, setControloStock] = useState(1)

  const handleAddPrice = (formData: any) => {
    const product = unpriced.find(p => p.id === parseInt(formData.id_artigo))
    if (product) {
      setUnpriced(unpriced.filter(p => p.id !== parseInt(formData.id_artigo)))
      setPriced([...priced, {
        ...product,
        price: parseFloat(formData.preco),
        stock: parseInt(formData.stock_min),
        taxRate: parseFloat(formData.id_taxa_imposto) / 100
      }])
    }
  }

  const handleUpdateStock = (id: number, newStock: number) => {
    setPriced(priced.map(p => p.id === id ? { ...p, stock: p.stock + newStock } : p))
  }

  const calculatePriceWithTax = (price: string, taxRate: string) => {
    const priceValue = parseFloat(price)
    const taxRateValue = parseFloat(taxRate) / 100
    return isNaN(priceValue) || isNaN(taxRateValue)
      ? ""
      : (priceValue * (1 + taxRateValue)).toFixed(2)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Preço
        </Button>
      </DialogTrigger>
      <DialogContent className=" rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Adicionar Preço ao Produto</DialogTitle>
          <DialogDescription>
            Insira as informações necessárias para adicionar um preço a este produto.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col md:flex-row">
          <div className="">
            <div className="relative flex items-center justify-center h-12 w-full md:w-1/3 p-6">
              <img src={img ?? ""} alt={name} className="w-full h-auto" />
              <div>
                <p className="font-bold text-xl">{name}</p>
                <p className="font-normal text-sm">{category}</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3 p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="id_artigo">ID do Artigo</Label>
                  <Input id="id_artigo" placeholder="ID do Artigo" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="preco">Preço</Label>
                  <Input id="preco" type="number" step="0.01" placeholder="0,00" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="preco_imposto">Preço com Imposto</Label>
                  <Input id="preco_imposto" type="number" step="0.01" placeholder="0,00" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="id_taxa_imposto">ID Taxa Imposto</Label>
                  <Input id="id_taxa_imposto" placeholder="ID Taxa Imposto" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="id_isencao">ID Isenção</Label>
                  <Input id="id_isencao" placeholder="ID Isenção" className="mt-1" />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Controle de Estoque</h3>
                <div className="flex items-center space-x-2 mb-4">
                  <Switch
                    id="controlo_stock"
                    checked={controloStock === 1}
                    onCheckedChange={(checked) => setControloStock(checked ? 1 : 0)}
                  />
                  <Label htmlFor="controlo_stock">Ativar Controle de Estoque</Label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="stock_min">Estoque Mínimo</Label>
                    <Input id="stock_min" type="number" placeholder="0" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="stock_max">Estoque Máximo</Label>
                    <Input id="stock_max" type="number" placeholder="0" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="id_loja">ID da Loja</Label>
                    <Input id="id_loja" placeholder="ID da Loja" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="id_armazem">ID do Armazém</Label>
                    <Input id="id_armazem" placeholder="ID do Armazém" className="mt-1" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
