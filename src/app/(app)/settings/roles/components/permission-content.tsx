import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { permissionProps } from "@/types";
import Permission from "./permission";

export function PermissionContent({ permissions }: { permissions: permissionProps[] }) {
  return (
    <ScrollArea>
      <div className="grid w-full h-96 overflow-scroll gap-2">
        {
          permissions.map((e) => <Permission description={e.description} slug={e.slug} id={e.id} key={e.id} />)
        }
      </div>
      <ScrollBar />
    </ScrollArea>
  )
}