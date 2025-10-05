

'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from '@/components/ui/select';

import {RiSearchLine,RiMapPinLine,RiBriefcaseLine,RiFilterLine,RiArrowDownSLine,RiTimeLine,RiBookmarkLine,RiShareLine,
  RiEyeLine,RiEditLine,RiDeleteBinLine,RiAddLine,RiSaveLine,RiCloseLine,} from '@remixicon/react';
  
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Types
interface Job {
  id: number;
  title: string;
  type: string;
  location: string;
  remote: string;
  timeAgo: string;
  salary: string;
  department: string;
  experience: string;
  tags: string[];
  description?: string;
  requirements?: string[];
  benefits?: string[];
}

const defaultJobs: Job[] = [
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
    tags: ["Maintenance", "Scientifique", "CDI"],
    description: "Description de l'offre...",
    requirements: ["Expérience en maintenance", "Connaissances scientifiques"],
    benefits: ["Mutuelle", "Télétravail"]
  },
  // ... autres jobs avec les mêmes propriétés étendues
];

const jobTypes = ["CDI", "Stage", "CDD", "Alternance", "Freelance"];
const locations = ["Paris", "Lyon", "Marseille", "Toulouse", "Nantes", "Bordeaux", "Chevilly-Larue", "Saint-Ouen", "Clichy", "Aulnay-sous-Bois", "Levallois-Perret", "Goussainville"];
const departments = ["Marketing", "R&D", "IT", "Finance", "RH", "Production", "Qualité", "Maintenance", "Supply Chain", "Cybersécurité"];
const remoteOptions = ["Télétravail total", "Télétravail fréquent", "Télétravail occasionnel", "Présentiel"];
const experienceLevels = ["Débutant", "1-3 ans", "3-5 ans", "5-8 ans", "8+ ans", "Étudiant"];

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>(defaultJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedRemote, setSelectedRemote] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
   const params = useParams();
  const slug = params.slug as string;

  // Filtrage des jobs
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

  // CRUD Operations
  const createJob = (jobData: Omit<Job, 'id'>) => {
    const newJob: Job = {
      ...jobData,
      id: Math.max(0, ...jobs.map(j => j.id)) + 1,
      timeAgo: "À l'instant"
    };
    setJobs([newJob, ...jobs]);
    setIsCreateDialogOpen(false);
  };

  const updateJob = (id: number, updates: Partial<Job>) => {
    setJobs(jobs.map(job => job.id === id ? { ...job, ...updates } : job));
    setEditingJob(null);
  };

  const deleteJob = (id: number) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const duplicateJob = (job: Job) => {
    const newJob: Job = {
      ...job,
      id: Math.max(0, ...jobs.map(j => j.id)) + 1,
      title: `${job.title} (copie)`,
      timeAgo: "À l'instant"
    };
    setJobs([newJob, ...jobs]);
  };

  return (
   <div className="min-h-screen w-full bg-gray-50">
      {/* Header - UTILISER TOUTE LA LARGEUR */}
      <div className="bg-white border-b w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8"> {/* Padding responsive */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestion des offres d'emploi</h1>
              <p className="text-gray-600 mt-2">{filteredJobs.length} offres d'emploi publiées</p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button 
                variant={isEditing ? "default" : "outline"}
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2"
              >
                <RiEditLine className="h-4 w-4" />
                {isEditing ? 'Terminer édition' : 'Mode édition'}
              </Button>
              <Link href={`/compagny-dashboard/${slug}/new`}>
               <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                    <RiAddLine className="h-4 w-4" />
                    Créer une offre
                  </Button>
                  </Link>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4 w-full">
            {/* Main Search */}
            <div className="relative w-full">
              <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Recherchez par job, mot-clé ou département"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-base w-full"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-4 w-full">
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full sm:w-40">
                  <RiMapPinLine className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Localisation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les localisations</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full sm:w-40">
                  <RiBriefcaseLine className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Type de contrat" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  {jobTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedRemote} onValueChange={setSelectedRemote}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Mode de travail" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les modes</SelectItem>
                  {remoteOptions.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 w-full sm:w-auto"
              >
                <RiFilterLine className="h-4 w-4" />
                Filtres avancés
                {selectedDepartments.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {selectedDepartments.length}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <Card className="w-full">
                <CardContent className="p-4 w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                    <div className="col-span-1">
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
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Job Listings - UTILISER TOUTE LA LARGEUR */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6 w-full">
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{filteredJobs.length} offres</span>
          </div>
        </div>

        <div className="space-y-4 w-full">
          {filteredJobs.map(job => (
            <EditableJobCard 
              key={job.id} 
              job={job} 
              isEditing={isEditing}
              onEdit={setEditingJob}
              onUpdate={updateJob}
              onDelete={deleteJob}
              onDuplicate={duplicateJob}
            />
          ))}
        </div>

      </div>
    </div>
  );
}


// Composant de carte d'offre éditable
function EditableJobCard({ 
  job, 
  isEditing, 
  onEdit, 
  onUpdate, 
  onDelete, 
  onDuplicate 
}: { 
  job: Job;
  isEditing: boolean;
  onEdit: (job: Job) => void;
  onUpdate: (id: number, updates: Partial<Job>) => void;
  onDelete: (id: number) => void;
  onDuplicate: (job: Job) => void;
}) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            {isEditing ? (
              <Input
                value={job.title}
                onChange={(e) => onUpdate(job.id, { title: e.target.value })}
                className="text-lg font-semibold mb-2"
              />
            ) : (
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {job.title}
              </h3>
            )}
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
              {isEditing ? (
                <>
                  <Select value={job.type} onValueChange={(value) => onUpdate(job.id, { type: value })}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={job.location} onValueChange={(value) => onUpdate(job.id, { location: value })}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              ) : (
                <>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {job.type}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <RiMapPinLine className="h-4 w-4" />
                    {job.location}
                  </div>
                </>
              )}
              
              <div className="flex items-center gap-1">
                <RiBriefcaseLine className="h-4 w-4" />
                {isEditing ? (
                  <Select value={job.department} onValueChange={(value) => onUpdate(job.id, { department: value })}>
                    <SelectTrigger className="w-28">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  job.department
                )}
              </div>
              
              <div className="flex items-center gap-1">
                <RiTimeLine className="h-4 w-4" />
                {job.timeAgo}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {isEditing ? (
                <>
                  <Select value={job.remote} onValueChange={(value) => onUpdate(job.id, { remote: value })}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {remoteOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Input
                    value={job.salary}
                    onChange={(e) => onUpdate(job.id, { salary: e.target.value })}
                    placeholder="Salaire"
                    className="w-32"
                  />
                </>
              ) : (
                <>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                    {job.remote}
                  </Badge>
                  {job.salary !== "Non spécifié" && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      {job.salary}
                    </Badge>
                  )}
                </>
              )}
              
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                {isEditing ? (
                  <Select value={job.experience} onValueChange={(value) => onUpdate(job.id, { experience: value })}>
                    <SelectTrigger className="w-28">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  job.experience
                )}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-1">
              {job.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-2 ml-4">
            {isEditing ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(job)}
                  className="h-8 w-8 text-blue-600"
                  title="Modifier en détail"
                >
                  <RiEditLine className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDuplicate(job)}
                  className="h-8 w-8 text-green-600"
                  title="Dupliquer"
                >
                  <RiAddLine className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(job.id)}
                  className="h-8 w-8 text-red-600"
                  title="Supprimer"
                >
                  <RiDeleteBinLine className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
           <RiEditLine className="h-4 w-4" />
            Voir l'offre
          </Button>
          <span className="text-xs text-gray-500">Postée {job.timeAgo}</span>
        </div>
      </CardContent>
    </Card>
  );
}