"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface InventoryData {
  month: string
  inStock: number
  lowStock: number
  outOfStock: number
}

interface TurnoverData {
  category: string
  rate: number
  change: number
}

export function InventoryTrends() {
  const [inventoryData, setInventoryData] = useState<InventoryData[]>([])
  const [turnoverData, setTurnoverData] = useState<TurnoverData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, this would fetch from the API
        // const data = await getInventoryTrends();
        // setInventoryData(data.inventory);
        // setTurnoverData(data.turnover);

        // Mock data for demonstration
        setInventoryData([
          { month: "Jan", inStock: 120, lowStock: 15, outOfStock: 5 },
          { month: "Feb", inStock: 125, lowStock: 12, outOfStock: 3 },
          { month: "Mar", inStock: 130, lowStock: 18, outOfStock: 7 },
          { month: "Apr", inStock: 135, lowStock: 20, outOfStock: 5 },
          { month: "May", inStock: 140, lowStock: 15, outOfStock: 2 },
          { month: "Jun", inStock: 145, lowStock: 10, outOfStock: 1 },
          { month: "Jul", inStock: 150, lowStock: 12, outOfStock: 3 },
          { month: "Aug", inStock: 155, lowStock: 14, outOfStock: 4 },
          { month: "Sep", inStock: 160, lowStock: 16, outOfStock: 5 },
          { month: "Oct", inStock: 165, lowStock: 18, outOfStock: 6 },
          { month: "Nov", inStock: 170, lowStock: 15, outOfStock: 4 },
          { month: "Dec", inStock: 175, lowStock: 10, outOfStock: 2 },
        ])

        setTurnoverData([
          { category: "Electronics", rate: 12.5, change: 2.3 },
          { category: "Clothing", rate: 8.7, change: -1.2 },
          { category: "Food & Beverage", rate: 15.3, change: 3.5 },
          { category: "Home & Garden", rate: 6.2, change: 0.8 },
          { category: "Accessories", rate: 9.8, change: 1.5 },
          { category: "Other", rate: 7.4, change: -0.6 },
        ])
      } catch (error) {
        console.error("Failed to fetch inventory trends:", error)
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
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">187</div>
            <p className="text-xs text-muted-foreground">+5.3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Stock Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42 units</div>
            <p className="text-xs text-muted-foreground">+3.7% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$124,582</div>
            <p className="text-xs text-muted-foreground">+8.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle>Inventory Status</CardTitle>
            <CardDescription>Monthly breakdown of inventory levels</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Tabs defaultValue="all" className="w-[250px]">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="inStock">In Stock</TabsTrigger>
                <TabsTrigger value="lowStock">Low Stock</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={inventoryData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
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
                            <span className="text-[0.70rem] uppercase text-muted-foreground">In Stock</span>
                            <span className="font-bold">{payload[0].value}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Low Stock</span>
                            <span className="font-bold">{payload[1].value}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Out of Stock</span>
                            <span className="font-bold">{payload[2].value}</span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="inStock"
                stackId="1"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary)/0.2)"
              />
              <Area
                type="monotone"
                dataKey="lowStock"
                stackId="1"
                stroke="hsl(var(--warning)/0.8)"
                fill="hsl(var(--warning)/0.2)"
              />
              <Area
                type="monotone"
                dataKey="outOfStock"
                stackId="1"
                stroke="hsl(var(--destructive)/0.8)"
                fill="hsl(var(--destructive)/0.2)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Inventory Turnover Rate</CardTitle>
          <CardDescription>How quickly products are sold by category</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={turnoverData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
              <YAxis
                dataKey="category"
                type="category"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                width={100}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Category</span>
                            <span className="font-bold text-muted-foreground">{payload[0].payload.category}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Turnover Rate</span>
                            <span className="font-bold">{payload[0].value}x</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Change</span>
                            <span className="font-bold">
                              {payload[0].payload.change > 0 ? "+" : ""}
                              {payload[0].payload.change}x
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="rate" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Inventory Insights</CardTitle>
          <CardDescription>Key metrics and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-medium">Overstocked Items</h4>
              <p className="text-sm text-muted-foreground">
                You have 8 products that are overstocked. Consider running promotions or adjusting your purchasing
                strategy to optimize inventory levels.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-medium">Stockout Risk</h4>
              <p className="text-sm text-muted-foreground">
                5 products are at risk of stockout in the next 7 days based on current sales velocity. Consider
                expediting orders for these items.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-medium">Seasonal Trends</h4>
              <p className="text-sm text-muted-foreground">
                Based on historical data, demand for electronics typically increases by 35% in the upcoming quarter.
                Consider adjusting your inventory levels accordingly.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
