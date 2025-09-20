// src/app/candidate/dashboard/components/AccountInfo.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RiEditLine, RiSaveLine, RiLockLine, RiNotificationLine, RiGlobalLine } from "@remixicon/react";
import { useState } from 'react';

export default function AccountInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [account, setAccount] = useState({
    email: 'marie.dupont@email.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    language: 'fr',
    notifications: {
      email: true,
      jobAlerts: true,
      applicationUpdates: true,
      newsletter: false
    },
    privacy: {
      profileVisible: true,
      searchable: true,
      dataSharing: false
    }
  });

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, save to API
    console.log('Account settings saved:', account);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Informations du Compte</h1>
        {isEditing ? (
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            <RiSaveLine className="h-4 w-4 mr-2" />
            Enregistrer les modifications
          </Button>
        ) : (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            <RiEditLine className="h-4 w-4 mr-2" />
            Modifier
          </Button>
        )}
      </div>

      {/* Email Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RiGlobalLine className="h-5 w-5" />
            Informations de connexion
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Adresse email</Label>
            <Input
              type="email"
              value={account.email}
              onChange={(e) => setAccount({...account, email: e.target.value})}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Password Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RiLockLine className="h-5 w-5" />
            Sécurité du compte
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Mot de passe actuel</Label>
            <Input
              type="password"
              value={account.currentPassword}
              onChange={(e) => setAccount({...account, currentPassword: e.target.value})}
              disabled={!isEditing}
              className="mt-1"
              placeholder="••••••••"
            />
          </div>
          <div>
            <Label>Nouveau mot de passe</Label>
            <Input
              type="password"
              value={account.newPassword}
              onChange={(e) => setAccount({...account, newPassword: e.target.value})}
              disabled={!isEditing}
              className="mt-1"
              placeholder="••••••••"
            />
          </div>
          <div>
            <Label>Confirmer le nouveau mot de passe</Label>
            <Input
              type="password"
              value={account.confirmPassword}
              onChange={(e) => setAccount({...account, confirmPassword: e.target.value})}
              disabled={!isEditing}
              className="mt-1"
              placeholder="••••••••"
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RiNotificationLine className="h-5 w-5" />
            Préférences de notification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold">Notifications par email</Label>
              <p className="text-sm text-gray-600">Recevoir des emails importants</p>
            </div>
            <Switch
              checked={account.notifications.email}
              onCheckedChange={(checked) => setAccount({
                ...account,
                notifications: {...account.notifications, email: checked}
              })}
              disabled={!isEditing}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold">Alertes emploi</Label>
              <p className="text-sm text-gray-600">Offres correspondant à votre profil</p>
            </div>
            <Switch
              checked={account.notifications.jobAlerts}
              onCheckedChange={(checked) => setAccount({
                ...account,
                notifications: {...account.notifications, jobAlerts: checked}
              })}
              disabled={!isEditing}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold">Mises à jour de candidature</Label>
              <p className="text-sm text-gray-600">Statut de vos candidatures</p>
            </div>
            <Switch
              checked={account.notifications.applicationUpdates}
              onCheckedChange={(checked) => setAccount({
                ...account,
                notifications: {...account.notifications, applicationUpdates: checked}
              })}
              disabled={!isEditing}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold">Newsletter</Label>
              <p className="text-sm text-gray-600">Actualités et conseils emploi</p>
            </div>
            <Switch
              checked={account.notifications.newsletter}
              onCheckedChange={(checked) => setAccount({
                ...account,
                notifications: {...account.notifications, newsletter: checked}
              })}
              disabled={!isEditing}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Paramètres de confidentialité</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold">Profil visible</Label>
              <p className="text-sm text-gray-600">Rendre votre profil visible aux recruteurs</p>
            </div>
            <Switch
              checked={account.privacy.profileVisible}
              onCheckedChange={(checked) => setAccount({
                ...account,
                privacy: {...account.privacy, profileVisible: checked}
              })}
              disabled={!isEditing}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold">Apparaître dans les recherches</Label>
              <p className="text-sm text-gray-600">Permettre aux recruteurs de vous trouver</p>
            </div>
            <Switch
              checked={account.privacy.searchable}
              onCheckedChange={(checked) => setAccount({
                ...account,
                privacy: {...account.privacy, searchable: checked}
              })}
              disabled={!isEditing}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold">Partage de données</Label>
              <p className="text-sm text-gray-600">Partager des données pour des recommandations personnalisées</p>
            </div>
            <Switch
              checked={account.privacy.dataSharing}
              onCheckedChange={(checked) => setAccount({
                ...account,
                privacy: {...account.privacy, dataSharing: checked}
              })}
              disabled={!isEditing}
            />
          </div>
        </CardContent>
      </Card>

      {isEditing && (
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Annuler
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            <RiSaveLine className="h-4 w-4 mr-2" />
            Enregistrer les modifications
          </Button>
        </div>
      )}
    </div>
  );
}