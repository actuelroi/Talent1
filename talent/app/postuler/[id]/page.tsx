// // src/app/companies/l-oreal/jobs/[slug]/postuler/page.tsx
// 'use client';

// import { useState } from 'react';
// import Header from '@/components/Header';
// import ApplicationSuccess from './_components/ApplicationSuccess';

// import ApplicationHeader from './_components/ApplicationHeader';
// import ApplicationForm from './_components/ApplicationForm';
// import FooterSection from '@/app/compagny/_components/FooterSection';

// export default function ApplicationPage() {
//   const [applicationSubmitted, setApplicationSubmitted] = useState(false);

//   const handleApplicationSubmit = () => {
//     // In a real application, this would send data to an API
//     setApplicationSubmitted(true);
//   };

//   if (applicationSubmitted) {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <main className="flex-1">
//           <ApplicationSuccess />
//         </main>
//         <FooterSection />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* <Header /> */}
//       <main className="flex-1">
//         <div className="container max-w-4xl mx-auto px-4 py-8">
//           <ApplicationHeader />
//           <ApplicationForm onSubmit={handleApplicationSubmit} />
//         </div>
//       </main>
//       <FooterSection />
//     </div>
//   );
// }






// src/app/postuler/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTRPC } from '@/trpc/client';
import { useParams, useRouter } from 'next/navigation';
import ApplicationSuccess from './_components/ApplicationSuccess';
import ApplicationHeader from './_components/ApplicationHeader';
import ApplicationForm from './_components/ApplicationForm';
import FooterSection from '@/app/compagny/_components/FooterSection';
import { Building, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function ApplicationPage() {
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState<{applicationId: string; companyName: string; jobTitle: string} | null>(null);
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;
  const trpc = useTRPC();

  const { data: jobData, isLoading: jobLoading, error: jobError } = useQuery(trpc.publishedJob.getJobById.queryOptions({
    id: jobId
  }));

  const { data: applicationCheck, isLoading: checkLoading } =useQuery(trpc.postulate.checkExistingApplication.queryOptions({
    jobId
  }));

  const SubmitApplication = useMutation(trpc.postulate.submitApplication.mutationOptions({
    onSuccess: () => {
      toast.success('Candidature soumise avec succès !');
    }
  }));

  const handleApplicationSubmit = async (applicationData: any) => {
    try {
      const result = await SubmitApplication.mutateAsync(applicationData);
      setSubmissionData(result);
      setApplicationSubmitted(true);
    } catch (error) {
      console.error('Application submission error:', error);
      toast.error('Erreur lors de la soumission de la candidature. Veuillez réessayer.');
    }
  };

  // Redirect if user already applied
  useEffect(() => {
    if (applicationCheck?.hasApplied) {
      toast.error('Vous avez déjà postulé à cette offre.');
      router.push('/');
    }
  }, [applicationCheck, router]);

  if (jobLoading || checkLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">Chargement de l'offre...</p>
          </div>
        </main>
        <FooterSection />
      </div>
    );
  }

  if (jobError || !jobData) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <div className="container max-w-4xl mx-auto px-4 py-8">
            <div className="text-center py-12">
              <Building className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Offre non trouvée
              </h1>
              <p className="text-gray-600 mb-6">
                Cette offre d'emploi n'existe pas ou n'est plus disponible.
              </p>
              <Button asChild>
                <a href="/">Retour à l'accueil</a>
              </Button>
            </div>
          </div>
        </main>
        <FooterSection />
      </div>
    );
  }

  if (applicationSubmitted && submissionData) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <ApplicationSuccess 
            applicationId={submissionData.applicationId}
            companyName={submissionData.companyName}
            jobTitle={submissionData.jobTitle}
          />
        </main>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <ApplicationHeader job={jobData.job} company={jobData.company} />
          <ApplicationForm 
            jobId={jobId}
            onSubmit={handleApplicationSubmit} 
          />
        </div>
      </main>
      <FooterSection />
    </div>
  );
}