// src/components/ManagementSection.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Puzzle, BarChart3, Send } from "lucide-react";

export default function ManagementSection() {
  const features = [
    {
      icon: <Puzzle className="h-10 w-10" />,
      title: "ATS et intégrations",
      description: "Gérez efficacement vos candidatures grâce à notre ATS ou recrutez avec vos outils actuels grâce à nos intégrations."
    },
    {
      icon: <BarChart3 className="h-10 w-10" />,
      title: "Analytics",
      description: "Analysez l'impact de votre vitrine grâce aux statistiques vous permettant de mesurer la performance de votre trafic."
    },
    {
      icon: <Send className="h-10 w-10" />,
      title: "Multi-diffusion",
      description: "Diffusez vos offres d'emploi en un clic vers Linkedin, L'APEC et Indeed et maximiser vos chances de trouver la bonne personne."
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Gérez simplement vos recrutements et votre marque employeur
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Votre temps est précieux. Nos solutions vous permettent de le dédier aux meilleurs talents.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="items-center pb-4">
                <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl text-center mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-gray-600 text-center text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}