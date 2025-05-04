"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowDown, ArrowUp, DollarSign, Package, ShoppingCart, Users } from "lucide-react"

interface StatsData {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  totalCustomers: number
  revenueChange: number
  ordersChange: number
  productsChange: number
  customersChange: number
}

export function DashboardStats() {
  const [stats, setStats] = useState<StatsData>({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    revenueChange: 0,
    ordersChange: 0,
    productsChange: 0,
    customersChange: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // In a real app, this would fetch from the API
        // const data = await getDashboardStats();
        // setStats(data);

        // Mock data for demonstration
        setStats({
          totalRevenue: 24780.99,
          totalOrders: 573,
          totalProducts: 128,
          totalCustomers: 1842,
          revenueChange: 20.1,
          ordersChange: 12.4,
          productsChange: 5.3,
          customersChange: 18.2,
        })
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: stats.revenueChange,
      icon: DollarSign,
    },
    {
      title: "Orders",
      value: stats.totalOrders.toLocaleString(),
      change: stats.ordersChange,
      icon: ShoppingCart,
    },
    {
      title: "Products",
      value: stats.totalProducts.toLocaleString(),
      change: stats.productsChange,
      icon: Package,
    },
    {
      title: "Customers",
      value: stats.totalCustomers.toLocaleString(),
      change: stats.customersChange,
      icon: Users,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-muted-foreground">{stat.title}</span>
                <span className="text-2xl font-bold">{stat.value}</span>
              </div>
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm">
              {stat.change > 0 ? (
                <ArrowUp className="h-4 w-4 text-emerald-500" />
              ) : (
                <ArrowDown className="h-4 w-4 text-rose-500" />
              )}
              <span className={stat.change > 0 ? "text-emerald-500" : "text-rose-500"}>{Math.abs(stat.change)}%</span>
              <span className="text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
