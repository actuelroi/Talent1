export default function ShowcaseSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Racontez votre histoire et donnez envie aux talents d'en faire partie
          </h2>
          <p className="text-xl text-gray-600">
            Votre vitrine sur Welcome to the Jungle permet de convaincre les talents faits pour vous de vous rejoindre.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-gray-100 rounded-lg overflow-hidden">
              <div className="h-48 bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500">Company showcase {item}</span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Nom de l'entreprise</h3>
                <p className="text-gray-600 text-sm mb-2">Industrie, Secteur</p>
                <p className="text-gray-500 text-sm mb-4">Localisation</p>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Voir le profil
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            Voir notre sélection de vitrines
          </button>
        </div>
      </div>
    </section>
  )
}