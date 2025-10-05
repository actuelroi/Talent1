// src/app/company/dashboard/teams/components/CreateTeamModal.tsx
'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  RiGroupLine, 
  RiUserLine, 
  RiPaletteLine,
  RiCloseLine 
} from '@remixicon/react';

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (teamData: any) => void;
}

const colorOptions = [
  { value: '#3B82F6', label: 'Bleu', bg: 'bg-blue-500' },
  { value: '#10B981', label: 'Vert', bg: 'bg-green-500' },
  { value: '#8B5CF6', label: 'Violet', bg: 'bg-purple-500' },
  { value: '#F59E0B', label: 'Orange', bg: 'bg-orange-500' },
  { value: '#EF4444', label: 'Rouge', bg: 'bg-red-500' },
  { value: '#06B6D4', label: 'Cyan', bg: 'bg-cyan-500' }
];

const initialManagers = [
  { id: '1', name: 'Jean Dupont', role: 'Tech Lead' },
  { id: '2', name: 'Sophie Martin', role: 'Lead Designer' },
  { id: '3', name: 'Thomas Lambert', role: 'Data Lead' }
];

export default function CreateTeamModal({ isOpen, onClose, onSave }: CreateTeamModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#3B82F6',
    managerId: '',
    department: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedManager = initialManagers.find(m => m.id === formData.managerId);
    
    const teamData = {
      ...formData,
      manager: selectedManager,
      members: 0,
      projects: 0,
      performance: 0,
      status: 'active' as const
    };
    
    onSave(teamData);
    // Réinitialiser le formulaire
    setFormData({
      name: '',
      description: '',
      color: '#3B82F6',
      managerId: '',
      department: ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RiGroupLine className="h-5 w-5" />
            Créer une nouvelle équipe
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nom de l'équipe */}
          <div>
            <Label htmlFor="name">Nom de l'équipe *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Ex: Équipe Développement Frontend"
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Décrivez le rôle et les objectifs de cette équipe..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Manager */}
            <div>
              <Label>Manager de l'équipe *</Label>
              <Select value={formData.managerId} onValueChange={(value) => setFormData({...formData, managerId: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un manager" />
                </SelectTrigger>
                <SelectContent>
                  {initialManagers.map(manager => (
                    <SelectItem key={manager.id} value={manager.id}>
                      <div className="flex items-center gap-2">
                        <RiUserLine className="h-4 w-4" />
                        {manager.name} - {manager.role}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Département */}
            <div>
              <Label>Département</Label>
              <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un département" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="development">Développement</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="data">Data Science</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Couleur */}
          <div>
            <Label className="flex items-center gap-2 mb-3">
              <RiPaletteLine className="h-4 w-4" />
              Couleur de l'équipe
            </Label>
            <div className="flex gap-2">
              {colorOptions.map(color => (
                <button
                  key={color.value}
                  type="button"
                  className={`w-8 h-8 rounded-full ${color.bg} border-2 ${
                    formData.color === color.value ? 'border-gray-900' : 'border-transparent'
                  }`}
                  onClick={() => setFormData({...formData, color: color.value})}
                  title={color.label}
                />
              ))}
            </div>
          </div>

          {/* Aperçu */}
          <div className="p-4 border rounded-lg bg-gray-50">
            <h4 className="font-medium mb-2">Aperçu de l'équipe</h4>
            <div className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: formData.color }}
              />
              <span className="font-semibold">{formData.name || 'Nom de l équipe'}</span>
              <Badge variant="outline">Nouvelle</Badge>
            </div>
            {formData.description && (
              <p className="text-sm text-gray-600 mt-1">{formData.description}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Créer l'équipe
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}