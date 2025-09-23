// src/app/company/jobs/components/JobFilters.tsx
'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import {
  RiSearchLine,
  RiMapPinLine,
  RiBriefcaseLine,
  RiFilterLine,
} from '@remixicon/react';
import { useState } from 'react';

interface JobFiltersProps {
  filters: any;
  onFiltersChange: (filters: any) => void;
}

const jobTypes = ["CDI", "Stage", "CDD", "Alternance"];
const locations = ["Paris", "Lyon", "Marseille", "Toulouse", "Nantes", "Bordeaux"];
const departments = ["Marketing", "R&D", "IT", "Finance", "RH", "Production", "Qualité"];
const remoteOptions = ["Télétravail total", "Télétravail fréquent", "Télétravail occasionnel", "Présentiel"];
const statusOptions = ["Actif", "Brouillon", "Expiré"];

export default function JobFilters({ filters, onFiltersChange }: JobFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleDepartment = (department: string) => {
    const newDepartments = filters.departments.includes(department)
      ? filters.departments.filter((d: string) => d !== department)
      : [...filters.departments, department];
    updateFilter('departments', newDepartments);
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      location: '',
      type: '',
      remote: '',
      status: '',
      departments: [],
    });
  };

  const activeFilterCount = Object.values(filters).filter(value => 
    Array.isArray(value) ? value.length > 0 : value !== ''
  ).length - 1; // Subtract 1 for departments array

  return (
    <div className="space-y-4">
      {/* Main Search */}
      <div className="relative">
        <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          placeholder="Rechercher par titre, département ou mot-clé..."
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="pl-10 pr-4 py-3 text-base"
        />
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-4">
        <Select value={filters.location} onValueChange={(value) => updateFilter('location', value)}>
          <SelectTrigger className="w-40">
            <RiMapPinLine className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Localisation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes</SelectItem>
            {locations.map(location => (
              <SelectItem key={location} value={location}>{location}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.type} onValueChange={(value) => updateFilter('type', value)}>
          <SelectTrigger className="w-40">
            <RiBriefcaseLine className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            {jobTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.remote} onValueChange={(value) => updateFilter('remote', value)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Mode de travail" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            {remoteOptions.map(option => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            {statusOptions.map(status => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2"
        >
          <RiFilterLine className="h-4 w-4" />
          Filtres avancés
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFilterCount}
            </Badge>
          )}
        </Button>

        {activeFilterCount > 0 && (
          <Button variant="ghost" onClick={clearFilters} className="text-blue-600">
            Réinitialiser
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
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
                        checked={filters.departments.includes(dept)}
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
                <h4 className="font-medium mb-3">Date</h4>
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
  );
}