"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface SalesData {
  date: string
  revenue: number
}

export function SalesChart() {
  const [data, setData] = useState<SalesData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, this would fetch from the API
        // const salesData = await getSalesData();
        // setData(salesData);

        // Mock data for demonstration
        setData([
          { date: "Jan", revenue: 12500 },
          { date: "Feb", revenue: 18200 },
          { date: "Mar", revenue: 15800 },
          { date: "Apr", revenue: 19500 },
          { date: "May", revenue: 21300 },
          { date: "Jun", revenue: 24780 },
          { date: "Jul", revenue: 23100 },
          { date: "Aug", revenue: 27500 },
          { date: "Sep", revenue: 29800 },
          { date: "Oct", revenue: 32100 },
          { date: "Nov", revenue: 35400 },
          { date: "Dec", revenue: 38700 },
        ])
      } catch (error) {
        console.error("Failed to fetch sales data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
          <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickMargin={10} />
          <YAxis
            tickFormatter={(value) => `$${value / 1000}k`}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickMargin={10}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                        <span className="font-bold text-muted-foreground">{payload[0].payload.date}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Revenue</span>
                        <span className="font-bold">${payload[0].value?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            activeDot={{ r: 6, style: { fill: "hsl(var(--primary))" } }}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
