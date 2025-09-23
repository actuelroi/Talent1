


'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  RiPlayCircleLine, 
  RiCalendarLine, 
  RiTimeLine, 
  RiCheckboxCircleLine,
  RiArrowRightLine,
  RiBookOpenLine,
  RiMedalLine
} from "@remixicon/react";
import { useState } from 'react';
import CompanyStats from './CompanyStats';
import EmployeeTestimonials from './EmployeeTestimonials';
import CompanyPresentation from './CompanyPresentation';
import CompanyLookingFor from './CompanyLookingFor';
import JobOpenings from './JobOpenings';
import CompanyBenefits from './CompanyBenefits';
import LocationCard from './LocationCard';
import JobsPage from './JobsTab';
import MetiersPage from './Metiers';
import RSEPage from './rse';

export default function Navigation() {
  const [activeTab, setActiveTab] = useState<'Profil' | 'Jobs' | 'Métiers'|'Diversité'|'RSE' >('Profil');

  const courses = {
    ongoing: [
      {
        id: 1,
        title: 'React Avancé - Les meilleures pratiques',
        provider: 'OpenClassrooms',
        progress: 65,
        duration: '12 heures',
        deadline: '2024-02-15',
        modules: 8,
        completedModules: 5,
        image: '/api/placeholder/300/200'
      },
      {
        id: 2,
        title: 'TypeScript pour Développeurs JavaScript',
        provider: 'Coursera',
        progress: 30,
        duration: '8 heures',
        deadline: '2024-03-01',
        modules: 6,
        completedModules: 2,
        image: '/api/placeholder/300/200'
      }
    ],
    completed: [
      {
        id: 3,
        title: 'Introduction à Next.js',
        provider: 'Udemy',
        progress: 100,
        duration: '6 heures',
        completedDate: '2024-01-10',
        certificate: true,
        image: '/api/placeholder/300/200'
      }
    ],
    available: [
      {
        id: 4,
        title: 'UI/UX Design Fundamentals',
        provider: 'LinkedIn Learning',
        duration: '10 heures',
        level: 'Débutant',
        rating: 4.8,
        students: 12500,
        image: '/api/placeholder/300/200'
      },
      {
        id: 5,
        title: 'AWS Cloud Practitioner',
        provider: 'Amazon Web Services',
        duration: '15 heures',
        level: 'Intermédiaire',
        rating: 4.6,
        students: 8900,
        image: '/api/placeholder/300/200'
      }
    ]
  };

  return (
     <section className="bg-white border-b">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('Profil')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'Profil'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Profil
        </button>
        <button
          onClick={() => setActiveTab('Jobs')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'Jobs'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Jobs
        </button>
        <button
          onClick={() => setActiveTab('Métiers')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'Métiers'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Métiers
        </button>

        <button
          onClick={() => setActiveTab('RSE')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'RSE'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          RSE
        </button>
      </div>

      {/* Ongoing Courses */}
      {activeTab === 'Profil' && (
         <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <CompanyStats />
              <EmployeeTestimonials />
              <CompanyPresentation />
              <CompanyLookingFor />
            </div>
            
            <div className="space-y-6">
              <JobOpenings />
              <CompanyBenefits />
              <LocationCard />
            </div>
          </div>
        </div>
      )}

      {/* Completed Courses */}
      {activeTab === 'Jobs' && (
        <JobsPage/>)}

      {/* Available Courses */}
      {activeTab === 'Métiers' && (
        <MetiersPage/>
      )}

      
      {activeTab === 'RSE' && (
        <RSEPage/>
       
      )}
    </section>
  );
}