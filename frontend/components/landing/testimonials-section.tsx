import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "StockMaster has completely transformed how we manage our inventory. We've reduced stockouts by 85% and improved our order fulfillment speed.",
      author: "Sarah Johnson",
      role: "Operations Manager, TechRetail Inc.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
    },
    {
      quote:
        "The analytics features alone have saved us thousands of dollars by optimizing our inventory levels. The ROI was evident within the first month.",
      author: "Michael Chen",
      role: "CEO, Global Supplies Co.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MC",
    },
    {
      quote:
        "As a small business owner, I needed something powerful yet easy to use. StockMaster delivers exactly that, and their customer support is exceptional.",
      author: "Emily Rodriguez",
      role: "Founder, Boutique Essentials",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ER",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonials</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Trusted by Businesses Worldwide</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See what our customers have to say about how StockMaster has transformed their inventory management.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <Quote className="absolute right-4 top-4 h-8 w-8 text-muted-foreground/20" />
                <div className="flex flex-col gap-4">
                  <p className="text-muted-foreground">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                      <AvatarFallback>{testimonial.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
