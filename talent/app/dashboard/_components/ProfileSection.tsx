// src/app/company/dashboard/components/ProfileSection.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RiEditLine } from "@remixicon/react";

import { useState } from 'react';
import EditModal from './EditModal';

interface ProfileSectionProps {
  companyData: any;
  onUpdate: (data: any) => void;
}

export default function ProfileSection({ companyData, onUpdate }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editField, setEditField] = useState('');

  const handleSave = (field: string, value: string) => {
    onUpdate({ [field]: value });
    setIsEditing(false);
    setEditField('');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Présentation</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsEditing(true);
                setEditField('description');
              }}
            >
              <RiEditLine className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 whitespace-pre-line">{companyData.description}</p>
        </CardContent>
      </Card>

      <EditModal
        isOpen={isEditing}
        onClose={() => {
          setIsEditing(false);
          setEditField('');
        }}
        title="Modifier la présentation"
        value={companyData.description}
        onSave={(value) => handleSave('description', value)}
        isTextarea={true}
      />
    </div>
  );
}