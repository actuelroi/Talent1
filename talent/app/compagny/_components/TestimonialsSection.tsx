import { Card, CardContent, CardHeader } from "@/components/ui/card"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "HR Director at TechCorp",
    content: "Welcome to the Jungle Solutions has transformed our recruitment process. We've reduced time-to-hire by 40% and improved candidate quality significantly.",
    avatar: "/avatars/sarah.jpg" // This would be a real path in a real app
  },
  {
    name: "Michael Chen",
    role: "Talent Acquisition Manager at StartupCo",
    content: "The analytics dashboard alone is worth the investment. We now have clear insights into our hiring funnel and can make data-driven decisions.",
    avatar: "/avatars/michael.jpg"
  },
  {
    name: "Emily Rodriguez",
    role: "CEO at GrowthLab",
    content: "As a growing company, we needed a recruitment platform that could scale with us. Welcome to the Jungle Solutions has been the perfect partner in our growth journey.",
    avatar: "/avatars/emily.jpg"
  }
]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="container py-24 sm:py-32 bg-muted/50">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Trusted by Leading Companies</h2>
        <p className="mt-4 text-muted-foreground">
          Hear from companies that have transformed their recruitment with our solutions.
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="italic">"{testimonial.content}"</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}