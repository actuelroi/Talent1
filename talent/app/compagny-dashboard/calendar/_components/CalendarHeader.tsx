// src/app/company/dashboard/calendar/components/CalendarHeader.tsx
'use client';

import { Button } from '@/components/ui/button';
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';

interface CalendarHeaderProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  view: 'month' | 'week' | 'day';
}

export default function CalendarHeader({ currentDate, onDateChange, view }: CalendarHeaderProps) {
  const formatHeaderTitle = () => {
    switch (view) {
      case 'month':
        return currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
      case 'week':
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        
        return `${startOfWeek.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} - ${endOfWeek.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}`;
      case 'day':
        return currentDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      default:
        return '';
    }
  };

  const navigate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    
    switch (view) {
      case 'month':
        newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
        break;
      case 'week':
        newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
        break;
      case 'day':
        newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
        break;
    }
    
    onDateChange(newDate);
  };

  return (
    <div className="flex items-center gap-4">
      <Button variant="outline" size="icon" onClick={() => navigate('prev')}>
        <RiArrowLeftSLine className="h-4 w-4" />
      </Button>
      
      <h2 className="text-xl font-semibold min-w-[200px] text-center">
        {formatHeaderTitle()}
      </h2>
      
      <Button variant="outline" size="icon" onClick={() => navigate('next')}>
        <RiArrowRightSLine className="h-4 w-4" />
      </Button>
    </div>
  );
}