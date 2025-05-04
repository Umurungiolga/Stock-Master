// Updated API functions to use the Next.js API routes

// Authentication
export async function login(email: string, password: string) {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error("Login failed")
    }

    const data = await response.json()

    // Store user data in localStorage for persistence
    localStorage.setItem("user", JSON.stringify(data.user))

    return data
  } catch (error) {
    console.error("Login error:", error)
    throw error
  }
}

export async function signup(name: string, email: string, password: string, role = "user") {
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, role }),
    })

    if (!response.ok) {
      throw new Error("Signup failed")
    }

    return await response.json()
  } catch (error) {
    console.error("Signup error:", error)
    throw error
  }
}

// Products
export async function getProducts() {
  try {
    const response = await fetch("/api/products")

    if (!response.ok) {
      throw new Error("Failed to fetch products")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching products:", error)
    // Fallback to mock data if API fails
    return [
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
      // Add more fallback products
    ]
  }
}

export async function getProduct(id: string) {
  try {
    const response = await fetch(`/api/products/${id}`)

    if (!response.ok) {
      throw new Error("Product not found")
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error)
    throw error
  }
}

export async function createProduct(productData: any) {
  try {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })

    if (!response.ok) {
      throw new Error("Failed to create product")
    }

    return await response.json()
  } catch (error) {
    console.error("Error creating product:", error)
    throw error
  }
}

export async function updateProduct(id: string, productData: any) {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })

    if (!response.ok) {
      throw new Error("Failed to update product")
    }

    return await response.json()
  } catch (error) {
    console.error(`Error updating product ${id}:`, error)
    throw error
  }
}

export async function deleteProduct(id: string) {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("Failed to delete product")
    }

    return await response.json()
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error)
    throw error
  }
}

// Inventory
export async function getInventoryAlerts() {
  try {
    const response = await fetch("/api/inventory/alerts")

    if (!response.ok) {
      throw new Error("Failed to fetch inventory alerts")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching inventory alerts:", error)
    // Fallback to mock data
    return [
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
      // Add more fallback alerts
    ]
  }
}

// Keep the other functions as they are for now
// In a real implementation, you would update all of them to use API routes

// Orders
export async function getOrders() {
  try {
    // For demo purposes, return mock data
    return [
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
    ]
  } catch (error) {
    console.error("Error fetching orders:", error)
    throw error
  }
}

export async function getOrder(id: string) {
  try {
    // For demo purposes, return mock data
    const allOrders = await getOrders()
    const order = allOrders.find((o) => o.id === id)

    if (!order) {
      throw new Error("Order not found")
    }

    return {
      ...order,
      items: [
        {
          id: "1",
          productId: "1",
          productName: "Wireless Headphones",
          quantity: 1,
          price: 149.99,
        },
        {
          id: "2",
          productId: "4",
          productName: "Bluetooth Speaker",
          quantity: 1,
          price: 99.99,
        },
        {
          id: "3",
          productId: "8",
          productName: "USB-C Hub",
          quantity: 1,
          price: 59.99,
        },
      ],
      shippingAddress: "123 Main St, Anytown, USA",
      paymentMethod: "credit_card",
    }
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error)
    throw error
  }
}

export async function createOrder(orderData: any) {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Return mock successful response
    return {
      id: "ORD-" + Math.floor(1000 + Math.random() * 9000),
      ...orderData,
      status: "pending",
      date: new Date().toISOString(),
    }
  } catch (error) {
    console.error("Error creating order:", error)
    throw error
  }
}

// Users
export async function getUsers() {
  try {
    // For demo purposes, return mock data
    return [
      {
        id: "user_1",
        name: "Olga Umurungii",
        email: "umurungiolga12@gmail.com",
        role: "admin",
        status: "active",
        createdAt: "2023-01-01T09:15:00Z",
      },
      {
        id: "user_2",
        name: "John Doe",
        email: "john@example.com",
        role: "user",
        status: "active",
        createdAt: "2023-01-15T10:30:00Z",
      },
      {
        id: "user_3",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "user",
        status: "active",
        createdAt: "2023-02-20T14:45:00Z",
      },
      {
        id: "user_4",
        name: "Robert Johnson",
        email: "robert@example.com",
        role: "user",
        status: "inactive",
        createdAt: "2023-03-10T16:20:00Z",
      },
      {
        id: "user_5",
        name: "Emily Davis",
        email: "emily@example.com",
        role: "user",
        status: "active",
        createdAt: "2023-04-05T11:10:00Z",
      },
    ]
  } catch (error) {
    console.error("Error fetching users:", error)
    throw error
  }
}

// Analytics
export async function getDashboardStats() {
  try {
    // For demo purposes, return mock data
    return {
      totalRevenue: 24780.99,
      totalOrders: 573,
      totalProducts: 128,
      totalCustomers: 1842,
      revenueChange: 20.1,
      ordersChange: 12.4,
      productsChange: 5.3,
      customersChange: 18.2,
    }
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    throw error
  }
}

export async function getSalesData(period = "week") {
  try {
    // For demo purposes, return mock data
    return [
      { date: "Jan", revenue: 12500 },
      { date: "Feb", revenue: 18200 },
      { date: "Mar", revenue: 15800 },
      { date: "Apr", revenue: 19500 },
      { date: "May", revenue: 21300 },
      { date: "Jun", revenue: 24780 },
      { date: "Jul", revenue: 23100 },
      { date: "Aug", revenue: 27500 },
      { date: "Sep", revenue: 29800 },
      { date: "Oct", revenue: 32100 },
      { date: "Nov", revenue: 35400 },
      { date: "Dec", revenue: 38700 },
    ]
  } catch (error) {
    console.error("Error fetching sales data:", error)
    throw error
  }
}
