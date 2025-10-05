// src/app/company/jobs/components/JobsTableView.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  RiEyeLine,
  RiEditLine,
  RiMoreLine,
  RiExternalLinkLine,
} from '@remixicon/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface JobsTableViewProps {
  jobs: any[];
}

export default function JobsTableView({ jobs }: JobsTableViewProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'draft':
        return 'outline';
      case 'expired':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'draft':
        return 'Brouillon';
      case 'expired':
        return 'Expiré';
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-4 font-medium text-sm text-gray-600">OFFRE D'EMPLOI</th>
                <th className="text-left p-4 font-medium text-sm text-gray-600">STATUT</th>
                <th className="text-left p-4 font-medium text-sm text-gray-600">LOCALISATION</th>
                <th className="text-left p-4 font-medium text-sm text-gray-600">CANDIDATURES</th>
                <th className="text-left p-4 font-medium text-sm text-gray-600">VUES</th>
                <th className="text-left p-4 font-medium text-sm text-gray-600">PUBLIÉE LE</th>
                <th className="text-left p-4 font-medium text-sm text-gray-600">EXPIRE LE</th>
                <th className="text-left p-4 font-medium text-sm text-gray-600">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b hover:bg-gray-50 transition-colors">
                  {/* Job Title */}
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-gray-900 mb-1">{job.title}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-2">
                        <span>{job.department}</span>
                        <span>•</span>
                        <span>{job.type}</span>
                      </div>
                    </div>
                  </td>
                  
                  {/* Status */}
                  <td className="p-4">
                    <Badge variant={getStatusVariant(job.status)} className="capitalize">
                      {getStatusText(job.status)}
                    </Badge>
                  </td>
                  
                  {/* Location */}
                  <td className="p-4 text-sm text-gray-600">{job.location}</td>
                  
                  {/* Applications */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{job.applications}</span>
                      {job.applications > 0 && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs">
                          Nouveaux
                        </Badge>
                      )}
                    </div>
                  </td>
                  
                  {/* Views */}
                  <td className="p-4 text-sm text-gray-600">{job.views.toLocaleString()}</td>
                  
                  {/* Publication Date */}
                  <td className="p-4 text-sm text-gray-600">{formatDate(job.publicationDate)}</td>
                  
                  {/* Expiration Date */}
                  <td className="p-4">
                    <div className="text-sm">
                      <div className="text-gray-600">{formatDate(job.expirationDate)}</div>
                      {job.status === 'active' && (
                        <div className="text-xs text-orange-600">
                          {Math.ceil((new Date(job.expirationDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} jours
                        </div>
                      )}
                    </div>
                  </td>
                  
                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <RiEyeLine className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <RiEditLine className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <RiMoreLine className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <RiEyeLine className="h-4 w-4 mr-2" />
                            Aperçu
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RiExternalLinkLine className="h-4 w-4 mr-2" />
                            Voir public
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RiEditLine className="h-4 w-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Archiver
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty State */}
        {jobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-lg font-semibold mb-2">Aucune offre disponible</h3>
            <p className="text-gray-600">Commencez par créer votre première offre d'emploi.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}