import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Monitor, Users, BarChart3, Shield } from "lucide-react"

const features = [
  {
    icon: <Monitor className="h-10 w-10" />,
    title: "Employer Branding",
    description: "Showcase your company culture and attract the right candidates with our customizable career pages."
  },
  {
    icon: <Users className="h-10 w-10" />,
    title: "Candidate Sourcing",
    description: "Find and connect with qualified candidates through our extensive talent database and AI-powered matching."
  },
  {
    icon: <BarChart3 className="h-10 w-10" />,
    title: "Analytics & Reporting",
    description: "Make data-driven decisions with comprehensive analytics on your recruitment funnel and performance metrics."
  },
  {
    icon: <Shield className="h-10 w-10" />,
    title: "Compliance Tools",
    description: "Stay compliant with local regulations and ensure fair hiring practices with our built-in compliance features."
  }
]

export default function FeaturesSection() {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Powerful Recruitment Solutions</h2>
        <p className="mt-4 text-muted-foreground">
          Our comprehensive platform provides everything you need to streamline your hiring process and find the best talent.
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {features.map((feature, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <div className="mb-4 flex justify-center">
                {feature.icon}
              </div>
              <CardTitle className="text-center">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}