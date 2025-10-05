// src/app/company/dashboard/messages/components/MessageFilters.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  RiFilterLine,
  RiStarLine,
  RiUserLine,
  RiTimeLine
} from '@remixicon/react';

interface MessageFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { id: 'all', label: 'Tous', icon: RiUserLine },
  { id: 'unread', label: 'Non lus', icon: RiTimeLine },
  { id: 'important', label: 'Importants', icon: RiStarLine },
];

export default function MessageFilters({ activeFilter, onFilterChange }: MessageFiltersProps) {
  return (
    <div className="p-4 border-b">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium flex items-center gap-2">
          <RiFilterLine className="h-4 w-4" />
          Filtres
        </h3>
        <Badge variant="secondary">24</Badge>
      </div>
      
      <div className="space-y-1">
        {filters.map(filter => (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => onFilterChange(filter.id)}
          >
            <filter.icon className="h-4 w-4 mr-2" />
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  );
}