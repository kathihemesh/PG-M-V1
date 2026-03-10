"use client"

import { Cell, Pie, PieChart, Legend } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const statusData = [
  { name: "Paid", value: 18, color: "hsl(142, 71%, 45%)" },
  { name: "Pending", value: 4, color: "hsl(38, 92%, 50%)" },
  { name: "Late", value: 2, color: "hsl(0, 84%, 60%)" },
]

export function PaymentStatusChart() {
  return (
    <Card className="min-w-0 overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Payment Status</CardTitle>
        <CardDescription>Current month payment breakdown</CardDescription>
      </CardHeader>
      <CardContent className="p-2 pb-4 sm:p-6 sm:pt-0">
        <ChartContainer
          config={{
            paid: {
              label: "Paid",
              color: "hsl(142, 71%, 45%)",
            },
            pending: {
              label: "Pending",
              color: "hsl(38, 92%, 50%)",
            },
            late: {
              label: "Late",
              color: "hsl(0, 84%, 60%)",
            },
          }}
          className="mx-auto aspect-square w-full max-h-[300px]"
        >
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              innerRadius="35%"
              outerRadius="55%"
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => `${value} tenants`}
                />
              }
            />
            <Legend 
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
