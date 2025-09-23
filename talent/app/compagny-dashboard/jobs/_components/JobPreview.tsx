// src/app/company/jobs/components/JobPreview.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  RiMapPinLine,
  RiBriefcaseLine,
  RiTimeLine,
  RiMoneyEuroCircleLine,
  RiUserLine,
  RiCalendarLine,
  RiArrowLeftLine,
  RiShareLine,
  RiEditLine,
} from '@remixicon/react';

interface JobPreviewProps {
  job: any;
  onBack: () => void;
  onEdit: (job: any) => void;
}

export default function JobPreview({ job, onBack, onEdit }: JobPreviewProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <RiArrowLeftLine className="h-4 w-4" />
          Retour aux offres
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <RiShareLine className="h-4 w-4" />
            Partager
          </Button>
          <Button onClick={() => onEdit(job)} className="flex items-center gap-2">
            <RiEditLine className="h-4 w-4" />
            Modifier
          </Button>
        </div>
      </div>

      {/* Job Preview */}
      <Card>
        <CardContent className="p-8">
          {/* Header */}
          <div className="border-b pb-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <div className="flex items-center gap-4 text-lg text-gray-600">
                  <span className="flex items-center gap-1">
                    <RiBriefcaseLine className="h-5 w-5" />
                    {job.department}
                  </span>
                  <span className="flex items-center gap-1">
                    <RiMapPinLine className="h-5 w-5" />
                    {job.location}
                  </span>
                </div>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 text-lg px-4 py-2">
                {job.type}
              </Badge>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <RiMoneyEuroCircleLine className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-semibold">{job.salary}</div>
                  <div className="text-sm text-gray-600">Salaire</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <RiUserLine className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-semibold">{job.experience}</div>
                  <div className="text-sm text-gray-600">Expérience</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <RiTimeLine className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="font-semibold">{job.remote}</div>
                  <div className="text-sm text-gray-600">Mode de travail</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <RiCalendarLine className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="font-semibold">{formatDate(job.expirationDate)}</div>
                  <div className="text-sm text-gray-600">Expire le</div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-lg max-w-none mb-8">
            <h2 className="text-2xl font-bold mb-4">Description du poste</h2>
            <div className="text-gray-700 space-y-4">
              {job.description?.split('\n').map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              )) || (
                <p className="text-gray-500 italic">
                  Aucune description n'a été ajoutée pour cette offre.
                </p>
              )}
            </div>
          </div>

          {/* Requirements */}
          {job.requirements && (
            <div className="prose prose-lg max-w-none mb-8">
              <h2 className="text-2xl font-bold mb-4">Profil recherché</h2>
              <ul className="text-gray-700 space-y-2">
                {job.requirements.map((req: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {job.benefits && (
            <div className="prose prose-lg max-w-none mb-8">
              <h2 className="text-2xl font-bold mb-4">Avantages</h2>
              <ul className="text-gray-700 space-y-2">
                {job.benefits.map((benefit: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          <div className="mb-8">
            <h3 className="font-semibold mb-3">Compétences recherchées</h3>
            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4">Statistiques</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{job.views}</div>
                <div className="text-sm text-gray-600">Vues</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{job.applications}</div>
                <div className="text-sm text-gray-600">Candidatures</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round((job.applications / job.views) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Taux de conversion</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {Math.ceil((new Date(job.expirationDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))}j
                </div>
                <div className="text-sm text-gray-600">Jours restants</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button variant="outline" size="lg">
          Voir les candidatures
        </Button>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
          Promouvoir cette offre
        </Button>
      </div>
    </div>
  );
}