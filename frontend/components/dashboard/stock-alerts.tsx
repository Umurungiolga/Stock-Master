"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

interface StockAlert {
  id: string
  name: string
  sku: string
  currentStock: number
  minStock: number
  maxStock: number
  status: "low" | "out" | "overstock"
}

export function StockAlerts() {
  const [alerts, setAlerts] = useState<StockAlert[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        // In a real app, this would fetch from the API
        // const data = await getStockAlerts();
        // setAlerts(data);

        // Mock data for demonstration
        setAlerts([
          {
            id: "1",
            name: "Wireless Headphones",
            sku: "WH-1001",
            currentStock: 3,
            minStock: 10,
            maxStock: 50,
            status: "low",
          },
          {
            id: "2",
            name: "Smartphone Charger",
            sku: "SC-2002",
            currentStock: 0,
            minStock: 15,
            maxStock: 60,
            status: "out",
          },
          {
            id: "3",
            name: "Laptop Sleeve",
            sku: "LS-3003",
            currentStock: 5,
            minStock: 10,
            maxStock: 40,
            status: "low",
          },
          {
            id: "4",
            name: "Bluetooth Speaker",
            sku: "BS-4004",
            currentStock: 75,
            minStock: 20,
            maxStock: 70,
            status: "overstock",
          },
        ])
      } catch (error) {
        console.error("Failed to fetch stock alerts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAlerts()
  }, [])

  const getStatusColor = (status: StockAlert["status"]) => {
    switch (status) {
      case "low":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
      case "out":
        return "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20"
      case "overstock":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  const getProgressColor = (status: StockAlert["status"]) => {
    switch (status) {
      case "low":
        return "bg-yellow-500"
      case "out":
        return "bg-rose-500"
      case "overstock":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const calculatePercentage = (current: number, max: number) => {
    return Math.min(Math.max((current / max) * 100, 0), 100)
  }

  if (isLoading) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <Link key={alert.id} href={`/dashboard/products/${alert.id}`} className="block">
          <div className="rounded-lg border p-4 transition-colors hover:bg-muted/50">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <h3 className="font-medium">{alert.name}</h3>
                <p className="text-xs text-muted-foreground">SKU: {alert.sku}</p>
              </div>
              <Badge variant="outline" className={`${getStatusColor(alert.status)} capitalize`}>
                {alert.status === "out" ? "Out of Stock" : alert.status === "low" ? "Low Stock" : "Overstock"}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>
                  {alert.currentStock} / {alert.maxStock} units
                </span>
                <span className="font-medium">
                  {calculatePercentage(alert.currentStock, alert.maxStock).toFixed(0)}%
                </span>
              </div>
              <Progress
                value={calculatePercentage(alert.currentStock, alert.maxStock)}
                className={getProgressColor(alert.status)}
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
