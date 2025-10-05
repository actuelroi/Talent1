
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Plus, Edit, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const defaultBenefits = [
  "Accès à la Vente Au Personnel à des tarifs préférentiels",
  "Télétravail ponctuel autorisé",
  "Accès à la cantine",
  "Accès à L'Oréal Learning Platform pour booster votre développement"
];

export default function CompanyBenefits() {
  const [benefits, setBenefits] = useState<string[]>(defaultBenefits);
  const [isEditing, setIsEditing] = useState(false);

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...benefits];
    newBenefits[index] = value;
    setBenefits(newBenefits);
  };

  const addBenefit = () => {
    setBenefits([...benefits, "Nouvel avantage..."]);
  };

  const removeBenefit = (index: number) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Nos avantages</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? 'Terminer' : 'Modifier'}
            </Button>
            {isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={addBenefit}
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            )}
          </div>
        </div>

        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start group">
              <span className="text-green-600 mr-2 mt-1">•</span>
              {isEditing ? (
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => updateBenefit(index, e.target.value)}
                    className="flex-1 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => removeBenefit(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <span className="text-gray-700">{benefit}</span>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}