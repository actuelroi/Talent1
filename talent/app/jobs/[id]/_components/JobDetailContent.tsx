// src/app/jobs/[id]/_components/JobDetailContent.tsx
'use client';

import { useTRPC } from "@/trpc/client";
import CompanyInfo from "./CompanyInfo";
import FAQSection from "./FAQSection";
import JobActions from "./JobActions";
import JobDescription from "./JobDescription";
import JobHeader from "./JobHeader";
import RelatedJobs from "./RelatedJobs";
import FooterSection from "@/app/compagny/_components/FooterSection";
import { Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

interface JobDetailContentProps {
  jobId: string;
}

export default function JobDetailContent({ jobId }: JobDetailContentProps) {
 const trpc = useTRPC();
  const { data, isLoading, isError, error } = useQuery(trpc.publishedJob.getJobById.queryOptions({
    id: jobId
  }));

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <div className="container max-w-6xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-8">
                <div className="animate-pulse">
                  <div className="h-40 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <div className="container max-w-6xl mx-auto px-4 py-8">
            <div className="text-center py-12">
              <Building className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Offre non trouvée
              </h1>
              <p className="text-gray-600 mb-6">
                {error?.message || "Cette offre d'emploi n'existe pas ou n'est plus disponible."}
              </p>
              <Button asChild>
                <a href="/">Retour à l'accueil</a>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const { job, relatedJobs, company } = data;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <JobHeader job={job} company={company} />
              <JobActions job={job} />
              <JobDescription job={job} />
              <FAQSection job={job} />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <CompanyInfo company={company} jobCount={relatedJobs.length + 1} />
              <RelatedJobs jobs={relatedJobs} company={company} />
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}