// src/app/companies/create-profile/components/ProfileCustomization.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BackgroundUpload from './BackgroundUpload';
import LogoUpload from './LogoUpload';
import PreviewSection from './PreviewSection';

interface ProfileCustomizationProps {
  onComplete: () => void;
}

export default function ProfileCustomization({ onComplete }: ProfileCustomizationProps) {
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const [logoImage, setLogoImage] = useState<File | null>(null);
  const [previewBackground, setPreviewBackground] = useState<string>('');
  const [previewLogo, setPreviewLogo] = useState<string>('');

  const handleBackgroundChange = (file: File | null, preview: string) => {
    setBackgroundImage(file);
    setPreviewBackground(preview);
  };

  const handleLogoChange = (file: File | null, preview: string) => {
    setLogoImage(file);
    setPreviewLogo(preview);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that at least a logo is provided
    if (!logoImage) {
      alert('Veuillez télécharger un logo pour votre entreprise');
      return;
    }
    
    // In a real app, this would upload images to a server
    console.log('Background image:', backgroundImage);
    console.log('Logo image:', logoImage);
    
    // Simulate upload process
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Personnalisez votre profil entreprise
        </h1>
        <p className="text-xl text-gray-600">
          Ajoutez une image de fond et un logo pour rendre votre profil attractif
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Image de fond</CardTitle>
              <CardDescription>
                Ajoutez une image qui représentera votre entreprise en arrière-plan de votre profil
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BackgroundUpload 
                onFileChange={handleBackgroundChange}
                currentPreview={previewBackground}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Logo de l'entreprise</CardTitle>
              <CardDescription>
                Téléchargez le logo de votre entreprise. Il sera affiché dans un cercle sur votre profil.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LogoUpload 
                onFileChange={handleLogoChange}
                currentPreview={previewLogo}
              />
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" disabled={!logoImage}>
            Enregistrer la personnalisation
          </Button>
        </div>

        {/* Preview Section */}
        <div className="lg:sticky lg:top-8 lg:h-fit">
          <PreviewSection 
            backgroundPreview={previewBackground}
            logoPreview={previewLogo}
            companyName="Nom de votre entreprise"
          />
        </div>
      </form>
    </div>
  );
}