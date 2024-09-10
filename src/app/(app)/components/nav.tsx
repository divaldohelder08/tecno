"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEmpresaAreas } from "@/store/empresa";
import {
  Clock,
  Cog,
  Coins,
  Dock,
  FileText,
  HandCoins,
  Hotel,
  Layers,
  Lock,
  SlidersVertical,
  Store,
  Tag,
  UtensilsCrossed,
  Waypoints
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AccordionNav, comercialNavItems, getTabValue, NavItem, navItems, NavLink, rhNavItems } from "./nav-items";


export function Nav() {
  const path = usePathname();
  const prefix = path.split('/')[1]?.toLowerCase();
  const [def, setDef] = useState(getTabValue(prefix));
  const { comercioGeral, restaurante, hotelaria, oficina } = useEmpresaAreas();

  const [finalComercialNavItems, setFinalComercialNavItems] = useState<NavItem[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Novo estado para carregamento

  useEffect(() => {
    setDef(getTabValue(prefix));
  }, [prefix]);

  useEffect(() => {
    setIsLoading(true); // Inicia o carregamento
    const updatedComercialNavItems = [...comercialNavItems];

    if (comercioGeral) {
      updatedComercialNavItems.push({
        label: "Comercio-geral", icon: HandCoins, href: "/comercial/general-trade",
        subLinks: [{ label: "Preço", href: "price", icon: Coins }],
      });
    }

    if (restaurante) {
      updatedComercialNavItems.push({
        label: "Restaurante", icon: UtensilsCrossed, href: "/comercial/restaurant",
        subLinks: [{ label: "Preço", href: "price", icon: Coins }],
      });
    }

    if (hotelaria) {
      updatedComercialNavItems.push({
        label: "Hotelaria", icon: Hotel, href: "/comercial/hospitality",
        subLinks: [{ label: "Preço", href: "price", icon: Coins }],
      });
    }

    if (oficina) {
      updatedComercialNavItems.push({
        label: "Oficina", icon: Cog, href: "/comercial/workshop",
        subLinks: [{ label: "Preço", href: "price", icon: Coins }],
      });
    }

    updatedComercialNavItems.push({
      label: "Parametrização", icon: SlidersVertical, href: "/comercial/parameterization",
      subLinks: [
        { label: "Turno", href: "shift", icon: Clock },
        { label: "Loja", href: "store", icon: Store },
        { label: "Unidade", href: "unit", icon: FileText },
        { label: "Categoria", href: "category", icon: Tag },
        { label: "Sub-categoria", href: "sub-category", icon: Layers },
        { label: "Classe", href: "class", icon: Lock },
        { label: "Tipo de imposto", href: "tax-type", icon: FileText },
        { label: "Taxa de imposto", href: "tax-rate", icon: Lock },
        { label: "Regime", href: "regime", icon: Waypoints },
        { label: "Conta", href: "account", icon: Dock },

      ],
    });

    setFinalComercialNavItems(updatedComercialNavItems);
    setIsLoading(false); // Termina o carregamento
  }, [comercioGeral, restaurante, hotelaria, oficina]);

  const renderNavItems = (items: NavItem[], currentPath: string) =>
    items.map((item, index) =>
      item.subLinks ? (
        <AccordionNav
          key={index}
          label={item.label}
          icon={item.icon}
          subLinks={item.subLinks}
          currentPath={currentPath}
          href={item.href}
        />
      ) : (
        <NavLink key={index} {...item} currentPath={currentPath} href={item.href} />
      )
    );
  return (
    <div className="flex-1">
      <Tabs value={def} onValueChange={setDef} className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-3 p-0 px-1 rounded-none">
          <TabsTrigger value="START">Inicio</TabsTrigger>
          <TabsTrigger value="CM">Comercial</TabsTrigger>
          <TabsTrigger value="RH">RH</TabsTrigger>
        </TabsList>

        <TabsContent value="START">
          <nav className="grid items-start text-sm font-medium lg:px-4">
            {renderNavItems(navItems, path)}
          </nav>
        </TabsContent>
        <TabsContent value="CM">
          <nav className="grid items-start text-sm font-medium lg:px-4">
            {isLoading
              ? new Array({ length: 2 }).map((_, i) => <Skeleton key={i} className="rounded-lg px-3 py-2 transition-all flex h-[35px] w-full mb-1.5" />)
              : renderNavItems(finalComercialNavItems, path)
            }
          </nav>
        </TabsContent>
        <TabsContent value="RH">
          <nav className="grid items-start text-sm font-medium lg:px-2">
            {renderNavItems(rhNavItems, path)}
          </nav>
        </TabsContent>
      </Tabs>
    </div>
  );
}
