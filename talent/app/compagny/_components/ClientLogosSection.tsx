export default function ClientLogosSection() {
  const clients = [
    { name: "L'Oréal", industry: "Cosmétique, E-commerce, Luxe", location: "Clichy" },
    { name: "Nespresso", industry: "Distribution sélective, E-commerce, Grande consommation", location: "Issy-Les-Moulineaux" },
    { name: "Oval", industry: "Evénementiel, Marketing / Communication, Publicité", location: "Paris" },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ils remettent l'enthousiasme au coeur du travail avec nous
          </h2>
          <p className="text-xl text-gray-600">
            Rejoignez plus de 5500 entreprises clientes de toutes tailles et industries qui construisent leurs équipes avec nous.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {clients.map((client, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="h-16 w-16 mx-auto bg-gray-300 rounded-full mb-4 flex items-center justify-center">
                {client.name.charAt(0)}
              </div>
              <h3 className="font-bold text-lg mb-2">{client.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{client.industry}</p>
              <p className="text-gray-500 text-sm">{client.location}</p>
              <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
                Voir le profil
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            Voir notre sélection de vitrines
          </button>
        </div>
      </div>
    </section>
  )
}