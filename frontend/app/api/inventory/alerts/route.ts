import { NextResponse } from "next/server"

// This would normally be calculated from your product database
export async function GET() {
  const alerts = [
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
    {
      id: "11",
      name: "Artisanal Chocolate Box",
      sku: "FB-9003",
      currentStock: 3,
      minStock: 10,
      maxStock: 40,
      status: "low",
    },
    {
      id: "15",
      name: "Indoor Plant Set",
      sku: "HG-2002",
      currentStock: 0,
      minStock: 8,
      maxStock: 30,
      status: "out",
    },
  ]

  return NextResponse.json(alerts)
}
