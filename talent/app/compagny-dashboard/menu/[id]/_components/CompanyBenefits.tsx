import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  "Accès à la Vente Au Personnel à des tarifs préférentiels",
  "Télétravail ponctuel autorisé",
  "Accès à la cantine",
  "Accès à L'Oréal Learning Platform pour booster votre développement"
];

export default function CompanyBenefits() {
  return (
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
  );
}