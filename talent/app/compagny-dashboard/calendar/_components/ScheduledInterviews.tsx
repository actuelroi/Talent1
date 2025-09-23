// src/app/company/dashboard/calendar/components/ScheduledInterviews.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RiVideoLine, RiPhoneLine, RiUserLine, RiTimeLine } from '@remixicon/react';

interface ScheduledInterviewsProps {
  interviews: any[];
  onViewDetails: (interview: any) => void;
}

export default function ScheduledInterviews({ interviews, onViewDetails }: ScheduledInterviewsProps) {
  const getInterviewTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <RiVideoLine className="h-4 w-4" />;
      case 'phone': return <RiPhoneLine className="h-4 w-4" />;
      default: return <RiUserLine className="h-4 w-4" />;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-4">Entretiens planifiés</h3>
        
        <div className="space-y-3">
          {interviews.slice(0, 5).map(interview => (
            <div
              key={interview.id}
              className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
              onClick={() => onViewDetails(interview)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getInterviewTypeIcon(interview.interviewType)}
                  <span className="font-medium text-sm">{interview.candidate?.name}</span>
                </div>
                <Badge variant={
                  interview.status === 'scheduled' ? 'secondary' :
                  interview.status === 'confirmed' ? 'default' : 'outline'
                }>
                  {interview.status === 'scheduled' ? 'Planifié' : 'Confirmé'}
                </Badge>
              </div>
              
              <div className="text-xs text-gray-600 mb-1">
                {interview.jobPosition}
              </div>
              
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <RiTimeLine className="h-3 w-3" />
                {formatTime(new Date(interview.start))} - {formatTime(new Date(interview.end))}
              </div>
            </div>
          ))}
          
          {interviews.length === 0 && (
            <p className="text-gray-500 text-center py-4">Aucun entretien planifié</p>
          )}
          
          {interviews.length > 5 && (
            <Button variant="outline" className="w-full">
              Voir tous les entretiens ({interviews.length})
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}