// // src/app/companies/l-oreal/jobs/[slug]/postuler/components/ApplicationSuccess.tsx
// 'use client';

// import { useEffect, useRef } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { CheckCircle, ArrowLeft, Eye } from 'lucide-react';
// import Link from 'next/link';

// export default function ApplicationSuccess() {
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (containerRef.current) {
//       containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       containerRef.current.focus(); // optional: for accessibility
//     }
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       tabIndex={-1} // makes it focusable for accessibility
//       className="container max-w-2xl mx-auto px-4 py-12 outline-none"
//     >
//       <Card className="border-green-200">
//         <CardContent className="p-8 text-center">
//           <div className="flex justify-center mb-6">
//             <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
//               <CheckCircle className="h-10 w-10 text-green-600" />
//             </div>
//           </div>

//           <h1 className="text-2xl font-bold text-gray-900 mb-4">
//             Candidature envoyée avec succès !
//           </h1>

//           <p className="text-gray-600 mb-6">
//             Votre candidature pour le poste "STAGE 6 MOIS - Performance" chez L'Oréal a été transmise avec succès. 
//             L'équipe de recrutement examinera votre profil et vous contactera si votre candidature retient leur attention.
//           </p>

//           <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left">
//             <h3 className="font-medium text-blue-800 mb-2">Prochaines étapes :</h3>
//             <ul className="text-sm text-blue-700 space-y-1">
//               <li>• Votre candidature sera examinée par l'équipe de recrutement</li>
//               <li>• Vous recevrez un email de confirmation sous peu</li>
//               <li>• Si votre profil correspond au poste, vous serez contacté pour un entretien</li>
//             </ul>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link href="/">
//               <Button variant="outline" className="flex items-center gap-2">
//                 <ArrowLeft className="h-4 w-4" />
//                 Voir d'autres offres
//               </Button>
//             </Link>

//             <Link href="/compagny/compagnies">
//               <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
//                 <Eye className="h-4 w-4" />
//                 Découvrir L'Oréal
//               </Button>
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



// src/app/postuler/[id]/_components/ApplicationSuccess.tsx
'use client';

import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft, Eye, Download } from 'lucide-react';
import Link from 'next/link';

interface ApplicationSuccessProps {
  applicationId: string;
  companyName: string;
  jobTitle: string;
}

export default function ApplicationSuccess({ applicationId, companyName, jobTitle }: ApplicationSuccessProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="container max-w-2xl mx-auto px-4 py-12"
    >
      <Card className="border-green-200">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Candidature envoyée avec succès !
          </h1>

          <p className="text-gray-600 mb-6">
            Votre candidature pour le poste "<strong>{jobTitle}</strong>" chez <strong>{companyName}</strong> a été transmise avec succès. 
            L'équipe de recrutement examinera votre profil et vous contactera si votre candidature retient leur attention.
          </p>

          <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left">
            <h3 className="font-medium text-blue-800 mb-2">Prochaines étapes :</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Votre candidature sera examinée par l'équipe de recrutement</li>
              <li>• Vous recevrez un email de confirmation sous peu</li>
              <li>• Si votre profil correspond au poste, vous serez contacté pour un entretien</li>
              <li>• Référence de votre candidature : <code className="bg-blue-100 px-1 rounded">{applicationId}</code></li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voir d'autres offres
              </Button>
            </Link>

            <Link href="/mes-candidatures">
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4" />
                Mes candidatures
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}