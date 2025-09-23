// src/app/company/dashboard/components/CandidateSearch.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RiSearchLine, RiFilter3Line } from "@remixicon/react";

export default function CandidateSearch() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recherche de candidats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="relative">
            <RiSearchLine className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Compétences, mots-clés..."
              className="pl-9"
            />
          </div>
          <div className="relative">
            <Input
              placeholder="Localisation..."
            />
          </div>
          <div className="relative">
            <Input
              placeholder="Niveau d'expérience..."
            />
          </div>
        </div>
        
        <Button className="w-full flex items-center gap-2">
          <RiFilter3Line className="h-4 w-4" />
          Filtrer les résultats
        </Button>

        <div className="text-sm text-muted-foreground">
          <p>💡 Utilisez des filtres avancés pour trouver des candidats précis</p>
        </div>
      </CardContent>
    </Card>
  );
}