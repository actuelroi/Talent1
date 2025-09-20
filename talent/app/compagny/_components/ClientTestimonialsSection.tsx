export default function ClientTestimonialsSection() {
  const testimonials = [
    {
      text: "Welcome to the Jungle est un véritable partenaire pour nous. Les deux tiers de nos candidatures sont issues de Welcome the Jungle. C'est une véritable plateforme innovante qui permet de faire rayonner TF1 différemment de ce que nous faisons en interne. Elle met en valeur l'ensemble de nos collaborateurs et de nos 150 métiers rassemblés au Groupe.",
      author: "Marine Mondelin",
      role: "Talent Acquisition Specialist"
    },
    {
      text: "L'ATS Welcome to the Jungle est notre outil principal de recrutement et les statistiques nous permettent d'aller plus loin dans notre suivi des indicateurs, comme le temps de réponse ou le nombre de candidatures.",
      author: "Greismar Zerpa et Marion Garnier",
      role: "Talent acquisition manager et Internal communications manager"
    },
    {
      text: "Welcome nous offre un vrai espace pour communiquer sur notre marque employeur grâce à la rubrique témoignages qui met en avant nos collaborateurs et notre culture d'entreprise.",
      author: "Manon Fourmont, Emmanuelle Dal Molin et Laurent Vialis",
      role: "Respectivement Chargée de communication et Relations écoles, Directrice du recrutement et Responsable Mobilité et Recrutement"
    },
    {
      text: "Welcome est l'une des seules plateformes à être à la fois un média RH, où on peut diffuser notre culture d'entreprise avec du contenu de qualité, et un jobboard où le candidat peut rejoindre l'entreprise en postulant en quelques clics.",
      author: "Camille Felician",
      role: "HR Business Partner"
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nos témoignages clients
          </h2>
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            Voir tous les témoignages
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
              <div>
                <p className="font-medium text-gray-900">{testimonial.author}</p>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}