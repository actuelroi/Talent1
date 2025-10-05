// src/app/company/search/_components/AdvancedSearch.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  RiFilterLine,
  RiSaveLine,
  RiCloseLine,
  RiAddLine,
  RiSubtractLine,
} from '@remixicon/react';

interface AdvancedSearchProps {
  filters: any;
  onFiltersChange: (filters: any) => void;
  onSaveSearch: () => void;
}

const educationLevels = [
  "Baccalauréat",
  "BTS/DUT",
  "Licence",
  "Master",
  "PhD/Doctorat",
  "École d'ingénieur",
  "École de commerce"
];

const languageLevels = ["Débutant", "Intermédiaire", "Avancé", "Bilingue"];
const languages = ["Français", "Anglais", "Espagnol", "Allemand", "Italien", "Chinois", "Arabe"];
const industries = ["Tech", "Finance", "Santé", "Éducation", "Commerce", "Industrie", "Services"];

export default function AdvancedSearch({ filters, onFiltersChange, onSaveSearch }: AdvancedSearchProps) {
  // Assurer que toutes les propriétés nécessaires existent
  const safeFilters = {
    customSkills: [],
    minMatchScore: 0,
    minProfileCompletion: 0,
    keywords: '',
    education: '',
    industry: '',
    languages: [],
    ...filters // Surcharger avec les valeurs existantes
  };

  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...safeFilters, [key]: value });
  };

  const toggleLanguage = (lang: string, level: string) => {
    const currentLang = safeFilters.languages.find((l: any) => l.language === lang);
    const newLanguages = currentLang
      ? safeFilters.languages.filter((l: any) => l.language !== lang)
      : [...safeFilters.languages, { language: lang, level }];
    
    updateFilter('languages', newLanguages);
  };

  const updateLanguageLevel = (lang: string, level: string) => {
    const newLanguages = safeFilters.languages.map((l: any) =>
      l.language === lang ? { ...l, level } : l
    );
    updateFilter('languages', newLanguages);
  };

  const addSkill = () => {
    const newSkill = prompt("Ajouter une compétence:");
    if (newSkill && !safeFilters.customSkills.includes(newSkill)) {
      updateFilter('customSkills', [...safeFilters.customSkills, newSkill]);
    }
  };

  const removeSkill = (skill: string) => {
    updateFilter('customSkills', safeFilters.customSkills.filter((s: string) => s !== skill));
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <RiFilterLine className="h-5 w-5" />
            Recherche avancée
          </h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onSaveSearch}>
              <RiSaveLine className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Education */}
          <div>
            <Label>Niveau d'éducation</Label>
            <Select value={safeFilters.education} onValueChange={(value) => updateFilter('education', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Tous les niveaux" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                {educationLevels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Industry */}
          <div>
            <Label>Secteur d'activité</Label>
            <Select value={safeFilters.industry} onValueChange={(value) => updateFilter('industry', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Tous les secteurs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Minimum Match Score */}
          <div>
            <Label>Score de match minimum: {safeFilters.minMatchScore}%</Label>
            <Slider
              value={[safeFilters.minMatchScore]}
              onValueChange={([value]) => updateFilter('minMatchScore', value)}
              max={100}
              step={5}
              className="mt-2"
            />
          </div>

          {/* Profile Completion */}
          <div>
            <Label>Complétion du profil minimum: {safeFilters.minProfileCompletion}%</Label>
            <Slider
              value={[safeFilters.minProfileCompletion]}
              onValueChange={([value]) => updateFilter('minProfileCompletion', value)}
              max={100}
              step={5}
              className="mt-2"
            />
          </div>

          {/* Languages */}
          <div className="md:col-span-2">
            <Label>Langues</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {languages.map(lang => {
                const langConfig = safeFilters.languages.find((l: any) => l.language === lang);
                return (
                  <div key={lang} className="flex items-center gap-3">
                    <Checkbox
                      checked={!!langConfig}
                      onCheckedChange={() => toggleLanguage(lang, langConfig?.level || 'Intermédiaire')}
                    />
                    <Label className="flex-1">{lang}</Label>
                    {langConfig && (
                      <Select
                        value={langConfig.level}
                        onValueChange={(level) => updateLanguageLevel(lang, level)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {languageLevels.map(level => (
                            <SelectItem key={level} value={level}>{level}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom Skills */}
          <div className="md:col-span-2">
            <Label>Compétences personnalisées</Label>
            <div className="flex flex-wrap gap-2 mt-2 mb-3">
              {safeFilters.customSkills.map((skill: string, index: number) => (
                <div key={index} className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="hover:text-blue-600"
                  >
                    <RiCloseLine className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={addSkill}>
              <RiAddLine className="h-4 w-4 mr-2" />
              Ajouter une compétence
            </Button>
          </div>

          {/* Keywords */}
          <div className="md:col-span-2">
            <Label>Mots-clés spécifiques</Label>
            <Input
              placeholder="Rechercher des mots-clés spécifiques dans les profils..."
              value={safeFilters.keywords}
              onChange={(e) => updateFilter('keywords', e.target.value)}
              className="mt-2"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}