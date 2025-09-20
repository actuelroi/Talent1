// src/app/candidate/dashboard/components/Messages.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RiMailLine, RiTimeLine } from "@remixicon/react";

export default function Messages() {
  const messages = [
    {
      id: 1,
      company: 'L\'Oréal',
      subject: 'Entretien technique prévu',
      preview: 'Nous avons bien reçu votre candidature et souhaiterions planifier un entretien technique...',
      date: '2024-01-16',
      unread: true
    },
    {
      id: 2,
      company: 'Google',
      subject: 'Votre processus de recrutement',
      preview: 'Merci pour votre intérêt pour le poste de Product Designer. Votre profil a retenu notre attention...',
      date: '2024-01-14',
      unread: true
    },
    {
      id: 3,
      company: 'Amazon',
      subject: 'Update concernant votre candidature',
      preview: 'Nous vous remercions pour le temps que vous avez consacré à nos entretiens...',
      date: '2024-01-10',
      unread: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Messages</h1>
        <Badge variant="secondary">3 nouveaux messages</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Boîte de réception</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                  message.unread ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <RiMailLine className="h-6 w-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{message.company}</h3>
                    {message.unread && (
                      <Badge variant="default" className="bg-blue-600">Nouveau</Badge>
                    )}
                  </div>
                  <h4 className="font-medium mb-1">{message.subject}</h4>
                  <p className="text-gray-600 text-sm mb-2">{message.preview}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <RiTimeLine className="h-3 w-3" />
                    {new Date(message.date).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button variant="outline">Voir tous les messages</Button>
      </div>
    </div>
  );
}