// src/app/companies/l-oreal/page.tsx
import Header from "@/components/Header";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Calendar, DollarSign, Scale } from "lucide-react";
import Image from "next/image";
import FooterSection from "../_components/FooterSection";

export default function LorealPage() {
  // Sample employee testimonials
  const employees = [
    {
      name: "Viken",
      role: "Chef de Projet Retail Education",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Renaud",
      role: "Retail Marketing",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Corentin",
      role: "Animateur de fabrication",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Oleasia",
      role: "Data Scientist",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ];

  // Sample job openings
  const jobs = [
    {
      title: "6 month internship - Luxe division Customer Care Projects - L'Oréal Distribution Center",
      type: "Stage",
      location: "Orleans",
      remote: true
    },
    {
      title: "STAGE 6 MOIS - MARKETING - DERMATOLOGICAL BEAUTY DIVISION",
      type: "Stage",
      location: "Levallois-Perret",
      remote: true
    },
    {
      title: "CDI - Technicien(ne) de recherche en analyse physicochimique",
      type: "CDI",
      location: "Aulnay",
      remote: true
    }
  ];

  // Benefits
  const benefits = [
    "Accès à la Vente Au Personnel à des tarifs préférentiels",
    "Télétravail ponctuel autorisé",
    "Accès à la cantine",
    "Accès à L'Oréal Learning Platform pour booster votre développement"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Company Header */}
        <section className="bg-gradient-to-r from-pink-50 to-purple-50 py-12">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="w-32 h-32 bg-white rounded-lg shadow-md flex items-center justify-center p-4">
                <span className="text-2xl font-bold text-gray-800">L'Oréal</span>
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900">L'Oréal Groupe</h1>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">Cosmétique</Badge>
                      <Badge variant="secondary">E-commerce</Badge>
                      <Badge variant="secondary">Luxe</Badge>
                    </div>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">Suivre</Button>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin className="h-5 w-5" />
                  <span>Abidjan-2 plataux</span>
                </div>
                
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  Voir le site
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="bg-white border-b">
          <div className="container max-w-6xl mx-auto px-4">
            <nav className="flex overflow-x-auto gap-8 py-4">
              <a href="#profil" className="whitespace-nowrap font-medium text-gray-600 hover:text-gray-900">Profil</a>
              <a href="/compagny/nos-offres" className="whitespace-nowrap font-medium text-gray-600 hover:text-gray-900">Jobs</a>
              <a href="#metiers" className="whitespace-nowrap font-medium text-gray-600 hover:text-gray-900">Métiers</a>
              <a href="#diversity" className="whitespace-nowrap font-medium text-gray-600 hover:text-gray-900">Diversité</a>
              <a href="#rse" className="whitespace-nowrap font-medium text-gray-600 hover:text-gray-900">RSE</a>
            </nav>
          </div>
        </section>

        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Company Stats */}
              <Card id="profil">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">L'Oréal Groupe en chiffres</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="flex justify-center mb-2">
                        <Calendar className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold">1909</div>
                      <div className="text-gray-600">Année de création</div>
                    </div>
                    <div className="text-center">
                      <div className="flex justify-center mb-2">
                        <Users className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold">90K</div>
                      <div className="text-gray-600">Collaborateurs</div>
                    </div>
                    <div className="text-center">
                      <div className="flex justify-center mb-2">
                        <Scale className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold">58% / 42%</div>
                      <div className="text-gray-600">Parité</div>
                    </div>
                    <div className="text-center">
                      <div className="flex justify-center mb-2">
                        <DollarSign className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold">43,48 Mds €</div>
                      <div className="text-gray-600">Chiffre d'affaires</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Employee Testimonials */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Rencontrez nos collaborateurs</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {employees.map((employee, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden">
                            <Image
                              src={employee.image}
                              alt={employee.name}
                              width={64}
                              height={64}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold">{employee.name}</h3>
                            <p className="text-gray-600 text-sm">{employee.role}</p>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full">
                          Voir le témoignage
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Company Presentation */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Présentation</h2>
                  <p className="text-gray-700 mb-4">
                    Notre Raison d'être : Créer la beauté qui fait avancer le monde.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Le désir de beauté est une force puissante qui nous fait avancer. La beauté ne se limite pas à l'apparence. 
                    Elle nous donne confiance en nous, en qui nous voulons être, et dans notre relation avec les autres.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Depuis plus d'un siècle, nous exerçons ce métier unique : créateur de beauté. Notre but est d'offrir à tous, 
                    partout dans le monde, le meilleur de la beauté en termes de qualité, d'efficacité, de sécurité et de sincérité 
                    pour satisfaire tous les besoins et désirs de beauté dans leur infinie diversité.
                  </p>
                </CardContent>
              </Card>

              {/* What They're Looking For */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Ce qu'ils recherchent</h2>
                  <p className="text-gray-700 mb-4">
                    Chez L'Oréal, chacun apporte sa pierre à l'édifice. Vos idées sont non seulement écoutées mais aussi valorisées. 
                    Nous recherchons des personnes passionnées qui ont envie de se challenger continuellement pour nous aider à créer 
                    l'avenir de la beauté.
                  </p>
                  <p className="text-gray-700">
                    Pas besoin d'être passionné de maquillage, il suffit d'avoir envie de relever des défis et d'être entrepreneur !
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Job Openings */}
              <Card id="jobs">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Derniers jobs</h2>
                  <div className="space-y-4">
                    {jobs.map((job, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h3 className="font-bold mb-2">{job.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Badge variant="outline">{job.type}</Badge>
                          <span>{job.location}</span>
                          {job.remote && <Badge variant="secondary">Télétravail fréquent</Badge>}
                        </div>
                        <Button variant="outline" className="w-full">
                          Postuler
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                    Toutes nos offres
                  </Button>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Nos avantages</h2>
                  <ul className="space-y-2">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Localisation</h2>
                  <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center mb-4">
                    <span className="text-gray-500">Carte de localisation</span>
                  </div>
                  <p className="text-gray-700">41 Rue Martre, 92110, Abidjan-2 plataux</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}