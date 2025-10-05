// src/app/company/dashboard/messages/components/AttachmentsPanel.tsx
'use client';

import { Button } from '@/components/ui/button';
import {  RiDownloadLine, RiCloseLine } from '@remixicon/react';

interface AttachmentsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  attachments: any[];
}

export default function AttachmentsPanel({ isOpen, onClose, attachments }: AttachmentsPanelProps) {
  if (!isOpen) return null;

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('image')) return '🖼️';
    if (type.includes('word')) return '📝';
    return '📎';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-80 border-l bg-white">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-semibold">Pièces jointes</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <RiCloseLine className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-4 space-y-3">
        {attachments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Aucune pièce jointe</p>
        ) : (
          attachments.map((file, index) => (
            <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
              <span className="text-2xl">{getFileIcon(file.type)}</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{file.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
              </div>
              <Button variant="ghost" size="icon">
                <RiDownloadLine className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}