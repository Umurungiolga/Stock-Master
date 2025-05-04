"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Order {
  id: string
  customerName: string
  customerEmail: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  items: number
}

export function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // In a real app, this would fetch from the API
        // const data = await getOrders();
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
            items: 3,
          },
          {
            id: "ORD-1235",
            customerName: "Jane Smith",
            customerEmail: "jane@example.com",
            date: "2023-05-02T14:45:00Z",
            status: "shipped",
            total: 149.5,
            items: 2,
          },
          {
            id: "ORD-1236",
            customerName: "Robert Johnson",
            customerEmail: "robert@example.com",
            date: "2023-05-03T09:15:00Z",
            status: "processing",
            total: 599.99,
            items: 5,
          },
          {
            id: "ORD-1237",
            customerName: "Emily Davis",
            customerEmail: "emily@example.com",
            date: "2023-05-03T16:20:00Z",
            status: "pending",
            total: 89.99,
            items: 1,
          },
          {
            id: "ORD-1238",
            customerName: "Michael Wilson",
            customerEmail: "michael@example.com",
            date: "2023-05-04T11:10:00Z",
            status: "cancelled",
            total: 199.99,
            items: 2,
          },
          {
            id: "ORD-1239",
            customerName: "Sarah Brown",
            customerEmail: "sarah@example.com",
            date: "2023-05-05T13:25:00Z",
            status: "delivered",
            total: 349.99,
            items: 4,
          },
          {
            id: "ORD-1240",
            customerName: "David Miller",
            customerEmail: "david@example.com",
            date: "2023-05-06T08:40:00Z",
            status: "shipped",
            total: 129.99,
            items: 2,
          },
          {
            id: "ORD-1241",
            customerName: "Jennifer Taylor",
            customerEmail: "jennifer@example.com",
            date: "2023-05-07T15:55:00Z",
            status: "processing",
            total: 249.99,
            items: 3,
          },
        ])
      } catch (error) {
        console.error("Failed to fetch orders:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const toggleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(orders.map((order) => order.id))
    }
  }

  const toggleSelectOrder = (id: string) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter((orderId) => orderId !== id))
    } else {
      setSelectedOrders([...selectedOrders, id])
    }
  }

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
      <div className="flex h-[400px] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50 text-sm text-muted-foreground">
              <th className="px-4 py-3 text-left font-medium">
                <Checkbox
                  checked={selectedOrders.length === orders.length}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all orders"
                />
              </th>
              <th className="px-4 py-3 text-left font-medium">Order</th>
              <th className="px-4 py-3 text-left font-medium">Customer</th>
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Items</th>
              <th className="px-4 py-3 text-left font-medium">Total</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedOrders.includes(order.id)}
                    onCheckedChange={() => toggleSelectOrder(order.id)}
                    aria-label={`Select order ${order.id}`}
                  />
                </td>
                <td className="px-4 py-3 font-medium">{order.id}</td>
                <td className="px-4 py-3">
                  <div className="font-medium">{order.customerName}</div>
                  <div className="text-sm text-muted-foreground">{order.customerEmail}</div>
                </td>
                <td className="px-4 py-3 text-sm">{new Date(order.date).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <Badge variant="outline" className={`${getStatusColor(order.status)} capitalize`}>
                    {order.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm">{order.items}</td>
                <td className="px-4 py-3 text-sm font-medium">${order.total.toFixed(2)}</td>
                <td className="px-4 py-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/orders/${order.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/orders/${order.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-rose-500 focus:text-rose-500">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t px-4 py-4">
        <div className="text-sm text-muted-foreground">
          Showing <strong>{orders.length}</strong> of <strong>{orders.length}</strong> orders
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
