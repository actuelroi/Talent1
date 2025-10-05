// src/app/register/company/components/RegistrationSuccess.tsx
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Mail, Settings, Users } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function RegistrationSuccess() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        containerRef.current.focus(); // optional: for accessibility
      }
    }, []);
  return (
    <div 
     ref={containerRef}
      tabIndex={-1} // makes it focusable for accessibility
    className="container max-w-2xl mx-auto px-4 py-12">
      <Card className="border-green-200">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Votre compte entreprise a été créé !
          </h1>
          
          <p className="text-gray-600 mb-6">
            Félicitations ! Votre compte Welcome to the Jungle a été créé avec succès. 
            Nous avons envoyé un email de confirmation à l'adresse que vous avez fournie.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Vérifiez votre email</p>
              <p className="text-xs text-gray-600">Confirmez votre adresse email</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <Settings className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Configurez votre profil</p>
              <p className="text-xs text-gray-600">Complétez votre page entreprise</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Publiez vos offres</p>
              <p className="text-xs text-gray-600">Commencez à attirer des talents</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-in">
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                Se connecter
              </Button>
            </Link>
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
}