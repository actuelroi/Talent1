'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  RiAddLine,
  RiEditLine,
  RiSaveLine,
  RiCloseLine
} from '@remixicon/react';
import { CustomTab } from '@/types/tab';

interface TabManagerProps {
  tab?: CustomTab;
  onSave: (tab: Omit<CustomTab, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel?: () => void;
  mode: 'create' | 'edit';
  children?: React.ReactNode;
}

export default function TabManager({ tab, onSave, onCancel, mode, children }: TabManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    label: tab?.label || '',
    content: tab?.content || '',
    type: tab?.type || 'text' as const
  });

  const handleSave = () => {
    if (formData.label.trim() === '') return;
    
    onSave({
      label: formData.label.trim(),
      content: formData.content.trim() || `Contenu de l'onglet "${formData.label.trim()}"`,
      type: formData.type
    });
    
    setIsOpen(false);
    setFormData({ label: '', content: '', type: 'text' });
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open && onCancel) {
      onCancel();
    }
    if (open && tab) {
      setFormData({
        label: tab.label,
        content: tab.content,
        type: tab.type
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children || (
          <Button variant={mode === 'create' ? 'default' : 'outline'} size="sm">
            {mode === 'create' ? (
              <RiAddLine className="h-4 w-4 mr-2" />
            ) : (
              <RiEditLine className="h-4 w-4 mr-2" />
            )}
            {mode === 'create' ? 'Ajouter un onglet' : 'Modifier'}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Ajouter un nouvel onglet' : `Modifier l'onglet "${tab?.label}"`}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="label">Nom de l'onglet *</Label>
            <Input
              id="label"
              value={formData.label}
              onChange={(e) => setFormData({...formData, label: e.target.value})}
              placeholder="Ex: Événements, Actualités, Équipe..."
            />
          </div>
          
          <div>
            <Label htmlFor="type">Type de contenu</Label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value as any})}
              className="w-full p-2 border rounded-md"
            >
              <option value="text">Texte simple</option>
              <option value="html">HTML personnalisé</option>
              <option value="component">Composant</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="content">
              Contenu {formData.type === 'html' && '(HTML)'}
              {formData.type === 'component' && '(Description)'}
            </Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              placeholder={
                formData.type === 'html' 
                  ? 'Entrez votre code HTML ici...' 
                  : formData.type === 'component'
                  ? 'Décrivez le composant personnalisé...'
                  : 'Entrez le contenu texte ici...'
              }
              rows={6}
              className={formData.type === 'html' ? 'font-mono' : ''}
            />
          </div>
          
          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              <RiCloseLine className="h-4 w-4 mr-2" />
              Annuler
            </Button>
            <Button onClick={handleSave}>
              <RiSaveLine className="h-4 w-4 mr-2" />
              {mode === 'create' ? 'Créer l\'onglet' : 'Sauvegarder'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}