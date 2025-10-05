// src/app/company/dashboard/teams/components/ProjectCard.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  RiCalendarLine, 
  RiUserLine,
  RiArrowRightLine 
} from '@remixicon/react';

interface ProjectCardProps {
  project: any;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'planned': return 'bg-yellow-100 text-yellow-800';
      case 'on-hold': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining(project.deadline);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold">{project.name}</h3>
              <Badge variant="secondary" className={getStatusColor(project.status)}>
                {project.status === 'completed' ? 'Terminé' : 
                 project.status === 'in-progress' ? 'En cours' : 
                 project.status === 'planned' ? 'Planifié' : 'En pause'}
              </Badge>
            </div>
            <p className="text-gray-600 text-sm">{project.description}</p>
          </div>
          <Button variant="ghost" size="icon">
            <RiArrowRightLine className="h-4 w-4" />
          </Button>
        </div>

        {/* Progression */}
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span>Progression</span>
            <span>{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        {/* Métriques */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <RiUserLine className="h-4 w-4" />
              <span>{project.members} membres</span>
            </div>
            <div className="flex items-center gap-1">
              <RiCalendarLine className="h-4 w-4" />
              <span>{daysRemaining} jours</span>
            </div>
          </div>
          
          <Badge variant={daysRemaining < 7 ? "destructive" : "outline"}>
            {daysRemaining < 0 ? 'En retard' : `${daysRemaining}j restants`}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}