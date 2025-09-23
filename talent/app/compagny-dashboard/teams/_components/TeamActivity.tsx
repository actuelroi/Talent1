// src/app/company/dashboard/teams/components/TeamActivity.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  RiMessageLine, 
  RiUserAddLine, 
  RiTaskLine,
  RiGitMergeLine,
  RiTimeLine 
} from '@remixicon/react';

interface TeamActivityProps {
  teamId: string;
  detailed?: boolean;
}

const mockActivities = [
  {
    id: 1,
    type: 'message',
    user: {
      name: 'Marie Curie',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    action: 'a commenté le projet',
    target: 'Plateforme SaaS',
    time: 'Il y a 5 min',
    read: false
  },
  {
    id: 2,
    type: 'merge',
    user: {
      name: 'Pierre Durand',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    action: 'a fusionné une pull request',
    target: 'API Restructure',
    time: 'Il y a 1 heure',
    read: true
  },
  {
    id: 3,
    type: 'task',
    user: {
      name: 'Jean Dupont',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    action: 'a complété une tâche',
    target: 'Refonte dashboard',
    time: 'Il y a 2 heures',
    read: true
  }
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'message': return RiMessageLine;
    case 'merge': return RiGitMergeLine;
    case 'task': return RiTaskLine;
    case 'join': return RiUserAddLine;
    default: return RiTimeLine;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'message': return 'text-blue-600 bg-blue-100';
    case 'merge': return 'text-green-600 bg-green-100';
    case 'task': return 'text-purple-600 bg-purple-100';
    case 'join': return 'text-orange-600 bg-orange-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

export default function TeamActivity({ teamId, detailed = false }: TeamActivityProps) {
  const activitiesToShow = detailed ? mockActivities : mockActivities.slice(0, 3);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Activité récente</h2>
          {!detailed && (
            <Button variant="ghost" size="sm">
              Voir tout
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {activitiesToShow.map(activity => {
            const IconComponent = getActivityIcon(activity.type);
            
            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                  <IconComponent className="h-4 w-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{activity.user.name}</span>
                    <span className="text-gray-600">{activity.action}</span>
                    <span className="font-medium text-sm truncate">{activity.target}</span>
                  </div>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
                
                {!activity.read && (
                  <Badge variant="destructive" className="h-2 w-2 p-0 rounded-full" />
                )}
              </div>
            );
          })}
        </div>

        {activitiesToShow.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Aucune activité récente
          </div>
        )}
      </CardContent>
    </Card>
  );
}