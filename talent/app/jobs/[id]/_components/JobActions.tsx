// src/app/jobs/[id]/components/JobActions.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Share2, Flag, Building } from 'lucide-react';
import ApplicationModal from './ApplicationModal';
import { JobPosting, Company } from '@/lib/generated/prisma';

interface JobActionsProps {
  job: JobPosting & { company: Company };
}

export default function JobActions({ job }: JobActionsProps) {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveJob = async () => {
    // In a real app, this would call an API to save the job
    setIsSaved(!isSaved);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: job.title,
          text: `Découvrez cette offre chez ${job.company.name}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papier !');
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={() => setIsApplicationModalOpen(true)}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            Postuler maintenant
          </Button>
          
          <Button
            variant={isSaved ? "default" : "outline"}
            onClick={handleSaveJob}
            className="flex items-center gap-2"
          >
            <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
            {isSaved ? 'Sauvegardé' : 'Sauvegarder'}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleShare}
            className="flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            Partager
          </Button>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap gap-4">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <Flag className="h-4 w-4" />
            Signaler cette offre
          </Button>
          
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Voir toutes les offres de {job.company.name}
          </Button>
        </div>
      </div>

      <ApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        job={job}
      />
    </>
  );
}