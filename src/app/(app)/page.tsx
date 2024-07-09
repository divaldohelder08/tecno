"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { CardLicensiados } from "./card-licensiados";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Calendar,
  Check,
  Shield,
  Users
} from "lucide-react";



import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import { ChartConfig, ChartContainer } from "@/components/ui/chart"
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


export default function Dashboard() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Inventory</h1>
          <p className='text-sm text-muted-foreground'>Gerencie as pessoas que estão utilizando as licenças do contrato</p>
        </div>
        <div className={cn(buttonVariants({
          variant: "outline",
          size: "sm",
        }), 'items-center w-52 justify-between bg-card rounded-sm')}
        >
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="sm:not-sr-only sm:whitespace-nowrap">
              Novo membro
            </span>
          </div>
          <ChevronDownIcon className="h-4 w-4" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-10 h-[200px]">
        <div className="bg-card flex justify-between col-span-3 row-span-1 rounded-sm flex-col p-4">
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
      
        </div>

        <div className="bg-card col-span-4 rounded-sm flex flex-col justify-between p-4 space-y-4">
          <p className="text-sm text-muted-foreground flex gap-1 items-center">
            <Users className="h-4 w-4" /> Usuários licenciados
          </p>

          <div className="grid items-center grid-cols-8 gap-4">
              <CardLicensiados
        avatarSrc="https://xesque.rocketseat.dev/users/avatar/profile-5709534d-3e6a-49c3-b6fb-d74cef66357d-1692203537097.jpg"
        title="Ola mundo"
        description="explorer"
        buttonText="button"
      />
                  <CardLicensiados
        avatarSrc="https://xesque.rocketseat.dev/users/avatar/profile-5709534d-3e6a-49c3-b6fb-d74cef66357d-1692203537097.jpg"
        title="Ola mundo"
        description="explorer"
        buttonText="button"
      />
                  <CardLicensiados
        avatarSrc="https://xesque.rocketseat.dev/users/avatar/profile-5709534d-3e6a-49c3-b6fb-d74cef66357d-1692203537097.jpg"
        title="Ola mundo"
        description="explorer"
        buttonText="button"
      />
          </div>
        </div>

        <div className="grid gap-4 grid-cols-2 grid-row-4 col-span-3">
          <div className="bg-card flex justify-between col-span-3 row-span-1 rounded-sm flex-col p-4">
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
          </div>

          <div className="bg-card flex justify-between col-span-3 row-span-1 rounded-sm flex-col p-4">
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
          </div>
        </div>
      </div>
    </main>
  );
}
