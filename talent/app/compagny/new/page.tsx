// src/app/company/jobs/new/page.tsx
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import JobForm from './_components/JobForm';
import PreviewSection from './_components/PreviewSection';
import FooterSection from '../_components/FooterSection';
import SuccessModal from './_components/SuccessModal';


// Mock company data - in a real app, this would come from authentication/context
const mockCompany = {
  id: 'comp-1',
  name: "L'Oréal Groupe",
  slug: "loreal-groupe",
  description: "Créateur de beauté depuis plus d'un siècle. Notre raison d'être : créer la beauté qui fait avancer le monde.",
  logo: "/api/placeholder/100/100",
  coverImage: "/api/placeholder/800/200",
  industry: "Cosmétique, Luxe, E-commerce",
  size: "1000+ employés",
  location: "Clichy, France",
  website: "https://www.loreal.com",
  foundedYear: 1909,
  employees: "90 000",
  parity: "58% / 42%",
  revenue: "43,48 Mds €"
};

export default function CreateJobPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    responsibilities: '',
    benefits: '',
    location: 'Paris, France',
    remotePolicy: 'hybrid',
    employmentType: 'full_time',
    experienceLevel: 'mid_level',
    salaryMin: '',
    salaryMax: '',
    currency: 'EUR',
    applicationUrl: '',
    isActive: true,
    isFeatured: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Job created:', formData);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error creating job:', error);
      alert('Une erreur est survenue lors de la création de l\'offre.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Créer une nouvelle offre d'emploi
            </h1>
            <p className="text-xl text-gray-600">
              Remplissez les informations ci-dessous pour publier votre offre
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Job Form */}
            <div className="lg:col-span-2">
              <JobForm 
                formData={formData} 
                onChange={handleInputChange}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </div>

            {/* Preview Section */}
            <div className="lg:sticky lg:top-8 lg:h-fit">
              <PreviewSection 
                jobData={formData}
                company={mockCompany}
              />
            </div>
          </div>
        </div>
      </main>
      <FooterSection />

      <SuccessModal 
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        jobTitle={formData.title}
      />
    </div>
  );
}