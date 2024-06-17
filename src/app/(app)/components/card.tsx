import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

interface props {
  title: string,
  val: string,
  balance: string,
  icon: JSX.Element
}
export function CardMetrics({ title, balance, val, icon }: props) {
  return (
    <Card x-chunk="dashboard-01-chunk-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{val}</div>
        <p className="text-xs text-muted-foreground">
          {balance}
        </p>
      </CardContent>
    </Card>
  )
}