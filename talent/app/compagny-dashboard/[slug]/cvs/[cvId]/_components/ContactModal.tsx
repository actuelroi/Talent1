'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: {
   candidate: string;
    email: string;
    phone: string;
  };
  type: 'email' | 'phone';
  onSend: (data: { subject: string; message: string }) => void;
}

export default function ContactModal({
  isOpen,
  onClose,
  candidate,
  type,
  onSend,
}: ContactModalProps) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    onSend({ subject, message });
    onClose();
    setSubject('');
    setMessage('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === 'email' ? 'Envoyer un email' : 'Planifier un appel'} à {candidate.candidate}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {type === 'email' && (
            <div>
              <Label>Sujet</Label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Objet de l'email"
              />
            </div>
          )}
          
          <div>
            <Label>Message</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={type === 'email' 
                ? "Votre message au candidat..." 
                : "Notes pour l'appel téléphonique..."
              }
              rows={6}
            />
          </div>
          
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button onClick={handleSubmit}>
              {type === 'email' ? 'Envoyer' : 'Planifier'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}