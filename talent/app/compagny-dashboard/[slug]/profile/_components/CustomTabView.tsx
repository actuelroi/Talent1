'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  RiEditLine,
  RiDeleteBinLine,
  RiMoreLine
} from '@remixicon/react';
import { CustomTab } from '@/types/tab';
import EditableTabContent from './EditableTabContent';
import TabManager from './TabManager';

interface CustomTabViewProps {
  tab: CustomTab;
  onUpdate: (tabId: string, updates: Partial<CustomTab>) => void;
  onDelete: (tabId: string) => void;
}

export default function CustomTabView({ tab, onUpdate, onDelete }: CustomTabViewProps) {
  const [showMenu, setShowMenu] = useState(false);

  const handleContentUpdate = (content: string) => {
    onUpdate(tab.id, { 
      content,
      updatedAt: new Date()
    });
  };

  const handleTabUpdate = (updatedTab: Omit<CustomTab, 'id' | 'createdAt' | 'updatedAt'>) => {
    onUpdate(tab.id, {
      ...updatedTab,
      updatedAt: new Date()
    });
  };

  return (
    <div className="w-full h-full p-6">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="flex items-center gap-3">
            <span>{tab.label}</span>
            <span className="text-sm font-normal text-gray-500">
              {tab.updatedAt.toLocaleDateString('fr-FR')}
            </span>
          </CardTitle>
          
          <div className="flex items-center gap-2 relative">
            <TabManager
              tab={tab}
              onSave={handleTabUpdate}
              mode="edit"
            >
              <Button variant="outline" size="sm">
                <RiEditLine className="h-4 w-4" />
              </Button>
            </TabManager>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMenu(!showMenu)}
            >
              <RiMoreLine className="h-4 w-4" />
            </Button>
            
            {showMenu && (
              <div className="absolute top-10 right-0 bg-white border rounded-lg shadow-lg z-10 min-w-[120px]">
                <button
                  onClick={() => {
                    onDelete(tab.id);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <RiDeleteBinLine className="h-4 w-4" />
                  Supprimer
                </button>
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          <EditableTabContent
            content={tab.content}
            type={tab.type}
            onUpdate={handleContentUpdate}
          />
        </CardContent>
      </Card>
    </div>
  );
}