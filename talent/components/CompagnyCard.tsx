import React from "react"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { section } from "motion/react-client"
import { ClockFading, LocateFixed, LocateIcon, MapPin, Timer } from "lucide-react"

const companies = [
    {
        id: 1,
        name: "TechVision",
        title: "Data Analyste",
        contract: "CDI",
        time: "il y'a 2 min",
        location: "Paris, France",
        image: "/images/im1.jpg",
        logo: "/images/im2.jpg",
        description: "TechVision est une startup spécialisée en analyse de données dans le secteur médical.",
        offer: "Analyser des jeux de données patients, travailler avec les équipes produit et IA."
    },
    {
        id: 2,
        name: "InnoSoft",
        title: "Développeur Full-Stack",
        contract: "Stage",
        location: "Lyon, France",
        time: "il y'a 1 jours",
        image: "/images/im3.jpg",
        logo: "/images/im1.jpg",
        description: "InnoSoft développe des solutions SaaS pour les PME européennes.",
        offer: "Participation à la refonte d'une plateforme en Next.js et Node.js."
    },
    {
        id: 3,
        name: "DataCorp",
        title: "Data Scientist",
        contract: "Freelance",
        time: "il y'a 12 heures",
        location: "Remote",
        image: "/images/im4.jpg",
        logo: "/images/im4.jpg",
        description: "DataCorp accompagne les grands groupes dans la transformation IA.",
        offer: "Création de modèles prédictifs pour la finance et l'énergie."
    }
]

const CompagnyCard = () => {
    return (
        <section >
            <h1 className="font-semibold text-2xl p-3">Decouvez les offres</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
                {companies.map((company) => (
                    <Card key={company.id} className="overflow-hidden shadow-lg">
                        <CardContent className="p-4 space-y-4">
                            <div className="relative w-full h-40 rounded-md overflow-hidden">
                                <Image
                                    src={company.image}
                                    alt={company.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <Image
                                    src={company.logo}
                                    alt={`${company.name} Logo`}
                                    width={64}
                                    height={64}
                                    className="rounded-full object-contain"
                                />
                                <div className="flex flex-row items-center justify-between gap-3">
                                    <div>
                                        <p className="text-lg font-semibold">{company.title}</p>
                                        <div className="flex items-center gap-1">
                                            <p className="text-sm text-gray-500">{company.contract}- </p>
                                            <MapPin size={12} color="red" />
                                            <p className="text-sm text-gray-500">{company.location}</p>

                                        </div>

                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <ClockFading size={12} />
                                        <p>{company.time}</p>

                                    </div>
                                </div>

                            </div>
                            <h2 className="text-xl font-bold">Nous recherchons un {company.title}</h2>
                            <div className="space-y-2 text-sm text-gray-700">
                                <div>
                                    <h4 className="font-semibold">Description de l'entreprise</h4>
                                    <p>{company.description}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">L'offre</h3>
                                    <p>{company.offer}</p>
                                </div>
                            </div>
                            <Button className="mt-2">Voir plus</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="flex justify-center items-center">
                <Button value="Secondary" className=" mt-4 cursor-pointer">Voir plus d'offres</Button>
            </div>
        </section>
    )
}

export default CompagnyCard
