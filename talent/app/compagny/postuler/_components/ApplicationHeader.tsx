// src/app/companies/l-oreal/jobs/[slug]/postuler/components/ApplicationHeader.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function ApplicationHeader() {
  return (
    <div className="mb-8">
      <Link href="/companies/l-oreal/jobs/stage-6-mois-performance">
        <Button variant="ghost" className="mb-4 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Retour à l'offre
        </Button>
      </Link>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Postuler à l'offre
      </h1>
      <h2 className="text-xl text-gray-600">
        STAGE 6 MOIS - À partir de janvier 2026 - Performance - CAUDRY- INGENIEUR - 1 700 € mensuel
      </h2>
      
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-800 text-sm">
          <strong>Conseil :</strong> Assurez-vous que votre CV et votre lettre de motivation sont à jour et 
          adaptés à ce poste avant de soumettre votre candidature.
        </p>
      </div>
    </div>
  );
}