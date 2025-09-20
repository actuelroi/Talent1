// src/app/candidate/dashboard/page.tsx
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import ProfileSection from './_components/ProfileSection';
import CVManager from './_components/CVManager';
import Applications from './_components/Applications';
import Messages from './_components/Messages';
import JobSuggestions from './_components/JobSuggestions';
import CandidateSidebar from '../_components/CandidateSidebar';
import QuickActions from './_components/QuickActions';
import FooterSection from '@/app/compagny/_components/FooterSection';
import AccountInfo from './_components/AccountInfo';
import CoursesTraining from './_components/CoursesTraining';


export default function CandidateDashboard() {
  const [activeTab, setActiveTab] = useState('profile');

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSection />;
      case 'account':
        return <AccountInfo />;
      case 'cv':
        return <CVManager />;
      case 'applications':
        return <Applications />;
      case 'messages':
        return <Messages />;
      case 'suggestions':
        return <JobSuggestions />;
    //   case 'discover':
    //     return <Discover />;
    case 'courses':
      return <CoursesTraining />; // New case
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <div className="flex flex-1">
        <CandidateSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 bg-gray-50 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Quick Actions */}
            <QuickActions />
            
            {/* Main Content */}
            <div className="mt-6">
              {renderActiveSection()}
            </div>
          </div>
        </main>
      </div>
      <FooterSection />
    </div>
  );
}