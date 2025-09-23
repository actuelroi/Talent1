import { Card, CardContent } from "@/components/ui/card";

export default function CompanyPresentation() {
  return (
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
  );
}