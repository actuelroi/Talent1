// src/app/company/dashboard/calendar/components/CalendarFilters.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { RiFilterLine, RiUserLine, RiTeamLine, RiCalendarLine } from '@remixicon/react';

interface CalendarFiltersProps {
  filters: any;
  onFiltersChange: (filters: any) => void;
}

const eventTypes = [
  { id: 'interview', label: 'Entretiens', color: '#3B82F6', icon: RiUserLine },
  { id: 'meeting', label: 'Réunions', color: '#10B981', icon: RiTeamLine },
  { id: 'reminder', label: 'Rappels', color: '#F59E0B', icon: RiCalendarLine },
  { id: 'availability', label: 'Disponibilités', color: '#8B5CF6', icon: RiCalendarLine }
];

const statusTypes = [
  { id: 'scheduled', label: 'Planifié', color: 'yellow' },
  { id: 'confirmed', label: 'Confirmé', color: 'green' },
  { id: 'cancelled', label: 'Annulé', color: 'red' },
  { id: 'completed', label: 'Terminé', color: 'gray' }
];

export default function CalendarFilters({ filters, onFiltersChange }: CalendarFiltersProps) {
  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleType = (typeId: string) => {
    const newTypes = filters.types.includes(typeId)
      ? filters.types.filter((t: string) => t !== typeId)
      : [...filters.types, typeId];
    updateFilter('types', newTypes);
  };

  const toggleStatus = (statusId: string) => {
    const newStatuses = filters.statuses.includes(statusId)
      ? filters.statuses.filter((s: string) => s !== statusId)
      : [...filters.statuses, statusId];
    updateFilter('statuses', newStatuses);
  };

  const activeFilterCount = filters.types.length + filters.statuses.length;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <Label className="flex items-center gap-2">
            <RiFilterLine className="h-4 w-4" />
            Filtres
          </Label>
          {activeFilterCount > 0 && (
            <Badge variant="secondary">{activeFilterCount}</Badge>
          )}
        </div>

        {/* Types d'événements */}
        <div className="space-y-3">
          <Label>Types d'événements</Label>
          {eventTypes.map(type => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type.id}`}
                checked={filters.types.includes(type.id)}
                onCheckedChange={() => toggleType(type.id)}
              />
              <Label htmlFor={`type-${type.id}`} className="text-sm font-normal flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: type.color }}
                />
                {type.label}
              </Label>
            </div>
          ))}
        </div>

        {/* Statuts */}
        <div className="space-y-3 mt-4">
          <Label>Statuts</Label>
          {statusTypes.map(status => (
            <div key={status.id} className="flex items-center space-x-2">
              <Checkbox
                id={`status-${status.id}`}
                checked={filters.statuses.includes(status.id)}
                onCheckedChange={() => toggleStatus(status.id)}
              />
              <Label htmlFor={`status-${status.id}`} className="text-sm font-normal">
                {status.label}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}