// src/app/candidate/dashboard/components/JobSuggestions.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RiMapPinLine, RiBriefcaseLine, RiHeartLine, RiHeartFill } from "@remixicon/react";
import { useState } from 'react';

export default function JobSuggestions() {
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  const jobs = [
    {
      id: 1,
      title: 'Développeur Frontend React Senior',
      company: 'L\'Oréal',
      location: 'Paris, France',
      type: 'CDI',
      remote: true,
      match: 95,
      salary: '60k-75k €',
      skills: ['React', 'TypeScript', 'Next.js'],
      posted: '2024-01-15'
    },
    {
      id: 2,
      title: 'Product Designer',
      company: 'Google',
      location: 'Lyon, France',
      type: 'CDI',
      remote: true,
      match: 88,
      salary: '55k-70k €',
      skills: ['Figma', 'UI/UX', 'Design System'],
      posted: '2024-01-14'
    },
    {
      id: 3,
      title: 'Data Scientist',
      company: 'Amazon',
      location: 'Toulouse, France',
      type: 'CDI',
      remote: false,
      match: 82,
      salary: '50k-65k €',
      skills: ['Python', 'Machine Learning', 'SQL'],
      posted: '2024-01-13'
    }
  ];

  const toggleSaveJob = (jobId: number) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Offres Suggestées</h1>
        <Button variant="outline">Filtrer</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                </div>
                <button
                  onClick={() => toggleSaveJob(job.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  {savedJobs.includes(job.id) ? (
                    <RiHeartFill className="h-5 w-5 text-red-500" />
                  ) : (
                    <RiHeartLine className="h-5 w-5" />
                  )}
                </button>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <RiMapPinLine className="h-4 w-4" />
                  <span>{job.location}</span>
                  {job.remote && (
                    <Badge variant="outline" className="text-xs">Télétravail</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <RiBriefcaseLine className="h-4 w-4" />
                  <span>{job.type}</span>
                  <span>•</span>
                  <span>{job.salary}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Match</span>
                  <span className="font-semibold text-blue-600">{job.match}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${job.match}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Postuler
                </Button>
                <Button variant="outline">Voir</Button>
              </div>

              <p className="text-xs text-gray-500 mt-3">
                Postée le {new Date(job.posted).toLocaleDateString('fr-FR')}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline">Voir plus d'offres</Button>
      </div>
    </div>
  );
}