'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface RejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: {
    candidate: string;
  };
  onReject: (reason: string) => void;
}

export default function RejectModal({
  isOpen,
  onClose,
  candidate,
  onReject,
}: RejectModalProps) {
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    onReject(reason);
    onClose();
    setReason('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Refuser la candidature de {candidate.candidate}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label>Raison du refus (optionnel)</Label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Expliquez brièvement la raison du refus..."
              rows={4}
            />
          </div>
          
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleSubmit}>
              Confirmer le refus
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}