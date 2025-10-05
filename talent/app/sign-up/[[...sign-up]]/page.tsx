// app/sign-up/[[...sign-up]]/page.tsx
'use client';

import { SignUp } from '@clerk/nextjs'
import { Card, CardContent } from '@/components/ui/card'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Création de compte</h1>
            <p className="text-gray-600 mt-2">
              Créez votre compte recruteur
            </p>
          </div>
          <SignUp 
            path="/sign-up"
            routing="path"
            signInUrl="/sign-in"
            fallbackRedirectUrl="/compagny-dashboard/menu/1"
          />
        </CardContent>
      </Card>
    </div>
  )
}