// src/app/company/[id]/jobs/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  RiSearchLine,
  RiMapPinLine,
  RiBriefcaseLine,
  RiFilterLine,
  RiArrowDownSLine,
  RiTimeLine,
  RiBookmarkLine,
  RiShareLine,
  RiEyeLine,
} from '@remixicon/react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

// Mock job data
const jobs = [
  {
    id: 1,
    title: "Technicien(ne) maintenance scientifique - Campus de Chevilly (H/F)",
    type: "CDI",
    location: "Chevilly-Larue",
    remote: "Télétravail fréquent",
    timeAgo: "il y a 16 heures",
    salary: "Non spécifié",
    department: "Maintenance",
    experience: "2-5 ans",
    tags: ["Maintenance", "Scientifique", "CDI"]
  },
  {
    id: 2,
    title: "Tax Activation Lead Record to Report - NEO Program",
    type: "CDI",
    location: "Saint-Ouen",
    remote: "Télétravail fréquent",
    timeAgo: "il y a 3 jours",
    salary: "Non spécifié",
    department: "Finance",
    experience: "5-8 ans",
    tags: ["Finance", "Tax", "CDI"]
  },
  {
    id: 3,
    title: "STAGE - 6 MOIS - SUPPLY CHAIN DISTRIBUTION PHYSIQUE - MASTER 1/2 - 1700€ mensuel",
    type: "Stage",
    location: "Goussainville",
    remote: "Télétravail fréquent",
    timeAgo: "il y a 3 jours",
    salary: "1700€/mois",
    department: "Supply Chain",
    experience: "Étudiant",
    tags: ["Stage", "Supply Chain", "Master"]
  },
  {
    id: 4,
    title: "[Compensation & Benefits / Rewards] - 6-month internship - January 2026",
    type: "Stage",
    location: "Clichy",
    remote: "Télétravail fréquent",
    timeAgo: "il y a 3 jours",
    salary: "1700€/mois",
    department: "Ressources Humaines",
    experience: "Étudiant",
    tags: ["Stage", "RH", "Compensation"]
  },
  {
    id: 5,
    title: "IT Business Analyst - WMS Manhattan Active",
    type: "CDI",
    location: "Clichy",
    remote: "Télétravail fréquent",
    timeAgo: "il y a 3 jours",
    salary: "Non spécifié",
    department: "IT",
    experience: "3-6 ans",
    tags: ["IT", "Business Analyst", "CDI"]
  },
  {
    id: 6,
    title: "6-month Internship - Assurance Qualité - JANVIER 2026",
    type: "Stage",
    location: "Aulnay-sous-Bois",
    remote: "Télétravail fréquent",
    timeAgo: "il y a 4 jours",
    salary: "1700€/mois",
    department: "Qualité",
    experience: "Étudiant",
    tags: ["Stage", "Qualité", "Assurance"]
  },
  {
    id: 7,
    title: "STAGE 6 MOIS - Développement d'ingrédients cosmétiques innovants",
    type: "Stage",
    location: "Paris",
    remote: "Télétravail fréquent",
    timeAgo: "il y a 4 jours",
    salary: "1700€/mois",
    department: "R&D",
    experience: "Étudiant",
    tags: ["Stage", "R&D", "Cosmétique"]
  },
  {
    id: 8,
    title: "STAGE 6 MOIS - MARKETING - DERMATOLOGICAL BEAUTY DIVISION",
    type: "Stage",
    location: "Levallois-Perret",
    remote: "Télétravail fréquent",
    timeAgo: "il y a 5 jours",
    salary: "1700€/mois",
    department: "Marketing",
    experience: "Étudiant",
    tags: ["Stage", "Marketing", "Beauté"]
  },
  {
    id: 9,
    title: "CDI - Technicien(ne) de recherche en analyse physicochimique",
    type: "CDI",
    location: "Aulnay-sous-Bois",
    remote: "Télétravail fréquent",
    timeAgo: "il y a 5 jours",
    salary: "Non spécifié",
    department: "R&D",
    experience: "2-4 ans",
    tags: ["CDI", "Recherche", "Analyse"]
  },
  {
    id: 10,
    title: "Cyberdefense Project Manager",
    type: "CDI",
    location: "Saint-Ouen",
    remote: "Télétravail fréquent",
    timeAgo: "il y a 7 jours",
    salary: "Non spécifié",
    department: "Cybersécurité",
    experience: "5-8 ans",
    tags: ["CDI", "Cybersécurité", "Management"]
  }
];

const jobTypes = ["CDI", "Stage", "CDD", "Alternance"];
const locations = ["Paris", "Lyon", "Marseille", "Toulouse", "Nantes", "Bordeaux"];
const departments = ["Marketing", "R&D", "IT", "Finance", "RH", "Production", "Qualité"];
const remoteOptions = ["Télétravail total", "Télétravail fréquent", "Télétravail occasionnel", "Présentiel"];

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedRemote, setSelectedRemote] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = !selectedLocation || job.location.includes(selectedLocation);
    const matchesType = !selectedType || job.type === selectedType;
    const matchesRemote = !selectedRemote || job.remote === selectedRemote;
    const matchesDepartment = selectedDepartments.length === 0 || selectedDepartments.includes(job.department);

    return matchesSearch && matchesLocation && matchesType && matchesRemote && matchesDepartment;
  });

  const toggleDepartment = (department: string) => {
    setSelectedDepartments(prev =>
      prev.includes(department)
        ? prev.filter(d => d !== department)
        : [...prev, department]
    );
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Nos offres</h1>
              <p className="text-gray-600 mt-2">{filteredJobs.length} offres d'emploi</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Poster une offre
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            {/* Main Search */}
            <div className="relative">
              <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Recherchez par job, mot-clé ou entreprise"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-base"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-4">
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-40">
                  <RiMapPinLine className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="N'importe où" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">N'importe où</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <RiBriefcaseLine className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Type de job" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  {jobTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedRemote} onValueChange={setSelectedRemote}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Télétravail" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Télétravail</SelectItem>
                  {remoteOptions.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <RiFilterLine className="h-4 w-4" />
                Tous les filtres
                {selectedDepartments.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {selectedDepartments.length}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Départements</h4>
                      <div className="space-y-2">
                        {departments.map(dept => (
                          <div key={dept} className="flex items-center space-x-2">
                            <Checkbox
                              id={dept}
                              checked={selectedDepartments.includes(dept)}
                              onCheckedChange={() => toggleDepartment(dept)}
                            />
                            <Label htmlFor={dept} className="text-sm">{dept}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Expérience</h4>
                      <div className="space-y-2">
                        {["Débutant", "1-3 ans", "3-5 ans", "5-8 ans", "8+ ans"].map(exp => (
                          <div key={exp} className="flex items-center space-x-2">
                            <Checkbox id={`exp-${exp}`} />
                            <Label htmlFor={`exp-${exp}`} className="text-sm">{exp}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Salaire</h4>
                      <div className="space-y-2">
                        {["30-40k", "40-50k", "50-60k", "60-70k", "70k+"].map(salary => (
                          <div key={salary} className="flex items-center space-x-2">
                            <Checkbox id={`salary-${salary}`} />
                            <Label htmlFor={`salary-${salary}`} className="text-sm">{salary}€</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Date de publication</h4>
                      <div className="space-y-2">
                        {["24h", "7 jours", "30 jours", "3 mois"].map(date => (
                          <div key={date} className="flex items-center space-x-2">
                            <Checkbox id={`date-${date}`} />
                            <Label htmlFor={`date-${date}`} className="text-sm">Il y a {date}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{filteredJobs.length} jobs</span>
            <Select defaultValue="pertinence">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pertinence">Pertinence</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="salaire">Salaire</SelectItem>
                <SelectItem value="localisation">Localisation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(page => (
              <Button
                key={page}
                variant={page === 1 ? "default" : "outline"}
                className="w-10 h-10 p-0"
              >
                {page}
              </Button>
            ))}
            <Button variant="outline" className="flex items-center gap-2">
              Suivant
              <RiArrowDownSLine className="h-4 w-4 rotate-90" />
            </Button>
          </div>
        </div>

        {/* Feedback Section */}
        <Card className="mt-12 bg-blue-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Êtes-vous satisfait de votre expérience de recherche ?</h3>
            <p className="text-gray-600 mb-4">
              Vos feedbacks nous permettent d'améliorer l'expérience Crafted.is
            </p>
            <Button variant="outline" className="border-blue-300 text-blue-700">
              Donner mon avis
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function JobCard({ job }: { job: typeof jobs[0] }) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600">
              {job.title}
            </h3>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {job.type}
              </Badge>
              <div className="flex items-center gap-1">
                <RiMapPinLine className="h-4 w-4" />
                {job.location}
              </div>
              <div className="flex items-center gap-1">
                <RiBriefcaseLine className="h-4 w-4" />
                {job.department}
              </div>
              <div className="flex items-center gap-1">
                <RiTimeLine className="h-4 w-4" />
                {job.timeAgo}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                {job.remote}
              </Badge>
              {job.salary !== "Non spécifié" && (
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {job.salary}
                </Badge>
              )}
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                {job.experience}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-1">
              {job.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-2 ml-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setIsSaved(!isSaved);
              }}
              className={`h-8 w-8 ${isSaved ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <RiBookmarkLine className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
              <RiShareLine className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <RiEyeLine className="h-4 w-4" />
            Voir l'offre
          </Button>
          <span className="text-xs text-gray-500">Postée {job.timeAgo}</span>
        </div>
      </CardContent>
    </Card>
  );
}