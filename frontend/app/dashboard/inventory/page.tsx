"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { getInventoryAlerts, getProducts } from "@/lib/api"
import { ArrowUpRight, Plus, Search, SlidersHorizontal } from "lucide-react"
import Link from "next/link"

interface Product {
  id: string
  name: string
  sku: string
  category: string
  price: number
  stock: number
  status: "in-stock" | "low-stock" | "out-of-stock"
}

interface InventoryAlert {
  id: string
  name: string
  sku: string
  currentStock: number
  minStock: number
  maxStock: number
  status: "low" | "out" | "overstock"
}

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [alerts, setAlerts] = useState<InventoryAlert[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, alertsData] = await Promise.all([getProducts(), getInventoryAlerts()])
        setProducts(productsData)
        setAlerts(alertsData)
      } catch (error) {
        console.error("Failed to fetch inventory data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    const matchesStatus = statusFilter === "all" || product.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: Product["status"]) => {
    switch (status) {
      case "in-stock":
        return "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
      case "low-stock":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
      case "out-of-stock":
        return "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  const formatStatus = (status: Product["status"]) => {
    switch (status) {
      case "in-stock":
        return "In Stock"
      case "low-stock":
        return "Low Stock"
      case "out-of-stock":
        return "Out of Stock"
      default:
        return status
    }
  }

  const getAlertStatusColor = (status: InventoryAlert["status"]) => {
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

  const getProgressColor = (status: InventoryAlert["status"]) => {
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

  const uniqueCategories = Array.from(new Set(products.map((product) => product.category)))

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
          <p className="text-muted-foreground">Manage and monitor your product inventory</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/products/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </Link>
          <Button variant="outline">Export</Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full bg-background pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[160px] bg-background">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {uniqueCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px] bg-background">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="low-stock">Low Stock</SelectItem>
              <SelectItem value="out-of-stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <div className="space-y-6">
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{products.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {products.filter((p) => p.status === "in-stock").length} in stock
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{products.filter((p) => p.status === "low-stock").length}</div>
                  <p className="text-xs text-muted-foreground">Requires attention</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{products.filter((p) => p.status === "out-of-stock").length}</div>
                  <p className="text-xs text-muted-foreground">Needs reordering</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    $
                    {products
                      .reduce((total, product) => total + product.price * product.stock, 0)
                      .toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <p className="text-xs text-muted-foreground">Total value of inventory</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Inventory Alerts</CardTitle>
                <CardDescription>Products that need attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.slice(0, 4).map((alert) => (
                    <Link key={alert.id} href={`/dashboard/products/${alert.id}`} className="block">
                      <div className="rounded-lg border p-4 transition-colors hover:bg-muted/50">
                        <div className="mb-2 flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{alert.name}</h3>
                            <p className="text-xs text-muted-foreground">SKU: {alert.sku}</p>
                          </div>
                          <Badge variant="outline" className={`${getAlertStatusColor(alert.status)} capitalize`}>
                            {alert.status === "out"
                              ? "Out of Stock"
                              : alert.status === "low"
                                ? "Low Stock"
                                : "Overstock"}
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
                <div className="mt-4 flex justify-center">
                  <Button variant="outline" size="sm" className="gap-1" asChild>
                    <Link href="#alerts" onClick={() => document.querySelector('[value="alerts"]')?.click()}>
                      View All Alerts
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <div className="rounded-lg border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50 text-sm text-muted-foreground">
                        <th className="px-4 py-3 text-left font-medium">Product</th>
                        <th className="px-4 py-3 text-left font-medium">SKU</th>
                        <th className="px-4 py-3 text-left font-medium">Category</th>
                        <th className="px-4 py-3 text-left font-medium">Price</th>
                        <th className="px-4 py-3 text-left font-medium">Stock</th>
                        <th className="px-4 py-3 text-left font-medium">Status</th>
                        <th className="px-4 py-3 text-left font-medium">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="border-b">
                          <td className="px-4 py-3">
                            <div className="font-medium">{product.name}</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{product.sku}</td>
                          <td className="px-4 py-3 text-sm">{product.category}</td>
                          <td className="px-4 py-3 text-sm font-medium">${product.price.toFixed(2)}</td>
                          <td className="px-4 py-3 text-sm">{product.stock}</td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className={`${getStatusColor(product.status)}`}>
                              {formatStatus(product.status)}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm font-medium">
                            ${(product.price * product.stock).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center justify-between border-t px-4 py-4">
                  <div className="text-sm text-muted-foreground">
                    Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> products
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled={filteredProducts.length < 10}>
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Alerts</CardTitle>
                <CardDescription>Products that need attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <Link key={alert.id} href={`/dashboard/products/${alert.id}`} className="block">
                      <div className="rounded-lg border p-4 transition-colors hover:bg-muted/50">
                        <div className="mb-2 flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{alert.name}</h3>
                            <p className="text-xs text-muted-foreground">SKU: {alert.sku}</p>
                          </div>
                          <Badge variant="outline" className={`${getAlertStatusColor(alert.status)} capitalize`}>
                            {alert.status === "out"
                              ? "Out of Stock"
                              : alert.status === "low"
                                ? "Low Stock"
                                : "Overstock"}
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
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
