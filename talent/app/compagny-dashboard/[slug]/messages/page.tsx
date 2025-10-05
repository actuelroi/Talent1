// src/app/company/dashboard/messages/page.tsx
'use client';

import { useState } from 'react';
import ConversationsList from './_components/ConversationsList';
import MessageList from './_components/MessageList';
import MessageInput from './_components/MessageInput';
import ConversationHeader from './_components/ConversationHeader';
import SearchContacts from './_components/SearchContacts';
import AttachmentsPanel from './_components/AttachmentsPanel';

const mockConversations = [
  {
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
  },
  {
    id: '2',
    candidate: {
      id: 2,
      name: 'Thomas Martin',
      title: 'Data Scientist',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      location: 'Lyon, France'
    },
    lastMessage: 'Merci pour les détails supplémentaires',
    timestamp: '2024-01-20T09:15:00',
    unreadCount: 0,
    status: 'offline'
  }
];

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
  },
  {
    id: '3',
    content: 'Bien sûr ! Il s\'agit d\'une application SaaS pour la gestion de projets. Nous utilisons React et Node.js.',
    timestamp: '2024-01-20T10:30:00',
    sender: 'company',
    status: 'delivered'
  }
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [messages, setMessages] = useState(mockMessages);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAttachments, setShowAttachments] = useState(true);
  const [attachments, setAttachments] = useState([
    {
      id: 1,
      name: 'CV_Marie_Dubois.pdf',
      type: 'application/pdf',
      size: 2048576,
      date: '2024-01-15',
      conversationId: '1'
    },
    {
      id: 2,
      name: 'portfolio.jpg',
      type: 'image/jpeg',
      size: 1048576,
      date: '2024-01-16',
      conversationId: '1'
    }
  ]);

  // Filtrer les pièces jointes par conversation
  const currentAttachments = attachments.filter(
    attachment => attachment.conversationId === selectedConversation?.id
  );

  const filteredConversations = mockConversations.filter(conv =>
    conv.candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.candidate.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: Date.now().toString(),
      content,
      timestamp: new Date().toISOString(),
      sender: 'company',
      status: 'sending'
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simuler l'envoi
    setTimeout(() => {
      setMessages(prev => prev.map(msg =>
        msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
      ));
    }, 1000);
  };

  return (
    <div className="flex h-full">
      {/* Sidebar des conversations */}
      <div className="w-full md:w-80 border-r bg-white flex flex-col">
        <SearchContacts 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <ConversationsList
          conversations={filteredConversations}
          selectedConversation={selectedConversation}
          onSelectConversation={setSelectedConversation}
        />
      </div>

      {/* Zone de conversation principale */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            <ConversationHeader conversation={selectedConversation} />
            <MessageList messages={messages} />
            <MessageInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Sélectionnez une conversation pour commencer à discuter
          </div>
        )}
      </div>
      {/* Panel des pièces jointes à droite */}
      <AttachmentsPanel
        isOpen={showAttachments}
        onClose={() => setShowAttachments(false)}
        attachments={currentAttachments}
      />
    </div>
  );
}