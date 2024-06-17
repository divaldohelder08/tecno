"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { categoriesProps } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  ChevronLeft,
  CircleX,
  PlusCircle,
  Upload,
  X
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import ProductImage from "../components/product-image"
import { SaveProduct } from "./actions"

interface props {
  categories: categoriesProps[]
}

const formSchema = z.object({
  name: z.string().min(2, "Min 2").max(255, "Max 255"),
  description: z.string().min(5, "Min 5").max(255, "Max 255"),
  image: z.string().url(),
  categoryId: z.string().uuid(),
  subCategoryId: z.string().uuid(),
  stock: z.array(z.object({
    name: z.string().min(2, "Min 2").max(255, "Max 255"),
    image: z.string().url(),
    amount: z.coerce.number(),
    price: z.coerce.number(),
    size: z.enum(["S", "M", "L"]).optional()
  }))
})

type formData = z.infer<typeof formSchema>


export function FormVa({ categories }: props) {
  const router = useRouter()
  const [currentCategory, setCurrentCategory] = useState<string>(categories[0].id)
  const [variAmount, setVariAmount] = useState<number>(1)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues
  } = useForm<formData>({
    resolver: zodResolver(formSchema)
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'stock'
  })

  function addNewVariant() {
    append({ name: '', price: 0, amount: 0, image: '' })
  }
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
  }
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <form className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4" action={SaveProduct}>
        <div className="flex items-center gap-4">
          <Button
            size="icon"
            type="button"
            variant="outline"
            className="h-7 w-7"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Novo Produto
          </h1>
          <Badge variant="outline" className="ml-auto sm:ml-0">
            In stock
          </Badge>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm" type="reset">
              Descartar
            </Button>
            <Button size="sm" type="submit">Salvar produto</Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Detalhes do Produto</CardTitle>
                <CardDescription>
                  Detalhes do produto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      required
                      id="name"
                      name="name"
                      type="text"
                      className="w-full"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      required
                      id="description"
                      name="description"
                      className="min-h-32"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Stock</CardTitle>
                <CardDescription>
                  Variações do produto em stock
                </CardDescription>
              </CardHeader>
              {
                fields.length > 0 && <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Image</TableHead>
                        <TableHead className="w-[100px]">SKU</TableHead>
                        <TableHead className="w-26">Stock</TableHead>
                        <TableHead className="w-26">Preço</TableHead>
                        <TableHead className="w-[100px]">Tamanho</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="h-full max-h-96 overflow-scroll">
                      {
                        fields.map((_, i) => (
                          <TableRow key={`variant-${i}`}>
                            <TableCell>
                              <input
                                required
                                {...register(`stock.${i}.image`)}
                                type="file"
                                onChange={({ target: { files } }) => {
                                  if (files) {
                                    console.log(files[0])
                                    files && setValue(`stock.${i}.image`, URL.createObjectURL(files[0]))
                                  }
                                }}
                                accept="image/*"
                                className="hidden"
                                name='variant-image'
                              />
                              <div className="relative">
                                {
                                  getValues(`stock.${i}.image`) ? <Image
                                    alt="Product image"
                                    className="aspect-square w-full rounded-md object-cover"
                                    height="84"
                                    src={getValues(`stock.${i}.image`)}
                                    width="84"
                                    onClick={() => ipt.current?.click()}
                                  /> :
                                    <button
                                      type="button"
                                      onClick={() => ipt.current?.click()}
                                      className="flex aspect-square w-full items-center justify-center rounded-md border-2 border-dashed transition-all shadow-sm hover:bg-secondary/80">
                                      <Upload className="h-4 w-4 text-muted-foreground" />
                                      <span className="sr-only">Upload</span>
                                    </button>
                                }
                                {
                                  image && <div
                                    className="group absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 transform"
                                    onClick={() => setImage(null)}
                                  >
                                    <div className="flex h-5 w-5 items-center justify-center rounded-md border border-solid border-gray-500 bg-white transition-all duration-300 hover:h-6 hover:w-6 dark:border-gray-400 dark:bg-black">
                                      <X
                                        className="text-gray-500 dark:text-gray-400"
                                        width={16}
                                        height={16}
                                      />
                                    </div>
                                  </div>
                                }
                              </div>

                            </TableCell>
                            <TableCell className="font-semibold">
                              <Input
                                required
                                {...register(`stock.${i}.name`)}
                                className="p-0 border-none"
                              />
                            </TableCell>
                            <TableCell>
                              <Label className="sr-only">
                                Stock
                              </Label>
                              <Input
                                required
                                type="number"
                                {...register(`stock.${i}.amount`)}
                                placeholder="insira a quantidade em stock"
                              />
                            </TableCell>
                            <TableCell>
                              <Label className="sr-only">
                                Price
                              </Label>
                              <Input
                                required
                                type="number"
                                placeholder="insira o preço"
                                {...register(`stock.${i}.price`)}
                              />
                            </TableCell>
                            <TableCell>
                              <ToggleGroup
                                type="single"
                                variant="outline"
                                {...register(`stock.${i}.size`)}
                              >
                                <ToggleGroupItem value="s" {...register(`stock.${i}.size`)}>S</ToggleGroupItem>
                                <ToggleGroupItem value="m" {...register(`stock.${i}.size`)}>M</ToggleGroupItem>
                                <ToggleGroupItem value="l" {...register(`stock.${i}.size`)}>L</ToggleGroupItem>
                              </ToggleGroup>
                            </TableCell>
                            <TableCell>
                              <CircleX className="w-4 h-4 text-muted-foreground" onClick={() => document.getElementById(`variant-${index}`)?.remove()} />
                            </TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  </Table>
                </CardContent>
              }
              <CardFooter className="justify-center border-t p-4">
                <Button
                  size="sm"
                  type="button"
                  variant="ghost"
                  className="gap-1"
                  onClick={() => addNewVariant()}>
                  <PlusCircle className="h-3.5 w-3.5" />
                  Add Variante
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Categoria Produto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="category">Categoria</Label>
                    <Select onValueChange={setCurrentCategory} name="category" required>
                      <SelectTrigger
                        id="category"
                        aria-label="Seleciona a categoria"
                      >
                        <SelectValue placeholder="Seleciona a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          categories.map((e) => <SelectItem value={e.id} key={e.id}>{e.name}</SelectItem>)
                        }
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="subcategory">
                      subcategoria
                      {/* (optional) */}
                    </Label>
                    <Select name="subcategory" required>
                      <SelectTrigger
                        id="subcategory"
                        aria-label="Selecine a subcategoria"
                      >
                        <SelectValue placeholder="Selecine a subcategoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          categories.map((e) => {
                            if (e.id === currentCategory) {
                              return e.subCategory.map((b) => <SelectItem value={b.id} key={b.id}>{b.name}</SelectItem>)
                            }
                          })
                        }
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card
              className="overflow-hidden"
            >
              <CardHeader>
                <CardTitle>Imagem do Produto </CardTitle>
                <CardDescription>
                  Imagem a ser usada como a capa do produto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProductImage />
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Button variant="outline" size="sm" type="reset">
            Descartar
          </Button>
          <Button size="sm" type="submit">Salvar produto</Button>
        </div>
      </form>
    </main >
  )
}
