import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Permission as permissionProps } from "@/types";
import Permission from "./permission";

interface params {
  roleId: string;
  has: permissionProps[];
  permissions: permissionProps[];
}

export function PermissionContent({ permissions: OldPermissions, has, roleId }: params) {
  const uniquePermissions = OldPermissions.filter(permission =>
    !has.some(h => h.id === permission.id)
  );

  console.log(OldPermissions.length, uniquePermissions.length);

  // Corrigindo a criação dos objetos no `map`
  const newHas = has.map((e) => ({
    description: e.description,
    slug: e.slug,
    id: e.id,
    val: true,
    roleId: roleId
  }));

  const oldNotHas = uniquePermissions.map((e) => ({
    description: e.description,
    slug: e.slug,
    id: e.id,
    val: false,
    roleId: roleId
  }));

  // Correção na concatenação dos arrays
  const permissions = newHas.concat(oldNotHas);

  console.log(permissions, "bsd");

  return (
    <>
      <div className='bg-secondary w-full rounded-sm flex justify-between px-4 py-2 items-center border border-b'>
        <div className="flex gap-1.5 items-start">
          <h4>slug:</h4>
          <p className="text-muted-foreground">description</p>
        </div>
      </div>
      <ScrollArea>
        <div className="grid w-full h-[450px] overflow-scroll gap-2">
          {permissions
            .sort((a, b) => a.id - b.id)
            .map((e, i) => (
              <Permission
                description={e.description ?? 'N/A'}
                slug={e.slug}
                id={e.id}
                key={i}
                val={e.val}
                roleId={roleId}
              />
            ))}
        </div>
        <ScrollBar />
      </ScrollArea>
      <div className="text-end text-muted-foreground pt-2">
        <b>{has.length}</b> de <b>{OldPermissions.length}</b> atribuídas
      </div>
    </>
  );
}
