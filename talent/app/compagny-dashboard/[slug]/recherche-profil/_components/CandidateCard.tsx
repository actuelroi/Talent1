// src/app/company/search/components/CandidateCard.tsx
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
} from '@remixicon/react';

interface CandidateCardProps {
  candidate: any;
  onContact: (candidateId: number) => void;
  onSave: (candidateId: number) => void;
}

export default function CandidateCard({ candidate, onContact, onSave }: CandidateCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <img
              src={candidate.image}
              alt={candidate.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-lg">{candidate.name}</h3>
              <p className="text-gray-600">{candidate.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {candidate.match}% match
                </Badge>
                <span className="text-sm text-gray-500">{candidate.lastActive}</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSave(candidate.id)}
            className={`h-8 w-8 ${candidate.saved ? 'text-blue-600' : 'text-gray-400'}`}
          >
            {candidate.saved ? <RiBookmarkFill className="h-5 w-5" /> : <RiBookmarkLine className="h-5 w-5" />}
          </Button>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <RiMapPinLine className="h-4 w-4" />
            {candidate.location}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <RiTimeLine className="h-4 w-4" />
            Expérience: {candidate.experience}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <RiMoneyEuroCircleLine className="h-4 w-4" />
            {candidate.salary}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <RiUserLine className="h-4 w-4" />
            Disponible: {candidate.availability}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {candidate.skills.slice(0, 4).map((skill: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {candidate.skills.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{candidate.skills.length - 4}
              </Badge>
            )}
          </div>
        </div>

        {/* Profile Completion */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Profil complet</span>
            <span>{candidate.profileCompletion}%</span>
          </div>
          <Progress value={candidate.profileCompletion} className="h-1" />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onContact(candidate.id)}
          >
            <RiMessageLine className="h-4 w-4 mr-2" />
            Contacter
          </Button>
          <Button variant="outline" size="sm">
            <RiEyeLine className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}