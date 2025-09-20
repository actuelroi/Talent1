// src/app/company/dashboard/components/CompanyProfile.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RiEditLine, RiCheckboxCircleLine } from "@remixicon/react";

export default function CompanyProfile() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profil entreprise</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-600">L</span>
          </div>
          <div>
            <h3 className="font-semibold">L'Oréal Groupe</h3>
            <p className="text-sm text-muted-foreground">Cosmétique, Luxe</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <RiCheckboxCircleLine className="h-4 w-4 text-green-600" />
            <span>Profil complété à 85%</span>
          </div>
          <div className="flex items-center gap-2">
            <RiCheckboxCircleLine className="h-4 w-4 text-green-600" />
            <span>Verifié</span>
          </div>
          <div className="flex items-center gap-2">
            <RiCheckboxCircleLine className="h-4 w-4 text-green-600" />
            <span>427 CVs reçus</span>
          </div>
        </div>

        <Button variant="outline" className="w-full flex items-center gap-2">
          <RiEditLine className="h-4 w-4" />
          Modifier le profil
        </Button>
      </CardContent>
    </Card>
  );
}