
// src/app/company/dashboard/components/FeaturedSection.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RiAddLine, RiEditLine, RiPlayLine } from "@remixicon/react";

 
interface FeaturedSectionProps {
  employeeStories: any[];
  onUpdate: (stories: any[]) => void;
}

export default function FeaturedSection({ employeeStories, onUpdate }: FeaturedSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">À la une</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <RiAddLine className="h-4 w-4 mr-2" />
          Nouveau contenu
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Témoignages collaborateurs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employeeStories.map((employee) => (
              <div key={employee.id} className="border rounded-lg overflow-hidden group">
                <div className="relative h-48 bg-gray-200">
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button className="bg-white text-gray-900">
                      <RiPlayLine className="h-4 w-4 mr-2" />
                      Regarder
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">Rencontrez {employee.name}</h3>
                  <p className="text-sm text-gray-600">{employee.position}</p>
                  <div className="mt-3">
                    <Button variant="outline" size="sm">
                      <RiEditLine className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}