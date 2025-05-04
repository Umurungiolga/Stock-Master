import { NextResponse } from "next/server"

// Simple in-memory storage (will reset on server restart)
// For a real app, you would use a database
const products = [
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
  // Add more initial products as needed
]

export async function GET() {
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  const data = await request.json()

  // Generate a new ID
  const newId = (products.length + 1).toString()

  // Determine status based on stock
  let status = "in-stock"
  if (data.stock === 0) {
    status = "out-of-stock"
  } else if (data.stock <= 5) {
    status = "low-stock"
  }

  const newProduct = {
    id: newId,
    name: data.name,
    sku: data.sku || `SKU-${newId}`,
    category: data.category,
    price: Number.parseFloat(data.price),
    stock: Number.parseInt(data.quantity),
    status,
    ...data,
  }

  products.push(newProduct)

  return NextResponse.json(newProduct)
}
