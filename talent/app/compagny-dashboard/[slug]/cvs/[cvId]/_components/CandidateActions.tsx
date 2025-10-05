'use client';

import { Button } from '@/components/ui/button';
import {
  RiMailLine,
  RiPhoneLine,
  RiCalendarLine,
  RiCloseLine,
} from '@remixicon/react';

interface CandidateActionsProps {
  candidate: {
    candidate: string;
    email: string;
    phone: string;
  };
  onContact: (type: 'email' | 'phone') => void;
  onSchedule: () => void;
  onReject: () => void;
}

export default function CandidateActions({
  candidate,
  onContact,
  onSchedule,
  onReject,
}: CandidateActionsProps) {
  return (
    <div className="space-y-3">
      <Button 
        className="w-full justify-start"
        onClick={() => onContact('email')}
      >
        <RiMailLine className="h-4 w-4 mr-2" />
        Envoyer un email
      </Button>
      
      <Button 
        variant="outline" 
        className="w-full justify-start"
        onClick={() => onContact('phone')}
      >
        <RiPhoneLine className="h-4 w-4 mr-2" />
        Appeler le candidat
      </Button>
      
      <Button 
        variant="outline" 
        className="w-full justify-start"
        onClick={onSchedule}
      >
        <RiCalendarLine className="h-4 w-4 mr-2" />
        Planifier un entretien
      </Button>
      
      <Button 
        variant="destructive" 
        className="w-full justify-start"
        onClick={onReject}
      >
        <RiCloseLine className="h-4 w-4 mr-2" />
        Refuser la candidature
      </Button>
    </div>
  );
}