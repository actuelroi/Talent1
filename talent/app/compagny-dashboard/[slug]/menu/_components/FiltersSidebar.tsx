// src/app/companies/l-oreal/nos-offres/components/FiltersSidebar.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";

export default function FiltersSidebar() {
  const jobTypes = ["Stage", "CDI", "CDD / Temporaire"];
  const locations = ["Paris", "Clichy", "Levallois-Perret", "Aulnay", "Orléans", "Saint-Ouen", "Saint-Quentin", "Cambrai"];
  const professions = ["Marketing", "R&D", "Qualité", "Supply Chain", "RH", "IT", "Production", "Juridique"];

  return (
    <div className="lg:w-1/4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Filtres</h2>
            <Filter className="h-5 w-5 text-gray-500" />
          </div>

          {/* Search Input */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Recherchez par job, mot-clé ou entreprise"
                className="pl-10"
              />
            </div>
          </div>

          {/* Location Filter */}
          <div className="mb-6">
            <Label className="font-medium mb-2 block">Localisation</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="N'importe où" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location, index) => (
                  <SelectItem key={index} value={location.toLowerCase()}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Job Type Filter */}
          <div className="mb-6">
            <Label className="font-medium mb-2 block">Type de job</Label>
            <div className="space-y-2">
              {jobTypes.map((type, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`type-${index}`} />
                  <Label htmlFor={`type-${index}`} className="text-sm">{type}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Remote Work Filter */}
          <div className="mb-6">
            <Label className="font-medium mb-2 block">Télétravail</Label>
            <div className="flex items-center space-x-2">
              <Checkbox id="remote" />
              <Label htmlFor="remote" className="text-sm">Télétravail possible</Label>
            </div>
          </div>

          {/* Profession Filter */}
          <div className="mb-6">
            <Label className="font-medium mb-2 block">Professions</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Tous les filtres" />
              </SelectTrigger>
              <SelectContent>
                {professions.map((profession, index) => (
                  <SelectItem key={index} value={profession.toLowerCase()}>
                    {profession}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" className="w-full">
            Appliquer les filtres
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}