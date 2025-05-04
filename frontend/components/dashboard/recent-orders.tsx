"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Eye } from "lucide-react"
import Link from "next/link"

interface Order {
  id: string
  customerName: string
  customerEmail: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
}

export function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // In a real app, this would fetch from the API
        // const data = await getRecentOrders();
        // setOrders(data);

        // Mock data for demonstration
        setOrders([
          {
            id: "ORD-1234",
            customerName: "John Doe",
            customerEmail: "john@example.com",
            date: "2023-05-01T10:30:00Z",
            status: "delivered",
            total: 299.99,
          },
          {
            id: "ORD-1235",
            customerName: "Jane Smith",
            customerEmail: "jane@example.com",
            date: "2023-05-02T14:45:00Z",
            status: "shipped",
            total: 149.5,
          },
          {
            id: "ORD-1236",
            customerName: "Robert Johnson",
            customerEmail: "robert@example.com",
            date: "2023-05-03T09:15:00Z",
            status: "processing",
            total: 599.99,
          },
          {
            id: "ORD-1237",
            customerName: "Emily Davis",
            customerEmail: "emily@example.com",
            date: "2023-05-03T16:20:00Z",
            status: "pending",
            total: 89.99,
          },
          {
            id: "ORD-1238",
            customerName: "Michael Wilson",
            customerEmail: "michael@example.com",
            date: "2023-05-04T11:10:00Z",
            status: "cancelled",
            total: 199.99,
          },
        ])
      } catch (error) {
        console.error("Failed to fetch recent orders:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
      case "processing":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "shipped":
        return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20"
      case "delivered":
        return "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
      case "cancelled":
        return "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
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
      <div className="rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50 text-sm text-muted-foreground">
                <th className="px-4 py-3 text-left font-medium">Order</th>
                <th className="px-4 py-3 text-left font-medium">Customer</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Total</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="px-4 py-3 text-sm font-medium">{order.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={order.customerName} />
                        <AvatarFallback>
                          {order.customerName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-0.5">
                        <div className="text-sm font-medium">{order.customerName}</div>
                        <div className="text-xs text-muted-foreground">{order.customerEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className={`${getStatusColor(order.status)} capitalize`}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">${order.total.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/dashboard/orders/${order.id}`}>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View order</span>
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center">
        <Link href="/dashboard/orders">
          <Button variant="outline" size="sm" className="gap-1">
            View All Orders
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
