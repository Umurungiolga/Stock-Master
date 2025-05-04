"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CustomerData {
  month: string
  new: number
  returning: number
  total: number
}

export function CustomerMetrics() {
  const [data, setData] = useState<CustomerData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, this would fetch from the API
        // const data = await getCustomerMetrics();
        // setData(data);

        // Mock data for demonstration
        setData([
          { month: "Jan", new: 120, returning: 80, total: 200 },
          { month: "Feb", new: 132, returning: 95, total: 227 },
          { month: "Mar", new: 141, returning: 105, total: 246 },
          { month: "Apr", new: 156, returning: 113, total: 269 },
          { month: "May", new: 168, returning: 128, total: 296 },
          { month: "Jun", new: 189, returning: 142, total: 331 },
          { month: "Jul", new: 204, returning: 156, total: 360 },
          { month: "Aug", new: 216, returning: 170, total: 386 },
          { month: "Sep", new: 228, returning: 185, total: 413 },
          { month: "Oct", new: 246, returning: 201, total: 447 },
          { month: "Nov", new: 264, returning: 223, total: 487 },
          { month: "Dec", new: 285, returning: 242, total: 527 },
        ])
      } catch (error) {
        console.error("Failed to fetch customer metrics:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,842</div>
            <p className="text-xs text-muted-foreground">+18.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">285</div>
            <p className="text-xs text-muted-foreground">+8.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Customer Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76.4%</div>
            <p className="text-xs text-muted-foreground">+2.3% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle>Customer Growth</CardTitle>
            <CardDescription>New vs. returning customers over time</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Tabs defaultValue="all" className="w-[250px]">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
                <TabsTrigger value="returning">Returning</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickMargin={10} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickMargin={10} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Month</span>
                            <span className="font-bold text-muted-foreground">{payload[0].payload.month}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">New</span>
                            <span className="font-bold">{payload[0].value}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Returning</span>
                            <span className="font-bold">{payload[1].value}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Total</span>
                            <span className="font-bold">{payload[2].value}</span>
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
                dataKey="new"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                activeDot={{ r: 6, style: { fill: "hsl(var(--primary))" } }}
              />
              <Line
                type="monotone"
                dataKey="returning"
                stroke="hsl(var(--secondary))"
                strokeWidth={2}
                activeDot={{ r: 6, style: { fill: "hsl(var(--secondary))" } }}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                activeDot={{ r: 6, style: { fill: "hsl(var(--accent))" } }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Customer Demographics</CardTitle>
          <CardDescription>Breakdown of customer base by region and age group</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-4 text-sm font-medium">Customers by Region</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">North America</span>
                  <span className="text-sm font-medium">42%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: "42%" }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Europe</span>
                  <span className="text-sm font-medium">28%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: "28%" }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Asia Pacific</span>
                  <span className="text-sm font-medium">18%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: "18%" }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Latin America</span>
                  <span className="text-sm font-medium">8%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: "8%" }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Other</span>
                  <span className="text-sm font-medium">4%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: "4%" }} />
                </div>
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-medium">Customers by Age Group</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">18-24</span>
                  <span className="text-sm font-medium">15%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: "15%" }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">25-34</span>
                  <span className="text-sm font-medium">32%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: "32%" }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">35-44</span>
                  <span className="text-sm font-medium">28%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: "28%" }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">45-54</span>
                  <span className="text-sm font-medium">18%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: "18%" }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">55+</span>
                  <span className="text-sm font-medium">7%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: "7%" }} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
