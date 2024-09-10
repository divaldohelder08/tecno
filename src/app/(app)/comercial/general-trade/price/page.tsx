"use client"

import { Search } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { AddPriceForm } from "./add-price-form"

export default function Component() {
  const [unpriced, setUnpriced] = useState([
    { id: 1, name: "Produto A", category: "Eletrônicos", image: "https://files.edgestore.dev/ba7nhwhqent6h77c/artigoAvatar/_public/avatar/911cc366-c04b-4168-84ef-5f1fdc465d94.jpg" },
    { id: 2, name: "Produto B", category: "Roupas", image: "/placeholder.svg" },
    { id: 3, name: "Produto C", category: "Casa & Jardim", image: "/placeholder.svg" },
  ])

  const [priced, setPriced] = useState([
    { id: 4, name: "Produto D", category: "Eletrônicos", price: 99.99, stock: 50, image: "/placeholder.svg" },
    { id: 5, name: "Produto E", category: "Roupas", price: 29.99, stock: 100, image: "/placeholder.svg" },
    { id: 6, name: "Produto F", category: "Casa & Jardim", price: 49.99, stock: 75, image: "/placeholder.svg" },
  ])

  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isImageMaximized, setIsImageMaximized] = useState(false)
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
              <TabsTrigger value="unpriced">Produtos Sem Preço</TabsTrigger>
              <TabsTrigger value="priced">Produtos Com Preço</TabsTrigger>
            </TabsList>
            <TabsContent value="unpriced" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Produtos Sem Preço</CardTitle>
                  <CardDescription>Adicione preços a estes produtos para torná-los disponíveis para venda.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Imagem</TableHead>
                        <TableHead>Nome do Produto</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Ação</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {unpriced.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="relative w-12 h-12 cursor-pointer group">
                              <Image
                                src={product.image}
                                alt={product.name}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-md"
                              />
                            </div>
                          </TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>
                            <AddPriceForm img={product.image} name={product.name} category={product.category} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="priced" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Produtos Com Preço</CardTitle>
                  <CardDescription>Gerencie os produtos que já têm preços definidos.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Imagem</TableHead>
                        <TableHead>Nome do Produto</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Preço</TableHead>
                        <TableHead>Estoque</TableHead>
                        <TableHead>Ação</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {priced.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="relative w-12 h-12 cursor-pointer group"
                              onMouseEnter={() => setSelectedProduct(product)}
                              onMouseLeave={() => setSelectedProduct(null)}>
                              <Image
                                src={product.image}
                                alt={product.name}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-md"
                              />
                            </div>
                          </TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.price.toFixed(2)}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              onClick={() => handleUpdateStock(product.id, 10)}
                            >
                              Adicionar Estoque
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
