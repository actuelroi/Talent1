// src/app/jobs/[id]/components/JobHeader.tsx
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, Calendar, Clock, Euro } from 'lucide-react';
import { JobPosting, Company, JobPostingCategory, Category } from '@/lib/generated/prisma';

interface JobWithRelations extends JobPosting {
  company: Company;
  jobCategories: (JobPostingCategory & {
    category: Category;
  })[];
}

interface JobHeaderProps {
  job: JobWithRelations;
}

export default function JobHeader({ job }: JobHeaderProps) {
  const formatDate = (date: Date) => {
    return new Intl.RelativeTimeFormat('fr-FR', { numeric: 'auto' }).format(
      Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      'day'
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
          {job.company.logo ? (
            <img 
              src={job.company.logo} 
              alt={job.company.name}
              className="w-12 h-12 object-contain"
            />
          ) : (
            <span className="text-2xl font-bold text-gray-600">
              {job.company.name.charAt(0)}
            </span>
          )}
        </div>
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
          <h2 className="text-xl text-gray-600 mb-4">{job.company.name}</h2>
          
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="outline" className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {job.location}
            </Badge>
            
            <Badge variant="outline" className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              {job.employmentType === 'INTERNSHIP' ? 'Stage' : 
               job.employmentType === 'FULL_TIME' ? 'CDI' :
               job.employmentType === 'PART_TIME' ? 'Temps partiel' :
               job.employmentType}
            </Badge>
            
            {job.remotePolicy !== 'ONSITE' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {job.remotePolicy === 'REMOTE' ? 'Télétravail complet' : 'Télétravail hybride'}
              </Badge>
            )}
            
            {job.salaryMin && job.salaryMax && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Euro className="h-4 w-4" />
                {job.salaryMin.toLocaleString()} - {job.salaryMax.toLocaleString()} €
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Publié {formatDate(job.createdAt)}
            </span>
            
            {job.expiresAt && (
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Expire {formatDate(job.expiresAt)}
              </span>
            )}
            
            <span>{job.views} vues</span>
          </div>
        </div>
      </div>
      
      {job.jobCategories.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Catégories</h3>
          <div className="flex flex-wrap gap-2">
            {job.jobCategories.map(({ category }) => (
              <Badge key={category.id} variant="outline">
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}