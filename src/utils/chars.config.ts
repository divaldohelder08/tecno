import { type ChartConfig } from "@/components/ui/chart"
import { MobileIcon } from "@radix-ui/react-icons"
import { Monitor } from "lucide-react"

export const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
    icon: Monitor,
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
    icon: MobileIcon
  },
} satisfies ChartConfig