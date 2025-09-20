// src/app/jobs/[id]/components/SimilarJobs.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Company, JobPosting } from '@/lib/generated/prisma';


interface SimilarJobsProps {
  jobs: (JobPosting & { company: Company })[];
}

export default function SimilarJobs({ jobs }: SimilarJobsProps) {
  if (jobs.length === 0) {
    return null;
  }

  const formatDate = (date: Date) => {
    return new Intl.RelativeTimeFormat('fr-FR', { numeric: 'auto' }).format(
      Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      'day'
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Offres similaires</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {jobs.map(job => (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              className="block p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                {job.title}
              </h4>
              
              <p className="text-sm text-gray-600 mb-3">{job.company.name}</p>
              
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="text-xs">
                  <MapPin className="h-3 w-3 mr-1" />
                  {job.location}
                </Badge>
                
                <Badge variant="outline" className="text-xs">
                  <Briefcase className="h-3 w-3 mr-1" />
                  {job.employmentType === 'INTERNSHIP' ? 'Stage' : 'CDI'}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="h-3 w-3" />
                Publié {formatDate(job.createdAt)}
              </div>
            </Link>
          ))}
        </div>
        
        <Link
          href="/jobs"
          className="block text-center text-blue-600 hover:text-blue-800 text-sm font-medium mt-4"
        >
          Voir toutes les offres →
        </Link>
      </CardContent>
    </Card>
  );
}