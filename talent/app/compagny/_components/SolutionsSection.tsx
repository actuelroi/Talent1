import { Button } from "@/components/ui/button"

export default function SolutionsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Des solutions pour vos recrutements prioritaires
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nos solutions vous permettent de suivre vos performances en matière de recrutement et de booster les offres de votre choix, en toute flexibilité.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-4">Publiez et modifiez vos offres en illimité</h3>
            <p className="text-gray-600 mb-4">
              Gérez toutes vos offres d'emploi sans restriction et adaptez-les en temps réel selon vos besoins.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-4">Apparaissez en haut des résultats de recherche pendant 1 mois</h3>
            <p className="text-gray-600 mb-4">
              Augmentez votre visibilité et attirez plus de candidats qualifiés pour vos postes prioritaires.
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Demander une démo
          </Button>
        </div>
      </div>
    </section>
  )
}