'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  RiEditLine,
  RiSaveLine,
  RiCloseLine,
  RiText,
  RiCodeLine,
  RiLayoutLine
} from '@remixicon/react';
import { TabContentProps } from '@/types/tab';

export default function EditableTabContent({ 
  content, 
  type, 
  onUpdate, 
  isEditing = false 
}: TabContentProps) {
  const [isEditingContent, setIsEditingContent] = useState(isEditing);
  const [editedContent, setEditedContent] = useState(content);
  const [editedType, setEditedType] = useState(type);

  const handleSave = () => {
    onUpdate?.(editedContent);
    setIsEditingContent(false);
  };

  const handleCancel = () => {
    setEditedContent(content);
    setEditedType(type);
    setIsEditingContent(false);
  };

  const renderPreview = () => {
    switch (editedType) {
      case 'html':
        return (
          <div 
            className="prose max-w-none p-4 border rounded-lg min-h-[200px]"
            dangerouslySetInnerHTML={{ __html: editedContent }}
          />
        );
      case 'component':
        return (
          <div className="p-4 border rounded-lg min-h-[200px] bg-gray-50">
            <div className="text-center text-gray-500">
              <RiLayoutLine className="h-12 w-12 mx-auto mb-2" />
              <p>Mode composant - Contenu personnalisé</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="prose max-w-none p-4 border rounded-lg min-h-[200px]">
            {editedContent.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        );
    }
  };

  if (isEditingContent) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Édition du contenu</span>
            <div className="flex gap-2">
              <Button onClick={handleSave} size="sm" className="flex items-center gap-2">
                <RiSaveLine className="h-4 w-4" />
                Sauvegarder
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm" className="flex items-center gap-2">
                <RiCloseLine className="h-4 w-4" />
                Annuler
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={editedType} onValueChange={(value) => setEditedType(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="text" className="flex items-center gap-2">
                <RiText className="h-4 w-4" />
                Texte
              </TabsTrigger>
              <TabsTrigger value="html" className="flex items-center gap-2">
                <RiCodeLine className="h-4 w-4" />
                HTML
              </TabsTrigger>
              <TabsTrigger value="component" className="flex items-center gap-2">
                <RiLayoutLine className="h-4 w-4" />
                Composant
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="text" className="mt-4">
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                placeholder="Entrez votre contenu texte ici..."
                rows={10}
                className="w-full"
              />
            </TabsContent>
            
            <TabsContent value="html" className="mt-4">
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                placeholder="Entrez votre code HTML ici..."
                rows={10}
                className="w-full font-mono"
              />
            </TabsContent>
            
            <TabsContent value="component" className="mt-4">
              <div className="space-y-4">
                <Textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  placeholder="Description ou configuration du composant..."
                  rows={6}
                  className="w-full"
                />
                <p className="text-sm text-gray-500">
                  Mode composant - Utilisez cette zone pour décrire le composant personnalisé.
                </p>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6">
            <h4 className="font-medium mb-2">Aperçu :</h4>
            {renderPreview()}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative group">
      <Button
        onClick={() => setIsEditingContent(true)}
        variant="outline"
        size="sm"
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2"
      >
        <RiEditLine className="h-4 w-4" />
        Modifier
      </Button>
      
      {type === 'html' ? (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <div className="prose max-w-none p-6">
          {content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}
    </div>
  );
}