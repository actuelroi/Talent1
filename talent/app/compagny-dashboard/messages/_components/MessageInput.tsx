// src/app/company/dashboard/messages/components/MessageInput.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RiSendPlaneLine, RiAttachmentLine, RiEmotionLine } from '@remixicon/react';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t bg-white p-4">
      <div className="flex items-end gap-2">
        <Button variant="ghost" size="icon">
          <RiAttachmentLine className="h-5 w-5" />
        </Button>
        
        <div className="flex-1 relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tapez votre message..."
            className="min-h-[40px] max-h-[120px] resize-none pr-12"
            rows={1}
          />
          <Button variant="ghost" size="icon" className="absolute right-2 bottom-1">
            <RiEmotionLine className="h-5 w-5" />
          </Button>
        </div>
        
        <Button 
          onClick={handleSend}
          disabled={!message.trim()}
          size="icon"
        >
          <RiSendPlaneLine className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}