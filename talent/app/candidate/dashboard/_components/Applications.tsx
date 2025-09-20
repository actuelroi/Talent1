// src/app/candidate/dashboard/components/Applications.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RiEyeLine, RiCalendarLine, RiMapPinLine } from "@remixicon/react";

export default function Applications() {
  const applications = [
    {
      id: 1,
      position: 'Développeur Frontend React',
      company: 'L\'Oréal',
      status: 'En cours',
      date: '2024-01-15',
      location: 'Paris, France',
      match: 92
    },
    {
      id: 2,
      position: 'Product Designer',
      company: 'Google',
      status: 'Entretien',
      date: '2024-01-12',
      location: 'Lyon, France',
      match: 85
    },
    {
      id: 3,
      position: 'Data Scientist',
      company: 'Amazon',
      status: 'Refusé',
      date: '2024-01-08',
      location: 'Toulouse, France',
      match: 78
    },
    {
      id: 4,
      position: 'UX Researcher',
      company: 'Microsoft',
      status: 'Accepté',
      date: '2024-01-05',
      location: 'Bordeaux, France',
      match: 95
    }
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'En cours': return 'secondary';
      case 'Entretien': return 'default';
      case 'Accepté': return 'success';
      case 'Refusé': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mes Candidatures</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Toutes</Button>
          <Button variant="outline">En cours</Button>
          <Button variant="outline">Entretiens</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dernières candidatures</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {applications.map((application) => (
              <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{application.position}</h3>
                    {/* <Badge variant={getStatusVariant(application.status)}> */}
                    <Badge variant='default'>
                      {application.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-2">{application.company}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <RiMapPinLine className="h-4 w-4" />
                      {application.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <RiCalendarLine className="h-4 w-4" />
                      {new Date(application.date).toLocaleDateString('fr-FR')}
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      Match: {application.match}%
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <RiEyeLine className="h-4 w-4 mr-2" />
                  Voir
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button variant="outline">Voir toutes mes candidatures</Button>
      </div>
    </div>
  );
}