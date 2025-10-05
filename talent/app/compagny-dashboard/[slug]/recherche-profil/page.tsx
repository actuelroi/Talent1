// src/app/company/search/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RiSearchLine, RiUserLine, RiBookmarkLine, RiFilterLine } from '@remixicon/react';

// Components
import SearchFilters from './_components/SearchFilters';
import SearchResults from './_components/SearchResults';
import SearchStats from './_components/SearchStats';
import AdvancedSearch from './_components/AdvancedSearch';
import SavedSearches from './_components/SavedSearches';


interface Candidate {
  id: number;
  name: string;
  title: string;
  location: string;
  experience: string;
  education: string;
  skills: string[];
  availability: string;
  salary: string;
  match: number;
  lastActive: string;
  profileCompletion: number;
  languages: string[];
  status: string;
  image: string;
  saved?: boolean; // Ajoutez cette ligne pour rendre la propriété optionnelle
}

// Mock data
const initialCandidates = [
  {
    id: 1,
    name: "Marie Dubois",
    title: "Développeuse Full Stack Senior",
    location: "Paris, France",
    experience: "8 ans",
    education: "Master Informatique",
    skills: ["React", "Node.js", "TypeScript", "Python", "AWS", "Docker"],
    availability: "Disponible immédiatement",
    salary: "65-75k €",
    match: 95,
    lastActive: "Aujourd'hui",
    profileCompletion: 100,
    languages: ["Français", "Anglais"],
    status: "active",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Thomas Martin",
    title: "Data Scientist",
    location: "Lyon, France",
    experience: "5 ans",
    education: "PhD Machine Learning",
    skills: ["Python", "TensorFlow", "SQL", "Big Data", "MLOps"],
    availability: "2 semaines",
    salary: "55-65k €",
    match: 87,
    lastActive: "Il y a 2 jours",
    profileCompletion: 95,
    languages: ["Français", "Anglais", "Espagnol"],
    status: "active",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Sophie Lambert",
    title: "Product Manager",
    location: "Marseille, France",
    experience: "6 ans",
    education: "MBA Digital Marketing",
    skills: ["Product Strategy", "Agile", "UX Research", "Analytics", "Roadmapping"],
    availability: "1 mois",
    salary: "60-70k €",
    match: 92,
    lastActive: "Il y a 1 semaine",
    profileCompletion: 90,
    languages: ["Français", "Anglais"],
    status: "active",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "Alexandre Petit",
    title: "DevOps Engineer",
    location: "Toulouse, France",
    experience: "4 ans",
    education: "Ingénieur Informatique",
    skills: ["Kubernetes", "AWS", "Docker", "CI/CD", "Terraform"],
    availability: "Disponible immédiatement",
    salary: "50-60k €",
    match: 84,
    lastActive: "Aujourd'hui",
    profileCompletion: 85,
    languages: ["Français", "Anglais"],
    status: "active",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 5,
    name: "Camille Rousseau",
    title: "UX/UI Designer",
    location: "Bordeaux, France",
    experience: "7 ans",
    education: "Design Graphique",
    skills: ["Figma", "User Research", "Prototyping", "UI Design", "Design System"],
    availability: "3 semaines",
    salary: "45-55k €",
    match: 89,
    lastActive: "Il y a 3 jours",
    profileCompletion: 100,
    languages: ["Français", "Anglais", "Italien"],
    status: "active",
    image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 6,
    name: "Nicolas Blanc",
    title: "Cloud Architect",
    location: "Nantes, France",
    experience: "10 ans",
    education: "Master Cloud Computing",
    skills: ["AWS", "Azure", "Microservices", "Security", "Architecture"],
    availability: "1 mois",
    salary: "75-85k €",
    match: 96,
    lastActive: "Il y a 1 jour",
    profileCompletion: 100,
    languages: ["Français", "Anglais", "Allemand"],
    status: "active",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  }
];

const savedSearches = [
  {
    id: 1,
    name: "Développeurs Full Stack Paris",
    results: 45,
    lastSearch: "2024-01-15",
    filters: {
      skills: ["React", "Node.js"],
      location: "Paris",
      experience: "3+ ans"
    }
  },
  {
    id: 2,
    name: "Data Scientists Machine Learning",
    results: 23,
    lastSearch: "2024-01-10",
    filters: {
      skills: ["Python", "Machine Learning"],
      experience: "5+ ans"
    }
  }
];

export default function SearchPage() {
  const [candidates, setCandidates] = useState<Candidate[]>(
  initialCandidates.map(candidate => ({ ...candidate, saved: false }))
);
  const [searchQuery, setSearchQuery] = useState('');
  // Mettez à jour votre état filters initial
const [filters, setFilters] = useState({
  location: '',
  experience: '',
  skills: [] as string[],
  availability: '',
  salaryRange: '',
  education: '',
  languages: [] as string[],
  // Ajoutez les nouvelles propriétés pour AdvancedSearch
  customSkills: [] as string[],
  minMatchScore: 0,
  minProfileCompletion: 0,
  keywords: '',
  industry: '',
});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [savedSearchName, setSavedSearchName] = useState('');
  const [showSaveSearch, setShowSaveSearch] = useState(false);

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = searchQuery === '' || 
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.skills.some((skill: string) => skill.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLocation = !filters.location || candidate.location.includes(filters.location);
    const matchesExperience = !filters.experience || candidate.experience.includes(filters.experience);
    const matchesSkills = filters.skills.length === 0 || 
      filters.skills.every(skill => candidate.skills.includes(skill));
    const matchesAvailability = !filters.availability || candidate.availability.includes(filters.availability);

    return matchesSearch && matchesLocation && matchesExperience && matchesSkills && matchesAvailability;
  });

  const handleSaveSearch = () => {
    if (savedSearchName.trim()) {
      // Save search logic here
      setShowSaveSearch(false);
      setSavedSearchName('');
    }
  };

  const handleContactCandidate = (candidateId: number) => {
    // Contact logic here
    console.log('Contacting candidate:', candidateId);
  };

  const handleSaveCandidate = (candidateId: number) => {
    setCandidates(prev => prev.map(candidate => 
      candidate.id === candidateId 
        ? { ...candidate, saved: !candidate.saved }
        : candidate
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Rechercher des profils</h1>
              <p className="text-gray-600 mt-2">
                Trouvez les candidats parfaits pour vos postes
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                Grille
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('list')}
              >
                Liste
              </Button>
            </div>
          </div>

          {/* Main Search */}
          <div className="relative mb-6">
            <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher par compétence, titre de poste, localisation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <SearchStats candidates={filteredCandidates} />
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Filters */}
            <SearchFilters filters={filters} onFiltersChange={setFilters} />

            {/* Saved Searches */}
            <SavedSearches 
              searches={savedSearches}
              onLoadSearch={(search) => {
                setFilters(search.filters);
                setSearchQuery(search.name);
              }}
            />

            {/* Advanced Search Toggle */}
            <Card>
              <CardContent className="p-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-between"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                >
                  <span className="flex items-center gap-2">
                    <RiFilterLine className="h-4 w-4" />
                    Recherche avancée
                  </span>
                  <Badge variant="secondary">Beta</Badge>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Advanced Search */}
            {showAdvanced && (
              <AdvancedSearch 
                filters={filters}
                onFiltersChange={setFilters}
                onSaveSearch={() => setShowSaveSearch(true)}
              />
            )}

            {/* Search Results */}
            <SearchResults
              candidates={filteredCandidates}
              viewMode={viewMode}
              onContact={handleContactCandidate}
              onSave={handleSaveCandidate}
            />

            {/* Save Search Modal */}
            {showSaveSearch && (
              <Card className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <CardContent className="p-6 bg-white rounded-lg w-96">
                  <h3 className="text-lg font-semibold mb-4">Sauvegarder cette recherche</h3>
                  <input
                    type="text"
                    placeholder="Nom de la recherche"
                    value={savedSearchName}
                    onChange={(e) => setSavedSearchName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                  />
                  <div className="flex gap-3 justify-end">
                    <Button variant="outline" onClick={() => setShowSaveSearch(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleSaveSearch}>
                      Sauvegarder
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}