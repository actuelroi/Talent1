// src/app/company/dashboard/messages/[conversationId]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ConversationHeader from '../_components/ConversationHeader';
import MessageList from '../_components/MessageList';
import MessageInput from '../_components/MessageInput';

// Données mock pour la démo
const mockConversation = {
  id: '1',
  candidate: {
    id: 1,
    name: 'Marie Dubois',
    title: 'Développeuse Full Stack Senior',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    location: 'Paris, France'
  },
  lastMessage: 'Je suis intéressée par votre offre !',
  timestamp: '2024-01-20T10:30:00',
  unreadCount: 2,
  status: 'online'
};

const mockMessages = [
  {
    id: '1',
    content: 'Bonjour Marie, je suis intéressé par votre profil pour notre poste de Développeuse Full Stack.',
    timestamp: '2024-01-20T10:00:00',
    sender: 'company',
    status: 'read'
  },
  {
    id: '2',
    content: 'Bonjour ! Je suis intéressée par votre offre. Pouvez-vous me donner plus de détails sur le projet ?',
    timestamp: '2024-01-20T10:15:00',
    sender: 'candidate',
    status: 'read'
  }
];

export default function ConversationPage() {
  const params = useParams();
  const router = useRouter();
  const [messages, setMessages] = useState(mockMessages);
  const [conversation, setConversation] = useState(mockConversation);

  useEffect(() => {
    // Ici vous récupéreriez la conversation depuis l'API
    // fetch(`/api/conversations/${params.conversationId}`)
    console.log('Chargement de la conversation:', params.conversationId);
  }, [params.conversationId]);

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: Date.now().toString(),
      content,
      timestamp: new Date().toISOString(),
      sender: 'company',
      status: 'sending'
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  const handleBack = () => {
    router.push('/company/dashboard/messages');
  };

  return (
    <div className="flex flex-col h-full">
      <ConversationHeader 
        conversation={conversation} 
        onBack={handleBack}
      />
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}