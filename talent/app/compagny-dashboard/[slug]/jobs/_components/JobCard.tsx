// // src/app/company/jobs/components/JobCard.tsx
// 'use client';

// import { useState } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import {
//   RiMapPinLine,
//   RiBriefcaseLine,
//   RiTimeLine,
//   RiEyeLine,
//   RiEditLine,

 
// } from '@remixicon/react';
// import JobActions from './JobActions';


// interface JobCardProps {
//   job: any;
//   onDelete: (jobId: number) => void;
//   onUpdate: (job: any) => void;
// }

// export default function JobCard({ job, onDelete, onUpdate }: JobCardProps) {
//   const [isSaved, setIsSaved] = useState(false);

//   const handleStatusToggle = () => {
//     onUpdate({
//       ...job,
//       status: job.status === 'active' ? 'draft' : 'active'
//     });
//   };

//   return (
//     <Card className="hover:shadow-md transition-shadow">
//       <CardContent className="p-6">
//         <div className="flex justify-between items-start mb-4">
//           <div className="flex-1">
//             <div className="flex items-center gap-3 mb-2">
//               <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
//                 {job.title}
//               </h3>
//               {job.status === 'draft' && (
//                 <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
//                   Brouillon
//                 </Badge>
//               )}
//             </div>
            
//             <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
//               <Badge variant="outline" className="bg-blue-50 text-blue-700">
//                 {job.type}
//               </Badge>
//               <div className="flex items-center gap-1">
//                 <RiMapPinLine className="h-4 w-4" />
//                 {job.location}
//               </div>
//               <div className="flex items-center gap-1">
//                 <RiBriefcaseLine className="h-4 w-4" />
//                 {job.department}
//               </div>
//               <div className="flex items-center gap-1">
//                 <RiTimeLine className="h-4 w-4" />
//                 {job.timeAgo}
//               </div>
//             </div>

//             <div className="flex flex-wrap gap-2 mb-4">
//               <Badge variant="secondary" className="bg-gray-100 text-gray-700">
//                 {job.remote}
//               </Badge>
//               <Badge variant="secondary" className="bg-green-100 text-green-700">
//                 {job.salary}
//               </Badge>
//               <Badge variant="secondary" className="bg-purple-100 text-purple-700">
//                 {job.experience}
//               </Badge>
//             </div>

//             <div className="flex flex-wrap gap-1 mb-4">
//               {job.tags.map((tag: string, index: number) => (
//                 <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
//                   {tag}
//                 </span>
//               ))}
//             </div>

//             {/* Stats */}
//             <div className="flex items-center gap-6 text-sm text-gray-600">
//               <span>{job.applications} candidatures</span>
//               <span>{job.views} vues</span>
//               <span>Expire le {new Date(job.expirationDate).toLocaleDateString('fr-FR')}</span>
//             </div>
//           </div>

//           <JobActions job={job} onDelete={onDelete} onUpdate={onUpdate} />
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-between items-center pt-4 border-t">
//           <div className="flex gap-3">
//             <Button variant="outline" size="sm" className="flex items-center gap-2">
//               <RiEyeLine className="h-4 w-4" />
//               Voir les candidatures
//             </Button>
//             <Button variant="outline" size="sm" className="flex items-center gap-2">
//               <RiEditLine className="h-4 w-4" />
//               Modifier
//             </Button>
//           </div>
//           <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
//             Promouvoir
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }


// src/app/company/jobs/_components/JobCard.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  RiMapPinLine,
  RiBriefcaseLine,
  RiTimeLine,
  RiEyeLine,
  RiEditLine,
} from '@remixicon/react';
import JobActions from './JobActions';

interface JobCardProps {
  job: any;
  onDelete: (jobId: string) => void; // Changed from number to string
  onUpdate: (job: any) => void;
}

export default function JobCard({ job, onDelete, onUpdate }: JobCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleStatusToggle = () => {
    onUpdate({
      ...job,
      status: job.status === 'active' ? 'draft' : 'active'
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                {job.title}
              </h3>
              {job.status === 'draft' && (
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  Brouillon
                </Badge>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {job.type}
              </Badge>
              <div className="flex items-center gap-1">
                <RiMapPinLine className="h-4 w-4" />
                {job.location}
              </div>
              <div className="flex items-center gap-1">
                <RiBriefcaseLine className="h-4 w-4" />
                {job.department}
              </div>
              <div className="flex items-center gap-1">
                <RiTimeLine className="h-4 w-4" />
                {job.timeAgo}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                {job.remote}
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                {job.salary}
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                {job.experience}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {job.tags.map((tag: string, index: number) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span>{job.applications} candidatures</span>
              <span>{job.views} vues</span>
              <span>Expire le {new Date(job.expirationDate).toLocaleDateString('fr-FR')}</span>
            </div>
          </div>

          <JobActions job={job} onDelete={onDelete} onUpdate={onUpdate} />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <RiEyeLine className="h-4 w-4" />
              Voir les candidatures
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <RiEditLine className="h-4 w-4" />
              Modifier
            </Button>
          </div>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Promouvoir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}