import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotProducts() {
  return (
    <div
      className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          You have no cliente
        </h3>
        <p className="text-sm text-muted-foreground">
          You can start selling as soon as you add a cliente.
        </p>
        <Link href="cliente/new" className={cn(buttonVariants({
          variant: "default",
          size: "default",
        }), "mt-4")}>Add cliente</Link>
      </div>
    </div>
  )
}