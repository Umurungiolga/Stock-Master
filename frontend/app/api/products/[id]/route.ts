import { NextResponse } from "next/server"

// This would normally be imported from a database module
let products = [
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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const product = products.find((p) => p.id === id)

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  return NextResponse.json(product)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const data = await request.json()

  const index = products.findIndex((p) => p.id === id)

  if (index === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  // Determine status based on stock
  let status = "in-stock"
  const stock = Number.parseInt(data.quantity || data.stock)
  if (stock === 0) {
    status = "out-of-stock"
  } else if (stock <= 5) {
    status = "low-stock"
  }

  const updatedProduct = {
    ...products[index],
    ...data,
    price: Number.parseFloat(data.price || products[index].price),
    stock: stock,
    status,
  }

  products[index] = updatedProduct

  return NextResponse.json(updatedProduct)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  const index = products.findIndex((p) => p.id === id)

  if (index === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  const deletedProduct = products[index]
  products = products.filter((p) => p.id !== id)

  return NextResponse.json({ success: true, deletedProduct })
}
