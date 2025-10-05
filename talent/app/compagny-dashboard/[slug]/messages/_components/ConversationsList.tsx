// src/app/company/dashboard/messages/components/ConversationsList.tsx
'use client';

import { Badge } from '@/components/ui/badge';


interface ConversationsListProps {
  conversations: any[];
  selectedConversation: any;
  onSelectConversation: (conversation: any) => void;
}

export default function ConversationsList({ 
  conversations, 
  selectedConversation, 
  onSelectConversation 
}: ConversationsListProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 3600000) return 'Il y a ' + Math.floor(diff / 60000) + ' min';
    if (diff < 86400000) return 'Il y a ' + Math.floor(diff / 3600000) + ' h';
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div className="flex-1 overflow-auto">
      {conversations.map(conversation => (
        <div
          key={conversation.id}
          className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
            selectedConversation?.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
          }`}
          onClick={() => onSelectConversation(conversation)}
        >
          <div className="flex items-start gap-3">
            <div className="relative">
              <img
                src={conversation.candidate.image}
                alt={conversation.candidate.name}
                className="w-12 h-12 rounded-full"
              />
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                conversation.status === 'online' ? 'bg-green-500' : 'bg-gray-300'
              }`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold truncate">{conversation.candidate.name}</h4>
                <span className="text-xs text-gray-500">
                  {formatTime(conversation.timestamp)}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 truncate mb-1">
                {conversation.lastMessage}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{conversation.candidate.title}</span>
                {conversation.unreadCount > 0 && (
                  <Badge variant="destructive" className="h-5 px-2">
                    {conversation.unreadCount}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}