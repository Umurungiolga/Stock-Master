import { LandingHeader } from "@/components/landing/landing-header"
import { LandingFooter } from "@/components/landing/landing-footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Award, BarChart, Clock, Globe, Heart, Shield, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Mission</h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    At StockMaster, we're on a mission to revolutionize inventory management for businesses of all
                    sizes. We believe that efficient inventory control should be accessible, intuitive, and powerful.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/contact">
                    <Button size="lg">Contact Us</Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button size="lg" variant="outline">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative aspect-video overflow-hidden rounded-xl border bg-background p-2 shadow-xl">
                  <img
                    src="/placeholder.svg?height=550&width=850"
                    alt="StockMaster Team"
                    width={550}
                    height={310}
                    className="mx-auto rounded-md object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Story</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Founded in 2018, StockMaster began with a simple idea: to create an inventory management solution that
                  businesses would actually love to use. Our founders, experienced entrepreneurs themselves, were
                  frustrated with the clunky, outdated inventory systems available on the market.
                </p>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  What started as a small team of three has now grown into a global company serving thousands of
                  businesses across 40+ countries. Our platform has evolved based on real customer feedback, ensuring
                  that every feature we add solves a genuine problem.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Values</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  These core principles guide everything we do at StockMaster.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center">
                <Users className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Customer First</h3>
                <p className="text-sm text-muted-foreground">
                  We prioritize our customers' needs in every decision we make.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center">
                <Shield className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Security & Trust</h3>
                <p className="text-sm text-muted-foreground">
                  We protect your data with the highest security standards.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center">
                <Clock className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Efficiency</h3>
                <p className="text-sm text-muted-foreground">
                  We're obsessed with making inventory management faster and easier.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center">
                <BarChart className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Data-Driven</h3>
                <p className="text-sm text-muted-foreground">
                  We believe in the power of analytics to transform businesses.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center">
                <Globe className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Global Perspective</h3>
                <p className="text-sm text-muted-foreground">We build solutions that work for businesses worldwide.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center">
                <Heart className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Passion</h3>
                <p className="text-sm text-muted-foreground">
                  We're passionate about helping businesses succeed through better inventory management.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Leadership Team</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Meet the people driving StockMaster's vision forward.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative h-40 w-40 overflow-hidden rounded-full">
                  <img
                    src="/placeholder.svg?height=160&width=160"
                    alt="CEO"
                    className="object-cover"
                    width={160}
                    height={160}
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold">Olga Umurungii</h3>
                  <p className="text-sm text-muted-foreground">CEO & Founder</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="relative h-40 w-40 overflow-hidden rounded-full">
                  <img
                    src="/placeholder.svg?height=160&width=160"
                    alt="CTO"
                    className="object-cover"
                    width={160}
                    height={160}
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold">Michael Chen</h3>
                  <p className="text-sm text-muted-foreground">CTO</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="relative h-40 w-40 overflow-hidden rounded-full">
                  <img
                    src="/placeholder.svg?height=160&width=160"
                    alt="COO"
                    className="object-cover"
                    width={160}
                    height={160}
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold">Sarah Johnson</h3>
                  <p className="text-sm text-muted-foreground">COO</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Awards */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Awards & Recognition</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We're proud to be recognized for our innovation and excellence.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center">
                <Award className="h-12 w-12 text-primary" />
                <h3 className="text-lg font-bold">Best SaaS Product 2022</h3>
                <p className="text-sm text-muted-foreground">SaaS Awards</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center">
                <Award className="h-12 w-12 text-primary" />
                <h3 className="text-lg font-bold">Top 50 Startups 2021</h3>
                <p className="text-sm text-muted-foreground">Tech Innovators</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center">
                <Award className="h-12 w-12 text-primary" />
                <h3 className="text-lg font-bold">Excellence in UX 2023</h3>
                <p className="text-sm text-muted-foreground">Design Awards</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center">
                <Award className="h-12 w-12 text-primary" />
                <h3 className="text-lg font-bold">Customer Choice 2023</h3>
                <p className="text-sm text-muted-foreground">Business Software Reviews</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  )
}
