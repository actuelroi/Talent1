import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

export default function CompanyHeader() {
  return (
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
  );
}

