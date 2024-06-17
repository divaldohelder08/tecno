"use client"
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Home,
  LineChart,
  LucideProps,
  Package,
  ShoppingCart,
  Users
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";
const links: {
  label: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  count?: number;
  href: string
}[] = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard"
    }, {
      label: "Orders",
      icon: ShoppingCart,
      count: 6,
      href: "/dashboard/orders"
    },
    {
      label: "Products",
      icon: Package,
      href: "/dashboard/products"

    },
    {
      label: "Customers",
      icon: Users,
      href: "/dashboard/customers"
    },
    {
      label: "Analytics",
      icon: LineChart,
      href: "/dashboard/analytics"
    }
  ]
export function Nav() {
  const path = usePathname()
  return (
    <div className="flex-1">
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        {
          links.map((e, i) => <Link
            key={i}
            href={e.href}
            className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              path.includes(e.href) &&
              (path === e.href ||
                (i === 0 && path.startsWith("dashboard")) ||
                (i === 1 && path.includes("orders")) ||
                (i === 2 && path.includes("products")) ||
                (i === 3 && path.includes("customers")) ||
                (i === 4 && path.includes("analytics"))
              ) &&
              "bg-muted text-primary")}
          >
            <e.icon className="h-4 w-4" />
            {e.label}
            {
              e.count && <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">{e.count}</Badge>
            }
          </Link>
          )
        }
      </nav>
    </div>
  )
}