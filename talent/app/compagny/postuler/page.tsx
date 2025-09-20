// src/app/companies/l-oreal/jobs/[slug]/postuler/page.tsx
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import ApplicationSuccess from './_components/ApplicationSuccess';
import FooterSection from '../_components/FooterSection';
import ApplicationHeader from './_components/ApplicationHeader';
import ApplicationForm from './_components/ApplicationForm';

export default function ApplicationPage() {
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const handleApplicationSubmit = () => {
    // In a real application, this would send data to an API
    setApplicationSubmitted(true);
  };

  if (applicationSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <ApplicationSuccess />
        </main>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <main className="flex-1">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <ApplicationHeader />
          <ApplicationForm onSubmit={handleApplicationSubmit} />
        </div>
      </main>
      <FooterSection />
    </div>
  );
}