// src/app/company/dashboard/calendar/components/CalendarView.tsx
'use client';

import DayView from "./DayView";
import MonthView from "./MonthView";

import WeekView from "./WeekView";



interface CalendarViewProps {
  view: 'month' | 'week' | 'day';
  currentDate: Date;
  events: any[];
  onEventClick: (event: any) => void;
}

export default function CalendarView({ view, currentDate, events, onEventClick }: CalendarViewProps) {
  const renderView = () => {
    switch (view) {
      case 'month':
        return (
          <MonthView
            currentDate={currentDate}
            events={events}
            onEventClick={onEventClick}
          />
        );
      case 'week':
        return (
          <WeekView
            currentDate={currentDate}
            events={events}
            onEventClick={onEventClick}
          />
        );
      case 'day':
        return (
          <DayView
            currentDate={currentDate}
            events={events}
            onEventClick={onEventClick}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border rounded-lg h-full overflow-hidden">
      {renderView()}
    </div>
  );
}