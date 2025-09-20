// src/app/companies/create-profile/page.tsx
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import ProfileCustomization from './_components/ProfileCustomization';
import FooterSection from '../_components/FooterSection';

export default function CreateProfilePage() {
  const [profileComplete, setProfileComplete] = useState(false);

  const handleProfileComplete = () => {
    setProfileComplete(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container max-w-4xl mx-auto px-4">
          <ProfileCustomization onComplete={handleProfileComplete} />
        </div>
      </main>
      <FooterSection />
    </div>
  );
}