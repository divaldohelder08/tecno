import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotProducts() {
  return (
    <div
      className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm  p-4 lg:p-8"
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          You have no products
        </h3>
        <p className="text-sm text-muted-foreground">
          You can start selling as soon as you add a product.
        </p>
        <Link href="products/new" className={cn(buttonVariants({
          variant: "default",
          size: "default",
        }), "mt-4")}>Add Product</Link>
      </div>
    </div>
  )
}