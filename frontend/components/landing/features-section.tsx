import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Clock, LineChart, Package, ShieldCheck, Truck } from "lucide-react"

export function FeaturesSection() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Everything You Need to Manage Your Inventory
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              StockMaster provides a comprehensive suite of tools to streamline your inventory management process.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <Package className="h-6 w-6 text-primary" />
              <CardTitle className="mt-2">Real-time Tracking</CardTitle>
              <CardDescription>
                Monitor your inventory levels in real-time with automatic updates and alerts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Never run out of stock again with our intelligent tracking system that keeps you informed about your
                inventory status at all times.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              <CardTitle className="mt-2">Advanced Analytics</CardTitle>
              <CardDescription>
                Gain valuable insights with comprehensive analytics and reporting tools.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Make data-driven decisions with our powerful analytics dashboard that visualizes your sales trends,
                inventory turnover, and more.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Truck className="h-6 w-6 text-primary" />
              <CardTitle className="mt-2">Order Management</CardTitle>
              <CardDescription>Streamline your order processing from creation to fulfillment.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Efficiently manage orders with our intuitive interface that helps you track status, update customers,
                and manage shipments.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <LineChart className="h-6 w-6 text-primary" />
              <CardTitle className="mt-2">Demand Forecasting</CardTitle>
              <CardDescription>Predict future inventory needs based on historical data and trends.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our AI-powered forecasting helps you optimize stock levels, reduce carrying costs, and prevent stockouts
                before they happen.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Clock className="h-6 w-6 text-primary" />
              <CardTitle className="mt-2">Automated Reordering</CardTitle>
              <CardDescription>Set up automatic reordering based on your custom rules and thresholds.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Save time and eliminate manual work with automated purchase orders that trigger when inventory reaches
                predefined levels.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <CardTitle className="mt-2">Secure & Reliable</CardTitle>
              <CardDescription>Your data is protected with enterprise-grade security measures.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Rest easy knowing your inventory data is secure, backed up, and available whenever you need it with our
                99.9% uptime guarantee.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
