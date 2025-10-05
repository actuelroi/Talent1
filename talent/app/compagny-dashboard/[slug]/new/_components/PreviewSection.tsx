// src/app/company/jobs/new/components/PreviewSection.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, Euro, Calendar } from 'lucide-react';
import CompanyInfoCard from './CompanyInfoCard';

interface PreviewSectionProps {
  jobData: any;
  company: any;
}

export default function PreviewSection({ jobData, company }: PreviewSectionProps) {
  const formatEmploymentType = (type: string) => {
    const types: { [key: string]: string } = {
      full_time: 'CDI',
      part_time: 'Temps partiel',
      contract: 'CDD',
      internship: 'Stage',
      temporary: 'Intérim'
    };
    return types[type] || type;
  };

  const formatExperienceLevel = (level: string) => {
    const levels: { [key: string]: string } = {
      internship: 'Stage',
      entry_level: 'Débutant',
      junior: 'Junior (1-3 ans)',
      mid_level: 'Confirmé (3-5 ans)',
      senior: 'Senior (5+ ans)',
      lead: 'Lead/Manager'
    };
    return levels[level] || level;
  };

  const formatRemotePolicy = (policy: string) => {
    const policies: { [key: string]: string } = {
      onsite: 'Sur site',
      hybrid: 'Hybride',
      remote: '100% télétravail'
    };
    return policies[policy] || policy;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Aperçu de l'offre</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {jobData.title ? (
            <>
              <h3 className="font-bold text-lg text-gray-900">{jobData.title}</h3>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {jobData.location || 'Non spécifié'}
                </Badge>
                
                <Badge variant="outline" className="flex items-center gap-1">
                  <Briefcase className="h-3 w-3" />
                  {formatEmploymentType(jobData.employmentType)}
                </Badge>
                
                {jobData.remotePolicy && (
                  <Badge variant="secondary">
                    {formatRemotePolicy(jobData.remotePolicy)}
                  </Badge>
                )}
              </div>

              {jobData.salaryMin && jobData.salaryMax && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Euro className="h-4 w-4" />
                  <span>
                    {jobData.salaryMin} - {jobData.salaryMax} {jobData.currency}
                  </span>
                </div>
              )}

              {jobData.experienceLevel && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Niveau: </span>
                  {formatExperienceLevel(jobData.experienceLevel)}
                </div>
              )}

              {jobData.description && (
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-sm text-gray-600 line-clamp-4">
                    {jobData.description}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Commencez à remplir le formulaire pour voir l'aperçu</p>
            </div>
          )}
        </CardContent>
      </Card>

      <CompanyInfoCard company={company} />
    </div>
  );
}