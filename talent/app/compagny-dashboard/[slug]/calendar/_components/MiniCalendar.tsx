// src/app/company/dashboard/calendar/components/MiniCalendar.tsx
'use client';

import { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';

interface MiniCalendarProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  events: any[];
}

export default function MiniCalendar({ currentDate, onDateChange, events }: MiniCalendarProps) {
  const days = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay());
    
    const endDate = new Date(lastDay);
    endDate.setDate(lastDay.getDate() + (6 - lastDay.getDay()));
    
    const days = [];
    let currentDay = new Date(startDate);
    
    while (currentDay <= endDate) {
      days.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }
    
    return days;
  }, [currentDate]);

  const hasEvents = (date: Date) => {
    return events.some(event => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    onDateChange(newDate);
  };

  return (
    <Card>
      <CardContent className="p-4">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigateMonth('prev')}>
            <RiArrowLeftSLine className="h-4 w-4" />
          </Button>
          
          <span className="font-semibold">
            {currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
          </span>
          
          <Button variant="ghost" size="icon" onClick={() => navigateMonth('next')}>
            <RiArrowRightSLine className="h-4 w-4" />
          </Button>
        </div>

        {/* Jours de la semaine */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(day => (
            <div key={day} className="text-center text-xs text-gray-500 p-1">
              {day}
            </div>
          ))}
        </div>

        {/* Grille des jours */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            const isToday = new Date().toDateString() === date.toDateString();
            const isCurrentMonth = date.getMonth() === currentDate.getMonth();
            const hasEvent = hasEvents(date);
            
            return (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                className={`
                  h-8 w-8 text-xs
                  ${isToday ? 'bg-blue-500 text-white' : ''}
                  ${!isCurrentMonth ? 'text-gray-400' : ''}
                  ${hasEvent ? 'relative' : ''}
                `}
                onClick={() => onDateChange(date)}
              >
                {date.getDate()}
                {hasEvent && (
                  <div className="absolute bottom-1 w-1 h-1 bg-blue-500 rounded-full" />
                )}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}