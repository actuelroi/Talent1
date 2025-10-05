
// 'use client';


// import { useState } from 'react';
// import CompanyStats from './CompanyStats';
// import EmployeeTestimonials from './EmployeeTestimonials';
// import CompanyPresentation from './CompanyPresentation';
// import CompanyLookingFor from './CompanyLookingFor';
// import JobOpenings from './JobOpenings';
// import CompanyBenefits from './CompanyBenefits';
// import LocationCard from './LocationCard';
// import JobsPage from './JobsTab';
// import MetiersPage from './Metiers';
// import RSEPage from './rse';
// import FeaturedSection from './FeaturedSection';


// export default function Navigation() {




//   const [activeTab, setActiveTab] = useState<'Profil' | 'Jobs' | 'Métiers'|'Diversité'|'RSE' |'À la une'>('Profil');

//   const updateEmployeeStories = (newStories: any) => {
//     setEmployeeStories(newStories);
//   };

//   const [employeeStories, setEmployeeStories] = useState([
//       {
//         id: 1,
//         name: "Viken",
//         position: "Chef de Projet Retail Education",
//         image: "/api/placeholder/100/100",
//         video: "https://www.youtube.com/embed/example"
//       },
//       {
//         id: 2,
//         name: "Renaud",
//         position: "Retail Marketing",
//         image: "/api/placeholder/100/100",
//         video: "https://www.youtube.com/embed/example"
//       },
//       {
//         id: 3,
//         name: "Corentin",
//         position: "Animateur de fabrication",
//         image: "/api/placeholder/100/100",
//         video: "https://www.youtube.com/embed/example"
//       }
//     ]);



  

//   return (
//      <section className="bg-white border-b">
//       {/* Tab Navigation */}
//       <div className="flex border-b border-gray-200">
//         <button
//           onClick={() => setActiveTab('Profil')}
//           className={`px-4 py-2 font-medium text-sm ${
//             activeTab === 'Profil'
//               ? 'border-b-2 border-blue-600 text-blue-600'
//               : 'text-gray-600 hover:text-gray-900'
//           }`}
//         >
//           Profil
//         </button>
//         <button
//           onClick={() => setActiveTab('Jobs')}
//           className={`px-4 py-2 font-medium text-sm ${
//             activeTab === 'Jobs'
//               ? 'border-b-2 border-blue-600 text-blue-600'
//               : 'text-gray-600 hover:text-gray-900'
//           }`}
//         >
//           Jobs
//         </button>
//         <button
//           onClick={() => setActiveTab('Métiers')}
//           className={`px-4 py-2 font-medium text-sm ${
//             activeTab === 'Métiers'
//               ? 'border-b-2 border-blue-600 text-blue-600'
//               : 'text-gray-600 hover:text-gray-900'
//           }`}
//         >
//           Métiers
//         </button>

//         <button
//           onClick={() => setActiveTab('RSE')}
//           className={`px-4 py-2 font-medium text-sm ${
//             activeTab === 'RSE'
//               ? 'border-b-2 border-blue-600 text-blue-600'
//               : 'text-gray-600 hover:text-gray-900'
//           }`}
//         >
//           RSE
//         </button>
//         <button
//           onClick={() => setActiveTab('À la une')}
//           className={`px-4 py-2 font-medium text-sm ${
//             activeTab === 'À la une'
//               ? 'border-b-2 border-blue-600 text-blue-600'
//               : 'text-gray-600 hover:text-gray-900'
//           }`}
//         >
//          À la une
//         </button>
//       </div>

//       {/* Ongoing Courses */}
//       {activeTab === 'Profil' && (
//          <div className="container max-w-6xl mx-auto px-4 py-8">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2 space-y-8">
//               <CompanyStats />
//               <EmployeeTestimonials />
//               <CompanyPresentation />
//               <CompanyLookingFor />
//             </div>
            
//             <div className="space-y-6">
//               <JobOpenings />
//               <CompanyBenefits />
//               <LocationCard />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Completed Courses */}
//       {activeTab === 'Jobs' && (
       
//                  <JobsPage/>
           
         
//        )}

//       {/* Available Courses */}
//       {activeTab === 'Métiers' && (
//         <MetiersPage/>
//       )}

      
//       {activeTab === 'RSE' && (
//         <RSEPage/>
       
//       )}
//       {activeTab === 'À la une' && (

         
//                  <FeaturedSection 
//                     employeeStories={employeeStories} 
//                     onUpdate={updateEmployeeStories} 
//                   />
            

        
       
//       )}
//     </section>
//   );
// }








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


import { CustomTab } from '@/types/tab';
import TabManager from './TabManager';
import CustomTabView from './CustomTabView';
import FeaturedSection from './FeaturedSection';

export default function Navigation() {
  const [activeTab, setActiveTab] = useState<'Profil' | 'Jobs' | 'Métiers' | 'RSE' | 'À la une' | string>('Profil');
  const [customTabs, setCustomTabs] = useState<CustomTab[]>([]);

  // ... (autres états existants)
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




  const addNewTab = (tabData: Omit<CustomTab, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTab: CustomTab = {
      id: `custom-${Date.now()}`,
      ...tabData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setCustomTabs([...customTabs, newTab]);
    setActiveTab(newTab.id);
  };

  const updateTab = (tabId: string, updates: Partial<CustomTab>) => {
    setCustomTabs(customTabs.map(tab => 
      tab.id === tabId 
        ? { ...tab, ...updates, updatedAt: new Date() }
        : tab
    ));
  };

  const deleteTab = (tabId: string) => {
    const updatedTabs = customTabs.filter(tab => tab.id !== tabId);
    setCustomTabs(updatedTabs);
    
    if (activeTab === tabId) {
      setActiveTab('Profil');
    }
  };

  return (
    <section className="bg-white border-b flex-1 flex flex-col min-h-0">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 shrink-0 overflow-x-auto">
        {/* Onglets fixes */}
        {['Profil', 'Jobs', 'Métiers', 'RSE', 'À la une'].map((tabName) => (
          <button
            key={tabName}
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === tabName
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tabName}
          </button>
        ))}

        {/* Onglets personnalisés */}
        {customTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap flex items-center gap-2 group relative ${
              activeTab === tab.id
                ? 'border-b-2 border-green-600 text-green-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}

        {/* Bouton pour ajouter un nouvel onglet */}
        <TabManager onSave={addNewTab} mode="create">
          <button
            className="px-4 py-2 font-medium text-sm whitespace-nowrap text-gray-400 hover:text-gray-600 border border-dashed border-gray-300 hover:border-gray-400 mx-2 rounded flex items-center gap-2"
            title="Ajouter un onglet"
          >
            <span>+</span>
            <span>Ajouter</span>
          </button>
        </TabManager>
      </div>

      {/* Tab Content */}
      <div className="flex-1 min-h-0 overflow-auto ">
        {/* Contenu des onglets fixes */}
        {activeTab === 'Profil' && (
          <div className="w-full max-w-none p-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
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

        {activeTab === 'Jobs' && <JobsPage />}
        {activeTab === 'Métiers' && <MetiersPage />}
        {activeTab === 'RSE' && <RSEPage />}
        {activeTab === 'À la une' && (
          <FeaturedSection 
            employeeStories={employeeStories} 
            onUpdate={updateEmployeeStories} 
          />
        )}

        {/* Contenu des onglets personnalisés */}
        {customTabs.map((tab) => 
          activeTab === tab.id && (
            <CustomTabView
              key={tab.id}
              tab={tab}
              onUpdate={updateTab}
              onDelete={deleteTab}
            />
          )
        )}
      </div>
    </section>
  );
}