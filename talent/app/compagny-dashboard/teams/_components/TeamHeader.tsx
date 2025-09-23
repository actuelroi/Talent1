// src/app/company/dashboard/teams/components/TeamHeader.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  RiSettingsLine, 
  RiNotificationLine, 
  RiShareLine,
  RiGroupLine 
} from '@remixicon/react';
import Link from 'next/link';

interface TeamHeaderProps {
  team: any;
}

export default function TeamHeader({ team }: TeamHeaderProps) {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-blue-100">
              <RiGroupLine className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{team.name}</h1>
                <Badge variant="default">Active</Badge>
              </div>
              <p className="text-gray-600 text-lg">{team.description}</p>
              
              <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <img
                    src={team.manager.avatar}
                    alt={team.manager.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>Manager: {team.manager.name}</span>
                </div>
                <span>•</span>
                <span>{team.members.length} membres</span>
                <span>•</span>
                <span>{team.projects.length} projets actifs</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline">
              <RiShareLine className="h-4 w-4 mr-2" />
              Partager
            </Button>
            <Button variant="outline">
              <RiNotificationLine className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Link href={`/compagny-dashboard/teams/123/settings`}>
            <Button variant="outline">
              <RiSettingsLine className="h-4 w-4 mr-2" />
              Paramètres
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}