// src/app/jobs/[id]/components/JobDescription.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JobPosting } from '@/lib/generated/prisma';


interface JobDescriptionProps {
  job: JobPosting;
}

export default function JobDescription({ job }: JobDescriptionProps) {
  const sections = [
    {
      title: "Description du poste",
      content: job.description || '',
    },
    {
      title: "Responsabilités",
      content: job.responsibilities  || '',
    },
    {
      title: "Exigences",
      content: job.requirements || '',
    },
    {
      title: "Avantages",
      content: job.benefits || '',
    },
  ].filter(section => section.content);

  return (
    <div className="space-y-6">
      {sections.map((section, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: section.content.replace(/\n/g, '<br/>') 
              }}
            />
          </CardContent>
        </Card>
      ))}
      
      <Card>
        <CardHeader>
          <CardTitle>Informations complémentaires</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="font-medium text-gray-900">Type de contrat</dt>
              <dd className="text-gray-600">
                {job.employmentType === 'INTERNSHIP' ? 'Stage' : 
                 job.employmentType === 'FULL_TIME' ? 'CDI' :
                 job.employmentType === 'PART_TIME' ? 'Temps partiel' :
                 job.employmentType}
              </dd>
            </div>
            
            <div>
              <dt className="font-medium text-gray-900">Mode de travail</dt>
              <dd className="text-gray-600">
                {job.remotePolicy === 'ONSITE' ? 'Sur site' :
                 job.remotePolicy === 'HYBRID' ? 'Hybride' :
                 '100% télétravail'}
              </dd>
            </div>
            
            {job.salaryMin && job.salaryMax && (
              <div>
                <dt className="font-medium text-gray-900">Salaire</dt>
                <dd className="text-gray-600">
                  {job.salaryMin.toLocaleString()} - {job.salaryMax.toLocaleString()} €
                </dd>
              </div>
            )}
            
            <div>
              <dt className="font-medium text-gray-900">Niveau d'expérience</dt>
              <dd className="text-gray-600">
                {job.experienceLevel === 'INTERNSHIP' ? 'Stage' :
                 job.experienceLevel === 'ENTRY_LEVEL' ? 'Débutant' :
                 job.experienceLevel === 'JUNIOR' ? 'Junior' :
                 job.experienceLevel === 'MID_LEVEL' ? 'Confirmé' :
                 job.experienceLevel === 'SENIOR' ? 'Senior' :
                 job.experienceLevel === 'LEAD' ? 'Lead' :
                 'Direction'}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}