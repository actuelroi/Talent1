// src/app/candidate/dashboard/components/CoursesTraining.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  RiPlayCircleLine, 
  RiCalendarLine, 
  RiTimeLine, 
  RiCheckboxCircleLine,
  RiArrowRightLine,
  RiBookOpenLine,
  RiMedalLine
} from "@remixicon/react";
import { useState } from 'react';

export default function CoursesTraining() {
  const [activeTab, setActiveTab] = useState<'ongoing' | 'completed' | 'available'>('ongoing');

  const courses = {
    ongoing: [
      {
        id: 1,
        title: 'React Avancé - Les meilleures pratiques',
        provider: 'OpenClassrooms',
        progress: 65,
        duration: '12 heures',
        deadline: '2024-02-15',
        modules: 8,
        completedModules: 5,
        image: '/api/placeholder/300/200'
      },
      {
        id: 2,
        title: 'TypeScript pour Développeurs JavaScript',
        provider: 'Coursera',
        progress: 30,
        duration: '8 heures',
        deadline: '2024-03-01',
        modules: 6,
        completedModules: 2,
        image: '/api/placeholder/300/200'
      }
    ],
    completed: [
      {
        id: 3,
        title: 'Introduction à Next.js',
        provider: 'Udemy',
        progress: 100,
        duration: '6 heures',
        completedDate: '2024-01-10',
        certificate: true,
        image: '/api/placeholder/300/200'
      }
    ],
    available: [
      {
        id: 4,
        title: 'UI/UX Design Fundamentals',
        provider: 'LinkedIn Learning',
        duration: '10 heures',
        level: 'Débutant',
        rating: 4.8,
        students: 12500,
        image: '/api/placeholder/300/200'
      },
      {
        id: 5,
        title: 'AWS Cloud Practitioner',
        provider: 'Amazon Web Services',
        duration: '15 heures',
        level: 'Intermédiaire',
        rating: 4.6,
        students: 8900,
        image: '/api/placeholder/300/200'
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Formations & Certifications</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <RiBookOpenLine className="h-4 w-4 mr-2" />
          Découvrir plus de formations
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('ongoing')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'ongoing'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          En cours
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'completed'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Terminées
        </button>
        <button
          onClick={() => setActiveTab('available')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'available'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Disponibles
        </button>
      </div>

      {/* Ongoing Courses */}
      {activeTab === 'ongoing' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.ongoing.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{course.title}</h3>
                    <p className="text-gray-600 text-sm">{course.provider}</p>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    En cours
                  </Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <RiTimeLine className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <RiCalendarLine className="h-4 w-4" />
                    <span>Échéance: {new Date(course.deadline).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      Modules: {course.completedModules}/{course.modules}
                    </span>
                    <span className="font-semibold text-blue-600">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <RiPlayCircleLine className="h-4 w-4 mr-2" />
                  Continuer la formation
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Completed Courses */}
      {activeTab === 'completed' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.completed.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{course.title}</h3>
                    <p className="text-gray-600 text-sm">{course.provider}</p>
                  </div>
                  {/* <Badge variant="success" className="bg-green-50 text-green-700"> */}
                  <Badge variant="default" className="bg-green-50 text-green-700">
                    <RiCheckboxCircleLine className="h-3 w-3 mr-1" />
                    Terminé
                  </Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <RiTimeLine className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <RiCalendarLine className="h-4 w-4" />
                    <span>Terminé le: {new Date(course.completedDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>

                {course.certificate && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <RiMedalLine className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">
                        Certificat disponible
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Voir le certificat
                  </Button>
                  <Button variant="outline">
                    <RiArrowRightLine className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Available Courses */}
      {activeTab === 'available' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.available.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                    <RiBookOpenLine className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{course.provider}</p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <RiTimeLine className="h-4 w-4" />
                    <span>{course.duration}</span>
                    <span>•</span>
                    <Badge variant="outline" className="text-xs">
                      {course.level}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>⭐ {course.rating}</span>
                    <span>•</span>
                    <span>{course.students.toLocaleString()} étudiants</span>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  S'inscrire
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'available' && (
        <div className="text-center py-8">
          <h3 className="text-lg font-semibold mb-2">Vous cherchez une formation spécifique ?</h3>
          <p className="text-gray-600 mb-4">
            Découvrez notre catalogue complet de formations certifiantes
          </p>
          <Button>
            <RiBookOpenLine className="h-4 w-4 mr-2" />
            Explorer toutes les formations
          </Button>
        </div>
      )}
    </div>
  );
}