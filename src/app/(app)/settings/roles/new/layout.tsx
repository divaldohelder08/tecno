import { Card } from "@/components/ui/card"
import { PropsWithChildren } from "react"
import test from "./actions"

export default function Page({ children }: PropsWithChildren) {
  return (
    <Card className="w-full flex flex-col grid flex-1 gap-4 overflow-auto p-4">
        {children}
    </Card>
  )
}
