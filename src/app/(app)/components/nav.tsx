"use client"
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Home,
  LineChart,
  LucideProps,
  Package,
  ShoppingCart,
  Users,
  Settings
} from "lucide-react";
import { Accordion, AccordionContent, AccordionTrigger } from "@/components/ui/accordion"
import { AccordionItem } from "@radix-ui/react-accordion"
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
      href: "/"
    }, {
      label: "Orders",
      icon: ShoppingCart,
      count: 6,
      href: "/orders"
    },
    {
      label: "Products",
      icon: Package,
      href: "/products"

    },
    {
      icon: Users,
      href: "/members",
      label: "Members"
    },
    {
      label: "Analytics",
      icon: LineChart,
      href: "/analytics"
    },
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

        <Accordion type="single" collapsible>
          <AccordionItem value='settings'
            className={cn("gap-3 rounded-lg px-3 ext-muted-foreground transition-all",
              path.includes("/settings") &&
              (path === "/settings" || path.includes("settings")) &&
              "bg-muted text-primary")}>
            <AccordionTrigger className="py-2">
              <Link
                href='/settings'
                className={cn("flex items-center gap-3 text-muted-foreground transition-all hover:text-primary",
                  path.includes("/settings") &&
                  (path === "/settings" || (path.includes("settings"))) &&
                  "text-primary")}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pl-4 bg-card py-1.5 h-46 gap-2 grid h-full ml-[0.50rem] border-l border-primary">
              <Link
                href="/settings/roles"
                className={cn("transition-all hover:text-primary",
                  path.includes("/roles") && "text-primary")
                }>Roles</Link>
              <Link href="/settings/permissions"
                className={cn("transition-all hover:text-primary",
                  path.includes("/permissions") && "text-primary")
                }
              >Permissions</Link>
              <Link href="/settings/organizations">Organizations</Link>
              <Link href="/settings">Advanced</Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </nav>
    </div>
  )
}