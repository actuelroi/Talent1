// src/app/company/search/components/SearchFilters.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RiMapPinLine, RiTimeLine, RiMoneyEuroCircleLine } from '@remixicon/react';

interface SearchFiltersProps {
  filters: any;
  onFiltersChange: (filters: any) => void;
}

const locations = ["Paris", "Lyon", "Marseille", "Toulouse", "Nantes", "Bordeaux", "Lille", "Strasbourg"];
const experienceLevels = ["Débutant", "1-3 ans", "3-5 ans", "5-8 ans", "8+ ans"];
const availabilityOptions = ["Disponible immédiatement", "1 semaine", "2 semaines", "1 mois", "2 mois+"];
const salaryRanges = ["30-40k €", "40-50k €", "50-60k €", "60-70k €", "70-80k €", "80k+ €"];
const skills = ["React", "Node.js", "Python", "Java", "AWS", "Docker", "Kubernetes", "Machine Learning", "Data Science", "UX/UI"];

export default function SearchFilters({ filters, onFiltersChange }: SearchFiltersProps) {
  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleSkill = (skill: string) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter((s: string) => s !== skill)
      : [...filters.skills, skill];
    updateFilter('skills', newSkills);
  };

  const clearFilters = () => {
    onFiltersChange({
      location: '',
      experience: '',
      skills: [],
      availability: '',
      salaryRange: '',
      education: '',
      languages: [],
    });
  };

  const activeFilterCount = Object.values(filters).filter(value => 
    Array.isArray(value) ? value.length > 0 : value !== ''
  ).length;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Filtres</h3>
          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Réinitialiser
            </Button>
          )}
        </div>

        <div className="space-y-6">
          {/* Location */}
          <div>
            <Label className="flex items-center gap-2 mb-2">
              <RiMapPinLine className="h-4 w-4" />
              Localisation
            </Label>
            <Select value={filters.location} onValueChange={(value) => updateFilter('location', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les localisations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Experience */}
          <div>
            <Label>Expérience</Label>
            <Select value={filters.experience} onValueChange={(value) => updateFilter('experience', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Tous les niveaux" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                {experienceLevels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Availability */}
          <div>
            <Label className="flex items-center gap-2 mb-2">
              <RiTimeLine className="h-4 w-4" />
              Disponibilité
            </Label>
            <Select value={filters.availability} onValueChange={(value) => updateFilter('availability', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les disponibilités" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                {availabilityOptions.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Salary */}
          <div>
            <Label className="flex items-center gap-2 mb-2">
              <RiMoneyEuroCircleLine className="h-4 w-4" />
              Salaire attendu
            </Label>
            <Select value={filters.salaryRange} onValueChange={(value) => updateFilter('salaryRange', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les fourchettes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                {salaryRanges.map(range => (
                  <SelectItem key={range} value={range}>{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Skills */}
          <div>
            <Label>Compétences techniques</Label>
            <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
              {skills.map(skill => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox
                    id={`skill-${skill}`}
                    checked={filters.skills.includes(skill)}
                    onCheckedChange={() => toggleSkill(skill)}
                  />
                  <Label htmlFor={`skill-${skill}`} className="text-sm font-normal">
                    {skill}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Active Filters Badge */}
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="w-full justify-center">
              {activeFilterCount} filtre(s) actif(s)
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}