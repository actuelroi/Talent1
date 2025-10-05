
// 'use client';

// import { Card, CardContent } from "@/components/ui/card";
// import { Edit } from "lucide-react";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";


// const defaultContent = [
//   "Chez L'Oréal, chacun apporte sa pierre à l'édifice. Vos idées sont non seulement écoutées mais aussi valorisées. Nous recherchons des personnes passionnées qui ont envie de se challenger continuellement pour nous aider à créer l'avenir de la beauté.",
//   "Pas besoin d'être passionné de maquillage, il suffit d'avoir envie de relever des défis et d'être entrepreneur !"
// ];

// export default function CompanyLookingFor() {
//   const [content, setContent] = useState<string[]>(defaultContent);
//   const [isEditing, setIsEditing] = useState(false);

//   const updateParagraph = (index: number, value: string) => {
//     const newContent = [...content];
//     newContent[index] = value;
//     setContent(newContent);
// };

//   const addParagraph = () => {
//     setContent([...content, "Nouveau paragraphe..."]);
//   };

//   const removeParagraph = (index: number) => {
//     setContent(content.filter((_, i) => i !== index));
//   };

//   return (
//     <Card>
//       <CardContent className="p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-bold">Ce qu'ils recherchent</h2>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => setIsEditing(!isEditing)}
//           >
//             <Edit className="h-4 w-4 mr-2" />
//             {isEditing ? 'Terminer' : 'Modifier'}
//           </Button>
//         </div>

//         <div className="space-y-4">
//           {content.map((paragraph, index) => (
//             <div key={index} className="relative group">
//               {isEditing && (
//                 <Button
//                   variant="destructive"
//                   size="sm"
//                   className="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
//                   onClick={() => removeParagraph(index)}
//                 >
//                   ×
//                 </Button>
//               )}
              
//               {isEditing ? (
//                 <textarea
//                   value={paragraph}
//                   onChange={(e) => updateParagraph(index, e.target.value)}
//                   className="w-full min-h-[80px] border border-gray-300 rounded p-3 focus:border-blue-500 focus:outline-none"
//                   placeholder="Entrez le contenu du paragraphe..."
//                 />
//               ) : (
//                 <p className="text-gray-700">{paragraph}</p>
//               )}
//             </div>
//           ))}
          
//           {isEditing && (
//             <Button
//               variant="outline"
//               className="w-full"
//               onClick={addParagraph}
//             >
//             + Ajouter un paragraphe
//             </Button>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }



'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Edit, Plus, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useCompanyBySlug } from "@/hooks/useCompanyBySlug";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const defaultContent = [
  "Chez nous, chacun apporte sa pierre à l'édifice. Vos idées sont non seulement écoutées mais aussi valorisées. Nous recherchons des personnes passionnées qui ont envie de se challenger continuellement pour nous aider à créer l'avenir de la beauté.",
  "Pas besoin d'être passionné de maquillage, il suffit d'avoir envie de relever des défis et d'être entrepreneur !"
];

export default function CompanyLookingFor() {
  const [isEditing, setIsEditing] = useState(false);
  const [localContent, setLocalContent] = useState<string[]>(defaultContent);
  const params = useParams();
  const slug = params.slug as string;
  const trpc = useTRPC();
  
  // Get company data using the same hook as your header
  const { data: companyResponse, isLoading, refetch } = useCompanyBySlug(slug);
  const companyData = companyResponse?.company;

  // Update company mutation - same as in your header
  const updateCompanyMutation = useMutation({
    ...trpc.company.updateCompany.mutationOptions(),
    onSuccess: () => {
      toast.success('Contenu enregistré avec succès!');
      refetch();
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error('Erreur lors de la sauvegarde');
      console.error('Failed to update company looking for content:', error);
    },
  });

  // Initialize local content when company data loads
  useEffect(() => {
    if (companyData?.lookingFor) {
      try {
        // If lookingFor exists in database, use it
        if (Array.isArray(companyData.lookingFor) && companyData.lookingFor.length > 0) {
          setLocalContent(companyData.lookingFor);
        } else if (typeof companyData.lookingFor === 'string') {
          // Handle case where lookingFor might be stored as JSON string
          const parsedLookingFor = JSON.parse(companyData.lookingFor);
          if (Array.isArray(parsedLookingFor)) {
            setLocalContent(parsedLookingFor);
          }
        }
      } catch (error) {
        console.error('Error parsing company looking for content:', error);
        // Fallback to default content if parsing fails
        setLocalContent(defaultContent);
      }
    } else {
      // If no lookingFor data exists, use default content
      setLocalContent(defaultContent);
    }
  }, [companyData]);

  const updateParagraph = (index: number, value: string) => {
    const newContent = [...localContent];
    newContent[index] = value;
    setLocalContent(newContent);
  };

  const addParagraph = () => {
    setLocalContent([...localContent, "Nouveau paragraphe..."]);
  };

  const removeParagraph = (index: number) => {
    setLocalContent(localContent.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!companyData) return;

    try {
      await updateCompanyMutation.mutateAsync({
        companyId: companyData.id,
        data: {
          lookingFor: localContent
        }
      });
    } catch (error) {
      console.error('Failed to update company looking for content:', error);
    }
  };

  const handleCancel = () => {
    // Reset to original content from database
    if (companyData?.lookingFor) {
      try {
        if (Array.isArray(companyData.lookingFor)) {
          setLocalContent(companyData.lookingFor);
        } else if (typeof companyData.lookingFor === 'string') {
          const parsedLookingFor = JSON.parse(companyData.lookingFor);
          if (Array.isArray(parsedLookingFor)) {
            setLocalContent(parsedLookingFor);
          }
        }
      } catch (error) {
        console.error('Error resetting looking for content:', error);
        setLocalContent(defaultContent);
      }
    } else {
      setLocalContent(defaultContent);
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Ce qu'ils recherchent</h2>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  disabled={updateCompanyMutation.isPending}
                >
                  Annuler
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSave}
                  disabled={updateCompanyMutation.isPending}
                  className="flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  {updateCompanyMutation.isPending ? 'Sauvegarde...' : 'Sauvegarder'}
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Modifier
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {localContent.map((paragraph, index) => (
            <div key={index} className="relative group">
              {isEditing && (
                <div className="absolute -top-3 -right-3">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="h-6 w-6 p-0 rounded-full"
                    onClick={() => removeParagraph(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              
              {isEditing ? (
                <textarea
                  value={paragraph}
                  onChange={(e) => updateParagraph(index, e.target.value)}
                  className="w-full min-h-[100px] border border-gray-300 rounded-lg p-4 focus:border-blue-500 focus:outline-none resize-y bg-white"
                  placeholder="Décrivez ce que votre entreprise recherche chez les candidats..."
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{paragraph}</p>
              )}
            </div>
          ))}
          
          {isEditing && (
            <Button
              variant="outline"
              className="w-full border-dashed"
              onClick={addParagraph}
              disabled={updateCompanyMutation.isPending}
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un paragraphe
            </Button>
          )}
        </div>

        {isEditing && localContent.length === 0 && (
          <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
            <p>Aucun contenu défini. Décrivez ce que votre entreprise recherche chez les candidats.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}