// src/app/company/dashboard/calendar/components/MonthView.tsx
'use client';

import { useMemo } from 'react';

interface MonthViewProps {
  currentDate: Date;
  events: any[];
  onEventClick: (event: any) => void;
}

export default function MonthView({ currentDate, events, onEventClick }: MonthViewProps) {
  const weeks = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay() + 1);
    
    const endDate = new Date(lastDay);
    endDate.setDate(lastDay.getDate() + (6 - lastDay.getDay()) + 1);
    
    const weeks = [];
    let currentWeek = [];
    let dateIterator = new Date(startDate); // Correction: renommer la variable
    
    while (dateIterator <= endDate) {
      currentWeek.push(new Date(dateIterator));
      dateIterator.setDate(dateIterator.getDate() + 1);
      
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    
    return weeks;
  }, [currentDate]);

  const getEventsForDay = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const isToday = (date: Date) => {
    return new Date().toDateString() === date.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  return (
    <div className="h-full p-4">
      {/* En-têtes des jours */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Grille du mois */}
      <div className="grid grid-cols-7 gap-1">
        {weeks.flat().map((date, index) => (
          <div
            key={index}
            className={`
              min-h-[120px] p-2 border rounded-lg
              ${isToday(date) ? 'bg-blue-50 border-blue-200' : 'border-gray-200'}
              ${!isCurrentMonth(date) ? 'bg-gray-50 text-gray-400' : ''}
            `}
          >
            <div className="flex justify-between items-center mb-1">
              <span className={`
                text-sm font-medium
                ${isToday(date) ? 'bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''}
              `}>
                {date.getDate()}
              </span>
            </div>
            
            <div className="space-y-1">
              {getEventsForDay(date).slice(0, 3).map(event => (
                <div
                  key={event.id}
                  className="text-xs p-1 rounded cursor-pointer truncate"
                  style={{ backgroundColor: event.color, color: 'white' }}
                  onClick={() => onEventClick(event)}
                >
                  {event.title}
                </div>
              ))}
              {getEventsForDay(date).length > 3 && (
                <div className="text-xs text-gray-500">
                  +{getEventsForDay(date).length - 3} autres
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}