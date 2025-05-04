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

interface Product {
  id: string
  name: string
  sku: string
  category: string
  price: number
  stock: number
  status: "in-stock" | "low-stock" | "out-of-stock"
}

export function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // In a real app, this would fetch from the API
        // const data = await getProducts();
        // setProducts(data);

        // Mock data for demonstration
        setProducts([
          {
            id: "1",
            name: "Wireless Headphones",
            sku: "WH-1001",
            category: "Electronics",
            price: 149.99,
            stock: 3,
            status: "low-stock",
          },
          {
            id: "2",
            name: "Smartphone Charger",
            sku: "SC-2002",
            category: "Electronics",
            price: 29.99,
            stock: 0,
            status: "out-of-stock",
          },
          {
            id: "3",
            name: "Laptop Sleeve",
            sku: "LS-3003",
            category: "Accessories",
            price: 39.99,
            stock: 5,
            status: "low-stock",
          },
          {
            id: "4",
            name: "Bluetooth Speaker",
            sku: "BS-4004",
            category: "Electronics",
            price: 99.99,
            stock: 75,
            status: "in-stock",
          },
          {
            id: "5",
            name: "Mechanical Keyboard",
            sku: "MK-5005",
            category: "Electronics",
            price: 129.99,
            stock: 42,
            status: "in-stock",
          },
          {
            id: "6",
            name: "Wireless Mouse",
            sku: "WM-6006",
            category: "Electronics",
            price: 49.99,
            stock: 28,
            status: "in-stock",
          },
          {
            id: "7",
            name: "Monitor Stand",
            sku: "MS-7007",
            category: "Accessories",
            price: 79.99,
            stock: 15,
            status: "in-stock",
          },
          {
            id: "8",
            name: "USB-C Hub",
            sku: "UH-8008",
            category: "Electronics",
            price: 59.99,
            stock: 8,
            status: "low-stock",
          },
        ])
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(products.map((product) => product.id))
    }
  }

  const toggleSelectProduct = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((productId) => productId !== id))
    } else {
      setSelectedProducts([...selectedProducts, id])
    }
  }

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
                  checked={selectedProducts.length === products.length}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all products"
                />
              </th>
              <th className="px-4 py-3 text-left font-medium">Product</th>
              <th className="px-4 py-3 text-left font-medium">SKU</th>
              <th className="px-4 py-3 text-left font-medium">Category</th>
              <th className="px-4 py-3 text-left font-medium">Price</th>
              <th className="px-4 py-3 text-left font-medium">Stock</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={() => toggleSelectProduct(product.id)}
                    aria-label={`Select ${product.name}`}
                  />
                </td>
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
                        <Link href={`/dashboard/products/${product.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/products/${product.id}/edit`}>
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
          Showing <strong>{products.length}</strong> of <strong>{products.length}</strong> products
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
