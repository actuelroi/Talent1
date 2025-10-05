
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Edit } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function LocationCard() {
  const [location, setLocation] = useState("41 Rue Martre, 92110, Abidjan-2 plataux");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Localisation</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit className="h-4 w-4 mr-2" />
            {isEditing ? 'Terminer' : 'Modifier'}
          </Button>
        </div>

        <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center mb-4">
          <span className="text-gray-500">Carte de localisation</span>
        </div>
        
        {isEditing ? (
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:border-blue-500 focus:outline-none"
            placeholder="Entrez l'adresse..."
          />
        ) : (
          <p className="text-gray-700">{location}</p>
        )}
      </CardContent>
    </Card>
  );
}