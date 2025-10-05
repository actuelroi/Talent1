// // src/app/companies/l-oreal/jobs/[slug]/components/CompanyInfo.tsx
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { MapPin, Users, Calendar, DollarSign, Scale } from "lucide-react";
// import Link from "next/link";

// export default function CompanyInfo() {
//   return (
//     <Card>
//       <CardContent className="p-6">
//         <div className="flex items-center gap-4 mb-4">
//           <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
//             <span className="font-bold text-gray-700">L'Oréal</span>
//           </div>
//           <div>
//             <h3 className="font-bold text-lg">L'Oréal Groupe</h3>
//             <div className="flex flex-wrap gap-1 mt-1">
//               <Badge variant="secondary" className="text-xs">Luxe</Badge>
//               <Badge variant="secondary" className="text-xs">Cosmétique</Badge>
//               <Badge variant="secondary" className="text-xs">E-commerce</Badge>
//             </div>
//           </div>
//         </div>

//         <div className="space-y-3 mb-6">
//           <div className="flex items-center gap-2 text-sm">
//             <Users className="h-4 w-4 text-gray-500" />
//             <span>90 000 collaborateurs</span>
//           </div>
//           <div className="flex items-center gap-2 text-sm">
//             <Calendar className="h-4 w-4 text-gray-500" />
//             <span>Créée en 1909</span>
//           </div>
//           <div className="flex items-center gap-2 text-sm">
//             <DollarSign className="h-4 w-4 text-gray-500" />
//             <span>Chiffre d'affaires : 43,48 Mds €</span>
//           </div>
//           <div className="flex items-center gap-2 text-sm">
//             <Scale className="h-4 w-4 text-gray-500" />
//             <span>58% / 42% parité</span>
//           </div>
//         </div>

//         <div className="space-y-3">
//           <Button asChild className="w-full">
//             <Link href="/compagny/compagnies">Voir l'entreprise</Link>
//           </Button>
//           <Button variant="outline" className="w-full">
//             Suivre
//           </Button>
//           <Button variant="outline" className="w-full">
//             Voir toutes les offres (92)
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }



// jobs/[id]/components/CompanyInfo.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Calendar, DollarSign, Scale } from "lucide-react";
import Link from "next/link";
import { Company } from "@/lib/generated/prisma";


interface CompanyInfoProps {
  company: Company;
  jobCount: number;
}

export default function CompanyInfo({ company, jobCount }: CompanyInfoProps) {
  const formatCompanySize = (size: string | null) => {
    const sizeMap: { [key: string]: string } = {
      'SMALL': '1-50 employés',
      'MEDIUM': '51-200 employés',
      'LARGE': '201-1000 employés',
      'ENTERPRISE': '1000+ employés'
    };
    return sizeMap[size || ''] || size || 'Non spécifié';
  };

  const getStats = () => {
    if (typeof company.stats === 'object' && company.stats !== null) {
      return company.stats as any;
    }
    return {};
  };

  const stats = getStats();

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            {company.logo ? (
              <img 
                src={company.logo} 
                alt={company.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
            ) : (
              <span className="font-bold text-gray-700">
                {company.logoText || company.name.substring(0, 2).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg">{company.name}</h3>
            <div className="flex flex-wrap gap-1 mt-1">
              {company.industries?.slice(0, 3).map((industry, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {industry}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {company.location && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{company.location}</span>
            </div>
          )}
          
          {company.size && (
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-gray-500" />
              <span>{formatCompanySize(company.size)}</span>
            </div>
          )}
          
          {company.foundedYear && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>Créée en {company.foundedYear}</span>
            </div>
          )}
          
          {stats.revenue && (
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span>CA: {stats.revenue}</span>
            </div>
          )}
          
          {stats.genderRatio && (
            <div className="flex items-center gap-2 text-sm">
              <Scale className="h-4 w-4 text-gray-500" />
              <span>{stats.genderRatio}</span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href={`/companies/${company.slug}`}>
              Voir l'entreprise
            </Link>
          </Button>
          <Button variant="outline" className="w-full">
            Suivre
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href={`/companies/${company.slug}/jobs`}>
              Voir toutes les offres ({jobCount})
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}