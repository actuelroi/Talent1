'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PreviewSectionProps } from '@/types/profile';

export default function PreviewSection({ 
  backgroundPreview, 
  logoPreview, 
  companyName 
}: PreviewSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aperçu de votre profil</CardTitle>
        <CardDescription>
          Voici comment votre profil apparaîtra aux candidats
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden shadow-sm">
          {/* Header with background image */}
          <div 
            className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative"
            style={backgroundPreview ? { 
              backgroundImage: `url(${backgroundPreview})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            } : {}}
          >
            {/* Logo container */}
            <div className="absolute -bottom-12 left-6">
              <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                {logoPreview ? (
                  <img 
                    src={logoPreview} 
                    alt="Logo preview" 
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="text-gray-400 text-xs text-center p-2">
                    Logo manquant
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Profile content */}
          <div className="pt-14 px-6 pb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {companyName}
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Votre description d'entreprise apparaîtra ici
            </p>
            <div className="flex gap-2">
              <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                Industrie
              </span>
              <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                Localisation
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-gray-500">
          <p><strong>Note :</strong> Ceci est un aperçu. Votre profil final pourra contenir plus d'informations.</p>
        </div>
      </CardContent>
    </Card>
  );
}