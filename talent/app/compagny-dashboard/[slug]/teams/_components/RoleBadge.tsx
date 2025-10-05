// src/app/company/dashboard/teams/components/RoleBadge.tsx
'use client';

import { Badge } from '@/components/ui/badge';

interface RoleBadgeProps {
  role: string;
}

const roleConfig: { [key: string]: { variant: 'default' | 'secondary' | 'outline', color: string } } = {
  'Tech Lead': { variant: 'default', color: 'blue' },
  'Développeuse Fullstack': { variant: 'secondary', color: 'green' },
  'DevOps Engineer': { variant: 'outline', color: 'purple' },
  'Product Manager': { variant: 'default', color: 'orange' },
  'UX Designer': { variant: 'secondary', color: 'pink' },
  'Data Scientist': { variant: 'outline', color: 'cyan' }
};

export default function RoleBadge({ role }: RoleBadgeProps) {
  const config = roleConfig[role] || { variant: 'outline', color: 'gray' };

  return (
    <Badge variant={config.variant} className={`text-xs`}>
      {role}
    </Badge>
  );
}