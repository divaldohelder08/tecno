"use client";

import { Accordion, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AccordionItem } from "@radix-ui/react-accordion";
import {
  Award,
  Box,
  BriefcaseBusiness,
  Building,
  CalendarDays,
  Clock,
  FileText,
  Group,
  Home,
  KeyRound,
  Landmark,
  Layers,
  Lock,
  Settings,
  ShoppingBasket,
  SlidersVertical,
  Tag,
  Truck,
  UserCheck,
  Users,
  Warehouse
} from "lucide-react";
import Link from "next/link";
export interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
  subLinks?: NavItem[];
}

export const navItems: NavItem[] = [
  { label: "Dashboard", icon: Home, href: "/" },
  { label: "Empresa", icon: Building, href: "/company" },
  {
    label: "Controle de Acesso", icon: KeyRound, href: "/access-control",
    subLinks: [
      { label: "Perfis", href: "roles", icon: UserCheck },
      { label: "Utilizadores", href: "users", icon: Users },
    ],
  },
  {
    label: "Sistema", icon: Settings, href: "/settings",
    subLinks: [
      { label: "Turno", href: "shift", icon: Clock },
      { label: "Registro de logs", href: "log-recording", icon: FileText },
      { label: "Registro Eventos", href: "event-recording", icon: CalendarDays },
      { label: "Licenças", href: "licenses", icon: Award },
      { label: "Troca de senha", href: "change-password", icon: Lock }
    ],
  }
];


// Define an interface for the NavLink props
export interface NavLinkProps {
  href: string;
  label: string;
  icon: React.ElementType;
  count?: number;
  currentPath: string;
  isInAccordion?: boolean;
}

export const NavLink = ({ href, label, icon: Icon, count, currentPath, isInAccordion }: NavLinkProps) => {
  const isActive = currentPath === href;
  const iconClass = isInAccordion && isActive ? "text-primary" : "";
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        isActive && !isInAccordion && "bg-muted text-primary"
      )}
    >
      <Icon className={cn("h-4 w-4", iconClass)} aria-hidden="true" />
      <span>{label}</span>
      {count && (
        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          {count}
        </Badge>
      )}
    </Link>
  );
};

export const AccordionNav = ({ label, icon: Icon, subLinks, currentPath, href }: NavItem & { currentPath: string }) => {
  const isActive = currentPath.startsWith(href);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value={label.toLowerCase()}
        className={cn(
          "gap-3 rounded-lg px-3 text-muted-foreground transition-all",
          isActive && "bg-muted text-primary"
        )}
      >
        <AccordionTrigger className="py-2">
          <div
            className={cn(
              "flex items-center gap-3 text-muted-foreground transition-all hover:text-primary",
              isActive && "text-primary"
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            <span>{label}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground bg-card gap-1 grid h-full ml-[0.50rem] border-l border-primary pb-0 mb-2">
          {subLinks?.map((link, index) => (
            <NavLink key={index} {...link} currentPath={currentPath} href={`${href}/${link.href}`} isInAccordion />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};


export const comercialNavItems: NavItem[] = [
  {
    label: "Terceiros", icon: Group, href: "/comercial/entity",
    subLinks: [
      { label: "Clientes", href: "clients", icon: UserCheck },
      { label: "Fornecedores", href: "suppliers", icon: Truck }
    ],
  },
  {
    label: "Produtos / Serviços", icon: ShoppingBasket, href: "/comercial",
    subLinks: [
      { label: "Produto", href: "products", icon: Box },
      { label: "Serviço", href: "service", icon: BriefcaseBusiness },
    ],
  }
];


export const rhNavItems: NavItem[] = [
  { label: "Funcionários", icon: Users, href: "/human-recours/employee" },
  {
    label: "Parametrização", icon: SlidersVertical, href: "/human-recours/parameterization",
    subLinks: [
      { label: "Ano Fiscal", href: "fiscal-year", icon: CalendarDays },
      { label: "Departamento", href: "department", icon: Tag },
      { label: "Função", href: "function", icon: Layers },
      { label: "Banco", href: "bank", icon: Landmark },
      { label: "Categoria", href: "category", icon: Tag },
      { label: "Carreira", href: "career", icon: Lock },
      { label: "Armazem", href: "storage", icon: Warehouse },
    ],
  }
];


export const getTabValue = (prefix: string) => {
  switch (prefix) {
    case 'human-recours': return 'RH';
    case 'comercial': return 'CM';
    default: return 'START';
  }
};