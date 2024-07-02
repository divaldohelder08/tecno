import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { categoriesProps } from "@/types"
import {
  PlusCircle,
} from "lucide-react"
import AvaliabelsCategories from "./avaliabels-categories"
import { NewCategory } from "./components/new-category"
// import { api } from "@/lib/axios"

export default async function Product() {
  // const categories = await api.get<categories>("/products/category")
  const categories: categoriesProps[] = await fetch("http://localhost:3333/products/category").then(res => res.json())
  return (
    <>
      <div className="w-full flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 px-4">
          <h1 className="text-xl font-semibold">Categories</h1>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <PlusCircle className="size-4" />
                <span className="sr-only">new category</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh]">
              <DrawerHeader>
                <DrawerTitle>Configuration</DrawerTitle>
                <DrawerDescription>
                  Configure the settings for the model and messages.
                </DrawerDescription>
              </DrawerHeader>
              <NewCategory className="overflow-auto p-4 pt-0" />
            </DrawerContent>
          </Drawer>
        </header>
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            className="relative hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0"
          >
            <NewCategory />
          </div>
          <AvaliabelsCategories categories={categories} />
        </main>
      </div>
    </>
  )
}