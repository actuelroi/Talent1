import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, Scale, DollarSign } from "lucide-react";

export default function CompanyStats() {
  return (
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
  );
}