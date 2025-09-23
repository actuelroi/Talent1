export default function FooterSection() {
  const footerLinks = {
    offers: [
      { name: "Marque employeur", href: "#" },
      { name: "Recrutement", href: "#" },
      { name: "Expérience candidat", href: "#" },
      { name: "Sourcing de Talents", href: "#" },
      { name: "Toutes nos offres", href: "#" },
      { name: "Agences partenaires", href: "#" },
      { name: "Outils partenaires", href: "#" },
    ],
    clients: [
      { name: "Vitrine", href: "#" },
      { name: "Témoignages", href: "#" },
      { name: "Tous nos clients", href: "#" },
    ],
    resources: [
      { name: "Marque Employeur", href: "#" },
      { name: "Recrutement", href: "#" },
      { name: "Outils RH", href: "#" },
      { name: "Tendance RH", href: "#" },
      { name: "Toutes nos ressources", href: "#" },
      { name: "Tous nos formats", href: "#" },
    ],
    company: [
      { name: "À propos", href: "#" },
      { name: "Espace presse", href: "#" },
      { name: "Nous rejoindre", href: "#" },
    ],
    help: [
      { name: "Centre d'aide", href: "#" },
      { name: "Contactez le support", href: "#" },
    ],
  }

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <h3 className="font-bold text-lg mb-4">Talent Solutions</h3>
            <p className="text-gray-400 mb-6">
              La solution complète pour transformer votre recrutement et votre marque employeur.
            </p>
            <div className="flex space-x-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Talent - Espace support</h4>
                <p className="text-gray-400 text-sm mb-2">
                  Si vous êtes déjà client et vous souhaitez échanger avec un membre de notre équipe support.
                </p>
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                  Accéder
                </button>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Talent - Espace presse</h4>
                <p className="text-gray-400 text-sm mb-2">
                  Si vous êtes un journaliste à la recherche d'informations, ou si vous souhaitez recevoir nos communiqués de presse.
                </p>
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                  Accéder
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Nos offres</h4>
            <ul className="space-y-2">
              {footerLinks.offers.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Nos clients</h4>
            <ul className="space-y-2">
              {footerLinks.clients.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            <h4 className="font-medium mb-4 mt-6">Nos ressources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Entreprise</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            <h4 className="font-medium mb-4 mt-6">Aide</h4>
            <ul className="space-y-2">
              {footerLinks.help.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © 2025 Talent Solutions
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Politique de confidentialité</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Conditions d'utilisation</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Mentions légales</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Gestion des cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}