// src/app/register/company/components/RegistrationForm.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CompanyInfoForm from './CompanyInfoForm';
import AccountInfoForm from './AccountInfoForm';
import PlanSelection from './PlanSelection';

interface RegistrationFormProps {
  onComplete: () => void;
}

export default function RegistrationForm({ onComplete }: RegistrationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    companySize: '',
    industry: '',
    website: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    
    // Account Information
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    jobTitle: '',
    department: '',
    
    // Plan Selection
    plan: 'starter',
    
    // Terms
    agreeTerms: false,
    agreePrivacy: false,
    receiveNewsletter: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (currentStep === 1 && (!formData.companyName || !formData.industry || !formData.companySize)) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    if (currentStep === 2 && (!formData.firstName || !formData.lastName || !formData.email || !formData.password)) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    if (currentStep === 2 && formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    
    // if (currentStep === 3 && !formData.agreeTerms) {
    //   alert('Vous devez accepter les conditions d\'utilisation');
    //   return;
    // }
    
    if (currentStep < 3) {
      nextStep();
    } else {
      // Submit registration (in a real app, this would call an API)
      console.log('Registration data:', formData);
      onComplete();
    }
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            Étape {currentStep} sur 3: {
              currentStep === 1 ? 'Informations entreprise' :
              currentStep === 2 ? 'Informations compte' :
              'Choisir un plan'
            }
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && 'Renseignez les informations concernant votre entreprise'}
            {currentStep === 2 && 'Créez votre compte administrateur'}
            {currentStep === 3 && 'Sélectionnez le plan qui correspond à vos besoins'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && (
            <CompanyInfoForm formData={formData} onChange={handleInputChange} />
          )}
          
          {currentStep === 2 && (
            <AccountInfoForm formData={formData} onChange={handleInputChange} />
          )}
          
          {currentStep === 3 && (
            <PlanSelection formData={formData} onChange={handleInputChange} />
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        {currentStep > 1 ? (
          <Button type="button" variant="outline" onClick={prevStep}>
            Précédent
          </Button>
        ) : (
          <div></div>
        )}
        
        {currentStep < 3 ? (
          <Button type="button" onClick={nextStep}>
            Suivant
          </Button>
        ) : (
          <Button type="submit">
            Créer mon compte
          </Button>
        )}
      </div>
    </form>
  );
}