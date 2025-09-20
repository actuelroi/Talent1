// src/app/candidate/dashboard/components/CVManager.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RiUploadLine, RiDownloadLine, RiEditLine, RiAccessibilityLine } from "@remixicon/react";

export default function CVManager() {
  const cvs = [
    {
      id: 1,
      name: 'CV_Principal.pdf',
      isPrimary: true,
      uploadDate: '2024-01-15',
      size: '2.4 MB'
    },
    {
      id: 2,
      name: 'CV_Designer.pdf',
      isPrimary: false,
      uploadDate: '2024-01-10',
      size: '1.8 MB'
    },
    {
      id: 3,
      name: 'Lettre_Motivation_Generic.pdf',
      isPrimary: false,
      uploadDate: '2024-01-05',
      size: '1.2 MB'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mes CVs & Lettres de Motivation</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <RiUploadLine className="h-4 w-4 mr-2" />
          Télécharger un nouveau fichier
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>CV Principal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4 bg-blue-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold">PDF</span>
                </div>
                <div>
                  <h3 className="font-semibold">CV_Principal.pdf</h3>
                  <p className="text-sm text-gray-600">Téléchargé le 15/01/2024 • 2.4 MB</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <RiDownloadLine className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
                <Button variant="outline" size="sm">
                  <RiEditLine className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Autres fichiers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cvs.filter(cv => !cv.isPrimary).map((cv) => (
              <div key={cv.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-600 text-sm font-bold">PDF</span>
                  </div>
                  <div>
                    <h3 className="font-medium">{cv.name}</h3>
                    <p className="text-sm text-gray-600">Téléchargé le {new Date(cv.uploadDate).toLocaleDateString('fr-FR')} • {cv.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <RiDownloadLine className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <RiEditLine className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    < RiAccessibilityLine className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lettres de motivation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">Vous n'avez pas encore de lettre de motivation</p>
            <Button variant="outline">
              <RiUploadLine className="h-4 w-4 mr-2" />
              Télécharger une lettre
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}