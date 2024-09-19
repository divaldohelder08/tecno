"use client";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Option from "./options";

interface service {
  id: number;
  name: string;
  imagem: string | null;
  estado: string;
  comercio_geral: boolean;
  restaurante: boolean;
  hotelaria: boolean;
  oficina: boolean;
  createdAt: Date;
}

export const columns: ColumnDef<service>[] = [
  {
    id: "select",
    header: () => (
      <p className="hidden w-[100px] sm:block">
        <span className="sr-only">Image</span>
      </p>
    ),
    cell: ({ row }) => (
      <Image
        alt="Product image"
        className="aspect-square rounded-md object-cover hidden sm:table-cell"
        height="64"
        src={row.original.imagem ?? "/placeholder.svg"} // Corrigido aqui
        width="64"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: () => <p>Name</p>,
    cell: ({ row }) => <p>{row.getValue("name")}</p>,
  },
  {
    accessorKey: "estado", // Usei "estado" ao invés de "status", de acordo com a interface service
    header: () => <p>Estado</p>,
    cell: ({ row }) => {
      return row.original.estado ? (
        <Badge variant="outline" className="mx-auto">
          ACTIVO
        </Badge>
      ) : (
        <Badge variant="destructive" className="mx-auto">
          REMOVIDO
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <p className="hidden md:block">Created at</p>,
    cell: ({ row }) => <p className="hidden md:block">{row.getValue("createdAt")}</p>,
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <p>Opções</p>,
    cell: ({ row }) => {
      const art = row.original;
      return <Option id={art.id} name={art.name} />;
    },
  },
];
