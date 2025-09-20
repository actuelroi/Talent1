export default function AudienceSection() {
  const stats = [
    { value: "2,9M", label: "de visiteurs uniques par mois" },
    { value: "1M", label: "de recherches effectuées sur les offres d'emploi de nos clients" },
    { value: "1,7M", label: "d'abonnés sur nos réseaux sociaux et newsletters" },
  ]

  const testimonials = [
    {
      text: "J'aime beaucoup votre approche et la façon de présenter les entreprises. Vous nous donnez accès à un vivier de connaissances et cela nous permet en un temps réduit de se faire une idée fiable des postes et des entreprises convoitées.",
      author: "Julie, Manager Comptable"
    },
    {
      text: "Je suis hyper fan de la présentation des annonces et des profils entreprises qui nous permettent d'en savoir vraiment plus sur l'entreprise avant de postuler.",
      author: "Sébastien, Product Designer"
    },
    {
      text: "Il est facile de naviguer, de filtrer les jobs en fonction de nos critères et il y a beaucoup d'entreprises référencées, de toutes tailles, ce qui permet d'avoir un beau panel d'offres. C'est la seule plateforme de recrutement où j'ai plaisir à postuler.",
      author: "Mina, Account Manager"
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Faites découvrir votre entreprise aux candidats qui comptent
          </h2>
          <p className="text-xl text-gray-600">
            Soyez présent sur la plateforme où vos futurs candidats se trouvent !
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
        
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Une audience unique sensible à votre présence en ligne
          </h3>
          <p className="text-gray-600 text-center max-w-3xl mx-auto">
            La différence Welcome to the Jungle : vous permettre d'attirer des candidats aux profils variés et recherchés, grâce à notre forte représentation des métiers en tension.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
              <p className="font-medium text-gray-900">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}