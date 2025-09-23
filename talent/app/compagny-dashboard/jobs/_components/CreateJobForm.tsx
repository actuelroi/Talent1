// src/app/company/jobs/components/CreateJobForm.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  RiArrowLeftLine,
  RiSaveLine,
  RiEyeLine,
  RiAddLine,
  RiCloseLine,
} from '@remixicon/react';

interface CreateJobFormProps {
  onSubmit: (job: any) => void;
  onCancel: () => void;
  initialData?: any;
}

const jobTypes = ["CDI", "Stage", "CDD", "Alternance", "Freelance"];
const departments = ["Marketing", "R&D", "IT", "Finance", "RH", "Production", "Qualité", "Commercial", "Logistique"];
const locations = ["Paris", "Lyon", "Marseille", "Toulouse", "Nantes", "Bordeaux", "Lille", "Strasbourg"];
const experienceLevels = ["Débutant", "1-3 ans", "3-5 ans", "5-8 ans", "8+ ans"];
const remoteOptions = ["Présentiel", "Télétravail occasionnel", "Télétravail fréquent", "Télétravail total"];
const salaryRanges = ["30-35k €", "35-40k €", "40-45k €", "45-50k €", "50-60k €", "60-70k €", "70k+ €"];

export default function CreateJobForm({ onSubmit, onCancel, initialData }: CreateJobFormProps) {
  const [step, setStep] = useState(1);
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [currentTag, setCurrentTag] = useState('');
  const [jobData, setJobData] = useState({
    title: initialData?.title || '',
    type: initialData?.type || 'CDI',
    department: initialData?.department || '',
    location: initialData?.location || '',
    remote: initialData?.remote || 'Présentiel',
    salary: initialData?.salary || '',
    experience: initialData?.experience || '3-5 ans',
    description: initialData?.description || '',
    requirements: initialData?.requirements || [''],
    benefits: initialData?.benefits || [''],
    status: initialData?.status || 'draft',
    publicationDate: initialData?.publicationDate || new Date().toISOString().split('T')[0],
    expirationDate: initialData?.expirationDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  const updateJobData = (field: string, value: any) => {
    setJobData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags(prev => [...prev, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const addRequirement = () => {
    setJobData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const updateRequirement = (index: number, value: string) => {
    setJobData(prev => ({
      ...prev,
      requirements: prev.requirements.map((req:any, i:any) => i === index ? value : req)
    }));
  };

  const removeRequirement = (index: number) => {
    setJobData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_:any, i:any) => i !== index)
    }));
  };

  const addBenefit = () => {
    setJobData(prev => ({
      ...prev,
      benefits: [...prev.benefits, '']
    }));
  };

  const updateBenefit = (index: number, value: string) => {
    setJobData(prev => ({
      ...prev,
      benefits: prev.benefits.map((benefit:any, i:any) => i === index ? value : benefit)
    }));
  };

  const removeBenefit = (index: number) => {
    setJobData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_:any, i:any) => i !== index)
    }));
  };

  const handleSubmit = (status: 'draft' | 'active') => {
    const finalJobData = {
      ...jobData,
      tags,
      status,
      applications: 0,
      views: 0,
      timeAgo: 'il y a quelques minutes',
      id: initialData?.id || Date.now(),
    };
    onSubmit(finalJobData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onCancel} className="flex items-center gap-2">
          <RiArrowLeftLine className="h-4 w-4" />
          Retour
        </Button>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => handleSubmit('draft')}
            className="flex items-center gap-2"
          >
            <RiSaveLine className="h-4 w-4" />
            Sauvegarder brouillon
          </Button>
          <Button 
            onClick={() => handleSubmit('active')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <RiEyeLine className="h-4 w-4" />
            Publier l'offre
          </Button>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-20 h-1 mx-2 ${
                  step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && 'Informations principales'}
            {step === 2 && 'Description détaillée'}
            {step === 3 && 'Prévisualisation'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="title">Titre du poste *</Label>
                <Input
                  id="title"
                  value={jobData.title}
                  onChange={(e) => updateJobData('title', e.target.value)}
                  placeholder="ex: Développeur Full Stack Senior"
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="type">Type de contrat *</Label>
                  <Select value={jobData.type} onValueChange={(value) => updateJobData('type', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="department">Département *</Label>
                  <Select value={jobData.department} onValueChange={(value) => updateJobData('department', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Localisation *</Label>
                  <Select value={jobData.location} onValueChange={(value) => updateJobData('location', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="remote">Mode de travail *</Label>
                  <Select value={jobData.remote} onValueChange={(value) => updateJobData('remote', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {remoteOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="salary">Salaire</Label>
                  <Select value={jobData.salary} onValueChange={(value) => updateJobData('salary', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Sélectionner une fourchette" />
                    </SelectTrigger>
                    <SelectContent>
                      {salaryRanges.map(range => (
                        <SelectItem key={range} value={range}>{range}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="experience">Expérience requise *</Label>
                  <Select value={jobData.experience} onValueChange={(value) => updateJobData('experience', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="tags">Compétences recherchées</Label>
                <div className="mt-1">
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      placeholder="Ajouter une compétence"
                    />
                    <Button type="button" onClick={addTag}>
                      <RiAddLine className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <RiCloseLine 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setStep(2)}>
                  Continuer
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Detailed Description */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="description">Description du poste *</Label>
                <Textarea
                  id="description"
                  value={jobData.description}
                  onChange={(e) => updateJobData('description', e.target.value)}
                  placeholder="Décrivez les missions principales, les responsabilités, et les objectifs du poste..."
                  rows={8}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Profil recherché</Label>
                <div className="mt-1 space-y-2">
                  {jobData.requirements.map((requirement:any, index:any) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={requirement}
                        onChange={(e) => updateRequirement(index, e.target.value)}
                        placeholder={`Exigence ${index + 1}`}
                      />
                      {jobData.requirements.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeRequirement(index)}
                        >
                          <RiCloseLine className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addRequirement}>
                    <RiAddLine className="h-4 w-4 mr-2" />
                    Ajouter une exigence
                  </Button>
                </div>
              </div>

              <div>
                <Label>Avantages</Label>
                <div className="mt-1 space-y-2">
                  {jobData.benefits.map((benefit:any, index:any) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={benefit}
                        onChange={(e) => updateBenefit(index, e.target.value)}
                        placeholder={`Avantage ${index + 1}`}
                      />
                      {jobData.benefits.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeBenefit(index)}
                        >
                          <RiCloseLine className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addBenefit}>
                    <RiAddLine className="h-4 w-4 mr-2" />
                    Ajouter un avantage
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="publicationDate">Date de publication</Label>
                  <Input
                    id="publicationDate"
                    type="date"
                    value={jobData.publicationDate}
                    onChange={(e) => updateJobData('publicationDate', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="expirationDate">Date d'expiration</Label>
                  <Input
                    id="expirationDate"
                    type="date"
                    value={jobData.expirationDate}
                    onChange={(e) => updateJobData('expirationDate', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Retour
                </Button>
                <Button onClick={() => setStep(3)}>
                  Prévisualiser
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Preview */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="border rounded-lg p-6 bg-gray-50">
                <h3 className="text-xl font-bold mb-4">{jobData.title}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Type:</strong> {jobData.type}</div>
                  <div><strong>Département:</strong> {jobData.department}</div>
                  <div><strong>Localisation:</strong> {jobData.location}</div>
                  <div><strong>Expérience:</strong> {jobData.experience}</div>
                  <div><strong>Salaire:</strong> {jobData.salary}</div>
                  <div><strong>Mode de travail:</strong> {jobData.remote}</div>
                </div>
                
                <div className="mt-4">
                  <strong>Description:</strong>
                  <p className="text-sm mt-1">{jobData.description || 'Aucune description'}</p>
                </div>

                {tags.length > 0 && (
                  <div className="mt-4">
                    <strong>Compétences:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Retour
                </Button>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => handleSubmit('draft')}
                  >
                    Sauvegarder brouillon
                  </Button>
                  <Button onClick={() => handleSubmit('active')}>
                    Publier l'offre
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}