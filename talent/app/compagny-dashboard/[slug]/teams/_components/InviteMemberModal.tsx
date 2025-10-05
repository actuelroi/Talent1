// src/app/company/dashboard/teams/components/InviteMemberModal.tsx
'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  RiUserAddLine, 
  RiMailLine,
  RiUserLine,
  RiCloseLine 
} from '@remixicon/react';

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamId: string;
  onInvite: (email: string, role: string, message?: string) => void;
}

const roleOptions = [
  'Développeur Fullstack',
  'DevOps Engineer',
  'Product Manager',
  'UX/UI Designer',
  'Data Scientist',
  'Tech Lead',
  'Quality Assurance',
  'Scrum Master'
];

export default function InviteMemberModal({ isOpen, onClose, teamId, onInvite }: InviteMemberModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    role: '',
    message: ''
  });
  const [invitedMembers, setInvitedMembers] = useState<Array<{email: string, role: string}>>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.email && formData.role) {
      setInvitedMembers(prev => [...prev, { email: formData.email, role: formData.role }]);
      
      onInvite(formData.email, formData.role, formData.message);
      
      // Réinitialiser le formulaire
      setFormData({
        email: '',
        role: '',
        message: ''
      });
    }
  };

  const removeInvitedMember = (index: number) => {
    setInvitedMembers(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RiUserAddLine className="h-5 w-5" />
            Inviter un membre
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <Label htmlFor="email">Adresse email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="exemple@company.com"
              required
            />
          </div>

          {/* Rôle */}
          <div>
            <Label>Rôle dans l'équipe *</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un rôle" />
              </SelectTrigger>
              <SelectContent>
                {roleOptions.map(role => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Message personnalisé */}
          <div>
            <Label>Message personnalisé (optionnel)</Label>
            <Textarea
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Personnalisez le message d'invitation..."
              rows={3}
            />
          </div>

          {/* Membres invités */}
          {invitedMembers.length > 0 && (
            <div>
              <Label>Membres invités</Label>
              <div className="space-y-2 mt-2">
                {invitedMembers.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <RiMailLine className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="font-medium">{member.email}</div>
                        <div className="text-sm text-gray-500">{member.role}</div>
                      </div>
                    </div>
                    <Badge variant="secondary">Invité</Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeInvitedMember(index)}
                    >
                      <RiCloseLine className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-between pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Fermer
            </Button>
            <div className="flex gap-3">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => {
                  setInvitedMembers([]);
                  setFormData({ email: '', role: '', message: '' });
                }}
              >
                Tout effacer
              </Button>
              <Button type="submit">
                <RiUserAddLine className="h-4 w-4 mr-2" />
                Inviter
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}