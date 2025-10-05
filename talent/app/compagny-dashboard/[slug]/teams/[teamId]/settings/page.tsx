// src/app/company/dashboard/teams/[teamId]/settings/page.tsx
'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  RiSettingsLine,
  RiSaveLine,
  RiDeleteBinLine,
  RiNotificationLine,
  RiShieldCheckFill,
 
} from '@remixicon/react';

export default function TeamSettingsPage() {
  const params = useParams();
  const [settings, setSettings] = useState({
    teamName: 'Équipe Développement',
    description: 'Développement des produits et features principales',
    visibility: 'private',
    notifications: {
      newMembers: true,
      projectUpdates: true,
      performanceReports: false,
      weeklyDigest: true
    },
    permissions: {
      canInvite: true,
      canCreateProjects: false,
      canEditSettings: false
    }
  });

  const handleSave = () => {
    console.log('Sauvegarde des paramètres:', settings);
    // Logique de sauvegarde
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Paramètres de l'équipe</h1>
              <p className="text-gray-600">Gérez les paramètres et permissions</p>
            </div>
            <Button onClick={handleSave}>
              <RiSaveLine className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations générales */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <RiSettingsLine className="h-5 w-5" />
                  Informations générales
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="teamName">Nom de l'équipe</Label>
                    <Input
                      id="teamName"
                      value={settings.teamName}
                      onChange={(e) => setSettings({...settings, teamName: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={settings.description}
                      onChange={(e) => setSettings({...settings, description: e.target.value})}
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label>Visibilité</Label>
                    <Select value={settings.visibility} onValueChange={(value) => setSettings({...settings, visibility: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Publique</SelectItem>
                        <SelectItem value="private">Privée</SelectItem>
                        <SelectItem value="restricted">Restreinte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <RiNotificationLine className="h-5 w-5" />
                  Notifications
                </h2>
                
                <div className="space-y-4">
                  {Object.entries(settings.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <Label htmlFor={key} className="flex-1">
                        {key === 'newMembers' && 'Nouveaux membres'}
                        {key === 'projectUpdates' && 'Mises à jour projet'}
                        {key === 'performanceReports' && 'Rapports performance'}
                        {key === 'weeklyDigest' && 'Résumé hebdomadaire'}
                      </Label>
                      <Switch
                        id={key}
                        checked={value}
                        onCheckedChange={(checked) => setSettings({
                          ...settings, 
                          notifications: { ...settings.notifications, [key]: checked }
                        })}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Colonne latérale */}
          <div className="space-y-6">
            {/* Permissions */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <RiShieldCheckFill className="h-5 w-5" />
                  Permissions
                </h2>
                
                <div className="space-y-4">
                  {Object.entries(settings.permissions).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <Label htmlFor={`perm-${key}`} className="flex-1">
                        {key === 'canInvite' && 'Inviter des membres'}
                        {key === 'canCreateProjects' && 'Créer des projets'}
                        {key === 'canEditSettings' && 'Modifier paramètres'}
                      </Label>
                      <Switch
                        id={`perm-${key}`}
                        checked={value}
                        onCheckedChange={(checked) => setSettings({
                          ...settings, 
                          permissions: { ...settings.permissions, [key]: checked }
                        })}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions dangereuses */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 text-red-600">
                  Zone dangereuse
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Archiver cette équipe la rendra inaccessible mais préservera les données.
                    </p>
                    <Button variant="outline" className="w-full">
                      Archiver l'équipe
                    </Button>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Cette action est irréversible. Toutes les données seront perdues.
                    </p>
                    <Button variant="destructive" className="w-full">
                      <RiDeleteBinLine className="h-4 w-4 mr-2" />
                      Supprimer l'équipe
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}