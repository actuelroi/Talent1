import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const employees = [
  {
    name: "Viken",
    role: "Chef de Projet Retail Education",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Renaud",
    role: "Retail Marketing",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Corentin",
    role: "Animateur de fabrication",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Oleasia",
    role: "Data Scientist",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  }
];

export default function EmployeeTestimonials() {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-6">Rencontrez nos collaborateurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {employees.map((employee, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden">
                  <Image
                    src={employee.image}
                    alt={employee.name}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-bold">{employee.name}</h3>
                  <p className="text-gray-600 text-sm">{employee.role}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Voir le témoignage
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}