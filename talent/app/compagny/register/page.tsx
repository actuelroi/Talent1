// src/app/register/company/page.tsx
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import FooterSection from '../_components/FooterSection';
import RegistrationSuccess from './_component/RegistrationSuccess';
import RegistrationHeader from './_component/RegistrationHeader';
import RegistrationForm from './_component/RegistrationForm';



export default function CompanyRegistrationPage() {
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const handleRegistrationComplete = () => {
    setRegistrationComplete(true);
  };

  if (registrationComplete) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* <Header /> */}
        <main className="flex-1">
          <RegistrationSuccess />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
    
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <RegistrationHeader />
          <RegistrationForm onComplete={handleRegistrationComplete} />
        </div>
      </main>
    </div>
  );
}