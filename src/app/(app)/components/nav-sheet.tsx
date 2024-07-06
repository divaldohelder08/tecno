"use client"
import { Accordion, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AccordionItem } from "@radix-ui/react-accordion";
import {
  Home,
  LineChart,
  LucideIcon,
  LucideProps,
  Package,
  Settings,
  Package2,
  Users,
  ShoppingCart,
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
export default function NavSheet() {
  const path = usePathname()

  return (
    <nav className="grid gap-2 text-lg font-medium">
      <Link
        href="/"
        className="flex items-center gap-2 text-lg font-semibold mb-4"
      >
        <Package2 className="h-6 w-6" />
        <span>{process.env.NEXT_PUBLIC_COMPANY}</span>
      </Link>
      {
        links.map((e, i) => <Link
          key={i}
          href={e.href}
          className={cn("flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground transition-all hover:text-primary mx-[-0.65rem]",
            path.includes(e.href) &&
            (path === e.href ||
              (i === 1 && path.includes("orders")) ||
              (i === 2 && path.includes("products")) ||
              (i === 3 && path.includes("customers")) ||
              (i === 4 && path.includes("analytics"))
            ) &&
            "bg-muted text-primary")}
        >
          <e.icon className="h-5 w-5" />
          {e.label}
          {
            e.count && <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">{e.count}</Badge>
          }

        </Link>
        )
      }

      <Accordion type="single" collapsible>
        <AccordionItem value='settings'
          className={cn("gap-4 rounded-xl py-2 text-muted-foreground transition-all text-lg",
            path.includes("/settings") &&
            (path === "/settings" || path.includes("settings")) &&
            "bg-muted text-primary px-3")}>
          <AccordionTrigger className="py-2">
            <Link
              href='/settings'
              className={cn("text-lg flex items-center gap-3 text-muted-foreground transition-all hover:text-primary",
                path.includes("/settings") &&
                (path === "/settings" || (path.includes("settings"))) &&
                "text-primary")}
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </AccordionTrigger>
          <AccordionContent className="text-lg text-muted-foreground pl-4 bg-card py-1.5 h-46 gap-2 grid h-full ml-[0.50rem] border-l border-primary">
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
  );
}
