"use client"
import React from 'react'
interface ChartData{
    day:string
    count:number
}
interface analysisChartProps{
    data:ChartData[]
}
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { getMonth } from 'date-fns'
export const description = "A line chart with dots"
const chartConfig = {
  count: {
    label: "Order",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

function AnalysisChart({data}:analysisChartProps) {
  return (
    <Card className='w-10/12 mx-auto'>
      <CardHeader>
        <CardTitle>Line Chart - Dots</CardTitle>
        <CardDescription>For {getMonth(new Date())} th month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='w-full max-h-60 mx-auto'>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
              top:20,
              bottom:20
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="count"
              type="natural"
              stroke="black"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total orders for these month
        </div>
      </CardFooter>
    </Card>
  )
}

export default AnalysisChart