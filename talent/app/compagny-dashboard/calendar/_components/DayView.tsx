// src/app/company/dashboard/calendar/components/DayView.tsx
'use client';

import { useMemo } from 'react';

interface DayViewProps {
  currentDate: Date;
  events: any[];
  onEventClick: (event: any) => void;
}

export default function DayView({ currentDate, events, onEventClick }: DayViewProps) {
  const hours = useMemo(() => {
    const hours = [];
    for (let i = 7; i <= 22; i++) {
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

  const dayEvents = getEventsForDay(currentDate);

  return (
    <div className="h-full flex">
      {/* Colonne des heures */}
      <div className="w-20 border-r">
        <div className="h-16 border-b p-4 text-center font-semibold">
          {currentDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' })}
        </div>
        {hours.map(hour => (
          <div key={hour} className="h-16 border-b p-2 text-right text-sm text-gray-500">
            {hour}:00
          </div>
        ))}
      </div>

      {/* Grille principale */}
      <div className="flex-1 relative">
        {/* Lignes horaires */}
        {hours.map(hour => (
          <div key={hour} className="h-16 border-b"></div>
        ))}
        
        {/* Événements */}
        {dayEvents.map(event => {
          const start = new Date(event.start);
          const end = new Date(event.end);
          const startHour = start.getHours() + start.getMinutes() / 60;
          const endHour = end.getHours() + end.getMinutes() / 60;
          const duration = endHour - startHour;
          
          return (
            <div
              key={event.id}
              className="absolute left-2 right-2 rounded-lg p-3 cursor-pointer shadow-sm border-l-4"
              style={{
                top: `${((startHour - 7) / 15) * 100}%`,
                height: `${(duration / 15) * 100}%`,
                borderLeftColor: event.color,
                backgroundColor: `${event.color}20`
              }}
              onClick={() => onEventClick(event)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-medium text-sm mb-1">{event.title}</div>
                  <div className="text-xs text-gray-600">
                    {start.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} - {end.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  {event.candidate && (
                    <div className="text-xs text-gray-500 mt-1">
                      avec {event.candidate.name}
                    </div>
                  )}
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  event.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                  event.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {event.status === 'scheduled' ? 'Planifié' : 
                   event.status === 'confirmed' ? 'Confirmé' : 'Autre'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}