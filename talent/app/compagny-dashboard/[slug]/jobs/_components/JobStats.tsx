// src/app/company/jobs/components/JobStats.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  RiFileListLine,
  RiUserLine,
  RiEyeLine,
  RiCalendarLine,
} from '@remixicon/react';

interface JobStatsProps {
  jobs: any[];
}

export default function JobStats({ jobs }: JobStatsProps) {
  const activeJobs = jobs.filter(job => job.status === 'active').length;
  const draftJobs = jobs.filter(job => job.status === 'draft').length;
  const totalApplications = jobs.reduce((sum, job) => sum + job.applications, 0);
  const totalViews = jobs.reduce((sum, job) => sum + job.views, 0);
  const expiringSoon = jobs.filter(job => {
    const daysUntilExpiry = Math.ceil(
      (new Date(job.expirationDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    return daysUntilExpiry <= 7 && job.status === 'active';
  }).length;

  const stats = [
    {
      label: "Offres actives",
      value: activeJobs,
      icon: RiFileListLine,
      color: "text-blue-600",
      change: "+2 ce mois"
    },
    {
      label: "Candidatures totales",
      value: totalApplications,
      icon: RiUserLine,
      color: "text-green-600",
      change: "+24 cette semaine"
    },
    {
      label: "Vues totales",
      value: totalViews.toLocaleString(),
      icon: RiEyeLine,
      color: "text-purple-600",
      change: "+156 aujourd'hui"
    },
    {
      label: "Expirent bientôt",
      value: expiringSoon,
      icon: RiCalendarLine,
      color: "text-orange-600",
      change: "À renouveler"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <Badge variant="outline" className="mt-1 text-xs">
                  {stat.change}
                </Badge>
              </div>
              <div className={`p-3 rounded-full bg-gray-50`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}