import { Input } from "@/components/ui/input"
import { PlusCircle, Search } from "lucide-react"
import NotProducts from "./components/no-products"
import Products from "./components/main"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { GearIcon } from "@radix-ui/react-icons"
import { Fragment } from "react";


export default function Dashboard() {
  const hasProduct = true
  return (
    <>
      <div className="flex items-center pt-4 lg:pt-8 px-4 lg:px-8">
        <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
        {hasProduct && <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>}
        <Link href="products/settings"
          className={cn(buttonVariants({
            variant: "secondary",
            size: "sm",
          }), "h-8 gap-1 ml-2")}
        >
          <GearIcon className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Settings
          </span>
        </Link>
      </div>
      {
        hasProduct ? <Products /> : <NotProducts />
      }
    </>
  )
}
