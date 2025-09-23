// src/app/company/dashboard/teams/components/MemberCard.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  RiMoreLine, 
  RiMessageLine, 
  RiUserLine,
  RiCalendarLine 
} from '@remixicon/react';
import RoleBadge from './RoleBadge';
import AvailabilityIndicator from './AvailabilityIndicator';

interface MemberCardProps {
  member: any;
}

export default function MemberCard({ member }: MemberCardProps) {
  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        {/* En-tête */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-12 h-12 rounded-full"
              />
              <AvailabilityIndicator status={member.status} />
            </div>
            <div>
              <h3 className="font-semibold">{member.name}</h3>
              <RoleBadge role={member.role} />
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <RiMoreLine className="h-4 w-4" />
          </Button>
        </div>

        {/* Informations */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <RiUserLine className="h-4 w-4" />
            {member.email}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <RiCalendarLine className="h-4 w-4" />
            Membre depuis {formatJoinDate(member.joinDate)}
          </div>
        </div>

        {/* Performance */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Performance</span>
            <span className="font-medium">{member.performance}%</span>
          </div>
          <Progress value={member.performance} className="h-2" />
        </div>

        {/* Stats */}
        <div className="flex justify-between text-center mb-4">
          <div>
            <div className="font-semibold">{member.projects}</div>
            <div className="text-xs text-gray-500">Projets</div>
          </div>
          <div>
            <div className="font-semibold">98%</div>
            <div className="text-xs text-gray-500">Disponibilité</div>
          </div>
          <div>
            <div className="font-semibold">4.8</div>
            <div className="text-xs text-gray-500">Note</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <RiMessageLine className="h-4 w-4 mr-2" />
            Message
          </Button>
          <Button variant="outline" size="sm">
            Profil
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}