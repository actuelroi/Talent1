// src/app/company/search/components/CandidatesListView.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  RiMapPinLine,
  RiTimeLine,
  RiMoneyEuroCircleLine,
  RiUserLine,
  RiBookmarkLine,
  RiBookmarkFill,
  RiMessageLine,
  RiEyeLine,
  RiStarLine,
  RiStarFill,
} from '@remixicon/react';

interface CandidatesListViewProps {
  candidates: any[];
  onContact: (candidateId: number) => void;
  onSave: (candidateId: number) => void;
}

export default function CandidatesListView({ candidates, onContact, onSave }: CandidatesListViewProps) {
  return (
    <div className="space-y-4">
      {candidates.map(candidate => (
        <CandidateListItem
          key={candidate.id}
          candidate={candidate}
          onContact={onContact}
          onSave={onSave}
        />
      ))}
    </div>
  );
}

function CandidateListItem({ candidate, onContact, onSave }: { candidate: any; onContact: (id: number) => void; onSave: (id: number) => void }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {/* Left Section - Candidate Info */}
          <div className="flex items-center gap-4 flex-1">
            <img
              src={candidate.image}
              alt={candidate.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-semibold text-lg truncate">{candidate.name}</h3>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {candidate.match}% match
                </Badge>
              </div>
              
              <p className="text-gray-600 mb-2">{candidate.title}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                <div className="flex items-center gap-1">
                  <RiMapPinLine className="h-4 w-4" />
                  <span>{candidate.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <RiTimeLine className="h-4 w-4" />
                  <span>{candidate.experience}</span>
                </div>
                <div className="flex items-center gap-1">
                  <RiMoneyEuroCircleLine className="h-4 w-4" />
                  <span>{candidate.salary}</span>
                </div>
                <div className="flex items-center gap-1">
                  <RiUserLine className="h-4 w-4" />
                  <span>{candidate.availability}</span>
                </div>
              </div>
              
              {/* Skills */}
              <div className="mt-2 flex flex-wrap gap-1">
                {candidate.skills.slice(0, 6).map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {candidate.skills.length > 6 && (
                  <Badge variant="outline" className="text-xs">
                    +{candidate.skills.length - 6}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Right Section - Stats and Actions */}
          <div className="flex items-center gap-6 ml-6">
            {/* Profile Stats */}
            <div className="text-center">
              <div className="flex items-center gap-1 mb-1">
                {candidate.profileCompletion >= 90 ? (
                  <RiStarFill className="h-4 w-4 text-yellow-500" />
                ) : (
                  <RiStarLine className="h-4 w-4 text-gray-400" />
                )}
                <span className="text-sm font-medium">{candidate.profileCompletion}%</span>
              </div>
              <span className="text-xs text-gray-500">Profil</span>
            </div>
            
            {/* Last Active */}
            <div className="text-center">
              <div className="text-sm font-medium mb-1">{candidate.lastActive}</div>
              <span className="text-xs text-gray-500">Actif</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onSave(candidate.id)}
                className={`h-8 w-8 ${candidate.saved ? 'text-blue-600' : 'text-gray-400'}`}
              >
                {candidate.saved ? <RiBookmarkFill className="h-5 w-5" /> : <RiBookmarkLine className="h-5 w-5" />}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onContact(candidate.id)}
              >
                <RiMessageLine className="h-4 w-4 mr-2" />
                Contacter
              </Button>
              
              <Button variant="outline" size="sm">
                <RiEyeLine className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Progress Bar for List View */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Compatibilité du profil</span>
            <span>{candidate.match}%</span>
          </div>
          <Progress value={candidate.match} className="h-1" />
        </div>
      </CardContent>
    </Card>
  );
}