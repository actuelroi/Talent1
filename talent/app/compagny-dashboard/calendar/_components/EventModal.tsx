// src/app/company/dashboard/calendar/components/EventModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { RiUserLine, RiTimeLine, RiCalendarLine, RiBriefcaseLine } from '@remixicon/react';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: any;
  onSave: (eventData: any) => void;
}

const jobPositions = [
  "Développeur Full Stack",
  "Data Scientist",
  "Product Manager",
  "DevOps Engineer",
  "UX/UI Designer",
  "Cloud Architect"
];

const interviewTypes = [
  { value: 'phone', label: 'Téléphonique' },
  { value: 'video', label: 'Visioconférence' },
  { value: 'technical', label: 'Technique' },
  { value: 'cultural', label: 'Culture d\'entreprise' },
  { value: 'final', label: 'Entretien final' }
];

export default function EventModal({ isOpen, onClose, event, onSave }: EventModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start: '',
    end: '',
    type: 'interview',
    interviewType: 'technical',
    jobPosition: '',
    candidate: null as any,
    status: 'scheduled'
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        start: event.start ? new Date(event.start).toISOString().slice(0, 16) : '',
        end: event.end ? new Date(event.end).toISOString().slice(0, 16) : '',
        type: event.type || 'interview',
        interviewType: event.interviewType || 'technical',
        jobPosition: event.jobPosition || '',
        candidate: event.candidate || null,
        status: event.status || 'scheduled'
      });
    } else {
      // Nouvel événement - valeurs par défaut
      const now = new Date();
      const end = new Date(now.getTime() + 60 * 60 * 1000); // +1 heure
      
      setFormData({
        title: '',
        description: '',
        start: now.toISOString().slice(0, 16),
        end: end.toISOString().slice(0, 16),
        type: 'interview',
        interviewType: 'technical',
        jobPosition: '',
        candidate: null,
        status: 'scheduled'
      });
    }
  }, [event, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventData = {
      ...formData,
      start: new Date(formData.start),
      end: new Date(formData.end),
      color: formData.type === 'interview' ? '#3B82F6' : '#10B981'
    };
    
    onSave(eventData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {event ? 'Modifier l\'événement' : 'Planifier un entretien'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type d'événement */}
          <div>
            <Label>Type d'événement</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="interview">Entretien</SelectItem>
                <SelectItem value="meeting">Réunion</SelectItem>
                <SelectItem value="reminder">Rappel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.type === 'interview' && (
            <>
              {/* Type d'entretien */}
              <div>
                <Label>Type d'entretien</Label>
                <Select value={formData.interviewType} onValueChange={(value) => setFormData({...formData, interviewType: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {interviewTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Poste concerné */}
              <div>
                <Label>Poste concerné</Label>
                <Select value={formData.jobPosition} onValueChange={(value) => setFormData({...formData, jobPosition: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un poste" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobPositions.map(position => (
                      <SelectItem key={position} value={position}>
                        {position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {/* Titre */}
          <div>
            <Label>Titre</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Ex: Entretien technique avec Marie Dubois"
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Détails de l'entretien..."
              rows={3}
            />
          </div>

          {/* Dates et heures */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="flex items-center gap-2">
                <RiCalendarLine className="h-4 w-4" />
                Date et heure de début
              </Label>
              <Input
                type="datetime-local"
                value={formData.start}
                onChange={(e) => setFormData({...formData, start: e.target.value})}
                required
              />
            </div>
            <div>
              <Label className="flex items-center gap-2">
                <RiTimeLine className="h-4 w-4" />
                Date et heure de fin
              </Label>
              <Input
                type="datetime-local"
                value={formData.end}
                onChange={(e) => setFormData({...formData, end: e.target.value})}
                required
              />
            </div>
          </div>

          {/* Statut */}
          <div>
            <Label>Statut</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scheduled">Planifié</SelectItem>
                <SelectItem value="confirmed">Confirmé</SelectItem>
                <SelectItem value="cancelled">Annulé</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              {event ? 'Modifier' : 'Planifier'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}