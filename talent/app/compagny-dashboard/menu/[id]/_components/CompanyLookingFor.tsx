import { Card, CardContent } from "@/components/ui/card";

export default function CompanyLookingFor() {
  return (
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
  );
}