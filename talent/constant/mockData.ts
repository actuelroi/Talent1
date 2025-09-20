// Updated mockData.ts with Unsplash images
export interface Company {
  id: number
  name: string
  title: string
  contract: string
  time: string
  location: string
  image: string
  logo: string
  description: string
  offer: string
  tags?: string[]
  salary?: number
}

export const companiesData: Company[] = [
  {
    id: 1,
    name: "TechVision",
    title: "Data Analyste",
    contract: "CDI",
    time: "il y'a 2 min",
    location: "Abidjan, Plateau",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    description: "TechVision est une startup spécialisée en analyse de données dans le secteur médical.",
    offer: "Analyser des jeux de données patients, travailler avec les équipes produit et IA.",
    tags: ["technologie", "sante"],
    salary: 2300
  },
  {
    id: 2,
    name: "InnoSoft",
    title: "Développeur Full-Stack",
    contract: "Stage",
    location: "Korogo, CI",
    time: "il y'a 1 jours",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    logo: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    description: "InnoSoft développe des solutions SaaS pour les PME européennes.",
    offer: "Participation à la refonte d'une plateforme en Next.js et Node.js.",
    tags: ["technologie", "informatique"],
    salary: 1200
  },
  {
    id: 3,
    name: "DataCorp",
    title: "Data Scientist",
    contract: "Freelance",
    time: "il y'a 12 heures",
    location: "Remote",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    logo: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    description: "DataCorp accompagne les grands groupes dans la transformation IA.",
    offer: "Création de modèles prédictifs pour la finance et l'énergie.",
    tags: ["technologie", "finance"],
    salary: 3500
  },
  {
    id: 4,
    name: "WebCraft",
    title: "UI/UX Designer",
    contract: "CDI",
    time: "il y'a 3 heures",
    location: "Paris, France",
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    logo: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    description: "WebCraft est une agence de design spécialisée dans les interfaces utilisateur modernes.",
    offer: "Concevoir des interfaces utilisateur pour des applications web et mobiles.",
    tags: ["design", "technologie"],
    salary: 2800
  },
  {
    id: 5,
    name: "CloudSolutions",
    title: "DevOps Engineer",
    contract: "CDD",
    time: "il y'a 1 jour",
    location: "Lyon, France",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    logo: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    description: "CloudSolutions fournit des services d'infrastructure cloud pour les entreprises.",
    offer: "Automatiser les déploiements et maintenir l'infrastructure cloud.",
    tags: ["technologie", "informatique"],
    salary: 3200
  },
  {
    id: 6,
    name: "HealthTech",
    title: "Ingénieur Biomédical",
    contract: "CDI",
    time: "il y'a 5 heures",
    location: "Genève, Suisse",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    description: "HealthTech développe des équipements médicaux innovants.",
    offer: "Concevoir et tester de nouveaux équipements médicaux.",
    tags: ["sante", "technologie"],
    salary: 4200
  },
  {
    id: 7,
    name: "EduPlus",
    title: "Formateur Digital",
    contract: "Freelance",
    time: "il y'a 2 jours",
    location: "Remote",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    logo: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    description: "EduPlus propose des formations en ligne sur les technologies digitales.",
    offer: "Créer et animer des formations en ligne sur les outils numériques.",
    tags: ["education", "technologie"],
    salary: 1800
  },
  {
    id: 8,
    name: "GreenEnergy",
    title: "Ingénieur Énergies Renouvelables",
    contract: "CDI",
    time: "il y'a 4 heures",
    location: "Nantes, France",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    logo: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    description: "GreenEnergy développe des solutions d'énergie renouvelable pour les particuliers et entreprises.",
    offer: "Concevoir et optimiser des systèmes d'énergie solaire et éolienne.",
    tags: ["technologie", "energy"],
    salary: 3100
  },
  {
    id: 9,
    name: "FinTechPro",
    title: "Analyste Financier",
    contract: "CDI",
    time: "il y'a 6 heures",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    description: "FinTechPro développe des solutions innovantes pour le secteur bancaire.",
    offer: "Analyser les données financières et développer des modèles prédictifs.",
    tags: ["finance", "technologie"],
    salary: 3800
  }
]