// src/app/company/dashboard/messages/components/MessageItem.tsx
'use client';

import { RiCheckLine, RiCheckDoubleLine, RiTimeLine } from '@remixicon/react';

interface MessageItemProps {
  message: any;
}

export default function MessageItem({ message }: MessageItemProps) {
  const isCompany = message.sender === 'company';
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sending':
        return <RiTimeLine className="h-3 w-3 text-gray-400" />;
      case 'sent':
        return <RiCheckLine className="h-3 w-3 text-gray-400" />;
      case 'delivered':
        return <RiCheckDoubleLine className="h-3 w-3 text-gray-400" />;
      case 'read':
        return <RiCheckDoubleLine className="h-3 w-3 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex ${isCompany ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs lg:max-w-md rounded-lg px-4 py-2 ${
        isCompany 
          ? 'bg-blue-500 text-white rounded-br-none' 
          : 'bg-white border rounded-bl-none'
      }`}>
        <p className="text-sm">{message.content}</p>
        <div className={`flex items-center gap-1 mt-1 text-xs ${
          isCompany ? 'text-blue-100' : 'text-gray-500'
        }`}>
          <span>{formatTime(message.timestamp)}</span>
          {isCompany && getStatusIcon(message.status)}
        </div>
      </div>
    </div>
  );
}