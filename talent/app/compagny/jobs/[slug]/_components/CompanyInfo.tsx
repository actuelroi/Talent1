// src/app/companies/l-oreal/jobs/[slug]/components/CompanyInfo.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Calendar, DollarSign, Scale } from "lucide-react";
import Link from "next/link";

export default function CompanyInfo() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="font-bold text-gray-700">L'Oréal</span>
          </div>
          <div>
            <h3 className="font-bold text-lg">L'Oréal Groupe</h3>
            <div className="flex flex-wrap gap-1 mt-1">
              <Badge variant="secondary" className="text-xs">Luxe</Badge>
              <Badge variant="secondary" className="text-xs">Cosmétique</Badge>
              <Badge variant="secondary" className="text-xs">E-commerce</Badge>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-gray-500" />
            <span>90 000 collaborateurs</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>Créée en 1909</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-gray-500" />
            <span>Chiffre d'affaires : 43,48 Mds €</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Scale className="h-4 w-4 text-gray-500" />
            <span>58% / 42% parité</span>
          </div>
        </div>

        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href="/compagny/compagnies">Voir l'entreprise</Link>
          </Button>
          <Button variant="outline" className="w-full">
            Suivre
          </Button>
          <Button variant="outline" className="w-full">
            Voir toutes les offres (92)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}