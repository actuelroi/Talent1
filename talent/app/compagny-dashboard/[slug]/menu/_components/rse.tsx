
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  RiLeafLine, 
  RiTeamLine, 
  RiWaterFlashLine, 
  RiPlantLine, 
  RiRecycleLine,
  RiUserHeartLine,
  RiArrowRightLine,
  RiFriendicaFill,
  RiGlobalLine,
  RiLightbulbFlashLine,
  RiHeartLine,
  RiBookOpenLine
} from '@remixicon/react';

const rseData = {
  lorealPourLeFutur: {
    title: "L'ORÉAL POUR LE FUTUR",
    description: "Le Groupe L'Oréal porte la conviction que les entreprises ont un rôle concret à jouer pour faire face aux enjeux actuels.",
    fullDescription: `Le programme L'Oréal pour le Futur a été lancé en 2020, il incarne l'ambition du Groupe en matière de transformation sociale et environnementale. 

Le programme est bâti autour de trois axes stratégiques majeurs : la transformation de l'activité du Groupe pour réduire ses impacts sur le climat, l'eau, la biodiversité et les ressources ; l'engagement de ses parties prenantes ; et une contribution pour aider à relever les défis sociaux et environnementaux les plus urgents.

L'Oréal agit ainsi en investissant en faveur de la régénération des écosystèmes, du développement de l'économie circulaire mais également en soutenant les femmes en situation de grande vulnérabilité et les populations les plus exposées aux catastrophes climatiques.`,
    engagements: [
      {
        icon: RiLeafLine,
        title: "Lutter contre le réchauffement climatique",
        progress: 85,
        description: "Réduction des émissions de CO2 de nos sites industriels"
      },
      {
        icon: RiWaterFlashLine,
        title: "Gérer l'eau de façon responsable",
        progress: 78,
        description: "Optimisation de la consommation d'eau dans nos processus"
      },
      {
        icon: RiPlantLine,
        title: "Respecter la biodiversité",
        progress: 65,
        description: "Protection et régénération des écosystèmes"
      },
      {
        icon: RiRecycleLine,
        title: "Préserver les ressources naturelles",
        progress: 92,
        description: "Développement de l'économie circulaire"
      }
    ]
  },
  lorealPourLaJeunesse: {
    title: "L'ORÉAL POUR LA JEUNESSE",
    description: "L'Oréal pour la Jeunesse offre aux jeunes de multiples opportunités professionnelles de début de carrière.",
    fullDescription: `Les jeunes sont au cœur de l'écosystème de L'Oréal ; tout au long de notre histoire centenaire, nous n'avons eu de cesse de tisser une relation forte avec les jeunes ; décennie après décennie, nos leaders ont toujours fait le pari de la jeunesse et de son potentiel. Véritable "fabrique de talents", l'école L'Oréal est reconnue par les jeunes eux-mêmes pour sa capacité à confier des responsabilités très tôt dans le parcours professionnel et à développer ses collaborateurs tout au long de leur carrière.

Nous sommes engagés en faveur des jeunes dans tous les pays où nous sommes implantés, à travers notre recrutement, nos actions campus, nos programmes de diversité et d'inclusion mais aussi via nos marques dont les causes sont de plus en plus centrées sur l'aide aux jeunes générations.`,
    engagements: [
      {
        icon: RiTeamLine,
        title: "Partenariats et sensibilisation",
        value: "Millions de jeunes accompagnés",
        description: "Avec l'aide des gouvernements, des fondations, des universités et le secteur privé"
      },
      {
        icon: RiUserHeartLine,
        title: "Accompagnement vers la vie active",
        value: "25 000+ opportunités par an",
        description: "Pour les moins de 30 ans"
      },
      {
        icon: RiLightbulbFlashLine,
        title: "Boost de l'employabilité",
        value: "100 000+ étudiants par an",
        description: "Coachés et mentorés par des experts de L'Oréal"
      }
    ]
  },
  lorealEnFrance: {
    title: "L'ORÉAL EN FRANCE",
    description: "L'Oréal participe de manière significative à la compétitivité économique de la France.",
    fullDescription: `L'Oréal participe de manière significative à la compétitivité économique de la France. Ses 11 usines génèrent 94 000 emplois en France et assurent 26 % de la production mondiale du Groupe. Ce tissu industriel dynamique soutient fortement le secteur cosmétique, qui est le troisième contributeur à la croissance française.`,
    stats: [
      {
        icon: RiFriendicaFill,
        value: "94 000",
        label: "emplois générés en France",
        description: "Nous employons en France 15 000 salariés et fabriquons, dans nos onze sites de production, des produits vendus dans le monde entier."
      },
      {
        icon: RiGlobalLine,
        value: "26%",
        label: "de la production mondiale",
        description: "Assurés par nos sites français"
      },
      {
        icon: RiTeamLine,
        value: "79 000",
        label: "emplois indirects générés",
        description: "Grâce à nos investissements et à l'activité de nos fournisseurs et distributeurs"
      }
    ]
  },
  initiatives: [
    {
      title: "Fondation L'Oréal",
      description: "Soutenir les femmes en situation de grande vulnérabilité",
      icon: RiHeartLine,
      impact: "50+ pays concernés"
    },
    {
      title: "Programme Solidarity Sourcing",
      description: "Intégration de personnes issues de communautés défavorisées",
      icon: RiTeamLine,
      impact: "1 million de personnes ciblées"
    },
    {
      title: "L'Oréal Learning Platform",
      description: "Formation et développement des compétences",
      icon: RiBookOpenLine,
      impact: "100 000+ collaborateurs formés"
    }
  ]
};

export default function RSEPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
        <div className="container max-w-7xl mx-auto px-4 py-12">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-green-100 text-green-800 border-green-200 mb-4">
              RSE & Durabilité
            </Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              L'Oréal pour le Futur
            </h1>
            <p className="text-xl text-gray-600">
              Notre engagement pour une beauté responsable qui fait avancer le monde
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid gap-12">
          {/* L'Oréal pour le Futur */}
          <RSESection 
            title={rseData.lorealPourLeFutur.title}
            description={rseData.lorealPourLeFutur.description}
            fullDescription={rseData.lorealPourLeFutur.fullDescription}
            type="engagements"
            data={rseData.lorealPourLeFutur.engagements}
          />

          {/* L'Oréal pour la Jeunesse */}
          <RSESection 
            title={rseData.lorealPourLaJeunesse.title}
            description={rseData.lorealPourLaJeunesse.description}
            fullDescription={rseData.lorealPourLaJeunesse.fullDescription}
            type="jeunesse"
            data={rseData.lorealPourLaJeunesse.engagements}
          />

          {/* L'Oréal en France */}
          <RSESection 
            title={rseData.lorealEnFrance.title}
            description={rseData.lorealEnFrance.description}
            fullDescription={rseData.lorealEnFrance.fullDescription}
            type="france"
            data={rseData.lorealEnFrance.stats}
          />

          {/* Initiatives */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos Initiatives Clés</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {rseData.initiatives.map((initiative, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <initiative.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">{initiative.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{initiative.description}</p>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      {initiative.impact}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-0">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Rejoignez notre engagement
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Découvrez comment vous pouvez contribuer à notre mission de création 
                d'une beauté responsable et durable pour les générations futures.
              </p>
              <div className="flex gap-4 justify-center">
                <Button className="bg-green-600 hover:bg-green-700">
                  Voir nos offres RSE
                </Button>
                <Button variant="outline" className="border-green-600 text-green-600">
                  Télécharger le rapport RSE
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function RSESection({ title, description, fullDescription, type, data }: any) {
  return (
    <Card>
      <CardContent className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 text-lg mb-4">{description}</p>
          <div className="prose prose-lg max-w-none">
            {fullDescription.split('\n').map((paragraph: string, index: number) => (
              <p key={index} className="text-gray-700 mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Engagements Grid */}
        {type === 'engagements' && (
          <div className="grid md:grid-cols-2 gap-6">
            {data.map((engagement: any, index: number) => (
              <Card key={index} className="bg-gray-50 border-0">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-lg">
                      <engagement.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{engagement.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{engagement.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progression</span>
                          <span>{engagement.progress}%</span>
                        </div>
                        <Progress value={engagement.progress} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Jeunesse Grid */}
        {type === 'jeunesse' && (
          <div className="grid md:grid-cols-3 gap-6">
            {data.map((engagement: any, index: number) => (
              <Card key={index} className="text-center border-0 bg-blue-50">
                <CardContent className="p-6">
                  <engagement.icon className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {engagement.value}
                  </div>
                  <h3 className="font-semibold mb-2">{engagement.title}</h3>
                  <p className="text-gray-600 text-sm">{engagement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* France Stats */}
        {type === 'france' && (
          <div className="grid md:grid-cols-3 gap-6">
            {data.map((stat: any, index: number) => (
              <Card key={index} className="text-center border-0 bg-white shadow-sm">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm mb-3">{stat.label}</div>
                  <p className="text-gray-700 text-xs">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="flex justify-end mt-6 pt-6 border-t">
          <Button variant="outline" className="flex items-center gap-2">
            Découvrez-en plus
            <RiArrowRightLine className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
