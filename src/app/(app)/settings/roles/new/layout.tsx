'use server'
import { Card } from "@/components/ui/card"
import { getPermissions } from "@/http/roles"
import { PropsWithChildren } from "react"
import test from "./actions"

export default async function Page({ children }: PropsWithChildren) {
  const permissions = await getPermissions()


  return (
    <Card className="w-full flex flex-col">
      <form className="grid flex-1 gap-4 overflow-auto p-4" action={test}>
        {children}
      </form>
    </Card>
  )
}
