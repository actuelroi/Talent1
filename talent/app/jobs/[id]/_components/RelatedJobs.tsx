// //jobs/[slug]/components/RelatedJobs.tsx
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { MapPin, Briefcase, Calendar } from "lucide-react";
// import Link from "next/link";

// export default function RelatedJobs() {
//   const relatedJobs = [
//     {
//       title: "STAGE 6 MOIS - À partir de mars 2026 - Qualité physico chimie - CAUDRY- INGENIEUR - 1 700 € mensuel",
//       type: "Stage",
//       location: "Cambrai",
//       remote: true,
//       time: "il y a 6 jours",
//       company: "L'Oréal Groupe"
//     }
//   ];

//   return (
//     <Card>
//       <CardContent className="p-6">
//         <h3 className="font-bold text-lg mb-4">D'autres offres vous correspondent !</h3>
//         <p className="text-gray-600 text-sm mb-4">
//           Ces entreprises recrutent aussi au poste de "Disciplines d'ingénierie".
//         </p>

//         {relatedJobs.map((job, index) => (
//           <div key={index} className="border rounded-lg p-4 mb-4">
//             <h4 className="font-bold mb-2">{job.title}</h4>
//             <div className="flex flex-wrap items-center gap-2 mb-2">
//               <Badge variant="outline" className="text-xs flex items-center gap-1">
//                 <Briefcase className="h-3 w-3" />
//                 {job.type}
//               </Badge>
//               <Badge variant="outline" className="text-xs flex items-center gap-1">
//                 <MapPin className="h-3 w-3" />
//                 {job.location}
//               </Badge>
//               {job.remote && (
//                 <Badge variant="secondary" className="text-xs">
//                   Télétravail fréquent
//                 </Badge>
//               )}
//             </div>
//             <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
//               <Calendar className="h-3 w-3" />
//               {job.time}
//             </div>
//             <div className="text-xs text-gray-600 mb-3">{job.company}</div>
//             <Link href="#" className="text-blue-600 hover:underline text-sm">
//               Voir l'offre
//             </Link>
//           </div>
//         ))}
//       </CardContent>
//     </Card>
//   );
// }




// jobs/[id]/components/RelatedJobs.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, Calendar } from "lucide-react";
import Link from "next/link";
import { Company } from "@/lib/generated/prisma";


interface RelatedJob {
  id: string;
  title: string;
  employmentType: string;
  location: string;
  remotePolicy: string;
  time: string;
  company: {
    name: string;
    isVerified: boolean;
  };
}

interface RelatedJobsProps {
  jobs: RelatedJob[];
  company: Company;
}

export default function RelatedJobs({ jobs, company }: RelatedJobsProps) {
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

  if (jobs.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-bold text-lg mb-4">Autres offres chez cette entreprise</h3>

        {jobs.map((job) => (
          <div key={job.id} className="border rounded-lg p-4 mb-4">
            <h4 className="font-bold mb-2 line-clamp-2">{job.title}</h4>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Briefcase className="h-3 w-3" />
                {formatContractType(job.employmentType)}
              </Badge>
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {job.location}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {formatRemotePolicy(job.remotePolicy)}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <Calendar className="h-3 w-3" />
              {job.time}
            </div>
            <div className="text-xs text-gray-600 mb-3">{job.company.name}</div>
            <Link 
              href={`/jobs/${job.id}`}
              className="text-blue-600 hover:underline text-sm"
            >
              Voir l'offre
            </Link>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}