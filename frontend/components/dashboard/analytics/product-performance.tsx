"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, ArrowUp } from "lucide-react"

interface ProductData {
  name: string
  sales: number
  revenue: number
  growth: number
}

export function ProductPerformance() {
  const [products, setProducts] = useState<ProductData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, this would fetch from the API
        // const data = await getProductPerformance();
        // setProducts(data);

        // Mock data for demonstration
        setProducts([
          { name: "Wireless Headphones", sales: 342, revenue: 51299.58, growth: 12.5 },
          { name: "Smartphone Charger", sales: 276, revenue: 8277.24, growth: -3.2 },
          { name: "Laptop Sleeve", sales: 189, revenue: 7559.61, growth: 8.7 },
          { name: "Bluetooth Speaker", sales: 167, revenue: 16699.33, growth: 15.3 },
          { name: "Mechanical Keyboard", sales: 145, revenue: 18849.55, growth: 5.8 },
          { name: "Wireless Mouse", sales: 132, revenue: 6598.68, growth: -1.4 },
          { name: "Monitor Stand", sales: 98, revenue: 7839.02, growth: 9.2 },
          { name: "USB-C Hub", sales: 87, revenue: 5219.13, growth: 4.6 },
        ])
      } catch (error) {
        console.error("Failed to fetch product performance data:", error)
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
      <Card>
        <CardHeader>
          <CardTitle>Product Performance</CardTitle>
          <CardDescription>Sales and revenue by product</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={products} margin={{ top: 5, right: 10, left: 10, bottom: 20 }}>
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                tickMargin={10}
                angle={-45}
                textAnchor="end"
              />
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
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Product</span>
                            <span className="font-bold text-muted-foreground">{payload[0].payload.name}</span>
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
              <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="mt-6">
        <h3 className="mb-4 text-lg font-medium">Top Performing Products</h3>
        <div className="rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50 text-sm text-muted-foreground">
                  <th className="px-4 py-3 text-left font-medium">Product</th>
                  <th className="px-4 py-3 text-left font-medium">Sales</th>
                  <th className="px-4 py-3 text-left font-medium">Revenue</th>
                  <th className="px-4 py-3 text-left font-medium">Growth</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.name} className="border-b">
                    <td className="px-4 py-3 font-medium">{product.name}</td>
                    <td className="px-4 py-3 text-sm">{product.sales.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">
                      $
                      {product.revenue.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {product.growth > 0 ? (
                          <ArrowUp className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <ArrowDown className="h-4 w-4 text-rose-500" />
                        )}
                        <Badge
                          variant="outline"
                          className={
                            product.growth > 0
                              ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                              : "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20"
                          }
                        >
                          {Math.abs(product.growth)}%
                        </Badge>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
