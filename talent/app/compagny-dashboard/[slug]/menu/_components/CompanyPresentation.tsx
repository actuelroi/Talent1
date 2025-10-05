// import { Card, CardContent } from "@/components/ui/card";

// export default function CompanyPresentation() {
//   return (
//     <Card>
//       <CardContent className="p-6">
//         <h2 className="text-2xl font-bold mb-4">Présentation</h2>
//         <p className="text-gray-700 mb-4">
//           Notre Raison d'être : Créer la beauté qui fait avancer le monde.
//         </p>
//         <p className="text-gray-700 mb-4">
//           Le désir de beauté est une force puissante qui nous fait avancer. La beauté ne se limite pas à l'apparence. 
//           Elle nous donne confiance en nous, en qui nous voulons être, et dans notre relation avec les autres.
//         </p>
//         <p className="text-gray-700 mb-4">
//           Depuis plus d'un siècle, nous exerçons ce métier unique : créateur de beauté. Notre but est d'offrir à tous, 
//           partout dans le monde, le meilleur de la beauté en termes de qualité, d'efficacité, de sécurité et de sincérité 
//           pour satisfaire tous les besoins et désirs de beauté dans leur infinie diversité.
//         </p>
//       </CardContent>
//     </Card>
//   );
// }


'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Edit } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const defaultContent = [
  "Notre Raison d'être : Créer la beauté qui fait avancer le monde.",
  "Le désir de beauté est une force puissante qui nous fait avancer. La beauté ne se limite pas à l'apparence. Elle nous donne confiance en nous, en qui nous voulons être, et dans notre relation avec les autres.",
  "Depuis plus d'un siècle, nous exerçons ce métier unique : créateur de beauté. Notre but est d'offrir à tous, partout dans le monde, le meilleur de la beauté en termes de qualité, d'efficacité, de sécurité et de sincérité pour satisfaire tous les besoins et désirs de beauté dans leur infinie diversité."
];

export default function CompanyPresentation() {
  const [content, setContent] = useState<string[]>(defaultContent);
  const [isEditing, setIsEditing] = useState(false);

  const updateParagraph = (index: number, value: string) => {
    const newContent = [...content];
    newContent[index] = value;
    setContent(newContent);
  };

  const addParagraph = () => {
    setContent([...content, "Nouveau paragraphe..."]);
  };

  const removeParagraph = (index: number) => {
    setContent(content.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Présentation</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit className="h-4 w-4 mr-2" />
            {isEditing ? 'Terminer' : 'Modifier'}
          </Button>
        </div>

        <div className="space-y-4">
          {content.map((paragraph, index) => (
            <div key={index} className="relative group">
              {isEditing && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeParagraph(index)}
                >
                  ×
                </Button>
              )}
              
              {isEditing ? (
                <textarea
                  value={paragraph}
                  onChange={(e) => updateParagraph(index, e.target.value)}
                  className="w-full min-h-[100px] border border-gray-300 rounded p-3 focus:border-blue-500 focus:outline-none"
                  placeholder="Entrez le contenu du paragraphe..."
                />
              ) : (
                <p className="text-gray-700">{paragraph}</p>
              )}
            </div>
          ))}
          
          {isEditing && (
            <Button
              variant="outline"
              className="w-full"
              onClick={addParagraph}
            >
              + Ajouter un paragraphe
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}