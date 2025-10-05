// // src/app/company/jobs/page.tsx
// 'use client';

// import { useState } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { RiAddLine } from '@remixicon/react';
// import CreateJobForm from './_components/CreateJobForm';
// import JobStats from './_components/JobStats';
// import JobFilters from './_components/JobFilters';
// import JobListings from './_components/JobListings';

// // Components

// // Mock data
// const initialJobs = [
//   {
//     id: 1,
//     title: "Technicien(ne) maintenance scientifique - Campus de Chevilly (H/F)",
//     type: "CDI",
//     location: "Chevilly-Larue",
//     remote: "Télétravail fréquent",
//     timeAgo: "il y a 16 heures",
//     salary: "35-42k €",
//     department: "Maintenance",
//     experience: "2-5 ans",
//     tags: ["Maintenance", "Scientifique", "CDI"],
//     status: "active",
//     applications: 24,
//     views: 156,
//     publicationDate: "2024-01-15",
//     expirationDate: "2024-02-15",
//     description: "Description complète du poste..."
//   },
//   // ... more jobs
// ];

// export default function JobsPage() {
//   const [jobs, setJobs] = useState(initialJobs);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [filters, setFilters] = useState({
//     search: '',
//     location: '',
//     type: '',
//     remote: '',
//     status: '',
//     departments: [] as string[],
//   });

//   const filteredJobs = jobs.filter(job => {
//     const matchesSearch = job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
//                          job.department.toLowerCase().includes(filters.search.toLowerCase());
//     const matchesLocation = !filters.location || job.location.includes(filters.location);
//     const matchesType = !filters.type || job.type === filters.type;
//     const matchesStatus = !filters.status || job.status === filters.status;
//     const matchesDepartment = filters.departments.length === 0 || 
//                             filters.departments.includes(job.department);

//     return matchesSearch && matchesLocation && matchesType && matchesStatus && matchesDepartment;
//   });

//   // const handleCreateJob = (newJob: any) => {
//   //   setJobs(prev => [...prev, { ...newJob, id: Date.now() }]);
//   //   setShowCreateForm(false);
//   // };

//   const handleDeleteJob = (jobId: number) => {
//     setJobs(prev => prev.filter(job => job.id !== jobId));
//   };

//   const handleUpdateJob = (updatedJob: any) => {
//     setJobs(prev => prev.map(job => job.id === updatedJob.id ? updatedJob : job));
//   };

//   // if (showCreateForm) {
//   //   return <CreateJobForm onSubmit={handleCreateJob} onCancel={() => setShowCreateForm(false)} />;
//   // }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b">
//         <div className="container max-w-7xl mx-auto px-4 py-8">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Offres d'emploi</h1>
//               <p className="text-gray-600 mt-2">Gérez et publiez vos offres d'emploi</p>
//             </div>
//             <Button 
//               className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
//               onClick={() => setShowCreateForm(true)}
//             >
//               <RiAddLine className="h-4 w-4" />
//               Nouvelle offre
//             </Button>
//           </div>

//           <JobStats jobs={jobs} />
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white border-b">
//         <div className="container max-w-7xl mx-auto px-4 py-4">
//           <JobFilters filters={filters} onFiltersChange={setFilters} />
//         </div>
//       </div>

//       {/* Job Listings */}
//       <div className="container max-w-7xl mx-auto px-4 py-8">
//         <JobListings 
//           jobs={filteredJobs}
//           onDeleteJob={handleDeleteJob}
//           onUpdateJob={handleUpdateJob}
//         />
//       </div>
//     </div>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RiAddLine } from '@remixicon/react';
import JobStats from './_components/JobStats';
import JobFilters from './_components/JobFilters';
import JobListings from './_components/JobListings';
import { useParams } from 'next/navigation';
import { useCompanyBySlug } from "@/hooks/useCompanyBySlug";
import { useTRPC } from "@/trpc/client";
import Link from 'next/link';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

// Define proper types
interface Job {
  id: string;
  title: string;
  type: string;
  location: string;
  remote: string;
  timeAgo: string;
  salary: string;
  department: string;
  experience: string;
  tags: string[];
  status: 'active' | 'draft';
  applications: number;
  views: number;
  publicationDate: Date;
  expirationDate: Date;
  description?: string;
  requirements?: string;
  responsibilities?: string;
  benefits?: string;
  isActive: boolean;
  isFeatured: boolean;
}

interface Filters {
  search: string;
  location: string;
  type: string;
  remote: string;
  status: string;
  departments: string[];
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    location: '',
    type: '',
    remote: '',
    status: '',
    departments: [],
  });

  const params = useParams();
  const slug = params.slug as string;
  const trpc = useTRPC();
  
  // Get company data using slug
  const { data: companyResponse, isLoading: companyLoading } = useCompanyBySlug(slug);
  const companyData = companyResponse?.company;

  // Get jobs for company
  const { data: jobsResponse, isLoading: jobsLoading, refetch } = useQuery(
    trpc.company.getCompanyJobs.queryOptions(
      { companyId: companyData?.id || '' },
      { 
        enabled: !!companyData?.id,
        refetchOnWindowFocus: false 
      }
    )
  );

  // Delete job mutation
  const deleteJobMutation = useMutation({
    ...trpc.company.deleteJob.mutationOptions(),
    onSuccess: () => {
      toast.success('Offre supprimée avec succès!');
      refetch();
    },
    onError: (error) => {
      toast.error('Erreur lors de la suppression de l\'offre');
      console.error('Failed to delete job:', error);
    },
  });

  // Update job mutation
  const updateJobMutation = useMutation({
    ...trpc.company.updateJob.mutationOptions(),
    onSuccess: () => {
      toast.success('Offre mise à jour avec succès!');
      refetch();
    },
    onError: (error) => {
      toast.error('Erreur lors de la mise à jour de l\'offre');
      console.error('Failed to update job:', error);
    },
  });

  // Helper functions to map database values to display values
  const mapEmploymentTypeToDisplay = (type: string): string => {
    const mapping: { [key: string]: string } = {
      'FULL_TIME': 'CDI',
      'PART_TIME': 'Temps partiel',
      'CONTRACT': 'CDD',
      'INTERNSHIP': 'Stage',
      'TEMPORARY': 'Intérim'
    };
    return mapping[type] || type;
  };

  const mapRemotePolicyToDisplay = (policy: string): string => {
    const mapping: { [key: string]: string } = {
      'ONSITE': 'Présentiel',
      'HYBRID': 'Hybride',
      'REMOTE': 'Télétravail total'
    };
    return mapping[policy] || policy;
  };

  const mapExperienceLevelToDisplay = (level: string): string => {
    const mapping: { [key: string]: string } = {
      'INTERNSHIP': 'Stage',
      'ENTRY_LEVEL': 'Débutant',
      'JUNIOR': '1-3 ans',
      'MID_LEVEL': '3-5 ans',
      'SENIOR': '5-8 ans',
      'LEAD': '8+ ans',
      'EXECUTIVE': 'Directeur'
    };
    return mapping[level] || level;
  };

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "À l'instant";
    if (diffInHours < 24) return `il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `il y a ${diffInWeeks} semaine${diffInWeeks > 1 ? 's' : ''}`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `il y a ${diffInMonths} mois`;
  };

  const formatSalary = (min: number | null, max: number | null, currency: string = 'EUR'): string => {
    // Handle null values properly
    const minValue = min ?? undefined;
    const maxValue = max ?? undefined;
    
    if (!minValue && !maxValue) return "Non spécifié";
    if (minValue && maxValue) return `${minValue/1000}-${maxValue/1000}k ${currency}`;
    if (minValue) return `À partir de ${minValue/1000}k ${currency}`;
    if (maxValue) return `Jusqu'à ${maxValue/1000}k ${currency}`;
    return "Non spécifié";
  };

  // Update jobs when data loads
  useEffect(() => {
    if (jobsResponse?.jobs) {
      const formattedJobs: Job[] = jobsResponse.jobs.map(job => ({
        id: job.id,
        title: job.title,
        type: mapEmploymentTypeToDisplay(job.employmentType),
        location: job.location,
        remote: mapRemotePolicyToDisplay(job.remotePolicy),
        timeAgo: formatTimeAgo(job.createdAt),
        salary: formatSalary(job.salaryMin, job.salaryMax, job.currency),
        department: 'Général',
        experience: mapExperienceLevelToDisplay(job.experienceLevel),
        tags: [job.employmentType, job.experienceLevel].filter(Boolean) as string[],
        status: job.isActive ? 'active' : 'draft',
        applications: job.applicationCount,
        views: job.views,
        publicationDate: job.publishedAt || job.createdAt,
        expirationDate: job.expiresAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        description: job.description,
        requirements: job.requirements || undefined,
        responsibilities: job.responsibilities || undefined,
        benefits: job.benefits || undefined,
        isActive: job.isActive,
        isFeatured: job.isFeatured
      }));
      setJobs(formattedJobs);
      setIsLoading(false);
    }
  }, [jobsResponse]);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         job.department.toLowerCase().includes(filters.search.toLowerCase()) ||
                         (job.description && job.description.toLowerCase().includes(filters.search.toLowerCase()));
    const matchesLocation = !filters.location || job.location.includes(filters.location);
    const matchesType = !filters.type || job.type === filters.type;
    const matchesStatus = !filters.status || job.status === filters.status;
    const matchesDepartment = filters.departments.length === 0 || 
                            filters.departments.includes(job.department);

    return matchesSearch && matchesLocation && matchesType && matchesStatus && matchesDepartment;
  });

  const handleDeleteJob = async (jobId: string) => {
    try {
      await deleteJobMutation.mutateAsync({ jobId });
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  const handleUpdateJob = async (updatedJob: Job) => {
    try {
      // Convert salary back to numbers for update
      // This is a simplified conversion - you might want to store the original values
      const updateData: any = {
        isActive: updatedJob.isActive,
        isFeatured: updatedJob.isFeatured,
      };

      // Only update salary if it's not "Non spécifié"
      if (!updatedJob.salary.includes('Non spécifié')) {
        // Extract numbers from salary string (this is simplified)
        const salaryMatch = updatedJob.salary.match(/(\d+)-(\d+)k/);
        if (salaryMatch) {
          updateData.salaryMin = parseInt(salaryMatch[1]) * 1000;
          updateData.salaryMax = parseInt(salaryMatch[2]) * 1000;
        }
      } else {
        // Set to null if no salary specified
        updateData.salaryMin = null;
        updateData.salaryMax = null;
      }

      await updateJobMutation.mutateAsync({
        jobId: updatedJob.id,
        data: updateData
      });
    } catch (error) {
      console.error('Failed to update job:', error);
    }
  };

  if (companyLoading || jobsLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            
            {/* Stats loading */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[1, 2, 3, 4].map(i => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="h-16 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Jobs loading */}
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Offres d'emploi</h1>
              <p className="text-gray-600 mt-2">Gérez et publiez vos offres d'emploi</p>
            </div>
            <Link href={`/compagny-dashboard/${slug}/new`}>
              <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                <RiAddLine className="h-4 w-4" />
                Nouvelle offre
              </Button>
            </Link>
          </div>

          <JobStats jobs={jobs} />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <JobFilters filters={filters} onFiltersChange={setFilters} />
        </div>
      </div>

      {/* Job Listings */}
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <JobListings 
          jobs={filteredJobs}
          onDeleteJob={handleDeleteJob}
          onUpdateJob={handleUpdateJob}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}