// src/app/company/components/DashboardSidebar.tsx
'use client';

import {
  RiDashboardLine,
  RiUserLine,
  RiFileListLine,
  RiStarLine,
  RiSettingsLine,
  RiTeamLine,
  RiCalendarLine,
  RiBarChart2Fill,
  RiEditLine
} from "@remixicon/react";

const menuItems = [
  { id: 'dashboard', label: 'Tableau de bord',href:'/dasboard', icon: RiDashboardLine },
  { id: 'profile', label: 'Profil entreprise', href:'/dasboard',icon: RiUserLine },
  { id: 'candidature', label: 'Candidature réçus',href:'/dasboard', icon: RiFileListLine },
  { id: 'jobs', label: 'Offres d\'emploi',href:'/dasboard', icon: RiFileListLine },
  { id: 'featured', label: 'À la une',href:'/dasboard', icon: RiStarLine },
  { id: 'team', label: 'Équipe',href:'/dasboard', icon: RiTeamLine },
  { id: 'analytics', label: 'Analytics',href:'/dasboard', icon:  RiBarChart2Fill },
  { id: 'calendar', label: 'Calendrier',href:'/dasboard', icon: RiCalendarLine },
  { id: 'settings', label: 'Paramètres',href:'/dasboard', icon: RiSettingsLine }
];

export default function DashboardSidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Espace entreprise</h2>
      </div>
      
      <nav className="mt-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => window.location.href = `${item.href}`}
              >
                <item.icon className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <RiEditLine className="h-4 w-4" />
          <span className="text-sm font-medium">Modifier le site</span>
        </button>
      </div>
    </aside>
  );
}