"use client"

import { Bar, BarChart, CartesianGrid, LineChart, XAxis, Line } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page-B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page-C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const chartConfig = {
  desktop: {
    label: "G",
    color: "#2563eb",
  },
  mobile: {
    label: "A",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export default function Component() {
  return (
  <div className="w-full h-full items-center justify-center place-center h-[500px] w-[500px]">
    <ChartContainer config={chartConfig} className="min-h-[20px] w-full">
      <LineChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
        <ChartTooltip content={<ChartTooltipContent indicator="dashed"/>} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </LineChart>
    </ChartContainer>
    </div>
  )
}
