// src/app/company/dashboard/page.tsx
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import ProfileSection from './_components/ProfileSection';
import BenefitsSection from './_components/BenefitsSection';
import CompanyStats from './_components/CompanyStats';
import JobsSection from './_components/JobsSection';
import FeaturedSection from './_components/FeaturedSection';
import DashboardSidebar from './_components/DashboardSidebar';
import CompanyHeader from './_components/CompanyHeader';
import NavigationTabs from './_components/NavigationTabs';
import FooterSection from '../compagny/_components/FooterSection';

export default function CompanyDashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const [companyData, setCompanyData] = useState({
    name: "L'Oréal Groupe",
    industry: "Cosmétique, E-commerce, Luxe",
    location: "Clichy",
    website: "https://www.loreal.com",
    foundedYear: 1909,
    employees: 90000,
    genderRatio: "58% / 42%",
    revenue: "43,48 Mds €",
    description: `Notre Raison d'être : Créer la beauté qui fait avancer le monde.

Le désir de beauté est une force puissante qui nous fait avancer. La beauté ne se limite pas à l'apparence. Elle nous donne confiance en nous, en qui nous voulons être, et dans notre relation avec les autres.

Depuis plus d'un siècle, nous exerçons ce métier unique : créateur de beauté. Notre but est d'offrir à tous, partout dans le monde, le meilleur de la beauté en termes de qualité, d'efficacité, de sécurité et de sincérité pour satisfaire tous les besoins et désirs de beauté dans leur infinie diversité.`,
    benefits: [
      "Accès à la Vente Au Personnel à des tarifs préférentiels",
      "Télétravail ponctuel autorisé",
      "Accès à la cantine",
      "Accès à L'Oréal Learning Platform pour booster votre développement"
    ],
    commitments: [
      "Égalité hommes-femmes",
      "Développement durable",
      "Innovation sociale",
      "Diversité et inclusion"
    ]
  });

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "6-month Internship - Assurance Qualité - JANVIER 2026",
      type: "Stage",
      location: "Aulnay",
      remote: true,
      featured: true
    },
    {
      id: 2,
      title: "STAGE 6 MOIS - Développement d'ingrédients cosmétiques innovants",
      type: "Stage",
      location: "Paris",
      remote: true,
      featured: true
    },
    {
      id: 3,
      title: "6 month internship - Luxe division Customer Care Projects",
      type: "Stage",
      location: "Orleans",
      remote: true,
      featured: false
    }
  ]);

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

  const updateCompanyData = (newData: any) => {
    setCompanyData({ ...companyData, ...newData });
  };

  const updateJobs = (newJobs: any) => {
    setJobs(newJobs);
  };

  const updateEmployeeStories = (newStories: any) => {
    setEmployeeStories(newStories);
  };

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-8">
            <ProfileSection 
              companyData={companyData} 
              onUpdate={updateCompanyData} 
            />
            <CompanyStats companyData={companyData} />
            <BenefitsSection 
              benefits={companyData.benefits} 
              commitments={companyData.commitments}
              onUpdate={updateCompanyData}
            />
          </div>
        );
      case 'jobs':
        return (
          <JobsSection 
            jobs={jobs} 
            onUpdate={updateJobs} 
          />
        );
      case 'featured':
        return (
          <FeaturedSection 
            employeeStories={employeeStories} 
            onUpdate={updateEmployeeStories} 
          />
        );
      default:
        return <ProfileSection companyData={companyData} onUpdate={updateCompanyData} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 bg-gray-50">
          <CompanyHeader companyData={companyData} />
          
          <div className="container max-w-7xl mx-auto px-4 py-8">
            <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
            
            <div className="mt-8">
              {renderActiveSection()}
            </div>
          </div>
        </main>
      </div>
      <FooterSection />
    </div>
  );
}