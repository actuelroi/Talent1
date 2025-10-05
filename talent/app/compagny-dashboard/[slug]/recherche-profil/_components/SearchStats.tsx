// src/app/company/search/_components/SearchStats.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  RiUserLine,
  RiMapPinLine,
  RiTimeLine,
  RiStarLine,
  RiTreeLine,
  
} from '@remixicon/react';

interface SearchStatsProps {
  candidates: any[];
}

export default function SearchStats({ candidates }: SearchStatsProps) {
  // Fonction pour extraire les années d'expérience d'une chaîne
  const extractYears = (expString: string): number => {
    if (expString.includes('1-3')) return 2;
    if (expString.includes('3-5')) return 4;
    if (expString.includes('5-8')) return 6.5;
    if (expString.includes('8+')) return 10;
    
    const yearsMatch = expString.match(/(\d+)\s*ans/);
    return yearsMatch ? parseInt(yearsMatch[1]) : 0;
  };

  const stats = {
    total: candidates.length,
    highMatch: candidates.filter(c => c.match >= 90).length,
    availableNow: candidates.filter(c => c.availability === 'Disponible immédiatement').length,
    averageMatch: candidates.length > 0 
      ? Math.round(candidates.reduce((sum, c) => sum + c.match, 0) / candidates.length)
      : 0,
    topLocations: getTopLocations(candidates),
    experienceDistribution: getExperienceDistribution(candidates),
  };

  function getTopLocations(candidates: any[]) {
    const locationCounts = candidates.reduce((acc, candidate) => {
      const city = candidate.location.split(',')[0]; // Get city only
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(locationCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([city, count]) => ({ city, count }));
  }

  function getExperienceDistribution(candidates: any[]) {
    const distribution = {
      junior: candidates.filter(c => {
        const years = extractYears(c.experience);
        return years <= 3;
      }).length,
      mid: candidates.filter(c => {
        const years = extractYears(c.experience);
        return years > 3 && years <= 8;
      }).length,
      senior: candidates.filter(c => {
        const years = extractYears(c.experience);
        return years > 8;
      }).length,
    };

    return distribution;
  }

  if (candidates.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {/* Total Candidates */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <RiUserLine className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2">
            <Badge variant="secondary" className="bg-green-50 text-green-700">
              {stats.highMatch} excellents matchs
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Match Quality */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Match moyen</p>
              <p className="text-2xl font-bold">{stats.averageMatch}%</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <RiStarLine className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${stats.averageMatch}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Availability */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Disponibles maintenant</p>
              <p className="text-2xl font-bold">{stats.availableNow}</p>
            </div>
            <div className="p-2 bg-orange-100 rounded-lg">
              <RiTimeLine className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            {Math.round((stats.availableNow / stats.total) * 100)}% des candidats
          </p>
        </CardContent>
      </Card>

      {/* Experience Distribution */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Expérience</p>
            <RiTreeLine className="h-4 w-4 text-gray-400" />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Junior</span>
              <span>{stats.experienceDistribution.junior}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-blue-400 h-1 rounded-full" 
                style={{ width: `${(stats.experienceDistribution.junior / stats.total) * 100}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-xs">
              <span>Intermédiaire</span>
              <span>{stats.experienceDistribution.mid}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-green-400 h-1 rounded-full" 
                style={{ width: `${(stats.experienceDistribution.mid / stats.total) * 100}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-xs">
              <span>Senior</span>
              <span>{stats.experienceDistribution.senior}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-purple-400 h-1 rounded-full" 
                style={{ width: `${(stats.experienceDistribution.senior / stats.total) * 100}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}