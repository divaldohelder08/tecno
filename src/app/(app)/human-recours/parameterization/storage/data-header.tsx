"use client"
import React from 'react';
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDashed } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { createCareer } from "@/http/career"
import Form from "./form";
interface props<TData> {
  table: Table<TData>,
   lojas: any;
   filter: string,
   set: (filter: string) => void

}

export function DataTableHeader<TData>({
  table,
  lojas,
  set,
  filter
}: props<TData>) {
  return (
    <div className="flex items-end py-4">
      <h1 className="text-xl font-semibold md:text-2xl">Armazem</h1>
      <div className="flex items-center gap-2 ml-auto">
        <Input
          placeholder="Filtrar armazem"
         value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
          <Form lojas={lojas}/>
      </div>
    </div>
  )
}

