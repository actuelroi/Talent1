// src/app/company/search/components/SavedSearches.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  RiBookmarkLine,
  RiDeleteBinLine,
  RiEditLine,
  RiSearchLine,
  RiTimeLine,
} from '@remixicon/react';

interface SavedSearch {
  id: number;
  name: string;
  results: number;
  lastSearch: string;
  filters: any;
}

interface SavedSearchesProps {
  searches: SavedSearch[];
  onLoadSearch: (search: SavedSearch) => void;
}

export default function SavedSearches({ searches, onLoadSearch }: SavedSearchesProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleDeleteSearch = (searchId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    // Implement delete logic here
    console.log('Delete search:', searchId);
  };

  const handleEditSearch = (searchId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    // Implement edit logic here
    console.log('Edit search:', searchId);
  };

  if (searches.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <RiBookmarkLine className="h-8 w-8 text-gray-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-1">Aucune recherche sauvegardée</h3>
            <p className="text-sm text-gray-600">
              Sauvegardez vos recherches pour y accéder rapidement
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <RiBookmarkLine className="h-5 w-5" />
          Recherches sauvegardées
        </h3>
        
        <div className="space-y-3">
          {searches.map(search => (
            <div
              key={search.id}
              className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
              onClick={() => onLoadSearch(search)}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-sm truncate flex-1">{search.name}</h4>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => handleEditSearch(search.id, e)}
                  >
                    <RiEditLine className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-red-500"
                    onClick={(e) => handleDeleteSearch(search.id, e)}
                  >
                    <RiDeleteBinLine className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-600">
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                    {search.results} résultats
                  </Badge>
                  <div className="flex items-center gap-1">
                    <RiTimeLine className="h-3 w-3" />
                    {formatDate(search.lastSearch)}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    onLoadSearch(search);
                  }}
                >
                  <RiSearchLine className="h-3 w-3 mr-1" />
                  Charger
                </Button>
              </div>
              
              {/* Quick filters preview */}
              <div className="mt-2 flex flex-wrap gap-1">
                {Object.entries(search.filters).slice(0, 3).map(([key, value]) => {
                  if (Array.isArray(value) && value.length > 0) {
                    return (
                      <Badge key={key} variant="outline" className="text-xs">
                        {key}: {value.slice(0, 2).join(', ')}
                        {value.length > 2 && `...`}
                      </Badge>
                    );
                  } else if (value && value !== '') {
                    return (
                      <Badge key={key} variant="outline" className="text-xs">
                        {key}: {String(value)}
                      </Badge>
                    );
                  }
                  return null;
                }).filter(Boolean)}
                
                {Object.keys(search.filters).length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{Object.keys(search.filters).length - 3} autres
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}