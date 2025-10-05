// //jobs/[slug]/components/JobHeader.tsx
// import { Badge } from "@/components/ui/badge";
// import { MapPin, Calendar, Briefcase } from "lucide-react";
// import Link from "next/link";

// export default function JobHeader() {
//   return (
//     <div className="space-y-4">
//       <Link href="/" className="text-blue-600 hover:underline flex items-center">
//         ← Retour
//       </Link>
      
//       <h1 className="text-3xl font-bold text-gray-900">
//         STAGE 6 MOIS - À partir de janvier 2026 - Performance - CAUDRY- INGENIEUR - 200 000 FCFA mensuel
//       </h1>
      
//       <div className="flex flex-wrap items-center gap-4">
//         <Badge variant="outline" className="flex items-center gap-1">
//           <Briefcase className="h-4 w-4" />
//           Stage
//         </Badge>
        
//         <Badge variant="outline" className="flex items-center gap-1">
//           <MapPin className="h-4 w-4" />
//           Cambrai
//         </Badge>
        
//         <Badge variant="secondary" className="flex items-center gap-1">
//           Télétravail fréquent
//         </Badge>
        
//         <span className="text-gray-500 text-sm flex items-center gap-1">
//           <Calendar className="h-4 w-4" />
//           il y a 7 jours
//         </span>
//       </div>
      
//       <div className="text-gray-600">
//         <strong>Salaire :</strong> Non spécifié
//       </div>
//     </div>
//   );
// }



// src/app/jobs/[id]/_components/JobHeader.tsx
'use client';

import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Briefcase } from "lucide-react";
import Link from "next/link";
import { FormattedJobPosting } from "@/types/jobPosting";
import { Company } from "@/lib/generated/prisma";


interface JobHeaderProps {
  job: FormattedJobPosting;
  company: Company;
}

export default function JobHeader({ job, company }: JobHeaderProps) {
  const formatContractType = (contract: string) => {
    const contractMap: { [key: string]: string } = {
      'FULL_TIME': 'CDI',
      'PART_TIME': 'Temps partiel',
      'CONTRACT': 'CDD',
      'INTERNSHIP': 'Stage',
      'TEMPORARY': 'Intérim'
    };
    return contractMap[contract] || contract;
  };

  const formatRemotePolicy = (policy: string) => {
    const policyMap: { [key: string]: string } = {
      'ONSITE': 'Présentiel',
      'HYBRID': 'Hybride',
      'REMOTE': 'Distanciel'
    };
    return policyMap[policy] || policy;
  };

  const formatExperienceLevel = (level: string) => {
    const levelMap: { [key: string]: string } = {
      'INTERNSHIP': 'Stage',
      'ENTRY_LEVEL': 'Débutant',
      'JUNIOR': 'Junior',
      'MID_LEVEL': 'Intermédiaire',
      'SENIOR': 'Senior',
      'LEAD': 'Lead',
      'EXECUTIVE': 'Direction'
    };
    return levelMap[level] || level;
  };

  const formatSalary = () => {
    if (!job.salary && !job.salaryMax) return "Non spécifié";
    if (job.salary && job.salaryMax) {
      return `${job.salary.toLocaleString('fr-FR')} - ${job.salaryMax.toLocaleString('fr-FR')} ${job.currency || '€'}/mois`;
    }
    return `${job.salary?.toLocaleString('fr-FR') || job.salaryMax?.toLocaleString('fr-FR')} ${job.currency || '€'}/mois`;
  };

  return (
    <div className="space-y-4">
      <Link href="/" className="text-blue-600 hover:underline flex items-center gap-2">
        <span>←</span>
        <span>Retour aux offres</span>
      </Link>
      
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {job.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-3">
            <Badge variant="outline" className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              {formatContractType(job.contract)}
            </Badge>
            
            <Badge variant="outline" className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {job.location}
            </Badge>
            
            <Badge variant="secondary" className="flex items-center gap-1">
              {formatRemotePolicy(job.remotePolicy)}
            </Badge>

            <Badge variant="outline" className="flex items-center gap-1">
              {formatExperienceLevel(job.experienceLevel)}
            </Badge>
            
            <span className="text-gray-500 text-sm flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {job.time}
            </span>
          </div>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-600">
            <div>
              <strong>Salaire :</strong> {formatSalary()}
            </div>
            
            <div>
              <strong>Entreprise :</strong> {company.name}
            </div>

            {job.isFeatured && (
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                Offre en vedette
              </Badge>
            )}
          </div>
        </div>

        {/* Company Logo */}
        <div className="flex-shrink-0">
          {company.logo ? (
            <img 
              src={company.logo} 
              alt={company.name}
              className="w-16 h-16 rounded-lg object-cover border"
            />
          ) : (
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {company.logoText || company.name.substring(0, 2).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      {job.tags && job.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {job.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}