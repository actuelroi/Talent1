// src/app/companies/create-profile/components/PreviewSection.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PreviewSectionProps {
  backgroundPreview: string;
  logoPreview: string;
  companyName: string;
}

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
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <span>Technologie • 50-200 employés</span>
            </div>
            
            <p className="text-gray-700 mb-4">
              Nous transformons le monde grâce à nos innovations technologiques et notre culture d'entreprise unique.
            </p>
            
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                🏢 Bureau principal
              </span>
              <span className="text-gray-600 text-sm">Paris, France</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">Conseils pour un profil réussi :</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Utilisez une image de fond haute qualité</li>
            <li>• Assurez-vous que votre logo est net et visible</li>
            <li>• Complétez toutes les informations de votre entreprise</li>
            <li>• Ajoutez des photos de votre équipe et bureau</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}