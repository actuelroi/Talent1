
// src/app/company/dashboard/components/FeaturedSection.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  RiAddLine, 
  RiEditLine, 
  RiPlayLine, 
  RiDeleteBinLine,
  RiSaveLine,
  RiImageLine,
  RiVideoLine
} from "@remixicon/react";
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface EmployeeStory {
  id: string;
  name: string;
  position: string;
  department: string;
  videoUrl?: string;
  imageUrl?: string;
  quote?: string;
  description?: string;
  isFeatured: boolean;
}

interface FeaturedSectionProps {
  employeeStories: EmployeeStory[];
  onUpdate: (stories: EmployeeStory[]) => void;
}

// Définir le type pour les variants du badge
type BadgeVariant = 'default' | 'secondary' | 'destructive';

export default function FeaturedSection({ employeeStories, onUpdate }: FeaturedSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingStory, setEditingStory] = useState<EmployeeStory | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [featuredStories, setFeaturedStories] = useState<EmployeeStory[]>(employeeStories);

  // CRUD Operations
  const createStory = (storyData: Omit<EmployeeStory, 'id'>) => {
    const newStory: EmployeeStory = {
      ...storyData,
      id: Math.random().toString(36).substr(2, 9)
    };
    const updatedStories = [newStory, ...featuredStories];
    setFeaturedStories(updatedStories);
    onUpdate(updatedStories);
    setIsCreateDialogOpen(false);
  };

  const updateStory = (id: string, updates: Partial<EmployeeStory>) => {
    const updatedStories = featuredStories.map(story => 
      story.id === id ? { ...story, ...updates } : story
    );
    setFeaturedStories(updatedStories);
    onUpdate(updatedStories);
    setEditingStory(null);
  };

  const deleteStory = (id: string) => {
    const updatedStories = featuredStories.filter(story => story.id !== id);
    setFeaturedStories(updatedStories);
    onUpdate(updatedStories);
  };

  const toggleFeatured = (id: string) => {
    const updatedStories = featuredStories.map(story => 
      story.id === id ? { ...story, isFeatured: !story.isFeatured } : story
    );
    setFeaturedStories(updatedStories);
    onUpdate(updatedStories);
  };

  const moveStory = (fromIndex: number, toIndex: number) => {
    const stories = [...featuredStories];
    const [movedStory] = stories.splice(fromIndex, 1);
    stories.splice(toIndex, 0, movedStory);
    setFeaturedStories(stories);
    onUpdate(stories);
  };

  return (
    <div className="space-y-6 p-6 ">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-4 ">
          {isEditing ? (
            <Input
              value="À la une"
              onChange={() => {}}
              className="text-2xl font-bold w-64"
            />
          ) : (
            <h2 className="text-2xl font-bold">À la une</h2>
          )}
          <Button 
            variant={isEditing ? "default" : "outline"}
            onClick={() => setIsEditing(!isEditing)}
            size="sm"
          >
            <RiEditLine className="h-4 w-4 mr-2" />
            {isEditing ? 'Terminer' : 'Modifier'}
          </Button>
        </div>
        
        <div className="flex gap-2 ">
          {isEditing && (
            <Button 
              variant="outline" 
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <RiAddLine className="h-4 w-4 mr-2" />
              Nouveau contenu
            </Button>
          )}
          
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            {isEditing ? (
              <Input
                value="Témoignages collaborateurs"
                onChange={() => {}}
                className="text-xl font-semibold"
              />
            ) : (
              <CardTitle>Témoignages collaborateurs</CardTitle>
            )}
            {isEditing && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Réorganiser
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredStories.map((employee, index) => (
              <EditableStoryCard 
                key={employee.id}
                employee={employee}
                index={index}
                totalStories={featuredStories.length}
                isEditing={isEditing}
                onEdit={setEditingStory}
                onUpdate={updateStory}
                onDelete={deleteStory}
                onToggleFeatured={toggleFeatured}
                onMove={moveStory}
              />
            ))}
            
            {featuredStories.length === 0 && (
              <div className="col-span-full text-center py-12">
                <RiVideoLine className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun témoignage</h3>
                <p className="text-gray-600 mb-4">Commencez par ajouter le premier témoignage collaborateur</p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <RiAddLine className="h-4 w-4 mr-2" />
                  Ajouter un témoignage
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Create/Edit Dialogs */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Nouveau témoignage collaborateur</DialogTitle>
          </DialogHeader>
          <StoryForm 
            onSubmit={createStory} 
            onCancel={() => setIsCreateDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingStory} onOpenChange={(open) => !open && setEditingStory(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier le témoignage</DialogTitle>
          </DialogHeader>
          {editingStory && (
            <StoryForm 
              story={editingStory}
              onSubmit={(data) => updateStory(editingStory.id, data)}
              onCancel={() => setEditingStory(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Composant de carte de témoignage éditable
function EditableStoryCard({ 
  employee, 
  index, 
  totalStories,
  isEditing, 
  onEdit, 
  onUpdate, 
  onDelete, 
  onToggleFeatured,
  onMove 
}: { 
  employee: EmployeeStory;
  index: number;
  totalStories: number;
  isEditing: boolean;
  onEdit: (story: EmployeeStory) => void;
  onUpdate: (id: string, updates: Partial<EmployeeStory>) => void;
  onDelete: (id: string) => void;
  onToggleFeatured: (id: string) => void;
  onMove: (fromIndex: number, toIndex: number) => void;
}) {
  return (
    <div className="border rounded-lg overflow-hidden group relative">
      {isEditing && (
        <div className="absolute top-2 right-2 flex gap-1 z-10">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(employee)}
            className="h-8 w-8 p-0 bg-blue-500 hover:bg-blue-600"
            title="Modifier"
          >
            <RiEditLine className="h-3 w-3 text-white" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onToggleFeatured(employee.id)}
            className={`h-8 w-8 p-0 ${
              employee.isFeatured ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-500 hover:bg-gray-600'
            }`}
            title={employee.isFeatured ? 'Retirer des featured' : 'Mettre en featured'}
          >
            ⭐
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(employee.id)}
            className="h-8 w-8 p-0"
            title="Supprimer"
          >
            <RiDeleteBinLine className="h-3 w-3" />
          </Button>
        </div>
      )}

      {/* Image/Video Preview */}
      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
        {employee.imageUrl ? (
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${employee.imageUrl})` }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <RiImageLine className="h-12 w-12 text-gray-400" />
          </div>
        )}
        
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Button className="bg-white text-gray-900">
            <RiPlayLine className="h-4 w-4 mr-2" />
            Regarder
          </Button>
        </div>

        {employee.isFeatured && (
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              ⭐ À la une
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {isEditing ? (
          <div className="space-y-3">
            <Input
              value={employee.name}
              onChange={(e) => onUpdate(employee.id, { name: e.target.value })}
              placeholder="Nom du collaborateur"
            />
            <Input
              value={employee.position}
              onChange={(e) => onUpdate(employee.id, { position: e.target.value })}
              placeholder="Poste"
            />
            <Input
              value={employee.department}
              onChange={(e) => onUpdate(employee.id, { department: e.target.value })}
              placeholder="Département"
            />
            <Textarea
              value={employee.quote || ''}
              onChange={(e) => onUpdate(employee.id, { quote: e.target.value })}
              placeholder="Citation ou description"
              rows={2}
            />
          </div>
        ) : (
          <>
            <h3 className="font-semibold">Rencontrez {employee.name}</h3>
            <p className="text-sm text-gray-600">{employee.position}</p>
            <p className="text-xs text-gray-500 mt-1">{employee.department}</p>
            {employee.quote && (
              <blockquote className="text-sm text-gray-700 mt-2 italic border-l-2 border-blue-200 pl-2">
                "{employee.quote}"
              </blockquote>
            )}
          </>
        )}

        {!isEditing && (
          <div className="mt-3">
            <Button variant="outline" size="sm" onClick={() => onEdit(employee)}>
              <RiEditLine className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          </div>
        )}
      </div>

      {/* Drag handles for reordering */}
      {isEditing && (
        <div className="absolute bottom-2 left-2 flex gap-1">
          {index > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => onMove(index, index - 1)}
              title="Déplacer vers le haut"
            >
              ↑
            </Button>
          )}
          {index < totalStories - 1 && (
            <Button
              variant="outline"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => onMove(index, index + 1)}
              title="Déplacer vers le bas"
            >
              ↓
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

// Composant de formulaire pour créer/modifier les témoignages
function StoryForm({ 
  story, 
  onSubmit, 
  onCancel 
}: { 
  story?: EmployeeStory;
  onSubmit: (data: Omit<EmployeeStory, 'id'>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Omit<EmployeeStory, 'id'>>(story || {
    name: '',
    position: '',
    department: '',
    videoUrl: '',
    imageUrl: '',
    quote: '',
    description: '',
    isFeatured: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Nom du collaborateur *</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Poste *</label>
          <Input
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Département *</label>
          <Input
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isFeatured"
            checked={formData.isFeatured}
            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
            className="h-4 w-4"
          />
          <label htmlFor="isFeatured" className="text-sm font-medium">
            Mettre en avant (À la une)
          </label>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">URL de l'image</label>
        <Input
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <label className="text-sm font-medium">URL de la vidéo</label>
        <Input
          value={formData.videoUrl}
          onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
          placeholder="https://youtube.com/embed/..."
        />
      </div>

      <div>
        <label className="text-sm font-medium">Citation ou accroche</label>
        <Textarea
          value={formData.quote}
          onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
          placeholder="Une citation inspirante du collaborateur..."
          rows={2}
        />
      </div>

      <div>
        <label className="text-sm font-medium">Description complète</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Description détaillée du témoignage..."
          rows={4}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
          <RiSaveLine className="h-4 w-4" />
          {story ? 'Modifier' : 'Créer'} le témoignage
        </Button>
      </div>
    </form>
  );
}

// Composant Badge avec typage corrigé
function Badge({ 
  variant = "default", 
  className, 
  children 
}: { 
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}) {
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  
  // Définir les classes pour chaque variant de manière sécurisée
  const variantClasses: Record<BadgeVariant, string> = {
    default: "bg-gray-100 text-gray-800",
    secondary: "bg-blue-100 text-blue-800",
    destructive: "bg-red-100 text-red-800"
  };

  // S'assurer que le variant existe, sinon utiliser le variant par défaut
  const selectedVariant = variantClasses[variant] || variantClasses.default;

  return (
    <span className={`${baseClasses} ${selectedVariant} ${className || ''}`}>
      {children}
    </span>
  );
}