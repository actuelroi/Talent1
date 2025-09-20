// src/app/candidate/dashboard/components/ProfileSection.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RiEditLine, RiSaveLine } from "@remixicon/react";
import { useState } from 'react';

export default function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'Marie',
    lastName: 'Dupont',
    title: 'Développeuse Frontend Senior',
    location: 'Paris, France',
    email: 'marie.dupont@email.com',
    phone: '+33 6 12 34 56 78',
    bio: 'Développeuse frontend passionnée avec 5 ans d\'expérience dans la création d\'applications web modernes et réactives. Expertise en React et TypeScript.',
    skills: ['React', 'TypeScript', 'Next.js', 'Node.js', 'CSS/SASS'],
    experience: '5 ans',
    education: 'Master en Informatique - Université Paris-Saclay'
  });

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, save to API
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mon Profil</h1>
        {isEditing ? (
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            <RiSaveLine className="h-4 w-4 mr-2" />
            Enregistrer
          </Button>
        ) : (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            <RiEditLine className="h-4 w-4 mr-2" />
            Modifier
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Prénom</Label>
              <Input
                value={profile.firstName}
                onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label>Nom</Label>
              <Input
                value={profile.lastName}
                onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div>
            <Label>Titre professionnel</Label>
            <Input
              value={profile.title}
              onChange={(e) => setProfile({...profile, title: e.target.value})}
              disabled={!isEditing}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label>Téléphone</Label>
              <Input
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div>
            <Label>Localisation</Label>
            <Input
              value={profile.location}
              onChange={(e) => setProfile({...profile, location: e.target.value})}
              disabled={!isEditing}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bio & Compétences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Bio professionnelle</Label>
            <Textarea
              value={profile.bio}
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
              disabled={!isEditing}
              rows={4}
            />
          </div>

          <div>
            <Label>Compétences</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
              {isEditing && (
                <button className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full hover:bg-gray-200">
                  + Ajouter
                </button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}