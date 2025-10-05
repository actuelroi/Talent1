'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BackgroundUpload from './BackgroundUpload';
import LogoUpload from './LogoUpload';
import PreviewSection from './PreviewSection';
import { ProfileCustomizationProps } from '@/types/profile';

export default function ProfileCustomization({ onComplete, companyName = "Nom de votre entreprise" }: ProfileCustomizationProps) {
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const [logoImage, setLogoImage] = useState<File | null>(null);
  const [previewBackground, setPreviewBackground] = useState<string>('');
  const [previewLogo, setPreviewLogo] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBackgroundChange = (file: File | null, preview: string) => {
    setBackgroundImage(file);
    setPreviewBackground(preview);
  };

  const handleLogoChange = (file: File | null, preview: string) => {
    setLogoImage(file);
    setPreviewLogo(preview);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!logoImage) {
      alert('Veuillez télécharger un logo pour votre entreprise');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onComplete({
        backgroundImage: backgroundImage || undefined,
        logoImage: logoImage
      });
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Une erreur est survenue lors de l\'enregistrement');
    } finally {
      setIsLoading(false);
    }
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

          <Button 
            type="submit" 
            className="w-full" 
            disabled={!logoImage || isLoading}
          >
            {isLoading ? 'Enregistrement...' : 'Enregistrer la personnalisation'}
          </Button>
        </div>

        {/* Preview Section */}
        <div className="lg:sticky lg:top-8 lg:h-fit">
          <PreviewSection 
            backgroundPreview={previewBackground}
            logoPreview={previewLogo}
            companyName={companyName}
          />
        </div>
      </form>
    </div>
  );
}