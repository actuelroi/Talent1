// src/app/company/jobs/components/JobListings.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import JobCard from './JobCard';
import JobsTableView from './JobsTableView';


interface JobListingsProps {
  jobs: any[];
  onDeleteJob: (jobId: number) => void;
  onUpdateJob: (job: any) => void;
}

export default function JobListings({ jobs, onDeleteJob, onUpdateJob }: JobListingsProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [sortBy, setSortBy] = useState('date-desc');

  const sortedJobs = [...jobs].sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime();
      case 'date-asc':
        return new Date(a.publicationDate).getTime() - new Date(b.publicationDate).getTime();
      case 'applications':
        return b.applications - a.applications;
      case 'views':
        return b.views - a.views;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-gray-600">{jobs.length} offres trouvées</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Date (récent)</SelectItem>
              <SelectItem value="date-asc">Date (ancien)</SelectItem>
              <SelectItem value="applications">Candidatures</SelectItem>
              <SelectItem value="views">Vues</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant={viewMode === 'grid' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            Grille
          </Button>
          <Button 
            variant={viewMode === 'table' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewMode('table')}
          >
            Tableau
          </Button>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? (
        <div className="grid gap-6">
          {sortedJobs.map(job => (
            <JobCard 
              key={job.id} 
              job={job}
              onDelete={onDeleteJob}
              onUpdate={onUpdateJob}
            />
          ))}
        </div>
      ) : (
        <JobsTableView jobs={sortedJobs} />
      )}

      {/* Empty State */}
      {jobs.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-lg font-semibold mb-2">Aucune offre trouvée</h3>
            <p className="text-gray-600 mb-4">
              Aucune offre ne correspond à vos critères de recherche.
            </p>
            <Button variant="outline">
              Créer votre première offre
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}