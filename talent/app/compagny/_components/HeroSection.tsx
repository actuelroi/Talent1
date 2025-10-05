import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-blue-50 to-white">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Recrutez les talents faits pour vous grâce à notre expertise de la marque employeur
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Votre solution pour améliorer votre attractivité, votre visibilité et votre impact pour recruter les bons talents.
            </p>
            <Link href="/register">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Ajouter votre entreprise
            </Button>
            </Link>
          </div>
          <div className="md:w-1/2">
            <div className="bg-gray-200 rounded-xl aspect-video flex items-center justify-center">
              <span className="text-gray-500">Image placeholder - Company recruitment scene</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}