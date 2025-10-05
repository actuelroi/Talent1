// // src/app/company/jobs/new/page.tsx
// 'use client';

// import { useState } from 'react';
// import Header from '@/components/Header';
// import JobForm from './_components/JobForm';
// import PreviewSection from './_components/PreviewSection';

// import SuccessModal from './_components/SuccessModal';
// import { SidebarTrigger } from '@/components/ui/sidebar';
// import { Separator } from '@/separator';
// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
// import { RiScanLine } from '@remixicon/react';
// import { useRouter } from 'next/navigation';


// // Mock company data - in a real app, this would come from authentication/context
// const mockCompany = {
//   id: 'comp-1',
//   name: "L'Oréal Groupe",
//   slug: "loreal-groupe",
//   description: "Créateur de beauté depuis plus d'un siècle. Notre raison d'être : créer la beauté qui fait avancer le monde.",
//   logo: "/api/placeholder/100/100",
//   coverImage: "/api/placeholder/800/200",
//   industry: "Cosmétique, Luxe, E-commerce",
//   size: "1000+ employés",
//   location: "Clichy, France",
//   website: "https://www.loreal.com",
//   foundedYear: 1909,
//   employees: "90 000",
//   parity: "58% / 42%",
//   revenue: "43,48 Mds €"
// };

// export default function CreateJobPage() {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     requirements: '',
//     responsibilities: '',
//     benefits: '',
//     location: 'Paris, France',
//     remotePolicy: 'hybrid',
//     employmentType: 'full_time',
//     experienceLevel: 'mid_level',
//     salaryMin: '',
//     salaryMax: '',
//     currency: 'EUR',
//     applicationUrl: '',
//     isActive: true,
//     isFeatured: false
//   });
//   const router = useRouter()
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);

//   const handleInputChange = (field: string, value: any) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     // Simulate API call
//     try {
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       console.log('Job created:', formData);
//       setShowSuccessModal(true);
//     } catch (error) {
//       console.error('Error creating job:', error);
//       alert('Une erreur est survenue lors de la création de l\'offre.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <section className="min-h-screen flex flex-col">
//       <header className="flex h-16 shrink-0 items-center gap-2 border-b">
//           <div className="flex flex-1 items-center gap-2 px-3">
//             <SidebarTrigger className="-ms-4" />
//             <Separator
//               orientation="vertical"
//               className="mr-2 data-[orientation=vertical]:h-4"
//             />
//             <Breadcrumb>
//               <BreadcrumbList>
//                 <BreadcrumbItem className="hidden md:block">
//                   <BreadcrumbLink  onClick={()=> router.back()}>
//                     <RiScanLine size={22} aria-hidden="true" />
//                     <span className="sr-only">Dashboard</span>
//                   </BreadcrumbLink>
//                 </BreadcrumbItem>
//                 <BreadcrumbSeparator className="hidden md:block" />
//                 <BreadcrumbItem>
//                   <BreadcrumbPage className="text-2xl font-bold text-gray-900 mb-2"> Créer une nouvelle offre d'emploi</BreadcrumbPage>
//                 </BreadcrumbItem>
//               </BreadcrumbList>
//             </Breadcrumb>
//           </div>
//         </header>
//       {/* <Header /> */}
//       <main className="flex-1 bg-gray-50 py-8">
//           <div className="container max-w-7xl mx-auto px-4">
//           <div className="text-center mb-8">
//             <p className="text-xl text-gray-600">
//               Remplissez les informations ci-dessous pour publier votre offre
//             </p>
//           </div>
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Job Form */}
//             <div className="lg:col-span-2">
//               <JobForm 
//                 formData={formData} 
//                 onChange={handleInputChange}
//                 onSubmit={handleSubmit}
//                 isSubmitting={isSubmitting}
//               />
//             </div>

//             {/* Preview Section */}
//             <div className="lg:sticky lg:top-8 lg:h-fit">
//               <PreviewSection 
//                 jobData={formData}
//                 company={mockCompany}
//               />
//             </div>
//           </div>
//         </div>
//       </main>


//       <SuccessModal 
//         isOpen={showSuccessModal}
//         onClose={() => setShowSuccessModal(false)}
//         jobTitle={formData.title}
//       />
//     </section>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import JobForm from './_components/JobForm';
import PreviewSection from './_components/PreviewSection';
import SuccessModal from './_components/SuccessModal';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { RiScanLine } from '@remixicon/react';
import { useRouter, useParams } from 'next/navigation';
import { useCompanyBySlug } from "@/hooks/useCompanyBySlug";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// Mapping functions for enums
const mapEmploymentType = (type: string) => {
  const mapping: { [key: string]: string } = {
    'CDI': 'FULL_TIME',
    'CDD': 'CONTRACT',
    'Stage': 'INTERNSHIP',
    'Alternance': 'INTERNSHIP',
    'Freelance': 'CONTRACT',
    'Temps partiel': 'PART_TIME',
    'Intérim': 'TEMPORARY'
  };
  return mapping[type] || 'FULL_TIME';
};

const mapExperienceLevel = (level: string) => {
  const mapping: { [key: string]: string } = {
    'Débutant': 'ENTRY_LEVEL',
    '1-3 ans': 'JUNIOR',
    '3-5 ans': 'MID_LEVEL',
    '5-8 ans': 'SENIOR',
    '8+ ans': 'SENIOR',
    'Étudiant': 'INTERNSHIP',
    'Lead/Manager': 'LEAD',
    'Directeur': 'EXECUTIVE'
  };
  return mapping[level] || 'MID_LEVEL';
};

const mapRemotePolicy = (policy: string) => {
  const mapping: { [key: string]: string } = {
    'Sur site': 'ONSITE',
    'Hybride': 'HYBRID',
    '100% télétravail': 'REMOTE',
    'Présentiel': 'ONSITE',
    'Télétravail total': 'REMOTE',
    'Télétravail fréquent': 'HYBRID',
    'Télétravail occasionnel': 'HYBRID'
  };
  return mapping[policy] || 'ONSITE';
};

export default function CreateJobPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    responsibilities: '',
    benefits: '',
    location: 'Paris, France',
    remotePolicy: 'Hybride',
    employmentType: 'CDI',
    experienceLevel: '3-5 ans',
    salaryMin: 0,
    salaryMax: 0,
    currency: 'EUR',
    applicationUrl: '',
    isActive: true,
    isFeatured: false
  });
  
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const trpc = useTRPC();
  
  // Get company data using slug
  const { data: companyResponse, isLoading: companyLoading } = useCompanyBySlug(slug);
  const companyData = companyResponse?.company;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Create job mutation
  const createJobMutation = useMutation({
    ...trpc.company.createJob.mutationOptions(),
    onSuccess: () => {
      toast.success('Offre créée avec succès!');
      setShowSuccessModal(true);
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast.error('Erreur lors de la création de l\'offre');
      console.error('Failed to create job:', error);
      setIsSubmitting(false);
    },
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!companyData) {
      toast.error('Entreprise non trouvée');
      return;
    }

    if (!formData.title || !formData.description) {
      toast.error('Veuillez remplir le titre et la description');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Map form values to database enums
      const jobData = {
        title: formData.title,
        description: formData.description,
        requirements: formData.requirements || undefined,
        responsibilities: formData.responsibilities || undefined,
        benefits: formData.benefits || undefined,
        location: formData.location,
        remotePolicy: mapRemotePolicy(formData.remotePolicy) as 'ONSITE' | 'HYBRID' | 'REMOTE',
        employmentType: mapEmploymentType(formData.employmentType) as 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP' | 'TEMPORARY',
        salaryMin: formData.salaryMin > 0 ? formData.salaryMin : undefined,
        salaryMax: formData.salaryMax > 0 ? formData.salaryMax : undefined,
        currency: formData.currency,
        experienceLevel: mapExperienceLevel(formData.experienceLevel) as 'INTERNSHIP' | 'ENTRY_LEVEL' | 'JUNIOR' | 'MID_LEVEL' | 'SENIOR' | 'LEAD' | 'EXECUTIVE',
        isActive: formData.isActive,
        isFeatured: formData.isFeatured,
        applicationUrl: formData.applicationUrl || undefined,
      };

      await createJobMutation.mutateAsync({
        companyId: companyData.id,
        data: jobData
      });
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  if (companyLoading) {
    return (
      <section className="min-h-screen flex flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger className="-ms-4" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink onClick={() => router.back()}>
                    <RiScanLine size={22} aria-hidden="true" />
                    <span className="sr-only">Dashboard</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-2xl font-bold text-gray-900 mb-2">
                    Créer une nouvelle offre d'emploi
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex-1 bg-gray-50 py-8">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-64 bg-gray-200 rounded"></div>
                  ))}
                </div>
                <div className="h-96 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </main>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b">
        <div className="flex flex-1 items-center gap-2 px-3">
          <SidebarTrigger className="-ms-4" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink onClick={() => router.back()}>
                  <RiScanLine size={22} aria-hidden="true" />
                  <span className="sr-only">Dashboard</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-2xl font-bold text-gray-900 mb-2">
                  Créer une nouvelle offre d'emploi
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="flex-1 bg-gray-50 py-8">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xl text-gray-600">
              Remplissez les informations ci-dessous pour publier votre offre
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Job Form */}
            <div className="lg:col-span-2">
              <JobForm 
                formData={formData} 
                onChange={handleInputChange}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </div>

            {/* Preview Section */}
            <div className="lg:sticky lg:top-8 lg:h-fit">
              <PreviewSection 
                jobData={formData}
                company={companyData}
              />
            </div>
          </div>
        </div>
      </main>

      <SuccessModal 
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          router.push(`/compagny-dashboard/${slug}/jobs`);
        }}
        jobTitle={formData.title}
        slug={slug}
      />
    </section>
  );
}