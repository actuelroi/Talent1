// src/app/jobs/[id]/page.tsx
import { notFound } from 'next/navigation';
import Header from '@/components/Header';

import JobHeader from './_components/JobHeader';
import JobActions from './_components/JobActions';
import JobDescription from './_components/JobDescription';
import CompanyCard from './_components/CompanyCard';
import FooterSection from '@/app/compagny/_components/FooterSection';
import SimilarJobs from './_components/SimilarJobs';
import { prisma } from '@/lib/db';

interface JobCategory {
  categoryId: string;
  // add other properties if they exist
}

interface JobPageProps {
  params: {
    id: string;
  };
}

export default async function JobPage({ params }: JobPageProps) {
  const job = await prisma.jobPosting.findUnique({
    where: {
      id: params.id,
      isActive: true,
    },
    include: {
      company: {
        include: {
          benefits: true,
          commitments: true,
        },
      },
      jobCategories: {
        include: {
          category: true,
        },
      },
    },
  });

  if (!job) {
    notFound();
  }

  // Increment view count
  await prisma.jobView.create({
    data: {
      jobPostingId: job.id,
    },
  });

  // Get similar jobs
  const similarJobs = await prisma.jobPosting.findMany({
    where: {
      isActive: true,
      id: {
        not: job.id,
      },
      OR: [
        {
          companyId: job.companyId,
        },
        {
          jobCategories: {
            some: {
              categoryId: {
                in: job.jobCategories.map((jc:JobCategory) => jc.categoryId),
              },
            },
          },
        },
      ],
    },
    include: {
      company: true,
    },
    take: 4,
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <main className="flex-1 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <JobHeader job={job} />
              <JobActions job={job} />
              <JobDescription job={job} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <CompanyCard  company={job.company} />
              <SimilarJobs jobs={similarJobs} />
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: JobPageProps) {
  const job = await prisma.jobPosting.findUnique({
    where: {
      id: params.id,
    },
    include: {
      company: true,
    },
  });

  if (!job) {
    return {
      title: 'Job Not Found',
    };
  }

  return {
    title: `${job.title} at ${job.company.name} | Welcome to the Jungle`,
    description: job.description.substring(0, 160),
  };
}