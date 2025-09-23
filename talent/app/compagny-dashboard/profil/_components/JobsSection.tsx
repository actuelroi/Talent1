// src/app/company/dashboard/components/JobsSection.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RiAddLine, RiEditLine, RiRemoteControlLine } from "@remixicon/react";

interface JobsSectionProps {
  jobs: any[];
  onUpdate: (jobs: any[]) => void;
}

export default function JobsSection({ jobs, onUpdate }: JobsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Offres d'emploi</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <RiAddLine className="h-4 w-4 mr-2" />
          Nouvelle offre
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Derniers jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">{job.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>{job.type}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                    {job.remote && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <RiRemoteControlLine className="h-4 w-4" />
                          Télétravail fréquent
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {job.featured && (
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                      En vedette
                    </Badge>
                  )}
                  <Button variant="outline" size="sm">
                    <RiEditLine className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline">
              Voir toutes nos offres (27)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}