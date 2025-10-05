// src/app/company/dashboard/teams/components/TeamProjects.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  RiAddLine, 
  RiCalendarLine, 
  RiUserLine,
  RiArrowRightLine 
} from '@remixicon/react';
import ProjectCard from './ProjectCard';

interface TeamProjectsProps {
  projects: any[];
}

export default function TeamProjects({ projects }: TeamProjectsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'planned': return 'bg-yellow-100 text-yellow-800';
      case 'on-hold': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Terminé';
      case 'in-progress': return 'En cours';
      case 'planned': return 'Planifié';
      case 'on-hold': return 'En pause';
      default: return status;
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Projets de l'équipe</h2>
          <Button variant="outline" size="sm">
            <RiAddLine className="h-4 w-4 mr-2" />
            Nouveau projet
          </Button>
        </div>

        <div className="space-y-4">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-8">
            <RiUserLine className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun projet</h3>
            <p className="text-gray-600 mb-4">
              Créez votre premier projet pour l'équipe
            </p>
            <Button>
              <RiAddLine className="h-4 w-4 mr-2" />
              Créer un projet
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}