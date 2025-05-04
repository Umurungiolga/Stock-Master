import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { LandingHeader } from "@/components/landing/landing-header"
import { LandingFooter } from "@/components/landing/landing-footer"

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the perfect plan for your business needs. No hidden fees or surprises.
                </p>
              </div>
            </div>
            <div className="grid gap-6 pt-12 lg:grid-cols-3 lg:gap-8">
              {/* Basic Plan */}
              <div className="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
                <div className="p-6 pt-8">
                  <h3 className="text-xl font-bold">Basic</h3>
                  <div className="mt-4 flex items-baseline text-gray-900 dark:text-gray-50">
                    <span className="text-3xl font-bold tracking-tight">$29</span>
                    <span className="ml-1 text-xl font-semibold">/month</span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Perfect for small businesses just getting started with inventory management.
                  </p>
                </div>
                <div className="flex flex-1 flex-col p-6 pt-0">
                  <ul className="mb-6 space-y-2 text-sm">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Up to 500 products</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Basic analytics</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>2 user accounts</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Email support</span>
                    </li>
                  </ul>
                  <Link href="/auth/signup" className="mt-auto">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="relative flex flex-col rounded-lg border-2 border-primary bg-card text-card-foreground shadow-md transition-all hover:shadow-lg">
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most Popular
                </div>
                <div className="p-6 pt-8">
                  <h3 className="text-xl font-bold">Professional</h3>
                  <div className="mt-4 flex items-baseline text-gray-900 dark:text-gray-50">
                    <span className="text-3xl font-bold tracking-tight">$79</span>
                    <span className="ml-1 text-xl font-semibold">/month</span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Ideal for growing businesses with more complex inventory needs.
                  </p>
                </div>
                <div className="flex flex-1 flex-col p-6 pt-0">
                  <ul className="mb-6 space-y-2 text-sm">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Up to 5,000 products</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Advanced analytics</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>10 user accounts</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Priority email & chat support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>API access</span>
                    </li>
                  </ul>
                  <Link href="/auth/signup" className="mt-auto">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
                <div className="p-6 pt-8">
                  <h3 className="text-xl font-bold">Enterprise</h3>
                  <div className="mt-4 flex items-baseline text-gray-900 dark:text-gray-50">
                    <span className="text-3xl font-bold tracking-tight">$199</span>
                    <span className="ml-1 text-xl font-semibold">/month</span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    For large businesses with extensive inventory management requirements.
                  </p>
                </div>
                <div className="flex flex-1 flex-col p-6 pt-0">
                  <ul className="mb-6 space-y-2 text-sm">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Unlimited products</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Custom analytics & reporting</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Unlimited user accounts</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>24/7 phone, email & chat support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Advanced API access</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Dedicated account manager</span>
                    </li>
                  </ul>
                  <Link href="/auth/signup" className="mt-auto">
                    <Button className="w-full">Contact Sales</Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
              </div>
              <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
                <div className="rounded-lg border p-6">
                  <h3 className="text-lg font-medium">Can I upgrade or downgrade my plan?</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next
                    billing cycle.
                  </p>
                </div>
                <div className="rounded-lg border p-6">
                  <h3 className="text-lg font-medium">Is there a free trial available?</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Yes, we offer a 14-day free trial for all plans. No credit card required.
                  </p>
                </div>
                <div className="rounded-lg border p-6">
                  <h3 className="text-lg font-medium">What payment methods do you accept?</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
                  </p>
                </div>
                <div className="rounded-lg border p-6">
                  <h3 className="text-lg font-medium">Can I get a custom plan for my business?</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Contact our sales team to discuss your specific requirements and we'll create a tailored solution
                    for you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  )
}
