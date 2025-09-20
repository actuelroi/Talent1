import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Et si c'était votre tour ?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Augmentez votre attractivité et recrutez en toute simplicité dès aujourd'hui.
        </p>
        <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
          Demander une démo
        </Button>
      </div>
    </section>
  )
}