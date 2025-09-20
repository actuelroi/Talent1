// src/app/candidate/components/CandidateSidebar.tsx
'use client';

import {
  RiUserLine,
  RiSettingsLine,
  RiFileListLine,
  RiBriefcaseLine,
  RiMessageLine,
  RiLightbulbLine,
  RiCompassDiscoverLine,
  RiDashboardLine,
  RiBookOpenLine
} from "@remixicon/react";

interface CandidateSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: 'profile', label: 'Mon Profil', icon: RiUserLine },
  { id: 'account', label: 'Informations Compte', icon: RiSettingsLine },
  { id: 'cv', label: 'CV & Lettres', icon: RiFileListLine },
  { id: 'applications', label: 'Mes Candidatures', icon: RiBriefcaseLine },
  { id: 'messages', label: 'Messages', icon: RiMessageLine, badge: 3 },
  { id: 'suggestions', label: 'Offres Suggestées', icon: RiLightbulbLine },
  { id: 'discover', label: 'Découvrir', icon: RiCompassDiscoverLine },
  { id: 'courses', label: 'Formations', icon: RiBookOpenLine }, // New item
];

export default function CandidateSidebar({ activeTab, onTabChange }: CandidateSidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Espace Candidat</h2>
      </div>
      
      <nav className="mt-6">
        <ul className="space-y-1 px-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-100 text-blue-600'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-900">Profile Completion</h3>
          <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className="text-xs text-blue-600 mt-1">75% complété</p>
        </div>
      </div>
    </aside>
  );
}