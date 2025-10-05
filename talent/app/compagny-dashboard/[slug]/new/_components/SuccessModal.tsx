// src/app/company/jobs/new/components/SuccessModal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, Eye, Plus, Share2 } from 'lucide-react';
import Link from 'next/link';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  slug: string;
}

export default function SuccessModal({ isOpen, onClose, jobTitle,slug }: SuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Offre publiée avec succès !</DialogTitle>
        </DialogHeader>
        
        <div className="text-center py-6">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </div>
          
          <h3 className="font-bold text-lg text-gray-900 mb-2">
            {jobTitle || 'Votre offre'}
          </h3>
          <p className="text-gray-600 mb-6">
            Votre offre d'emploi a été publiée avec succès et est maintenant visible par les candidats.
          </p>
          
          <div className="grid grid-cols-1 gap-3">
            <Button asChild className="w-full">
              <Link href={`/compagny-dashboard/${slug}/jobs`}>
                <Eye className="h-4 w-4 mr-2" />
                Voir toutes mes offres
              </Link>
            </Button>
            
            <Button variant="outline" className="w-full" onClick={onClose}>
              <Plus className="h-4 w-4 mr-2" />
              Créer une nouvelle offre
            </Button>
            
            <Button variant="outline" className="w-full">
              <Share2 className="h-4 w-4 mr-2" />
              Partager cette offre
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}