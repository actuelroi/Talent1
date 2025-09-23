// src/app/company/jobs/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RiAddLine } from '@remixicon/react';
import CreateJobForm from './_components/CreateJobForm';
import JobStats from './_components/JobStats';
import JobFilters from './_components/JobFilters';
import JobListings from './_components/JobListings';

// Components

// Mock data
const initialJobs = [
  {
    id: 1,
    title: "Technicien(ne) maintenance scientifique - Campus de Chevilly (H/F)",
    type: "CDI",
    location: "Chevilly-Larue",
    remote: "Télétravail fréquent",
    timeAgo: "il y a 16 heures",
    salary: "35-42k €",
    department: "Maintenance",
    experience: "2-5 ans",
    tags: ["Maintenance", "Scientifique", "CDI"],
    status: "active",
    applications: 24,
    views: 156,
    publicationDate: "2024-01-15",
    expirationDate: "2024-02-15",
    description: "Description complète du poste..."
  },
  // ... more jobs
];

export default function JobsPage() {
  const [jobs, setJobs] = useState(initialJobs);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    type: '',
    remote: '',
    status: '',
    departments: [] as string[],
  });

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         job.department.toLowerCase().includes(filters.search.toLowerCase());
    const matchesLocation = !filters.location || job.location.includes(filters.location);
    const matchesType = !filters.type || job.type === filters.type;
    const matchesStatus = !filters.status || job.status === filters.status;
    const matchesDepartment = filters.departments.length === 0 || 
                            filters.departments.includes(job.department);

    return matchesSearch && matchesLocation && matchesType && matchesStatus && matchesDepartment;
  });

  const handleCreateJob = (newJob: any) => {
    setJobs(prev => [...prev, { ...newJob, id: Date.now() }]);
    setShowCreateForm(false);
  };

  const handleDeleteJob = (jobId: number) => {
    setJobs(prev => prev.filter(job => job.id !== jobId));
  };

  const handleUpdateJob = (updatedJob: any) => {
    setJobs(prev => prev.map(job => job.id === updatedJob.id ? updatedJob : job));
  };

  if (showCreateForm) {
    return <CreateJobForm onSubmit={handleCreateJob} onCancel={() => setShowCreateForm(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Offres d'emploi</h1>
              <p className="text-gray-600 mt-2">Gérez et publiez vos offres d'emploi</p>
            </div>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              onClick={() => setShowCreateForm(true)}
            >
              <RiAddLine className="h-4 w-4" />
              Nouvelle offre
            </Button>
          </div>

          <JobStats jobs={jobs} />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <JobFilters filters={filters} onFiltersChange={setFilters} />
        </div>
      </div>

      {/* Job Listings */}
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <JobListings 
          jobs={filteredJobs}
          onDeleteJob={handleDeleteJob}
          onUpdateJob={handleUpdateJob}
        />
      </div>
    </div>
  );
}