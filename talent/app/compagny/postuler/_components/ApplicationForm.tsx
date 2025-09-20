// src/app/companies/l-oreal/jobs/[slug]/postuler/components/ApplicationForm.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PersonalInfoForm from './PersonalInfoForm';
import FileUpload from './FileUpload';

interface ApplicationFormProps {
  onSubmit: () => void;
}

export default function ApplicationForm({ onSubmit }: ApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    message: '',
    resume: null as File | null,
    coverLetter: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (name: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [name]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form data
    if (!formData.resume) {
      alert('Veuillez télécharger votre CV');
      return;
    }
    
    // Submit application (in a real app, this would call an API)
    console.log('Application data:', formData);
    onSubmit();
  };

  const nextStep = () => {
    if (currentStep === 1 && (!formData.firstName || !formData.lastName || !formData.email)) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    setCurrentStep(2);
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
            <CardDescription>
              Renseignez vos coordonnées pour que L'Oréal puisse vous contacter.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PersonalInfoForm 
              formData={formData} 
              onChange={handleInputChange} 
            />
            <div className="flex justify-end mt-6">
              <Button type="button" onClick={nextStep}>
                Suivant
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Documents de candidature</CardTitle>
              <CardDescription>
                Téléchargez votre CV et votre lettre de motivation (optionnel mais recommandé).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload 
                formData={formData} 
                onFileChange={handleFileChange} 
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Message complémentaire</CardTitle>
              <CardDescription>
                Ajoutez un message pour compléter votre candidature (optionnel).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Pourquoi souhaitez-vous rejoindre L'Oréal ? Qu'est-ce qui vous motive pour ce poste ?"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={prevStep}>
              Retour
            </Button>
            <Button type="submit">
              Envoyer ma candidature
            </Button>
          </div>
        </>
      )}
    </form>
  );
}