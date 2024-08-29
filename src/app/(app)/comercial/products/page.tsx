import { Button } from "@/components/ui/button";
import { getFornecedores } from "@/http/fornecedores"
import { getCategories } from "@/http/helpers"
import { Form } from "./form"
import { getUnidades } from "@/http/unity"
import { getProducts } from "@/http/article"
import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";

import {
  PlusCircle,
} from "lucide-react";
export default async function Dashboard() {
  const fornecedores = await getFornecedores()
  const categories = await getCategories()
  const unidades = await getUnidades()
  const produts = await getProducts()
  
  
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 bg-muted/40">
      <div className="flex items-center justify-between p-4 lg:p-8 !pb-0">
        <div>
          <h1 className="text-base font-semibold md:text-2xl">Produtos</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie as pessoas que estão utilizando as licenças do contrato
          </p>
        </div>
        <Form categories={categories} fornecedores={fornecedores} unidades={unidades}>
            <Button className="gap-1 h-7 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Novo Produto
              </span>
            </Button>
        </Form>
        
      </div>
 <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <DataTable columns={columns} data={produts} />
      </main>
    </div>
  );
}
