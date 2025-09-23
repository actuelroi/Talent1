
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  RiStoreLine, 
  RiFlaskLine, 
  RiSettingsLine, 
  RiComputerLine, 
  RiLineChartLine,
  RiUserHeartLine,
  RiMegaphoneLine,
  RiArrowRightLine,
  RiPlayLine,
  RiTeamLine
} from '@remixicon/react';
import Image from 'next/image';
import { useState } from 'react';

const metiers = [
  {
    id: 'retail',
    title: 'RETAIL',
    icon: RiStoreLine,
    color: 'bg-purple-100 text-purple-600',
    description: 'La convergence des mondes online et offline modifie l\'expérience de vente de nos clients du monde entier.',
    fullDescription: `La réalité augmentée, l'intelligence artificielle et le big data améliorent l'expérience du consommateur tout en mettant l'accent sur la connaissance et le service client.

Notre objectif principal est d'offrir aux clients une expérience personnalisée, et ce, quel que soit le canal de distribution. Nos équipes veillent à ce que les clients du monde entier vivent une expérience inoubliable à chaque fois qu'ils entrent dans l'une de nos boutiques.`,
    testimonials: [
      {
        name: 'Renaud',
        role: 'Retail Marketing - L\'Oréal Groupe',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        video: true
      },
      {
        name: 'Viken',
        role: 'Chef de Projet Retail Education - L\'Oréal Groupe',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        video: true
      }
    ],
    openPositions: 23
  },
  {
    id: 'recherche-innovation',
    title: 'RECHERCHE & INNOVATION',
    icon: RiFlaskLine,
    color: 'bg-blue-100 text-blue-600',
    description: 'Depuis plus de cent ans, L\'Oréal opère selon l\'idée que la beauté a besoin de la science.',
    fullDescription: `Dans un monde désormais transformé par l'accélération digitale et l'émergence de nouveaux domaines scientifiques, nous sommes confiants dans notre capacité à transformer ces nouvelles opportunités en innovations disruptives, étroitement liées aux nouvelles attentes des consommateurs du monde entier. La science et la technologie nous permettent d'inventer des produits et des expériences de beauté sûrs, fiables, durables et responsables qui changeront la vie des gens.

L'Oréal Recherche & Innovation n'a cessé d'investir dans sa recherche avec un très haut niveau d'ambition, avec plus de 4 000 collaborateurs au sein de la R&I dans le monde entier.`,
    testimonials: [
      {
        name: 'Thomas',
        role: 'Manager évaluation intelligence - L\'Oréal Groupe',
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
        video: true
      }
    ],
    openPositions: 45
  },
  {
    id: 'operations',
    title: 'OPÉRATIONS',
    icon: RiSettingsLine,
    color: 'bg-green-100 text-green-600',
    description: 'Nos 22 000 collaborateurs créent ensemble une beauté innovante, inclusive et durable.',
    fullDescription: `Au sein des Opérations chez L'Oréal, nos 22 000 collaborateurs à travers le monde créent ensemble une beauté innovante, inclusive et durable en collaboration avec nos partenaires. Nous concevons, développons, sourçons, fabriquons et proposons plus de 7 milliards de produits par an, partout dans le monde.

Orientés vers les consommateurs, nous agissons de manière responsable tout au long de la chaîne de valeur, favorisant les solutions les plus agiles et efficaces, et aspirant à l'excellence grâce à la technologie.`,
    subcategories: [
      {
        title: 'Supply Chain',
        description: 'Avec les demandes croissantes des distributeurs et des consommateurs et la croissance du e-commerce, la supply chain est devenue un moteur d\'activité.',
        testimonials: [
          {
            name: 'Terrence',
            role: 'Sales & Operations Planner',
            quote: 'My job at L\'Oréal is a blend of challenges and excitement.',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'
          }
        ]
      },
      {
        title: 'Achats',
        description: 'Nous nous approvisionnons auprès des fournisseurs dans différents domaines avec des partenaires experts.',
        testimonials: [
          {
            name: 'Joséphine',
            role: 'Packaging sourcing buyer',
            quote: 'Chez L\'Oréal, on donne la voix à chacun.',
            image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face'
          }
        ]
      },
      {
        title: 'Manufacturing',
        description: 'Nos équipes s\'efforcent de fournir les meilleurs référentiels, processus, outils et pratiques pour aider nos usines à performer.',
        testimonials: [
          {
            name: 'Corentin',
            role: 'Animateur de fabrication',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
            video: true
          }
        ]
      }
    ],
    openPositions: 67
  },
  {
    id: 'beauty-tech',
    title: 'BEAUTY TECH',
    icon: RiComputerLine,
    color: 'bg-orange-100 text-orange-600',
    description: 'Au cœur de la stratégie Tech de L\'Oréal se trouve une volonté de personnalisation et d\'inclusion.',
    fullDescription: `La Beauty Tech témoigne de l'engagement de la société à repousser les limites de l'innovation dans l'industrie de la beauté, en ouvrant la voie à la création de solutions de beauté hautement personnalisées et inclusives.`,
    subcategories: [
      {
        title: 'IT',
        description: 'Nos équipes IT conçoivent et développent des solutions garantissant de très hautes performances dans tous nos secteurs d\'activité.',
        testimonials: [
          {
            name: 'Moutia',
            role: 'Tech Lead',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            video: true
          }
        ]
      },
      {
        title: 'DATA',
        description: 'L\'Oréal continue à recruter de nombreux esprits diversifiés, innovants, compétents et passionnés dans différents domaines technologiques.',
        testimonials: [
          {
            name: 'Thelma',
            role: 'Data & Analytics Product Owner',
            quote: 'Nous nous assurons du bon cycle de vie de la donnée : de l\'acquisition et de l\'organisation de la donnée, puis la mettre à disposition pour les différents métiers au sein du Groupe.',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
          }
        ]
      }
    ],
    innovations: [
      {
        title: 'HAPTA',
        description: 'Le premier applicateur de maquillage portable et informatisé au monde.',
        image: '/api/placeholder/300/200'
      },
      {
        title: 'Water Saver',
        description: 'La première douchette utilisant la technologie brevetée de fragmentation de l\'eau pour économiser jusqu\'à 69% d\'eau.',
        image: '/api/placeholder/300/200'
      }
    ],
    openPositions: 89
  },
  {
    id: 'finance-legal-rh-rse',
    title: 'FINANCE, LEGAL, RH & RSE',
    icon: RiLineChartLine,
    color: 'bg-red-100 text-red-600',
    description: 'Soutenir la croissance et la durabilité de l\'entreprise en transformant les données en informations stratégiques.',
    fullDescription: `La mission des métiers de Finance, RH, Legal et RSE est de soutenir la croissance et la durabilité de l'entreprise en transformant les données en informations stratégiques, en recrutant et développant les talents, en gérant les aspects légaux et les relations sociales, tout en promouvant une culture d'innovation et de croissance.`,
    subcategories: [
      {
        title: 'Finance',
        description: 'Nos équipes en Finance transforment la data en informations et l\'analyse des risques en solutions.',
        testimonials: [
          {
            name: 'Jean-Daniel',
            role: 'Responsable tarification',
            quote: 'Nous accompagnons les marques dans leur lancement de nouveaux produits afin de nourrir une croissance profitable pour le groupe.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
          }
        ]
      },
      {
        title: 'Relations Humaines',
        description: 'Les relations humaines ne sont pas seulement une fonction, mais un moteur de croissance et de développement des talents.',
        testimonials: [
          {
            name: 'Farah',
            role: 'Spécialiste Recrutement',
            quote: 'Ce que je préfère dans mon job c\'est tendre la main à des jeunes qui n\'auraient pas forcément oser postuler chez nous.',
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
          }
        ]
      },
      {
        title: 'RSE',
        description: 'Nos engagements s\'articulent autour de trois piliers : l\'environnement, l\'Humain, nos produits.',
        fullDescription: `L'Oréal a décidé de renforcer ses efforts RSE à travers un programme appelé L'Oréal pour le Futur. Nos engagements pour 2030 marquent le début d'une transformation plus radicale et incarnent notre vision du rôle et des responsabilités des entreprises pour relever les défis auxquels le monde fait face.`
      }
    ],
    openPositions: 34
  },
  {
    id: 'business',
    title: 'BUSINESS',
    icon: RiUserHeartLine,
    color: 'bg-pink-100 text-pink-600',
    description: 'Au cœur du réacteur de L\'Oréal, les équipes business créent des stratégies impactantes.',
    fullDescription: `Au cœur du réacteur de L'Oréal, les équipes business créent des stratégies impactantes, développent des campagnes innovantes, génèrent des ventes et renforcent la présence de L'Oréal sur le marché. Ensemble, ils façonnent l'image du groupe et contribuent au succès international du Groupe.`,
    subcategories: [
      {
        title: 'Marketing',
        description: 'Dans le développement marketing, vous êtes au cœur de la création de concepts.',
        testimonials: [
          {
            name: 'Vincent',
            role: 'Chef de Projet International',
            quote: 'Pour développer des produits toujours nouveaux, meilleurs et différents, curiosité et créativité sont essentielles au quotidien.',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
          }
        ]
      },
      {
        title: 'Communication',
        description: 'Qu\'il s\'agisse de communiquer avec les 86 000 talents de L\'Oréal ou de gérer l\'e-réputation.',
        fullDescription: `Qu'il s'agisse de communiquer avec les 86 000 talents de L'Oréal, de gérer l'e-réputation, de créer des campagnes ou d'organiser la prochaine conférence de presse pour l'une de nos 37 marques internationales, nos équipes de communication sont présentes partout : de la relation presse, à l'influence, en passant par l'évènementiel et les réseaux sociaux.`
      },
      {
        title: 'Digital',
        description: 'Au sein des équipes Digital & e-commerce, vous ferez partie d\'un environnement dynamique.',
        testimonials: [
          {
            name: 'Charles',
            role: 'Responsable Social Insights',
            quote: 'Ce que je préfère dans mon job c\'est l\'innovation et la motivation des gens qui m\'entourent, qui me permettent de créer des projets complètement fous.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
          }
        ]
      },
      {
        title: 'Sales',
        description: 'Au coeur du moteur de L\'Oréal, la filière commerciale offre de nombreuses opportunités.',
        fullDescription: `Au coeur du moteur de L'Oréal, la filière commerciale offre de nombreuses opportunités. En tant qu'Assistant Compte Clé, vous serez au plus près des négociations avec nos clients. Vous serez au cœur de l'actualité business de nos marques, au sein même d'une équipe chargée de négocier les accords commerciaux avec nos clients et de construire la stratégie commerciale de nos marques.`
      }
    ],
    openPositions: 56
  }
];

export default function MetiersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container max-w-7xl mx-auto px-4 py-12">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Métiers
            </h1>
            <p className="text-xl text-gray-600">
              Découvrez la diversité des métiers qui font de L'Oréal un leader mondial de la beauté. 
              Rejoignez nos équipes passionnées et participez à la création de la beauté de demain.
            </p>
          </div>
        </div>
      </div>

      {/* Métiers Grid */}
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid gap-8">
          {metiers.map((metier) => (
            <MetierSection key={metier.id} metier={metier} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MetierSection({ metier }: { metier: typeof metiers[0] }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        {/* Header */}
        <div 
          className="p-8 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-6">
              <div className={`p-3 rounded-lg ${metier.color}`}>
                <metier.icon className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {metier.title}
                </h2>
                <p className="text-gray-600 text-lg mb-4">
                  {metier.description}
                </p>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {metier.openPositions} postes ouverts
                </Badge>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <RiArrowRightLine className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="px-8 pb-8 border-t">
            <div className="pt-6">
              {/* Main Description */}
              <div className="prose prose-lg max-w-none mb-8">
                {metier.fullDescription.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Subcategories */}
              {metier.subcategories && (
                <div className="grid gap-6 mb-8">
                  {metier.subcategories.map((subcategory, index) => (
                    <div key={index} className="border-l-4 border-blue-200 pl-4">
                      <h3 className="text-xl font-semibold mb-2">{subcategory.title}</h3>
                      <p className="text-gray-600 mb-4">{subcategory.description}</p>
                      
                      {subcategory.description && (
                        <p className="text-gray-700 mb-4">{subcategory.description}</p>
                      )}

                      {subcategory.testimonials && (
                        <div className="grid gap-4">
                          {subcategory.testimonials.map((testimonial, tIndex) => (
                            <TestimonialCard key={tIndex} testimonial={testimonial} />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Innovations */}
              {metier.innovations && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Nos Innovations</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {metier.innovations.map((innovation, index) => (
                      <Card key={index}>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <RiTeamLine className="h-8 w-8 text-gray-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">{innovation.title}</h4>
                              <p className="text-gray-600 text-sm">{innovation.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Testimonials */}
              {metier.testimonials && !metier.subcategories && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Rencontrez nos experts</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {metier.testimonials.map((testimonial, index) => (
                      <TestimonialCard key={index} testimonial={testimonial} />
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="flex justify-between items-center pt-6 border-t">
                <div>
                  <h4 className="font-semibold mb-2">Intéressé par ce métier ?</h4>
                  <p className="text-gray-600">Postulez à nos offres en {metier.title.split(' ')[0]}</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Voir les offres
                  <RiArrowRightLine className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function TestimonialCard({ testimonial }: { testimonial: any }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-semibold">{testimonial.name}</h4>
              {testimonial.video && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <RiPlayLine className="h-3 w-3" />
                  Vidéo
                </Badge>
              )}
            </div>
            <p className="text-gray-600 text-sm mb-2">{testimonial.role}</p>
            {testimonial.quote && (
              <blockquote className="text-gray-700 text-sm italic border-l-2 border-blue-200 pl-3">
                "{testimonial.quote}"
              </blockquote>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}