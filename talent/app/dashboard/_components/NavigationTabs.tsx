// src/app/company/dashboard/components/NavigationTabs.tsx
'use client';

import { Button } from '@/components/ui/button';

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'profile', label: 'Profil' },
  { id: 'jobs', label: 'Jobs' },
  { id: 'featured', label: 'À la une' },
  { id: 'diversity', label: 'Diversité' },
  { id: 'rse', label: 'RSE' }
];

export default function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}