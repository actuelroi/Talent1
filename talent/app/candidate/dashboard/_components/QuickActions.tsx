// src/app/candidate/dashboard/components/QuickActions.tsx
import { Button } from '@/components/ui/button';
import {
  RiUploadLine,
  RiEditLine,
  RiSearchEyeLine,
  RiUserFollowLine
} from "@remixicon/react";

export default function QuickActions() {
  const actions = [
    {
      icon: RiUploadLine,
      label: 'Mettre à jour mon CV',
      description: 'Téléchargez votre dernière version',
      action: () => console.log('Update CV')
    },
    {
      icon: RiEditLine,
      label: 'Compléter mon profil',
      description: 'Ajoutez vos compétences et expériences',
      action: () => console.log('Complete profile')
    },
    {
      icon: RiSearchEyeLine,
      label: 'Rechercher des offres',
      description: 'Trouvez des jobs qui vous correspondent',
      action: () => console.log('Search jobs')
    },
    {
      icon: RiUserFollowLine,
      label: 'Optimiser mon profil',
      description: 'Améliorez votre visibilité',
      action: () => console.log('Optimize profile')
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <Button
          key={index}
          variant="outline"
          className="h-auto p-4 flex flex-col items-start justify-start text-left"
          onClick={action.action}
        >
          <action.icon className="h-6 w-6 mb-2 text-blue-600" />
          <span className="font-semibold">{action.label}</span>
          <span className="text-sm text-gray-600 mt-1">{action.description}</span>
        </Button>
      ))}
    </div>
  );
}