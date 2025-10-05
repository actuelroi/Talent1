// src/app/company/dashboard/teams/[teamId]/page.tsx
'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Components
import TeamHeader from '../_components/TeamHeader';
import TeamMembers from '../_components/TeamMembers';
import TeamProjects from '../_components/TeamProjects';
import TeamPerformance from '../_components/TeamPerformance';
import TeamActivity from '../_components/TeamActivity';

// Données mock
const mockTeam = {
  id: '1',
  name: 'Équipe Développement',
  description: 'Développement des produits et features principales',
  manager: {
    id: '1',
    name: 'Jean Dupont',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    email: 'jean.dupont@company.com',
    role: 'Tech Lead'
  },
  members: [
    {
      id: '1',
      name: 'Marie Curie',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      role: 'Développeuse Fullstack',
      email: 'marie.curie@company.com',
      status: 'active',
      performance: 95,
      projects: 3,
      joinDate: '2023-01-15'
    },
    {
      id: '2',
      name: 'Pierre Durand',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      role: 'DevOps Engineer',
      email: 'pierre.durand@company.com',
      status: 'active',
      performance: 88,
      projects: 2,
      joinDate: '2023-03-20'
    }
  ],
  projects: [
    {
      id: '1',
      name: 'Plateforme SaaS',
      description: 'Nouvelle plateforme de gestion',
      progress: 75,
      deadline: '2024-03-15',
      status: 'in-progress',
      members: 4
    },
    {
      id: '2',
      name: 'API Restructure',
      description: 'Refonte de l\'architecture API',
      progress: 30,
      deadline: '2024-04-30',
      status: 'in-progress',
      members: 3
    }
  ],
  performance: {
    current: 92,
    trend: 'up',
    metrics: {
      productivity: 89,
      quality: 94,
      collaboration: 91
    }
  }
};

export default function TeamDetailPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <TeamHeader team={mockTeam} />
      
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="members">Membres</TabsTrigger>
            <TabsTrigger value="projects">Projets</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="activity">Activité</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <TeamPerformance performance={mockTeam.performance} />
              </div>
              <div>
                <TeamActivity teamId={mockTeam.id} />
              </div>
            </div>
            <TeamProjects projects={mockTeam.projects} />
          </TabsContent>

          <TabsContent value="members">
            <TeamMembers 
              members={mockTeam.members} 
              teamId={mockTeam.id}
            />
          </TabsContent>

          <TabsContent value="projects">
            <TeamProjects projects={mockTeam.projects} />
          </TabsContent>

          <TabsContent value="performance">
            <TeamPerformance performance={mockTeam.performance} detailed />
          </TabsContent>

          <TabsContent value="activity">
            <TeamActivity teamId={mockTeam.id} detailed />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}