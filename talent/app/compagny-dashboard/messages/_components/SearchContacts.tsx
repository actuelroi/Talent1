// src/app/company/dashboard/messages/components/SearchContacts.tsx
'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RiSearchLine, RiAddLine } from '@remixicon/react';
import NotificationBell from '../../_components/NotificationBell';

interface SearchContactsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function SearchContacts({ searchQuery, onSearchChange }: SearchContactsProps) {
  return (
    <div className="p-4 border-b">
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-lg font-semibold flex-1">Messages</h2>
        <Button variant="ghost" size="icon" title="Nouvelle conversation">
          <RiAddLine className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="relative">
        <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Rechercher une conversation..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4"
        />
      </div>
      
    </div>
  );
}