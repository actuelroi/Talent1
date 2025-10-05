// src/app/company/dashboard/teams/components/TeamPerformance.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
 
  RiMedalLine,
  RiStarLine,
  RiTreeLine,
  RiTrelloLine,
  RiUploadLine,
  RiUserHeartLine 
} from '@remixicon/react';

interface TeamPerformanceProps {
  performance: any;
  detailed?: boolean;
}

export default function TeamPerformance({ performance, detailed = false }: TeamPerformanceProps) {
  const metrics = [
    {
      label: 'Productivité',
      value: performance.metrics.productivity,
      icon: RiTreeLine,
      color: 'green'
    },
    {
      label: 'Qualité',
      value: performance.metrics.quality,
      icon: RiStarLine,
      color: 'blue'
    },
    {
      label: 'Collaboration',
      value: performance.metrics.collaboration,
      icon: RiUserHeartLine,
      color: 'purple'
    }
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Performance de l'équipe</h2>
          <Badge variant={performance.trend === 'up' ? 'default' : 'secondary'}>
            {performance.trend === 'up' ? (
              <RiUploadLine className="h-4 w-4 mr-1" />
            ) : (
              <RiTrelloLine className="h-4 w-4 mr-1" />
            )}
            {performance.trend === 'up' ? 'En hausse' : 'En baisse'}
          </Badge>
        </div>

        {/* Score principal */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <RiMedalLine className="h-8 w-8 text-yellow-500" />
            <span className="text-4xl font-bold">{performance.current}%</span>
          </div>
          <p className="text-gray-600">Score de performance global</p>
        </div>

        {/* Métriques détaillées */}
        {detailed && (
          <div className="space-y-4">
            {metrics.map((metric, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <metric.icon className={`h-4 w-4 text-${metric.color}-600`} />
                    <span className="font-medium">{metric.label}</span>
                  </div>
                  <span className="font-semibold">{metric.value}%</span>
                </div>
                <Progress value={metric.value} className="h-2" />
              </div>
            ))}
          </div>
        )}

        {/* Vue simplifiée */}
        {!detailed && (
          <div className="grid grid-cols-3 gap-4">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className={`text-2xl font-bold text-${metric.color}-600`}>
                  {metric.value}%
                </div>
                <div className="text-sm text-gray-600">{metric.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Insights */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Insights</h4>
          <p className="text-blue-800 text-sm">
            {performance.trend === 'up' 
              ? "L'équipe montre une amélioration constante de ses performances cette semaine."
              : "Les performances ont légèrement baissé, envisagez une réunion de suivi."
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
}