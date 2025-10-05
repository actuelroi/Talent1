

'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, X } from "lucide-react";
import { useState } from "react";

interface Employee {
  id: string;
  name: string;
  role: string;
  image: string;
  testimony: string;
}

const defaultEmployees: Employee[] = [
  {
    id: '1',
    name: "Viken",
    role: "Chef de Projet Retail Education",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    testimony: "Je travaille chez L'Oréal depuis 5 ans et l'ambiance est exceptionnelle..."
  },
  {
    id: '2',
    name: "Renaud",
    role: "Retail Marketing",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    testimony: "Une entreprise qui valorise vraiment l'innovation et la créativité..."
  }
];

export default function EmployeeTestimonials() {
  const [employees, setEmployees] = useState<Employee[]>(defaultEmployees);
  const [isEditing, setIsEditing] = useState(false);
  const [showTestimony, setShowTestimony] = useState<string | null>(null);

  const addEmployee = () => {
    const newEmployee: Employee = {
      id: Date.now().toString(),
      name: "Nouveau collaborateur",
      role: "Poste",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      testimony: "Témoignage à compléter..."
    };
    setEmployees([...employees, newEmployee]);
  };

  const updateEmployee = (id: string, field: string, value: string) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...emp, [field]: value } : emp
    ));
  };

  const removeEmployee = (id: string) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Rencontrez nos collaborateurs</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? 'Terminer' : 'Modifier'}
            </Button>
            {isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={addEmployee}
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {employees.map((employee) => (
            <div key={employee.id} className="bg-gray-50 rounded-lg p-4 relative">
              {isEditing && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 p-0"
                  onClick={() => removeEmployee(employee.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden">
                  <img
                    src={employee.image}
                    alt={employee.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={employee.name}
                        onChange={(e) => updateEmployee(employee.id, 'name', e.target.value)}
                        className="font-bold w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={employee.role}
                        onChange={(e) => updateEmployee(employee.id, 'role', e.target.value)}
                        className="text-gray-600 text-sm w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none mt-1"
                      />
                    </>
                  ) : (
                    <>
                      <h3 className="font-bold">{employee.name}</h3>
                      <p className="text-gray-600 text-sm">{employee.role}</p>
                    </>
                  )}
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowTestimony(showTestimony === employee.id ? null : employee.id)}
              >
                {showTestimony === employee.id ? 'Masquer' : 'Voir le témoignage'}
              </Button>
              
              {showTestimony === employee.id && (
                <div className="mt-4 p-3 bg-white rounded border">
                  {isEditing ? (
                    <textarea
                      value={employee.testimony}
                      onChange={(e) => updateEmployee(employee.id, 'testimony', e.target.value)}
                      className="w-full min-h-[100px] border border-gray-300 rounded p-2 focus:border-blue-500 focus:outline-none"
                      placeholder="Entrez le témoignage..."
                    />
                  ) : (
                    <p className="text-gray-700">{employee.testimony}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}