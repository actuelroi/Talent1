// src/app/company/dashboard/messages/components/MessageList.tsx
'use client';

import { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';

interface MessageListProps {
  messages: any[];
}

export default function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-auto p-4 space-y-4 bg-gray-50">
      {messages.map(message => (
        <MessageItem key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}