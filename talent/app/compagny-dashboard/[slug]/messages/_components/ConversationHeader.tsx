// src/app/company/dashboard/messages/components/ConversationHeader.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  RiMoreLine,
  RiPhoneLine,
  RiVideoLine,
  RiUserLine,
  RiStarLine,
  RiArrowLeftLine
} from '@remixicon/react';

interface ConversationHeaderProps {
  conversation: any;
  onBack?: () => void;
}

export default function ConversationHeader({ conversation, onBack }: ConversationHeaderProps) {
  const candidate = conversation.candidate;

  return (
    <div className="border-b bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden">
              <RiArrowLeftLine className="h-5 w-5" />
            </Button>
          )}
          
          <div className="relative">
            <img
              src={candidate.image}
              alt={candidate.name}
              className="w-10 h-10 rounded-full"
            />
            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
              conversation.status === 'online' ? 'bg-green-500' : 'bg-gray-300'
            }`} />
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{candidate.name}</h3>
              <Badge variant="outline" className="text-xs">
                {conversation.status === 'online' ? 'En ligne' : 'Hors ligne'}
              </Badge>
            </div>
            <p className="text-sm text-gray-600">{candidate.title} • {candidate.location}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" title="Appeler">
            <RiPhoneLine className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" title="Vidéo">
            <RiVideoLine className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" title="Voir le profil">
            <RiUserLine className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" title="Marquer important">
            <RiStarLine className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <RiMoreLine className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}