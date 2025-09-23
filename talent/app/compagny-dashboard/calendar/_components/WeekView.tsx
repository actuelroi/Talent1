// src/app/company/dashboard/calendar/components/WeekView.tsx
'use client';

import { useMemo } from 'react';

interface WeekViewProps {
  currentDate: Date;
  events: any[];
  onEventClick: (event: any) => void;
}

export default function WeekView({ currentDate, events, onEventClick }: WeekViewProps) {
  const weekDays = useMemo(() => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  }, [currentDate]);

  const hours = useMemo(() => {
    const hours = [];
    for (let i = 8; i <= 20; i++) {
      hours.push(i);
    }
    return hours;
  }, []);

  const getEventsForDay = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const isToday = (date: Date) => {
    return new Date().toDateString() === date.toDateString();
  };

  return (
    <div className="h-full flex">
      {/* Colonne des heures */}
      <div className="w-20 border-r">
        <div className="h-12 border-b"></div>
        {hours.map(hour => (
          <div key={hour} className="h-16 border-b p-2 text-right text-sm text-gray-500">
            {hour}:00
          </div>
        ))}
      </div>

      {/* Grille des jours */}
      <div className="flex-1 grid grid-cols-7">
        {weekDays.map((day, dayIndex) => (
          <div key={dayIndex} className="border-r last:border-r-0">
            {/* En-tête du jour */}
            <div className={`
              h-12 border-b p-2 text-center
              ${isToday(day) ? 'bg-blue-50 border-blue-200' : ''}
            `}>
              <div className="text-sm font-medium">
                {day.toLocaleDateString('fr-FR', { weekday: 'short' })}
              </div>
              <div className={`
                text-lg font-semibold
                ${isToday(day) ? 'text-blue-600' : ''}
              `}>
                {day.getDate()}
              </div>
            </div>

            {/* Créneaux horaires */}
            <div className="relative">
              {hours.map(hour => (
                <div key={hour} className="h-16 border-b"></div>
              ))}
              
              {/* Événements */}
              {getEventsForDay(day).map(event => {
                const start = new Date(event.start);
                const end = new Date(event.end);
                const startHour = start.getHours() + start.getMinutes() / 60;
                const endHour = end.getHours() + end.getMinutes() / 60;
                const duration = endHour - startHour;
                
                return (
                  <div
                    key={event.id}
                    className="absolute left-1 right-1 rounded p-2 cursor-pointer shadow-sm border-l-4"
                    style={{
                      top: `${((startHour - 8) / 12) * 100}%`,
                      height: `${(duration / 12) * 100}%`,
                      borderLeftColor: event.color,
                      backgroundColor: `${event.color}20`
                    }}
                    onClick={() => onEventClick(event)}
                  >
                    <div className="text-xs font-medium truncate">{event.title}</div>
                    <div className="text-xs opacity-90">
                      {start.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} - {end.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}