import { Button } from "@/components/ui/button"

export default function EmployerBrandSection() {
  const features = [
    "plus de 12 000 tournages depuis nos débuts",
    "La production personnalisée des photos et interviews",
    "Une mise en page adaptée aux attentes des candidats",
  ]

  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">
              Notre expertise de la marque employeur à votre service
            </h2>
            <p className="mb-8 opacity-90">
              Votre univers capturé par les yeux experts de nos équipes de production : un design moderne, une navigation fluide et des contenus uniques pour une expérience candidat humaine et attrayante.
            </p>
            
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Demander une démo
            </Button>
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-blue-700 rounded-xl aspect-video flex items-center justify-center">
              <span className="text-blue-200">Expertise marque employeur visualization</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}