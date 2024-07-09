import {
  Card,
  CardDescription,
  CardHeader
} from "@/components/ui/card"
import { LucideProps } from "lucide-react"
import React, { ReactNode } from "react"


interface props {
  Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>,
  title: string
  description: string
  extra?: string
  children?: ReactNode
  type?: "1" | "2"
}
function HeaderCard({ description, Icon, title, children, type,extra }: props) {
  return (
    <Card className="bg-transparent flex justify-between items-center p-4 rounded-md col-span-3">
      <CardHeader className="p-0 gap-.5 text-muted-foreground">
        <div className="text-sm inline-flex gap-1 items-center"><Icon className="w-4" /> {title}</div>
        {
          type === "1" ?
            <div className="text-sm">{description}:
              <b className="font-semibold leading-none tracking-tight">{extra}</b>
            </div> :
            <div className="text-sm">
              <h2 className="text-base">
                {description}:
              </h2>
              <b className="font-semibold leading-none tracking-tight">01.12.2023</b>
            </div>
        }
      </CardHeader>
      {children}
    </Card>
  )
}


export function HeaderCard1({ description, Icon, title }: props) {
  return (
    <Card className="bg-transparent flex flex-col  justify-between items-center p-4 rounded-md col-span-1 md:col-span-2">
      <div className="p-0 items-center flex gap-1">
        <Icon className="w-4 ml-1 text-muted-foreground" /> {title}</div>
      <CardDescription className="p-0 items-center">{description}</CardDescription>
    </Card>
  )
}


export const HeaderCards = {
  full: HeaderCard,
  simple: HeaderCard1
}