import { Button } from "@/components/ui/button";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { maper } from "@/types";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { AddPriceForm } from "./add-price-form";

export interface tax extends maper {
  id: number,
}

interface unPriced {
  products: {
    id: number;
    name: string;
    categoria: {
      name: string
      id: number;
    } | null
    imagem: string | null;
  }[],
  lojas: maper[],
  armazens: maper[];
  insencao: maper[];
  taxas: tax[];
}

export function TableUnPriced({ products, armazens, lojas, insencao, taxas }: unPriced) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead />
          <TableHead>Nome</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Converter</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <div className="relative w-12 h-12 cursor-pointer group">
                <Image
                  src={product.imagem ?? '/placeholder.svg'}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.categoria?.name ?? 'N/A'}</TableCell>
            <TableCell>
              <AddPriceForm img={product.imagem} name={product.name} armazens={armazens} lojas={lojas} id={product.id} insencao={insencao} taxas={taxas} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

interface priced {
  products: {
    id: number;
    name: string;
    categoria: {
      name: string
      id: number;
    } | null
    precoImposto: number;
    price: number;
    stock: number;
    imagem: string;
  }[]
}

export function TablePriced({ products }: priced) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead />
          <TableHead>Nome</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead>Ação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <div className="relative w-12 h-12 cursor-pointer group">
                <Image
                  src={product.imagem ?? '/placeholder.svg'}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md" />
              </div>
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.categoria?.name ?? "N/A"}</TableCell>
            <TableCell>{product.precoImposto.toLocaleString("pt-BR", {
              style: "currency",
              currency: "AOA",
            })}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    aria-haspopup="true"
                    size="icon"
                    variant="ghost"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
            <TableCell>
              <Button size="sm">
                Adicionar Estoque
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>)
}