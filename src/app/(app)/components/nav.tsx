"use client"
import { Accordion, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AccordionItem } from "@radix-ui/react-accordion";
import {
  GitFork,
  Home,
  LineChart,
  Package,
  Settings,
  ShoppingCart,
  Users
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
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



const SettingLinks = [
  {
    label: "Roles",
    icon: LineChart,
    href: "/roles"
  },
  {
    label: "Permissions",
    icon: LineChart,
    href: "/permissions"
  }
]


const entidadeLinks = [
  {
    label: "Clientes",
    icon: LineChart,
    href: "/cliente"
  },
  {
    label: "Fornecedor",
    icon: LineChart,
    href: "/fornecedor"
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
          <AccordionItem value='entidades'
            className={cn("gap-3 rounded-lg px-3 ext-muted-foreground transition-all",
              path.includes("/entidade") &&
              (path === "/entidade" || path.includes("entidade")) &&
              "bg-muted text-primary")}>
            <AccordionTrigger className="py-2">
              <Link
                href='/entidade'
                className={cn("flex items-center gap-3 text-muted-foreground transition-all hover:text-primary",
                  path.includes("/entidade") &&
                  (path === "/entidade" || (path.includes("entidade"))) &&
                  "text-primary")}
              >
                <GitFork className="h-4 w-4" />
                Entidades
              </Link>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pl-4 bg-card py-1.5 h-46 gap-2 grid h-full ml-[0.50rem] border-l border-primary">
              {
                entidadeLinks.map((e, i) => <Link
                  key={i}
                  href={`/entidade/${e.href}`}
                  className={cn("transition-all hover:text-primary",
                    path.includes(e.href) && "text-primary")
                  }>{e.label}</Link>
                )
              }
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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
              {
                SettingLinks.map((e, i) => <Link
                  key={i}
                  href={`/settings/${e.href}`}
                  className={cn("transition-all hover:text-primary",
                    path.includes(e.href) && "text-primary")
                  }>{e.label}</Link>
                )
              }
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </nav>
    </div>
  )
}