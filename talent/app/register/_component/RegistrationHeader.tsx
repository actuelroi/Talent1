// src/app/register/company/components/RegistrationHeader.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function RegistrationHeader() {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Créer un compte entreprise
      </h1>
      <p className="text-xl text-gray-600">
        Rejoignez Talent et transformez votre recrutement
      </p>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg max-w-2xl mx-auto">
        <p className="text-blue-800 text-sm">
          <strong>Pourquoi nous choisir ?</strong> Plus de 5 000 entreprises nous font confiance pour 
          attirer les meilleurs talents et renforcer leur marque employeur.
        </p>
      </div>
    </div>
  );
}