


'use client';


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

import FiltersSidebar from './FiltersSidebar';
import JobsList from './JobsList';
import FeaturedSection from './FeaturedSection';

export default function Navigation() {




  const [activeTab, setActiveTab] = useState<'Profil' | 'Jobs' | 'Métiers'|'Diversité'|'RSE' |'À la une'>('Profil');

  const updateEmployeeStories = (newStories: any) => {
    setEmployeeStories(newStories);
  };

  const [employeeStories, setEmployeeStories] = useState([
      {
        id: 1,
        name: "Viken",
        position: "Chef de Projet Retail Education",
        image: "/api/placeholder/100/100",
        video: "https://www.youtube.com/embed/example"
      },
      {
        id: 2,
        name: "Renaud",
        position: "Retail Marketing",
        image: "/api/placeholder/100/100",
        video: "https://www.youtube.com/embed/example"
      },
      {
        id: 3,
        name: "Corentin",
        position: "Animateur de fabrication",
        image: "/api/placeholder/100/100",
        video: "https://www.youtube.com/embed/example"
      }
    ]);



  

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
        <button
          onClick={() => setActiveTab('À la une')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'À la une'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
         À la une
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
        // <JobsPage/>
        <div className="container max-w-6xl mx-auto px-4 py-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <FiltersSidebar />
                    <JobsList />
                  </div>
                </div>
        
        )}

      {/* Available Courses */}
      {activeTab === 'Métiers' && (
        <MetiersPage/>
      )}

      
      {activeTab === 'RSE' && (
        <RSEPage/>
       
      )}
      {activeTab === 'À la une' && (
        <FeaturedSection 
                    employeeStories={employeeStories} 
                    onUpdate={updateEmployeeStories} 
                  />
       
      )}
    </section>
  );
}