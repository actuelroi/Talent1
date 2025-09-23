// src/app/company/dashboard/teams/components/AvailabilityIndicator.tsx
'use client';

interface AvailabilityIndicatorProps {
  status: 'active' | 'away' | 'busy' | 'offline';
}

export default function AvailabilityIndicator({ status }: AvailabilityIndicatorProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusTitle = () => {
    switch (status) {
      case 'active': return 'En ligne';
      case 'away': return 'Absent';
      case 'busy': return 'Occupé';
      case 'offline': return 'Hors ligne';
      default: return 'Inconnu';
    }
  };

  return (
    <div 
      className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor()}`}
      title={getStatusTitle()}
    />
  );
}