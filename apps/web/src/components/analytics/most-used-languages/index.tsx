"use client"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/analytics-card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"

import { fetchMostUsedLanguages } from "@/actions/analytics/fetch-most-used-languages"
import { useServerActionQuery } from "@/hooks/server-action-hooks"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

import { NoData } from "./no-data"

const chartConfig = {
  count: {
    label: "Files",
  },
} satisfies ChartConfig

export const MostUsedLanguages = () => {
  const { data, isLoading } = useServerActionQuery(fetchMostUsedLanguages, {
    queryKey: ["most-used-languages"],
    input: {},
  })

  if (data?.length === 0) {
    return <NoData />
  }

  return (
    <Card className="bg-gray-2 size-fit h-[28rem] w-full lg:w-fit lg:min-w-[32rem]">
      <CardHeader className="items-center justify-center gap-2 pb-0">
        <div className="flex w-full items-center justify-between">
          <CardTitle>Most Files per Language</CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="relative mx-auto mt-12 flex size-72 min-h-44 items-center justify-center">
            <Skeleton className="dark:bg-gray-4 bg-gray-4 absolute size-52 rounded-full" />
            <div className="bg-gray-2 relative z-10 flex size-28 rounded-full" />
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mt-12 h-72 min-h-44 w-full"
          >
            <BarChart
              accessibilityLayer
              data={data}
              layout="vertical"
              margin={{
                left: 24,
              }}
            >
              <YAxis
                dataKey="language"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value}
              />
              <XAxis dataKey="count" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="count" layout="vertical" radius={5} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-center text-sm">
        <span className="text-muted-foreground flex items-center gap-2 leading-none">
          Most used languages for all time
        </span>
      </CardFooter>
    </Card>
  )
}
