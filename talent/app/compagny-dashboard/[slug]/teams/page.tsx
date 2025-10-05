// src/app/company/dashboard/teams/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  RiSearchLine, 
  RiAddLine, 
  RiGroupLine, 
  RiUserLine, 
  RiMedalLine,
  RiArrowRightLine 
} from '@remixicon/react';

// Components
import TeamStats from './_components/TeamStats';
import CreateTeamModal from './_components/CreateTeamModal';
import Link from 'next/link';

// Types
interface Team {
  id: string;
  name: string;
  description: string;
  manager: {
    id: string;
    name: string;
    avatar: string;
  };
  members: number;
  projects: number;
  performance: number;
  status: 'active' | 'inactive' | 'archived';
  color: string;
}

// Données mock
const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Équipe Développement',
    description: 'Développement des produits et features principales',
    manager: {
      id: '1',
      name: 'Jean Dupont',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    members: 8,
    projects: 3,
    performance: 92,
    status: 'active',
    color: '#3B82F6'
  },
  {
    id: '2',
    name: 'Équipe Design',
    description: 'Design UX/UI et expérience utilisateur',
    manager: {
      id: '2',
      name: 'Sophie Martin',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    members: 5,
    projects: 4,
    performance: 88,
    status: 'active',
    color: '#8B5CF6'
  },
  {
    id: '3',
    name: 'Équipe Data Science',
    description: 'Analyse données et machine learning',
    manager: {
      id: '3',
      name: 'Thomas Lambert',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    members: 6,
    projects: 2,
    performance: 95,
    status: 'active',
    color: '#10B981'
  }
];

const companyStats = {
  totalTeams: 8,
  totalMembers: 45,
  activeProjects: 15,
  averagePerformance: 89
};

export default function TeamsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredTeams = mockTeams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.description.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter(team => 
    activeTab === 'all' || team.status === activeTab
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Équipes</h1>
              <p className="text-gray-600 mt-2">
                Gérez vos équipes et leurs performances
              </p>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <RiAddLine className="h-4 w-4 mr-2" />
              Nouvelle équipe
            </Button>
          </div>

          {/* Stats */}
          <TeamStats stats={companyStats} />
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Barre de recherche et filtres */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher une équipe..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">Toutes</TabsTrigger>
                  <TabsTrigger value="active">Actives</TabsTrigger>
                  <TabsTrigger value="inactive">Inactives</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Grille des équipes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map(team => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>

        {filteredTeams.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <RiGroupLine className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aucune équipe trouvée</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery ? 'Essayez de modifier vos critères de recherche' : 'Créez votre première équipe pour commencer'}
              </p>
              <Button onClick={() => setIsCreateModalOpen(true)}>
                Créer une équipe
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modal de création d'équipe */}
      <CreateTeamModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={(teamData) => {
          console.log('Nouvelle équipe:', teamData);
          setIsCreateModalOpen(false);
        }}
      />
    </div>
  );
}

// Composant Carte d'Équipe
function TeamCard({ team }: { team: Team }) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer group">
      <CardContent className="p-6">
        {/* En-tête */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: team.color }}
              />
              <h3 className="font-semibold text-lg">{team.name}</h3>
            </div>
            <p className="text-gray-600 text-sm">{team.description}</p>
          </div>
          <Badge variant={
            team.status === 'active' ? 'default' : 
            team.status === 'inactive' ? 'secondary' : 'outline'
          }>
            {team.status === 'active' ? 'Active' : 'Inactive'}
          </Badge>
        </div>

        {/* Manager */}
        <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
          <img
            src={team.manager.avatar}
            alt={team.manager.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-sm font-medium">{team.manager.name}</p>
            <p className="text-xs text-gray-500">Manager</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <RiUserLine className="h-4 w-4 text-gray-400" />
              <span className="font-semibold">{team.members}</span>
            </div>
            <p className="text-xs text-gray-500">Membres</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <RiMedalLine className="h-4 w-4 text-gray-400" />
              <span className="font-semibold">{team.performance}%</span>
            </div>
            <p className="text-xs text-gray-500">Performance</p>
          </div>
          <div className="text-center">
            <div className="font-semibold">{team.projects}</div>
            <p className="text-xs text-gray-500">Projets</p>
          </div>
        </div>

        {/* Action */}
        <Link href={`/compagny-dashboard/teams/123`}>
        <Button variant="outline" className="w-full group-hover:bg-gray-50">
          Voir l'équipe
          <RiArrowRightLine className="h-4 w-4 ml-2" />
        </Button>
        </Link>
      </CardContent>
    </Card>
  );
}