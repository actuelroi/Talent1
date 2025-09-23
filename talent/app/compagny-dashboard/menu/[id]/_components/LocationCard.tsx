import { Card, CardContent } from "@/components/ui/card";

export default function LocationCard() {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">Localisation</h2>
        <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center mb-4">
          <span className="text-gray-500">Carte de localisation</span>
        </div>
        <p className="text-gray-700">41 Rue Martre, 92110, Abidjan-2 plataux</p>
      </CardContent>
    </Card>
  );
}