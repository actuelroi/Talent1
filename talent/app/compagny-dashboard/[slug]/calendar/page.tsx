// src/app/company/dashboard/calendar/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CalendarView from './_components/CalendarView';
import CalendarHeader from './_components/CalendarHeader'; // Ajouté
import CalendarFilters from './_components/CalendarFilters';
import EventModal from './_components/EventModal';
import MiniCalendar from './_components/MiniCalendar';
import ScheduledInterviews from './_components/ScheduledInterviews'; // Ajouté

// Types
interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  type: 'interview' | 'meeting' | 'reminder' | 'availability';
  interviewType?: 'phone' | 'video' | 'technical' | 'cultural' | 'final'; // Ajouté
  jobPosition?: string; // Ajouté
  candidate?: {
    id: number;
    name: string;
    position: string;
    image: string;
  };
  participants?: string[];
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
  color: string;
}

// Données mock étendues
const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Entretien technique - Marie Dubois',
    description: 'Entretien technique pour le poste de Développeuse Full Stack',
    start: new Date(2024, 0, 22, 14, 0),
    end: new Date(2024, 0, 22, 15, 0),
    type: 'interview',
    interviewType: 'technical',
    jobPosition: 'Développeuse Full Stack Senior',
    candidate: {
      id: 1,
      name: 'Marie Dubois',
      position: 'Développeuse Full Stack Senior',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    status: 'scheduled',
    color: '#3B82F6'
  },
  {
    id: '2',
    title: 'Réunion équipe recrutement',
    description: 'Point hebdomadaire sur les recrutements en cours',
    start: new Date(2024, 0, 23, 10, 0),
    end: new Date(2024, 0, 23, 11, 30),
    type: 'meeting',
    participants: ['Jean Dupont', 'Sophie Martin', 'Pierre Lambert'],
    status: 'confirmed',
    color: '#10B981'
  },
  {
    id: '3',
    title: 'Entretien final - Thomas Martin',
    description: 'Entretien final avec la direction',
    start: new Date(2024, 0, 24, 16, 0),
    end: new Date(2024, 0, 24, 17, 0),
    type: 'interview',
    interviewType: 'final',
    jobPosition: 'Data Scientist',
    candidate: {
      id: 2,
      name: 'Thomas Martin',
      position: 'Data Scientist',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    status: 'scheduled',
    color: '#3B82F6'
  },
  {
    id: '4',
    title: 'Entretien téléphonique - Sophie Lambert',
    description: 'Premier contact pour le poste de Product Manager',
    start: new Date(2024, 0, 25, 11, 0),
    end: new Date(2024, 0, 25, 11, 30),
    type: 'interview',
    interviewType: 'phone',
    jobPosition: 'Product Manager',
    candidate: {
      id: 3,
      name: 'Sophie Lambert',
      position: 'Product Manager',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    status: 'confirmed',
    color: '#3B82F6'
  }
];

export default function CalendarPage() {
  const [view, setView] = useState<'month' | 'week' | 'day'>('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    types: ['interview', 'meeting', 'reminder', 'availability'],
    statuses: ['scheduled', 'confirmed'],
  });

  const filteredEvents = mockEvents.filter(event => 
    filters.types.includes(event.type) && 
    filters.statuses.includes(event.status)
  );

  // Filtrer seulement les entretiens pour le composant ScheduledInterviews
  const interviews = mockEvents.filter(event => event.type === 'interview');

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setIsEventModalOpen(true);
  };

  const handleViewInterviewDetails = (interview: CalendarEvent) => {
    setSelectedEvent(interview);
    setIsEventModalOpen(true);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleSaveEvent = (eventData: any) => {
    // Logique de sauvegarde
    console.log('Sauvegarde événement:', eventData);
    
    // Ici vous ajouteriez la logique pour sauvegarder dans votre état ou API
    if (eventData.id) {
      // Modification d'un événement existant
      console.log('Modification de l\'événement:', eventData);
    } else {
      // Création d'un nouvel événement
      console.log('Création d\'un nouvel événement:', eventData);
    }
    
    setIsEventModalOpen(false);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Calendrier</h1>
              <p className="text-gray-600">Gérez vos entretiens et réunions</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={goToToday}>
                Aujourd'hui
              </Button>
              <Button onClick={handleCreateEvent}>
                Nouvel événement
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 border-r bg-white overflow-y-auto">
          <div className="p-6 space-y-6">
            <MiniCalendar 
              currentDate={currentDate}
              onDateChange={setCurrentDate}
              events={filteredEvents}
            />
            
            <CalendarFilters
              filters={filters}
              onFiltersChange={setFilters}
            />

            <ScheduledInterviews
              interviews={interviews}
              onViewDetails={handleViewInterviewDetails}
            />
          </div>
        </div>

        {/* Contenu principal */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="bg-white border-b p-6">
            <Tabs value={view} onValueChange={(v) => setView(v as any)}>
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="month">Mois</TabsTrigger>
                  <TabsTrigger value="week">Semaine</TabsTrigger>
                  <TabsTrigger value="day">Jour</TabsTrigger>
                </TabsList>
                
                <CalendarHeader
                  currentDate={currentDate}
                  onDateChange={setCurrentDate}
                  view={view}
                />
              </div>
            </Tabs>
          </div>

          <div className="flex-1 p-6 overflow-auto">
            <CalendarView
              view={view}
              currentDate={currentDate}
              events={filteredEvents}
              onEventClick={handleEventClick}
            />
          </div>
        </div>
      </div>

      {/* Modal d'événement */}
      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        event={selectedEvent}
        onSave={handleSaveEvent}
      />
    </div>
  );
}