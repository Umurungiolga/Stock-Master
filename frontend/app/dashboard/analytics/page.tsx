import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SalesChart } from "@/components/dashboard/analytics/sales-chart"
import { ProductPerformance } from "@/components/dashboard/analytics/product-performance"
import { CustomerMetrics } from "@/components/dashboard/analytics/customer-metrics"
import { InventoryTrends } from "@/components/dashboard/analytics/inventory-trends"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">Detailed insights into your inventory and sales performance</p>
      </div>

      <Tabs defaultValue="sales" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Your sales performance over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <SalesChart />
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$24,780.99</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                <div className="mt-4 h-[80px]">{/* Mini chart would go here */}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">+12.4% from last month</p>
                <div className="mt-4 h-[80px]">{/* Mini chart would go here */}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$43.25</div>
                <p className="text-xs text-muted-foreground">+7.3% from last month</p>
                <div className="mt-4 h-[80px]">{/* Mini chart would go here */}</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <ProductPerformance />
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <CustomerMetrics />
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <InventoryTrends />
        </TabsContent>
      </Tabs>
    </div>
  )
}
