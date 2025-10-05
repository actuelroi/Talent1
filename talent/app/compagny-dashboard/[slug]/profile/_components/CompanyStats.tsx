
// 'use client';

// import { Card, CardContent } from "@/components/ui/card";
// import { Calendar, Users, Scale, DollarSign, Plus, Edit } from "lucide-react";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";

// interface StatItem {
//   id: string;
//   icon: string;
//   value: string;
//   label: string;
// }

// const defaultStats: StatItem[] = [
//   { id: '1', icon: 'calendar', value: '1909', label: 'Année de création' },
//   { id: '2', icon: 'users', value: '90K', label: 'Collaborateurs' },
//   { id: '3', icon: 'scale', value: '58% / 42%', label: 'Parité' },
//   { id: '4', icon: 'dollar', value: '43,48 Mds €', label: 'Chiffre d\'affaires' }
// ];

// const iconMap = {
//   calendar: Calendar,
//   users: Users,
//   scale: Scale,
//   dollar: DollarSign,
//   plus: Plus
// };

// export default function CompanyStats() {
//   const [stats, setStats] = useState<StatItem[]>(defaultStats);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingStat, setEditingStat] = useState<StatItem | null>(null);

//   const addStat = () => {
//     const newStat: StatItem = {
//       id: Date.now().toString(),
//       icon: 'calendar',
//       value: 'Nouvelle valeur',
//       label: 'Nouveau libellé'
//     };
//     setStats([...stats, newStat]);
//     setEditingStat(newStat);
//   };

//   const updateStat = (id: string, field: string, value: string) => {
//     setStats(stats.map(stat => 
//       stat.id === id ? { ...stat, [field]: value } : stat
//     ));
//   };

//   const removeStat = (id: string) => {
//     setStats(stats.filter(stat => stat.id !== id));
//   };

//   return (
//     <Card id="profil">
//       <CardContent className="p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold">L'Oréal Groupe en chiffres</h2>
//           <div className="flex gap-2">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setIsEditing(!isEditing)}
//             >
//               <Edit className="h-4 w-4 mr-2" />
//               {isEditing ? 'Terminer' : 'Modifier'}
//             </Button>
//             {isEditing && (
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={addStat}
//               >
//                 <Plus className="h-4 w-4 mr-2" />
//                 Ajouter
//               </Button>
//             )}
//           </div>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {stats.map((stat) => {
//             const IconComponent = iconMap[stat.icon as keyof typeof iconMap];
            
//             return (
//               <div key={stat.id} className="text-center relative group">
//                 {isEditing && (
//                   <div className="absolute -top-2 -right-2 flex gap-1">
//                     <Button
//                       variant="destructive"
//                       size="sm"
//                       className="h-6 w-6 p-0"
//                       onClick={() => removeStat(stat.id)}
//                     >
//                       ×
//                     </Button>
//                   </div>
//                 )}
                
//                 <div className="flex justify-center mb-2">
//                   <IconComponent className="h-8 w-8 text-blue-600" />
//                 </div>
                
//                 {isEditing ? (
//                   <>
//                     <input
//                       type="text"
//                       value={stat.value}
//                       onChange={(e) => updateStat(stat.id, 'value', e.target.value)}
//                       className="text-2xl font-bold w-full text-center border-b border-gray-300 focus:border-blue-500 focus:outline-none"
//                     />
//                     <input
//                       type="text"
//                       value={stat.label}
//                       onChange={(e) => updateStat(stat.id, 'label', e.target.value)}
//                       className="text-gray-600 w-full text-center border-b border-gray-300 focus:border-blue-500 focus:outline-none mt-1"
//                     />
//                   </>
//                 ) : (
//                   <>
//                     <div className="text-2xl font-bold">{stat.value}</div>
//                     <div className="text-gray-600">{stat.label}</div>
//                   </>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, Scale, DollarSign, Plus, Edit, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useCompanyBySlug } from "@/hooks/useCompanyBySlug";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface StatItem {
  id: string;
  icon: string;
  value: string;
  label: string;
}

interface CompanyStatsData {
  stats?: StatItem[];
}

const defaultStats: StatItem[] = [
  { id: 'default-1', icon: 'calendar', value: '1909', label: 'Année de création' },
  { id: 'default-2', icon: 'users', value: '90K', label: 'Collaborateurs' },
  { id: 'default-3', icon: 'scale', value: '58% / 42%', label: 'Parité' },
  { id: 'default-4', icon: 'dollar', value: '43,48 Mds €', label: 'Chiffre d\'affaires' }
];

const iconMap = {
  calendar: Calendar,
  users: Users,
  scale: Scale,
  dollar: DollarSign,
  plus: Plus
};

export default function CompanyStats() {
  const [isEditing, setIsEditing] = useState(false);
  const [localStats, setLocalStats] = useState<StatItem[]>(defaultStats);
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
      toast.success('Statistiques enregistrées avec succès!');
      refetch();
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error('Erreur lors de la sauvegarde');
      console.error('Failed to update company stats:', error);
    },
  });

  // Initialize local stats when company data loads
  useEffect(() => {
    if (companyData?.stats) {
      try {
        // If stats exist in database, use them
        const parsedStats = typeof companyData.stats === 'string' 
          ? JSON.parse(companyData.stats)
          : companyData.stats;
        
        if (Array.isArray(parsedStats) && parsedStats.length > 0) {
          setLocalStats(parsedStats);
        }
      } catch (error) {
        console.error('Error parsing company stats:', error);
        // Fallback to default stats if parsing fails
        setLocalStats(defaultStats);
      }
    }
  }, [companyData]);

  const addStat = () => {
    const newStat: StatItem = {
      id: `new-${Date.now()}`,
      icon: 'calendar',
      value: 'Nouvelle valeur',
      label: 'Nouveau libellé'
    };
    setLocalStats([...localStats, newStat]);
  };

  const updateStat = (id: string, field: keyof StatItem, value: string) => {
    setLocalStats(localStats.map(stat => 
      stat.id === id ? { ...stat, [field]: value } : stat
    ));
  };

  const removeStat = (id: string) => {
    setLocalStats(localStats.filter(stat => stat.id !== id));
  };

  const handleSave = async () => {
    if (!companyData) return;

    try {
      await updateCompanyMutation.mutateAsync({
        companyId: companyData.id,
        data: {
          stats: localStats
        }
      });
    } catch (error) {
      console.error('Failed to update company stats:', error);
    }
  };

  const handleCancel = () => {
    // Reset to original stats from database
    if (companyData?.stats) {
      try {
        const parsedStats = typeof companyData.stats === 'string' 
          ? JSON.parse(companyData.stats)
          : companyData.stats;
        
        if (Array.isArray(parsedStats)) {
          setLocalStats(parsedStats);
        }
      } catch (error) {
        console.error('Error resetting stats:', error);
      }
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <Card id="profil">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center">
                  <div className="h-8 w-8 bg-gray-200 rounded-full mx-auto mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card id="profil">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">L'entreprise en chiffres</h2>
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
                >
                  {updateCompanyMutation.isPending ? 'Sauvegarde...' : 'Sauvegarder'}
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </Button>
            )}
            
            {isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={addStat}
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {localStats.map((stat) => {
            const IconComponent = iconMap[stat.icon as keyof typeof iconMap];
            
            return (
              <div key={stat.id} className="text-center relative group">
                {isEditing && (
                  <div className="absolute -top-2 -right-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="h-6 w-6 p-0 rounded-full"
                      onClick={() => removeStat(stat.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                
                <div className="flex justify-center mb-2">
                  {isEditing ? (
                    <select
                      value={stat.icon}
                      onChange={(e) => updateStat(stat.id, 'icon', e.target.value)}
                      className="bg-transparent border-none outline-none text-center"
                    >
                      <option value="calendar">Calendrier</option>
                      <option value="users">Utilisateurs</option>
                      <option value="scale">Balance</option>
                      <option value="dollar">Dollar</option>
                    </select>
                  ) : (
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  )}
                </div>
                
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => updateStat(stat.id, 'value', e.target.value)}
                      className="text-2xl font-bold w-full text-center border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent"
                    />
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => updateStat(stat.id, 'label', e.target.value)}
                      className="text-gray-600 w-full text-center border-b border-gray-300 focus:border-blue-500 focus:outline-none mt-1 bg-transparent"
                    />
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {isEditing && localStats.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>Aucune statistique configurée. Cliquez sur "Ajouter" pour créer votre première statistique.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
