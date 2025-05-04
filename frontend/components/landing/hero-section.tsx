import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Revolutionize Your Inventory Management
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                StockMaster helps you track, manage, and optimize your inventory with powerful analytics and real-time
                insights.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-primary text-primary-foreground">
                  Get Started for Free
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative aspect-video overflow-hidden rounded-xl border bg-background p-2 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5"></div>
              <img
                src="/placeholder.svg?height=550&width=850"
                alt="StockMaster Dashboard Preview"
                width={550}
                height={310}
                className="mx-auto rounded-md object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
