import { Button } from "@/components/ui/button"

export default function TalentSourcingSection() {
  const stats = [
    { value: "+600 000", label: "talents en recherche active" },
    { value: "+30%", label: "de nouveaux membres chaque mois" },
    { value: "40%", label: "de taux de réponse" },
    { value: "1 talent contacté sur 3", label: "répond positivement au premier message" },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Nouveauté : le Sourcing de Talents
            </h2>
            <p className="text-gray-600 mb-6">
              Un outil de Sourcing de Talents, enrichi par l'IA, qui met en avant votre marque employeur pour créer des conversations plus engageantes et des recrutements plus efficaces.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <p className="text-gray-600 mb-6 font-medium">
              Une intégration fluide avec votre ATS
            </p>
            
            <Button className="bg-blue-600 hover:bg-blue-700">
              Découvrir la solution
            </Button>
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-gray-200 rounded-xl aspect-video flex items-center justify-center">
              <span className="text-gray-500">Matching candidat sourcing visualization</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}