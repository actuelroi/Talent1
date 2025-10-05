// src/app/company/dashboard/teams/components/TeamMembers.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  RiSearchLine, 
  RiAddLine, 
  RiMoreLine,
  RiUserLine 
} from '@remixicon/react';

import MemberCard from './MemberCard';
import InviteMemberModal from './InviteMemberModal';

interface TeamMembersProps {
  members: any[];
  teamId: string;
}

export default function TeamMembers({ members, teamId }: TeamMembersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Rechercher un membre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Button onClick={() => setIsInviteModalOpen(true)}>
          <RiAddLine className="h-4 w-4 mr-2" />
          Inviter un membre
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map(member => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <RiUserLine className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun membre trouvé</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery ? 'Essayez de modifier votre recherche' : 'Invitez des membres pour constituer votre équipe'}
            </p>
            <Button onClick={() => setIsInviteModalOpen(true)}>
              Inviter un membre
            </Button>
          </CardContent>
        </Card>
      )}

      <InviteMemberModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        teamId={teamId}
        onInvite={(email, role) => {
          console.log('Invitation envoyée à:', email, 'pour le rôle:', role);
          setIsInviteModalOpen(false);
        }}
      />
    </div>
  );
}