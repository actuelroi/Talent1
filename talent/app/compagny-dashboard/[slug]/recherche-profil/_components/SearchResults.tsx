// src/app/company/search/components/SearchResults.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CandidateCard from './CandidateCard';
import CandidatesListView from './CandidatesListView';

interface SearchResultsProps {
  candidates: any[];
  viewMode: 'grid' | 'list';
  onContact: (candidateId: number) => void;
  onSave: (candidateId: number) => void;
}

export default function SearchResults({ candidates, viewMode, onContact, onSave }: SearchResultsProps) {
  if (candidates.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold mb-2">Aucun candidat trouvé</h3>
          <p className="text-gray-600 mb-4">
            Essayez de modifier vos critères de recherche ou élargissez vos filtres.
          </p>
          <Button variant="outline">
            Réinitialiser les filtres
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-gray-600">{candidates.length} candidats trouvés</span>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Trier par:</span>
          <select className="border rounded px-2 py-1">
            <option>Pertinence</option>
            <option>Dernière activité</option>
            <option>Match %</option>
            <option>Expérience</option>
          </select>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {candidates.map(candidate => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onContact={onContact}
              onSave={onSave}
            />
          ))}
        </div>
      ) : (
        <CandidatesListView
          candidates={candidates}
          onContact={onContact}
          onSave={onSave}
        />
      )}

      {/* Pagination */}
      {candidates.length > 0 && (
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Précédent</Button>
            <Button variant="outline" size="sm" disabled>1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Suivant</Button>
          </div>
        </div>
      )}
    </div>
  );
}