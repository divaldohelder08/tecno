import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Permission as permissionProps } from "@/types";
import Permission from "./permission";

interface params { 
  roleId: string;
  has: permissionProps[];
  permissions: permissionProps[];
}

export function PermissionContent({ permissions, has, roleId }: params) {
  // Filtrar permissões para remover duplicatas
  const uniquePermissions = permissions.filter(permission => 
    !has.some(h => h.id === permission.id)
  );

  return (
    <ScrollArea>
      <div className="grid w-full h-96 overflow-scroll gap-2">
        {/* Renderiza permissões que já existem (has) */}
        {has.sort().map((e) => (
          <Permission 
            description={e.description} 
            slug={e.slug} 
            id={e.id} 
            key={`has-${e.id}`} 
            val={true} 
            roleId={roleId} 
          />
        ))}
        {/* Renderiza permissões únicas do array permissions */}
        {uniquePermissions.sort().map((e) => (
          <Permission 
            description={e.description} 
            slug={e.slug} 
            id={e.id} 
            key={`permissions-${e.id}`} 
            val={false} 
            roleId={roleId} 
          />
        ))}
      </div>
      <ScrollBar />
    </ScrollArea>
  );
}
