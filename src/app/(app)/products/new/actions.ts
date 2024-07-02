"use server"
import { categoriesProps } from "@/types"

export async function GetCategories() {
  const res: categoriesProps[] = await fetch("http://localhost:3333/products/category").then((res) => res.json())
  return res
}

export async function SaveProduct(data: FormData) {
  console.log(Object.fromEntries(data))
}