
'use client';



import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Edit, Plus, X, Globe, SquareArrowOutUpLeft, SquareArrowOutUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useCompanyBySlug } from "@/hooks/useCompanyBySlug";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface LocalCompanyData {
  name: string;
  logoText: string;
  industries: string[];
  location: string;
  website: string;
  gradientFrom: string;
  gradientTo: string;
  industry: string;
  newIndustry?: string;

}

export default function CompanyHeader() {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter()
  const params = useParams();
  const slug = params.slug as string;
  const trpc = useTRPC();
  const [localData, setLocalData] = useState<LocalCompanyData | null>(null);

  const { data: companyResponse, isLoading, refetch } = useCompanyBySlug(slug);
  // const [companyData, setCompanyData] = useState({
  //   name: "L'Oréal Groupe",
  //   logoText: "L'Oréal",
  //   industries: ["Cosmétique", "E-commerce", "Luxe"],
  //   location: "Abidjan plataux",
  //   website: "https://www.loreal.com",
  //   gradientFrom: "from-pink-50",
  //   gradientTo: "to-purple-50"
  // });

  const [newIndustry, setNewIndustry] = useState("");

  // Get company data from response
  const companyData = companyResponse?.company;

  // Update company mutation
  const updateCompanyMutation = useMutation({
    ...trpc.company.updateCompany.mutationOptions(),
    onSuccess: () => {
      toast.success('Enregistrer avec success!')
      refetch();
      setIsEditing(false);
    },
  });

  // Initialize local data when company data loads
  useEffect(() => {
    if (companyData) {
      setLocalData({
        name: companyData.name,
        logoText: companyData.logoText || companyData.name.substring(0, 2).toUpperCase(),
        industries: companyData.industries || 'Technologie',
        location: companyData.location || 'Abidjan',
        website: companyData.website || '',
        gradientFrom: companyData.gradientFrom || 'from-pink-50',
        gradientTo: companyData.gradientTo || 'to-purple-50',
        industry: companyData.industry || '',

      });
    }
  }, [companyData]);


  // const handleUpdateField = (field: string, value: any) => {
  //   setCompanyData(prev => ({
  //     ...prev,
  //     [field]: value
  //   }));
  // };

  // const addIndustry = () => {
  //   if (newIndustry.trim() && !companyData.industries.includes(newIndustry.trim())) {
  //     handleUpdateField('industries', [...companyData.industries, newIndustry.trim()]);
  //     setNewIndustry("");
  //   }
  // };

  const handleUpdateField = (field: keyof LocalCompanyData, value: any) => {
    setLocalData(prev => prev ? {
      ...prev,
      [field]: value
    } : null);
  };

  const addIndustry = () => {
    if (localData?.newIndustry?.trim() && !localData.industries.includes(localData.newIndustry.trim())) {
      handleUpdateField('industries', [...localData.industries, localData.newIndustry.trim()]);
      handleUpdateField('newIndustry', "");
    }
  };

  const removeIndustry = (index: number) => {
    if (!localData) return;
    const newIndustries = localData.industries.filter((_, i: number) => i !== index);
    handleUpdateField('industries', newIndustries);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addIndustry();
    }
  };

  // const removeIndustry = (index: number) => {
  //   const newIndustries = companyData.industries.filter((_, i) => i !== index);
  //   handleUpdateField('industries', newIndustries);
  // };

  // const handleKeyPress = (e: React.KeyboardEvent) => {
  //   if (e.key === 'Enter') {
  //     addIndustry();
  //   }
  // };

  const handleSave = async () => {
    if (!companyData || !localData) return;

    try {
      await updateCompanyMutation.mutateAsync({
        companyId: companyData.id,
        data: {
          name: localData.name,
          logoText: localData.logoText,
          industries: localData.industries,
          location: localData.location,
          website: localData.website,
          gradientFrom: localData.gradientFrom,
          gradientTo: localData.gradientTo,

        }
      });
    } catch (error) {
      console.error('Failed to update company:', error);
    }
  };

  if (isLoading) {
    return (
      <section className="bg-gradient-to-r from-pink-50 to-purple-50 py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="w-32 h-32 bg-gray-200 rounded-lg"></div>
              <div className="flex-1 space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!companyData || !localData) {
    return (
      <section className="bg-gradient-to-r from-pink-50 to-purple-50 py-12">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <p>Entreprise non trouvée</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`bg-gradient-to-r ${localData.gradientFrom} ${localData.gradientTo} py-12 relative`}
    >
      {/* Edit Toggle Button */}
      <div className="absolute top-4 right-4 flex items-center gap-3">
        {/* <Button
          variant={isEditing ? "default" : "outline"}
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2"
        >
          <Edit className="h-4 w-4" />
          {isEditing ? 'Terminer' : 'Modifier'}
        </Button> */}



        <Button
          variant={isEditing ? "default" : "outline"}
          size="sm"
          onClick={() => isEditing ? handleSave() :setIsEditing(!isEditing)}
          disabled={updateCompanyMutation.isPending}
          className="flex items-center gap-2"
        >
          <Edit className="h-4 w-4" />
          { updateCompanyMutation.isPending ? 'Sauvegarde...' : isEditing ? 'Sauvegarder' : 'Modifier'}
        </Button>


        {
          isEditing ? '' :
            <Button
              variant={isEditing ? "default" : "outline"}
              size="sm"
              onClick={() => router.push('/compagny-dashboard/create-profile')}
              className="flex items-center gap-2"
            >
              <SquareArrowOutUpRight className="h-4 w-4" />
              Personnaliser
            </Button>

        }

      </div>

      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Logo Section */}
          <div className="relative group">
            <div className="w-32 h-32 bg-white rounded-lg shadow-md flex items-center justify-center p-4 border-2 border-dashed border-gray-300">
              {isEditing ? (
                <input
                  type="text"
                  value={localData.logoText}
                  onChange={(e) => handleUpdateField('logoText', e.target.value)}
                  className="text-2xl font-bold text-gray-800 w-full text-center bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                />
              ) : (
                <span className="text-2xl font-bold text-gray-800">{localData.logoText}</span>
              )}
            </div>

            {isEditing && (
              <div className="absolute -top-2 -right-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-6 w-6 p-0 rounded-full bg-blue-500 hover:bg-blue-600"
                  title="Modifier le logo"
                >
                  <Edit className="h-3 w-3 text-white" />
                </Button>
              </div>
            )}
          </div>

          {/* Company Info Section */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex-1">
                {/* Company Name */}
                <div className="flex items-center gap-2 mb-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={localData.name}
                      onChange={(e) => handleUpdateField('name', e.target.value)}
                      className="text-4xl font-bold text-gray-900 w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent"
                    />
                  ) : (
                    <h1 className="text-4xl font-bold text-gray-900">{localData.name}</h1>
                  )}
                </div>

                {/* Industries */}
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  {localData.industries.map((industry, index) => (
                    <div key={index} className="relative group/industry">
                      <Badge variant="secondary" className="pr-6">
                        {isEditing ? (
                          <input
                            type="text"
                            value={industry}
                            onChange={(e) => {
                              const newIndustries = [...localData.industries];
                              newIndustries[index] = e.target.value;
                              handleUpdateField('industries', newIndustries);
                            }}
                            className="bg-transparent border-none outline-none max-w-[100px]"
                          />
                        ) : (
                          industry
                        )}
                      </Badge>
                      {isEditing && (
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute -top-1 -right-1 h-4 w-4 p-0 rounded-full"
                          onClick={() => removeIndustry(index)}
                        >
                          <X className="h-2 w-2" />
                        </Button>
                      )}
                    </div>
                  ))}

                  {isEditing && (
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={newIndustry}
                        onChange={(e) => setNewIndustry(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Nouvelle industrie"
                        className="text-sm px-2 py-1 border border-gray-300 rounded w-32"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addIndustry}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700">
                Suivre
              </Button>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <MapPin className="h-5 w-5" />
              {isEditing ? (
                <input
                  type="text"
                  value={localData.location}
                  onChange={(e) => handleUpdateField('location', e.target.value)}
                  className="border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent w-64"
                />
              ) : (
                <span>{localData.location}</span>
              )}
            </div>

            {/* Website */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 flex items-center gap-2"
                asChild
              >
                <a href={localData.website} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4" />
                  Voir le site
                </a>
              </Button>
              {isEditing && (
                <input
                  type="text"
                  value={localData.website}
                  onChange={(e) => handleUpdateField('website', e.target.value)}
                  className="text-sm border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent w-64 px-2"
                  placeholder="https://example.com"
                />
              )}
            </div>

            {/* Gradient Editor */}
            {isEditing && (
              <div className="mt-6 p-4 bg-white bg-opacity-90 rounded-lg border">
                <h3 className="font-semibold mb-2">Couleur de fond</h3>
                <div className="flex gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Début</label>
                    <select
                      value={localData.gradientFrom}
                      onChange={(e) => handleUpdateField('gradientFrom', e.target.value)}
                      className="block w-full mt-1 border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      <option value="from-pink-50">Rose clair</option>
                      <option value="from-blue-50">Bleu clair</option>
                      <option value="from-green-50">Vert clair</option>
                      <option value="from-yellow-50">Jaune clair</option>
                      <option value="from-purple-50">Violet clair</option>
                      <option value="from-gray-50">Gris clair</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Fin</label>
                    <select
                      value={localData.gradientTo}
                      onChange={(e) => handleUpdateField('gradientTo', e.target.value)}
                      className="block w-full mt-1 border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      <option value="to-purple-50">Violet clair</option>
                      <option value="to-pink-50">Rose clair</option>
                      <option value="to-blue-50">Bleu clair</option>
                      <option value="to-green-50">Vert clair</option>
                      <option value="to-yellow-50">Jaune clair</option>
                      <option value="to-gray-50">Gris clair</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}






// 'use client';

// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { MapPin, Edit, Plus, X, Globe, SquareArrowOutUpRight } from "lucide-react";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useCompany } from "@/contexts/CompanyVerificationContext";


// interface CompanyHeaderData {
//   name: string;
//   logoText: string;
//   industries: string[];
//   location: string;
//   website: string;
//   gradientFrom: string;
//   gradientTo: string;
// }

// const defaultCompanyData: CompanyHeaderData = {
//   name: "",
//   logoText: "",
//   industries: [],
//   location: "",
//   website: "",
//   gradientFrom: "from-pink-50",
//   gradientTo: "to-purple-50"
// };

// // Helper function to convert null to empty string
// const nullToEmpty = (value: string | null | undefined): string => {
//   return value || "";
// };

// // Helper function to convert null to default array
// const nullToArray = <T,>(value: T[] | null | undefined): T[] => {
//   return value || [];
// };

// export default function CompanyHeader() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [companyData, setCompanyData] = useState<CompanyHeaderData>(defaultCompanyData);
//   const [newIndustry, setNewIndustry] = useState("");
//   const router = useRouter();
//   const { currentCompany, updateCompanyData, isUpdating } = useCompany();

//   // Load company data when currentCompany changes
//   useEffect(() => {
//     if (currentCompany) {
//       setCompanyData({
//         name: nullToEmpty(currentCompany.name),
//         logoText: nullToEmpty(currentCompany.logoText) || currentCompany.name.substring(0, 2).toUpperCase(),
//         industries: nullToArray(currentCompany.industries),
//         location: nullToEmpty(currentCompany.location),
//         website: nullToEmpty(currentCompany.website),
//         gradientFrom: nullToEmpty(currentCompany.gradientFrom) || "from-pink-50",
//         gradientTo: nullToEmpty(currentCompany.gradientTo) || "to-purple-50"
//       });
//     }
//   }, [currentCompany]);

//   const handleUpdateField = (field: keyof CompanyHeaderData, value: any) => {
//     setCompanyData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const addIndustry = () => {
//     if (newIndustry.trim() && !companyData.industries.includes(newIndustry.trim())) {
//       const newIndustries = [...companyData.industries, newIndustry.trim()];
//       handleUpdateField('industries', newIndustries);
//       setNewIndustry("");
//     }
//   };

//   const removeIndustry = (index: number) => {
//     const newIndustries = companyData.industries.filter((_, i) => i !== index);
//     handleUpdateField('industries', newIndustries);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       addIndustry();
//     }
//   };

//   const saveAllChanges = async () => {
//     if (currentCompany) {
//       try {
//         // Prepare data for update - this matches CompanyUpdateData type
//         const dataToSave = {
//           name: companyData.name,
//           logoText: companyData.logoText,
//           industries: companyData.industries,
//           location: companyData.location,
//           website: companyData.website,
//           gradientFrom: companyData.gradientFrom,
//           gradientTo: companyData.gradientTo,
//         };

//         await updateCompanyData(dataToSave);
//         setIsEditing(false);
//       } catch (error) {
//         console.error('Failed to save company data:', error);
//       }
//     }
//   };

//   if (!currentCompany) {
//     return (
//       <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-12">
//         <div className="container max-w-6xl mx-auto px-4">
//           <div className="text-center">
//             <h1 className="text-2xl font-bold text-gray-600">Chargement...</h1>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section 
//       className={`bg-gradient-to-r ${companyData.gradientFrom} ${companyData.gradientTo} py-12 relative`}
//     >
//       {/* Edit Toggle Button */}
//       <div className="absolute top-4 right-4 flex items-center gap-3">
//         <Button
//           variant={isEditing ? "default" : "outline"}
//           size="sm"
//           onClick={() => isEditing ? saveAllChanges() : setIsEditing(true)}
//           disabled={isUpdating}
//           className="flex items-center gap-2"
//         >
//           <Edit className="h-4 w-4" />
//           {isUpdating ? 'Sauvegarde...' : 
//            isEditing ? 'Sauvegarder' : 'Modifier'}
//         </Button>

//         {!isEditing && (
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => router.push('/compagny-dashboard/create-profile')}
//             className="flex items-center gap-2"
//           >
//             <SquareArrowOutUpRight className="h-4 w-4"/>
//             Personnaliser
//           </Button>
//         )}
//       </div>

//       <div className="container max-w-6xl mx-auto px-4">
//         <div className="flex flex-col md:flex-row items-start gap-8">
//           {/* Logo Section */}
//           <div className="relative group">
//             <div className="w-32 h-32 bg-white rounded-lg shadow-md flex items-center justify-center p-4 border-2 border-dashed border-gray-300">
//               {isEditing ? (
//                 <input
//                   type="text"
//                   value={companyData.logoText}
//                   onChange={(e) => handleUpdateField('logoText', e.target.value)}
//                   className="text-2xl font-bold text-gray-800 w-full text-center bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none"
//                 />
//               ) : (
//                 <span className="text-2xl font-bold text-gray-800">{companyData.logoText}</span>
//               )}
//             </div>
//           </div>

//           {/* Company Info Section */}
//           <div className="flex-1">
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
//               <div className="flex-1">
//                 {/* Company Name */}
//                 <div className="flex items-center gap-2 mb-2">
//                   {isEditing ? (
//                     <input
//                       type="text"
//                       value={companyData.name}
//                       onChange={(e) => handleUpdateField('name', e.target.value)}
//                       className="text-4xl font-bold text-gray-900 w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent"
//                     />
//                   ) : (
//                     <h1 className="text-4xl font-bold text-gray-900">{companyData.name}</h1>
//                   )}
//                 </div>

//                 {/* Industries */}
//                 <div className="flex items-center gap-2 mt-2 flex-wrap">
//                   {companyData.industries.map((industry, index) => (
//                     <div key={index} className="relative group/industry">
//                       <Badge variant="secondary" className="pr-6">
//                         {isEditing ? (
//                           <input
//                             type="text"
//                             value={industry}
//                             onChange={(e) => {
//                               const newIndustries = [...companyData.industries];
//                               newIndustries[index] = e.target.value;
//                               handleUpdateField('industries', newIndustries);
//                             }}
//                             className="bg-transparent border-none outline-none max-w-[100px]"
//                           />
//                         ) : (
//                           industry
//                         )}
//                       </Badge>
//                       {isEditing && (
//                         <Button
//                           variant="destructive"
//                           size="sm"
//                           className="absolute -top-1 -right-1 h-4 w-4 p-0 rounded-full"
//                           onClick={() => removeIndustry(index)}
//                         >
//                           <X className="h-2 w-2" />
//                         </Button>
//                       )}
//                     </div>
//                   ))}

//                   {isEditing && (
//                     <div className="flex items-center gap-1">
//                       <input
//                         type="text"
//                         value={newIndustry}
//                         onChange={(e) => setNewIndustry(e.target.value)}
//                         onKeyPress={handleKeyPress}
//                         placeholder="Nouvelle industrie"
//                         className="text-sm px-2 py-1 border border-gray-300 rounded w-32"
//                       />
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={addIndustry}
//                         className="h-8 w-8 p-0"
//                       >
//                         <Plus className="h-3 w-3" />
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <Button className="bg-blue-600 hover:bg-blue-700">
//                 Suivre
//               </Button>
//             </div>

//             {/* Location */}
//             <div className="flex items-center gap-2 text-gray-600 mb-4">
//               <MapPin className="h-5 w-5" />
//               {isEditing ? (
//                 <input
//                   type="text"
//                   value={companyData.location}
//                   onChange={(e) => handleUpdateField('location', e.target.value)}
//                   className="border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent w-64"
//                 />
//               ) : (
//                 <span>{companyData.location}</span>
//               )}
//             </div>

//             {/* Website */}
//             <div className="flex items-center gap-2">
//               <Button 
//                 variant="outline" 
//                 className="border-blue-600 text-blue-600 hover:bg-blue-50 flex items-center gap-2"
//                 asChild
//               >
//                 <a href={companyData.website} target="_blank" rel="noopener noreferrer">
//                   <Globe className="h-4 w-4" />
//                   Voir le site
//                 </a>
//               </Button>
//               {isEditing && (
//                 <input
//                   type="text"
//                   value={companyData.website}
//                   onChange={(e) => handleUpdateField('website', e.target.value)}
//                   className="text-sm border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent w-64 px-2"
//                   placeholder="https://example.com"
//                 />
//               )}
//             </div>

//             {/* Gradient Editor */}
//             {isEditing && (
//               <div className="mt-6 p-4 bg-white bg-opacity-90 rounded-lg border">
//                 <h3 className="font-semibold mb-2">Couleur de fond</h3>
//                 <div className="flex gap-4">
//                   <div>
//                     <label className="text-sm text-gray-600">Début</label>
//                     <select
//                       value={companyData.gradientFrom}
//                       onChange={(e) => handleUpdateField('gradientFrom', e.target.value)}
//                       className="block w-full mt-1 border border-gray-300 rounded px-2 py-1 text-sm"
//                     >
//                       <option value="from-pink-50">Rose clair</option>
//                       <option value="from-blue-50">Bleu clair</option>
//                       <option value="from-green-50">Vert clair</option>
//                       <option value="from-yellow-50">Jaune clair</option>
//                       <option value="from-purple-50">Violet clair</option>
//                       <option value="from-gray-50">Gris clair</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="text-sm text-gray-600">Fin</label>
//                     <select
//                       value={companyData.gradientTo}
//                       onChange={(e) => handleUpdateField('gradientTo', e.target.value)}
//                       className="block w-full mt-1 border border-gray-300 rounded px-2 py-1 text-sm"
//                     >
//                       <option value="to-purple-50">Violet clair</option>
//                       <option value="to-pink-50">Rose clair</option>
//                       <option value="to-blue-50">Bleu clair</option>
//                       <option value="to-green-50">Vert clair</option>
//                       <option value="to-yellow-50">Jaune clair</option>
//                       <option value="to-gray-50">Gris clair</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// components/CompanyHeader.tsx
// 'use client';

// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { MapPin, Edit, Plus, X, Globe, SquareArrowOutUpRight } from "lucide-react";
// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { useCompanyBySlug } from "@/hooks/useCompanyBySlug";
// import { useCompany } from "@/contexts/CompanyVerificationContext";
// import { useTRPC } from "@/trpc/client";
// import { useMutation } from "@tanstack/react-query";


// interface CompanyHeaderProps {
//   isEditable?: boolean;
// }

// interface LocalCompanyData {
//   name: string;
//   logoText: string;
//   industries: string[];
//   location: string;
//   website: string;
//   gradientFrom: string;
//   gradientTo: string;
//   presentation: string[];
//   newIndustry?: string;
// }

// export default function CompanyHeader({ isEditable = false }: CompanyHeaderProps) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [localData, setLocalData] = useState<LocalCompanyData | null>(null);
//   const router = useRouter();
//   const params = useParams();
//   const slug = params.slug as string;

//   const { data: companyResponse, isLoading, refetch } = useCompanyBySlug(slug);
//   const { currentCompany, updateCompanyData, isUpdating } = useCompany();
//   const trpc = useTRPC();

//   // Get company data from response
//   const companyData = companyResponse?.company;

//   // Update company mutation
//   const updateCompanyMutation = useMutation({
//     ...trpc.company.updateCompany.mutationOptions(),
//     onSuccess: () => {
//       refetch();
//       setIsEditing(false);
//     },
//   });

//   // Initialize local data when company data loads
//   useEffect(() => {
//     if (companyData) {
//       setLocalData({
//         name: companyData.name,
//         logoText: companyData.logoText || companyData.name.substring(0, 2).toUpperCase(),
//         industries: companyData.industries || [],
//         location: companyData.location || '',
//         website: companyData.website || '',
//         gradientFrom: companyData.gradientFrom || 'from-pink-50',
//         gradientTo: companyData.gradientTo || 'to-purple-50',
//         presentation: companyData.presentation || []
//       });
//     }
//   }, [companyData]);

//   const handleUpdateField = (field: keyof LocalCompanyData, value: any) => {
//     setLocalData(prev => prev ? {
//       ...prev,
//       [field]: value
//     } : null);
//   };

//   const addIndustry = () => {
//     if (localData?.newIndustry?.trim() && !localData.industries.includes(localData.newIndustry.trim())) {
//       handleUpdateField('industries', [...localData.industries, localData.newIndustry.trim()]);
//       handleUpdateField('newIndustry', "");
//     }
//   };

//   const removeIndustry = (index: number) => {
//     if (!localData) return;
//     const newIndustries = localData.industries.filter((_, i: number) => i !== index);
//     handleUpdateField('industries', newIndustries);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       addIndustry();
//     }
//   };

//   const handleSave = async () => {
//     if (!companyData || !localData) return;

//     try {
//       await updateCompanyMutation.mutateAsync({
//         companyId: companyData.id,
//         data: {
//           name: localData.name,
//           logoText: localData.logoText,
//           industries: localData.industries,
//           location: localData.location,
//           website: localData.website,
//           gradientFrom: localData.gradientFrom,
//           gradientTo: localData.gradientTo,
//           presentation: localData.presentation
//         }
//       });
//     } catch (error) {
//       console.error('Failed to update company:', error);
//     }
//   };

//   if (isLoading) {
//     return (
//       <section className="bg-gradient-to-r from-pink-50 to-purple-50 py-12">
//         <div className="container max-w-6xl mx-auto px-4">
//           <div className="animate-pulse">
//             <div className="flex flex-col md:flex-row items-start gap-8">
//               <div className="w-32 h-32 bg-gray-200 rounded-lg"></div>
//               <div className="flex-1 space-y-4">
//                 <div className="h-8 bg-gray-200 rounded w-1/3"></div>
//                 <div className="h-4 bg-gray-200 rounded w-1/4"></div>
//                 <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (!companyData || !localData) {
//     return (
//       <section className="bg-gradient-to-r from-pink-50 to-purple-50 py-12">
//         <div className="container max-w-6xl mx-auto px-4 text-center">
//           <p>Entreprise non trouvée</p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section
//       className={`bg-gradient-to-r ${localData.gradientFrom} ${localData.gradientTo} py-12 relative`}
//     >
//       {/* Edit Toggle Button - Only show if editable */}
//       {isEditable && (
//         <div className="absolute top-4 right-4 flex items-center gap-3">
//           <Button
//             variant={isEditing ? "default" : "outline"}
//             size="sm"
//             onClick={() => isEditing ? handleSave() : setIsEditing(true)}
//             disabled={isUpdating || updateCompanyMutation.isPending}
//             className="flex items-center gap-2"
//           >
//             <Edit className="h-4 w-4" />
//             {isUpdating || updateCompanyMutation.isPending ? 'Sauvegarde...' : isEditing ? 'Sauvegarder' : 'Modifier'}
//           </Button>

//           {!isEditing && (
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => router.push('/compagny-dashboard/create-profile')}
//               className="flex items-center gap-2"
//             >
//               <SquareArrowOutUpRight className="h-4 w-4" />
//               Personnaliser
//             </Button>
//           )}
//         </div>
//       )}

//       <div className="container max-w-6xl mx-auto px-4">
//         <div className="flex flex-col md:flex-row items-start gap-8">
//           {/* Logo Section */}
//           <div className="relative group">
//             <div className="w-32 h-32 bg-white rounded-lg shadow-md flex items-center justify-center p-4 border-2 border-dashed border-gray-300">
//               {isEditing ? (
//                 <input
//                   type="text"
//                   value={localData.logoText}
//                   onChange={(e) => handleUpdateField('logoText', e.target.value)}
//                   className="text-2xl font-bold text-gray-800 w-full text-center bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none"
//                   maxLength={3}
//                 />
//               ) : (
//                 <span className="text-2xl font-bold text-gray-800">{localData.logoText}</span>
//               )}
//             </div>
//           </div>

//           {/* Company Info Section */}
//           <div className="flex-1">
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
//               <div className="flex-1">
//                 {/* Company Name */}
//                 <div className="flex items-center gap-2 mb-2">
//                   {isEditing ? (
//                     <input
//                       type="text"
//                       value={localData.name}
//                       onChange={(e) => handleUpdateField('name', e.target.value)}
//                       className="text-4xl font-bold text-gray-900 w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent"
//                     />
//                   ) : (
//                     <h1 className="text-4xl font-bold text-gray-900">{localData.name}</h1>
//                   )}
//                 </div>

//                 {/* Industries */}
//                 <div className="flex items-center gap-2 mt-2 flex-wrap">
//                   {localData.industries.map((industry: string, index: number) => (
//                     <div key={index} className="relative group/industry">
//                       <Badge variant="secondary" className="pr-6">
//                         {isEditing ? (
//                           <input
//                             type="text"
//                             value={industry}
//                             onChange={(e) => {
//                               const newIndustries = [...localData.industries];
//                               newIndustries[index] = e.target.value;
//                               handleUpdateField('industries', newIndustries);
//                             }}
//                             className="bg-transparent border-none outline-none max-w-[100px]"
//                           />
//                         ) : (
//                           industry
//                         )}
//                       </Badge>
//                       {isEditing && (
//                         <Button
//                           variant="destructive"
//                           size="sm"
//                           className="absolute -top-1 -right-1 h-4 w-4 p-0 rounded-full"
//                           onClick={() => removeIndustry(index)}
//                         >
//                           <X className="h-2 w-2" />
//                         </Button>
//                       )}
//                     </div>
//                   ))}

//                   {isEditing && (
//                     <div className="flex items-center gap-1">
//                       <input
//                         type="text"
//                         value={localData.newIndustry || ""}
//                         onChange={(e) => handleUpdateField('newIndustry', e.target.value)}
//                         onKeyPress={handleKeyPress}
//                         placeholder="Nouvelle industrie"
//                         className="text-sm px-2 py-1 border border-gray-300 rounded w-32"
//                       />
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={addIndustry}
//                         className="h-8 w-8 p-0"
//                       >
//                         <Plus className="h-3 w-3" />
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <Button className="bg-blue-600 hover:bg-blue-700">
//                 Suivre
//               </Button>
//             </div>

//             {/* Location */}
//             <div className="flex items-center gap-2 text-gray-600 mb-4">
//               <MapPin className="h-5 w-5" />
//               {isEditing ? (
//                 <input
//                   type="text"
//                   value={localData.location}
//                   onChange={(e) => handleUpdateField('location', e.target.value)}
//                   className="border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent w-64"
//                 />
//               ) : (
//                 <span>{localData.location}</span>
//               )}
//             </div>

//             {/* Website */}
//             <div className="flex items-center gap-2">
//               <Button
//                 variant="outline"
//                 className="border-blue-600 text-blue-600 hover:bg-blue-50 flex items-center gap-2"
//                 asChild
//               >
//                 <a href={localData.website} target="_blank" rel="noopener noreferrer">
//                   <Globe className="h-4 w-4" />
//                   Voir le site
//                 </a>
//               </Button>
//               {isEditing && (
//                 <input
//                   type="text"
//                   value={localData.website}
//                   onChange={(e) => handleUpdateField('website', e.target.value)}
//                   className="text-sm border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent w-64 px-2"
//                   placeholder="https://example.com"
//                 />
//               )}
//             </div>

//             {/* Gradient Editor */}
//             {isEditing && (
//               <div className="mt-6 p-4 bg-white bg-opacity-90 rounded-lg border">
//                 <h3 className="font-semibold mb-2">Couleur de fond</h3>
//                 <div className="flex gap-4">
//                   <div>
//                     <label className="text-sm text-gray-600">Début</label>
//                     <select
//                       value={localData.gradientFrom}
//                       onChange={(e) => handleUpdateField('gradientFrom', e.target.value)}
//                       className="block w-full mt-1 border border-gray-300 rounded px-2 py-1 text-sm"
//                     >
//                       <option value="from-pink-50">Rose clair</option>
//                       <option value="from-blue-50">Bleu clair</option>
//                       <option value="from-green-50">Vert clair</option>
//                       <option value="from-yellow-50">Jaune clair</option>
//                       <option value="from-purple-50">Violet clair</option>
//                       <option value="from-gray-50">Gris clair</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="text-sm text-gray-600">Fin</label>
//                     <select
//                       value={localData.gradientTo}
//                       onChange={(e) => handleUpdateField('gradientTo', e.target.value)}
//                       className="block w-full mt-1 border border-gray-300 rounded px-2 py-1 text-sm"
//                     >
//                       <option value="to-purple-50">Violet clair</option>
//                       <option value="to-pink-50">Rose clair</option>
//                       <option value="to-blue-50">Bleu clair</option>
//                       <option value="to-green-50">Vert clair</option>
//                       <option value="to-yellow-50">Jaune clair</option>
//                       <option value="to-gray-50">Gris clair</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }