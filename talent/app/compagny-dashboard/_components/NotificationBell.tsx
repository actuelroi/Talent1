// src/app/company/dashboard/components/NotificationBell.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { RiNotificationLine, RiMessageLine, RiUserLine } from '@remixicon/react';

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const notifications = [
    { id: 1, type: 'message', content: 'Nouveau message de Marie Dubois', time: 'Il y a 5 min', read: false },
    { id: 2, type: 'candidate', content: 'Thomas Martin a mis à jour son profil', time: 'Il y a 1 heure', read: false },
    { id: 3, type: 'message', content: 'Sophie Lambert a répondu à votre offre', time: 'Il y a 2 heures', read: true },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'message': return <RiMessageLine className="h-4 w-4" />;
      case 'candidate': return <RiUserLine className="h-4 w-4" />;
      default: return <RiNotificationLine className="h-4 w-4" />;
    }
  };

  const markAsRead = (id: number) => {
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
        <RiNotificationLine className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
            {unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <Card className="absolute right-0 top-full mt-2 w-80 z-50">
            <CardContent className="p-0">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Notifications</h3>
              </div>
              
              <div className="max-h-96 overflow-auto">
                {notifications.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Aucune notification</p>
                ) : (
                  notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${
                          notification.type === 'message' ? 'bg-blue-100 text-blue-600' :
                          notification.type === 'candidate' ? 'bg-green-100 text-green-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{notification.content}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="p-2 border-t">
                <Button variant="ghost" className="w-full text-sm">
                  Voir toutes les notifications
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}