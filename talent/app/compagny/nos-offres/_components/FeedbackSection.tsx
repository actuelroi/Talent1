// src/app/companies/l-oreal/nos-offres/components/FeedbackSection.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FeedbackSection() {
  return (
    <Card className="mt-8 bg-blue-50 border-blue-200">
      <CardContent className="p-6">
        <h3 className="font-bold text-lg mb-2">Êtes-vous satisfaits de votre expérience de recherche ?</h3>
        <p className="text-gray-700 mb-4">
          Vos feedbacks nous permettent d'améliorer l'expérience Welcome to the Jungle.
        </p>
        <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-100">
          Donner mon avis
        </Button>
      </CardContent>
    </Card>
  );
}