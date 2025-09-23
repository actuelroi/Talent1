// src/app/company/dashboard/teams/components/TeamStats.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { RiTeamLine, RiUserLine, RiProjectorLine, RiMedalLine } from '@remixicon/react';

interface TeamStatsProps {
  stats: {
    totalTeams: number;
    totalMembers: number;
    activeProjects: number;
    averagePerformance: number;
  };
}

export default function TeamStats({ stats }: TeamStatsProps) {
  const statItems = [
    {
      label: 'Équipes totales',
      value: stats.totalTeams,
      icon: RiTeamLine,
      color: 'blue'
    },
    {
      label: 'Membres',
      value: stats.totalMembers,
      icon: RiUserLine,
      color: 'green'
    },
    {
      label: 'Projets actifs',
      value: stats.activeProjects,
      icon: RiProjectorLine,
      color: 'purple'
    },
    {
      label: 'Performance moyenne',
      value: `${stats.averagePerformance}%`,
      icon: RiMedalLine,
      color: 'orange'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}