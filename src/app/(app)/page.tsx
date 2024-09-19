"use client"

import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CardLicenciados } from "./card-licensiados";

import {
  BarChartBig,
  Calendar,
  Check,
  Shield,
  Users
} from "lucide-react";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  XAxis
} from "recharts";

const chartData = [
  { browser: "safari", visitors: 73, fill: "var(--color-safari)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig




const chartData1 = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
]

const chartConfig1 = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig


export default function Dashboard() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData1.filter((item) => {
    const date = new Date(item.date)
    const now = new Date()
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    now.setDate(now.getDate() - daysToSubtract)
    return date >= now
  })
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Inventory</h1>
          <p className='text-sm text-muted-foreground'>Gerencie as pessoas que estão utilizando as licenças do contrato</p>
        </div>
        <Select>
          <SelectTrigger
            className="w-[180px] sm:ml-auto"
            aria-label="Select a value"
          >
            <Calendar className="h-4 w-4" />
            <SelectValue placeholder="Últimos 3 meses" />
          </SelectTrigger>
          <SelectContent className="">
            <SelectItem value="90d" className="rounded-lg">
              Últimos 3 meses
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Últimos 30 dias
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Últimos 7 dias
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-10">
        <Card className="bg-card flex justify-between col-span-3 row-span-1 flex-col p-4">
          <p className="text-sm text-muted-foreground flex gap-1 items-center">
            <Users className="h-4 w-4" /> Usuários licenciados
          </p>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <RadialBarChart
                data={chartData}
                startAngle={0}
                endAngle={250}
                innerRadius={80}
                outerRadius={110}
              >
                <PolarGrid
                  gridType="circle"
                  radialLines={false}
                  stroke="none"
                  className="first:fill-muted last:fill-background"
                  polarRadius={[86, 74]}
                />
                <RadialBar dataKey="visitors" background cornerRadius={10} />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-4xl font-bold"
                            >
                              {chartData[0].visitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Visitors
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </PolarRadiusAxis>
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-card col-span-4 flex flex-col p-4 space-y-4">
          <p className="text-sm text-muted-foreground flex gap-1 items-center">
            <Users className="h-4 w-4" /> Usuários licenciados
          </p>
          <div className="grid items-center grid-cols-8 gap-4">
            <CardLicenciados
              avatarSrc="/image.png"
              title="Ola mundo"
              description="explorer"
              buttonText="button"
            />
            <CardLicenciados
              avatarSrc="/image.png"
              title="Ola mundo"
              description="explorer"
              buttonText="button"
            />
            <CardLicenciados
              avatarSrc="/image.png"
              title="Ola mundo"
              description="explorer"
              buttonText="button"
            />
          </div>
        </Card>

        <div className="grid gap-4 grid-cols-2 sm:grid-row-4 col-span-3">
          <Card className="bg-card flex justify-between col-span-2 lg:col-span-4 row-span-1 flex-col p-4">
            <p className="text-sm text-muted-foreground flex gap-1 items-center">
              <Shield className="h-4 w-4" /> Licenças em uso
            </p>
            <div className="text-md text-muted-foreground flex gap-1 items-baseline ">
              <h1 className="text-2xl font-bold">120</h1> de 170 licenças
            </div>
            <div className="flex gap-3 items-center">
              <Progress value={75} />
              <span className="text-sm">75%</span>
            </div>
          </Card>

          <Card className="bg-card flex justify-between col-span-2 lg:col-span-4 row-span-1 flex-col p-4">
            <p className="text-sm text-muted-foreground flex gap-1 items-center">
              <Check className="h-4 w-4" /> Taxa de conclusão
            </p>
            <div className="text-md text-muted-foreground flex gap-1 items-baseline ">
              <h1 className="text-2xl font-bold">32</h1> de 120 alunos
            </div>
            <div className="flex gap-3 items-center">
              <Progress value={25} />
              <span className="text-sm">25%</span>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-10">
        <div className="grid gap-4 grid-cols-2 grid-row-4 col-span-3">
          <Card className="bg-card flex justify-between col-span-3 row-span-1 flex-col p-4">
            <p className="text-sm text-muted-foreground flex gap-1 items-center">
              <Shield className="h-4 w-4" /> Licenças em uso
            </p>
            <div className="text-md text-muted-foreground flex gap-1 items-baseline ">
              <h1 className="text-2xl font-bold">120</h1> de 170 licenças
            </div>
            <div className="flex gap-3 items-center">
              <Progress value={75} />
              <span className="text-sm">75%</span>
            </div>
          </Card>

          <Card className="bg-card flex justify-between col-span-3 row-span-1 flex-col p-4">
            <p className="text-sm text-muted-foreground flex gap-1 items-center">
              <Check className="h-4 w-4" /> Taxa de conclusão
            </p>
            <div className="text-md text-muted-foreground flex gap-1 items-baseline ">
              <h1 className="text-2xl font-bold">32</h1> de 120 alunos
            </div>
            <div className="flex gap-3 items-center">
              <Progress value={25} />
              <span className="text-sm">25%</span>
            </div>
          </Card>
        </div>
        <Card className="col-span-7">
          <CardHeader>
            <CardDescription className="text-sm text-muted-foreground flex gap-1 items-center">
              <BarChartBig className="h-4 w-4" /> January - June 2024</CardDescription>
          </CardHeader>
          <div className="mx-auto aspect-square max-h-[250px] w-full">
            <ChartContainer
              config={chartConfig1}
              className="aspect-auto h-[250px] w-full"
            >
              <AreaChart data={filteredData}>
                <defs>
                  <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-desktop)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-desktop)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                  <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-mobile)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-mobile)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      }}
                      indicator="dot"
                    />
                  }
                />
                <Area
                  dataKey="mobile"
                  type="natural"
                  fill="url(#fillMobile)"
                  stroke="var(--color-mobile)"
                  stackId="a"
                />
                <Area
                  dataKey="desktop"
                  type="natural"
                  fill="url(#fillDesktop)"
                  stroke="var(--color-desktop)"
                  stackId="a"
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </div>
        </Card>


      </div>
    </main>
  );
}
